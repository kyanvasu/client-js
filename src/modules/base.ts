import HttpClient from "core/http-client";

export default class Base {
  http: HttpClient;

  constructor(httpClient: HttpClient) {
    this.http = httpClient;
  }
}