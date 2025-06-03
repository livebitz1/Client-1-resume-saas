
import React from 'react';
import { useFormContext, useFieldArray } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { Plus, Trash2 } from 'lucide-react';
import { ResumeData } from '@/types/resume';

const SkillsSection: React.FC = () => {
  const { control, getValues } = useFormContext<ResumeData>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'skills',
  });

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-md p-4 mb-6">
        <h3 className="font-medium text-blue-800 mb-2">Skills & Expertise</h3>
        <p className="text-blue-700 text-sm">
          Add your technical and soft skills that are relevant to your career.
        </p>
      </div>
      
      <Accordion type="multiple" className="space-y-4">
        {fields.map((field, index) => (
          <AccordionItem key={field.id} value={`skill-${index}`} className="border rounded-md p-2">
            <AccordionTrigger className="px-4">
              <div className="flex justify-between w-full">
                <span>
                  {getValues(`skills.${index}.name`) || `Skill ${index + 1}`}
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
                  name={`skills.${index}.name`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Skill Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., JavaScript, Project Management" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={control}
                  name={`skills.${index}.level`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Proficiency Level</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Expert, Intermediate, Beginner" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
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
            level: '',
            keywords: []
          })}
          className="w-full max-w-md"
        >
          <Plus className="mr-2 h-4 w-4" /> Add Skill
        </Button>
      </div>
    </div>
  );
};

export default SkillsSection;
