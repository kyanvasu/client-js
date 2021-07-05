import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import createAuthRefreshInterceptor from "axios-auth-refresh";
import { HttpErrors } from 'errors/index';
import AuthenticationError from 'errors/authentication';
import ClientOptions from 'types/client-options';
import TokenProvider from './token-provider';

export default class HttpClient {
  readonly http: AxiosInstance;
  readonly tokenProvider: TokenProvider;

  constructor(options: ClientOptions, tokenProvider: TokenProvider) {
    this.http = axios.create({
      baseURL: options.baseUrl,
    });
    this.setupRefreshInterceptor();
    this.setupResponseInterceptors();
    this.tokenProvider = tokenProvider;
  }

  setupResponseInterceptors(): void {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.http.interceptors.response.use((response: any) => response, (error: AxiosError) => {
      return Promise.reject(this.handleErrors(error));
    });
  }

  setupRefreshInterceptor(): void {
    createAuthRefreshInterceptor(this.http, failedRequest => axios({
      method: "POST",
      url: "/refresh-token",
      data: {
        // eslint-disable-next-line @typescript-eslint/camelcase
        access_token: this.tokenProvider.getToken(),
        // eslint-disable-next-line @typescript-eslint/camelcase
        refresh_token: this.tokenProvider.getRefreshToken()
      }
    }).then(({ data }) => {
      this.tokenProvider.setToken(data.token);
      this.tokenProvider.setRefreshToken(data.refresh_token);
      failedRequest.response.config.headers.Authorization = data.token;
      return Promise.resolve();
    }));
  }

  private handleErrors(error: AxiosError): Error {
    switch(error.response?.status) {
      case HttpErrors.Unauthorized:
        return new AuthenticationError(error);
      // Remove this
      case HttpErrors.NotFound:
        return new AuthenticationError(error);
      default:
        return new Error(error.message);
    }
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