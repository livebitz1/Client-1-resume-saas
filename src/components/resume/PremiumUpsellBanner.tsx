
import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const PremiumUpsellBanner = () => {
  const navigate = useNavigate();
  
  return (
    <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h3 className="text-lg font-semibold text-blue-900">Upgrade to Premium</h3>
          <p className="text-blue-700">Get unlimited CVs, cover letters, and auto-apply to jobs</p>
        </div>
        <Button onClick={() => navigate('/subscription-plans')} className="whitespace-nowrap">
          View Plans
        </Button>
      </div>
    </div>
  );
};

export default PremiumUpsellBanner;
