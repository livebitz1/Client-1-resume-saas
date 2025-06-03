
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { X, ArrowRight, ArrowLeft } from "lucide-react";

interface Step {
  title: string;
  description: string;
  image: string;
}

interface WalkthroughProps {
  open: boolean;
  onClose: () => void;
}

export const Walkthrough: React.FC<WalkthroughProps> = ({ open, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);
  
  const steps: Step[] = [
    {
      title: "Welcome to The Resume Hub",
      description: "Africa's first Auto Apply platform. Let us guide you through how to make the most of our platform.",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    },
    {
      title: "Create or Upload Your CV",
      description: "Start by creating a professional CV using our AI-powered builder or upload your existing CV for enhancement.",
      image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643",
    },
    {
      title: "Let AI Enhance Your CV",
      description: "Our advanced AI tools powered by OpenAI and Eden AI help make your CV stand out to employers and pass through ATS systems.",
      image: "https://images.unsplash.com/photo-1516110833967-0b5716ca1387",
    },
    {
      title: "Generate ATS-Optimized Cover Letters",
      description: "Our AI can analyze job descriptions and create tailored cover letters that increase your chances of getting an interview.",
      image: "https://images.unsplash.com/photo-1512626120412-faf41adb4874",
    },
    {
      title: "Auto Apply to Jobs",
      description: "Enable Auto Apply to automatically submit your CV to matching job opportunities based on your skills and preferences.",
      image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf",
    },
    {
      title: "Track Your Applications",
      description: "Monitor the status of all your job applications in one place and get insights to improve your success rate.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
    },
  ];
  
  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onClose();
    }
  };
  
  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  const handleSkip = () => {
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md md:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-center text-xl">{steps[currentStep].title}</DialogTitle>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-4"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>
        
        <div className="flex flex-col items-center py-4">
          <div className="w-full h-48 md:h-64 bg-gray-100 rounded-lg mb-4 overflow-hidden">
            <img
              src={steps[currentStep].image}
              alt={steps[currentStep].title}
              className="w-full h-full object-cover"
            />
          </div>
          <p className="text-center text-gray-700 mb-4">
            {steps[currentStep].description}
          </p>
          
          {/* Progress indicator */}
          <div className="flex justify-center space-x-2 mt-2">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`h-2 w-2 rounded-full ${
                  index === currentStep ? "bg-primary" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
        
        <DialogFooter className="sm:justify-between">
          <div className="flex justify-between w-full">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 0}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Previous
            </Button>
            
            <Button variant="ghost" onClick={handleSkip}>
              Skip
            </Button>
            
            <Button onClick={handleNext}>
              {currentStep === steps.length - 1 ? "Finish" : "Next"}
              {currentStep < steps.length - 1 && <ArrowRight className="ml-2 h-4 w-4" />}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
