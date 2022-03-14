export interface UserNotificationInterface {
  name: string;
  description: string;
  is_enabled: boolean;
  notifications_types_id: number;
  children: UserNotificationInterface[];
}