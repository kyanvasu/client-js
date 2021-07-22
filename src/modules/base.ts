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
}