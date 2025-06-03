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
import AiBulletPointSelector from '../AiBulletPointSelector';

const WorkSection: React.FC = () => {
  const { control, getValues, setValue } = useFormContext<ResumeData>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'work',
  });

  return (
    <div className="space-y-4">
      <Accordion type="multiple" className="space-y-4">
        {fields.map((field, index) => (
          <AccordionItem key={field.id} value={`work-${index}`} className="border rounded-md p-2">
            <div className="flex items-center justify-between px-4">
              <AccordionTrigger className="flex-1">
                <span>
                  {getValues(`work.${index}.position`) || `Work Experience ${index + 1}`}
                </span>
              </AccordionTrigger>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-8 w-8 ml-2"
                onClick={(e) => {
                  e.stopPropagation();
                  remove(index);
                }}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            <AccordionContent className="px-4 pt-2 pb-4 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={control}
                  name={`work.${index}.company`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company</FormLabel>
                      <FormControl>
                        <Input placeholder="Company name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={control}
                  name={`work.${index}.position`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Position</FormLabel>
                      <FormControl>
                        <Input placeholder="Job title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={control}
                  name={`work.${index}.startDate`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Start Date</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Jan 2020" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={control}
                  name={`work.${index}.endDate`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>End Date (or "Present")</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Dec 2022 or Present" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <AiBulletPointSelector
                title="Job Description"
                originalContent={getValues(`work.${index}.summary`) || ''}
                onContentUpdate={(content) => setValue(`work.${index}.summary`, content)}
                placeholder="Describe your role and responsibilities..."
              />
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
            company: '',
            position: '',
            website: '',
            startDate: '',
            endDate: '',
            current: false,
            summary: '',
            highlights: []
          })}
          className="w-full max-w-md"
        >
          <Plus className="mr-2 h-4 w-4" /> Add Work Experience
        </Button>
      </div>
    </div>
  );
};

export default WorkSection;
