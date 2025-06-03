import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import AiResumeSuggestions from "@/components/AiResumeSuggestions";
import JobMatchScore from "@/components/JobMatchScore";
import AiTips from "./AiTips";

interface AiTabContentProps {
  resumeData: ResumeData;
  templateId: string;
  onApplySuggestions: (data: Partial<ResumeData>) => void;
}

const AiTabContent = ({ resumeData, templateId, onApplySuggestions }: AiTabContentProps) => {
  const [activeTab, setActiveTab] = useState("suggestions");

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>AI Resume Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="suggestions">Suggestions</TabsTrigger>
                <TabsTrigger value="tips">AI Tips</TabsTrigger>
              </TabsList>
              <TabsContent value="suggestions">
                <AiResumeSuggestions 
                  resumeData={resumeData}
                  onApplySuggestions={onApplySuggestions}
                />
              </TabsContent>
              <TabsContent value="tips">
                <AiTips />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <JobMatchScore resumeData={resumeData} />
      </div>
    </div>
  );
};

export default AiTabContent;
