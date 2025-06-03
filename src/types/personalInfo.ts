
export interface PersonalInfo {
  fullName: string;
  idNumber: string;
  dateOfBirth: Date | null;
  gender: 'male' | 'female' | 'other' | '';
  nationality: string;
  ethnicGroup: 'african' | 'coloured' | 'indian' | 'white' | 'other' | '';
  hasDisability: boolean;
  disabilityDetails?: string;
  maritalStatus: 'single' | 'married' | 'divorced' | 'widowed' | '';
  homeAddress: string;
  postalAddress?: string;
  province: string;
  suburb: string;
  postalCode: string;
  mobileNumber: string;
  alternativeNumber?: string;
  email: string;
  hasTransport: boolean;
  driversLicense: 'none' | 'code-08' | 'code-10' | 'pdp' | '';
  hasCriminalRecord: boolean;
  criminalRecordDetails?: string;
  noticePeriod: string;
  isSACitizen: boolean;
  workPermitNumber?: string;
}

export const defaultPersonalInfo: PersonalInfo = {
  fullName: '',
  idNumber: '',
  dateOfBirth: null,
  gender: '',
  nationality: '',
  ethnicGroup: '',
  hasDisability: false,
  maritalStatus: '',
  homeAddress: '',
  province: '',
  suburb: '',
  postalCode: '',
  mobileNumber: '',
  email: '',
  hasTransport: false,
  driversLicense: '',
  hasCriminalRecord: false,
  noticePeriod: '',
  isSACitizen: true
};
