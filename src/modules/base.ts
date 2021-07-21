import HttpClient from 'core/http-client';

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

  /**
   * @description Create a record.
   * @param {<K>} postData - Data to be posted for creating the record.
   * @returns {Promise<T>} - Newly created record.
   */
  async create<T, K>(postData: K): Promise<T> {
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
  async update<T>(id: number, putData: T): Promise<T> {
    const { data } = await this.http.request<T>({
      method: 'PUT',
      url: `${this.baseUrl}/${id}`,
      data: putData,
    });

    return data;
  }

  /**
   * @description Get an record by its ID.
   * @param {number} id 
   * @returns {Promise<T>}
   */
  async getById<T>(id: number): Promise<T> {
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
  async remove<T>(id: number): Promise<T> {
    const { data } = await this.http.request<T>({
      method: 'DELETE',
      url: `${this.baseUrl}/${id}`,
    });

    return data;
  }
}