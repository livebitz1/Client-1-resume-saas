
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Briefcase, Calendar, MapPin, DollarSign } from "lucide-react";

// Mock job data - in a real app, this would come from an API
const mockJob = {
  id: "1",
  title: "Frontend Developer",
  company: "Tech Innovations Inc",
  location: "San Francisco, CA",
  type: "Full-time" as const,
  salary: "$80,000 - $120,000",
  description: "We are seeking a talented Frontend Developer to join our team. You will be responsible for implementing visual elements and user interactions that users see and interact with in a web application.",
  requirements: [
    "3+ years of experience with React",
    "Strong TypeScript skills",
    "Experience with modern CSS frameworks like Tailwind",
    "Understanding of responsive design principles",
    "Knowledge of web performance optimization",
    "Bachelor's degree in Computer Science or related field (or equivalent experience)"
  ],
  responsibilities: [
    "Develop new user-facing features using React.js",
    "Build reusable components and libraries for future use",
    "Translate designs and wireframes into high-quality code",
    "Optimize components for maximum performance across devices",
    "Collaborate with backend developers and designers"
  ],
  applicationDeadline: "2025-06-01T00:00:00.000Z",
  postedAt: "2025-05-01T00:00:00.000Z",
  employerId: "emp-123",
  active: true
};

const JobDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isApplying, setIsApplying] = useState(false);
  
  // Format date for display
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleApply = () => {
    setIsApplying(true);
    
    // Mock applying process - would check subscription status in production
    setTimeout(() => {
      setIsApplying(false);
      toast.info(
        <div className="space-y-2">
          <p>To apply directly from Resume Hub, you need an active subscription.</p>
          <div className="flex space-x-2">
            <Button size="sm" variant="outline" onClick={() => navigate(`/cover-letter/generate?jobId=${id}`)}>
              Create Resume First
            </Button>
            <Button size="sm" onClick={() => navigate('/subscription-plans')}>
              View Plans
            </Button>
          </div>
        </div>,
        { duration: 8000 }
      );
    }, 1500);
  };
  
  const handleCreateResume = () => {
    navigate(`/cover-letter/generate?jobId=${id}`);
  };

  // In a real app, we would fetch the job details from an API
  const job = mockJob;

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row justify-between">
              <div>
                <h1 className="text-3xl font-bold mb-2">{job.title}</h1>
                <div className="flex items-center text-gray-600 mb-4">
                  <Briefcase className="h-5 w-5 mr-2" />
                  <span className="font-medium">{job.company}</span>
                </div>
                
                <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    {job.location}
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    Posted: {formatDate(job.postedAt)}
                  </div>
                  {job.salary && (
                    <div className="flex items-center">
                      <DollarSign className="h-4 w-4 mr-1" />
                      {job.salary}
                    </div>
                  )}
                </div>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  <Badge variant="secondary">{job.type}</Badge>
                </div>
              </div>
              
              <div className="flex flex-col gap-3 mt-4 lg:mt-0">
                <Button 
                  onClick={handleApply}
                  disabled={isApplying}
                  className="w-full"
                >
                  {isApplying ? "Applying..." : "Apply Now"}
                </Button>
                <Button 
                  variant="outline"
                  onClick={handleCreateResume}
                  className="w-full"
                >
                  Create Resume
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Job Description</h2>
                <p className="text-gray-700 whitespace-pre-line">{job.description}</p>
                
                <h3 className="text-lg font-semibold mt-6 mb-3">Responsibilities</h3>
                <ul className="list-disc pl-5 space-y-2">
                  {job.responsibilities.map((responsibility, index) => (
                    <li key={index} className="text-gray-700">{responsibility}</li>
                  ))}
                </ul>
                
                <h3 className="text-lg font-semibold mt-6 mb-3">Requirements</h3>
                <ul className="list-disc pl-5 space-y-2">
                  {job.requirements.map((requirement, index) => (
                    <li key={index} className="text-gray-700">{requirement}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Application Process</h2>
                <p className="text-gray-700">
                  To apply for this position, you can either:
                </p>
                <ul className="list-disc pl-5 space-y-2 mt-2 mb-4">
                  <li>Click the "Apply Now" button (requires subscription)</li>
                  <li>Create an ATS-optimized resume using our "Create Resume" button</li>
                </ul>
                <p className="text-gray-700">
                  Application deadline: {formatDate(job.applicationDeadline)}
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Job Summary</h2>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-500">Job Type</p>
                    <p className="font-medium">{job.type}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Location</p>
                    <p className="font-medium">{job.location}</p>
                  </div>
                  {job.salary && (
                    <div>
                      <p className="text-sm text-gray-500">Salary Range</p>
                      <p className="font-medium">{job.salary}</p>
                    </div>
                  )}
                  <div>
                    <p className="text-sm text-gray-500">Application Deadline</p>
                    <p className="font-medium">{formatDate(job.applicationDeadline)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold mb-4">ATS Resume Tips</h2>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-2 mt-0.5">1</div>
                    <p className="text-sm">Include keywords from the job description</p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-2 mt-0.5">2</div>
                    <p className="text-sm">Use a clean, professional template</p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-2 mt-0.5">3</div>
                    <p className="text-sm">Highlight relevant experience</p>
                  </li>
                </ul>
                <div className="mt-4">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="w-full" 
                    onClick={handleCreateResume}
                  >
                    Create ATS-Optimized Resume
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-blue-900 mb-2">Auto-Apply Feature</h3>
              <p className="text-sm text-blue-800 mb-3">
                Subscribe to automatically apply to matching jobs with your pre-approved resume and cover letter.
              </p>
              <Button 
                size="sm"
                variant="outline"
                className="w-full bg-white"
                onClick={() => navigate('/subscription-plans')}
              >
                View Plans
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
