
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowRight } from "lucide-react";

const Blog = () => {
  // Mock blog posts
  const blogPosts = [
    {
      id: 1,
      title: "10 Resume Tips to Get Past ATS Systems",
      excerpt: "Learn how to optimize your CV to get through Applicant Tracking Systems and land more interviews.",
      category: "Resume Tips",
      date: "May 15, 2025",
      image: "https://images.unsplash.com/photo-1586281380117-5a60ae2050cc",
      readTime: "5 min read",
    },
    {
      id: 2,
      title: "The Future of Recruitment in Africa",
      excerpt: "Discover how AI and automation are transforming the recruitment landscape across the African continent.",
      category: "Industry Trends",
      date: "May 10, 2025",
      image: "https://images.unsplash.com/photo-1531545514256-b1400bc00f31",
      readTime: "8 min read",
    },
    {
      id: 3,
      title: "How to Negotiate Your Salary Successfully",
      excerpt: "Expert strategies to help you negotiate a better salary package in your next job offer.",
      category: "Career Advice",
      date: "May 5, 2025",
      image: "https://images.unsplash.com/photo-1559581958-df379578606a",
      readTime: "6 min read",
    },
    {
      id: 4,
      title: "Remote Work Opportunities in 2025",
      excerpt: "Explore the growing landscape of remote work opportunities and how to position yourself for success.",
      category: "Job Market",
      date: "May 1, 2025",
      image: "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6",
      readTime: "7 min read",
    },
    {
      id: 5,
      title: "Building Your Personal Brand Online",
      excerpt: "Steps to create a strong personal brand that attracts employers and networking opportunities.",
      category: "Personal Development",
      date: "April 25, 2025",
      image: "https://images.unsplash.com/photo-1611926653458-09294b3142bf",
      readTime: "5 min read",
    },
    {
      id: 6,
      title: "Interview Questions You Should Be Prepared For",
      excerpt: "Common and challenging interview questions with tips on how to answer them effectively.",
      category: "Interviews",
      date: "April 20, 2025",
      image: "https://images.unsplash.com/photo-1565728744382-61accd4aa148",
      readTime: "9 min read",
    },
  ];

  // Categories for filtering
  const categories = ["All", "Resume Tips", "Career Advice", "Job Market", "Interviews", "Personal Development", "Industry Trends"];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Career Tips & Insights</h1>
          <p className="text-xl max-w-2xl">
            Expert advice, industry trends, and career development resources to
            help you advance your professional journey.
          </p>
          
          <div className="mt-8 max-w-md">
            <div className="flex gap-2">
              <Input placeholder="Search articles..." className="bg-white text-gray-900" />
              <Button variant="secondary">Search</Button>
            </div>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4 overflow-x-auto">
          <div className="flex space-x-4 min-w-max">
            {categories.map((category) => (
              <Button
                key={category}
                variant={category === "All" ? "default" : "outline"}
                size="sm"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform hover:scale-105"
                />
              </div>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-medium bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                    {post.category}
                  </span>
                  <span className="text-xs text-gray-500">{post.date}</span>
                </div>
                <CardTitle className="text-lg">{post.title}</CardTitle>
                <CardDescription className="line-clamp-2">
                  {post.excerpt}
                </CardDescription>
              </CardHeader>
              <CardFooter className="flex justify-between pt-0">
                <span className="text-xs text-gray-500">{post.readTime}</span>
                <Button variant="ghost" size="sm" className="text-primary">
                  Read More <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Newsletter signup */}
        <div className="mt-16 bg-blue-50 p-8 rounded-lg">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-4">Subscribe to Our Newsletter</h3>
            <p className="text-gray-600 mb-6">
              Get the latest career advice, industry insights, and job
              opportunities delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input placeholder="Enter your email" className="flex-grow" />
              <Button>Subscribe</Button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-6">
        <div className="container mx-auto px-4">
          <div className="text-center text-gray-500 text-sm">
            <p>© {new Date().getFullYear()} The Resume Hub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Blog;
