import { File } from './file.interface';

export interface CompaniesBranchesInterface {
  id: number | string;
  name: string;
  email: string;
  users_id?: number;
  address?: string;
  phone?: string;
  zipcode?: string;
  companies_id?: number;
  total_users?: number;
  industry_id: number;
  website: string;
  languages: string[];
  logo?: File;
  created_at?: string;
  updated_at?: string;
  is_deleted?: boolean;
}

export interface CreateCompaniesBranchesInterface {
  name: string;
}