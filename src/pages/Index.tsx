
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TemplateSelector from "@/components/TemplateSelector";
import { mockResumeData } from "@/data/mockResume";
import { ResumeData } from "@/types/resume";
import { exportToPdf } from "@/services/exportService";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import ResumeHeader from "@/components/layout/ResumeHeader";
import ResumeFooter from "@/components/layout/ResumeFooter";
import PremiumUpsellBanner from "@/components/resume/PremiumUpsellBanner";
import BuilderTabContent from "@/components/resume/BuilderTabContent";
import AiTabContent from "@/components/resume/AiTabContent";
import CvDesignerTabContent from "@/components/resume/CvDesignerTabContent";

const Index = () => {
  const navigate = useNavigate();
  // Check if we have a parsed resume from the ResumeUpload page
  const parsedResumeData = sessionStorage.getItem('parsedResume');
  const initialResumeData = parsedResumeData ? JSON.parse(parsedResumeData) : mockResumeData;

  const [resumeData, setResumeData] = useState<ResumeData>(initialResumeData);
  const [selectedTemplate, setSelectedTemplate] = useState<string>("basic");
  const [activeTab, setActiveTab] = useState<string>("builder");

  const handleUpdateResume = (data: ResumeData) => {
    setResumeData(data);
    toast.success("Resume/CV updated successfully!");
  };

  const handleApplySuggestions = (data: Partial<ResumeData>) => {
    setResumeData(prevData => ({
      ...prevData,
      ...data,
      // Preserve arrays that might be overwritten
      work: [...(data.work || prevData.work)],
      education: [...(data.education || prevData.education)],
      skills: [...(data.skills || prevData.skills)],
      projects: [...(data.projects || prevData.projects)],
      qualifications: [...(data.qualifications || prevData.qualifications)],
      languages: [...(data.languages || prevData.languages)],
    }));
  };

  const handleDownloadResume = async () => {
    const fileName = `${resumeData.basics.name.replace(/\s+/g, '-').toLowerCase()}-resume-cv.pdf`;
    
    toast.info("Preparing your Resume/CV for download...");
    
    try {
      const success = await exportToPdf('resume-preview-content', fileName);
      
      if (success) {
        toast.success("Resume/CV downloaded successfully!");
        // Show subscription upsell message
        setTimeout(() => {
          toast.info(
            <div className="flex flex-col space-y-2">
              <p>Want unlimited Resume/CV downloads and AI suggestions?</p>
              <button 
                className="bg-teal-600 text-white px-3 py-1 rounded text-sm hover:bg-teal-700 transition-colors"
                onClick={() => navigate('/subscription-plans')}
              >
                View Plans
              </button>
            </div>,
            { duration: 8000 }
          );
        }, 1000);
      } else {
        toast.error("Failed to download Resume/CV");
      }
    } catch (error) {
      console.error("Download error:", error);
      toast.error("Something went wrong with the download");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <ResumeHeader onDownloadResume={handleDownloadResume} setActiveTab={setActiveTab} />

      {/* Main content */}
      <div className="container mx-auto px-4 py-8">
        <Tabs 
          value={activeTab} 
          onValueChange={setActiveTab} 
          className="space-y-4"
        >
          <TabsList className="grid w-full grid-cols-4 bg-white border border-teal-200">
            <TabsTrigger value="templates" className="data-[state=active]:bg-teal-600 data-[state=active]:text-white">Templates</TabsTrigger>
            <TabsTrigger value="builder" className="data-[state=active]:bg-teal-600 data-[state=active]:text-white">Resume/CV Builder</TabsTrigger>
            <TabsTrigger value="designer" className="data-[state=active]:bg-teal-600 data-[state=active]:text-white">Resume/CV Designer</TabsTrigger>
            <TabsTrigger value="ai" className="data-[state=active]:bg-teal-600 data-[state=active]:text-white">AI Assistant</TabsTrigger>
          </TabsList>

          <TabsContent value="templates" className="space-y-4">
            <TemplateSelector
              selectedTemplate={selectedTemplate}
              onSelectTemplate={(id) => {
                setSelectedTemplate(id);
                setActiveTab("builder");
                toast.success(`Template "${id}" selected!`);
              }}
            />
          </TabsContent>

          <TabsContent value="builder">
            <BuilderTabContent
              resumeData={resumeData}
              templateId={selectedTemplate}
              onUpdateResume={handleUpdateResume}
            />
          </TabsContent>

          <TabsContent value="designer">
            <CvDesignerTabContent
              resumeData={resumeData}
              templateId={selectedTemplate}
              onUpdateResume={handleUpdateResume}
            />
          </TabsContent>

          <TabsContent value="ai">
            <AiTabContent 
              resumeData={resumeData} 
              templateId={selectedTemplate}
              onApplySuggestions={handleApplySuggestions}
            />
          </TabsContent>
        </Tabs>
        
        <PremiumUpsellBanner />
      </div>

      <ResumeFooter />
    </div>
  );
};

export default Index;
