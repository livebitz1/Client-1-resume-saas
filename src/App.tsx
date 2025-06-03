import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect, lazy, Suspense } from "react";
import { SmartNavigation } from "./components/SmartNavigation";
import { Walkthrough } from "./components/Walkthrough";

// Lazy load all page components
const LandingPage = lazy(() => import("./pages/LandingPage"));
const Index = lazy(() => import("./pages/Index"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Jobs = lazy(() => import("./pages/Jobs"));
const JobDetails = lazy(() => import("./pages/JobDetails"));
const EmployerDashboard = lazy(() => import("./pages/EmployerDashboard"));
const PostJob = lazy(() => import("./pages/PostJob"));
const SubscriptionPlans = lazy(() => import("./pages/SubscriptionPlans"));
const ResumeUpload = lazy(() => import("./pages/ResumeUpload"));
const CoverLetterGenerator = lazy(() => import("./pages/CoverLetterGenerator"));
const TermsOfService = lazy(() => import("./pages/TermsOfService"));
const HelpCentre = lazy(() => import("./pages/HelpCentre"));
const Blog = lazy(() => import("./pages/Blog"));
const AuthPage = lazy(() => import("./pages/AuthPage"));
const CandidateDashboard = lazy(() => import("./pages/CandidateDashboard"));
const PaymentPage = lazy(() => import("./pages/PaymentPage"));

const queryClient = new QueryClient();

// Loading component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
  </div>
);

const App = () => {
  const [showWalkthrough, setShowWalkthrough] = useState(false);
  
  // Check if it's the user's first visit
  useEffect(() => {
    const hasVisitedBefore = localStorage.getItem('hasVisitedBefore');
    
    if (!hasVisitedBefore) {
      // Wait a moment before showing the walkthrough
      const timer = setTimeout(() => {
        setShowWalkthrough(true);
        localStorage.setItem('hasVisitedBefore', 'true');
      }, 1500);
      
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <SmartNavigation />
          <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/resume/builder" element={<Index />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/jobs/:id" element={<JobDetails />} />
            <Route path="/employer/dashboard" element={<EmployerDashboard />} />
            <Route path="/employer/post-job" element={<PostJob />} />
            <Route path="/candidate/dashboard" element={<CandidateDashboard />} />
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="/subscription-plans" element={<SubscriptionPlans />} />
            <Route path="/resume/upload" element={<ResumeUpload />} />
            <Route path="/cover-letter/generate" element={<CoverLetterGenerator />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/help-centre" element={<HelpCentre />} />
            <Route path="/blog" element={<Blog />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          </Suspense>
          
          {/* Walkthrough component */}
          <Walkthrough open={showWalkthrough} onClose={() => setShowWalkthrough(false)} />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
