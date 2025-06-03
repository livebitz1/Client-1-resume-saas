import React from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Home, Briefcase, FileText, Upload, Users, HelpCircle, Sparkles, Target, Calendar, Building } from "lucide-react";
import { cn } from "@/lib/utils";
import Logo from "@/components/ui/logo";

export const SmartNavigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get current path segments
  const pathSegments = location.pathname.split('/').filter(Boolean);
  
  // Go back function
  const goBack = () => {
    navigate(-1);
  };
  
  return (
    <div className="bg-white border-b border-teal-200 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {location.pathname !== '/' && (
              <Button variant="ghost" size="sm" onClick={goBack} className="mr-4 hover:bg-teal-50 text-teal-700">
                <ArrowLeft className="h-4 w-4 mr-2" /> Back
              </Button>
            )}
            <Link to="/" className="flex items-center">
              <Logo size="md" />
            </Link>
          </div>
          
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link to="/">
                  <Button variant="ghost" className="flex items-center gap-2 hover:bg-teal-50 text-teal-700 transition-colors">
                    <Home className="h-4 w-4" />
                    <span className="hidden sm:inline">Home</span>
                  </Button>
                </Link>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-teal-50 hover:bg-teal-100 border border-teal-200 text-teal-700">
                  <FileText className="h-4 w-4 mr-2" />
                  Job Seekers
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="w-[500px] p-6 bg-white border border-teal-200 shadow-xl">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="row-span-3">
                        <NavigationMenuLink asChild>
                          <Link
                            to="/resume/builder"
                            className="flex h-full w-full select-none flex-col justify-end rounded-lg bg-gradient-to-b from-teal-500 to-teal-600 p-6 no-underline outline-none focus:shadow-md hover:shadow-lg transition-all group"
                          >
                            <FileText className="h-8 w-8 text-white mb-2" />
                            <div className="mb-2 mt-4 text-lg font-medium text-white">
                              AI CV Builder
                            </div>
                            <p className="text-sm leading-tight text-teal-100">
                              Create a professional CV with AI assistance and smart suggestions
                            </p>
                            <div className="mt-3 flex items-center text-teal-200 text-sm">
                              <Sparkles className="h-3 w-3 mr-1" />
                              AI-Powered
                            </div>
                          </Link>
                        </NavigationMenuLink>
                      </div>
                      
                      <NavigationMenuLink asChild>
                        <Link
                          to="/jobs"
                          className={cn(
                            "block select-none space-y-1 rounded-lg p-4 leading-none no-underline outline-none transition-all hover:bg-teal-50 focus:bg-teal-50 border border-transparent hover:border-teal-200",
                            location.pathname === "/jobs" ? "bg-teal-50 border-teal-200" : ""
                          )}
                        >
                          <div className="flex items-center text-sm font-medium leading-none mb-2 text-teal-700">
                            <Briefcase className="h-4 w-4 mr-2" />
                            Browse Jobs
                          </div>
                          <p className="line-clamp-2 text-sm leading-snug text-teal-600">
                            Explore job openings matched to your skills across Africa
                          </p>
                        </Link>
                      </NavigationMenuLink>
                      
                      <NavigationMenuLink asChild>
                        <Link
                          to="/cover-letter/generate"
                          className={cn(
                            "block select-none space-y-1 rounded-lg p-4 leading-none no-underline outline-none transition-all hover:bg-teal-50 focus:bg-teal-50 border border-transparent hover:border-teal-200",
                            location.pathname === "/cover-letter/generate" ? "bg-teal-50 border-teal-200" : ""
                          )}
                        >
                          <div className="flex items-center text-sm font-medium leading-none mb-2 text-teal-700">
                            <FileText className="h-4 w-4 mr-2" />
                            Cover Letters
                          </div>
                          <p className="line-clamp-2 text-sm leading-snug text-teal-600">
                            Generate personalized cover letters for your applications
                          </p>
                        </Link>
                      </NavigationMenuLink>
                      
                      <NavigationMenuLink asChild>
                        <Link
                          to="/subscription-plans"
                          className={cn(
                            "block select-none space-y-1 rounded-lg p-4 leading-none no-underline outline-none transition-all hover:bg-teal-50 focus:bg-teal-50 border border-transparent hover:border-teal-200",
                            location.pathname === "/subscription-plans" ? "bg-teal-50 border-teal-200" : ""
                          )}
                        >
                          <div className="flex items-center text-sm font-medium leading-none mb-2 text-teal-700">
                            <Target className="h-4 w-4 mr-2" />
                            Premium Plans
                          </div>
                          <p className="line-clamp-2 text-sm leading-snug text-teal-600">
                            Upgrade for unlimited applications and AI features
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-teal-50 hover:bg-teal-100 border border-teal-200 text-teal-700">
                  <Building className="h-4 w-4 mr-2" />
                  For Employers
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="w-[450px] p-6 bg-white border border-teal-200 shadow-xl">
                    <div className="space-y-4">
                      <div className="text-center mb-4">
                        <h3 className="text-lg font-semibold text-teal-800 mb-2">Employer Solutions</h3>
                        <p className="text-sm text-teal-600">Access Africa's largest talent pool</p>
                      </div>
                      
                      <NavigationMenuLink asChild>
                        <Link
                          to="/employer/post-job"
                          className={cn(
                            "block select-none space-y-1 rounded-lg p-4 leading-none no-underline outline-none transition-all hover:bg-teal-50 focus:bg-teal-50 border-2 border-transparent hover:border-teal-200 shadow-sm hover:shadow-md",
                            location.pathname === "/employer/post-job" ? "bg-teal-50 border-teal-200" : ""
                          )}
                        >
                          <div className="flex items-center text-sm font-medium leading-none mb-2 text-teal-700">
                            <Briefcase className="h-4 w-4 mr-2" />
                            Post a Job
                            <span className="ml-auto bg-teal-100 text-teal-800 text-xs px-2 py-1 rounded-full">Free</span>
                          </div>
                          <p className="line-clamp-2 text-sm leading-snug text-teal-600">
                            Create a new job posting to attract qualified candidates
                          </p>
                        </Link>
                      </NavigationMenuLink>
                      
                      <NavigationMenuLink asChild>
                        <Link
                          to="/employer/dashboard"
                          className={cn(
                            "block select-none space-y-1 rounded-lg p-4 leading-none no-underline outline-none transition-all hover:bg-teal-50 focus:bg-teal-50 border-2 border-transparent hover:border-teal-200 shadow-sm hover:shadow-md",
                            location.pathname === "/employer/dashboard" ? "bg-teal-50 border-teal-200" : ""
                          )}
                        >
                          <div className="flex items-center text-sm font-medium leading-none mb-2 text-teal-700">
                            <Users className="h-4 w-4 mr-2" />
                            Employer Dashboard
                          </div>
                          <p className="line-clamp-2 text-sm leading-snug text-teal-600">
                            Manage job postings and view candidate applications
                          </p>
                        </Link>
                      </NavigationMenuLink>
                      
                      <NavigationMenuLink asChild>
                        <Link
                          to="/subscription-plans"
                          className={cn(
                            "block select-none space-y-1 rounded-lg p-4 leading-none no-underline outline-none transition-all hover:bg-teal-50 focus:bg-teal-50 border-2 border-transparent hover:border-teal-200 shadow-sm hover:shadow-md",
                            location.pathname === "/subscription-plans" ? "bg-teal-50 border-teal-200" : ""
                          )}
                        >
                          <div className="flex items-center text-sm font-medium leading-none mb-2 text-teal-700">
                            <Target className="h-4 w-4 mr-2" />
                            Subscription Plans
                            <span className="ml-auto bg-teal-100 text-teal-800 text-xs px-2 py-1 rounded-full">Premium</span>
                          </div>
                          <p className="line-clamp-2 text-sm leading-snug text-teal-600">
                            View our employer subscription options and features
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-teal-50 hover:bg-teal-100 border border-teal-200 text-teal-700">
                  <HelpCircle className="h-4 w-4 mr-2" />
                  Resources
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="w-[400px] p-6 bg-white border border-teal-200 shadow-xl">
                    <div className="space-y-4">
                      <div className="text-center mb-4">
                        <h3 className="text-lg font-semibold text-teal-800 mb-2">Help & Resources</h3>
                        <p className="text-sm text-teal-600">Get the support you need</p>
                      </div>
                      
                      <div className="grid gap-3">
                        <NavigationMenuLink asChild>
                          <Link
                            to="/help-centre"
                            className={cn(
                              "block select-none space-y-1 rounded-lg p-4 leading-none no-underline outline-none transition-all hover:bg-teal-50 focus:bg-teal-50 border border-transparent hover:border-teal-200 shadow-sm hover:shadow-md",
                              location.pathname === "/help-centre" ? "bg-teal-50 border-teal-200" : ""
                            )}
                          >
                            <div className="flex items-center text-sm font-medium leading-none mb-2 text-teal-700">
                              <HelpCircle className="h-4 w-4 mr-2" />
                              Help Centre
                            </div>
                            <p className="line-clamp-2 text-sm leading-snug text-teal-600">
                              Find answers to frequently asked questions
                            </p>
                          </Link>
                        </NavigationMenuLink>
                        
                        <NavigationMenuLink asChild>
                          <Link
                            to="/blog"
                            className={cn(
                              "block select-none space-y-1 rounded-lg p-4 leading-none no-underline outline-none transition-all hover:bg-teal-50 focus:bg-teal-50 border border-transparent hover:border-teal-200 shadow-sm hover:shadow-md",
                              location.pathname === "/blog" ? "bg-teal-50 border-teal-200" : ""
                            )}
                          >
                            <div className="flex items-center text-sm font-medium leading-none mb-2 text-teal-700">
                              <Calendar className="h-4 w-4 mr-2" />
                              Career Blog
                            </div>
                            <p className="line-clamp-2 text-sm leading-snug text-teal-600">
                              Read articles with career tips and advice
                            </p>
                          </Link>
                        </NavigationMenuLink>
                        
                        <NavigationMenuLink asChild>
                          <Link
                            to="/terms-of-service"
                            className={cn(
                              "block select-none space-y-1 rounded-lg p-4 leading-none no-underline outline-none transition-all hover:bg-teal-50 focus:bg-teal-50 border border-transparent hover:border-teal-200 shadow-sm hover:shadow-md",
                              location.pathname === "/terms-of-service" ? "bg-teal-50 border-teal-200" : ""
                            )}
                          >
                            <div className="flex items-center text-sm font-medium leading-none mb-2 text-teal-700">
                              <FileText className="h-4 w-4 mr-2" />
                              Terms of Service
                            </div>
                            <p className="line-clamp-2 text-sm leading-snug text-teal-600">
                              Read our terms and privacy policy
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </div>
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        
        {/* Breadcrumbs */}
        {pathSegments.length > 0 && (
          <div className="flex items-center text-sm text-teal-600 mt-2">
            <Link to="/" className="hover:text-teal-700">Home</Link>
            {pathSegments.map((segment, index) => {
              // Build the path up to this segment
              const path = '/' + pathSegments.slice(0, index + 1).join('/');
              return (
                <React.Fragment key={index}>
                  <span className="mx-2 text-teal-400">/</span>
                  <Link 
                    to={path}
                    className={cn(
                      "hover:text-teal-700", 
                      index === pathSegments.length - 1 ? "font-medium text-teal-700" : ""
                    )}
                  >
                    {segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ')}
                  </Link>
                </React.Fragment>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
