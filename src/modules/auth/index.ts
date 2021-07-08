import HttpClient from 'core/http-client';
import TokenProvider from 'core/token-provider';
import Base from 'modules/base';
import LoginResponse from 'types/login-response.interface';

/**
 * @description Handles all auth related operations.
 *
 * @class Auth
 * @extends {Base}
 */
export default class Auth extends Base {
  tokenProvider: TokenProvider;

  constructor(http: HttpClient, tokenProvider: TokenProvider) {
    super(http);
    this.tokenProvider = tokenProvider;
  }

  /**
   * @description Send login request to API.
   *
   * @param {string} email
   * @param {string} password
   * @return {Promise<LoginResponse>}
   */
  async login(email: string, password: string): Promise<LoginResponse> {
    const { data } = await this.http.request<LoginResponse>({
      url: '/auth',
      method: 'POST',
      data: {
        email,
        password
      }
    });

    // Set token and refresh token if request was successful.
    this.tokenProvider.setToken(data.token);
    this.tokenProvider.setRefreshToken(data.refresh_token);

    return data;
  }

  /**
   * @description Send logout request to API.
   */
  async logout(): Promise<void> {
    await this.http.request({
      url: 'auth/logout',
      method: 'PUT',
    });

    // Remove token and refresh token if request was successful.
    this.tokenProvider.removeTokens();
  }

  /**
   * @description Send forgot password request to API.
   *
   * @param {string} email
   */
  async forgotPassword(email: string): Promise<void> {
    await this.http.request({
      url: '/auth/forgot',
      method: 'POST',
      data: {
        email
      }
    });
  }

  async resetPassword(newPassword: string, verifyPassword: string, code: string): Promise<void> {
    await this.http.request({
      url: `/auth/reset/${code}`,
      method: 'POST',
      data: {
        // eslint-disable-next-line @typescript-eslint/camelcase
        new_password: newPassword,
        // eslint-disable-next-line @typescript-eslint/camelcase
        verify_password: verifyPassword
      }
    });
  }
}