import HttpClient from "core/http-client";
import Base from "modules/base";
import { SubscriptionInterface, UpdateSubsctiptionInterface } from "types/apps-plan.interface";
import { FormatedResponse } from "types/formated-response.interface";
import { DEFAULT_PAGINATION_ARGUMENT, PaginationArgument } from "types/pagination-argument";

export default class Subscription extends Base {
  constructor(http: HttpClient) {
    super(http, 'apps-plans');
  }

  /**
   * @description Get all the app plans in the platform
   * @returns {SubscriptionInterface[]}
   */
  async get(): Promise<SubscriptionInterface[]>
  /**
   * @description Get all the app plans in the platform
   * @param {PaginationArgument} params pagination argument
   * @returns {FormatedResponse<SubscriptionInterface>}
   */
  async get(params: PaginationArgument): Promise<FormatedResponse<SubscriptionInterface>>;
  async get(params: PaginationArgument = DEFAULT_PAGINATION_ARGUMENT): Promise<SubscriptionInterface[] | FormatedResponse<SubscriptionInterface>> {
    if (params.format) {
      const { data } = await this.http.request<FormatedResponse<SubscriptionInterface>>({
        url: this.baseUrl,
        method: 'GET',
        params
      });

      return data;
    }

    const { data } = await this.http.request<SubscriptionInterface[]>({
      url: this.baseUrl,
      method: 'GET'
    });

    return data;
  }

  /**
   * @description updates a subscription data
   * @param {string} plan subscription/stripe plan to be updated
   * @param {UpdateSubsctiptionInterface} data subscription's data that is going to be updated
   * @returns {SubscriptionInterface}
   */
  async update(plan: string | number, data: UpdateSubsctiptionInterface): Promise<SubscriptionInterface> {
    const result = await this.http.request<SubscriptionInterface>({
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
  async delete(id: string | number): Promise<SubscriptionInterface> {
    const { data } = await this.http.request<SubscriptionInterface>({
      url: `${this.baseUrl}/${id}`,
      method: 'DELETE',
    });

    return data;
  }
}