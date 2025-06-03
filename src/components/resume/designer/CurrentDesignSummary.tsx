
import React from "react";
import { Badge } from "@/components/ui/badge";
import { fonts, colorThemes, paperStyles } from "./designConstants";

interface CurrentDesignSummaryProps {
  font: string;
  colorTheme: { name: string; primary: string; secondary: string };
  layout: string;
  fontSize: number;
  layoutStyles: Array<{ name: string; value: string }>;
  paperStyle?: string;
  showBorders?: boolean;
  boldHeadings?: boolean;
  compactDates?: boolean;
}

const CurrentDesignSummary: React.FC<CurrentDesignSummaryProps> = ({
  font,
  colorTheme,
  layout,
  fontSize,
  layoutStyles,
  paperStyle = "white",
  showBorders = false,
  boldHeadings = true,
  compactDates = false
}) => {
  // Find display names for selected values
  const fontName = fonts.find(f => f.value === font)?.name || "Default";
  const layoutName = layoutStyles.find(l => l.value === layout)?.name || "Standard";
  const paperName = paperStyles.find(p => p.value === paperStyle)?.name || "White";
  const fontSizeName = fontSize < 0.9 ? "Small" : fontSize > 1.1 ? "Large" : "Medium";

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-500">Font</span>
        <Badge variant="outline">{fontName}</Badge>
      </div>
      
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-500">Color Theme</span>
        <div className="flex items-center gap-2">
          <div className="flex items-center">
            <div 
              className="w-3 h-3 rounded-full mr-1" 
              style={{ backgroundColor: colorTheme.primary }}
            ></div>
            <div 
              className="w-3 h-3 rounded-full mr-1" 
              style={{ backgroundColor: colorTheme.secondary }}
            ></div>
          </div>
          <Badge variant="outline">{colorTheme.name}</Badge>
        </div>
      </div>
      
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-500">Layout</span>
        <Badge variant="outline">{layoutName}</Badge>
      </div>
      
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-500">Paper Style</span>
        <Badge variant="outline">{paperName}</Badge>
      </div>
      
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-500">Font Size</span>
        <Badge variant="outline">{fontSizeName}</Badge>
      </div>
      
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-500">Special Effects</span>
        <div className="flex flex-wrap gap-1">
          {showBorders && <Badge variant="outline" className="text-xs">Section Borders</Badge>}
          {boldHeadings && <Badge variant="outline" className="text-xs">Bold Headings</Badge>}
          {compactDates && <Badge variant="outline" className="text-xs">Compact Dates</Badge>}
        </div>
      </div>
    </div>
  );
};

export default CurrentDesignSummary;
