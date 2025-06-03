
import React from "react";
import { Link } from "react-router-dom";

const LandingFooter = () => {
  const currentYear = new Date().getFullYear();
  
  const footerSections = [
    {
      title: "The Resume Hub",
      content: [
        { text: "Africa's first auto-apply platform for job seekers and employers.", isLink: false },
        { text: "support@resumehub.co", isLink: true, href: "mailto:support@resumehub.co" },
      ]
    },
    {
      title: "For Job Seekers",
      links: [
        { text: "Build CV", href: "/resume/builder" },
        { text: "Find Jobs", href: "/jobs" },
        { text: "Create Cover Letter", href: "/cover-letter/generate" },
        { text: "Subscription Plans", href: "/subscription-plans" },
      ]
    },
    {
      title: "For Employers",
      links: [
        { text: "Post a Job", href: "/employer/post-job" },
        { text: "Manage Listings", href: "/employer/dashboard" },
        { text: "Pricing Plans", href: "/subscription-plans" },
      ]
    },
    {
      title: "Resources",
      links: [
        { text: "Blog", href: "/blog" },
        { text: "Career Tips", href: "/blog" },
        { text: "Help Centre", href: "/help-centre" },
        { text: "Privacy Policy", href: "/terms-of-service" },
        { text: "Terms of Service", href: "/terms-of-service" },
      ]
    }
  ];

  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {footerSections.map((section, index) => (
            <div key={index}>
              <h3 className={`${index === 0 ? "text-xl" : "text-lg"} font-bold mb-4`}>{section.title}</h3>
              {section.content && (
                <div className="space-y-2">
                  {section.content.map((item, i) => (
                    <p key={i} className="text-gray-400">
                      {item.isLink ? (
                        <a href={item.href} className="hover:text-white">{item.text}</a>
                      ) : (
                        item.text
                      )}
                    </p>
                  ))}
                </div>
              )}
              {section.links && (
                <ul className="space-y-2">
                  {section.links.map((link, i) => (
                    <li key={i}>
                      <Link to={link.href} className="text-gray-400 hover:text-white">
                        {link.text}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>© {currentYear} The Resume Hub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default LandingFooter;
