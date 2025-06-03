
import React from 'react';
import WorkSection from './FormSections/WorkSection';
import EducationSection from './FormSections/EducationSection';
import SkillsSection from './FormSections/SkillsSection';
import ProjectsSection from './FormSections/ProjectsSection';
import QualificationsSection from './FormSections/QualificationsSection';
import OtherSection from './FormSections/OtherSection';
import PersonalInfoSection from './FormSections/PersonalInfoSection';

export {
  WorkSection,
  EducationSection,
  SkillsSection,
  ProjectsSection,
  QualificationsSection,
  OtherSection,
  PersonalInfoSection
};

export const FormSections: React.FC = () => {
  return (
    <div className="space-y-6">
      <PersonalInfoSection />
      <WorkSection />
      <EducationSection />
      <SkillsSection />
      <ProjectsSection />
      <QualificationsSection />
      <OtherSection />
    </div>
  );
};
