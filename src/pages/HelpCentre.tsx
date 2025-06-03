
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Chatbot } from "@/components/Chatbot";

const HelpCentre = () => {
  const [showChatbot, setShowChatbot] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const faqs = [
    {
      question: "How does the Auto Apply feature work?",
      answer: "Our Auto Apply technology automatically submits your CV to matching job opportunities based on your skills and experience. Once you've uploaded or created your CV, our AI engine matches your profile with relevant job openings and applies on your behalf with your permission.",
    },
    {
      question: "Is my personal information secure?",
      answer: "Yes, we take data security seriously. All personal information is encrypted and stored securely in compliance with the Protection of Personal Information Act (POPIA). We never share your information with third parties without your explicit consent.",
    },
    {
      question: "How do I create a CV on The Resume Hub?",
      answer: "Simply click on 'CV Builder' in the navigation menu, and you'll be guided through our step-by-step CV creation process. You can choose from multiple templates, add your information, and our AI will even suggest improvements to make your CV stand out.",
    },
    {
      question: "What are the benefits of upgrading to a premium plan?",
      answer: "Premium users enjoy unlimited CV downloads, priority job matching, advanced AI suggestions, custom cover letter generation, and the ability to apply to unlimited jobs. You'll also get access to exclusive job listings and premium templates.",
    },
    {
      question: "How do I post a job as an employer?",
      answer: "Navigate to the 'For Employers' section and click on 'Post a Job'. You'll need to create an employer account if you don't have one already. Then, you can fill out the job details, set screening criteria, and publish your listing to our network of active job seekers.",
    },
    {
      question: "Can I customize my CV for different job applications?",
      answer: "Absolutely! Our platform allows you to create multiple versions of your CV. Our AI assistant can also suggest specific modifications to tailor your CV for individual job applications to maximize your chances of success.",
    },
    {
      question: "What makes The Resume Hub different from other job platforms?",
      answer: "The Resume Hub is Africa's first platform with Auto Apply technology. We combine AI-powered CV building, automated job applications, and direct employer connections—all in one place. Our focus is on making the job search process more efficient for both job seekers and employers.",
    },
    {
      question: "How do I get matched with the right jobs?",
      answer: "Our AI matching algorithm analyzes your skills, experience, and preferences to find the most suitable job openings. You can also set specific job preferences to further refine your matches.",
    },
  ];

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center">
            <Link to="/">
              <Button variant="ghost" size="sm" className="mr-4">
                <ArrowLeft className="h-4 w-4 mr-2" /> Back to Home
              </Button>
            </Link>
            <h1 className="text-2xl font-bold text-primary">Help Centre</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white p-8 rounded-lg shadow">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-2">Frequently Asked Questions</h2>
              <p className="text-gray-600">
                Find answers to common questions about using The Resume Hub
              </p>
            </div>

            <div className="mb-8">
              <Input
                type="text"
                placeholder="Search FAQs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
              />
            </div>

            {filteredFaqs.length > 0 ? (
              <Accordion type="single" collapsible className="w-full">
                {filteredFaqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent>{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-600">
                  No FAQs match your search. Try different keywords or ask our chatbot for help.
                </p>
              </div>
            )}

            <div className="mt-12 text-center">
              <p className="mb-4">Can't find what you're looking for?</p>
              <Button onClick={() => setShowChatbot(true)} className="mx-auto">
                Chat with our Assistant
              </Button>
            </div>
          </div>
        </div>
      </div>

      {showChatbot && <Chatbot onClose={() => setShowChatbot(false)} />}

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-6 mt-12">
        <div className="container mx-auto px-4">
          <div className="text-center text-gray-500 text-sm">
            <p>© {new Date().getFullYear()} The Resume Hub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HelpCentre;
