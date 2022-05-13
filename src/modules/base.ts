import HttpClient from 'core/http-client';
import { FormatedResponse } from 'types/formated-response.interface';
import { DEFAULT_PAGINATION_ARGUMENT, PaginationArgument } from 'types/pagination-argument';

export default class Base {
  protected readonly http: HttpClient;
  protected readonly baseUrl: string;

  constructor(httpClient: HttpClient, baseUrl: string) {
    this.http = httpClient;
    this.baseUrl = baseUrl;

    if (!this.baseUrl) {
      throw new Error('baseUrl has to be defined.');
    }
  }

  protected async gettable<D>(url: string): Promise<D[]>;
  protected async gettable<D>(url: string, pagination: PaginationArgument): Promise<FormatedResponse<D>>;
  protected async gettable<D>(url: string, pagination: PaginationArgument = DEFAULT_PAGINATION_ARGUMENT): Promise<D[] | FormatedResponse<D>> {
    const { page, limit, sort, format = false, q, relationships } = pagination;
    const params = { page, limit, sort, format, q, relationships };

    if (format) {
      const { data } = await this.http.request<FormatedResponse<D>>({
        method: 'GET',
        url,
        params,
      });
      return data;
    }

    const { data } = await this.http.request<D[]>({
      method: 'GET',
      url,
    });
    return data;
  }
}