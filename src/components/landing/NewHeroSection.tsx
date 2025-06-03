
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, Bot, Zap, Users, CheckCircle, ArrowRight, Sparkles, Target } from "lucide-react";
import { Link } from "react-router-dom";

interface NewHeroSectionProps {
  onShowWalkthrough: () => void;
}

const NewHeroSection = ({ onShowWalkthrough }: NewHeroSectionProps) => {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-teal-50 via-white to-teal-100 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-teal-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-teal-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-teal-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative container mx-auto px-4 py-20">
        {/* Main Hero Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="space-y-8">
            <div className="inline-flex items-center px-4 py-2 bg-teal-100 border border-teal-200 rounded-full text-teal-700 text-sm font-medium">
              <Sparkles className="w-4 h-4 mr-2" />
              Africa's First AI-Powered Auto Apply Platform
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-gray-900 via-teal-700 to-teal-800 bg-clip-text text-transparent leading-tight">
              Transform Your
              <br />
              <span className="text-teal-600">Career Journey</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl leading-relaxed">
              Build professional CVs with AI, apply to thousands of jobs automatically, 
              and connect with top employers across Africa.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-start items-start">
              <Button size="lg" className="px-8 py-6 text-lg bg-teal-600 hover:bg-teal-700 shadow-lg hover:shadow-xl transition-all" asChild>
                <Link to="/resume/builder">
                  <FileText className="mr-2 h-5 w-5" />
                  Build Your CV Now
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="px-8 py-6 text-lg border-2 border-teal-600 text-teal-600 hover:bg-teal-50" asChild>
                <Link to="/jobs">
                  <Target className="mr-2 h-5 w-5" />
                  Browse Jobs
                </Link>
              </Button>
            </div>

            <Button 
              variant="link" 
              onClick={onShowWalkthrough}
              className="text-teal-600 hover:text-teal-800 p-0"
            >
              Take a quick tour of our platform <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                alt="AI Resume Builder Dashboard" 
                className="w-full h-auto"
              />
              {/* Floating notification cards */}
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-lg animate-fade-in">
                <div className="flex items-center space-x-2">
                  <div className="h-3 w-3 bg-teal-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">CV Enhanced by AI</span>
                </div>
              </div>
              <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-lg animate-fade-in animation-delay-1000">
                <div className="flex items-center space-x-2">
                  <div className="h-3 w-3 bg-teal-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">Auto-applying to 25 jobs</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/70 backdrop-blur-sm group hover:scale-105">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-teal-100 to-teal-200 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Bot className="h-8 w-8 text-teal-600" />
              </div>
              <h3 className="text-xl font-bold mb-4">AI-Powered CV Builder</h3>
              <p className="text-gray-600 mb-4">
                Create professional CVs with intelligent suggestions and industry-specific optimization.
              </p>
              <div className="flex items-center justify-center text-teal-600 text-sm font-medium">
                <CheckCircle className="w-4 h-4 mr-1" />
                Smart Content Enhancement
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/70 backdrop-blur-sm group hover:scale-105">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-teal-100 to-teal-200 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Zap className="h-8 w-8 text-teal-600" />
              </div>
              <h3 className="text-xl font-bold mb-4">Auto Apply Technology</h3>
              <p className="text-gray-600 mb-4">
                First in Africa! Apply to multiple jobs automatically with intelligent matching.
              </p>
              <div className="flex items-center justify-center text-teal-600 text-sm font-medium">
                <CheckCircle className="w-4 h-4 mr-1" />
                Save 90% of Application Time
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/70 backdrop-blur-sm group hover:scale-105">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-teal-100 to-teal-200 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Users className="h-8 w-8 text-teal-600" />
              </div>
              <h3 className="text-xl font-bold mb-4">Employer Connect</h3>
              <p className="text-gray-600 mb-4">
                Connect directly with hiring managers and get noticed by top companies.
              </p>
              <div className="flex items-center justify-center text-teal-600 text-sm font-medium">
                <CheckCircle className="w-4 h-4 mr-1" />
                Direct Employer Access
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Stats Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8 border border-teal-100">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="group">
              <div className="text-3xl md:text-4xl font-bold text-teal-600 mb-2 group-hover:scale-110 transition-transform">10K+</div>
              <div className="text-gray-600">CVs Created</div>
            </div>
            <div className="group">
              <div className="text-3xl md:text-4xl font-bold text-teal-600 mb-2 group-hover:scale-110 transition-transform">50K+</div>
              <div className="text-gray-600">Job Applications</div>
            </div>
            <div className="group">
              <div className="text-3xl md:text-4xl font-bold text-teal-600 mb-2 group-hover:scale-110 transition-transform">1K+</div>
              <div className="text-gray-600">Active Employers</div>
            </div>
            <div className="group">
              <div className="text-3xl md:text-4xl font-bold text-teal-600 mb-2 group-hover:scale-110 transition-transform">85%</div>
              <div className="text-gray-600">Success Rate</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewHeroSection;
