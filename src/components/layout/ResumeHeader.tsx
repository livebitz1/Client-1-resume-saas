
import React from "react";
import { Button } from "@/components/ui/button";
import { Download, Wand2, Briefcase, Home } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

interface ResumeHeaderProps {
  onDownloadResume: () => Promise<void>;
  setActiveTab: (tab: string) => void;
}

const ResumeHeader = ({ onDownloadResume, setActiveTab }: ResumeHeaderProps) => {
  const navigate = useNavigate();
  
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-primary">CV Hub</h1>
            <p className="text-gray-500 text-sm">Create professional CVs with AI assistance</p>
          </div>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              onClick={() => navigate('/')}
            >
              <Home className="h-4 w-4 mr-2" /> Home
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate('/jobs')}
            >
              <Briefcase className="h-4 w-4 mr-2" /> Browse Jobs
            </Button>
            <Button
              variant="outline"
              onClick={() => setActiveTab("ai")}
            >
              <Wand2 className="h-4 w-4 mr-2" /> AI Assist
            </Button>
            <Button onClick={onDownloadResume}>
              <Download className="h-4 w-4 mr-2" /> Download
            </Button>
          </div>
        </div>
        
        {/* Navigation Links */}
        <div className="flex mt-4 space-x-6">
          <Link to="/" className="text-primary font-medium">CV Builder</Link>
          <Link to="/jobs" className="text-gray-600 hover:text-primary">Browse Jobs</Link>
          <Link to="/cover-letter/generate" className="text-gray-600 hover:text-primary">Cover Letter</Link>
          <Link to="/subscription-plans" className="text-gray-600 hover:text-primary">Subscription Plans</Link>
          <Link to="/employer/post-job" className="text-gray-600 hover:text-primary">For Employers</Link>
        </div>
      </div>
    </header>
  );
};

export default ResumeHeader;
