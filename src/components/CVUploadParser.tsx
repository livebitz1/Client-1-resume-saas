"use client" // This makes the entire file a Client Component module.

import type React from "react"
import { useActionState, useRef, useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { Upload, FileText, Loader2, CheckCircle, Sparkles, AlertTriangle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"

// --- Type Definitions (originally from app/actions/resume-types.ts) ---
export interface ResumeAnalysisState {
  message?: string
  data?: any // This will hold the final data from OpenAI
  error?: string
  rawEdenAIResponse?: any // For debugging Eden AI's direct output
  rawOpenAIResponse?: any // For debugging OpenAI's direct output
}

export const initialState: ResumeAnalysisState = {
  message: undefined,
  data: undefined,
  error: undefined,
  rawEdenAIResponse: undefined,
  rawOpenAIResponse: undefined,
}

// --- IMPORTANT: Server Action Placeholder ---
// The actual Server Action 'analyzeAndEnhanceResumeAction' MUST be in a separate file
// (e.g., 'app/actions.ts') with "use server"; at the top.
// You would then import it here:
// import { analyzeAndEnhanceResumeAction } from "./actions"; // Assuming actions.ts is in app/
// For now, we'll use a placeholder. Replace with actual import.

// Placeholder function - replace with import from your 'actions.ts'
async function analyzeAndEnhanceResumeActionPlaceholder(
  prevState: ResumeAnalysisState,
  formData: FormData,
): Promise<ResumeAnalysisState> {
  console.warn("Using placeholder Server Action. Implement and import the real one from 'app/actions.ts'.")
  // Simulate a delay and error for demonstration if not replaced
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return {
    ...initialState,
    error: "Placeholder Action: Real Server Action not implemented or imported. See instructions.",
  }
}

// --- CVUploadParser Component (originally from components/cv-upload-parser.tsx) ---
interface CVUploadParserProps {
  onDataProcessed: (data: any) => void
  // This prop is to use the actual server action.
  // It's passed down because server actions cannot be defined in 'use client' files.
  actualFormAction: (prevState: ResumeAnalysisState, formData: FormData) => Promise<ResumeAnalysisState>
}

const CVUploadParser: React.FC<CVUploadParserProps> = ({ onDataProcessed, actualFormAction }) => {
  const [state, formAction, isPending] = useActionState(actualFormAction, initialState)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null)
  const [selectedFileSize, setSelectedFileSize] = useState<string | null>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const allowedTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ]
      if (!allowedTypes.includes(file.type)) {
        toast.error("Please upload a PDF or Word document.")
        if (fileInputRef.current) fileInputRef.current.value = ""
        setSelectedFileName(null)
        setSelectedFileSize(null)
        return
      }
      if (file.size > 5 * 1024 * 1024) {
        // 5MB limit
        toast.error("File size must be less than 5MB.")
        if (fileInputRef.current) fileInputRef.current.value = ""
        setSelectedFileName(null)
        setSelectedFileSize(null)
        return
      }
      setSelectedFileName(file.name)
      setSelectedFileSize((file.size / 1024 / 1024).toFixed(2) + " MB")
    } else {
      setSelectedFileName(null)
      setSelectedFileSize(null)
    }
  }

  useEffect(() => {
    if (!isPending) {
      if (state.error) {
        toast.error(state.error)
      }
      if (state.message && state.data) {
        toast.success(state.message)
        onDataProcessed(state.data)
      }
    }
  }, [state, isPending, onDataProcessed])

  const handleSubmitClick = () => {
    // Optional: Reset display immediately on click
  }

  return (
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
        <form action={formAction} className="space-y-4">
          {!selectedFileName && !isPending && !state.data ? (
            <div className="border-2 border-dashed border-teal-300 rounded-lg p-8 text-center bg-white/50">
              <Upload className="h-12 w-12 text-teal-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Upload Your Resume/CV</h3>
              <p className="text-sm text-gray-500 mb-6">
                Our AI will extract key information and then generate a professional summary, enhanced work experience,
                and key skills.
              </p>
              <Input
                type="file"
                name="resumeFile"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                disabled={isPending}
                className="hidden"
                id="cv-upload-input"
                ref={fileInputRef}
                required
              />
              <label htmlFor="cv-upload-input">
                <Button
                  type="button"
                  size="lg"
                  disabled={isPending}
                  className="cursor-pointer bg-teal-600 hover:bg-teal-700 text-white"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="mr-2 h-4 w-4" />
                  Choose Resume/CV File
                </Button>
              </label>
            </div>
          ) : (
            <div className="bg-white rounded-lg p-6 border border-teal-200">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  {state.data && !isPending ? (
                    <CheckCircle className="h-8 w-8 text-green-500" />
                  ) : isPending ? (
                    <Loader2 className="h-8 w-8 text-teal-500 animate-spin" />
                  ) : selectedFileName ? (
                    <FileText className="h-8 w-8 text-teal-500" />
                  ) : (
                    <Upload className="h-8 w-8 text-gray-400" />
                  )}
                  <div>
                    <p className="font-medium text-gray-900">{selectedFileName || "No file selected"}</p>
                    {selectedFileSize && <p className="text-sm text-gray-500">{selectedFileSize}</p>}
                  </div>
                </div>
                {!isPending && selectedFileName && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedFileName(null)
                      setSelectedFileSize(null)
                      if (fileInputRef.current) fileInputRef.current.value = ""
                    }}
                    className="text-gray-600"
                  >
                    Change File
                  </Button>
                )}
              </div>

              {isPending && (
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

              {selectedFileName && !isPending && !state.data && (
                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-teal-600 hover:bg-teal-700 text-white mt-4"
                  onClick={handleSubmitClick}
                >
                  <Sparkles className="mr-2 h-4 w-4" />
                  Analyze and Enhance Resume
                </Button>
              )}
            </div>
          )}

          <div className="text-xs text-gray-500 text-center mt-4">
            <p className="font-medium mb-1">Supported formats:</p>
            <p>PDF, DOC, DOCX (Maximum 5MB)</p>
          </div>

          {!isPending && state.error && (
            <Alert variant="destructive" className="mt-4">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Processing Error</AlertTitle>
              <AlertDescription>
                {state.error}
                {(state.rawEdenAIResponse || state.rawOpenAIResponse) && (
                  <details className="mt-2 text-xs">
                    <summary className="cursor-pointer">Show Raw Error Details</summary>
                    {state.rawEdenAIResponse && (
                      <pre className="mt-1 p-2 bg-gray-100 rounded overflow-x-auto max-h-40">
                        Eden AI Raw: {JSON.stringify(state.rawEdenAIResponse, null, 2)}
                      </pre>
                    )}
                    {state.rawOpenAIResponse && (
                      <pre className="mt-1 p-2 bg-gray-100 rounded overflow-x-auto max-h-40">
                        OpenAI Raw: {JSON.stringify(state.rawOpenAIResponse, null, 2)}
                      </pre>
                    )}
                  </details>
                )}
              </AlertDescription>
            </Alert>
          )}

          {!isPending && state.message && state.data && (
            <Alert variant="default" className="mt-4 bg-green-50 border-green-200">
              <CheckCircle className="h-4 w-4" />
              <AlertTitle className="text-green-700">Processing Complete!</AlertTitle>
              <AlertDescription>
                {state.message}
                <div className="mt-2 p-2 border rounded bg-white max-h-96 overflow-y-auto">
                  <h4 className="font-semibold mb-1">Enhanced Resume Data:</h4>
                  <pre className="text-xs whitespace-pre-wrap">{JSON.stringify(state.data, null, 2)}</pre>
                </div>
              </AlertDescription>
            </Alert>
          )}
        </form>
      </CardContent>
    </Card>
  )
}

