export interface UserInviteInterface {
  id: number;
  email: string;
  role_id: number;
  invite_hash: string;
  apps_id?: number;
  companies_id?: number;
  is_deleted?: boolean;
  users_id?: number;
  created_at?: string;
  updated_at?: string;
}

export interface UserInviteHashInterface extends UserInviteInterface {
  company: string;
  company_branch: string;
  user: {
    firstname: string;
    lastname: string;
  };
  role: string;
}

export interface CreateUserInvite {
  email: string;
  role_id: number;
}