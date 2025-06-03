"use client"

// src/App.tsx
import React, { useState } from "react"
import { Button } from "@/components/ui/button" // Assuming shadcn/ui paths
import { Input } from "@/components/ui/input"
import { toast, Toaster } from "sonner"
import {
  Upload,
  FileText,
  Loader2,
  CheckCircle,
  User,
  Briefcase,
  GraduationCap,
  Lightbulb,
  Languages,
  Award,
  Mail,
  Phone,
  Linkedin,
  Github,
  Globe,
  MapPin,
  CalendarDays,
  AlertTriangle,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"

// --- Types ---
interface PersonalInformation {
  name: string
  firstName: string
  lastName: string
  email: string
  phone: string
  linkedin: string
  github: string
  website: string
  address: string
  summary: string
}

interface WorkExperienceEntry {
  jobTitle: string
  company: string
  location: string
  startDate: string
  endDate: string
  description: string
  industry: string
}

interface EducationEntry {
  degree: string
  institution: string
  location: string
  graduationDate: string
  startDate: string
  gpa: string
  details: string
  major?: string
}

interface SkillEntry {
  name: string
  type: string
}

interface LanguageEntry {
  language: string
  proficiency?: string
}

interface CertificationEntry {
  name: string
  issuingOrganization?: string
  issueDate?: string
}

export interface ParsedResumeData {
  personalInformation: PersonalInformation
  workExperience: WorkExperienceEntry[]
  education: EducationEntry[]
  skills: SkillEntry[]
  languages: LanguageEntry[]
  certifications: CertificationEntry[]
}

interface CVUploadParserProps {
  onDataParsed: (data: ParsedResumeData | null) => void
  onParsingStart: () => void
  onParsingError: (errorMsg: string) => void
}

// --- CVUploadParser Component ---
const CVUploadParser: React.FC<CVUploadParserProps> = ({ onDataParsed, onParsingStart, onParsingError }) => {
  const [isUploading, setIsUploading] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [parsedSuccessfully, setParsedSuccessfully] = useState(false)
  const [localError, setLocalError] = useState<string | null>(null)

  const transformEdenAIData = (providerResult: any): ParsedResumeData | null => {
    const rawExtractedData = providerResult?.extracted_data

    if (!rawExtractedData) {
      console.error(
        "transformEdenAIData: 'extracted_data' object is missing in the provider's result.",
        JSON.stringify(providerResult, null, 2),
      )
      return null
    }
    const s = (value: any, defaultValue = "") => (typeof value === "string" ? value : defaultValue)
    const personalInformation: PersonalInformation = {
      name: s(rawExtractedData.personal_infos?.name?.raw_name),
      firstName: s(rawExtractedData.personal_infos?.name?.first_name),
      lastName: s(rawExtractedData.personal_infos?.name?.last_name),
      email: s(rawExtractedData.personal_infos?.mails?.[0]),
      phone: s(rawExtractedData.personal_infos?.phones?.[0]),
      linkedin: s(rawExtractedData.personal_infos?.urls?.find((url: string) => url.includes("linkedin.com"))),
      github: s(rawExtractedData.personal_infos?.urls?.find((url: string) => url.includes("github.com"))),
      website: s(
        rawExtractedData.personal_infos?.urls?.find(
          (url: string) => !url.includes("linkedin.com") && !url.includes("github.com"),
        ),
      ),
      address: s(
        rawExtractedData.personal_infos?.address?.formatted_location ||
          rawExtractedData.personal_infos?.address?.raw_input_location,
      ),
      summary: s(rawExtractedData.personal_infos?.self_summary),
    }
    const workExperience: WorkExperienceEntry[] =
      rawExtractedData.work_experience?.entries?.map((exp: any) => ({
        jobTitle: s(exp.title),
        company: s(exp.company),
        location: s(exp.location?.formatted_location || exp.location?.raw_input_location),
        startDate: s(exp.start_date),
        endDate: s(exp.end_date),
        description: s(exp.description),
        industry: s(exp.industry),
      })) || []
    const education: EducationEntry[] =
      rawExtractedData.education?.entries?.map((edu: any) => ({
        degree: s(edu.title || edu.accreditation),
        institution: s(edu.establishment),
        location: s(edu.location?.formatted_location || edu.location?.raw_input_location),
        graduationDate: s(edu.end_date),
        startDate: s(edu.start_date),
        gpa: s(edu.gpa),
        details: s(edu.description),
        major: edu.title && edu.accreditation ? s(edu.title) : undefined,
      })) || []
    const uniqueSkills = new Map<string, SkillEntry>()
    if (rawExtractedData.skills && Array.isArray(rawExtractedData.skills)) {
      rawExtractedData.skills.forEach((skill: any) => {
        const skillName = s(skill.name)
        if (skillName && !uniqueSkills.has(skillName.toLowerCase())) {
          uniqueSkills.set(skillName.toLowerCase(), {
            name: skillName,
            type: s(skill.type),
          })
        }
      })
    }
    const skills: SkillEntry[] = Array.from(uniqueSkills.values())
    const languages: LanguageEntry[] =
      rawExtractedData.languages?.map((lang: any) => ({
        language: s(lang.name),
        proficiency: s(lang.proficiency),
      })) || []
    const certifications: CertificationEntry[] =
      rawExtractedData.certifications?.map((cert: any) => ({
        name: s(cert.name),
        issuingOrganization: s(cert.organization),
        issueDate: s(cert.issue_date),
      })) || []
    return { personalInformation, workExperience, education, skills, languages, certifications }
  }

  const parseResumeWithEdenAI = async (file: File) => {
    setLocalError(null)
    onParsingStart()
    setIsUploading(true)
    setParsedSuccessfully(false)

    const EDEN_AI_API_KEY = import.meta.env.EDEN_AI_API_KEY
    if (!EDEN_AI_API_KEY) {
      const errorMsg = "Eden AI API key is not configured. Set EDEN_AI_API_KEY in your .env file."
      toast.error(errorMsg)
      setLocalError(errorMsg)
      onParsingError(errorMsg)
      setIsUploading(false)
      return
    }

    const formData = new FormData()
    formData.append("providers", "affinda")
    formData.append("file", file)
    formData.append("fallback_providers", "")

    try {
      const response = await fetch("https://api.edenai.run/v2/ocr/resume_parser", {
        method: "POST",
        headers: { Authorization: `Bearer ${EDEN_AI_API_KEY}` },
        body: formData,
      })

      const responseText = await response.text()
      let data
      try {
        data = JSON.parse(responseText)
      } catch (e) {
        if (!response.ok) {
          console.error("Eden AI Error Response Text (not JSON):", responseText)
          const errorMsg = `Eden AI API Error: ${response.status} ${response.statusText}. Response: ${responseText.substring(0, 100)}...`
          toast.error(errorMsg)
          setLocalError(errorMsg)
          onParsingError(errorMsg)
          setIsUploading(false)
          return
        }
        console.error("Failed to parse Eden AI JSON response (but status was OK):", responseText)
        const errorMsg = "Invalid JSON response from Eden AI, even though status was OK."
        toast.error(errorMsg)
        setLocalError(errorMsg)
        onParsingError(errorMsg)
        setIsUploading(false)
        return
      }

      if (!response.ok) {
        const errorMessage =
          data?.error?.message || data?.detail || `Eden AI API Error: ${response.status} ${response.statusText}`
        console.error("Eden AI Error Response JSON/Text:", data || responseText)
        toast.error(`Eden AI API Error: ${errorMessage}`)
        setLocalError(errorMessage)
        onParsingError(errorMessage)
        setIsUploading(false)
        return
      }

      const providersToTry = ["affinda"]
      let providerResult = null
      for (const provider of providersToTry) {
        if (data[provider] && data[provider].status === "success") {
          providerResult = data[provider]
          break
        }
      }

      if (providerResult) {
        const transformedData = transformEdenAIData(providerResult)
        if (transformedData) {
          onDataParsed(transformedData)
          setParsedSuccessfully(true)
          toast.success("Resume parsed successfully!")
        } else {
          const errorMsg = "Failed to transform parsed data from Eden AI."
          toast.error(errorMsg)
          setLocalError(errorMsg)
          onParsingError(errorMsg)
        }
      } else {
        const errorMsg = data?.error?.message || data?.detail || "Eden AI parsing failed for specified providers."
        console.error("Eden AI Provider Error:", data)
        toast.error(errorMsg)
        setLocalError(errorMsg)
        onParsingError(errorMsg)
      }
    } catch (error: any) {
      console.error("Error during Eden AI API call:", error)
      const errorMsg = `Error during API call: ${error.message}`
      toast.error(errorMsg)
      setLocalError(errorMsg)
      onParsingError(errorMsg)
    } finally {
      setIsUploading(false)
    }
  }

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const allowedTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ]
      if (!allowedTypes.includes(file.type)) {
        const err = "Please upload a PDF or Word document."
        toast.error(err)
        setLocalError(err)
        onParsingError(err)
        if (event.target) event.target.value = ""
        return
      }
      if (file.size > 5 * 1024 * 1024) {
        // 5MB
        const err = "File size must be less than 5MB."
        toast.error(err)
        setLocalError(err)
        onParsingError(err)
        if (event.target) event.target.value = ""
        return
      }
      setUploadedFile(file)
      await parseResumeWithEdenAI(file)
    }
    if (event.target) event.target.value = ""
  }

  const resetUpload = () => {
    setUploadedFile(null)
    setIsUploading(false)
    setParsedSuccessfully(false)
    setLocalError(null)
    onDataParsed(null)
    onParsingError("")
    const fileInput = document.getElementById("file-upload") as HTMLInputElement
    if (fileInput) fileInput.value = ""
  }

  const fileUploadIcon = localError ? (
    <AlertTriangle className="h-10 w-10 text-red-500" />
  ) : isUploading ? (
    <Loader2 className="h-10 w-10 text-blue-500 animate-spin" />
  ) : parsedSuccessfully ? (
    <CheckCircle className="h-10 w-10 text-green-500" />
  ) : uploadedFile ? (
    <FileText className="h-10 w-10 text-gray-500" />
  ) : (
    <Upload className="h-10 w-10 text-gray-500" />
  )

  const uploadText = localError
    ? "Parsing Error"
    : isUploading
      ? "Parsing Resume..."
      : parsedSuccessfully
        ? "Parsed Successfully!"
        : uploadedFile
          ? "File Selected"
          : "Upload Your Resume/CV"

  const uploadDescription = localError
    ? localError
    : isUploading
      ? "This may take a moment..."
      : parsedSuccessfully
        ? uploadedFile?.name
        : "Our AI will extract your professional information."

  return (
    <Card className="w-full shadow-md dark:bg-gray-800 mb-6 md:mb-8">
      <CardHeader className="text-center pb-4">
        <CardTitle className="text-xl font-semibold text-teal-600 dark:text-teal-400">AI Resume Parser</CardTitle>
        <CardDescription className="text-sm text-gray-500 dark:text-gray-400">PDF, DOC, DOCX - Max 5MB</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center p-4">
        <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 text-center w-full max-w-md">
          <div className="flex justify-center mb-3">{fileUploadIcon}</div>
          <p className="text-md font-medium text-gray-700 dark:text-gray-200 mb-1">{uploadText}</p>
          <p
            className="text-xs text-gray-500 dark:text-gray-400 mb-3 truncate w-full px-2"
            title={uploadDescription || undefined}
          >
            {uploadDescription}
          </p>
          <Input
            id="file-upload"
            type="file"
            className="hidden"
            onChange={handleFileUpload}
            accept=".pdf,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          />
          <div className="flex gap-2 justify-center">
            <label
              htmlFor="file-upload"
              className="inline-flex items-center px-3 py-2 bg-teal-600 text-white text-sm font-medium rounded-md shadow-sm hover:bg-teal-700 cursor-pointer"
            >
              <Upload className="mr-1.5 h-4 w-4" /> Choose File
            </label>
            {(uploadedFile || localError) && (
              <Button variant="outline" size="sm" className="px-3 py-2 text-sm" onClick={resetUpload}>
                {" "}
                Reset{" "}
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// --- ResumePreviewCard Component ---
const ResumePreviewCard: React.FC<{ data: ParsedResumeData | null; isVisible: boolean }> = ({ data, isVisible }) => {
  if (!isVisible || !data) {
    return null
  }

  const { personalInformation: pi, workExperience, education, skills, languages, certifications } = data

  const formatDate = (dateString?: string, isEndDate = false) => {
    if (!dateString) return isEndDate ? "Present" : "N/A"
    try {
      const normalizedDateString = dateString.replace(/-/g, "/").replace(/\./g, "/")
      const date = new Date(normalizedDateString)
      if (isNaN(date.getTime())) return dateString
      return new Date(date).toLocaleDateString(undefined, { year: "numeric", month: "short" })
    } catch (e) {
      return dateString
    }
  }

  const hasValidString = (str: string | undefined | null): str is string =>
    !!str && str.trim() !== "" && str.toLowerCase() !== "n/a"

  const renderSection = (
    title: string,
    icon: React.ElementType,
    content: React.ReactNode,
    sectionKey: string,
    isEmpty: boolean,
  ) => (
    <AccordionItem value={sectionKey} key={sectionKey} className="border-b dark:border-gray-700">
      <AccordionTrigger className="text-md font-medium hover:no-underline text-gray-700 dark:text-gray-300 py-3">
        <div className="flex items-center gap-2">
          {React.createElement(icon, { className: "h-5 w-5 text-teal-500 dark:text-teal-400" })} {title}
        </div>
      </AccordionTrigger>
      <AccordionContent className="pt-1 pb-3 text-sm space-y-2">
        {isEmpty ? (
          <span className="text-gray-500 dark:text-gray-400">
            No {title.toLowerCase()} information provided or extracted.
          </span>
        ) : (
          content
        )}
      </AccordionContent>
    </AccordionItem>
  )

  const name = hasValidString(pi.name) ? pi.name : `${pi.firstName || ""} ${pi.lastName || ""}`.trim() || "N/A"

  return (
    <Card className="w-full shadow-xl dark:bg-gray-800 flex flex-col">
      <CardHeader className="pb-4 border-b dark:border-gray-700">
        <CardTitle className="text-xl font-semibold text-gray-800 dark:text-white">Extracted Resume Details</CardTitle>
        <CardDescription className="text-gray-500 dark:text-gray-400">
          Review the information parsed from the uploaded resume.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow overflow-y-auto p-4 space-y-3">
        <Accordion type="multiple" defaultValue={["personal-info", "summary", "work-experience"]} className="w-full">
          {renderSection(
            "Personal Information",
            User,
            <div className="space-y-1.5 text-gray-600 dark:text-gray-300">
              {hasValidString(name) && (
                <p>
                  <strong>Name:</strong> {name}
                </p>
              )}
              {hasValidString(pi.email) && (
                <p className="flex items-center gap-1">
                  <strong>Email:</strong>{" "}
                  <a href={`mailto:${pi.email}`} className="text-teal-600 hover:underline dark:text-teal-400">
                    {pi.email}
                  </a>{" "}
                  <Mail size={14} className="text-gray-400 dark:text-gray-500" />
                </p>
              )}
              {hasValidString(pi.phone) && (
                <p className="flex items-center gap-1">
                  <strong>Phone:</strong> {pi.phone} <Phone size={14} className="text-gray-400 dark:text-gray-500" />
                </p>
              )}
              {hasValidString(pi.address) && (
                <p className="flex items-center gap-1">
                  <strong>Address:</strong> {pi.address}{" "}
                  <MapPin size={14} className="text-gray-400 dark:text-gray-500" />
                </p>
              )}
              {hasValidString(pi.linkedin) && (
                <p className="flex items-center gap-1">
                  <strong>LinkedIn:</strong>{" "}
                  <a
                    href={!pi.linkedin.startsWith("http") ? `https://${pi.linkedin}` : pi.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-teal-600 hover:underline dark:text-teal-400"
                  >
                    Profile
                  </a>{" "}
                  <Linkedin size={14} className="text-gray-400 dark:text-gray-500" />
                </p>
              )}
              {hasValidString(pi.github) && (
                <p className="flex items-center gap-1">
                  <strong>GitHub:</strong>{" "}
                  <a
                    href={!pi.github.startsWith("http") ? `https://${pi.github}` : pi.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-teal-600 hover:underline dark:text-teal-400"
                  >
                    Profile
                  </a>{" "}
                  <Github size={14} className="text-gray-400 dark:text-gray-500" />
                </p>
              )}
              {hasValidString(pi.website) && (
                <p className="flex items-center gap-1">
                  <strong>Website:</strong>{" "}
                  <a
                    href={!pi.website.startsWith("http") ? `https://${pi.website}` : pi.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-teal-600 hover:underline dark:text-teal-400"
                  >
                    Link
                  </a>{" "}
                  <Globe size={14} className="text-gray-400 dark:text-gray-500" />
                </p>
              )}
            </div>,
            "personal-info",
            !Object.values(pi || {}).some((val) => hasValidString(val as string)),
          )}
          {renderSection(
            "Summary",
            FileText,
            <p className="whitespace-pre-line text-sm text-gray-600 dark:text-gray-300">{pi.summary}</p>,
            "summary",
            !hasValidString(pi.summary),
          )}
          {renderSection(
            "Work Experience",
            Briefcase,
            <div className="space-y-4">
              {workExperience?.map((exp, index) => (
                <div
                  key={index}
                  className="p-2.5 border rounded-md dark:border-gray-600 bg-gray-50 dark:bg-gray-700/30"
                >
                  <h4 className="font-semibold text-gray-800 dark:text-gray-100">{exp.jobTitle}</h4>
                  <p className="text-sm font-medium text-teal-600 dark:text-teal-400">{exp.company}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                    {hasValidString(exp.location) && (
                      <span className="flex items-center gap-1">
                        <MapPin size={12} /> {exp.location} |{" "}
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <CalendarDays size={12} /> {formatDate(exp.startDate)} - {formatDate(exp.endDate, true)}
                    </span>
                  </p>
                  {hasValidString(exp.description) && (
                    <p className="mt-1.5 text-xs text-gray-600 dark:text-gray-300 whitespace-pre-line">
                      {exp.description}
                    </p>
                  )}
                </div>
              ))}
            </div>,
            "work-experience",
            !workExperience || workExperience.length === 0,
          )}
          {renderSection(
            "Education",
            GraduationCap,
            <div className="space-y-3">
              {education?.map((edu, index) => (
                <div
                  key={index}
                  className="p-2.5 border rounded-md dark:border-gray-600 bg-gray-50 dark:bg-gray-700/30"
                >
                  <h4 className="font-semibold text-gray-800 dark:text-gray-100">{edu.degree || edu.major}</h4>
                  <p className="text-sm font-medium text-teal-600 dark:text-teal-400">{edu.institution}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                    {hasValidString(edu.location) && (
                      <span className="flex items-center gap-1">
                        <MapPin size={12} /> {edu.location} |{" "}
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <CalendarDays size={12} />
                      {edu.startDate && `${formatDate(edu.startDate)} - `}
                      {formatDate(edu.graduationDate, true)}
                    </span>
                    {hasValidString(edu.gpa) && ` | GPA: ${edu.gpa}`}
                  </p>
                  {hasValidString(edu.details) && (
                    <p className="mt-1.5 text-xs text-gray-600 dark:text-gray-300 whitespace-pre-line">{edu.details}</p>
                  )}
                </div>
              ))}
            </div>,
            "education",
            !education || education.length === 0,
          )}
          {renderSection(
            "Skills",
            Lightbulb,
            <div className="flex flex-wrap gap-1.5">
              {skills?.map((skill, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="bg-teal-100 text-teal-800 dark:bg-teal-700/80 dark:text-teal-100 text-xs px-2 py-0.5"
                >
                  {skill.name} {hasValidString(skill.type) && `(${skill.type.replace("_", " ")})`}
                </Badge>
              ))}
            </div>,
            "skills",
            !skills || skills.length === 0,
          )}
          {renderSection(
            "Languages",
            Languages,
            <ul className="list-disc list-inside pl-1 space-y-0.5 text-gray-600 dark:text-gray-300">
              {languages?.map((lang, index) => (
                <li key={index}>
                  {lang.language}{" "}
                  {hasValidString(lang.proficiency) && (
                    <span className="text-gray-500 dark:text-gray-400">({lang.proficiency})</span>
                  )}
                </li>
              ))}
            </ul>,
            "languages",
            !languages || languages.length === 0,
          )}
          {renderSection(
            "Certifications",
            Award,
            <ul className="space-y-1.5 text-gray-600 dark:text-gray-300">
              {certifications?.map((cert, index) => (
                <li key={index}>
                  <p className="font-medium">{cert.name}</p>
                  {hasValidString(cert.issuingOrganization) && (
                    <p className="text-xs text-gray-500 dark:text-gray-400">From: {cert.issuingOrganization}</p>
                  )}
                  {hasValidString(cert.issueDate) && (
                    <p className="text-xs text-gray-500 dark:text-gray-400">Date: {formatDate(cert.issueDate)}</p>
                  )}
                </li>
              ))}
            </ul>,
            "certifications",
            !certifications || certifications.length === 0,
          )}
        </Accordion>
      </CardContent>
    </Card>
  )
}

// --- App Component (Main Structure) ---
function App() {
  const [parsedResumeData, setParsedResumeData] = useState<ParsedResumeData | null>(null)
  const [isPreviewVisible, setIsPreviewVisible] = useState(false)
  const [isParsing, setIsParsing] = useState(false)
  const [parsingError, setParsingError] = useState<string | null>(null)

  const handleDataParsed = (data: ParsedResumeData | null) => {
    setParsedResumeData(data)
    setIsPreviewVisible(!!data)
    setIsParsing(false)
    setParsingError(null)
  }
  const handleParsingStart = () => {
    setIsParsing(true)
    setIsPreviewVisible(false)
    setParsedResumeData(null)
    setParsingError(null)
  }
  const handleParsingError = (errorMsg: string) => {
    setIsParsing(false)
    setIsPreviewVisible(false)
    setParsingError(errorMsg)
  }

  return (
    <>
      <Toaster richColors position="top-right" />
      <div className="min-h-screen bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-slate-100 p-4 md:p-8">
        <header className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-teal-600 dark:text-teal-400">AI Resume Analyzer</h1>
          <p className="text-md md:text-lg text-slate-600 dark:text-slate-400 mt-2">
            Upload your CV to automatically extract key information.
          </p>
        </header>

        {/* Main content area: Uploader above, Preview/Status below */}
        <div className="flex flex-col gap-6 md:gap-8 items-center">
          {/* Uploader Section - Centered and with a max-width */}
          <div className="w-full max-w-2xl">
            {" "}
            {/* Adjusted for better centering and responsiveness */}
            <CVUploadParser
              onDataParsed={handleDataParsed}
              onParsingStart={handleParsingStart}
              onParsingError={handleParsingError}
            />
          </div>

          {/* Preview or Status Section - Takes full width below uploader */}
          <div className="w-full">
            {isParsing ? (
              <Card className="shadow-lg dark:bg-gray-800 flex flex-col items-center justify-center p-10">
                <Loader2 className="h-12 w-12 text-teal-500 dark:text-teal-400 animate-spin mb-4" />
                <p className="text-lg text-gray-700 dark:text-gray-300">Analyzing Resume...</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Please wait a moment.</p>
              </Card>
            ) : parsingError && !isPreviewVisible ? (
              <Card className="shadow-lg dark:bg-gray-800 border-red-500 border-2 p-10">
                <CardHeader className="p-0 pb-4 text-center">
                  <CardTitle className="text-xl font-semibold text-red-600 dark:text-red-400 flex items-center justify-center gap-2">
                    <AlertTriangle /> Parsing Failed
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0 flex flex-col items-center justify-center">
                  <FileText size={48} className="text-red-400 dark:text-red-500 mb-4" />
                  <p className="text-red-500 dark:text-red-400 text-center px-4">{parsingError}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                    Please try a different file or check the console.
                  </p>
                </CardContent>
              </Card>
            ) : isPreviewVisible && parsedResumeData ? (
              <ResumePreviewCard data={parsedResumeData} isVisible={true} />
            ) : (
              <Card className="shadow-lg dark:bg-gray-800 hidden md:flex flex-col items-center justify-center p-10">
                {/* Hidden on small screens, shown on md and up */}
                <CardHeader className="p-0 pb-4 text-center">
                  <CardTitle className="text-xl font-semibold text-gray-500 dark:text-gray-400">
                    Resume Preview
                  </CardTitle>
                  <CardDescription className="text-gray-400 dark:text-gray-500">
                    Upload a resume to see the extracted details here.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0 flex flex-col items-center justify-center">
                  <FileText size={48} className="text-gray-400 dark:text-gray-500 mb-4" />
                  <p className="text-gray-500 dark:text-gray-400">Awaiting resume upload...</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
        <footer className="text-center mt-12 py-4 border-t dark:border-gray-700">
          <p className="text-sm text-gray-500 dark:text-gray-400">Resume Analyzer powered by Eden AI.</p>
        </footer>
      </div>
    </>
  )
}

export default App
