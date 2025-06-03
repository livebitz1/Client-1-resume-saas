
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowRight, Plus } from "lucide-react";

const AdvancedTabContent: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="bg-amber-50 border border-amber-200 rounded-md p-3">
          <h3 className="font-medium text-amber-800">Premium Features</h3>
          <p className="text-sm text-amber-700 mt-1">
            The following advanced features are only available with a premium subscription:
          </p>
        </div>
        
        <div className="opacity-50 pointer-events-none">
          <Label htmlFor="custom-css" className="flex items-center gap-2">
            Custom CSS
            <Badge className="bg-amber-500">Premium</Badge>
          </Label>
          <Input 
            id="custom-css" 
            placeholder="Add custom CSS styles here" 
            disabled
          />
          <p className="text-xs text-gray-500 mt-1">
            Add custom CSS styling to further customize your resume appearance.
          </p>
        </div>
        
        <Separator />
        
        <div className="opacity-50 pointer-events-none">
          <div className="flex justify-between items-center mb-2">
            <Label>Upload Custom Font</Label>
            <Badge className="bg-amber-500">Premium</Badge>
          </div>
          <div className="flex gap-2">
            <Input type="file" disabled />
            <Button disabled variant="outline">
              <Plus className="h-4 w-4 mr-1" /> Add
            </Button>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Upload your own font files to use in your resume (TTF or OTF format).
          </p>
        </div>
        
        <Separator />
        
        <div className="opacity-50 pointer-events-none">
          <div className="flex justify-between items-center mb-2">
            <Label>Custom Color Picker</Label>
            <Badge className="bg-amber-500">Premium</Badge>
          </div>
          <div className="flex gap-3">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded bg-blue-600"></div>
                <Input type="text" value="#1a56db" className="w-28" disabled />
              </div>
              <span className="text-xs">Primary</span>
            </div>
            
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded bg-blue-100"></div>
                <Input type="text" value="#e2e8f0" className="w-28" disabled />
              </div>
              <span className="text-xs">Secondary</span>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-3">
            Create your own custom color themes with personalized hex values.
          </p>
        </div>
      </div>
      
      <div className="mt-6 flex justify-center">
        <Button 
          variant="outline" 
          className="flex items-center gap-2"
          onClick={() => window.location.href = '/subscription-plans'}
        >
          Upgrade to Premium
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default AdvancedTabContent;
