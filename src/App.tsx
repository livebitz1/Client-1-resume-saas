
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import LandingPage from "./pages/LandingPage";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Jobs from "./pages/Jobs";
import JobDetails from "./pages/JobDetails";
import EmployerDashboard from "./pages/EmployerDashboard";
import PostJob from "./pages/PostJob";
import SubscriptionPlans from "./pages/SubscriptionPlans";
import ResumeUpload from "./pages/ResumeUpload";
import CoverLetterGenerator from "./pages/CoverLetterGenerator";
import TermsOfService from "./pages/TermsOfService";
import HelpCentre from "./pages/HelpCentre";
import Blog from "./pages/Blog";
import { SmartNavigation } from "./components/SmartNavigation";
import { Walkthrough } from "./components/Walkthrough";
import AuthPage from "./pages/AuthPage";
import CandidateDashboard from "./pages/CandidateDashboard";
import PaymentPage from "./pages/PaymentPage";

const queryClient = new QueryClient();

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
          
          {/* Walkthrough component */}
          <Walkthrough open={showWalkthrough} onClose={() => setShowWalkthrough(false)} />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
