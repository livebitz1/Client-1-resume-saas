
import React from 'react';
import templates from './templates';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from 'lucide-react';

interface TemplateSelectorProps {
  selectedTemplate: string;
  onSelectTemplate: (templateId: string) => void;
}

const TemplateSelector: React.FC<TemplateSelectorProps> = ({ 
  selectedTemplate, 
  onSelectTemplate 
}) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Choose a Template</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {templates.map((template) => (
          <Card 
            key={template.id} 
            className={`overflow-hidden cursor-pointer transition-all ${
              selectedTemplate === template.id 
                ? 'ring-2 ring-primary' 
                : 'hover:shadow-md'
            }`}
            onClick={() => onSelectTemplate(template.id)}
          >
            <div className="relative">
              <div className="aspect-[3/4] bg-gray-100 flex items-center justify-center">
                {template.image ? (
                  <img 
                    src={template.image} 
                    alt={template.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-gray-400">Template Preview</div>
                )}
              </div>
              {selectedTemplate === template.id && (
                <div className="absolute top-2 right-2 bg-primary rounded-full p-1">
                  <Check className="h-4 w-4 text-white" />
                </div>
              )}
            </div>
            <CardContent className="p-3">
              <div className="font-medium">{template.name}</div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="flex justify-end">
        <Button type="button" onClick={() => {}}>Continue</Button>
      </div>
    </div>
  );
};

export default TemplateSelector;
