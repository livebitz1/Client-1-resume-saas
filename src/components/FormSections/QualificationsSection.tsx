
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
import { toast } from 'sonner';
import { ResumeData } from '@/types/resume';

const QualificationsSection: React.FC = () => {
  const { control, getValues } = useFormContext<ResumeData>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'qualifications',
  });

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-md p-4 mb-6">
        <h3 className="font-medium text-blue-800 mb-2">Qualifications & Certifications</h3>
        <p className="text-blue-700 text-sm">
          Add your professional qualifications, certifications, and credentials.
        </p>
      </div>
      
      <Accordion type="multiple" className="space-y-4">
        {fields.map((field, index) => (
          <AccordionItem key={field.id} value={`qualification-${index}`} className="border rounded-md p-2">
            <AccordionTrigger className="px-4">
              <div className="flex justify-between w-full">
                <span>
                  {getValues(`qualifications.${index}.name`) || `Qualification ${index + 1}`}
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
                  name={`qualifications.${index}.name`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Qualification Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Bachelor's Degree in Computer Science" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={control}
                  name={`qualifications.${index}.issuer`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Issuing Organization</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., University of Cape Town" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={control}
                  name={`qualifications.${index}.date`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date Obtained</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., June 2020" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={control}
                  name={`qualifications.${index}.url`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Verification URL (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., https://credentials.example.com/verify" {...field} />
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
            issuer: '',
            date: '',
            url: ''
          })}
          className="w-full max-w-md"
        >
          <Plus className="mr-2 h-4 w-4" /> Add Qualification
        </Button>
      </div>
    </div>
  );
};

export default QualificationsSection;
