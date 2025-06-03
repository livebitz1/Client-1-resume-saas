
export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Internship' | 'Remote';
  salary?: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  applicationDeadline: string; // ISO date string
  postedAt: string; // ISO date string
  employerId: string;
  active: boolean;
}

export interface JobApplication {
  id: string;
  jobId: string;
  userId: string;
  resumeUrl: string;
  coverLetterUrl?: string;
  status: 'Applied' | 'Reviewing' | 'Rejected' | 'Shortlisted' | 'Interviewed' | 'Offered' | 'Hired';
  appliedAt: string; // ISO date string
}
