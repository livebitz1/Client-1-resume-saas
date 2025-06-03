
import { PersonalInfo, defaultPersonalInfo } from './personalInfo';

export interface Basics {
  name: string;
  label: string;
  email: string;
  phone: string;
  url: string;
  summary: string;
  location: {
    address: string;
    postalCode: string;
    city: string;
    countryCode: string;
    region: string;
  };
  profiles: Array<{
    network: string;
    username: string;
    url: string;
  }>;
}

export interface WorkExperience {
  id: string;
  company: string;
  position: string;
  website: string;
  startDate: string;
  endDate: string;
  current: boolean;
  summary: string;
  highlights: string[];
}

export interface Education {
  id: string;
  institution: string;
  area: string;
  studyType: string;
  startDate: string;
  endDate: string;
  gpa: string;
  courses: string[];
}

export interface Skill {
  id: string;
  name: string;
  level: string;
  keywords: string[];
}

export interface Project {
  id: string;
  name: string;
  description: string;
  highlights: string[];
  keywords: string[];
  startDate: string;
  endDate: string;
  url: string;
  roles: string[];
  entity: string;
  type: string;
}

export interface Qualification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  url: string;
}

export interface LanguageProficiency {
  language: string;
  fluency: string;
}

export interface Interest {
  name: string;
  keywords: string[];
}

export interface Reference {
  name: string;
  reference: string;
  contact: string;
}

export interface Template {
  id: string;
  name: string;
  component: React.ComponentType<{ data: ResumeData }>;
  thumbnail: string;
  image: string;
}

export interface ResumeData {
  id?: string;
  userId?: string;
  title?: string;
  basics: Basics;
  personalInfo: PersonalInfo;
  work: WorkExperience[];
  education: Education[];
  skills: Skill[];
  projects: Project[];
  qualifications: Qualification[];
  languages: LanguageProficiency[];
  interests: Interest[];
  references: Reference[];
}

export const emptyResume: ResumeData = {
  basics: {
    name: '',
    label: '',
    email: '',
    phone: '',
    url: '',
    summary: '',
    location: {
      address: '',
      postalCode: '',
      city: '',
      countryCode: '',
      region: ''
    },
    profiles: []
  },
  personalInfo: defaultPersonalInfo,
  work: [],
  education: [],
  skills: [],
  projects: [],
  qualifications: [],
  languages: [],
  interests: [],
  references: []
};

export interface ResumeDesignSettings {
  fontFamily: string;
  fontSize: number;
  lineSpacing: number;
  colorPrimary: string;
  colorSecondary: string;
  showBorders: boolean;
  headingWeight: number;
  paperStyle: 'white' | 'offwhite' | 'lightgray' | 'lightblue';
  layout: 'standard' | 'compact' | 'minimalist' | 'split';
  dateDisplay: 'full' | 'year' | 'compact';
  sectionOrder: string[];
}

export const defaultDesignSettings: ResumeDesignSettings = {
  fontFamily: 'sans-serif',
  fontSize: 1.0,
  lineSpacing: 1.0,
  colorPrimary: '#1a56db',
  colorSecondary: '#e2e8f0',
  showBorders: false,
  headingWeight: 700,
  paperStyle: 'white',
  layout: 'standard',
  dateDisplay: 'full',
  sectionOrder: [
    'basics',
    'skills',
    'work',
    'education',
    'projects',
    'qualifications',
    'languages',
    'interests',
    'references'
  ]
};
