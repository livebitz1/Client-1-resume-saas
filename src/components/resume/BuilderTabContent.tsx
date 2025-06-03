
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import ResumeForm from "@/components/ResumeForm";
import ResumePreview from "@/components/ResumePreview";
import CVUploadParser from "@/components/CVUploadParser";
import { ResumeData } from "@/types/resume";

interface BuilderTabContentProps {
  resumeData: ResumeData;
  templateId: string;
  onUpdateResume: (data: ResumeData) => void;
}

const BuilderTabContent = ({ resumeData, templateId, onUpdateResume }: BuilderTabContentProps) => {
  const handleCVDataParsed = (parsedData: any) => {
    // Merge parsed data with existing resume data
    const updatedResumeData = {
      ...resumeData,
      personalInfo: {
        ...resumeData.personalInfo,
        ...parsedData.personalInfo
      },
      basics: {
        ...resumeData.basics,
        name: parsedData.personalInfo?.fullName || resumeData.basics.name,
        email: parsedData.personalInfo?.email || resumeData.basics.email,
        phone: parsedData.personalInfo?.mobileNumber || resumeData.basics.phone,
        summary: parsedData.basics?.summary || resumeData.basics.summary,
      },
      work: parsedData.work || resumeData.work,
      education: parsedData.education || resumeData.education,
      skills: parsedData.skills || resumeData.skills,
      projects: parsedData.projects || resumeData.projects,
      qualifications: parsedData.qualifications || resumeData.qualifications,
    };
    
    onUpdateResume(updatedResumeData);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="lg:col-span-1 overflow-hidden">
        <CardContent className="p-0">
          <div className="p-6 space-y-6">
            <CVUploadParser onDataParsed={handleCVDataParsed} />
            <ResumeForm 
              initialData={resumeData} 
              onSubmit={onUpdateResume} 
              selectedTemplate={templateId}
            />
          </div>
        </CardContent>
      </Card>

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

export default BuilderTabContent;
