
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
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

  const edenAIKey = Deno.env.get('EDEN_AI_API_KEY');
  const openAIKey = Deno.env.get('OPENAI_API_KEY');
  
  if (!edenAIKey && !openAIKey) {
    return new Response(
      JSON.stringify({ error: 'No AI API keys are configured' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  try {
    const { file, filename, fileType } = await req.json();

    if (!file) {
      throw new Error("No file provided");
    }

    let extractedText = '';
    
    // First, extract text using Eden AI OCR
    if (edenAIKey) {
      try {
        const ocrResponse = await fetch('https://api.edenai.run/v2/ocr/ocr', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${edenAIKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            providers: 'google',
            file: file,
            file_type: fileType.includes('pdf') ? 'pdf' : 'docx',
            fallback_providers: 'microsoft'
          }),
        });

        const ocrData = await response.json();
        
        if (ocrData.google && ocrData.google.text) {
          extractedText = ocrData.google.text;
        } else if (ocrData.microsoft && ocrData.microsoft.text) {
          extractedText = ocrData.microsoft.text;
        }
      } catch (error) {
        console.error('Eden AI OCR error:', error);
      }
    }

    // If no text extracted or no Eden AI, use a fallback method
    if (!extractedText && openAIKey) {
      // Use OpenAI to analyze the document structure
      const analysisResponse = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${openAIKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            {
              role: 'system',
              content: 'You are a resume parser. Extract structured information from resumes and return it in JSON format.'
            },
            {
              role: 'user',
              content: `Parse this resume/CV and extract the following information in JSON format:
              {
                "personalInfo": {
                  "fullName": "extracted name",
                  "email": "extracted email",
                  "mobileNumber": "extracted phone",
                  "homeAddress": "extracted address"
                },
                "basics": {
                  "name": "extracted name",
                  "email": "extracted email", 
                  "phone": "extracted phone",
                  "summary": "extracted professional summary or objective"
                },
                "work": [array of work experiences],
                "education": [array of education],
                "skills": [array of skills]
              }
              
              Document filename: ${filename}`
            }
          ],
          temperature: 0.1,
        }),
      });

      const analysisData = await analysisResponse.json();
      
      try {
        const parsedData = JSON.parse(analysisData.choices[0].message.content);
        
        return new Response(
          JSON.stringify({ 
            success: true,
            resumeData: parsedData
          }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      } catch (parseError) {
        console.error('Error parsing OpenAI response:', parseError);
      }
    }

    // If we have extracted text, process it with AI
    if (extractedText && openAIKey) {
      const structureResponse = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${openAIKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            {
              role: 'system',
              content: 'You are a professional resume parser. Extract and structure information from resume text into a standardized JSON format.'
            },
            {
              role: 'user',
              content: `Please parse this resume/CV text and extract structured information. Return a JSON object with the following structure:
              
              {
                "personalInfo": {
                  "fullName": "full name",
                  "email": "email address",
                  "mobileNumber": "phone number",
                  "homeAddress": "address",
                  "province": "province/state",
                  "suburb": "suburb/city",
                  "postalCode": "postal code",
                  "nationality": "nationality",
                  "isSACitizen": true/false,
                  "hasTransport": true/false,
                  "driversLicense": "license type"
                },
                "basics": {
                  "name": "full name",
                  "email": "email",
                  "phone": "phone",
                  "summary": "professional summary (create a compelling 2-3 sentence summary if not present)",
                  "location": {
                    "address": "address",
                    "postalCode": "postal code",
                    "city": "city",
                    "region": "region",
                    "countryCode": "ZA"
                  }
                },
                "work": [
                  {
                    "id": "unique_id",
                    "company": "company name",
                    "position": "job title",
                    "startDate": "YYYY-MM",
                    "endDate": "YYYY-MM or Present",
                    "current": boolean,
                    "summary": "job description",
                    "highlights": ["achievement 1", "achievement 2"]
                  }
                ],
                "education": [
                  {
                    "id": "unique_id",
                    "institution": "school name",
                    "area": "field of study",
                    "studyType": "degree type",
                    "startDate": "YYYY-MM",
                    "endDate": "YYYY-MM",
                    "gpa": "grade/gpa",
                    "courses": ["course1", "course2"]
                  }
                ],
                "skills": [
                  {
                    "id": "unique_id",
                    "name": "skill category",
                    "level": "Beginner/Intermediate/Advanced",
                    "keywords": ["skill1", "skill2"]
                  }
                ],
                "projects": [
                  {
                    "id": "unique_id",
                    "name": "project name",
                    "description": "project description",
                    "highlights": ["highlight1", "highlight2"],
                    "startDate": "YYYY-MM",
                    "endDate": "YYYY-MM",
                    "url": "project url if available"
                  }
                ],
                "qualifications": [
                  {
                    "id": "unique_id",
                    "name": "certification name",
                    "issuer": "issuing organization",
                    "date": "YYYY-MM",
                    "url": "certification url if available"
                  }
                ]
              }
              
              Resume text: ${extractedText}`
            }
          ],
          temperature: 0.1,
          response_format: { type: "json_object" }
        }),
      });

      const structuredData = await structureResponse.json();
      const parsedResumeData = JSON.parse(structuredData.choices[0].message.content);

      return new Response(
        JSON.stringify({ 
          success: true,
          resumeData: parsedResumeData
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Fallback response if all methods fail
    return new Response(
      JSON.stringify({ 
        success: false,
        error: 'Unable to parse resume/CV. Please try uploading a different format or check the file quality.'
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in parse-resume-eden function:', error);
    return new Response(
      JSON.stringify({ 
        success: false,
        error: error.message 
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
