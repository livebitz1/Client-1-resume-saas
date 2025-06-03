
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Wand2, Loader2 } from 'lucide-react';
import { ResumeData } from '@/types/resume';
import { generateResumeContent } from '@/services/aiService';
import { toast } from 'sonner';

interface AiResumeSuggestionsProps {
  onApplySuggestions: (data: Partial<ResumeData>) => void;
}

const AiResumeSuggestions: React.FC<AiResumeSuggestionsProps> = ({ onApplySuggestions }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [jobTitle, setJobTitle] = useState('');
  const [experience, setExperience] = useState('');
  const [prompt, setPrompt] = useState('');

  const handleGenerateClick = async () => {
    if (!prompt) {
      toast.error("Please provide a prompt for the AI");
      return;
    }
    
    setIsLoading(true);
    try {
      toast.info("Generating resume content with AI...");
      const generatedContent = await generateResumeContent(prompt, jobTitle, experience);
      onApplySuggestions(generatedContent);
      toast.success("Resume content generated successfully!");
    } catch (error) {
      console.error("AI generation error:", error);
      toast.error("Failed to generate resume content");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Wand2 className="h-5 w-5 mr-2" /> AI Resume Assistant
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Input
            placeholder="Job Title (e.g., Software Developer)"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            className="mb-2"
          />
          <Input
            placeholder="Experience Level (e.g., 3 years, Entry Level)"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            className="mb-2"
          />
          <Textarea
            placeholder="Describe your skills, experiences, and the job you're applying for..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={4}
            className="resize-none"
          />
        </div>
        <div className="text-sm text-muted-foreground">
          <p>The AI assistant will help generate content for your resume based on your input. For best results, include:</p>
          <ul className="list-disc pl-4 mt-1 space-y-1">
            <li>The type of position you're applying for</li>
            <li>Key skills and technologies you know</li>
            <li>Notable achievements or projects</li>
            <li>Your career goals</li>
          </ul>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handleGenerateClick}
          disabled={isLoading}
          className="w-full"
        >
          {isLoading ? (
            <span className="flex items-center">
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Generating...
            </span>
          ) : (
            <span className="flex items-center">
              <Wand2 className="h-4 w-4 mr-2" />
              Generate Resume Content
            </span>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AiResumeSuggestions;
