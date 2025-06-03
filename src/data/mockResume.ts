import { ResumeData } from '@/types/resume';
import { defaultPersonalInfo } from '@/types/personalInfo';

export const mockResumeData: ResumeData = {
  basics: {
    name: 'Sipho Mthembu',
    label: 'Software Developer',
    email: 'sipho.mthembu@email.co.za',
    phone: '+27 82 123 4567',
    url: '',
    summary: 'Passionate software developer with 3+ years of experience in web development. Skilled in React, TypeScript, and Node.js with a strong focus on creating user-friendly applications.',
    location: {
      address: '123 Main Street',
      city: 'Cape Town',
      postalCode: '8001',
      countryCode: 'ZA',
      region: 'Western Cape'
    },
    profiles: []
  },
  personalInfo: {
    ...defaultPersonalInfo,
    fullName: 'Sipho Mthembu',
    email: 'sipho.mthembu@email.co.za',
    mobileNumber: '+27 82 123 4567',
    nationality: 'South African',
    idNumber: '9001010000000',
    dateOfBirth: new Date('1990-01-01')
  },
  work: [
    {
      id: '1',
      company: 'TechCorp South Africa',
      position: 'Frontend Developer',
      website: 'https://techcorp.co.za',
      startDate: '2022-01-01',
      endDate: '',
      current: true,
      summary: 'Developed and maintained React applications for enterprise clients',
      highlights: [
        'Built responsive web applications using React and TypeScript',
        'Collaborated with cross-functional teams to deliver high-quality software',
        'Improved application performance by 30% through code optimization'
      ]
    },
    {
      id: '2',
      company: 'Digital Solutions SA',
      position: 'Junior Developer',
      website: 'https://digitalsolutions.co.za',
      startDate: '2021-01-01',
      endDate: '2021-12-31',
      current: false,
      summary: 'Started career as a junior developer, learning modern web technologies',
      highlights: [
        'Learned React, JavaScript, and modern web development practices',
        'Contributed to 5+ client projects',
        'Participated in code reviews and pair programming sessions'
      ]
    }
  ],
  education: [
    {
      id: '1',
      institution: 'University of Cape Town',
      area: 'Computer Science',
      studyType: 'Bachelor of Science',
      startDate: '2018-01-01',
      endDate: '2020-12-31',
      gpa: '3.8',
      courses: ['Data Structures', 'Algorithms', 'Web Development', 'Database Systems']
    }
  ],
  skills: [
    {
      id: '1',
      name: 'JavaScript',
      level: 'Expert',
      keywords: ['ES6+', 'React', 'Node.js']
    },
    {
      id: '2',
      name: 'TypeScript',
      level: 'Advanced',
      keywords: ['Type Safety', 'Interfaces', 'Generics']
    },
    {
      id: '3',
      name: 'React',
      level: 'Expert',
      keywords: ['Hooks', 'Context API', 'Redux']
    },
    {
      id: '4',
      name: 'CSS',
      level: 'Advanced',
      keywords: ['Flexbox', 'Grid', 'Responsive Design']
    }
  ],
  projects: [
    {
      id: '1',
      name: 'E-commerce Platform',
      description: 'Built a full-stack e-commerce platform using React and Node.js',
      highlights: ['Implemented secure payment processing', 'Created responsive design', 'Integrated with third-party APIs'],
      url: '',
      keywords: ['React', 'Node.js', 'MongoDB'],
      startDate: '2023-01-01',
      endDate: '2023-06-30',
      roles: ['Full Stack Developer'],
      entity: 'Personal Project',
      type: 'Web Application'
    },
    {
      id: '2',
      name: 'Task Management App',
      description: 'Developed a task management application with real-time updates',
      highlights: ['Real-time collaboration features', 'Mobile-responsive design', 'User authentication system'],
      url: '',
      keywords: ['React', 'Socket.io', 'Express'],
      startDate: '2022-06-01',
      endDate: '2022-12-31',
      roles: ['Frontend Developer'],
      entity: 'TechCorp SA',
      type: 'Mobile App'
    }
  ],
  qualifications: [],
  languages: [
    { language: 'English', fluency: 'Native' },
    { language: 'Afrikaans', fluency: 'Conversational' },
    { language: 'Zulu', fluency: 'Native' }
  ],
  interests: [
    { name: 'Technology', keywords: ['Open Source', 'Mobile Development'] },
    { name: 'Sports', keywords: ['Rugby', 'Cricket'] }
  ],
  references: [
    {
      name: 'John Smith',
      reference: 'Sipho is an excellent developer with strong problem-solving skills.',
      contact: 'john.smith@techcorp.co.za'
    }
  ]
};
