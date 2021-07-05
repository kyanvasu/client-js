import ClientOptions from 'types/client-options';
import KanvasStorage from 'types/storage.interface';
import { KANVAS_SDK_TOKEN, KANVAS_SDK_REFRESH_TOKEN } from './constants';

/**
 * @description Token provider is tasked with managing tokens with the defined storage implementation.
 *
 * @class TokenProvider
 */
export default class TokenProvider {
  private token = '';
  private refreshToken = '';
  private storage: KanvasStorage;
  private tokenKey: string;
  private refreshTokenKey: string;

  constructor(options: ClientOptions) {
    this.storage = options.storage || localStorage;
    this.tokenKey = options.tokenKey || KANVAS_SDK_TOKEN;
    this.refreshTokenKey = options.refreshTokenKey || KANVAS_SDK_REFRESH_TOKEN;
  }

  /**
   * Sets the session token on the defined storage implementation.
   *
   * @param {string} token
   * @param {object} [options] - Define cookie specific option overrides.
   */
  setToken(token: string, options?: object): void {
    this.token = token;
    this.storage.setItem(this.tokenKey, token, options);
  }

  /**
   * Sets the session refresh token on the defined storage implementation.
   *
   * @param {string} token
   * @param {object} [options] - Define cookie specific option overrides.
   */
  setRefreshToken(token: string, options?: object): void {
    this.refreshToken = token;
    this.storage.setItem(this.refreshTokenKey, token, options);
  }

  /**
   * Return current session token.
   *
   * @return {string}
   */
  getToken(): string {
    return this.token;
  }

  /**
   * Return current session refresh token.
   *
   * @return {string}
   */
  getRefreshToken(): string {
    return this.refreshToken;
  }

  /**
   * Remove token and refresh tokens from the defined storage implementation.
   */
  removeTokens(): void {
    this.token = '';
    this.refreshToken = '';
    this.storage.removeItem(this.tokenKey);
    this.storage.removeItem(this.refreshTokenKey);
  }
}