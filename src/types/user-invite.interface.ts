export interface UserInvite {
  id: number;
  apps_id: number;
  companies_id: number;
  email: string;
  invite_hash: string;
  is_deleted?: boolean;
  role_id?: number;
  users_id?: number;
  created_at?: string;
  updated_at?: string;
}

export interface CreateUserInvite {
  email: string;
  role_id: number;
}