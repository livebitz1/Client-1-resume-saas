
import React from 'react';
import { ResumeData } from '@/types/resume';

interface ProfessionalTemplateProps {
  data: ResumeData;
}

const ProfessionalTemplate: React.FC<ProfessionalTemplateProps> = ({ data }) => {
  const { basics, work, education, skills, projects, qualifications, languages } = data;

  return (
    <div className="resume-container p-8 max-w-4xl mx-auto bg-white shadow-lg">
      {/* Header with Profile Picture */}
      <header className="border-b-2 border-gray-800 pb-6 mb-8">
        <div className="flex items-start gap-6">
          <div className="w-28 h-28 rounded-full bg-gray-300 flex-shrink-0 overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face" 
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">{basics.name}</h1>
            <p className="text-2xl text-gray-600 mb-4">{basics.label}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <div><strong>Email:</strong> {basics.email}</div>
              <div><strong>Phone:</strong> {basics.phone}</div>
              {basics.location && (
                <div className="col-span-full">
                  <strong>Location:</strong> {[basics.location.city, basics.location.region, basics.location.countryCode].filter(Boolean).join(", ")}
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Summary */}
      {basics.summary && (
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3 border-b border-gray-300 pb-2">Professional Summary</h2>
          <p className="text-gray-700 leading-relaxed">{basics.summary}</p>
        </section>
      )}

      {/* Work Experience */}
      {work && work.length > 0 && (
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3 border-b border-gray-300 pb-2">Professional Experience</h2>
          {work.map((job, index) => (
            <div key={index} className="mb-6">
              <div className="flex justify-between items-baseline mb-2">
                <h3 className="text-xl font-semibold text-gray-800">{job.position}</h3>
                <span className="text-sm text-gray-600 font-medium whitespace-nowrap">
                  {job.startDate} - {job.endDate || 'Present'}
                </span>
              </div>
              <p className="text-lg text-gray-700 font-medium mb-2">{job.company}</p>
              <p className="text-gray-700 mb-3">{job.summary}</p>
              {job.highlights && job.highlights.length > 0 && (
                <ul className="list-disc ml-6 text-gray-700">
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
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3 border-b border-gray-300 pb-2">Education</h2>
          {education.map((edu, index) => (
            <div key={index} className="mb-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{edu.institution}</h3>
                  <p className="text-gray-700">{edu.studyType} in {edu.area}</p>
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column */}
        <div>
          {/* Skills */}
          {skills && skills.length > 0 && (
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-3 border-b border-gray-300 pb-2">Skills</h2>
              <div className="space-y-3">
                {skills.map((skill, index) => (
                  <div key={index} className="bg-gray-50 p-3 rounded-lg">
                    <div className="font-semibold text-gray-800">{skill.name}</div>
                    <div className="text-sm text-gray-600">{skill.level}</div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Languages */}
          {languages && languages.length > 0 && (
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-3 border-b border-gray-300 pb-2">Languages</h2>
              <div className="space-y-2">
                {languages.map((lang, index) => (
                  <div key={index} className="bg-gray-50 p-3 rounded-lg">
                    <span className="font-semibold text-gray-800">{lang.language}</span>
                    <span className="text-gray-600 ml-2">- {lang.fluency}</span>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Right Column */}
        <div>
          {/* Projects */}
          {projects && projects.length > 0 && (
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-3 border-b border-gray-300 pb-2">Projects</h2>
              {projects.map((project, index) => (
                <div key={index} className="mb-4 bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-800 mb-2">{project.name}</h3>
                  <p className="text-gray-700 text-sm mb-2">{project.description}</p>
                  {project.highlights && project.highlights.length > 0 && (
                    <ul className="list-disc pl-5 text-sm text-gray-700">
                      {project.highlights.map((highlight, i) => (
                        <li key={i}>{highlight}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </section>
          )}

          {/* Qualifications */}
          {qualifications && qualifications.length > 0 && (
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-3 border-b border-gray-300 pb-2">Certifications</h2>
              {qualifications.map((cert, index) => (
                <div key={index} className="mb-3 bg-gray-50 p-3 rounded-lg">
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold text-gray-800">{cert.name}</h3>
                    <span className="text-sm text-gray-600 whitespace-nowrap">{cert.date}</span>
                  </div>
                  <p className="text-sm text-gray-700">{cert.issuer}</p>
                </div>
              ))}
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfessionalTemplate;
