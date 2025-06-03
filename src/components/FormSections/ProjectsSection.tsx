
import React from 'react';
import { useFormContext, useFieldArray } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { Plus, Trash2 } from 'lucide-react';
import { enhanceResumeSection } from '@/services/aiService';
import { toast } from 'sonner';
import { ResumeData } from '@/types/resume';
import AiBulletPointSelector from '../AiBulletPointSelector';

const ProjectsSection: React.FC = () => {
  const { control, getValues, setValue } = useFormContext<ResumeData>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'projects',
  });

  const enhanceWithAI = async (fieldName: string, value: string) => {
    try {
      toast.info("Enhancing content with AI...");
      const jobTitle = getValues('basics.label');
      
      const enhancedContent = await enhanceResumeSection(
        fieldName,
        value,
        jobTitle
      );
      
      return enhancedContent;
    } catch (error) {
      toast.error("Failed to enhance content");
      console.error("AI enhancement error:", error);
      return value;
    }
  };

  return (
    <div className="space-y-4">
      <Accordion type="multiple" className="space-y-4">
        {fields.map((field, index) => (
          <AccordionItem key={field.id} value={`project-${index}`} className="border rounded-md p-2">
            <AccordionTrigger className="px-4">
              <div className="flex justify-between w-full">
                <span>
                  {getValues(`projects.${index}.name`) || `Project ${index + 1}`}
                </span>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={(e) => {
                    e.stopPropagation();
                    remove(index);
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 pt-2 pb-4 space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <FormField
                  control={control}
                  name={`projects.${index}.name`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Project Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Project name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={control}
                  name={`projects.${index}.url`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Project URL</FormLabel>
                      <FormControl>
                        <Input placeholder="https://github.com/username/project" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <AiBulletPointSelector
                  title="Project Description"
                  originalContent={getValues(`projects.${index}.description`) || ''}
                  onContentUpdate={(content) => setValue(`projects.${index}.description`, content)}
                  placeholder="Describe your project, technologies used, and achievements..."
                />
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      
      <div className="flex justify-center mt-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => append({
            id: Date.now().toString(),
            name: '',
            description: '',
            url: '',
            highlights: [],
            keywords: [],
            startDate: '',
            endDate: '',
            roles: [],
            entity: '',
            type: ''
          })}
          className="w-full max-w-md"
        >
          <Plus className="mr-2 h-4 w-4" /> Add Project
        </Button>
      </div>
    </div>
  );
};

export default ProjectsSection;
