import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { format } from "date-fns";
import { CalendarIcon, Radio } from "lucide-react";
import { 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';

const SOUTH_AFRICAN_PROVINCES = [
  "Eastern Cape",
  "Free State",
  "Gauteng",
  "KwaZulu-Natal",
  "Limpopo",
  "Mpumalanga",
  "Northern Cape",
  "North West",
  "Western Cape"
];

const NOTICE_PERIOD_OPTIONS = [
  "Immediately",
  "1 week",
  "2 weeks",
  "1 month",
  "2 months",
  "3 months",
  "Other"
];

const PersonalInfoSection: React.FC = () => {
  const { control, watch } = useFormContext();
  
  // Watch values to conditionally render fields
  const hasDisability = watch('personalInfo.hasDisability');
  const hasCriminalRecord = watch('personalInfo.hasCriminalRecord');
  const isSACitizen = watch('personalInfo.isSACitizen');

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Personal Information</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Full Name */}
        <FormField
          control={control}
          name="personalInfo.fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your full name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        {/* Job Title / Professional Title */}
        <FormField
          control={control}
          name="basics.label"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Professional Title / Job Title</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Software Developer" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* ID Number */}
        <FormField
          control={control}
          name="personalInfo.idNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ID Number</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Enter your ID number" 
                  {...field} 
                  type="text" 
                  inputMode="numeric"
                  pattern="[0-9]*"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        {/* Date of Birth */}
        <FormField
          control={control}
          name="personalInfo.dateOfBirth"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date of Birth</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Nationality */}
        <FormField
          control={control}
          name="personalInfo.nationality"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nationality</FormLabel>
              <FormControl>
                <Input placeholder="Enter your nationality" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      
      {/* Gender */}
      <FormField
        control={control}
        name="personalInfo.gender"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel>Gender</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                value={field.value}
                className="flex flex-row space-x-4"
              >
                <FormItem className="flex items-center space-x-2 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="male" />
                  </FormControl>
                  <FormLabel className="font-normal">Male</FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-2 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="female" />
                  </FormControl>
                  <FormLabel className="font-normal">Female</FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-2 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="other" />
                  </FormControl>
                  <FormLabel className="font-normal">Other</FormLabel>
                </FormItem>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      {/* Ethnic Group */}
      <FormField
        control={control}
        name="personalInfo.ethnicGroup"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel>Ethnic Group (EE Purposes)</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                value={field.value}
                className="grid grid-cols-2 md:grid-cols-5 gap-2"
              >
                {['African', 'Coloured', 'Indian', 'White', 'Other'].map((ethnic) => (
                  <FormItem key={ethnic} className="flex items-center space-x-2 space-y-0">
                    <FormControl>
                      <RadioGroupItem value={ethnic.toLowerCase()} />
                    </FormControl>
                    <FormLabel className="font-normal">{ethnic}</FormLabel>
                  </FormItem>
                ))}
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      {/* Disability Status */}
      <div className="space-y-4">
        <FormField
          control={control}
          name="personalInfo.hasDisability"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Disability Status</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={(value) => field.onChange(value === 'yes')}
                  value={field.value ? 'yes' : 'no'}
                  className="flex flex-row space-x-4"
                >
                  <FormItem className="flex items-center space-x-2 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="yes" />
                    </FormControl>
                    <FormLabel className="font-normal">Yes</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-2 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="no" />
                    </FormControl>
                    <FormLabel className="font-normal">No</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        {hasDisability && (
          <FormField
            control={control}
            name="personalInfo.disabilityDetails"
            render={({ field }) => (
              <FormItem>
                <FormLabel>If yes, specify:</FormLabel>
                <FormControl>
                  <Input placeholder="Provide details about your disability" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
      </div>
      
      {/* Marital Status */}
      <FormField
        control={control}
        name="personalInfo.maritalStatus"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel>Marital Status</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                value={field.value}
                className="grid grid-cols-2 md:grid-cols-4 gap-2"
              >
                {['Single', 'Married', 'Divorced', 'Widowed'].map((status) => (
                  <FormItem key={status} className="flex items-center space-x-2 space-y-0">
                    <FormControl>
                      <RadioGroupItem value={status.toLowerCase()} />
                    </FormControl>
                    <FormLabel className="font-normal">{status}</FormLabel>
                  </FormItem>
                ))}
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      {/* Contact Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Contact Number (Mobile) */}
        <FormField
          control={control}
          name="personalInfo.mobileNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contact Number (Mobile)</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Enter mobile number" 
                  {...field} 
                  type="tel"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        {/* Email Address */}
        <FormField
          control={control}
          name="personalInfo.email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Enter your email address" 
                  {...field} 
                  type="email"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* Address Fields */}
      <FormField
        control={control}
        name="personalInfo.homeAddress"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Home Address</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Enter your home address" 
                className="min-h-[80px]" 
                {...field} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={control}
        name="personalInfo.postalAddress"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Postal Address (if different)</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Enter your postal address if different from home address" 
                className="min-h-[80px]" 
                {...field} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Province */}
        <FormField
          control={control}
          name="personalInfo.province"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Province</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select province" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {SOUTH_AFRICAN_PROVINCES.map((province) => (
                    <SelectItem key={province} value={province.toLowerCase()}>
                      {province}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        {/* Suburb/Town */}
        <FormField
          control={control}
          name="personalInfo.suburb"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Suburb/Town</FormLabel>
              <FormControl>
                <Input placeholder="Enter suburb or town" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        {/* Postal Code */}
        <FormField
          control={control}
          name="personalInfo.postalCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Postal Code</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Enter postal code" 
                  {...field} 
                  inputMode="numeric"
                  pattern="[0-9]*"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      
      {/* Contact Number (Alternative) */}
      <FormField
        control={control}
        name="personalInfo.alternativeNumber"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Contact Number (Alternative)</FormLabel>
            <FormControl>
              <Input 
                placeholder="Enter alternative number (optional)" 
                {...field} 
                type="tel"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Own Reliable Transport */}
        <FormField
          control={control}
          name="personalInfo.hasTransport"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Own Reliable Transport</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={(value) => field.onChange(value === 'yes')}
                  value={field.value ? 'yes' : 'no'}
                  className="flex flex-row space-x-4"
                >
                  <FormItem className="flex items-center space-x-2 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="yes" />
                    </FormControl>
                    <FormLabel className="font-normal">Yes</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-2 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="no" />
                    </FormControl>
                    <FormLabel className="font-normal">No</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        {/* Driver's License */}
        <FormField
          control={control}
          name="personalInfo.driversLicense"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Driver's License</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  value={field.value}
                  className="flex flex-wrap gap-4"
                >
                  {['None', 'Code 08', 'Code 10', 'PDP'].map((license) => (
                    <FormItem key={license} className="flex items-center space-x-2 space-y-0">
                      <FormControl>
                        <RadioGroupItem value={license.toLowerCase().replace(' ', '-')} />
                      </FormControl>
                      <FormLabel className="font-normal">{license}</FormLabel>
                    </FormItem>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      
      {/* Criminal Record */}
      <div className="space-y-4">
        <FormField
          control={control}
          name="personalInfo.hasCriminalRecord"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Criminal Record</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={(value) => field.onChange(value === 'yes')}
                  value={field.value ? 'yes' : 'no'}
                  className="flex flex-row space-x-4"
                >
                  <FormItem className="flex items-center space-x-2 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="yes" />
                    </FormControl>
                    <FormLabel className="font-normal">Yes</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-2 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="no" />
                    </FormControl>
                    <FormLabel className="font-normal">No</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        {hasCriminalRecord && (
          <FormField
            control={control}
            name="personalInfo.criminalRecordDetails"
            render={({ field }) => (
              <FormItem>
                <FormLabel>If yes, explain:</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Provide details about your criminal record" 
                    className="min-h-[80px]"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
      </div>
      
      {/* Notice Period */}
      <FormField
        control={control}
        name="personalInfo.noticePeriod"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Notice Period</FormLabel>
            <Select onValueChange={field.onChange} value={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select notice period" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {NOTICE_PERIOD_OPTIONS.map((period) => (
                  <SelectItem key={period} value={period.toLowerCase()}>
                    {period}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      
      {/* SA Citizenship */}
      <div className="space-y-4">
        <FormField
          control={control}
          name="personalInfo.isSACitizen"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>South African Citizenship</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={(value) => field.onChange(value === 'yes')}
                  value={field.value ? 'yes' : 'no'}
                  className="flex flex-row space-x-4"
                >
                  <FormItem className="flex items-center space-x-2 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="yes" />
                    </FormControl>
                    <FormLabel className="font-normal">Yes</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-2 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="no" />
                    </FormControl>
                    <FormLabel className="font-normal">No</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        {!isSACitizen && (
          <FormField
            control={control}
            name="personalInfo.workPermitNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Work Permit Number</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your work permit number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
      </div>
    </div>
  );
};

export default PersonalInfoSection;
