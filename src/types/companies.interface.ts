import { File } from 'types/file.interface';

export interface CompaniesInterface {
  id: number;
  users_id: number;
  has_activities: number;
  appPlanId: number;
  currency_id: string;
  language: string;
  timezone: string;
  currency: string;
  system_modules_id: number;
  phone: string;
  created_at: string;
  updated_at: string;
  is_deleted: number;
  name: string;
  profile_image: string;
  website: string;
  address: string;
  zipcode: string;
  logo: File;
}