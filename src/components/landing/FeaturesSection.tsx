
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, Briefcase, CheckCheck, Users, Bot, BarChart3 } from "lucide-react";

const FeaturesSection = () => {
  const features = [
    {
      title: "AI Resume Builder",
      description: "Create professional resumes with AI suggestions tailored to specific jobs and industries",
      icon: <Bot className="h-8 w-8 text-teal-600" />,
      color: "bg-teal-50 border-teal-100",
    },
    {
      title: "Auto Apply Technology",
      description: "First in Africa: Apply to multiple jobs automatically with intelligent matching algorithms",
      icon: <Briefcase className="h-8 w-8 text-teal-600" />,
      color: "bg-teal-50 border-teal-100",
    },
    {
      title: "Job Match Scoring",
      description: "See how well your profile matches job requirements with our advanced AI scoring system",
      icon: <CheckCheck className="h-8 w-8 text-teal-600" />,
      color: "bg-teal-50 border-teal-100",
    },
    {
      title: "Employer Dashboard",
      description: "Comprehensive dashboard for employers to manage job postings and track applicant statistics",
      icon: <Users className="h-8 w-8 text-teal-600" />,
      color: "bg-teal-50 border-teal-100",
    },
    {
      title: "Smart Cover Letters",
      description: "Generate customized cover letters for each job application using advanced AI technology",
      icon: <FileText className="h-8 w-8 text-teal-600" />,
      color: "bg-teal-50 border-teal-100",
    },
    {
      title: "Analytics & Insights",
      description: "Track your application success rate and get insights to improve your job search strategy",
      icon: <BarChart3 className="h-8 w-8 text-teal-600" />,
      color: "bg-teal-50 border-teal-100",
    },
  ];

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-r from-teal-50/50 to-teal-100/50"></div>
      
      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-16">
          <div className="inline-block bg-gradient-to-r from-teal-600 to-teal-700 text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
            Powerful Features
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-teal-700 bg-clip-text text-transparent">
            Everything You Need to 
            <span className="block text-teal-600">Accelerate Your Career</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Our comprehensive platform combines cutting-edge AI technology with intuitive design 
            to streamline your job search and recruitment process.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <Card key={index} className={`border-2 hover:shadow-xl transition-all duration-300 group hover:scale-105 ${feature.color}`}>
              <CardContent className="p-8">
                <div className="mb-6 bg-white p-4 rounded-2xl w-fit shadow-sm group-hover:shadow-md transition-shadow">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-900 group-hover:text-teal-600 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Feature showcase with image */}
        <div className="bg-gradient-to-r from-teal-600 to-teal-700 rounded-3xl p-8 md:p-12 text-white">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                See Our Platform in Action
              </h3>
              <p className="text-teal-100 mb-6 text-lg">
                Watch how our AI-powered tools transform the way you create resumes, 
                apply for jobs, and connect with employers across Africa.
              </p>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <span>AI-enhanced resume content</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <span>Automated job applications</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <span>Real-time match scoring</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                alt="AI Resume Builder interface showing resume creation process"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-teal-900/20 to-transparent rounded-2xl"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
