"use client"

import React, { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
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
  LanguagesIcon,
  Award,
  Mail,
  Phone,
  Linkedin,
  Github,
  Globe,
  MapPin,
  CalendarDays,
  AlertTriangle,
  Trash2,
  PlusCircle,
  ClipboardList,
  Heart,
  Users,
  FileSignature,
  Save,
  Download,
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
  professionalTitle?: string
  idNumber?: string
  dateOfBirth?: string
  nationality?: string
  gender?: string
  ethnicGroup?: string
  disabilityStatus?: string
  maritalStatus?: string
  postalAddress?: string
  province?: string
  suburbTown?: string
  postalCode?: string
  alternativeContact?: string
  reliableTransport?: string
  driversLicense?: string
  criminalRecord?: string
  noticePeriod?: string
  southAfricanCitizen?: string
}

interface WorkExperienceEntry {
  id: string
  jobTitle: string
  company: string
  location: string
  startDate: string
  endDate: string
  description: string
  industry: string
}

interface EducationEntry {
  id: string
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
  id: string
  name: string
  type: string
}

interface LanguageEntry {
  id: string
  language: string
  proficiency?: string
}

interface CertificationEntry {
  id: string
  name: string
  issuingOrganization?: string
  issueDate?: string
}

interface ProjectEntry {
  id: string
  name: string
  description?: string
  url?: string
  technologies?: string[]
}

interface InterestEntry {
  id: string
  name: string
}

interface ReferenceEntry {
  id: string
  name: string
  contact?: string
  relationship?: string
}

export interface ParsedResumeData {
  personalInformation: PersonalInformation
  workExperience: WorkExperienceEntry[]
  education: EducationEntry[]
  skills: SkillEntry[]
  languages: LanguageEntry[]
  certifications: CertificationEntry[]
  projects: ProjectEntry[]
  interests: InterestEntry[]
  references: ReferenceEntry[]
}

const generateId = () => Math.random().toString(36).substr(2, 9)

const createEmptyPersonalInformation = (): PersonalInformation => ({
  name: "",
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  linkedin: "",
  github: "",
  website: "",
  address: "",
  summary: "",
  professionalTitle: "",
  idNumber: "",
  dateOfBirth: "",
  nationality: "",
  gender: "",
  ethnicGroup: "",
  disabilityStatus: "",
  maritalStatus: "",
  postalAddress: "",
  province: "",
  suburbTown: "",
  postalCode: "",
  alternativeContact: "",
  reliableTransport: "",
  driversLicense: "",
  criminalRecord: "",
  noticePeriod: "",
  southAfricanCitizen: "",
})

const createEmptyWorkExperienceEntry = (): WorkExperienceEntry => ({
  id: generateId(),
  jobTitle: "",
  company: "",
  location: "",
  startDate: "",
  endDate: "",
  description: "",
  industry: "",
})

const createEmptyEducationEntry = (): EducationEntry => ({
  id: generateId(),
  degree: "",
  institution: "",
  location: "",
  graduationDate: "",
  startDate: "",
  gpa: "",
  details: "",
})

const createEmptySkillEntry = (): SkillEntry => ({ id: generateId(), name: "", type: "" })

const createEmptyLanguageEntry = (): LanguageEntry => ({ id: generateId(), language: "", proficiency: "" })

const createEmptyCertificationEntry = (): CertificationEntry => ({
  id: generateId(),
  name: "",
  issuingOrganization: "",
  issueDate: "",
})

const createEmptyProjectEntry = (): ProjectEntry => ({
  id: generateId(),
  name: "",
  description: "",
  url: "",
  technologies: [],
})

const createEmptyInterestEntry = (): InterestEntry => ({ id: generateId(), name: "" })

const createEmptyReferenceEntry = (): ReferenceEntry => ({ id: generateId(), name: "", contact: "", relationship: "" })

const createEmptyParsedResumeData = (): ParsedResumeData => ({
  personalInformation: createEmptyPersonalInformation(),
  workExperience: [],
  education: [],
  skills: [],
  languages: [],
  certifications: [],
  projects: [],
  interests: [],
  references: [],
})

interface CVUploadParserProps {
  onDataParsed: (data: ParsedResumeData | null) => void
  onParsingStart: () => void
  onParsingError: (errorMsg: string) => void
}

