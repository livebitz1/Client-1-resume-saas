import React, { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import ResumeForm from "@/components/ResumeForm";
import ResumePreview from "@/components/ResumePreview";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Upload, FileText, Loader2, CheckCircle, Sparkles, AlertTriangle } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { ResumeData } from "@/types/resume";

interface BuilderTabContentProps {
  resumeData: ResumeData;
  templateId: string;
  onUpdateResume: (data: ResumeData) => void;
}

const BuilderTabContent = ({ resumeData, templateId, onUpdateResume }: BuilderTabContentProps) => {
  const handleCVDataParsed = (parsedData: any) => {
    // Merge parsed data with existing resume data
    const updatedResumeData = {
      ...resumeData,
      personalInfo: {
        ...resumeData.personalInfo,
        ...parsedData.personalInfo
      },
      basics: {
        ...resumeData.basics,
        name: parsedData.personalInfo?.fullName || resumeData.basics.name,
        email: parsedData.personalInfo?.email || resumeData.basics.email,
        phone: parsedData.personalInfo?.mobileNumber || resumeData.basics.phone,
        summary: parsedData.basics?.summary || resumeData.basics.summary,
      },
      work: parsedData.work || resumeData.work,
      education: parsedData.education || resumeData.education,
      skills: parsedData.skills || resumeData.skills,
      projects: parsedData.projects || resumeData.projects,
      qualifications: parsedData.qualifications || resumeData.qualifications,
    };
    
    onUpdateResume(updatedResumeData);
  };

  // State and ref for file upload
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
  const [selectedFileSize, setSelectedFileSize] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingError, setProcessingError] = useState<string | null>(null);
  const [processedData, setProcessedData] = useState<any>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const allowedTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];
      if (!allowedTypes.includes(file.type)) {
        toast.error("Please upload a PDF or Word document.");
        if (fileInputRef.current) fileInputRef.current.value = "";
        setSelectedFileName(null);
        setSelectedFileSize(null);
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File size must be less than 5MB.");
        if (fileInputRef.current) fileInputRef.current.value = "";
        setSelectedFileName(null);
        setSelectedFileSize(null);
        return;
      }
      setSelectedFileName(file.name);
      setSelectedFileSize((file.size / 1024 / 1024).toFixed(2) + " MB");
      setIsProcessing(false);
      setProcessingError(null);
      setProcessedData(null);
    } else {
      setSelectedFileName(null);
      setSelectedFileSize(null);
    }
  };

  const handleAnalyzeResume = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!fileInputRef.current?.files?.length) {
      setProcessingError("Please select a file first.");
      return;
    }

    const file = fileInputRef.current.files[0];

    setIsProcessing(true);
    setProcessingError(null);
    setProcessedData(null);
    toast.info("Uploading and analyzing your resume...");

    const formData = new FormData();
    formData.append('resumeFile', file);

    try {
      const response = await fetch('/api/analyze-resume', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        console.error('Backend API error:', response.status, result);
        setProcessingError(result.error || `API request failed with status ${response.status}`);
        toast.error(result.error || "Failed to analyze resume.");
      } else if (result.success) {
        console.log('Resume analysis successful:', result.data);
        setProcessedData(result.data);
        handleCVDataParsed(result.data);
        toast.success(result.message || "Resume analyzed and enhanced successfully!");
      } else {
        console.error('Backend reported failure:', result.error, result);
        setProcessingError(result.error || 'Analysis failed.');
        toast.error(result.error || "Failed to analyze resume.");
      }

    } catch (error: any) {
      console.error('Error during fetch or processing:', error);
      setProcessingError(`An unexpected error occurred: ${error.message}`);
      toast.error("An unexpected error occurred during analysis.");
    } finally {
      setIsProcessing(false);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleChangeFile = () => {
    setSelectedFileName(null);
    setSelectedFileSize(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setProcessedData(null);
    setProcessingError(null);
    triggerFileInput();
  };

  const resetSelection = () => {
    setSelectedFileName(null);
    setSelectedFileSize(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setProcessedData(null);
    setProcessingError(null);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="lg:col-span-1 overflow-hidden">
        <CardContent className="p-0">
          <div className="p-6 space-y-6">
            <Card className="w-full mb-6 border-2 border-dashed border-teal-200 bg-gradient-to-br from-teal-50 to-blue-50">
              <CardHeader className="text-center">
                <CardTitle className="flex items-center justify-center gap-2 text-teal-700">
                  <Sparkles className="h-5 w-5" />
                  AI-Powered Resume Enhancer
                </CardTitle>
                <CardDescription className="text-sm text-gray-600">
                  Upload your Resume/CV. Our AI will parse it, then enhance it into a professional format.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAnalyzeResume} className="space-y-4">
                  <Input
                    type="file"
                    name="resumeFile"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    className="hidden"
                    id="cv-upload-input"
                    ref={fileInputRef}
                  />

                  {!selectedFileName ? (
                    <div className="border-2 border-dashed border-teal-300 rounded-lg p-8 text-center bg-white/50">
                      <Upload className="h-12 w-12 text-teal-400 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-gray-700 mb-2">Upload Your Resume/CV</h3>
                      <p className="text-sm text-gray-500 mb-6">
                        Our AI will extract key information and then generate a professional summary, enhanced work experience,
                        and key skills.
                      </p>
                      <Button
                        type="button"
                        size="lg"
                        disabled={isProcessing}
                        className="cursor-pointer bg-teal-600 hover:bg-teal-700 text-white"
                        onClick={triggerFileInput}
                      >
                        <Upload className="mr-2 h-4 w-4" />
                        Choose Resume/CV File
                      </Button>
                    </div>
                  ) : (
                    <div className="bg-white rounded-lg p-6 border border-teal-200">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          {isProcessing ? (
                            <Loader2 className="h-8 w-8 text-teal-500 animate-spin" />
                          ) : processedData ? (
                            <CheckCircle className="h-8 w-8 text-green-500" />
                          ) : (
                             processingError ? (
                                <FileText className="h-8 w-8 text-red-500" />
                             ) : (
                                <FileText className="h-8 w-8 text-teal-500" />
                             )
                          )}
                          <div>
                            <p className="font-medium text-gray-900">{selectedFileName}</p>
                            {selectedFileSize && <p className="text-sm text-gray-500">{selectedFileSize}</p>}
                          </div>
                        </div>
                        {!isProcessing && (
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={handleChangeFile}
                            className="text-gray-600"
                          >
                            Change File
                          </Button>
                        )}
                      </div>

                      {isProcessing && (
                        <div className="space-y-3 my-4">
                          <div className="flex items-center justify-center text-teal-600">
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            <span className="text-sm font-medium">AI Processing: Parsing & Enhancing...</span>
                          </div>
                          <Progress value={undefined} className="w-full h-2" />
                          <div className="text-xs text-gray-500 text-center">
                            Step 1: Extracting data with Eden AI...
                            <br />
                            Step 2: Generating professional template with OpenAI...
                          </div>
                        </div>
                      )}

                      {selectedFileName && !isProcessing && !processedData && (
                        <Button
                          type="submit"
                          size="lg"
                          className="w-full bg-teal-600 hover:bg-teal-700 text-white mt-4"
                        >
                          <Sparkles className="mr-2 h-4 w-4" />
                          Analyze and Enhance Resume
                        </Button>
                      )}
                      {(processedData || processingError) && !isProcessing && (
                        <Button
                          type="button"
                          size="lg"
                          className="w-full bg-blue-600 hover:bg-blue-700 text-white mt-4"
                          onClick={() => {
                            resetSelection();
                            triggerFileInput();
                          }}
                        >
                          <Upload className="mr-2 h-4 w-4" />
                          Analyze Another Resume
                        </Button>
                      )}
                    </div>
                  )}

                  <div className="text-xs text-gray-500 text-center mt-4">
                    <p className="font-medium mb-1">Supported formats:</p>
                    <p>PDF, DOC, DOCX (Maximum 5MB)</p>
                  </div>

                  {processingError && (
                    <Alert variant="destructive" className="mt-4">
                      <AlertTriangle className="h-4 w-4" />
                      <AlertTitle>Processing Error</AlertTitle>
                      <AlertDescription>{processingError}</AlertDescription>
                    </Alert>
                  )}
                </form>
              </CardContent>
            </Card>

            <ResumeForm 
              initialData={resumeData} 
              onSubmit={onUpdateResume} 
              selectedTemplate={templateId}
            />
          </div>
        </CardContent>
      </Card>

      <Card className="lg:col-span-1 overflow-hidden h-[800px]">
        <CardContent className="p-0 h-full">
          <ResumePreview 
            data={resumeData} 
            templateId={templateId} 
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default BuilderTabContent;
