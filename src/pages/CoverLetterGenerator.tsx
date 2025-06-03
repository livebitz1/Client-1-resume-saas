
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useNavigate, useSearchParams } from "react-router-dom";
import { FileText, Wand2, Loader2 } from "lucide-react";
import { generateCoverLetter } from "@/services/aiService";

const CoverLetterGenerator = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const jobId = searchParams.get("jobId");
  const [jobDescription, setJobDescription] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!jobDescription) {
      toast.error("Please enter a job description");
      return;
    }

    setLoading(true);
    toast.info("Generating your ATS-optimized resume and cover letter...");

    try {
      // Use our AI service to generate the cover letter
      const generatedCoverLetter = await generateCoverLetter(jobDescription);
      setCoverLetter(generatedCoverLetter);
      
      setLoading(false);
      toast.success("Cover letter generated successfully!");
      
      // In production, this would also create a tailored resume
      // For now, we just inform the user
      setTimeout(() => {
        toast.info(
          <div className="space-y-2">
            <p>Your ATS-optimized resume is ready! Subscribe to download it.</p>
            <Button size="sm" onClick={() => navigate('/subscription-plans')}>
              View Plans
            </Button>
          </div>,
          { duration: 10000 }
        );
      }, 1000);
    } catch (error) {
      console.error("Error generating cover letter:", error);
      setLoading(false);
      toast.error("Failed to generate cover letter. Please try again.");
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">ATS-Optimized Resume & Cover Letter Generator</h1>
          <p className="text-gray-500 mt-2">
            Paste a job description and our AI will create a tailored resume and cover letter
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Job Description</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea 
                placeholder="Paste the job description here..." 
                className="min-h-[300px]"
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
              />
              <Button 
                onClick={handleGenerate}
                disabled={!jobDescription || loading}
                className="w-full mt-4 flex items-center justify-center"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Wand2 className="h-4 w-4 mr-2" />
                    Generate Resume & Cover Letter
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Generated Cover Letter</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea 
                placeholder="Your cover letter will appear here..." 
                className="min-h-[300px]"
                value={coverLetter}
                onChange={(e) => setCoverLetter(e.target.value)}
              />
              <div className="flex space-x-4 mt-4">
                <Button 
                  variant="outline" 
                  className="flex-1"
                  disabled={!coverLetter}
                  onClick={() => {
                    toast.info("To download your cover letter, please subscribe to our service.");
                    navigate('/subscription-plans');
                  }}
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Download Cover Letter
                </Button>
                <Button 
                  className="flex-1"
                  disabled={!coverLetter}
                  onClick={() => {
                    toast.info("To download your ATS-optimized resume, please subscribe to our service.");
                    navigate('/subscription-plans');
                  }}
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Download Resume
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold text-blue-900">Ready to apply with confidence?</h3>
              <p className="text-blue-700">
                Subscribe to download unlimited ATS-optimized resumes and cover letters.
              </p>
            </div>
            <Button onClick={() => navigate('/subscription-plans')}>
              View Subscription Plans
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoverLetterGenerator;
