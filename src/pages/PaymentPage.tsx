
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";

const PaymentPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState({
    plan: "credits",
    amount: 99,
    credits: 3,
    returnUrl: "",
  });

  useEffect(() => {
    // Check if we have a successful payment return
    const query = new URLSearchParams(location.search);
    const paymentId = query.get("payment_id");
    const status = query.get("status");
    
    if (paymentId && status === "success") {
      const confirmPayment = async () => {
        try {
          // Call edge function to verify payment with PayFast
          const { data, error } = await supabase.functions.invoke("verify-payment", {
            body: { paymentId }
          });
          
          if (error) throw error;
          
          if (data.verified) {
            toast.success("Payment successful!");
            
            // Update user credits
            const { data: user } = await supabase.auth.getUser();
            if (user) {
              await supabase
                .from('profiles')
                .update({
                  'subscription.resumeCredits': data.credits
                })
                .eq('id', user.user.id);
            }
            
            // Redirect to dashboard
            navigate('/candidate/dashboard');
          } else {
            toast.error("Payment verification failed");
          }
        } catch (error) {
          console.error("Payment verification error:", error);
          toast.error("Failed to verify payment");
        }
      };
      
      confirmPayment();
    }
  }, [location, navigate]);

  const handlePayment = async () => {
    setIsProcessing(true);
    
    try {
      // Set return URL to current origin
      const returnUrl = `${window.location.origin}/payment`;
      
      // Call edge function to create PayFast payment
      const { data, error } = await supabase.functions.invoke("create-payment", {
        body: { 
          amount: paymentDetails.amount,
          item_name: paymentDetails.plan === "credits" 
            ? `${paymentDetails.credits} Resume Credits` 
            : `Monthly Subscription`,
          return_url: returnUrl,
          cancel_url: returnUrl,
        }
      });
      
      if (error) throw error;
      
      // Redirect to PayFast checkout
      window.location.href = data.payment_url;
      
    } catch (error) {
      console.error("Payment error:", error);
      toast.error("Failed to process payment");
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-10 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold">Complete Your Payment</h1>
          <p className="text-gray-600">Purchase resume credits or a subscription</p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Resume Credits</CardTitle>
            <CardDescription>Pay once for a pack of credits</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <p className="text-3xl font-bold">R99</p>
              <p className="text-gray-500">for 3 resume downloads</p>
            </div>
            <div className="text-gray-700">
              <ul className="space-y-2">
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Download 3 high-quality resumes
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  ATS-optimized templates
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  No subscription required
                </li>
              </ul>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" onClick={handlePayment} disabled={isProcessing}>
              {isProcessing ? "Processing..." : "Pay with PayFast"}
            </Button>
          </CardFooter>
        </Card>
        
        <div className="mt-6 text-center">
          <Button variant="link" onClick={() => navigate('/subscription-plans')}>
            View all subscription plans
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
