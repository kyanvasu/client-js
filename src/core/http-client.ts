import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import createAuthRefreshInterceptor from "axios-auth-refresh";
import { HttpErrors } from 'errors/index';
import AuthenticationError from 'errors/authentication';
import ClientOptions from 'types/client-options';
import TokenProvider from './token-provider';

/**
 * @description Interface for REST API requests.
 *
 * @export
 * @class HttpClient
 */
export default class HttpClient {
  readonly http: AxiosInstance;
  readonly tokenProvider: TokenProvider;
  readonly options: ClientOptions;

  /**
   * Creates an instance of HttpClient.
   * @param {ClientOptions} options
   * @param {TokenProvider} tokenProvider
   */
  constructor(options: ClientOptions, tokenProvider: TokenProvider) {
    this.http = axios.create({
      baseURL: options.baseUrl,
    });
    this.setupRefreshInterceptor();
    this.setupResponseInterceptors();
    this.tokenProvider = tokenProvider;
    this.options = options;
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

  /**
   * @param {AxiosError} error
   * @return {Error} - Returns error type base on API HTTP Status Code response.
   */
  private handleErrors(error: AxiosError): Error {
    switch(error.response?.status) {
      case HttpErrors.Unauthorized:
        return new AuthenticationError(error);
      // Remove this
      case HttpErrors.NotFound:
        return new AuthenticationError(error);
      // Remove this
      case HttpErrors.UnprocessableEntity:
        return new AuthenticationError(error);
      default:
        return new Error(error.message);
    }
  }

  /**
   * @param {AxiosRequestConfig} config
   * @param {boolean} [isAuthorized=true]
   * @return {Promise<AxiosResponse<T>>} - Returns response type based on provided generic type.
   */
  request<T>(config: AxiosRequestConfig, isAuthorized: boolean = true): Promise<AxiosResponse<T>> {
    const requestConfig = this.getRequestConfig(config, isAuthorized);
    
    return this.http.request<T>(requestConfig);
  }

  /**
   * @description Returns axios configuration with optional authentication header.
   *
   * @param {AxiosRequestConfig} config
   * @param {boolean} isAuthorized
   * @return {AxiosRequestConfig}
   */
  getRequestConfig(config: AxiosRequestConfig, isAuthorized: boolean): AxiosRequestConfig {
    if (isAuthorized) {
      // Add required authorization tokens to the request.
      const token = this.tokenProvider.getToken();
      const userHeaders = config.headers || {};
      const headers = {
        Authorization: token
      };
      config.headers = Object.assign(userHeaders, headers);
    }

    return config;
  }
}