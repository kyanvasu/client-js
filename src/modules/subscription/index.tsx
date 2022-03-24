import HttpClient from "core/http-client";
import Base from "modules/base";
import { AppsPlanInterface } from "types/apps-plan.interface";
import { PaginationArgument } from "types/pagination-argument";

export default class Subscription extends Base {
  constructor(http: HttpClient) {
    super(http, 'apps-plans');
  }

  /**
   * @description Get all the app plans in the platform
   * @param {PaginationArgument | undefined} params pagination argument
   * @returns 
   */
  async get(params?: PaginationArgument): Promise<AppsPlanInterface[]> {
    const { data } = await this.http.request<AppsPlanInterface[]>({
      url: this.baseUrl,
      method: 'GET',
      params
    });

    return data;
  }

  /**
   * @description updates a subscription data
   * @param plan subscription/stripe plan to be updated
   * @param data subscription's data that is going to be updated
   * @returns {AppsPlanInterface}
   */
  async update(plan: string | number, data: Partial<AppsPlanInterface>): Promise<AppsPlanInterface> {
    const result = await this.http.request<AppsPlanInterface>({
      url: `${this.baseUrl}/${plan}`,
      method: 'PUT',
      data
    });

    return result.data;
  }

  /**
   * @description Cancel the given id subscription
   * @param {string | number} id subscription/stripe identifier
   * @returns 
   */
  async delete(id: string | number): Promise<AppsPlanInterface> {
    const { data } = await this.http.request<AppsPlanInterface>({
      url: `${this.baseUrl}/${id}`,
      method: 'DELETE',
    });

    return data;
  }
}