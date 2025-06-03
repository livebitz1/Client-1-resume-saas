
import React from "react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { layoutStyles } from "./designConstants";

interface LayoutTabContentProps {
  layout: string;
  setLayout: (layout: string) => void;
  showBorders: boolean;
  setShowBorders: (show: boolean) => void;
  compactDates: boolean;
  setCompactDates: (compact: boolean) => void;
}

const LayoutTabContent: React.FC<LayoutTabContentProps> = ({
  layout,
  setLayout,
  showBorders,
  setShowBorders,
  compactDates,
  setCompactDates
}) => {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="layout-style">Layout Style</Label>
        <Select 
          value={layout} 
          onValueChange={setLayout}
        >
          <SelectTrigger id="layout-style">
            <SelectValue placeholder="Select layout style" />
          </SelectTrigger>
          <SelectContent>
            {layoutStyles.map(style => (
              <SelectItem key={style.value} value={style.value}>
                {style.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="flex items-center justify-between">
        <Label htmlFor="show-borders">Section Borders</Label>
        <Switch 
          id="show-borders" 
          checked={showBorders}
          onCheckedChange={setShowBorders}
        />
      </div>
      
      <div className="flex items-center justify-between">
        <Label htmlFor="compact-dates">Compact Date Format</Label>
        <Switch 
          id="compact-dates" 
          checked={compactDates}
          onCheckedChange={setCompactDates}
        />
      </div>
      
      <div className="pt-4">
        <p className="text-sm text-gray-500 mb-2">Layout Preview</p>
        <div className="grid grid-cols-2 gap-3">
          <div 
            className={`border rounded p-3 cursor-pointer hover:bg-gray-50 ${layout === 'standard' ? 'ring-2 ring-primary' : ''}`}
            onClick={() => setLayout('standard')}
          >
            <div className="h-2 w-full bg-gray-200 mb-2 rounded"></div>
            <div className="h-1 w-3/4 bg-gray-200 mb-4 rounded"></div>
            <div className="h-1 w-full bg-gray-200 mb-1 rounded"></div>
            <div className="h-1 w-full bg-gray-200 mb-1 rounded"></div>
            <div className="h-1 w-1/2 bg-gray-200 rounded"></div>
          </div>
          
          <div 
            className={`border rounded p-3 cursor-pointer hover:bg-gray-50 ${layout === 'compact' ? 'ring-2 ring-primary' : ''}`}
            onClick={() => setLayout('compact')}
          >
            <div className="h-2 w-full bg-gray-200 mb-1 rounded"></div>
            <div className="h-1 w-3/4 bg-gray-200 mb-2 rounded"></div>
            <div className="h-1 w-full bg-gray-200 mb-1 rounded"></div>
            <div className="h-1 w-full bg-gray-200 mb-1 rounded"></div>
            <div className="h-1 w-full bg-gray-200 mb-1 rounded"></div>
          </div>
          
          <div 
            className={`border rounded p-3 cursor-pointer hover:bg-gray-50 ${layout === 'minimalist' ? 'ring-2 ring-primary' : ''}`}
            onClick={() => setLayout('minimalist')}
          >
            <div className="h-2 w-1/2 bg-gray-200 mb-3 rounded"></div>
            <div className="h-1 w-full bg-gray-200 mb-3 rounded"></div>
            <div className="h-1 w-full bg-gray-200 mb-3 rounded"></div>
            <div className="h-1 w-1/2 bg-gray-200 rounded"></div>
          </div>
          
          <div 
            className={`border rounded p-3 cursor-pointer hover:bg-gray-50 ${layout === 'split' ? 'ring-2 ring-primary' : ''}`}
            onClick={() => setLayout('split')}
          >
            <div className="flex">
              <div className="w-1/3 pr-1">
                <div className="h-2 w-full bg-gray-300 mb-1 rounded"></div>
                <div className="h-1 w-full bg-gray-300 mb-1 rounded"></div>
              </div>
              <div className="w-2/3 pl-1">
                <div className="h-1 w-full bg-gray-200 mb-1 rounded"></div>
                <div className="h-1 w-full bg-gray-200 mb-1 rounded"></div>
                <div className="h-1 w-1/2 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LayoutTabContent;
