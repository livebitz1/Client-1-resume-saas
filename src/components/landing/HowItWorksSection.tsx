
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, CheckCheck, Briefcase } from "lucide-react";

const HowItWorksSection = () => {
  const steps = [
    {
      title: "Upload Your CV",
      description: "Upload your existing CV or create a new one with our AI-powered builder",
      icon: <Upload className="h-10 w-10 text-teal-600" />,
    },
    {
      title: "Match with Jobs",
      description: "Our AI matches your skills and experience with relevant job openings",
      icon: <CheckCheck className="h-10 w-10 text-teal-600" />,
    },
    {
      title: "Auto Apply",
      description: "Let our system automatically apply to matching jobs on your behalf",
      icon: <Briefcase className="h-10 w-10 text-teal-600" />,
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">How It Works</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Three simple steps to revolutionize your job search experience
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-all bg-teal-50/30 border-teal-100">
              <CardContent className="pt-6 px-6 text-center">
                <div className="mb-6 flex justify-center">
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
