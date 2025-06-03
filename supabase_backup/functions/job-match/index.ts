
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const openAIKey = Deno.env.get('OPENAI_API_KEY');
const edenAIKey = Deno.env.get('EDEN_AI_API_KEY');

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get request body
    const { resumeText, jobDescription } = await req.json();
    
    if (!resumeText || !jobDescription) {
      throw new Error("Missing resume text or job description");
    }
    
    // Get auth header from request
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      throw new Error("Missing authorization header");
    }
    
    // Connect to Supabase
    const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? '';
    const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY') ?? '';
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    // Set auth header for supabase client
    supabase.auth.setSession({
      access_token: authHeader.replace('Bearer ', ''),
      refresh_token: '',
    });
    
    // Get user
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError || !user) {
      throw new Error("Unauthorized");
    }
    
    // Use Eden AI for text similarity and skill matching
    try {
      const response = await fetch('https://api.edenai.run/v2/text/semantic_similarity', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${edenAIKey}`,
        },
        body: JSON.stringify({
          providers: "openai",
          texts: [resumeText, jobDescription],
          fallback_providers: ""
        }),
      });
      
      const similarity = await response.json();
      
      // Calculate match percentage based on similarity score
      const matchPercent = Math.round(similarity.openai.similarity_score * 100);
      
      // Use OpenAI to extract skills from resume and job description
      const gptResponse = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${openAIKey}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            {
              role: "system",
              content: "You are an AI assistant that analyzes resumes and job descriptions to extract skills and provide match insights."
            },
            {
              role: "user",
              content: `Analyze this resume: "${resumeText.substring(0, 1000)}..." and this job description: "${jobDescription.substring(0, 1000)}...". Extract the top 5 matching skills between them and the top 3 skills that are in the job description but missing from the resume. Return in JSON format with these fields: matchingSkills (array of strings), missingSkills (array of strings), matchScore (integer between 0-100), feedback (string with 2-3 sentences of advice).`
            }
          ],
          temperature: 0.2,
          response_format: { type: "json_object" }
        }),
      });
      
      const gptData = await gptResponse.json();
      let analysis = { matchingSkills: [], missingSkills: [], feedback: "", matchScore: matchPercent };
      
      try {
        analysis = JSON.parse(gptData.choices[0].message.content);
        // Ensure match score is consistent with our calculation
        analysis.matchScore = matchPercent;
      } catch (e) {
        console.error("Error parsing OpenAI response:", e);
      }
      
      return new Response(
        JSON.stringify({ 
          success: true,
          matchPercent,
          analysis
        }),
        { 
          headers: { 
            ...corsHeaders,
            'Content-Type': 'application/json',
          },
          status: 200 
        },
      );
      
    } catch (error) {
      console.error("Error calling Eden AI or OpenAI:", error);
      
      // Fallback to OpenAI only
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${openAIKey}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            {
              role: "system",
              content: "You are an AI assistant that analyzes resumes and job descriptions to determine match percentage, matching skills, and missing skills."
            },
            {
              role: "user",
              content: `Analyze this resume: "${resumeText.substring(0, 1000)}..." and this job description: "${jobDescription.substring(0, 1000)}...". Return JSON with: matchScore (integer between 0-100), matchingSkills (array of top 5 matching skills), missingSkills (array of top 3 missing skills), and feedback (2-3 sentences of advice).`
            }
          ],
          temperature: 0.3,
          response_format: { type: "json_object" }
        }),
      });
      
      const data = await response.json();
      const analysis = JSON.parse(data.choices[0].message.content);
      
      return new Response(
        JSON.stringify({ 
          success: true,
          matchPercent: analysis.matchScore,
          analysis
        }),
        { 
          headers: { 
            ...corsHeaders,
            'Content-Type': 'application/json',
          },
          status: 200 
        },
      );
    }
    
  } catch (error) {
    console.error("Error in job matching:", error);
    
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
        status: 400 
      },
    );
  }
});
