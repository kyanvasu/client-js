export interface UserNotificationInterface {
  name: string;
  description: string;
  is_enabled: number;
  notifications_types_id: number;
  children: UserNotificationInterface[];
}