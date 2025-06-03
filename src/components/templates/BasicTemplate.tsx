
import React from 'react';
import { ResumeData } from '@/types/resume';

interface BasicTemplateProps {
  data: ResumeData;
}

const BasicTemplate: React.FC<BasicTemplateProps> = ({ data }) => {
  const { basics, work, education, skills, projects, qualifications, languages } = data;

  return (
    <div className="resume-container bg-white p-8 max-w-4xl mx-auto shadow-lg">
      {/* Header with Profile Picture */}
      <header className="mb-8 flex items-start gap-6">
        <div className="w-24 h-24 rounded-full bg-gray-300 flex-shrink-0 overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face" 
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-resume-primary mb-2">{basics.name}</h1>
          <p className="text-xl text-resume-secondary mb-3">{basics.label}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
            <div className="flex items-center gap-2">
              <span className="font-medium">Email:</span>
              <span>{basics.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium">Phone:</span>
              <span>{basics.phone}</span>
            </div>
            {basics.location && (
              <div className="flex items-center gap-2 col-span-full">
                <span className="font-medium">Location:</span>
                <span>{[basics.location.city, basics.location.region, basics.location.countryCode].filter(Boolean).join(", ")}</span>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Summary */}
      {basics.summary && (
        <section className="resume-section mb-6">
          <h2 className="resume-section-title text-lg font-semibold text-resume-primary border-b-2 border-resume-primary pb-1 mb-3">Professional Summary</h2>
          <p className="text-gray-700 leading-relaxed">{basics.summary}</p>
        </section>
      )}

      {/* Work Experience */}
      {work && work.length > 0 && (
        <section className="resume-section mb-6">
          <h2 className="resume-section-title text-lg font-semibold text-resume-primary border-b-2 border-resume-primary pb-1 mb-3">Work Experience</h2>
          {work.map((job, index) => (
            <div key={index} className="resume-item mb-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-semibold text-gray-800">{job.position}</h3>
                  <p className="text-resume-primary font-medium">{job.company}</p>
                </div>
                <span className="text-sm text-gray-600 whitespace-nowrap">
                  {job.startDate} - {job.endDate || 'Present'}
                </span>
              </div>
              <p className="text-gray-700 mb-2">{job.summary}</p>
              {job.highlights && job.highlights.length > 0 && (
                <ul className="list-disc pl-6 text-gray-700">
                  {job.highlights.map((highlight, i) => (
                    <li key={i} className="mb-1">{highlight}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Education */}
      {education && education.length > 0 && (
        <section className="resume-section mb-6">
          <h2 className="resume-section-title text-lg font-semibold text-resume-primary border-b-2 border-resume-primary pb-1 mb-3">Education</h2>
          {education.map((edu, index) => (
            <div key={index} className="resume-item mb-3">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-gray-800">{edu.studyType} in {edu.area}</h3>
                  <p className="text-resume-primary">{edu.institution}</p>
                </div>
                <span className="text-sm text-gray-600 whitespace-nowrap">
                  {edu.startDate} - {edu.endDate || 'Present'}
                </span>
              </div>
              {edu.gpa && <p className="text-sm text-gray-600 mt-1">GPA: {edu.gpa}</p>}
            </div>
          ))}
        </section>
      )}

      {/* Skills */}
      {skills && skills.length > 0 && (
        <section className="resume-section mb-6">
          <h2 className="resume-section-title text-lg font-semibold text-resume-primary border-b-2 border-resume-primary pb-1 mb-3">Skills</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {skills.map((skill, index) => (
              <div key={index} className="bg-gray-50 px-3 py-2 rounded-lg">
                <div className="font-medium text-gray-800">{skill.name}</div>
                <div className="text-xs text-gray-600">{skill.level}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {projects && projects.length > 0 && (
        <section className="resume-section mb-6">
          <h2 className="resume-section-title text-lg font-semibold text-resume-primary border-b-2 border-resume-primary pb-1 mb-3">Projects</h2>
          {projects.map((project, index) => (
            <div key={index} className="resume-item mb-4">
              <h3 className="font-semibold text-gray-800 mb-1">{project.name}</h3>
              <p className="text-gray-700 mb-2">{project.description}</p>
              {project.highlights && project.highlights.length > 0 && (
                <ul className="list-disc pl-6 text-gray-700">
                  {project.highlights.map((highlight, i) => (
                    <li key={i} className="mb-1">{highlight}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Qualifications */}
      {qualifications && qualifications.length > 0 && (
        <section className="resume-section mb-6">
          <h2 className="resume-section-title text-lg font-semibold text-resume-primary border-b-2 border-resume-primary pb-1 mb-3">Qualifications & Certifications</h2>
          {qualifications.map((cert, index) => (
            <div key={index} className="resume-item mb-3">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-gray-800">{cert.name}</h3>
                  <p className="text-gray-600">{cert.issuer}</p>
                </div>
                <span className="text-sm text-gray-600">{cert.date}</span>
              </div>
            </div>
          ))}
        </section>
      )}

      {/* Languages */}
      {languages && languages.length > 0 && (
        <section className="resume-section">
          <h2 className="resume-section-title text-lg font-semibold text-resume-primary border-b-2 border-resume-primary pb-1 mb-3">Languages</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {languages.map((lang, index) => (
              <div key={index} className="bg-gray-50 px-3 py-2 rounded-lg">
                <span className="font-semibold text-gray-800">{lang.language}</span>
                <span className="text-sm text-gray-600 block">{lang.fluency}</span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default BasicTemplate;
