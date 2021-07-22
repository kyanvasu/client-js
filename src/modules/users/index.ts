/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/camelcase */
/**
 * Kanvas SDK Users Module
 * Samuel J. Mancebo
 * 2021-07-06
 */
import Module from 'modules/module';
import HttpClient from 'core/http-client';
import { UserInterface, CreatedUser } from 'types/user.interface';

/**
 * @description Kanvas Users Module
 */
export default class Users extends Module<UserInterface> {
  constructor(http: HttpClient) {
    super(http, '/users');
  }

  /**
   * @description Create a user.
   * @param {<T>} userData - Data to be posted for creating the user.
   * @returns {Promise<T>} - Newly created user.
   */
  async create(userData: UserInterface): Promise<UserInterface> {
    const { data } = await this.http.request<CreatedUser>({
      method: 'POST',
      url: this.baseUrl,
      data: userData
    });

    return data.user;
  }
}