const CVUploadParser: React.FC<CVUploadParserProps> = ({ onDataParsed, onParsingStart, onParsingError }) => {
  const [isUploading, setIsUploading] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [parsedSuccessfully, setParsedSuccessfully] = useState(false)
  const [localError, setLocalError] = useState<string | null>(null)

  const transformEdenAIData = (providerResult: any): ParsedResumeData => {
    const rawExtractedData = providerResult?.extracted_data || {}
    const s = (value: any, defaultValue = "") => (typeof value === "string" ? value : defaultValue)
    const arr = (value: any) => (Array.isArray(value) ? value : [])

    const personalInformation: PersonalInformation = {
      ...createEmptyPersonalInformation(),
      name: s(rawExtractedData.personal_infos?.name?.raw_name),
      firstName: s(rawExtractedData.personal_infos?.name?.first_name),
      lastName: s(rawExtractedData.personal_infos?.name?.last_name),
      email: s(arr(rawExtractedData.personal_infos?.mails)[0]),
      phone: s(arr(rawExtractedData.personal_infos?.phones)[0]),
      linkedin: s(arr(rawExtractedData.personal_infos?.urls).find((url: string) => url.includes("linkedin.com"))),
      github: s(arr(rawExtractedData.personal_infos?.urls).find((url: string) => url.includes("github.com"))),
      website: s(
        arr(rawExtractedData.personal_infos?.urls).find(
          (url: string) => !url.includes("linkedin.com") && !url.includes("github.com"),
        ),
      ),
      address: s(
        rawExtractedData.personal_infos?.address?.formatted_location ||
          rawExtractedData.personal_infos?.address?.raw_input_location,
      ),
      summary: s(rawExtractedData.personal_infos?.self_summary),
      professionalTitle: s(arr(rawExtractedData.work_experience?.entries)[0]?.title),
      dateOfBirth: s(rawExtractedData.personal_infos?.birth_date),
      nationality: s(rawExtractedData.personal_infos?.nationality),
      gender: s(rawExtractedData.personal_infos?.gender),
    }

    const workExperience: WorkExperienceEntry[] = arr(rawExtractedData.work_experience?.entries).map((exp: any) => ({
      id: generateId(),
      jobTitle: s(exp.title),
      company: s(exp.company),
      location: s(exp.location?.formatted_location || exp.location?.raw_input_location),
      startDate: s(exp.start_date),
      endDate: s(exp.end_date),
      description: s(exp.description),
      industry: s(exp.industry),
    }))

    const education: EducationEntry[] = arr(rawExtractedData.education?.entries).map((edu: any) => ({
      id: generateId(),
      degree: s(edu.title || edu.accreditation),
      institution: s(edu.establishment),
      location: s(edu.location?.formatted_location || edu.location?.raw_input_location),
      graduationDate: s(edu.end_date),
      startDate: s(edu.start_date),
      gpa: s(edu.gpa),
      details: s(edu.description),
      major: edu.title && edu.accreditation ? s(edu.title) : undefined,
    }))

    const uniqueSkills = new Map<string, SkillEntry>()
    arr(rawExtractedData.skills).forEach((skill: any) => {
      const skillName = s(skill.name)
      if (skillName && !uniqueSkills.has(skillName.toLowerCase())) {
        uniqueSkills.set(skillName.toLowerCase(), { id: generateId(), name: skillName, type: s(skill.type) })
      }
    })
    const skills: SkillEntry[] = Array.from(uniqueSkills.values())

    const languages: LanguageEntry[] = arr(rawExtractedData.languages).map((lang: any) => ({
      id: generateId(),
      language: s(lang.name),
      proficiency: s(lang.level),
    }))

    const certifications: CertificationEntry[] = arr(rawExtractedData.certifications).map((cert: any) => ({
      id: generateId(),
      name: s(cert.name || cert.title),
      issuingOrganization: s(cert.organization || cert.issuer),
      issueDate: s(cert.date || cert.issue_date),
    }))

    const projects: ProjectEntry[] = arr(rawExtractedData.projects).map((proj: any) => ({
      id: generateId(),
      name: s(proj.title || proj.name),
      description: s(proj.description || proj.details),
      url: s(arr(proj.urls)[0]),
      technologies: arr(proj.technologies).map((tech: any) => s(tech.name || tech)),
    }))

    const interests: InterestEntry[] = arr(rawExtractedData.interests).map((interest: any) => ({
      id: generateId(),
      name: s(interest.name || interest.interest),
    }))

    const references: ReferenceEntry[] = arr(rawExtractedData.references).map((ref: any) => ({
      id: generateId(),
      name: s(ref.name),
      contact: s(ref.contact_info || ref.phone || ref.email),
      relationship: s(ref.relationship),
    }))

    return {
      personalInformation,
      workExperience,
      education,
      skills,
      languages,
      certifications,
      projects,
      interests,
      references,
    }
  }

  const parseResumeWithEdenAI = async (file: File) => {
    setLocalError(null)
    onParsingStart()
    setIsUploading(true)
    setParsedSuccessfully(false)
    const EDEN_AI_API_KEY = import.meta.env.VITE_EDEN_AI_API_KEY
    if (!EDEN_AI_API_KEY) {
      const errorMsg = "Eden AI API key is not configured."
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
        const errorMsg = `Eden AI API Error: ${response.status}. Response: ${responseText.substring(0, 100)}...`
        toast.error(errorMsg)
        setLocalError(errorMsg)
        onParsingError(errorMsg)
        setIsUploading(false)
        return
      }

      if (!response.ok) {
        const errorMessage = data?.error?.message || data?.detail || `Eden AI API Error: ${response.status}`
        toast.error(`Eden AI API Error: ${errorMessage}`)
        setLocalError(errorMessage)
        onParsingError(errorMessage)
        setIsUploading(false)
        return
      }

      const providerKey = Object.keys(data).find((k) => k !== "eden" && data[k] && data[k].status)
      const providerResult = providerKey ? data[providerKey] : null

      if (providerResult && providerResult.status === "success") {
        const transformedData = transformEdenAIData(providerResult)
        onDataParsed(transformedData)
        setParsedSuccessfully(true)
        toast.success("Resume parsed!")
      } else {
        const ed = providerResult?.error?.message || JSON.stringify(providerResult?.error) || "Provider error."
        const em = `Eden AI parsing failed. Detail: ${ed}`
        console.error("Eden AI Provider Error:", providerResult)
        toast.error(em)
        setLocalError(em)
        onParsingError(em)
      }
    } catch (error: any) {
      const em = `API call error: ${error.message}`
      toast.error(em)
      setLocalError(em)
      onParsingError(em)
    } finally {
      setIsUploading(false)
    }
  }

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return
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
      const err = "File size must be less than 5MB."
      toast.error(err)
      setLocalError(err)
      onParsingError(err)
      if (event.target) event.target.value = ""
      return
    }
    setUploadedFile(file)
    await parseResumeWithEdenAI(file)
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
        : "✨ Transform your CV into a professional masterpiece! Our AI-powered parser instantly extracts and organizes your experience, education, skills, and more. Get a structured, ATS-friendly resume that stands out to employers. 🚀"

  return (
    <Card className="w-full shadow-md dark:bg-gray-800 mt-[100px]">
      <CardHeader className="text-center pb-4">
        <CardTitle className="text-xl font-semibold text-teal-600 dark:text-teal-400">AI Resume Parser</CardTitle>
        <CardDescription className="text-sm text-gray-500 dark:text-gray-400">PDF, DOC, DOCX - Max 5MB</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center p-4">
        <div
          className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 w-full flex flex-col items-center"
          style={{ minHeight: "410px" }}
        >
          <div className="flex flex-col items-center space-y-3 text-center">
            <div className="flex justify-center">{fileUploadIcon}</div>
            <p className="text-md font-medium text-gray-700 dark:text-gray-200">{uploadText}</p>
            <p
              className="text-sm text-gray-500 dark:text-gray-400 max-w-md leading-relaxed"
              title={uploadDescription || undefined}
            >
              {uploadDescription}
            </p>
            <div className="mt-4 grid grid-cols-2 gap-4 text-xs text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-teal-500" />
                <span>Smart Data Extraction</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-teal-500" />
                <span>ATS Optimization</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-teal-500" />
                <span>Professional Formatting</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-teal-500" />
                <span>Instant Preview</span>
              </div>
            </div>
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
                  Reset
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

const ResumePreviewCard: React.FC<{ data: ParsedResumeData | null; isVisible: boolean }> = ({ data, isVisible }) => {
  if (!isVisible || !data) return null
  const {
    personalInformation: pi,
    workExperience,
    education,
    skills,
    languages,
    certifications,
    projects,
    interests,
    references,
  } = data
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
    !!str && str.trim() !== "" && str.toLowerCase() !== "n/a" && str.toLowerCase() !== "undefined"

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
      <AccordionContent className="pt-1 pb-3 text-sm text-gray-600 dark:text-gray-300 space-y-2">
        {isEmpty ? `No ${title.toLowerCase()} information provided or extracted.` : content}
      </AccordionContent>
    </AccordionItem>
  )
  const name = hasValidString(pi.name) ? pi.name : `${pi.firstName || ""} ${pi.lastName || ""}`.trim() || "N/A"

  return (
    <Card className="sticky top-8 h-[calc(100vh-4rem)] shadow-xl dark:bg-gray-800 flex flex-col">
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
            <div className="space-y-1.5">
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
            !Object.values(pi || {}).some((val) => hasValidString(val as string) && val !== ""),
          )}
          {renderSection(
            "Summary",
            FileText,
            <p className="whitespace-pre-line text-sm">{pi.summary}</p>,
            "summary",
            !hasValidString(pi.summary),
          )}
          {renderSection(
            "Work Experience",
            Briefcase,
            <div className="space-y-4">
              {workExperience?.map((exp) => (
                <div
                  key={exp.id}
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
              {education?.map((edu) => (
                <div
                  key={edu.id}
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
                      <CalendarDays size={12} /> {edu.startDate && `${formatDate(edu.startDate)} - `}
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
              {skills?.map((skill) => (
                <Badge
                  key={skill.id}
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
            LanguagesIcon,
            <ul className="list-disc list-inside pl-1 space-y-0.5">
              {languages?.map((lang) => (
                <li key={lang.id}>
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
            <ul className="space-y-1.5">
              {certifications?.map((cert) => (
                <li key={cert.id}>
                  <p className="font-medium text-gray-700 dark:text-gray-200">{cert.name}</p>
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
          {renderSection(
            "Projects",
            ClipboardList,
            <div className="space-y-3">
              {projects?.map((proj) => (
                <div
                  key={proj.id}
                  className="p-2.5 border rounded-md dark:border-gray-600 bg-gray-50 dark:bg-gray-700/30"
                >
                  <h4 className="font-semibold text-gray-800 dark:text-gray-100">{proj.name}</h4>
                  {proj.url && (
                    <p className="text-xs text-teal-600 dark:text-teal-400 hover:underline">
                      <a href={proj.url} target="_blank" rel="noopener noreferrer">
                        {proj.url}
                      </a>
                    </p>
                  )}
                  {hasValidString(proj.description) && (
                    <p className="mt-1 text-xs text-gray-600 dark:text-gray-300 whitespace-pre-line">
                      {proj.description}
                    </p>
                  )}
                  {proj.technologies && proj.technologies.length > 0 && (
                    <p className="mt-1 text-xs">
                      <strong>Technologies:</strong> {proj.technologies.join(", ")}
                    </p>
                  )}
                </div>
              ))}
            </div>,
            "projects",
            !projects || projects.length === 0,
          )}
          {renderSection(
            "Interests",
            Heart,
            <ul className="list-disc list-inside pl-1 space-y-0.5">
              {interests?.map((interest) => (
                <li key={interest.id}>{interest.name}</li>
              ))}
            </ul>,
            "interests",
            !interests || interests.length === 0,
          )}
          {renderSection(
            "References",
            Users,
            <div className="space-y-3">
              {references?.map((ref) => (
                <div
                  key={ref.id}
                  className="p-2.5 border rounded-md dark:border-gray-600 bg-gray-50 dark:bg-gray-700/30"
                >
                  <h4 className="font-semibold text-gray-800 dark:text-gray-100">{ref.name}</h4>
                  {hasValidString(ref.relationship) && (
                    <p className="text-xs text-gray-500 dark:text-gray-400">{ref.relationship}</p>
                  )}
                  {hasValidString(ref.contact) && (
                    <p className="text-xs text-gray-600 dark:text-gray-300">{ref.contact}</p>
                  )}
                </div>
              ))}
            </div>,
            "references",
            !references || references.length === 0,
          )}
        </Accordion>
      </CardContent>
    </Card>
  )
}

interface EditableFieldProps {
  label: string
  id: string
  value?: string
  placeholder?: string
  type?: string
  fullWidth?: boolean
  isTextarea?: boolean
  onChange: (value: string) => void
}
const EditableField: React.FC<EditableFieldProps> = ({
  label,
  id,
  value,
  placeholder,
  type = "text",
  fullWidth,
  isTextarea,
  onChange,
}) => (
  <div className={fullWidth ? "col-span-2" : ""}>
    <Label htmlFor={id} className="text-sm font-medium text-gray-700 dark:text-gray-300">
      {label}
    </Label>
    {isTextarea ? (
      <Textarea
        id={id}
        value={value || ""}
        placeholder={placeholder || `Enter ${label.toLowerCase()}...`}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 block w-full border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 dark:bg-gray-700 dark:text-gray-200"
        rows={3}
      />
    ) : (
      <Input
        type={type}
        id={id}
        value={value || ""}
        placeholder={placeholder || `Enter ${label.toLowerCase()}...`}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 block w-full border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 dark:bg-gray-700 dark:text-gray-200"
      />
    )}
  </div>
)

interface EditableRadioGroupProps {
  label: string
  idPrefix: string
  value?: string
  options: { label: string; value: string }[]
  onChange: (value: string) => void
}
const EditableRadioGroup: React.FC<EditableRadioGroupProps> = ({ label, idPrefix, value, options, onChange }) => (
  <div>
    <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</Label>
    <RadioGroup value={value || ""} onValueChange={onChange} className="mt-2 flex flex-wrap gap-x-4 gap-y-2">
      {options.map((option) => (
        <div key={option.value} className="flex items-center space-x-2">
          <RadioGroupItem value={option.value} id={`${idPrefix}-${option.value}`} />
          <Label htmlFor={`${idPrefix}-${option.value}`} className="font-normal text-gray-600 dark:text-gray-400">
            {option.label}
          </Label>
        </div>
      ))}
    </RadioGroup>
  </div>
)

interface EditableSelectFieldProps {
  label: string
  id: string
  value?: string
  placeholder?: string
  options: { label: string; value: string }[]
  onChange: (value: string) => void
}
const EditableSelectField: React.FC<EditableSelectFieldProps> = ({
  label,
  id,
  value,
  placeholder,
  options,
  onChange,
}) => (
  <div>
    <Label htmlFor={id} className="text-sm font-medium text-gray-700 dark:text-gray-300">
      {label}
    </Label>
    <Select value={value || ""} onValueChange={onChange}>
      <SelectTrigger className="mt-1 w-full border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 dark:bg-gray-700 dark:text-gray-200">
        <SelectValue placeholder={placeholder || "Select..."} />
      </SelectTrigger>
      <SelectContent>
        {options.map((opt) => (
          <SelectItem key={opt.value} value={opt.value}>
            {opt.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>
)

const EditableSectionCard: React.FC<{
  title: string
  icon?: React.ElementType
  children: React.ReactNode
  actionButtonLabel?: string
  onAction?: () => void
}> = ({ title, icon: Icon, children, actionButtonLabel, onAction }) => (
  <Card className="shadow-md dark:bg-gray-800">
    <CardHeader>
      <div className="flex justify-between items-center">
        <CardTitle className="text-xl font-semibold text-teal-600 dark:text-teal-400 flex items-center">
          {Icon && <Icon className="mr-2 h-5 w-5" />} {title}
        </CardTitle>
        {actionButtonLabel && onAction && (
          <Button variant="outline" size="sm" onClick={onAction}>
            <PlusCircle className="mr-2 h-4 w-4" /> {actionButtonLabel}
          </Button>
        )}
      </div>
    </CardHeader>
    <CardContent className="space-y-4">{children}</CardContent>
  </Card>
)

const EditableItemCard: React.FC<{ title?: string; children: React.ReactNode; onDelete?: () => void }> = ({
  title,
  children,
  onDelete,
}) => (
  <div className="p-4 border rounded-md dark:border-gray-600 bg-gray-50 dark:bg-gray-700/30 relative">
    {title && <h4 className="font-medium text-gray-800 dark:text-gray-100 mb-2">{title}</h4>}
    <div className="space-y-3">{children}</div>
    {onDelete && (
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
        onClick={onDelete}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    )}
  </div>
)

interface DetailedResumeDisplayProps {
  initialData: ParsedResumeData
  onSave: (updatedData: ParsedResumeData) => void
}
const DetailedResumeDisplay: React.FC<DetailedResumeDisplayProps> = ({ initialData, onSave }) => {
  const [editableData, setEditableData] = useState<ParsedResumeData>(initialData)

  useEffect(() => {
    setEditableData(initialData)
  }, [initialData])

  const handlePersonalInfoChange = (field: keyof PersonalInformation, value: string) => {
    setEditableData((prev) => ({ ...prev, personalInformation: { ...prev.personalInformation, [field]: value } }))
  }

  const handleListItemChange = <
    K extends keyof Omit<ParsedResumeData, "personalInformation">,
    T extends ParsedResumeData[K][number],
  >(
    section: K,
    itemId: string,
    field: keyof T,
    value: string | string[], // Allow string array for technologies
  ) => {
    setEditableData((prev) => {
      const list = prev[section] as T[] | undefined
      if (!list) return prev
      return { ...prev, [section]: list.map((item) => (item.id === itemId ? { ...item, [field]: value } : item)) }
    })
  }

  type ListSections = Exclude<keyof ParsedResumeData, "personalInformation">

  const handleAddItem = (section: ListSections) => {
    setEditableData((prev) => {
      const currentList = (prev[section] as any[]) || []
      let newItem: any
      switch (section) {
        case "workExperience":
          newItem = createEmptyWorkExperienceEntry()
          break
        case "education":
          newItem = createEmptyEducationEntry()
          break
        case "skills":
          newItem = createEmptySkillEntry()
          break
        case "languages":
          newItem = createEmptyLanguageEntry()
          break
        case "certifications":
          newItem = createEmptyCertificationEntry()
          break
        case "projects":
          newItem = createEmptyProjectEntry()
          break
        case "interests":
          newItem = createEmptyInterestEntry()
          break
        case "references":
          newItem = createEmptyReferenceEntry()
          break
        default:
          return prev
      }
      return { ...prev, [section]: [...currentList, newItem] }
    })
  }

  const handleDeleteItem = (section: ListSections, itemId: string) => {
    setEditableData((prev) => {
      const list = prev[section] as Array<{ id: string }> | undefined
      if (!list) return prev
      return { ...prev, [section]: list.filter((item) => item.id !== itemId) }
    })
  }

  const handleDownloadHtml = async () => {
    const data = editableData
    const resumeFileName = `${(data.personalInformation.name || "resume").replace(/\s+/g, "_")}.html`

    let htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${data.personalInformation.name || "Resume"}</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 20px; padding: 0; line-height: 1.6; color: #333; background-color: #f9f9f9; }
    .resume-card { max-width: 800px; margin: auto; padding: 25px; border: 1px solid #ddd; border-radius: 8px; box-shadow: 0 2px 5px rgba(0,0,0,0.1); background-color: #fff; }
    h1, h2, h3 { color: #2c3e50; }
    h1 { text-align: center; border-bottom: 2px solid #3498db; padding-bottom: 10px; margin-bottom:15px; font-size: 2.2em; }
    h2 { border-bottom: 1px solid #eee; padding-bottom: 6px; margin-top: 30px; margin-bottom: 12px; font-size: 1.6em; }
    .section { margin-bottom: 25px; }
    .section p, .section li { margin-bottom: 6px; font-size: 1em; }
    strong { color: #3498db; }
    ul { padding-left: 20px; list-style-type: disc; }
    .personal-info-header { text-align: center; margin-bottom: 20px;}
    .personal-info-header p { margin: 4px 0; font-size: 0.95em; }
    .item { border: 1px solid #f0f0f0; padding: 18px; border-radius: 6px; margin-bottom:12px; background-color: #fdfdfd;}
    .item h3 { margin-top:0; font-size: 1.2em; color: #3498db; margin-bottom: 6px;}
    .item-meta { font-size: 0.9em; color: #7f8c8d; margin-bottom: 10px; }
    .skills-list span { background-color: #eaf2f8; color: #3498db; padding: 5px 12px; border-radius: 15px; margin: 4px; display: inline-block; font-size: 0.95em; }
    .tech-list span { background-color: #e8f6f3; color: #1abc9c; padding: 3px 8px; border-radius: 4px; margin: 3px; display: inline-block; font-size: 0.85em; }
    a { color: #2980b9; text-decoration: none; } a:hover { text-decoration: underline; }
  </style>
</head>
<body>
  <div class="resume-card">
`

    const pi = data.personalInformation
    htmlContent += `<h1>${pi.name || `${pi.firstName} ${pi.lastName}`}</h1>`
    htmlContent += `<div class="personal-info-header">`
    if (pi.professionalTitle) htmlContent += `<p><strong>${pi.professionalTitle}</strong></p>`
    if (pi.email) htmlContent += `<p><a href="mailto:${pi.email}">${pi.email}</a></p>`
    if (pi.phone) htmlContent += `<p>${pi.phone}</p>`
    if (pi.linkedin)
      htmlContent += `<p><a href="${!pi.linkedin.startsWith("http") ? `https://${pi.linkedin}` : pi.linkedin}" target="_blank" rel="noopener noreferrer">${pi.linkedin}</a></p>`
    if (pi.github)
      htmlContent += `<p><a href="${!pi.github.startsWith("http") ? `https://${pi.github}` : pi.github}" target="_blank" rel="noopener noreferrer">${pi.github}</a></p>`
    if (pi.website)
      htmlContent += `<p><a href="${!pi.website.startsWith("http") ? `https://${pi.website}` : pi.website}" target="_blank" rel="noopener noreferrer">${pi.website}</a></p>`
    if (pi.address) htmlContent += `<p>${pi.address}</p>`
    htmlContent += `</div>`

    if (pi.summary)
      htmlContent += `<h2>Summary</h2><div class="section"><p>${pi.summary.replace(/\n/g, "<br>")}</p></div>`

    const sections: { title: string; key: ListSections; renderer: (item: any) => string }[] = [
      {
        title: "Work Experience",
        key: "workExperience",
        renderer: (exp: WorkExperienceEntry) =>
          `<div class="item"><h3>${exp.jobTitle} - ${exp.company}</h3><p class="item-meta">${exp.startDate} - ${exp.endDate || "Present"} | ${exp.location}${exp.industry ? ` | ${exp.industry}` : ""}</p><p>${exp.description.replace(/\n/g, "<br>")}</p></div>`,
      },
      {
        title: "Education",
        key: "education",
        renderer: (edu: EducationEntry) =>
          `<div class="item"><h3>${edu.degree} - ${edu.institution}</h3><p class="item-meta">${edu.startDate} - ${edu.graduationDate || "Present"} | ${edu.location}${edu.gpa ? ` | GPA: ${edu.gpa}` : ""}</p><p>${edu.details.replace(/\n/g, "<br>")}</p></div>`,
      },
      {
        title: "Projects",
        key: "projects",
        renderer: (proj: ProjectEntry) =>
          `<div class="item"><h3>${proj.name}</h3>${proj.url ? `<p class="item-meta"><a href="${proj.url}" target="_blank" rel="noopener noreferrer">${proj.url}</a></p>` : ""}<p>${proj.description?.replace(/\n/g, "<br>") || ""}</p>${proj.technologies && proj.technologies.length > 0 ? `<p class="tech-list">Technologies: ${proj.technologies.map((t) => `<span>${t}</span>`).join("")}</p>` : ""}</div>`,
      },
    ]

    sections.forEach((sec) => {
      const items = data[sec.key] as any[]
      if (items && items.length > 0) {
        htmlContent += `<h2>${sec.title}</h2><div class="section">${items.map(sec.renderer).join("")}</div>`
      }
    })

    if (data.skills && data.skills.length > 0)
      htmlContent += `<h2>Skills</h2><div class="section skills-list"><p>${data.skills.map((s) => `<span>${s.name}${s.type ? ` (${s.type})` : ""}</span>`).join("")}</p></div>`
    if (data.certifications && data.certifications.length > 0)
      htmlContent += `<h2>Certifications</h2><div class="section"><ul>${data.certifications.map((c) => `<li><strong>${c.name}</strong>${c.issuingOrganization ? ` from ${c.issuingOrganization}` : ""}${c.issueDate ? ` (${c.issueDate})` : ""}</li>`).join("")}</ul></div>`
    if (data.languages && data.languages.length > 0)
      htmlContent += `<h2>Languages</h2><div class="section"><ul>${data.languages.map((l) => `<li>${l.language}${l.proficiency ? ` (${l.proficiency})` : ""}</li>`).join("")}</ul></div>`
    if (data.interests && data.interests.length > 0)
      htmlContent += `<h2>Interests</h2><div class="section"><p>${data.interests.map((i) => i.name).join(", ")}</p></div>`
    if (data.references && data.references.length > 0)
      htmlContent += `<h2>References</h2><div class="section">${data.references.map((r) => `<div class="item"><p><strong>${r.name}</strong></p>${r.relationship ? `<p><em>${r.relationship}</em></p>` : ""}${r.contact ? `<p>${r.contact}</p>` : ""}</div>`).join("")}</div>`

    htmlContent += `
  </div>
</body>
</html>`

    try {
      const blob = new Blob([htmlContent], { type: "text/html" })
      const link = document.createElement("a")
      link.href = URL.createObjectURL(blob)
      link.download = resumeFileName
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(link.href)
      toast.success("Resume downloaded as HTML!")
    } catch (error) {
      console.error("Error generating HTML:", error)
      toast.error("Failed to generate HTML. Check console for details.")
    }
  }

  const pi = editableData.personalInformation

  return (
    <div className="space-y-8 mt-8">
      <EditableSectionCard title="Personal Information" icon={User}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
          <EditableField
            label="Full Name"
            id="pi-name"
            value={pi.name}
            onChange={(v) => handlePersonalInfoChange("name", v)}
          />
          <EditableField
            label="Professional Title"
            id="pi-protitle"
            value={pi.professionalTitle}
            onChange={(v) => handlePersonalInfoChange("professionalTitle", v)}
          />
          <EditableField
            label="ID Number"
            id="pi-id"
            value={pi.idNumber}
            onChange={(v) => handlePersonalInfoChange("idNumber", v)}
          />
          <EditableField
            label="Date of Birth"
            id="pi-dob"
            value={pi.dateOfBirth}
            type="date"
            onChange={(v) => handlePersonalInfoChange("dateOfBirth", v)}
          />
          <EditableField
            label="Nationality"
            id="pi-nationality"
            value={pi.nationality}
            onChange={(v) => handlePersonalInfoChange("nationality", v)}
          />
          <EditableRadioGroup
            label="Gender"
            idPrefix="pi-gender"
            value={pi.gender}
            options={[
              { label: "Male", value: "male" },
              { label: "Female", value: "female" },
              { label: "Other", value: "other" },
            ]}
            onChange={(v) => handlePersonalInfoChange("gender", v)}
          />
          <EditableRadioGroup
            label="Ethnic Group"
            idPrefix="pi-ethnic"
            value={pi.ethnicGroup}
            options={[
              { label: "African", value: "african" },
              { label: "Coloured", value: "coloured" },
              { label: "Indian", value: "indian" },
              { label: "White", value: "white" },
              { label: "Other", value: "other" },
            ]}
            onChange={(v) => handlePersonalInfoChange("ethnicGroup", v)}
          />
          <EditableRadioGroup
            label="Disability Status"
            idPrefix="pi-disability"
            value={pi.disabilityStatus}
            options={[
              { label: "Yes", value: "yes" },
              { label: "No", value: "no" },
            ]}
            onChange={(v) => handlePersonalInfoChange("disabilityStatus", v)}
          />
          <EditableRadioGroup
            label="Marital Status"
            idPrefix="pi-marital"
            value={pi.maritalStatus}
            options={[
              { label: "Single", value: "single" },
              { label: "Married", value: "married" },
              { label: "Divorced", value: "divorced" },
              { label: "Widowed", value: "widowed" },
            ]}
            onChange={(v) => handlePersonalInfoChange("maritalStatus", v)}
          />
          <EditableField
            label="Contact Number (Mobile)"
            id="pi-phone"
            value={pi.phone}
            onChange={(v) => handlePersonalInfoChange("phone", v)}
          />
          <EditableField
            label="Email Address"
            id="pi-email"
            value={pi.email}
            type="email"
            onChange={(v) => handlePersonalInfoChange("email", v)}
          />
          <EditableField
            label="Home Address"
            id="pi-address"
            value={pi.address}
            isTextarea
            fullWidth
            onChange={(v) => handlePersonalInfoChange("address", v)}
          />
          <EditableField
            label="Postal Address"
            id="pi-postaladdress"
            value={pi.postalAddress}
            isTextarea
            fullWidth
            onChange={(v) => handlePersonalInfoChange("postalAddress", v)}
          />
          <EditableSelectField
            label="Province"
            id="pi-province"
            value={pi.province}
            options={[
              { label: "Gauteng", value: "GP" },
              { label: "Western Cape", value: "WC" },
              { label: "KwaZulu-Natal", value: "KZN" },
              { label: "Eastern Cape", value: "EC" },
              { label: "Free State", value: "FS" },
              { label: "Limpopo", value: "LP" },
              { label: "Mpumalanga", value: "MP" },
              { label: "North West", value: "NW" },
              { label: "Northern Cape", value: "NC" },
            ]}
            onChange={(v) => handlePersonalInfoChange("province", v)}
          />
          <EditableField
            label="Suburb/Town"
            id="pi-suburb"
            value={pi.suburbTown}
            onChange={(v) => handlePersonalInfoChange("suburbTown", v)}
          />
          <EditableField
            label="Postal Code"
            id="pi-postalcode"
            value={pi.postalCode}
            onChange={(v) => handlePersonalInfoChange("postalCode", v)}
          />
          <EditableField
            label="Alternative Contact"
            id="pi-altcontact"
            value={pi.alternativeContact}
            fullWidth
            onChange={(v) => handlePersonalInfoChange("alternativeContact", v)}
          />
          <EditableRadioGroup
            label="Reliable Transport"
            idPrefix="pi-transport"
            value={pi.reliableTransport}
            options={[
              { label: "Yes", value: "yes" },
              { label: "No", value: "no" },
            ]}
            onChange={(v) => handlePersonalInfoChange("reliableTransport", v)}
          />
          <EditableSelectField
            label="Driver's License"
            id="pi-license"
            value={pi.driversLicense}
            options={[
              { label: "None", value: "none" },
              { label: "Code A", value: "A" },
              { label: "Code B", value: "B" },
              { label: "Code EB", value: "EB" },
              { label: "Code C1", value: "C1" },
              { label: "Code C", value: "C" },
              { label: "Code EC1", value: "EC1" },
              { label: "Code EC", value: "EC" },
            ]}
            onChange={(v) => handlePersonalInfoChange("driversLicense", v)}
          />
          <EditableRadioGroup
            label="Criminal Record"
            idPrefix="pi-criminal"
            value={pi.criminalRecord}
            options={[
              { label: "Yes", value: "yes" },
              { label: "No", value: "no" },
            ]}
            onChange={(v) => handlePersonalInfoChange("criminalRecord", v)}
          />
          <EditableSelectField
            label="Notice Period"
            id="pi-notice"
            value={pi.noticePeriod}
            options={[
              { label: "Immediately", value: "immediate" },
              { label: "1 Week", value: "1week" },
              { label: "2 Weeks", value: "2weeks" },
              { label: "1 Month", value: "1month" },
              { label: "Other", value: "other" },
            ]}
            onChange={(v) => handlePersonalInfoChange("noticePeriod", v)}
          />
          <EditableRadioGroup
            label="South African Citizen"
            idPrefix="pi-citizen"
            value={pi.southAfricanCitizen}
            options={[
              { label: "Yes", value: "yes" },
              { label: "No", value: "no" },
            ]}
            onChange={(v) => handlePersonalInfoChange("southAfricanCitizen", v)}
          />
        </div>
      </EditableSectionCard>

      <EditableSectionCard title="Summary" icon={FileSignature}>
        <Textarea
          value={pi.summary}
          placeholder="Write a brief professional summary..."
          onChange={(e) => handlePersonalInfoChange("summary", e.target.value)}
          className="mt-1 block w-full border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 dark:bg-gray-700 dark:text-gray-200"
          rows={4}
        />
      </EditableSectionCard>

      <EditableSectionCard
        title="Work Experience"
        icon={Briefcase}
        actionButtonLabel="Add Work Experience"
        onAction={() => handleAddItem("workExperience")}
      >
        {editableData.workExperience.length > 0 ? (
          editableData.workExperience.map((exp) => (
            <EditableItemCard
              key={exp.id}
              title={`${exp.jobTitle || "New Job"} at ${exp.company || "New Company"}`}
              onDelete={() => handleDeleteItem("workExperience", exp.id)}
            >
              <EditableField
                label="Job Title"
                id={`we-${exp.id}-title`}
                value={exp.jobTitle}
                onChange={(v) => handleListItemChange("workExperience", exp.id, "jobTitle", v)}
              />
              <EditableField
                label="Company"
                id={`we-${exp.id}-company`}
                value={exp.company}
                onChange={(v) => handleListItemChange("workExperience", exp.id, "company", v)}
              />
              <EditableField
                label="Location"
                id={`we-${exp.id}-location`}
                value={exp.location}
                onChange={(v) => handleListItemChange("workExperience", exp.id, "location", v)}
              />
              <div className="grid grid-cols-2 gap-4">
                <EditableField
                  label="Start Date"
                  id={`we-${exp.id}-start`}
                  value={exp.startDate}
                  type="date"
                  onChange={(v) => handleListItemChange("workExperience", exp.id, "startDate", v)}
                />
                <EditableField
                  label="End Date"
                  id={`we-${exp.id}-end`}
                  value={exp.endDate}
                  type="date"
                  onChange={(v) => handleListItemChange("workExperience", exp.id, "endDate", v)}
                />
              </div>
              <EditableField
                label="Industry"
                id={`we-${exp.id}-industry`}
                value={exp.industry}
                onChange={(v) => handleListItemChange("workExperience", exp.id, "industry", v)}
              />
              <EditableField
                label="Description"
                id={`we-${exp.id}-desc`}
                value={exp.description}
                isTextarea
                onChange={(v) => handleListItemChange("workExperience", exp.id, "description", v)}
              />
            </EditableItemCard>
          ))
        ) : (
          <p className="text-sm text-gray-500 dark:text-gray-400">
            No work experience entries. Click 'Add' to include an entry.
          </p>
        )}
      </EditableSectionCard>

      <EditableSectionCard
        title="Education"
        icon={GraduationCap}
        actionButtonLabel="Add Education"
        onAction={() => handleAddItem("education")}
      >
        {editableData.education.length > 0 ? (
          editableData.education.map((edu) => (
            <EditableItemCard
              key={edu.id}
              title={`${edu.degree || "New Degree"} from ${edu.institution || "New Institution"}`}
              onDelete={() => handleDeleteItem("education", edu.id)}
            >
              <EditableField
                label="Degree/Major"
                id={`edu-${edu.id}-degree`}
                value={edu.degree}
                onChange={(v) => handleListItemChange("education", edu.id, "degree", v)}
              />
              <EditableField
                label="Institution"
                id={`edu-${edu.id}-institution`}
                value={edu.institution}
                onChange={(v) => handleListItemChange("education", edu.id, "institution", v)}
              />
              <EditableField
                label="Location"
                id={`edu-${edu.id}-location`}
                value={edu.location}
                onChange={(v) => handleListItemChange("education", edu.id, "location", v)}
              />
              <div className="grid grid-cols-2 gap-4">
                <EditableField
                  label="Start Date"
                  id={`edu-${edu.id}-start`}
                  value={edu.startDate}
                  type="date"
                  onChange={(v) => handleListItemChange("education", edu.id, "startDate", v)}
                />
                <EditableField
                  label="Graduation Date"
                  id={`edu-${edu.id}-graddate`}
                  value={edu.graduationDate}
                  type="date"
                  onChange={(v) => handleListItemChange("education", edu.id, "graduationDate", v)}
                />
              </div>
              <EditableField
                label="GPA"
                id={`edu-${edu.id}-gpa`}
                value={edu.gpa}
                onChange={(v) => handleListItemChange("education", edu.id, "gpa", v)}
              />
              <EditableField
                label="Details/Courses"
                id={`edu-${edu.id}-details`}
                value={edu.details}
                isTextarea
                onChange={(v) => handleListItemChange("education", edu.id, "details", v)}
              />
            </EditableItemCard>
          ))
        ) : (
          <p className="text-sm text-gray-500 dark:text-gray-400">
            No education entries. Click 'Add' to include an entry.
          </p>
        )}
      </EditableSectionCard>

      <EditableSectionCard
        title="Skills & Expertise"
        icon={Lightbulb}
        actionButtonLabel="Add Skill"
        onAction={() => handleAddItem("skills")}
      >
        {editableData.skills.length > 0 ? (
          editableData.skills.map((skill) => (
            <EditableItemCard
              key={skill.id}
              title={skill.name || "New Skill"}
              onDelete={() => handleDeleteItem("skills", skill.id)}
            >
              <EditableField
                label="Skill Name"
                id={`skill-${skill.id}-name`}
                value={skill.name}
                onChange={(v) => handleListItemChange("skills", skill.id, "name", v)}
              />
              <EditableField
                label="Skill Type (e.g., Programming Language, Soft Skill)"
                id={`skill-${skill.id}-type`}
                value={skill.type}
                onChange={(v) => handleListItemChange("skills", skill.id, "type", v)}
              />
            </EditableItemCard>
          ))
        ) : (
          <p className="text-sm text-gray-500 dark:text-gray-400">No skills listed. Click 'Add' to include skills.</p>
        )}
      </EditableSectionCard>

      <EditableSectionCard
        title="Projects"
        icon={ClipboardList}
        actionButtonLabel="Add Project"
        onAction={() => handleAddItem("projects")}
      >
        {editableData.projects.length > 0 ? (
          editableData.projects.map((proj) => (
            <EditableItemCard
              key={proj.id}
              title={proj.name || "New Project"}
              onDelete={() => handleDeleteItem("projects", proj.id)}
            >
              <EditableField
                label="Project Name"
                id={`proj-${proj.id}-name`}
                value={proj.name}
                onChange={(v) => handleListItemChange("projects", proj.id, "name", v)}
              />
              <EditableField
                label="Project URL (Optional)"
                id={`proj-${proj.id}-url`}
                value={proj.url}
                onChange={(v) => handleListItemChange("projects", proj.id, "url", v)}
              />
              <EditableField
                label="Description"
                id={`proj-${proj.id}-desc`}
                value={proj.description}
                isTextarea
                onChange={(v) => handleListItemChange("projects", proj.id, "description", v)}
              />
              <EditableField
                label="Technologies (comma-separated)"
                id={`proj-${proj.id}-tech`}
                value={(proj.technologies || []).join(", ")}
                onChange={(v) =>
                  handleListItemChange(
                    "projects",
                    proj.id,
                    "technologies",
                    v.split(",").map((s) => s.trim()),
                  )
                }
                placeholder="e.g., React, Node.js, Python"
              />
            </EditableItemCard>
          ))
        ) : (
          <p className="text-sm text-gray-500 dark:text-gray-400">
            No projects listed. Click 'Add' to include a project.
          </p>
        )}
      </EditableSectionCard>

      <EditableSectionCard
        title="Qualifications & Certifications"
        icon={Award}
        actionButtonLabel="Add Certification"
        onAction={() => handleAddItem("certifications")}
      >
        {editableData.certifications.length > 0 ? (
          editableData.certifications.map((cert) => (
            <EditableItemCard
              key={cert.id}
              title={cert.name || "New Certification"}
              onDelete={() => handleDeleteItem("certifications", cert.id)}
            >
              <EditableField
                label="Certification Name"
                id={`cert-${cert.id}-name`}
                value={cert.name}
                onChange={(v) => handleListItemChange("certifications", cert.id, "name", v)}
              />
              <EditableField
                label="Issuing Organization"
                id={`cert-${cert.id}-org`}
                value={cert.issuingOrganization}
                onChange={(v) => handleListItemChange("certifications", cert.id, "issuingOrganization", v)}
              />
              <EditableField
                label="Issue Date"
                id={`cert-${cert.id}-date`}
                value={cert.issueDate}
                type="date"
                onChange={(v) => handleListItemChange("certifications", cert.id, "issueDate", v)}
              />
            </EditableItemCard>
          ))
        ) : (
          <p className="text-sm text-gray-500 dark:text-gray-400">
            No certifications listed. Click 'Add' to include one.
          </p>
        )}
      </EditableSectionCard>

      <EditableSectionCard
        title="Languages"
        icon={LanguagesIcon}
        actionButtonLabel="Add Language"
        onAction={() => handleAddItem("languages")}
      >
        {editableData.languages.length > 0 ? (
          editableData.languages.map((lang) => (
            <EditableItemCard
              key={lang.id}
              title={lang.language || "New Language"}
              onDelete={() => handleDeleteItem("languages", lang.id)}
            >
              <EditableField
                label="Language"
                id={`lang-${lang.id}-lang`}
                value={lang.language}
                onChange={(v) => handleListItemChange("languages", lang.id, "language", v)}
              />
              <EditableField
                label="Proficiency (e.g., Native, Fluent, Conversational)"
                id={`lang-${lang.id}-prof`}
                value={lang.proficiency}
                onChange={(v) => handleListItemChange("languages", lang.id, "proficiency", v)}
              />
            </EditableItemCard>
          ))
        ) : (
          <p className="text-sm text-gray-500 dark:text-gray-400">No languages listed. Click 'Add' to include one.</p>
        )}
      </EditableSectionCard>

      <EditableSectionCard
        title="Interests & Hobbies"
        icon={Heart}
        actionButtonLabel="Add Interest"
        onAction={() => handleAddItem("interests")}
      >
        {editableData.interests.length > 0 ? (
          editableData.interests.map((interest) => (
            <EditableItemCard
              key={interest.id}
              title={interest.name || "New Interest"}
              onDelete={() => handleDeleteItem("interests", interest.id)}
            >
              <EditableField
                label="Interest/Hobby"
                id={`interest-${interest.id}-name`}
                value={interest.name}
                onChange={(v) => handleListItemChange("interests", interest.id, "name", v)}
              />
            </EditableItemCard>
          ))
        ) : (
          <p className="text-sm text-gray-500 dark:text-gray-400">No interests listed. Click 'Add' to include one.</p>
        )}
      </EditableSectionCard>

      <EditableSectionCard
        title="References"
        icon={Users}
        actionButtonLabel="Add Reference"
        onAction={() => handleAddItem("references")}
      >
        {editableData.references.length > 0 ? (
          editableData.references.map((ref) => (
            <EditableItemCard
              key={ref.id}
              title={ref.name || "New Reference"}
              onDelete={() => handleDeleteItem("references", ref.id)}
            >
              <EditableField
                label="Reference Name"
                id={`ref-${ref.id}-name`}
                value={ref.name}
                onChange={(v) => handleListItemChange("references", ref.id, "name", v)}
              />
              <EditableField
                label="Relationship"
                id={`ref-${ref.id}-relationship`}
                value={ref.relationship}
                onChange={(v) => handleListItemChange("references", ref.id, "relationship", v)}
              />
              <EditableField
                label="Contact Information (Phone/Email)"
                id={`ref-${ref.id}-contact`}
                value={ref.contact}
                onChange={(v) => handleListItemChange("references", ref.id, "contact", v)}
              />
            </EditableItemCard>
          ))
        ) : (
          <p className="text-sm text-gray-500 dark:text-gray-400">
            No references listed. (Often "Available upon request")
          </p>
        )}
      </EditableSectionCard>

      <div className="flex justify-end items-center gap-4 mt-8">
        <Button
          size="lg"
          variant="outline"
          className="text-teal-600 border-teal-600 hover:bg-teal-50 dark:text-teal-400 dark:border-teal-400 dark:hover:bg-teal-900/30"
          onClick={handleDownloadHtml} // Changed from handleDownloadPdf
        >
          <Download className="mr-2 h-4 w-4" /> Download HTML {/* Changed text */}
        </Button>
        <Button size="lg" className="bg-teal-600 hover:bg-teal-700 text-white" onClick={() => onSave(editableData)}>
          <Save className="mr-2 h-4 w-4" /> Save Resume Data
        </Button>
      </div>
    </div>
  )
}

function App() {
  const [parsedResumeData, setParsedResumeData] = useState<ParsedResumeData>(createEmptyParsedResumeData())
  const [isPreviewVisible, setIsPreviewVisible] = useState(false)
  const [isParsing, setIsParsing] = useState(false)
  const [parsingError, setParsingError] = useState<string | null>(null)

  const handleDataParsed = (data: ParsedResumeData | null) => {
    setParsedResumeData(data || createEmptyParsedResumeData())
    setIsPreviewVisible(!!data)
    setIsParsing(false)
    setParsingError(null)
    if (data) {
      toast.success("Resume data parsed and populated in the editor below.")
    }
  }

  const handleParsingStart = () => {
    setIsParsing(true)
    setIsPreviewVisible(false)
    setParsingError(null)
  }

  const handleParsingError = (errorMsg: string) => {
    setIsParsing(false)
    setIsPreviewVisible(false)
    setParsingError(errorMsg)
  }

  const handleSaveResume = (updatedData: ParsedResumeData) => {
    console.log("Saving updated resume data:", updatedData)
    setParsedResumeData(updatedData)
    toast.success("Resume data updated and logged to console!")
  }

  return (
    <>
      <Toaster richColors position="top-right" />
      <div className="min-h-screen bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-slate-100 p-4 md:p-8">
        <header className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-teal-600 dark:text-teal-400">
            AI Resume Analyzer & Editor
          </h1>
          <p className="text-md md:text-lg text-slate-600 dark:text-slate-400 mt-2">
            Upload your CV to extract information, then edit, save, and download.
          </p>
        </header>

        <div className="flex flex-col lg:flex-row gap-6 md:gap-8">
          <div className="w-full lg:w-1/3 xl:w-2/5">
            <CVUploadParser
              onDataParsed={handleDataParsed}
              onParsingStart={handleParsingStart}
              onParsingError={handleParsingError}
            />
          </div>
          <div className="w-full lg:w-2/3 xl:w-3/5">
            {isParsing ? (
              <Card className="sticky top-8 h-[calc(100vh-4rem)] overflow-y-auto shadow-lg dark:bg-gray-800 flex flex-col items-center justify-center">
                <Loader2 className="h-12 w-12 text-teal-500 dark:text-teal-400 animate-spin mb-4" />
                <p className="text-lg text-gray-700 dark:text-gray-300">Analyzing Resume...</p>
              </Card>
            ) : parsingError && !isPreviewVisible ? (
              <Card className="sticky top-8 h-[calc(100vh-4rem)] overflow-y-auto shadow-lg dark:bg-gray-800 border-red-500 border-2">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-red-600 dark:text-red-400 flex items-center gap-2">
                    <AlertTriangle /> Parsing Failed
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center h-3/4">
                  <FileText size={48} className="text-red-400 dark:text-red-500 mb-4" />
                  <p className="text-red-500 dark:text-red-400 text-center px-4">{parsingError}</p>
                </CardContent>
              </Card>
            ) : isPreviewVisible &&
              (parsedResumeData.personalInformation.name || parsedResumeData.personalInformation.firstName) ? (
              <ResumePreviewCard data={parsedResumeData} isVisible={true} />
            ) : (
              <Card className="sticky top-8 h-[calc(100vh-4rem)] overflow-y-auto shadow-lg dark:bg-gray-800 hidden lg:flex lg:flex-col lg:items-center lg:justify-center">
                <CardHeader className="text-center">
                  <CardTitle className="text-xl font-semibold text-gray-500 dark:text-gray-400">
                    Resume Preview
                  </CardTitle>
                  <CardDescription className="text-gray-400 dark:text-gray-500">
                    Upload a resume to see extracted details.
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center flex-grow">
                  <FileText size={48} className="text-gray-400 dark:text-gray-500 mb-4" />
                  <p className="text-gray-500 dark:text-gray-400">Awaiting resume upload...</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        <div className="mt-8 w-full">
          <DetailedResumeDisplay initialData={parsedResumeData} onSave={handleSaveResume} />
        </div>

        <footer className="text-center mt-12 py-4 border-t dark:border-gray-700">
          <p className="text-sm text-gray-500 dark:text-gray-400">Resume Analyzer & Editor</p>
        </footer>
      </div>
    </>
  )
}

export default App