// --- HomePage Component (originally from app/page.tsx) ---
export default function HomePage() {
  const [processedData, setProcessedData] = useState<any>(null)

  const handleDataProcessed = (data: any) => {
    console.log("Data processed and received in HomePage:", data)
    setProcessedData(data) // You can now use this state to display the data elsewhere on the page
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-sky-100 py-8 px-4 flex flex-col items-center">
      <header className="mb-12 text-center">
        <h1 className="text-5xl font-bold text-gray-800">AI Resume Analyzer</h1>
        <p className="text-xl text-gray-600 mt-2">Instantly extract key information from your CV</p>
      </header>

      {/* 
        IMPORTANT: Pass the actual Server Action here.
        You'll need to create 'app/actions.ts', put 'analyzeAndEnhanceResumeAction' there,
        mark it with 'use server', and then import it at the top of this file.
        For now, it uses a placeholder.
      */}
      <CVUploadParser
        onDataProcessed={handleDataProcessed}
        actualFormAction={analyzeAndEnhanceResumeActionPlaceholder} // Replace with imported actual action
      />

      {/* Optional: Display processedData if needed */}
      {/* {processedData && (
        <Card className="w-full max-w-2xl mt-8">
          <CardHeader>
            <CardTitle>Processed Resume Output</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="text-xs whitespace-pre-wrap bg-gray-50 p-4 rounded">
              {JSON.stringify(processedData, null, 2)}
            </pre>
          </CardContent>
        </Card>
      )} */}

      <footer className="mt-16 text-center text-sm text-gray-500">
        <p>&copy; {new Date().getFullYear()} CV Analyzer. Powered by Vercel and Supabase.</p>
      </footer>
    </div>
  )
}
