import HttpClient from "core/http-client";
import Base from "modules/base";

interface UserNotificationInterface {
  name: string;
  description: string;
  is_enabled: boolean;
  notifications_types_id: number;
  children: UserNotificationInterface[];
}

export default class UserNotifications extends Base {
  constructor (http: HttpClient) {
    super(http, 'users/{user_id}/notifications')
  }

  async get(id: number | string): Promise<UserNotificationInterface[]> {
    const { data } = await this.http.request<UserNotificationInterface[]>({
      baseURL: this.getBaseUrl(id),
      method: 'GET'
    });

    return data;
  }

  async update(id: number | string, notification: UserNotificationInterface): Promise<UserNotificationInterface> {
    const { data } = await this.http.request<UserNotificationInterface>({
      baseURL: `${this.getBaseUrl(id)}/${notification.notifications_types_id}`,
      method: 'PUT',
      data: notification
    });

    return data;
  }

  async delete(id: number | string): Promise<string> {
    const { data } = await this.http.request<string>({
      baseURL: this.getBaseUrl(id),
      method: 'DELETE'
    });

    return data;
  }

  private getBaseUrl(id: number | string): string {
    return this.baseUrl.replace('{user_id}', id.toString());
  }
}