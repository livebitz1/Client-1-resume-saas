
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const ResumeUpload = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Redirect to the Resume/CV builder page
    toast.info("Redirecting to our Resume/CV builder for a better experience");
    navigate('/resume/builder');
  }, [navigate]);

  // This component will never actually render anything as it immediately redirects
  return (
    <div className="container mx-auto py-12 px-4">
      <p>Redirecting to Resume/CV builder...</p>
    </div>
  );
};

export default ResumeUpload;
