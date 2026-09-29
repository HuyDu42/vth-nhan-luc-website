export type Language = 'vi' | 'zh' | 'en';

export interface FactoryJob {
  id: string;
  name: string;
  nameZh?: string;
  companyName: string;
  location: string;
  region: 'Bac' | 'Nam' | 'Trung';
  industrialPark: string;
  industry: 'electronics' | 'packaging' | 'mechanical' | 'garment' | 'logistics';
  industryName: string;
  salaryMin: number;
  salaryMax: number;
  basicSalary: number;
  allowance: number;
  hotBonus?: number;
  hotBonusNote?: string;
  ageRange: string;
  gender: 'all' | 'female' | 'male';
  shift: string;
  image: string;
  featured: boolean;
  active: boolean;
  order: number;
  zaloUrl?: string;
  benefits: string[];
  requirements: string[];
  jobDescription: string[];
  postedDate: string;
}

export interface CandidateApplication {
  id: string;
  fullName: string;
  phone: string;
  birthYear: string;
  hometown: string;
  targetJobId: string;
  targetJobName: string;
  gender: string;
  hasExperience: boolean;
  notes?: string;
  createdAt: string;
  status: 'pending' | 'contacted' | 'interview_scheduled' | 'hired' | 'rejected';
}

export interface EmployerRequest {
  id: string;
  companyName: string;
  contactPerson: string;
  phone: string;
  email?: string;
  location: string;
  workerCount: number;
  serviceType: string;
  startDate: string;
  requirementsNotes?: string;
  createdAt: string;
  status: 'new' | 'contacted' | 'quote_sent' | 'contract_signed';
}

export interface NewsArticle {
  id: string;
  title: string;
  titleZh?: string;
  category: string;
  summary: string;
  summaryZh?: string;
  content: string;
  date: string;
  image: string;
  author: string;
}

export interface OfficeLocation {
  id: string;
  region: string;
  address: string;
  hotline: string;
}

export interface StaffingService {
  id: string;
  title: string;
  titleZh?: string;
  shortDesc: string;
  icon: string;
  features: string[];
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  avatar: string;
  content: string;
  location: string;
}

export interface GalleryItem {
  id: string;
  src: string;
  title: string;
  titleZh?: string;
  caption: string;
}

export interface ProcessStep {
  id: string;
  num: string;
  title: string;
  titleZh?: string;
  desc: string;
}

export interface GeneralSettings {
  brandName: string;
  subBrand: string;
  domain: string;
  hotline: string;
  hotlineCall: string;
  email: string;
  workingHours: string;
  zaloLink: string;
  license: string;
  taxCode: string;
  headOfficeAddress: string;
}

export interface HeroSettings {
  badge: string;
  title: string;
  subtitle: string;
  highlightText: string;
  stats: Array<{ num: string; label: string }>;
  pillars: Array<{ title: string; desc: string }>;
}

export interface AboutSettings {
  badge: string;
  title: string;
  companyName: string;
  paragraph1: string;
  paragraph2: string;
  experienceYears: string;
  experienceSub: string;
  image: string;
  coreValues: Array<{ title: string; desc: string }>;
  commitments: string[];
}

export interface PartnerItem {
  id: string;
  name: string;
  logo: string;
  industry: string;
  location: string;
  workerCountProvided: string;
  partnershipYear: string;
  description: string;
}

export interface CalculatorSettings {
  defaultBaseSalary: number;
  overtimeWeekdayRate: number;
  overtimeSundayRate: number;
  overtimeHolidayRate: number;
  nightShiftAllowancePercent: number;
  defaultAttendanceBonus: number;
  defaultMealAllowance: number;
  defaultHousingAllowance: number;
  insuranceDeductionPercent: number;
}

export interface SiteSettings {
  general: GeneralSettings;
  hero: HeroSettings;
  about: AboutSettings;
  offices: OfficeLocation[];
  services: StaffingService[];
  partners: PartnerItem[];
  testimonials: TestimonialItem[];
  gallery: GalleryItem[];
  processSteps: ProcessStep[];
  calculator: CalculatorSettings;
}
