
export interface AppInterface {
  id: number | string;
  name: string;
  description: string;
  url: string;
  domain: any | null;
  default_apps_plan_id: number;
  is_actived: number | boolean;
  key: string;
  payments_active: number;
  ecosystem_auth: number;
  is_public: number;
  domain_based: string;
  created_at?: string;
  updated_at?: string;
  is_deleted?: number | boolean;
}

/**
 * @description Custom interface for application settings response.
 */
export interface ApplicationSettings {
  name: string;
  description: string;
  settings: {
    allow_user_registration: boolean;
    background_image: string;
    base_color: string;
    currency: string;
    default_admin_role: string;
    default_sidebar_state: string;
    filesystem: string;
    language: string;
    logo: string;
    public_images: boolean;
    secondary_color: string;
    show_notifications: boolean;
    timezone: string;
    'user-settings': boolean;
  };
}