export interface NotificationInterface {
  id: number;
  apps_id: number;
  companies_id: number;
  title: string;
  content: string;
  type: string;
  entity_id: number;
  users_avatar: string;
  users_id: number;
  from_users_id: number;
  group: null | any;
  icon: null | any;
  notification_type_id: number;
  read: number | boolean;
  system_modules_id: number;
  entity: {
    type: null | any;
  };
  from: {
    user_id: number; 
    displayname: string;
    avatar: string;
  };
  created_at?: string;
  updated_at?: string;
}