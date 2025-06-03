
import React from "react";
import { Button } from "@/components/ui/button";
import { FileText, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface HeroSectionProps {
  onShowWalkthrough: () => void;
}

const HeroSection = ({ onShowWalkthrough }: HeroSectionProps) => {
  return (
    <header className="relative overflow-hidden">
      <div className="container mx-auto px-4 py-20 md:py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">
              Africa's First Auto Apply Platform
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-gray-900">
              Transform Your Career Journey with <span className="text-primary">The Resume Hub</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-lg">
              Build professional CVs, apply to jobs automatically, and connect with top employers all in one place.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild>
                <Link to="/resume/builder">
                  Build Your CV <FileText className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/jobs">
                  Browse Jobs <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
            <Button 
              variant="link" 
              onClick={onShowWalkthrough}
              className="px-0"
            >
              Take a quick tour of our platform
            </Button>
          </div>
          <div className="hidden md:block relative">
            <img 
              src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d" 
              alt="Person using laptop with resume" 
              className="rounded-lg shadow-2xl"
            />
            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg">
              <div className="flex items-center space-x-2">
                <div className="h-4 w-4 bg-green-500 rounded-full animate-pulse"></div>
                <span className="font-medium">Auto-applying to matching jobs</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeroSection;
