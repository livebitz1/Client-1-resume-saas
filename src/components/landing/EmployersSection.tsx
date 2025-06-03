
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, ArrowRight, Users, Target, TrendingUp, Clock } from "lucide-react";
import { Link } from "react-router-dom";

const EmployersSection = () => {
  const features = [
    {
      icon: <Target className="h-6 w-6 text-teal-600" />,
      title: "Reach Active Candidates",
      description: "Connect with job seekers who are actively applying"
    },
    {
      icon: <TrendingUp className="h-6 w-6 text-teal-600" />,
      title: "AI Matching Scores",
      description: "Get detailed candidate matching scores powered by AI"
    },
    {
      icon: <Clock className="h-6 w-6 text-teal-600" />,
      title: "Faster Hiring",
      description: "Reduce time-to-hire with streamlined recruitment"
    },
    {
      icon: <Users className="h-6 w-6 text-teal-600" />,
      title: "Quality Candidates",
      description: "Access Africa's largest pool of verified professionals"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-teal-50 to-teal-100 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Content */}
          <div className="space-y-8 order-2 lg:order-1">
            <div className="inline-block bg-teal-100 text-teal-700 px-4 py-2 rounded-full text-sm font-medium">
              For Employers
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
              Access Africa's Largest Pool of 
              <span className="text-teal-600 block">Active Job Seekers</span>
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              Post your job openings and connect with thousands of qualified candidates 
              actively looking for opportunities across Africa.
            </p>
            
            {/* Feature Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <Card key={index} className="border-0 shadow-sm bg-white/70 backdrop-blur-sm hover:shadow-md transition-all">
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-10 h-10 bg-teal-50 rounded-lg flex items-center justify-center">
                        {feature.icon}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">{feature.title}</h4>
                        <p className="text-sm text-gray-600">{feature.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-teal-600 hover:bg-teal-700 shadow-lg hover:shadow-xl transition-all" asChild>
                <Link to="/employer/post-job">
                  Post a Job <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-teal-600 text-teal-600 hover:bg-teal-50" asChild>
                <Link to="/employer/dashboard">
                  Employer Dashboard
                </Link>
              </Button>
            </div>
          </div>

          {/* Image - moved to separate container with better spacing */}
          <div className="order-1 lg:order-2 relative mt-16 lg:mt-0">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                alt="Professional employer reviewing candidate profiles on laptop" 
                className="w-full h-auto"
              />
              {/* Floating stats with better positioning */}
              <div className="absolute top-8 left-6 bg-white/95 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-teal-100">
                <div className="text-2xl font-bold text-teal-600">2,500+</div>
                <div className="text-sm text-gray-600">Active Candidates</div>
              </div>
              <div className="absolute bottom-8 right-6 bg-white/95 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-teal-100">
                <div className="text-2xl font-bold text-teal-600">90%</div>
                <div className="text-sm text-gray-600">Match Accuracy</div>
              </div>
            </div>
            
            {/* Background decoration with adjusted positioning */}
            <div className="absolute -top-8 -right-8 w-64 h-64 bg-teal-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 -z-10"></div>
            <div className="absolute -bottom-8 -left-8 w-64 h-64 bg-teal-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 -z-10"></div>
          </div>
        </div>
        
        {/* Bottom CTA */}
        <div className="mt-20 text-center bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-teal-100">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to Find Your Next Great Hire?
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Join hundreds of employers who have successfully hired through our platform. 
            Post your first job for free and start connecting with top talent today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-teal-600 hover:bg-teal-700" asChild>
              <Link to="/employer/post-job">
                Post Your First Job - Free
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-teal-600 text-teal-600 hover:bg-teal-50" asChild>
              <Link to="/subscription-plans">
                View Pricing Plans
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EmployersSection;
