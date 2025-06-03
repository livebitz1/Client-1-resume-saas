
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Briefcase, Search, Calendar } from "lucide-react";

// Mock job data
const mockJobs = [
  {
    id: "1",
    title: "Frontend Developer",
    company: "Tech Innovations Inc",
    location: "San Francisco, CA",
    type: "Full-time",
    description: "Seeking an experienced frontend developer skilled in React...",
    requirements: ["React", "TypeScript", "3+ years experience"],
    postedAt: "2025-05-01T00:00:00.000Z",
    applicationDeadline: "2025-06-01T00:00:00.000Z"
  },
  {
    id: "2",
    title: "UX Designer",
    company: "Creative Solutions",
    location: "Remote",
    type: "Full-time",
    description: "Join our team as a creative UX designer with a passion for user-centered design...",
    requirements: ["Figma", "User Testing", "Portfolio"],
    postedAt: "2025-05-03T00:00:00.000Z",
    applicationDeadline: "2025-06-15T00:00:00.000Z"
  },
  {
    id: "3",
    title: "Data Scientist",
    company: "Data Insights Corp",
    location: "New York, NY",
    type: "Contract",
    description: "Looking for a data scientist to help analyze large datasets...",
    requirements: ["Python", "Machine Learning", "Statistics"],
    postedAt: "2025-05-05T00:00:00.000Z",
    applicationDeadline: "2025-05-30T00:00:00.000Z"
  }
];

const Jobs = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  
  // Format date for display
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  // Filter jobs based on search term
  const filteredJobs = mockJobs.filter(job => 
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Find Your Dream Job</h1>
          <p className="text-gray-500">Browse through available positions and apply with your optimized resume</p>
        </div>
        <Button 
          onClick={() => navigate('/employer/post-job')}
          className="mt-4 md:mt-0"
        >
          Post a Job
        </Button>
      </div>
      
      <div className="mb-8 relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
        <Input
          placeholder="Search jobs by title, company, or location..."
          className="pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      <div className="space-y-6">
        {filteredJobs.length > 0 ? (
          filteredJobs.map(job => (
            <Card key={job.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row justify-between">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{job.title}</h3>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-gray-600 mb-4">
                      <span className="flex items-center">
                        <Briefcase className="h-4 w-4 mr-1" />
                        {job.company}
                      </span>
                      <span className="hidden sm:block">•</span>
                      <span>{job.location}</span>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      <Badge variant="secondary">{job.type}</Badge>
                      {job.requirements.map((req, index) => (
                        <Badge key={index} variant="outline">{req}</Badge>
                      ))}
                    </div>
                    
                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {job.description}
                    </p>
                    
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>Apply by {formatDate(job.applicationDeadline)}</span>
                      <span className="mx-2">•</span>
                      <span>Posted {formatDate(job.postedAt)}</span>
                    </div>
                  </div>
                  
                  <div className="mt-4 md:mt-0 md:ml-6 flex md:flex-col gap-3">
                    <Button onClick={() => navigate(`/jobs/${job.id}`)}>
                      View Details
                    </Button>
                    <Button variant="outline" onClick={() => navigate(`/cover-letter/generate?jobId=${job.id}`)}>
                      Create Resume
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium mb-2">No jobs found</h3>
            <p className="text-gray-500">Try adjusting your search criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Jobs;
