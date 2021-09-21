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