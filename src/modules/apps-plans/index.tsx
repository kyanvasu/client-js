import HttpClient from "core/http-client";
import Base from "modules/base";
import { AppsPlansInterface } from "types/apps-plans.interface";
import { FormatedResponse } from "types/formated-response.interface";
import { DEFAULT_PAGINATION_ARGUMENT, PaginationArgument } from "types/pagination-argument";

export default class AppsPlans extends Base {
  constructor(http: HttpClient) {
    super(http, 'apps-plans');
  }

  /**
   * @description Get all the app plans in the platform
   * @returns {AppsPlansInterface[]}
   */
  async get(): Promise<AppsPlansInterface[]>
  /**
   * @description Get all the app plans in the platform
   * @param {PaginationArgument} params pagination argument
   * @returns {FormatedResponse<AppsPlansInterface>}
   */
  async get(params: PaginationArgument): Promise<FormatedResponse<AppsPlansInterface>>;
  async get(params: PaginationArgument = DEFAULT_PAGINATION_ARGUMENT): Promise<AppsPlansInterface[] | FormatedResponse<AppsPlansInterface>> {
    if (params.format) {
      const { data } = await this.http.request<FormatedResponse<AppsPlansInterface>>({
        url: this.baseUrl,
        method: 'GET',
        params
      });

      return data;
    }

    const { data } = await this.http.request<AppsPlansInterface[]>({
      url: this.baseUrl,
      method: 'GET'
    });

    return data;
  }
}
