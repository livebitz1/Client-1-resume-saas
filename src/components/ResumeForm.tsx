
import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { ResumeData } from '@/types/resume';
import { 
  PersonalInfoSection,
  WorkSection, 
  EducationSection, 
  SkillsSection, 
  ProjectsSection, 
  QualificationsSection, 
  OtherSection
} from './FormSections';

interface ResumeFormProps {
  initialData: ResumeData;
  onSubmit: (data: ResumeData) => void;
  selectedTemplate: string;
}

const ResumeForm: React.FC<ResumeFormProps> = ({
  initialData,
  onSubmit,
  selectedTemplate,
}) => {
  const methods = useForm<ResumeData>({
    defaultValues: initialData,
  });

  const handleSubmit = methods.handleSubmit((data) => {
    // Sync personal info data to basics section to ensure Resume/CV population
    const syncedData = {
      ...data,
      basics: {
        ...data.basics,
        name: data.personalInfo.fullName || data.basics.name,
        email: data.personalInfo.email || data.basics.email,
        phone: data.personalInfo.mobileNumber || data.basics.phone,
        location: {
          ...data.basics.location,
          address: data.personalInfo.homeAddress || data.basics.location.address,
          postalCode: data.personalInfo.postalCode || data.basics.location.postalCode,
          region: data.personalInfo.province || data.basics.location.region,
        }
      }
    };
    onSubmit(syncedData);
  });

  return (
    <div>
      <h1>Resume Form</h1>
    </div>
  );
};

export default ResumeForm;
