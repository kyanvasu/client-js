import Base from './base';
import HttpClient from 'core/http-client';
import { FormatedResponse } from 'types/formated-response.interface';
import { DEFAULT_PAGINATION_ARGUMENT, FindPaginationArgument, PaginationArgument } from 'types/pagination-argument';
import { AttachFile, File } from 'types/file.interface';

export default class Module<T, K = void> extends Base {
  constructor(httpClient: HttpClient, baseUrl: string) {
    super(httpClient, baseUrl);
  }

  /**
   * @description Create a record.
   * @param {<T | K>} postData - Data to be posted for creating the record.
   * @returns {Promise<T>} - Newly created record.
   */
  async create(postData: T | K): Promise<T> {
    const { data } = await this.http.request<T>({
      method: 'POST',
      url: this.baseUrl,
      data: postData
    });

    return data;
  }

  /**
   * @description Updates a record by its ID (differencial update).
   * @param {number|string} id - ID to perform the update.
   * @param {K} putData - An object with the update changes to perform to the record.
   * @returns {Promise<T>} - Updated record.
   */
  async update(id: number | string, putData: T): Promise<T> {
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
    return this.gettable<T>(this.baseUrl, pagination);
  }

  /**
   * @description Get an record by its ID.
   * @param {number|string} id 
   * @returns {Promise<T>}
   */
  async getById(id: number | string): Promise<T>;
  /**
   * @description Get an record by its ID and params.
   * @param {number|string} id 
   * @param {FindPaginationArgument} params 
   * @returns {Promise<T>}
   */
  async getById(id: number | string, params?: FindPaginationArgument): Promise<T> {
    const { data } = await this.http.request<T>({
      method: 'GET',
      url: `${this.baseUrl}/${id}`,
      params,
    });

    return data;
  }

  /**
   * @description Delete an record by its ID.
   * @param {number|string} id 
   * @returns {Promise<T>} - Deleted record.
   */
  async remove(id: number | string): Promise<T> {
    const { data } = await this.http.request<T>({
      method: 'DELETE',
      url: `${this.baseUrl}/${id}`,
    });

    return data;
  }
  
  /**
   * @description Adds a file to the current entity.
   * @param {number|string} id 
   * @param {AttachFile[]} attachments
   * @returns {Promise<T>} - Updated record.
   */
  async addFile(id: number | string, attachments: AttachFile[]): Promise<T> {
    const { data } = await this.http.request<T>({
      method: 'PUT',
      url: `${this.baseUrl}/${id}`,
      data: {
        files: attachments.map(attach => ({ ...attach, id: attach.id || id}))
      }
    });

    return data;
  }

  /**
   * @description Removes a file from the current entity.
   * @param {number|string} id 
   * @param {File[]} files 
   * @returns {Promise<T>} - Updated record.
   */
  async removeFile(id: number | string, files: File[]): Promise<T> {
    const { data } = await this.http.request<T>({
      method: 'PUT',
      url: `${this.baseUrl}/${id}`,
      data: {
        // eslint-disable-next-line @typescript-eslint/camelcase
        files: files.map(file => ({ ...file, is_deleted: 1, }))
      }
    });

    return data;
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