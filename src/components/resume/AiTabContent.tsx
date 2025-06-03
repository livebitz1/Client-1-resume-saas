
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import AiResumeSuggestions from "@/components/AiResumeSuggestions";
import JobMatchScore from "@/components/JobMatchScore";
import ResumePreview from "@/components/ResumePreview";
import { ResumeData } from "@/types/resume";
import AiTips from "./AiTips";

interface AiTabContentProps {
  resumeData: ResumeData;
  templateId: string;
  onApplySuggestions: (data: Partial<ResumeData>) => void;
}

const AiTabContent = ({ resumeData, templateId, onApplySuggestions }: AiTabContentProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="lg:col-span-1">
        <AiResumeSuggestions onApplySuggestions={onApplySuggestions} />
        
        <div className="mt-6">
          <JobMatchScore resumeData={resumeData} />
        </div>
        
        <div className="mt-6">
          <AiTips />
        </div>
      </div>

      <Card className="lg:col-span-1 overflow-hidden h-[800px]">
        <CardContent className="p-0 h-full">
          <ResumePreview 
            data={resumeData} 
            templateId={templateId} 
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default AiTabContent;
