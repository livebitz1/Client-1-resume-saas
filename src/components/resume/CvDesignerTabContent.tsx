import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ResumeData } from "@/types/resume";
import { toast } from "sonner";
import { colorThemes, defaultSectionNames, layoutStyles, paperStyles } from "./designer/designConstants";
import AppearanceTabContent from "./designer/AppearanceTabContent";
import LayoutTabContent from "./designer/LayoutTabContent";
import SectionsTabContent from "./designer/SectionsTabContent";
import AdvancedTabContent from "./designer/AdvancedTabContent";
import CurrentDesignSummary from "./designer/CurrentDesignSummary";

interface CvDesignerTabContentProps {
  resumeData: ResumeData;
  templateId: string;
  onUpdateResume: (data: ResumeData) => void;
}

const CvDesignerTabContent: React.FC<CvDesignerTabContentProps> = ({ 
  resumeData, 
  templateId, 
  onUpdateResume 
}) => {
  // Design state
  const [font, setFont] = useState("sans-serif");
  const [colorTheme, setColorTheme] = useState(colorThemes[0]);
  const [fontSize, setFontSize] = useState(1); // Scale factor
  const [spacing, setSpacing] = useState(1); // Line spacing scale factor
  const [layout, setLayout] = useState("standard");
  const [paperStyle, setPaperStyle] = useState("white");
  const [showBorders, setShowBorders] = useState(false);
  const [boldHeadings, setBoldHeadings] = useState(true);
  const [compactDates, setCompactDates] = useState(false);
  
  // Section ordering state - convert object keys to array for DnD
  const [sections, setSections] = useState(Object.keys(defaultSectionNames));
  const [sectionNames, setSectionNames] = useState(defaultSectionNames);
  
  const handleSectionRename = (sectionId: string, newName: string) => {
    setSectionNames(prev => ({
      ...prev,
      [sectionId]: newName
    }));
  };
  
  const handleSaveDesign = () => {
    toast.success("Design preferences saved!");
    
    // Show premium features teaser if using advanced features
    if (showBorders || compactDates || paperStyle !== "white") {
      setTimeout(() => {
        toast.info(
          <div className="space-y-2">
            <p>Want to unlock more premium design features?</p>
            <Button size="sm" variant="outline" onClick={() => window.open('/subscription-plans', '_blank')}>
              View Premium Plans
            </Button>
          </div>,
          { duration: 10000 }
        );
      }, 1000);
    }
  };
  
  // Apply the selected styles to the document root to affect the preview
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--resume-font-family', font);
    root.style.setProperty('--resume-color-primary', colorTheme.primary);
    root.style.setProperty('--resume-color-secondary', colorTheme.secondary);
    root.style.setProperty('--resume-font-size-factor', fontSize.toString());
    root.style.setProperty('--resume-line-spacing', spacing.toString());
    root.style.setProperty('--resume-layout-style', layout);
    root.style.setProperty('--resume-paper-style', paperStyle);
    root.style.setProperty('--resume-show-borders', showBorders ? '1px' : '0px');
    root.style.setProperty('--resume-heading-weight', boldHeadings ? '700' : '500');
    root.style.setProperty('--resume-date-display', compactDates ? 'compact' : 'full');
    
    return () => {
      // Clean up
      root.style.removeProperty('--resume-font-family');
      root.style.removeProperty('--resume-color-primary');
      root.style.removeProperty('--resume-color-secondary');
      root.style.removeProperty('--resume-font-size-factor');
      root.style.removeProperty('--resume-line-spacing');
      root.style.removeProperty('--resume-layout-style');
      root.style.removeProperty('--resume-paper-style');
      root.style.removeProperty('--resume-show-borders');
      root.style.removeProperty('--resume-heading-weight');
      root.style.removeProperty('--resume-date-display');
    };
  }, [font, colorTheme, fontSize, spacing, layout, paperStyle, showBorders, boldHeadings, compactDates]);
  
  const [activeTab, setActiveTab] = useState("layout");

  return (
    <div className="grid grid-cols-1 gap-6">
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Resume Designer</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="layout">Layout</TabsTrigger>
                <TabsTrigger value="theme">Theme</TabsTrigger>
              </TabsList>
              <TabsContent value="layout">
                <LayoutTabContent 
                  layout={layout}
                  setLayout={setLayout}
                  showBorders={showBorders}
                  setShowBorders={setShowBorders}
                  compactDates={compactDates}
                  setCompactDates={setCompactDates}
                />
              </TabsContent>
              <TabsContent value="theme">
                <AppearanceTabContent 
                  font={font}
                  setFont={setFont}
                  colorTheme={colorTheme}
                  setColorTheme={setColorTheme}
                  paperStyle={paperStyle}
                  setPaperStyle={setPaperStyle}
                  fontSize={fontSize}
                  setFontSize={setFontSize}
                  spacing={spacing}
                  setSpacing={setSpacing}
                  boldHeadings={boldHeadings}
                  setBoldHeadings={setBoldHeadings}
                />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-medium mb-2">Current Design</h3>
            <CurrentDesignSummary 
              font={font}
              colorTheme={colorTheme}
              layout={layout}
              fontSize={fontSize}
              layoutStyles={layoutStyles}
              paperStyle={paperStyle}
              showBorders={showBorders}
              boldHeadings={boldHeadings}
              compactDates={compactDates}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CvDesignerTabContent;
