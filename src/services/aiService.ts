
import { ResumeData } from "@/types/resume";
import { supabase } from "@/lib/supabase";

export const generateResumeContent = async (
  prompt: string,
  jobTitle?: string,
  experience?: string
): Promise<Partial<ResumeData>> => {
  console.log("AI service called with:", { prompt, jobTitle, experience });
  
  try {
    // Call our Supabase Edge Function that securely uses the OpenAI API key
    const { data, error } = await supabase.functions.invoke('generate-resume-content', {
      body: { prompt, jobTitle, experience }
    });

    if (error) {
      console.error("Error calling AI service:", error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error("AI service error:", error);
    
    // Fallback to mock data if the API call fails
    if (!jobTitle) jobTitle = "Software Developer";
    if (!experience) experience = "3 years";
    
    // Simple customization of mock data
    const customizedData = {
      basics: {
        name: "Your Name",
        label: jobTitle,
        email: "your.email@example.com",
        phone: "(012) 345-6789",
        url: "",
        location: {
          address: "",
          city: "Cape Town",
          postalCode: "",
          countryCode: "ZA",
          region: "Western Cape",
        },
        summary: `Dedicated ${jobTitle} with ${experience} of experience creating and optimizing applications. ${prompt}`,
        profiles: [
          {
            network: "LinkedIn",
            username: "yourprofile",
            url: "https://linkedin.com/in/yourprofile",
          },
        ],
      },
      work: [
        {
          id: Date.now().toString(),
          company: "Example Company",
          position: jobTitle,
          website: "",
          startDate: "Jan 2021",
          endDate: "Present",
          current: true,
          summary: `Working as a ${jobTitle} on various projects and initiatives in the South African market.`,
          highlights: [
            "Developed and implemented new features and functionalities",
            "Collaborated with cross-functional teams to deliver high-quality solutions",
            "Optimized existing systems for better performance",
          ],
        },
      ],
      skills: [
        {
          id: "1",
          name: "Relevant Skill 1",
          level: "Advanced",
          keywords: ["Keyword 1", "Keyword 2"],
        },
        {
          id: "2",
          name: "Relevant Skill 2",
          level: "Intermediate",
          keywords: ["Keyword 3", "Keyword 4"],
        },
      ],
    };
    
    return customizedData;
  }
};

export const enhanceResumeSection = async (
  section: string,
  content: string,
  jobTitle?: string
): Promise<string> => {
  console.log("Enhancing section:", { section, content, jobTitle });
  
  try {
    // Call the Supabase edge function
    const { data, error } = await supabase.functions.invoke('enhance-resume', {
      body: { section, content, jobTitle },
    });

    if (error) {
      console.error("Error calling enhance-resume function:", error);
      throw error;
    }

    return data.enhancedContent;
    
  } catch (error) {
    console.error("Error enhancing content:", error);
    return `${content} (Unable to enhance content at this time)`;
  }
};

export const generateCoverLetter = async (
  jobDescription: string,
  resumeData?: Partial<ResumeData>
): Promise<string> => {
  console.log("Generating cover letter for job description");
  
  try {
    // Call our Supabase Edge Function that securely uses the OpenAI API key
    const { data, error } = await supabase.functions.invoke('generate-cover-letter', {
      body: { jobDescription, resumeData }
    });

    if (error) {
      console.error("Error calling cover letter generation:", error);
      throw error;
    }

    return data.coverLetter;
  } catch (error) {
    console.error("Cover letter generation error:", error);
    
    // Fallback to mock data if the API call fails
    return `Dear Hiring Manager,

I am writing to express my strong interest in the position described in your job posting. With my background in this field and passion for delivering results, I believe I am an excellent candidate for this role.

Throughout my career, I have consistently demonstrated the ability to deliver results in similar environments. My experience has prepared me well for the challenges of this position.

Thank you for considering my application. I look forward to the possibility of discussing how my background, skills, and experiences would benefit your team.

Sincerely,
[Your Name]`;
  }
};
