import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { Upload, FileText, Loader2, CheckCircle, Sparkles } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface CVUploadParserProps {
  onDataParsed: (data: any) => void;
}

const CVUploadParser: React.FC<CVUploadParserProps> = ({ onDataParsed }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [parsedSuccessfully, setParsedSuccessfully] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const transformEdenAIData = (providerResult: any) => {
    const rawExtractedData = providerResult?.extracted_data;

    if (!rawExtractedData) {
      console.error(
        "transformEdenAIData: 'extracted_data' object is missing in the provider's result.",
        JSON.stringify(providerResult, null, 2)
      );
      return null;
    }

    const personalInformation = {
      name: rawExtractedData.personal_infos?.name?.raw_name || '',
      firstName: rawExtractedData.personal_infos?.name?.first_name || '',
      lastName: rawExtractedData.personal_infos?.name?.last_name || '',
      email: rawExtractedData.personal_infos?.mails?.[0] || '',
      phone: rawExtractedData.personal_infos?.phones?.[0] || '',
      linkedin: rawExtractedData.personal_infos?.urls?.find((url: string) => url.includes("linkedin.com")) || '',
      github: rawExtractedData.personal_infos?.urls?.find((url: string) => url.includes("github.com")) || '',
      website: rawExtractedData.personal_infos?.urls?.find(
        (url: string) => !url.includes("linkedin.com") && !url.includes("github.com")
      ) || '',
      address: rawExtractedData.personal_infos?.address?.raw_input_location || '',
      summary: rawExtractedData.personal_infos?.self_summary || ''
    };

    const workExperience = rawExtractedData.work_experience?.entries?.map((exp: any) => ({
      jobTitle: exp.title || '',
      company: exp.company || '',
      location: exp.location?.raw_input_location || '',
      startDate: exp.start_date || '',
      endDate: exp.end_date || '',
      description: exp.description || '',
      industry: exp.industry || ''
    })) || [];

    const education = rawExtractedData.education?.entries?.map((edu: any) => ({
      degree: edu.title || edu.accreditation || '',
      institution: edu.establishment || '',
      location: edu.location?.raw_input_location || '',
      graduationDate: edu.end_date || '',
      startDate: edu.start_date || '',
      gpa: edu.gpa || '',
      details: edu.description || '',
      major: edu.title && edu.accreditation ? edu.title : undefined
    })) || [];

    const skills = rawExtractedData.skills?.map((skill: any) => ({
      name: skill.name || '',
      type: skill.type || ''
    })) || [];

    const languages = rawExtractedData.languages?.map((lang: any) => ({
      language: lang.name || ''
    })) || [];

    const certifications = rawExtractedData.certifications?.map((cert: any) => ({
      name: cert.name || ''
    })) || [];

    return {
      personalInformation,
      workExperience,
      education,
      skills,
      languages,
      certifications
    };
  };

  const parseResumeWithEdenAI = async (file: File) => {
    const EDEN_AI_API_KEY = import.meta.env.VITE_EDEN_AI_API_KEY;
    if (!EDEN_AI_API_KEY) {
      throw new Error('Eden AI API key is not configured');
    }

    try {
      const formData = new FormData();
      formData.append('providers', 'affinda');
      formData.append('file', file);
      formData.append('fallback_providers', '');

      const response = await fetch('https://api.edenai.run/v2/ocr/resume_parser', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${EDEN_AI_API_KEY}`
        },
        body: formData
      });

      if (!response.ok) {
        const responseText = await response.text();
        let errorMessage;
        try {
          const errorData = JSON.parse(responseText);
          errorMessage = errorData.error?.message || 'Failed to parse resume';
        } catch {
          errorMessage = `API Error: ${response.status} ${response.statusText}`;
        }
        throw new Error(errorMessage);
      }

      const data = await response.json();
      
      // Find successful provider result
      let providerResult = null;
      if (data.affinda && data.affinda.status === 'success') {
        providerResult = data.affinda;
      }

      if (!providerResult) {
        throw new Error('No successful provider data found');
      }

      return providerResult;
    } catch (error) {
      console.error('Eden AI API Error:', error);
      throw error;
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowedTypes.includes(file.type)) {
      toast.error('Please upload a PDF or Word document');
      event.target.value = '';
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error('File size must be less than 5MB');
      event.target.value = '';
      return;
    }

    setUploadedFile(file);
    setIsUploading(true);
    setParsedSuccessfully(false);
    setError(null);

    try {
      const parsedData = await parseResumeWithEdenAI(file);
      const transformedData = transformEdenAIData(parsedData);

      if (!transformedData) {
        throw new Error('Failed to transform parsed data');
      }

      onDataParsed(transformedData);
      setParsedSuccessfully(true);
      toast.success('Resume/CV parsed successfully! Your information has been extracted and populated into the form.');

    } catch (error) {
      console.error('Error parsing Resume/CV:', error);
      const errorMessage = error instanceof Error
        ? error.message
        : 'Failed to parse Resume/CV. Please ensure your PDF is readable and try again.';
      setError(errorMessage);
      toast.error(errorMessage);
    }

    setIsUploading(false);
    event.target.value = '';
  };

  const resetUpload = () => {
    setUploadedFile(null);
    setParsedSuccessfully(false);
    setError(null);
  };

  return (
    <Card className="w-full mb-6 border-2 border-dashed border-teal-200 bg-gradient-to-br from-teal-50 to-blue-50">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center gap-2 text-teal-700">
          <Sparkles className="h-5 w-5" />
          AI-Powered Resume/CV Parser
        </CardTitle>
        <p className="text-sm text-gray-600">
          Upload your existing Resume/CV and let our AI extract and organize your information automatically
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {!uploadedFile ? (
            <div className="border-2 border-dashed border-teal-300 rounded-lg p-8 text-center bg-white/50">
              <Upload className="h-12 w-12 text-teal-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                Upload Your Resume/CV
              </h3>
              <p className="text-sm text-gray-500 mb-6">
                Our AI will extract your professional information including work experience,
                education, skills, and create a compelling professional summary
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="flex items-center justify-center text-sm text-gray-600">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Professional Summary
                </div>
                <div className="flex items-center justify-center text-sm text-gray-600">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Work Experience
                </div>
                <div className="flex items-center justify-center text-sm text-gray-600">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Skills & Education
                </div>
              </div>

              <Input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileUpload}
                disabled={isUploading}
                className="hidden"
                id="cv-upload"
              />
              <label htmlFor="cv-upload">
                <Button
                  type="button"
                  size="lg"
                  disabled={isUploading}
                  className="cursor-pointer bg-teal-600 hover:bg-teal-700 text-white"
                  asChild
                >
                  <span>
                    <Upload className="mr-2 h-4 w-4" />
                    {isUploading ? 'Uploading...' : 'Choose Resume/CV File'}
                  </span>
                </Button>
              </label>
            </div>
          ) : (
            <div className="bg-white rounded-lg p-6 border border-teal-200">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  {parsedSuccessfully ? (
                    <CheckCircle className="h-8 w-8 text-green-500" />
                  ) : isUploading ? (
                    <Loader2 className="h-8 w-8 text-teal-500 animate-spin" />
                  ) : (
                    <FileText className="h-8 w-8 text-teal-500" />
                  )}
                  <div>
                    <p className="font-medium text-gray-900">
                      {uploadedFile.name}
                    </p>
                    {uploadedFile && (
                      <p className="text-sm text-gray-500">
                        {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    )}
                  </div>
                </div>
                {!isUploading && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={resetUpload}
                    className="text-gray-600"
                  >
                    Upload Different File
                  </Button>
                )}
              </div>

              {isUploading && (
                <div className="space-y-3">
                  <div className="flex items-center justify-center text-teal-600">
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    <span className="text-sm font-medium">Parsing your Resume/CV with AI...</span>
                  </div>
                  <div className="text-xs text-gray-500 text-center">
                    Extracting professional summary, work experience, education, and skills
                  </div>
                </div>
              )}

              {parsedSuccessfully && (
                <div className="text-center">
                  <p className="text-green-600 font-medium mb-2">
                    ✓ Resume/CV Successfully Parsed!
                  </p>
                  <p className="text-sm text-gray-600">
                    Your information has been extracted and populated in the form below.
                    Review and edit as needed.
                  </p>
                </div>
              )}

              {error && !isUploading && (
                <div className="text-center text-red-600 text-sm mt-4">
                  Error: {error}
                </div>
              )}
            </div>
          )}

          <div className="text-xs text-gray-500 text-center">
            <p className="font-medium mb-1">Supported formats:</p>
            <p>PDF, DOC, DOCX (Maximum 5MB)</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CVUploadParser;
