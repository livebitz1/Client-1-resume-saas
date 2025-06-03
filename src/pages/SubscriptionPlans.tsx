
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Sparkles, Zap, Crown } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import PaymentGateway from "@/components/PaymentGateway";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const SubscriptionPlans = () => {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [showPayment, setShowPayment] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState({
    amount: 0,
    description: "",
    planType: ""
  });

  const handleSubscribe = (plan: string, amount: number, description: string) => {
    setSelectedPlan(plan);
    setPaymentDetails({
      amount,
      description,
      planType: plan
    });
    setShowPayment(true);
    toast.info(`Selected ${plan} plan - Opening payment gateway...`);
  };

  const handlePaymentSuccess = (paymentId: string) => {
    console.log('Payment successful:', paymentId);
    setShowPayment(false);
    toast.success(`Subscription to ${selectedPlan} plan successful! Welcome to premium features.`);
    
    // Simulate subscription activation
    setTimeout(() => {
      navigate("/resume/builder");
    }, 2000);
  };

  const handlePaymentError = (error: string) => {
    console.error('Payment failed:', error);
    toast.error('Payment failed. Please try again.');
  };

  return (
    <div className="container mx-auto py-12 px-4 bg-gradient-to-br from-gray-50 to-teal-50 min-h-screen">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
          Choose Your Plan
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
          Unlock premium features to enhance your job search and application process with AI-powered tools
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {/* Pay-Per-CV Plan */}
        <Card className="border-2 border-gray-200 hover:border-teal-300 transition-all duration-300 hover:shadow-lg">
          <CardHeader className="text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <CardTitle className="text-xl">Pay Per CV</CardTitle>
            <CardDescription>Perfect for one-time usage</CardDescription>
            <div className="mt-4">
              <span className="text-3xl font-bold text-green-600">R99</span>
              <span className="text-gray-500 ml-2">for 3 CVs</span>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              {[
                "3 ATS-optimized CV downloads",
                "Custom cover letter generator",
                "Multiple professional templates",
                "PDF download option",
                "AI-powered content suggestions",
                "Basic customer support"
              ].map((feature, index) => (
                <div key={index} className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              className="w-full bg-green-600 hover:bg-green-700" 
              onClick={() => handleSubscribe("Pay Per CV", 99, "3 CV Downloads Package")}
            >
              Get Started
            </Button>
          </CardFooter>
        </Card>

        {/* Monthly Subscription - Most Popular */}
        <Card className="border-2 border-teal-500 shadow-xl relative transform scale-105">
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-teal-500 to-blue-500 text-white px-6 py-2 rounded-full text-sm font-medium">
            🔥 Most Popular
          </div>
          <CardHeader className="text-center pt-8">
            <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Zap className="h-6 w-6 text-white" />
            </div>
            <CardTitle className="text-xl">Monthly Premium</CardTitle>
            <CardDescription>Best value for active job seekers</CardDescription>
            <div className="mt-4">
              <span className="text-4xl font-bold text-teal-600">R199</span>
              <span className="text-gray-500 ml-2">/month</span>
            </div>
            <div className="text-green-600 text-sm font-medium mt-1">
              <span className="line-through text-gray-400">R499</span> Limited time offer
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              {[
                "Unlimited ATS-optimized CVs",
                "Unlimited custom cover letters",
                "All professional templates",
                "PDF & Word download options",
                "Advanced AI content suggestions",
                "Auto-apply to jobs feature",
                "Real-time CV editing",
                "Priority customer support",
                "Job matching algorithm"
              ].map((feature, index) => (
                <div key={index} className="flex items-start">
                  <Check className="h-5 w-5 text-teal-500 mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              className="w-full bg-teal-600 hover:bg-teal-700 text-lg py-6" 
              onClick={() => handleSubscribe("Monthly Premium", 199, "Monthly Premium Subscription")}
            >
              Subscribe Now
            </Button>
          </CardFooter>
        </Card>

        {/* Business Plan */}
        <Card className="border-2 border-purple-200 hover:border-purple-400 transition-all duration-300 hover:shadow-lg">
          <CardHeader className="text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Crown className="h-6 w-6 text-white" />
            </div>
            <CardTitle className="text-xl">Business</CardTitle>
            <CardDescription>For companies hiring talent</CardDescription>
            <div className="mt-4">
              <div className="space-y-1">
                <div>
                  <span className="text-3xl font-bold text-purple-600">FREE</span>
                  <span className="text-gray-500 ml-2">for 60 days</span>
                </div>
                <div className="text-sm text-gray-600">
                  Then <span className="font-semibold">R999/month</span> per job posting
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              {[
                "Post unlimited jobs for 60 days",
                "Access to candidate database",
                "Advanced candidate filtering",
                "Direct candidate messaging",
                "Application tracking system",
                "Company branding on job posts",
                "Analytics and reporting",
                "Priority job listing placement",
                "Dedicated account manager"
              ].map((feature, index) => (
                <div key={index} className="flex items-start">
                  <Check className="h-5 w-5 text-purple-500 mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              className="w-full bg-purple-600 hover:bg-purple-700" 
              onClick={() => handleSubscribe("Business", 0, "60-Day Free Business Trial")}
            >
              Start Free Trial
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="mt-12 text-center">
        <p className="text-sm text-gray-500 mb-4">
          All plans include 30-day money-back guarantee • Cancel anytime • Secure payments
        </p>
        <div className="flex items-center justify-center space-x-4 text-xs text-gray-400">
          <span>🔒 SSL Secured</span>
          <span>•</span>
          <span>💳 PayFast Integration</span>
          <span>•</span>
          <span>✅ PCI Compliant</span>
        </div>
      </div>

      {/* Payment Dialog */}
      <Dialog open={showPayment} onOpenChange={setShowPayment}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center">Complete Your Payment</DialogTitle>
          </DialogHeader>
          {paymentDetails.amount > 0 ? (
            <PaymentGateway
              amount={paymentDetails.amount}
              currency="R"
              description={paymentDetails.description}
              onPaymentSuccess={handlePaymentSuccess}
              onPaymentError={handlePaymentError}
            />
          ) : (
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Free Trial Activated!</h3>
              <p className="text-gray-600 mb-4">
                Your 60-day free business trial has been activated. You can start posting jobs immediately.
              </p>
              <Button onClick={() => {
                setShowPayment(false);
                navigate('/employer/post-job');
              }}>
                Start Posting Jobs
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SubscriptionPlans;
