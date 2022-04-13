import HttpClient from "core/http-client";
import Base from "modules/base";
import { FormatedResponse } from "types/formated-response.interface";
import { NotificationInterface } from "types/notification.interface";
import { DEFAULT_PAGINATION_ARGUMENT, PaginationArgument } from "types/pagination-argument";

export default class Notifications extends Base {
  constructor(http: HttpClient) {
    super(http, 'notifications');
  }
  
  /**
   * @description Get company notification base on the logged user
   * @returns {NotificationInterface[]}
   */
  async get(): Promise<NotificationInterface[]>;
    /**
   * @description Get company notification base on the logged user
   * @param {PaginationArgument} params parameters to fetch the notifications
   * @returns {FormatedResponse<NotificationInterface>[]}
   */
  async get(params: PaginationArgument): Promise<FormatedResponse<NotificationInterface>>;
  async get(params: PaginationArgument = DEFAULT_PAGINATION_ARGUMENT): Promise<NotificationInterface[] | FormatedResponse<NotificationInterface>> {
    if (params.format) {
      const result = await this.http.request<FormatedResponse<NotificationInterface>>({
        url: this.baseUrl,
        method: 'GET',
        params
      });
      
      return result.data;
    }

    const result = await this.http.request<NotificationInterface[]>({
      url: this.baseUrl,
      method: 'GET',
      params: params?.format ? params : undefined,
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