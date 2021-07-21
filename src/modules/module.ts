import Base from './base';
import HttpClient from 'core/http-client';
import { FormatedResponse } from 'types/formated-response.interface';
import { DEFAULT_PAGINATION_ARGUMENT, PaginationArgument } from 'types/pagination-argument';

export default class Module<T> extends Base {
  constructor(httpClient: HttpClient, baseUrl: string) {
    super(httpClient, baseUrl);
  }

  /**
   * @description Create a record.
   * @param {<T>} postData - Data to be posted for creating the record.
   * @returns {Promise<T>} - Newly created record.
   */
  async create(postData: T): Promise<T> {
    const { data } = await this.http.request<T>({
      method: 'POST',
      url: this.baseUrl,
      data: postData
    });

    return data;
  }

  /**
   * @description Updates a record by its ID (differencial update).
   * @param {number} id - ID to perform the update.
   * @param {K} putData - An object with the update changes to perform to the record.
   * @returns {Promise<T>} - Updated record.
   */
  async update(id: number, putData: T): Promise<T> {
    const { data } = await this.http.request<T>({
      method: 'PUT',
      url: `${this.baseUrl}/${id}`,
      data: putData,
    });

    return data;
  }

  /**
   * @description Get a list of users
   * @returns {Promise<T[]>}
   */
  async get(): Promise<T[]>;
  /**
   * @description Get a list of users using pagination argument
   * @param {PaginationArgument} pagination 
   * @returns {Promise<FormatedResponse<T>>}
   */
  async get(pagination: PaginationArgument): Promise<FormatedResponse<T>>;
  async get(pagination: PaginationArgument = DEFAULT_PAGINATION_ARGUMENT): Promise<T[] | FormatedResponse<T>> {
    const { page, limit, sort, format = false } = pagination;
    const params = { page, limit, sort, format };

    if (format) {
      const { data } = await this.http.request<FormatedResponse<T>>({
        method: 'GET',
        url: this.baseUrl,
        params,
      });
      return data;
    }

    const { data } = await this.http.request<T[]>({
      method: 'GET',
      url: this.baseUrl,
    });
    return data;
  }

  /**
   * @description Get an record by its ID.
   * @param {number} id 
   * @returns {Promise<T>}
   */
  async getById(id: number): Promise<T> {
    const { data } = await this.http.request<T>({
      method: 'GET',
      url: `${this.baseUrl}/${id}`,
    });

    return data;
  }

  /**
   * @description Delete an record by its ID.
   * @param {number} id 
   * @returns {Promise<T>} - Deleted record.
   */
  async remove(id: number): Promise<T> {
    const { data } = await this.http.request<T>({
      method: 'DELETE',
      url: `${this.baseUrl}/${id}`,
    });

    return data;
  }
}