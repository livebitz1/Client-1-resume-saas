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
    const { prompt, jobTitle, experience } = await req.json();

    // Create a system prompt that will guide the AI to generate resume content
    const systemPrompt = `You are an expert CV writer specialized in creating professional resumes for job seekers in South Africa.
    Generate resume content for a ${jobTitle || 'professional'} with ${experience || 'some'} experience.
    Focus on creating content that will pass through Applicant Tracking Systems (ATS) and catch the attention of hiring managers.
    Create content that is specific to the South African job market.`;

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
            content: `Create a professional resume for a ${jobTitle || 'job seeker'} with ${experience || 'some'} experience.
            Additional context from the user: ${prompt}
            
            Format the response as a JSON object with the following structure:
            {
              "basics": {
                "name": "Placeholder Name",
                "label": "Job Title",
                "email": "email@example.com",
                "phone": "Phone Number",
                "summary": "Professional summary...",
                "location": {
                  "city": "City",
                  "countryCode": "ZA"
                },
                "profiles": [
                  {
                    "network": "LinkedIn",
                    "username": "username",
                    "url": "url"
                  }
                ]
              },
              "work": [
                {
                  "company": "Company Name",
                  "position": "Position Title",
                  "startDate": "Start Date",
                  "endDate": "End Date or Present",
                  "description": "Job description...",
                  "highlights": [
                    "Achievement 1",
                    "Achievement 2"
                  ]
                }
              ],
              "skills": [
                {
                  "name": "Skill Name",
                  "level": "Skill Level",
                  "keywords": [
                    "Keyword 1",
                    "Keyword 2"
                  ]
                }
              ]
            }` 
          }
        ],
        temperature: 0.7,
      }),
    });

    const data = await response.json();

    if (data.error) {
      throw new Error(data.error.message);
    }

    try {
      // Parse the generated content as JSON
      const generatedContent = JSON.parse(data.choices[0].message.content);
      
      return new Response(
        JSON.stringify(generatedContent),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    } catch (parseError) {
      console.error("Error parsing AI response as JSON:", parseError);
      // Return a fallback response
      const fallbackResponse = {
        basics: {
          name: "Your Name",
          label: jobTitle || "Professional",
          summary: `${prompt} - Unable to process full AI response at this time.`,
          location: {
            city: "Cape Town",
            countryCode: "ZA"
          }
        }
      };
      
      return new Response(
        JSON.stringify(fallbackResponse),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
  } catch (error) {
    console.error('Error in generate-resume-content function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
