import HttpClient from "core/http-client";

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
   * @description Create a record for an entity (based defined baseUrl by child).
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
}