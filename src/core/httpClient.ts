import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import ClientOptions from '../types/clientOptions';
import AuthenticationError from '../errors/authenticationError';
import TokenProvider from '../core/tokenProvider';

export default class HttpClient {
  readonly http: AxiosInstance;
  readonly tokenProvider: TokenProvider | undefined;

  constructor(options: ClientOptions, tokenProvider?: TokenProvider) {
    this.http = axios.create({
      baseURL: options.endpoint,
    });
    this.tokenProvider = tokenProvider;
  }

  async request<T>(config: AxiosRequestConfig, isAuthorized = true): Promise<T> {
    const requestConfig = this.getRequestConfig(config, isAuthorized);
    const { data } = await this.http.request(requestConfig).catch((error) => {
      throw new AuthenticationError(error);
    });

    return data;
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