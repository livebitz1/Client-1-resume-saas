
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
import { ResumeData } from '@/types/resume';

const OtherSection: React.FC = () => {
  const { control, getValues } = useFormContext<ResumeData>();
  
  // Languages section
  const { fields: languageFields, append: appendLanguage, remove: removeLanguage } = useFieldArray({
    control,
    name: 'languages',
  });

  // Interests section
  const { fields: interestFields, append: appendInterest, remove: removeInterest } = useFieldArray({
    control,
    name: 'interests',
  });

  // References section
  const { fields: referenceFields, append: appendReference, remove: removeReference } = useFieldArray({
    control,
    name: 'references',
  });

  return (
    <div className="space-y-8">
      {/* Languages Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Languages</h3>
        <Accordion type="multiple" className="space-y-4">
          {languageFields.map((field, index) => (
            <AccordionItem key={field.id} value={`language-${index}`} className="border rounded-md p-2">
              <AccordionTrigger className="px-4">
                <div className="flex justify-between w-full">
                  <span>
                    {getValues(`languages.${index}.language`) || `Language ${index + 1}`}
                  </span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeLanguage(index);
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 pt-2 pb-4 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={control}
                    name={`languages.${index}.language`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Language</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., English, Afrikaans" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={control}
                    name={`languages.${index}.fluency`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Fluency Level</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Native, Fluent, Intermediate" {...field} />
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
            onClick={() => appendLanguage({
              language: '',
              fluency: ''
            })}
            className="w-full max-w-md"
          >
            <Plus className="mr-2 h-4 w-4" /> Add Language
          </Button>
        </div>
      </div>

      {/* Interests Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Interests & Hobbies</h3>
        <Accordion type="multiple" className="space-y-4">
          {interestFields.map((field, index) => (
            <AccordionItem key={field.id} value={`interest-${index}`} className="border rounded-md p-2">
              <AccordionTrigger className="px-4">
                <div className="flex justify-between w-full">
                  <span>
                    {getValues(`interests.${index}.name`) || `Interest ${index + 1}`}
                  </span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeInterest(index);
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 pt-2 pb-4 space-y-4">
                <FormField
                  control={control}
                  name={`interests.${index}.name`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Interest/Hobby</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Photography, Reading" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        
        <div className="flex justify-center mt-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => appendInterest({
              name: '',
              keywords: []
            })}
            className="w-full max-w-md"
          >
            <Plus className="mr-2 h-4 w-4" /> Add Interest
          </Button>
        </div>
      </div>

      {/* References Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">References</h3>
        <Accordion type="multiple" className="space-y-4">
          {referenceFields.map((field, index) => (
            <AccordionItem key={field.id} value={`reference-${index}`} className="border rounded-md p-2">
              <AccordionTrigger className="px-4">
                <div className="flex justify-between w-full">
                  <span>
                    {getValues(`references.${index}.name`) || `Reference ${index + 1}`}
                  </span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeReference(index);
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
                    name={`references.${index}.name`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Reference Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Full name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={control}
                    name={`references.${index}.contact`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contact Information</FormLabel>
                        <FormControl>
                          <Input placeholder="Email or phone number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={control}
                    name={`references.${index}.reference`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Relationship/Position</FormLabel>
                        <FormControl>
                          <Textarea placeholder="How you know this person (e.g., Former Manager at XYZ Company)" {...field} />
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
            onClick={() => appendReference({
              name: '',
              reference: '',
              contact: ''
            })}
            className="w-full max-w-md"
          >
            <Plus className="mr-2 h-4 w-4" /> Add Reference
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OtherSection;
