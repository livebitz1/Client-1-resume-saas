import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Crown } from "lucide-react";
import { Link } from "react-router-dom";

const CtaSection = () => {
  const backgroundPattern = `data:image/svg+xml,${encodeURIComponent(
    '<svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><g fill="#ffffff" fill-opacity="0.05"><circle cx="30" cy="30" r="2"/></g></g></svg>'
  )}`;

  return (
    <section className="py-20 bg-gradient-to-br from-teal-600 via-teal-700 to-teal-800 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: `url('${backgroundPattern}')`, opacity: 0.2 }}></div>
      </div>
      
      <div className="container mx-auto px-4 relative">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4 mr-2" />
            Join 10,000+ Professionals Already Using Resume Hub
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to Land Your 
            <span className="block bg-gradient-to-r from-teal-200 to-white bg-clip-text text-transparent">
              Dream Job?
            </span>
          </h2>
          
          <p className="text-xl text-teal-100 mb-10 max-w-2xl mx-auto leading-relaxed">
            Start building your professional Resume/CV today with our AI-powered tools 
            and connect with thousands of employers across Africa.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
            <Button 
              size="lg" 
              className="bg-white text-teal-700 hover:bg-teal-50 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 px-8 py-4 text-lg font-semibold" 
              asChild
            >
              <Link to="/resume/builder">
                <Sparkles className="mr-2 h-5 w-5" />
                Start Building Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            
            <Button 
              size="lg" 
              variant="outline" 
              className="border-2 border-white/30 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 hover:border-white/50 shadow-lg hover:shadow-xl transition-all duration-300 px-8 py-4 text-lg font-semibold" 
              asChild
            >
              <Link to="/subscription-plans">
                <Crown className="mr-2 h-5 w-5" />
                View Pricing Plans
              </Link>
            </Button>
          </div>
          
          {/* Enhanced features grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="text-3xl font-bold text-white mb-2">Free</div>
              <div className="text-teal-200 text-sm mb-4">Forever Plan</div>
              <ul className="text-teal-100 text-sm space-y-2">
                <li>✓ 1 Resume/CV Template</li>
                <li>✓ Basic AI Suggestions</li>
                <li>✓ PDF Download</li>
              </ul>
              <Button 
                className="w-full mt-4 bg-white/20 hover:bg-white/30 text-white border border-white/30" 
                variant="outline"
                asChild
              >
                <Link to="/resume/builder">Get Started Free</Link>
              </Button>
            </div>
            
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 border-2 border-white/40 relative transform scale-105">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-1 rounded-full text-xs font-bold">
                  MOST POPULAR
                </span>
              </div>
              <div className="text-3xl font-bold text-white mb-2">Premium</div>
              <div className="text-teal-200 text-sm mb-4">Professional Plan</div>
              <ul className="text-teal-100 text-sm space-y-2">
                <li>✓ All Premium Templates</li>
                <li>✓ Advanced AI Features</li>
                <li>✓ Unlimited Downloads</li>
                <li>✓ Auto-Apply Technology</li>
              </ul>
              <Button 
                className="w-full mt-4 bg-white text-teal-700 hover:bg-teal-50 font-semibold" 
                asChild
              >
                <Link to="/subscription-plans">Upgrade to Premium</Link>
              </Button>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="text-3xl font-bold text-white mb-2">Enterprise</div>
              <div className="text-teal-200 text-sm mb-4">Business Solution</div>
              <ul className="text-teal-100 text-sm space-y-2">
                <li>✓ Bulk Hiring Tools</li>
                <li>✓ Team Management</li>
                <li>✓ Custom Branding</li>
                <li>✓ Priority Support</li>
              </ul>
              <Button 
                className="w-full mt-4 bg-white/20 hover:bg-white/30 text-white border border-white/30" 
                variant="outline"
                asChild
              >
                <Link to="/subscription-plans">Contact Sales</Link>
              </Button>
            </div>
          </div>
          
          <div className="text-center text-teal-200">
            <p className="text-sm">
              🔒 Secure payments • ⚡ Instant access • 💰 30-day money-back guarantee
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
