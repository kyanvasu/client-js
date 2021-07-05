import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import ClientOptions from '../types/clientOptions';
import TokenProvider from '../core/tokenProvider';

export default class HttpClient {
  readonly http: AxiosInstance;
  readonly tokenProvider: TokenProvider;

  constructor(options: ClientOptions, tokenProvider: TokenProvider) {
    this.http = axios.create({
      baseURL: options.baseUrl,
    });
    this.tokenProvider = tokenProvider;
  }

  request<T>(config: AxiosRequestConfig, isAuthorized = true): Promise<AxiosResponse<T>> {
    const requestConfig = this.getRequestConfig(config, isAuthorized);
    
    return this.http.request<T>(requestConfig);
  }

  getRequestConfig(
    config: AxiosRequestConfig,
    isAuthorized: boolean
  ): AxiosRequestConfig {
    if (isAuthorized) {
      const token = this.tokenProvider?.getToken();
      const userHeaders = config.headers || {};
      const headers = {
        Authorization: token
      };
      config.headers = Object.assign(userHeaders, headers);
    }

    return config;
  }
}