export interface RoleInterface {
  id: number;
  name: string;
  description: string;
  scope?: number;
  companies_id?: number;
  apps_id?: number;
  created_at?: string;
  updated_at?: string;
  is_default?: boolean;
  is_active?: boolean;
  is_deleted?: boolean;
}