
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  type: 'job-seeker' | 'employer';
  createdAt: string; // ISO date string
  subscription?: {
    planId: string;
    status: 'active' | 'canceled' | 'expired';
    resumeCredits?: number;
  };
}

export interface JobSeeker extends User {
  type: 'job-seeker';
  resumes: {
    id: string;
    name: string;
    url: string;
    createdAt: string;
  }[];
}

export interface Employer extends User {
  type: 'employer';
  company: string;
  industry: string;
  logo?: string;
  website?: string;
  postedJobs: string[]; // Job IDs
}
