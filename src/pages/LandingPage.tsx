
import React, { useState } from "react";
import { Walkthrough } from "@/components/Walkthrough";
import NewHeroSection from "@/components/landing/NewHeroSection";
import HowItWorksSection from "@/components/landing/HowItWorksSection";
import EmployersSection from "@/components/landing/EmployersSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import CtaSection from "@/components/landing/CtaSection";
import LandingFooter from "@/components/landing/LandingFooter";

const LandingPage = () => {
  const [showWalkthrough, setShowWalkthrough] = useState(false);
  
  return (
    <div className="min-h-screen">
      <NewHeroSection onShowWalkthrough={() => setShowWalkthrough(true)} />
      <HowItWorksSection />
      <EmployersSection />
      <FeaturesSection />
      <CtaSection />
      <LandingFooter />
      
      {/* Walkthrough */}
      <Walkthrough open={showWalkthrough} onClose={() => setShowWalkthrough(false)} />
    </div>
  );
};

export default LandingPage;
