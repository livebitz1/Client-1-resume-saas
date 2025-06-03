
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ResumeData } from '@/types/resume';
import { toast } from 'sonner';

interface JobMatchScoreProps {
  resumeData: ResumeData;
}

interface JobMatch {
  jobId: string;
  jobTitle: string;
  company: string;
  matchScore: number;
  keywordMatches: string[];
  missingKeywords: string[];
}

const JobMatchScore: React.FC<JobMatchScoreProps> = ({ resumeData }) => {
  const [matches, setMatches] = useState<JobMatch[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Mock job matching algorithm based on skills and keywords
  useEffect(() => {
    // Function to simulate job matching with AI
    const calculateJobMatches = async () => {
      setIsLoading(true);
      
      try {
        // In a real app, we'd call an AI-powered service here
        // For now, we'll simulate a delay and return mock matches
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Extract skills from resume
        const skills = resumeData.skills.map(skill => skill.name.toLowerCase());
        const workDescriptions = resumeData.work.map(work => work.summary.toLowerCase());
        const workTitles = resumeData.work.map(work => work.position.toLowerCase());
        const allText = [...skills, ...workDescriptions, ...workTitles].join(' ');
        
        // Mock jobs with keywords
        const mockJobs = [
          {
            jobId: 'job1',
            jobTitle: 'Software Developer',
            company: 'Tech Solutions SA',
            keywords: ['javascript', 'react', 'node.js', 'software development', 'web development'],
          },
          {
            jobId: 'job2',
            jobTitle: 'Data Analyst',
            company: 'Data Insights Cape Town',
            keywords: ['sql', 'python', 'data analysis', 'excel', 'statistics'],
          },
          {
            jobId: 'job3',
            jobTitle: 'Project Manager',
            company: 'BuildRight Johannesburg',
            keywords: ['project management', 'agile', 'leadership', 'scrum', 'planning'],
          },
        ];
        
        // Calculate match scores
        const jobMatches = mockJobs.map(job => {
          const keywordMatches: string[] = [];
          const missingKeywords: string[] = [];
          
          job.keywords.forEach(keyword => {
            if (allText.includes(keyword.toLowerCase())) {
              keywordMatches.push(keyword);
            } else {
              missingKeywords.push(keyword);
            }
          });
          
          const matchScore = (keywordMatches.length / job.keywords.length) * 100;
          
          return {
            jobId: job.jobId,
            jobTitle: job.jobTitle,
            company: job.company,
            matchScore,
            keywordMatches,
            missingKeywords,
          };
        });
        
        // Sort by match score (highest first)
        jobMatches.sort((a, b) => b.matchScore - a.matchScore);
        setMatches(jobMatches);
      } catch (error) {
        console.error('Error calculating job matches:', error);
        toast.error('Failed to calculate job matches');
      } finally {
        setIsLoading(false);
      }
    };
    
    calculateJobMatches();
  }, [resumeData]);

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };
  
  const getProgressColor = (score: number) => {
    if (score >= 80) return 'bg-green-600';
    if (score >= 50) return 'bg-yellow-600';
    return 'bg-red-600';
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl">Job Match Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="py-6 text-center">
            <p className="text-gray-500">Analyzing your CV for job matches...</p>
            <Progress value={50} className="mt-2" />
          </div>
        ) : matches.length === 0 ? (
          <div className="py-4 text-center">
            <p className="text-gray-500">No job matches found. Try adding more skills to your CV.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {matches.map((match) => (
              <div key={match.jobId} className="border rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium">{match.jobTitle}</h3>
                  <span className={`font-bold ${getScoreColor(match.matchScore)}`}>
                    {Math.round(match.matchScore)}% Match
                  </span>
                </div>
                <p className="text-sm text-gray-500 mb-2">{match.company}</p>
                <Progress 
                  value={match.matchScore} 
                  className={getProgressColor(match.matchScore)} 
                />
                
                <div className="mt-4 space-y-2">
                  {match.keywordMatches.length > 0 && (
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Matching Skills</p>
                      <div className="flex flex-wrap gap-1">
                        {match.keywordMatches.map((keyword, i) => (
                          <span key={i} className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                            {keyword}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {match.missingKeywords.length > 0 && (
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Missing Skills</p>
                      <div className="flex flex-wrap gap-1">
                        {match.missingKeywords.map((keyword, i) => (
                          <span key={i} className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">
                            {keyword}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            <div className="bg-blue-50 rounded p-3 text-sm text-blue-800">
              <p className="font-medium mb-1">Improve Your Match Score</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Add missing skills to your CV</li>
                <li>Use keywords from job descriptions</li>
                <li>Highlight relevant experience</li>
                <li>Upload supporting qualifications</li>
              </ul>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default JobMatchScore;
