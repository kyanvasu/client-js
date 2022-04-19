import { File } from 'types/file.interface';

export interface CompanyInterface {
  id: number;
  uuid: string;
  name: string;
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
  profile_image: string;
  website: string;
  address: string;
  zipcode: string;
  logo: File;
  apps?: {
    companies_id: number | string;
    apps_id: number | string;
    created_at?: string;
    updated_at?: string;
    is_deleted?: number | boolean;
  };
  subscription?: {
    id: number;
    name: string;
    apps_id: number;
    paid: number;
    quantity: number;
    users_id: number;
    companies_id: number;
    payment_frequency_id: number;
    ends_at: null | string;
    charge_date: null | string;
    companies_groups_id: number;
    grace_period_ends: null | string;
    is_active: number | boolean;
    is_cancelled: number | boolean;
    is_deleted: number | boolean;
    is_freetrial: number | boolean;
    next_due_payment: null | number;
    stripe_id: string;
    stripe_plan: string;
    stripe_status: string;
    trial_ends_at: null | string;
    trial_ends_days: null | string;
    created_at?: string;
    updated_at?: string;
  };
}

export interface CreateCompanyParams {
  name: string;
}