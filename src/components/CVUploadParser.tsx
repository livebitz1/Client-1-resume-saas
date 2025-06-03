import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { Upload, FileText, Loader2, CheckCircle, Sparkles } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/lib/supabase';

interface CVUploadParserProps {
  onDataParsed: (data: any) => void;
}

const CVUploadParser: React.FC<CVUploadParserProps> = ({ onDataParsed }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [parsedSuccessfully, setParsedSuccessfully] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
      const fileBase64 = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          const base64 = reader.result as string;
          const base64Data = base64.split(',')[1];
          resolve(base64Data);
        };
         reader.onerror = (error) => reject(error);
        reader.readAsDataURL(file);
      });

      const { data, error: supabaseError } = await supabase.functions.invoke('parse-resume-eden', {
        body: {
          file: fileBase64,
          filename: file.name,
          fileType: file.type,
        },
      });

      if (supabaseError) {
        console.error('Supabase function error:', supabaseError);
        throw new Error(`Supabase function error: ${supabaseError.message}`);
      }

      const parsedData = data;

      if (parsedData.success) {
        onDataParsed(parsedData.resumeData);
        setParsedSuccessfully(true);
        toast.success('Resume/CV parsed successfully! Your information has been extracted and populated into the form.');
      } else {
        console.error('Parser error response:', parsedData.error);
        const errorMessage = parsedData.error || 'Failed to parse resume/CV. Please ensure your PDF is readable and try again.';
        setError(errorMessage);
        toast.error(errorMessage);
      }

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
