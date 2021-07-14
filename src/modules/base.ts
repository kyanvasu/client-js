import HttpClient from "core/http-client";

export default class Base {
  protected readonly http: HttpClient;

  constructor(httpClient: HttpClient) {
    this.http = httpClient;
  }
}