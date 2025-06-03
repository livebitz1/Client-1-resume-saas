
import React from 'react';
import { ResumeData } from '@/types/resume';

interface ModernTemplateProps {
  data: ResumeData;
}

const ModernTemplate: React.FC<ModernTemplateProps> = ({ data }) => {
  const { basics, work, education, skills, projects, qualifications, languages } = data;

  return (
    <div className="resume-container bg-white shadow-lg max-w-4xl mx-auto">
      <div className="grid grid-cols-3 min-h-screen">
        {/* Sidebar */}
        <div className="col-span-1 bg-gradient-to-b from-blue-600 to-blue-800 text-white p-6">
          {/* Profile Picture */}
          <div className="w-32 h-32 rounded-full mx-auto mb-6 overflow-hidden bg-white/20">
            <img 
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face" 
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Contact */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold uppercase tracking-wider mb-4 border-b border-white/30 pb-2">Contact</h2>
            <div className="space-y-3 text-sm">
              <div className="break-words">{basics.email}</div>
              <div>{basics.phone}</div>
              {basics.location && (
                <div className="break-words">{[basics.location.city, basics.location.region].filter(Boolean).join(", ")}</div>
              )}
            </div>
          </div>

          {/* Skills */}
          {skills && skills.length > 0 && (
            <div className="mb-8">
              <h2 className="text-lg font-semibold uppercase tracking-wider mb-4 border-b border-white/30 pb-2">Skills</h2>
              <div className="space-y-2">
                {skills.map((skill, index) => (
                  <div key={index} className="bg-white/10 px-3 py-2 rounded text-sm">
                    <div className="font-medium">{skill.name}</div>
                    <div className="text-xs opacity-90">{skill.level}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Languages */}
          {languages && languages.length > 0 && (
            <div className="mb-8">
              <h2 className="text-lg font-semibold uppercase tracking-wider mb-4 border-b border-white/30 pb-2">Languages</h2>
              <div className="space-y-2">
                {languages.map((lang, index) => (
                  <div key={index} className="text-sm">
                    <span className="font-medium">{lang.language}</span>
                    <div className="text-xs opacity-90">{lang.fluency}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Qualifications */}
          {qualifications && qualifications.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold uppercase tracking-wider mb-4 border-b border-white/30 pb-2">Certifications</h2>
              {qualifications.map((cert, index) => (
                <div key={index} className="mb-3 text-sm">
                  <div className="font-medium">{cert.name}</div>
                  <div className="text-xs opacity-90">{cert.issuer}</div>
                  <div className="text-xs opacity-75">{cert.date}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className="col-span-2 p-8">
          {/* Header */}
          <header className="mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">{basics.name}</h1>
            <p className="text-xl text-blue-600 font-medium">{basics.label}</p>
          </header>

          {/* Summary */}
          {basics.summary && (
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 border-b-2 border-blue-600 pb-2 mb-4">Profile</h2>
              <p className="text-gray-700 leading-relaxed">{basics.summary}</p>
            </section>
          )}

          {/* Work Experience */}
          {work && work.length > 0 && (
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 border-b-2 border-blue-600 pb-2 mb-4">Experience</h2>
              {work.map((job, index) => (
                <div key={index} className="mb-6">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">{job.position}</h3>
                      <div className="text-blue-600 font-medium">{job.company}</div>
                    </div>
                    <div className="text-sm text-gray-500 whitespace-nowrap">
                      {job.startDate} - {job.endDate || 'Present'}
                    </div>
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
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 border-b-2 border-blue-600 pb-2 mb-4">Education</h2>
              {education.map((edu, index) => (
                <div key={index} className="mb-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-gray-800">{edu.institution}</h3>
                      <div className="text-gray-700">{edu.studyType} in {edu.area}</div>
                    </div>
                    <div className="text-sm text-gray-500 whitespace-nowrap">
                      {edu.startDate} - {edu.endDate || 'Present'}
                    </div>
                  </div>
                  {edu.gpa && <p className="text-sm text-gray-600 mt-1">GPA: {edu.gpa}</p>}
                </div>
              ))}
            </section>
          )}

          {/* Projects */}
          {projects && projects.length > 0 && (
            <section>
              <h2 className="text-xl font-semibold text-gray-800 border-b-2 border-blue-600 pb-2 mb-4">Projects</h2>
              {projects.map((project, index) => (
                <div key={index} className="mb-4">
                  <h3 className="font-semibold text-gray-800 mb-2">{project.name}</h3>
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
        </div>
      </div>
    </div>
  );
};

export default ModernTemplate;
