
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, FileText, FileUp, Download, Briefcase } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";
import { User as UserType } from "@/types/user";

const CandidateDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [resumes, setResumes] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState([]);
  
  useEffect(() => {
    const fetchUserData = async () => {
      setIsLoading(true);
      
      try {
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) {
          // Redirect to login if no user found
          navigate('/auth');
          return;
        }
        
        // Fetch profile data
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();
          
        if (profileError) throw profileError;
        
        // Fetch resumes
        const { data: userResumes, error: resumesError } = await supabase
          .from('resumes')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });
          
        if (resumesError) throw resumesError;
        
        // Fetch applied jobs
        const { data: userJobs, error: jobsError } = await supabase
          .from('job_applications')
          .select(`
            *,
            jobs (
              id, 
              title, 
              company,
              location,
              status
            )
          `)
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });
          
        if (jobsError) throw jobsError;
        
        setUser({
          ...profile,
          id: user.id,
          email: user.email,
          createdAt: user.created_at,
        });
        
        setResumes(userResumes || []);
        setAppliedJobs(userJobs || []);
        
      } catch (error) {
        console.error("Error fetching user data:", error);
        toast.error("Failed to load your profile data");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchUserData();
  }, [navigate]);
  
  const handleDownloadResume = async (resumeId) => {
    // Check if user has credits or subscription
    if (!user?.subscription?.planId && (!user?.subscription?.resumeCredits || user.subscription.resumeCredits <= 0)) {
      // Redirect to payment gateway
      navigate('/payment');
      return;
    }
    
    try {
      // Logic to download resume
      toast.success("Resume downloaded successfully!");
      
      // If using credits, update the count
      if (user?.subscription?.resumeCredits && !user?.subscription?.planId) {
        // Update credits in database
        await supabase
          .from('profiles')
          .update({
            'subscription.resumeCredits': user.subscription.resumeCredits - 1
          })
          .eq('id', user.id);
        
        // Update local state
        setUser({
          ...user,
          subscription: {
            ...user.subscription,
            resumeCredits: user.subscription.resumeCredits - 1
          }
        });
      }
      
    } catch (error) {
      console.error("Error downloading resume:", error);
      toast.error("Failed to download resume");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading your dashboard...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Candidate Dashboard</h1>
          <p className="text-gray-500">Manage your resumes and job applications</p>
        </div>
        <div className="mt-4 md:mt-0 flex gap-2">
          <Button onClick={() => navigate('/resume/builder')}>
            <FileText className="mr-2 h-4 w-4" /> Create Resume
          </Button>
          <Button variant="outline" onClick={() => navigate('/resume/upload')}>
            <FileUp className="mr-2 h-4 w-4" /> Upload Resume
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Your Resumes</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{resumes.length}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Applications</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{appliedJobs.length}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Subscription Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-1">
              <Badge variant={user?.subscription?.status === 'active' ? "default" : "outline"} className="w-fit">
                {user?.subscription?.status === 'active' ? 'Active Subscription' : 'No Active Plan'}
              </Badge>
              {user?.subscription?.resumeCredits !== undefined && (
                <p className="text-sm">{user.subscription.resumeCredits} resume downloads remaining</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-xl font-semibold mb-4">Your Resumes</h2>
          {resumes.length > 0 ? (
            <div className="space-y-4">
              {resumes.map(resume => (
                <Card key={resume.id}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-lg font-semibold">{resume.name}</h3>
                        <p className="text-gray-500 text-sm">Created: {new Date(resume.created_at).toLocaleDateString()}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => navigate(`/resume/edit/${resume.id}`)}>
                          Edit
                        </Button>
                        <Button size="sm" onClick={() => handleDownloadResume(resume.id)}>
                          <Download className="h-4 w-4" />
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
                <p className="mb-4">You haven't created any resumes yet</p>
                <Button onClick={() => navigate('/resume/builder')}>
                  Create Your First Resume
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
        
        <div>
          <h2 className="text-xl font-semibold mb-4">Your Job Applications</h2>
          {appliedJobs.length > 0 ? (
            <div className="space-y-4">
              {appliedJobs.map(application => (
                <Card key={application.id}>
                  <CardContent className="p-6">
                    <div className="flex flex-col">
                      <h3 className="text-lg font-semibold">{application.jobs.title}</h3>
                      <p className="text-gray-500">{application.jobs.company} • {application.jobs.location}</p>
                      <div className="flex items-center mt-2">
                        <Badge variant={application.status === 'applied' ? 'default' : application.status === 'interviewed' ? 'secondary' : 'outline'}>
                          {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                        </Badge>
                        <p className="text-gray-500 text-sm ml-2">Applied: {new Date(application.created_at).toLocaleDateString()}</p>
                      </div>
                      <Button variant="outline" size="sm" className="mt-2 w-full md:w-auto" onClick={() => navigate(`/jobs/${application.job_id}`)}>
                        View Job
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-6 text-center">
                <p className="mb-4">You haven't applied to any jobs yet</p>
                <Button onClick={() => navigate('/jobs')}>
                  <Briefcase className="mr-2 h-4 w-4" /> Browse Jobs
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      <div className="mt-8 bg-gray-50 border rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-4">Upgrade Your Plan</h2>
        <p className="mb-4">Get unlimited resume downloads and AI-powered job matching with our premium plans</p>
        <Button onClick={() => navigate('/subscription-plans')}>
          View Plans
        </Button>
      </div>
    </div>
  );
};

export default CandidateDashboard;
