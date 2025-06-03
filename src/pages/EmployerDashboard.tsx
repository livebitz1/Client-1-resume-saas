
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Calendar, Users, FileText } from "lucide-react";

const EmployerDashboard = () => {
  const navigate = useNavigate();
  
  // Mock data for posted jobs
  const postedJobs = [
    {
      id: "e1",
      title: "Senior Developer",
      applicants: 12,
      views: 156,
      postedDate: "2025-05-01T00:00:00.000Z",
      expiryDate: "2025-06-01T00:00:00.000Z",
      status: "active"
    },
    {
      id: "e2",
      title: "Product Manager",
      applicants: 8,
      views: 78,
      postedDate: "2025-05-05T00:00:00.000Z",
      expiryDate: "2025-06-05T00:00:00.000Z",
      status: "active"
    }
  ];

  // Format date for display
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Employer Dashboard</h1>
          <p className="text-gray-500">Manage your job postings and applicants</p>
        </div>
        <Button onClick={() => navigate('/employer/post-job')}>
          Post New Job
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Active Jobs</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{postedJobs.length}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Total Applicants</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">
              {postedJobs.reduce((sum, job) => sum + job.applicants, 0)}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Total Views</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">
              {postedJobs.reduce((sum, job) => sum + job.views, 0)}
            </p>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-xl font-semibold mb-4">Your Job Postings</h2>
      
      {postedJobs.length > 0 ? (
        <div className="space-y-4">
          {postedJobs.map(job => (
            <Card key={job.id}>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row justify-between">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{job.title}</h3>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        Posted: {formatDate(job.postedDate)}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        Expires: {formatDate(job.expiryDate)}
                      </div>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        Applicants: {job.applicants}
                      </div>
                      <div className="flex items-center">
                        <FileText className="h-4 w-4 mr-1" />
                        Views: {job.views}
                      </div>
                    </div>
                  </div>
                  <div className="flex mt-4 md:mt-0 gap-2">
                    <Button variant="outline">
                      View Applicants
                    </Button>
                    <Button variant="outline">
                      Edit
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-6 text-center">
            <p className="mb-4">You haven't posted any jobs yet</p>
            <Button onClick={() => navigate('/employer/post-job')}>
              Post Your First Job
            </Button>
          </CardContent>
        </Card>
      )}

      <div className="mt-8 bg-gray-50 border rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-4">Post a New Job for Free</h2>
        <p className="mb-4">Reach qualified candidates and find the perfect fit for your team. Job listings are free for 30 days.</p>
        <Button onClick={() => navigate('/employer/post-job')}>
          Post New Job
        </Button>
      </div>
    </div>
  );
};

export default EmployerDashboard;
