
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const apiKey = Deno.env.get('OPENAI_API_KEY');
  if (!apiKey) {
    return new Response(
      JSON.stringify({ error: 'OpenAI API key is not configured' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  try {
    const { jobDescription, resumeData } = await req.json();

    // Extract relevant information from resumeData if available
    const name = resumeData?.basics?.name || "the candidate";
    const skills = resumeData?.skills?.map(skill => skill.name).join(", ") || "";
    const experience = resumeData?.work?.[0]?.description || "";

    // Create a system prompt that will guide the AI to generate a cover letter
    const systemPrompt = `You are an expert cover letter writer specialized in creating professional cover letters for job seekers in South Africa.
    Create a compelling cover letter that will help the candidate stand out to employers.
    Focus on creating content that passes through Applicant Tracking Systems (ATS) by incorporating key phrases from the job description.
    Tailor the letter specifically to the South African job market and employment context.`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { 
            role: 'user',
            content: `Write a professional cover letter for a job with the following description:
            
            "${jobDescription}"
            
            Additional context about the candidate:
            - Name: ${name}
            - Skills: ${skills}
            - Experience: ${experience}
            
            Create a compelling, ATS-optimized cover letter with a formal but confident tone.` 
          }
        ],
        temperature: 0.7,
      }),
    });

    const data = await response.json();

    if (data.error) {
      throw new Error(data.error.message);
    }

    return new Response(
      JSON.stringify({ coverLetter: data.choices[0].message.content }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in generate-cover-letter function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
