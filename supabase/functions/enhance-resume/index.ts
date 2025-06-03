
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
  const edenAiKey = Deno.env.get('EDEN_AI_API_KEY');
  
  if (!apiKey && !edenAiKey) {
    return new Response(
      JSON.stringify({ error: 'No AI API keys are configured' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  try {
    const { section, content, jobTitle, context } = await req.json();

    // Choose which AI service to use based on available keys and section type
    let enhancedContent;
    
    // If this is a chatbot interaction, handle it differently
    if (section === 'chatbot') {
      enhancedContent = await handleChatbotInteraction(content, context, apiKey, edenAiKey);
    } else {
      // For resume sections, enhance the content
      enhancedContent = await enhanceContent(section, content, jobTitle, apiKey, edenAiKey);
    }

    return new Response(
      JSON.stringify({ enhancedContent }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in enhance-resume function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

async function handleChatbotInteraction(content: string, context: any[], apiKey: string | undefined, edenAiKey: string | undefined): Promise<string> {
  // Use OpenAI if available, otherwise try Eden AI
  if (apiKey) {
    // Create a system message based on the chat context
    const systemPrompt = `You are a helpful assistant for Resume Hub, South Africa's premier Auto Apply platform. 
    You help users with questions about creating resumes, cover letters, job applications, and career advice.
    Keep your answers focused on resume and career topics, and be knowledgeable about the South African job market.
    Your responses should be helpful, concise, and professional.`;

    // Format the conversation history for the OpenAI API
    const messages = [
      { role: 'system', content: systemPrompt },
      ...(context || []),
      { role: 'user', content }
    ];

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages,
        temperature: 0.7,
      }),
    });

    const data = await response.json();
    return data.choices[0].message.content;
  } 
  // Implement Eden AI as an alternative if needed
  else if (edenAiKey) {
    // Fallback to Eden AI if available
    const response = await fetch('https://api.edenai.run/v2/text/chat', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${edenAiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        providers: 'openai',
        text: `As a resume and career assistant, help the user with: ${content}`,
        temperature: 0.7,
      }),
    });

    const data = await response.json();
    return data.openai.generated_text || "I'm sorry, I couldn't process that request right now.";
  } else {
    // Fallback to basic response if no AI services are available
    return "I'm sorry, our AI assistant is currently unavailable. Please try again later or contact our support team.";
  }
}

async function enhanceContent(section: string, content: string, jobTitle: string | undefined, apiKey: string | undefined, edenAiKey: string | undefined): Promise<string> {
  // Use OpenAI if available, otherwise try Eden AI
  if (apiKey) {
    // Create a system message based on the section of the resume being enhanced
    let systemPrompt = 'You are an expert CV writer that helps job seekers in South Africa improve their CVs.';
    
    if (section.includes('summary')) {
      systemPrompt += ' Write a professional summary that highlights skills and experience.';
    } else if (section.includes('work')) {
      systemPrompt += ' Enhance job descriptions with action verbs and quantifiable achievements.';
    } else if (section.includes('projects')) {
      systemPrompt += ' Improve project descriptions to showcase technical skills and results.';
    }

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
            content: `Please improve the following ${section.split('.').pop()} for a ${jobTitle || 'professional'} CV. 
            Make it more impactful, concise, and highlight key achievements. Use South African context if appropriate.
            Original content: ${content}`
          }
        ],
        temperature: 0.7,
      }),
    });

    const data = await response.json();
    return data.choices[0].message.content;
  } 
  // Implement Eden AI as an alternative
  else if (edenAiKey) {
    const response = await fetch('https://api.edenai.run/v2/text/generation', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${edenAiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        providers: 'openai',
        text: `Enhance this ${section.split('.').pop()} for a ${jobTitle || 'professional'} CV. Make it more impactful and highlight achievements: ${content}`,
        temperature: 0.7,
      }),
    });

    const data = await response.json();
    return data.openai.generated_text || content;
  } else {
    // Return original content if no AI services are available
    return content;
  }
}
