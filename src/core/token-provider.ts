import ClientOptions from 'types/client-options';
import KanvasStorage from 'types/storage.interface';
import { KANVAS_SDK_TOKEN, KANVAS_SDK_REFRESH_TOKEN } from './constants';

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

  setToken(token: string, options?: object): void {
    this.token = token;
    this.storage.setItem(this.tokenKey, token, options);
  }

  setRefreshToken(token: string, options?: object): void {
    this.refreshToken = token;
    this.storage.setItem(this.refreshTokenKey, token, options);
  }

  getToken(): string {
    return this.token;
  }

  getRefreshToken(): string {
    return this.refreshToken;
  }

  removeToken(): void {
    this.token = '';
    this.refreshToken = '';
    this.storage.removeItem(this.tokenKey);
    this.storage.removeItem(this.refreshTokenKey);
  }
}