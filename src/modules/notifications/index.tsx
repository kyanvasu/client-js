import HttpClient from "core/http-client";
import Base from "modules/base";
import { NotificationInterface } from "types/notification.interface";
import { PaginationArgument } from "types/pagination-argument";

export class Notification extends Base {
  constructor(http: HttpClient) {
    super(http, 'notifications');
  }
  
  /**
   * @description Get company notification base on the logged user
   * @param {PaginationArgument | undefined} params parameters to fetch the notifications
   * @returns {NotificationInterface[]}
   */
  async get(params?: PaginationArgument): Promise<NotificationInterface[]> {
    const result = await this.http.request<NotificationInterface[]>({
      url: this.baseUrl,
      method: 'GET',
      params
    });

    return result.data;
  }

  /**
   * @description clear all new notifications sent 
   * @param {number[]} ids notification's identifier numbers to be clear 
   */
  async clearAll(ids: number[]): Promise<void> {
    await this.http.request({
      url: `${this.baseUrl}/bulk/delete`,
      method: 'POST',
      data: ids
    })
  }
}