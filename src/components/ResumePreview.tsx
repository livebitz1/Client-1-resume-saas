
import React from 'react';
import { ResumeData } from '@/types/resume';
import templates from './templates';
import { Button } from '@/components/ui/button';
import { Download, RefreshCw } from 'lucide-react';
import { exportToPdf } from '@/services/exportService';
import { toast } from 'sonner';

interface ResumePreviewProps {
  data: ResumeData;
  templateId: string;
}

const ResumePreview: React.FC<ResumePreviewProps> = ({ data, templateId }) => {
  const template = templates.find(t => t.id === templateId);
  const TemplateComponent = template?.component;

  const handleDownload = async () => {
    toast.info("Preparing PDF download...");
    
    try {
      const success = await exportToPdf('resume-preview-content', `${data.basics.name.replace(/\s+/g, '-').toLowerCase()}-resume.pdf`);
      
      if (success) {
        toast.success("Resume downloaded successfully!");
      } else {
        toast.error("Failed to download resume");
      }
    } catch (error) {
      console.error("PDF export error:", error);
      toast.error("Something went wrong with the download");
    }
  };

  if (!TemplateComponent) {
    return (
      <div className="flex items-center justify-center h-full border border-dashed border-gray-300 rounded-md p-6">
        <div className="text-center">
          <p className="text-gray-500 mb-2">Template not found</p>
          <Button variant="outline">Select a template</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center mb-4 px-2">
        <h2 className="text-xl font-semibold">Preview</h2>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.location.reload()}
          >
            <RefreshCw className="h-4 w-4 mr-1" /> Refresh
          </Button>
          <Button
            onClick={handleDownload}
            size="sm"
          >
            <Download className="h-4 w-4 mr-1" /> Download PDF
          </Button>
        </div>
      </div>
      
      <div className="flex-1 overflow-auto bg-gray-100 p-4 rounded-md">
        <div id="resume-preview-content" className="shadow-lg mx-auto">
          <TemplateComponent data={data} />
        </div>
      </div>
    </div>
  );
};

export default ResumePreview;
