
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const PostJob = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    type: "",
    salary: "",
    description: "",
    requirements: "",
    applicationDeadline: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.title || !formData.company || !formData.description) {
      toast.error("Please fill in all required fields");
      return;
    }

    setLoading(true);
    try {
      // Mock API call to post job
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast.success("Job posted successfully!");
      navigate("/employer/dashboard");
    } catch (error) {
      console.error("Error posting job:", error);
      toast.error("Failed to post job. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Post a New Job</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Job Title *</Label>
                  <Input 
                    id="title" 
                    name="title" 
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="e.g., Senior Frontend Developer"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="company">Company Name *</Label>
                  <Input 
                    id="company" 
                    name="company" 
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="e.g., Acme Inc."
                    required
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="location">Location *</Label>
                    <Input 
                      id="location" 
                      name="location" 
                      value={formData.location}
                      onChange={handleChange}
                      placeholder="e.g., New York, NY or Remote"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="type">Job Type *</Label>
                    <Select 
                      value={formData.type}
                      onValueChange={(value) => handleSelectChange("type", value)}
                    >
                      <SelectTrigger id="type">
                        <SelectValue placeholder="Select job type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Full-time">Full-time</SelectItem>
                        <SelectItem value="Part-time">Part-time</SelectItem>
                        <SelectItem value="Contract">Contract</SelectItem>
                        <SelectItem value="Internship">Internship</SelectItem>
                        <SelectItem value="Remote">Remote</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="salary">Salary Range (Optional)</Label>
                  <Input 
                    id="salary" 
                    name="salary" 
                    value={formData.salary}
                    onChange={handleChange}
                    placeholder="e.g., $80,000 - $100,000 per year"
                  />
                </div>
                
                <div>
                  <Label htmlFor="description">Job Description *</Label>
                  <Textarea 
                    id="description" 
                    name="description" 
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Describe the job role, responsibilities, and company..."
                    className="min-h-[150px]"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="requirements">Requirements (One per line)</Label>
                  <Textarea 
                    id="requirements" 
                    name="requirements" 
                    value={formData.requirements}
                    onChange={handleChange}
                    placeholder="List job requirements, one per line..."
                    className="min-h-[100px]"
                  />
                </div>
                
                <div>
                  <Label htmlFor="applicationDeadline">Application Deadline</Label>
                  <Input 
                    id="applicationDeadline" 
                    name="applicationDeadline" 
                    type="date"
                    value={formData.applicationDeadline}
                    onChange={handleChange}
                  />
                </div>
              </div>
              
              <div className="pt-4 flex justify-end space-x-4">
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={() => navigate(-1)}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={loading}>
                  {loading ? "Posting..." : "Post Job"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <div className="mt-8 bg-gray-50 border rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-2">Tips for Writing Effective Job Postings</h3>
          <ul className="space-y-2 list-disc pl-5">
            <li>Be specific about required qualifications and experience</li>
            <li>Include salary information to attract relevant candidates</li>
            <li>Describe company culture and benefits</li>
            <li>Keep the job title clear and searchable</li>
            <li>Highlight growth opportunities and unique aspects of the role</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PostJob;
