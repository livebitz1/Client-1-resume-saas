
import React, { useState, useEffect, useRef } from "react";
import { X, Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/lib/supabase";

interface ChatMessage {
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface ChatbotProps {
  onClose: () => void;
}

export const Chatbot: React.FC<ChatbotProps> = ({ onClose }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      text: "Hello! I'm the Resume Hub AI assistant. How can I help you today?",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scrolling
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (input.trim() === "" || isLoading) return;

    // Add user message
    const userMessage = {
      text: input,
      isUser: true,
      timestamp: new Date(),
    };
    
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setIsLoading(true);
    
    try {
      // Call the Supabase Edge Function for AI response
      const { data, error } = await supabase.functions.invoke('enhance-resume', {
        body: { 
          section: 'chatbot',
          content: input,
          context: messages.slice(-5).map(m => ({ role: m.isUser ? 'user' : 'assistant', content: m.text }))
        },
      });

      if (error) {
        console.error("Error getting AI response:", error);
        throw error;
      }

      // Add AI response after a short delay for a more natural feeling
      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            text: data.enhancedContent || "I'm sorry, I'm having trouble understanding. Could you please rephrase your question?",
            isUser: false,
            timestamp: new Date(),
          },
        ]);
        setIsLoading(false);
      }, 500);

    } catch (error) {
      console.error("Error with AI chatbot:", error);
      
      // Fallback to static responses if AI fails
      let botResponse = "I'm not sure how to help with that. Please try asking another question or contact support@resumehub.co.";

      const userInput = input.toLowerCase();
      if (userInput.includes("cv") || userInput.includes("resume")) {
        botResponse = "Our CV builder helps you create professional resumes with AI assistance. Go to the CV Builder page to get started, or upload your existing CV for enhancement.";
      } else if (userInput.includes("job") || userInput.includes("apply")) {
        botResponse = "Our Auto Apply feature automatically submits your CV to matching job opportunities. Make sure your CV is complete and up-to-date for the best matches.";
      } else if (userInput.includes("employer") || userInput.includes("recruit")) {
        botResponse = "If you're an employer, you can post jobs on our platform to reach thousands of qualified candidates. Visit the 'For Employers' section to get started.";
      } else if (userInput.includes("price") || userInput.includes("subscription") || userInput.includes("plan")) {
        botResponse = "We offer various subscription plans for both job seekers and employers. Visit our Subscription Plans page to see pricing details.";
      } else if (userInput.includes("cover letter")) {
        botResponse = "Our platform can generate customized cover letters for your job applications. Go to the Cover Letter Generator page to create one.";
      } else if (userInput.includes("thanks") || userInput.includes("thank you")) {
        botResponse = "You're welcome! Is there anything else I can help you with?";
      }

      // Add bot response with delay for natural feeling
      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            text: botResponse,
            isUser: false,
            timestamp: new Date(),
          },
        ]);
        setIsLoading(false);
      }, 1000);
    }

    setInput("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !isLoading) {
      handleSend();
    }
  };

  return (
    <div className="fixed bottom-5 right-5 w-80 md:w-96 h-[500px] bg-white rounded-lg shadow-xl flex flex-col overflow-hidden z-50 border border-gray-200">
      <div className="bg-primary text-white p-4 flex justify-between items-center">
        <h3 className="font-bold">Resume Hub Assistant</h3>
        <Button variant="ghost" size="sm" onClick={onClose} className="h-8 w-8 p-0">
          <X className="h-5 w-5" />
        </Button>
      </div>

      <div
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-4 space-y-4"
      >
        {messages.map((message, index) => (
          <div
            key={index}
            className={`max-w-[80%] ${
              message.isUser ? "ml-auto" : "mr-auto"
            }`}
          >
            <div
              className={`rounded-lg px-4 py-2 ${
                message.isUser
                  ? "bg-primary text-white"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              {message.text}
            </div>
            <div
              className={`text-xs text-gray-500 mt-1 ${
                message.isUser ? "text-right" : ""
              }`}
            >
              {message.timestamp.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="max-w-[80%] mr-auto">
            <div className="bg-gray-100 text-gray-800 rounded-lg px-4 py-2 flex items-center">
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
              Thinking...
            </div>
          </div>
        )}
      </div>

      <div className="border-t border-gray-200 p-3 flex gap-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your question..."
          className="flex-1"
          disabled={isLoading}
        />
        <Button onClick={handleSend} size="icon" disabled={isLoading || !input.trim()}>
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
