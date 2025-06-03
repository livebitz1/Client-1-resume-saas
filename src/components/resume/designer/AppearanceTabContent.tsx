
import React from "react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { fonts, colorThemes, paperStyles } from "./designConstants";

interface AppearanceTabContentProps {
  font: string;
  setFont: (font: string) => void;
  colorTheme: { name: string; primary: string; secondary: string };
  setColorTheme: (theme: { name: string; primary: string; secondary: string }) => void;
  paperStyle: string;
  setPaperStyle: (style: string) => void;
  fontSize: number;
  setFontSize: (size: number) => void;
  spacing: number;
  setSpacing: (spacing: number) => void;
  boldHeadings: boolean;
  setBoldHeadings: (bold: boolean) => void;
}

const AppearanceTabContent: React.FC<AppearanceTabContentProps> = ({
  font,
  setFont,
  colorTheme,
  setColorTheme,
  paperStyle,
  setPaperStyle,
  fontSize,
  setFontSize,
  spacing,
  setSpacing,
  boldHeadings,
  setBoldHeadings
}) => {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="font-select">Font</Label>
        <Select value={font} onValueChange={setFont}>
          <SelectTrigger id="font-select">
            <SelectValue placeholder="Select font" />
          </SelectTrigger>
          <SelectContent>
            {fonts.map(font => (
              <SelectItem key={font.value} value={font.value}>
                {font.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div>
        <Label htmlFor="color-theme-select">Color Theme</Label>
        <Select 
          value={colorTheme.name} 
          onValueChange={(value) => {
            setColorTheme(colorThemes.find(theme => theme.name === value) || colorThemes[0]);
          }}
        >
          <SelectTrigger id="color-theme-select">
            <SelectValue placeholder="Select color theme" />
          </SelectTrigger>
          <SelectContent>
            {colorThemes.map(theme => (
              <SelectItem key={theme.name} value={theme.name}>
                <div className="flex items-center">
                  <div 
                    className="w-4 h-4 rounded-full mr-2" 
                    style={{ backgroundColor: theme.primary }}
                  ></div>
                  {theme.name}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div>
        <Label htmlFor="paper-style">Paper Style</Label>
        <Select 
          value={paperStyle} 
          onValueChange={setPaperStyle}
        >
          <SelectTrigger id="paper-style">
            <SelectValue placeholder="Select paper style" />
          </SelectTrigger>
          <SelectContent>
            {paperStyles.map(style => (
              <SelectItem key={style.value} value={style.value}>
                {style.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div>
        <Label>Font Size</Label>
        <div className="flex items-center space-x-2">
          <span>Small</span>
          <Slider 
            value={[fontSize]} 
            onValueChange={(value) => setFontSize(value[0])} 
            step={0.05}
            min={0.8}
            max={1.2}
            className="flex-grow"
          />
          <span>Large</span>
        </div>
      </div>
      
      <div>
        <Label>Line Spacing</Label>
        <div className="flex items-center space-x-2">
          <span>Tight</span>
          <Slider 
            value={[spacing]} 
            onValueChange={(value) => setSpacing(value[0])} 
            step={0.05}
            min={0.9}
            max={1.5}
            className="flex-grow"
          />
          <span>Loose</span>
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        <Label htmlFor="bold-headings">Bold Headings</Label>
        <Switch 
          id="bold-headings" 
          checked={boldHeadings}
          onCheckedChange={setBoldHeadings}
        />
      </div>
    </div>
  );
};

export default AppearanceTabContent;
