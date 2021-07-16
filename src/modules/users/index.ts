/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/camelcase */
/**
 * Kanvas SDK Users Module
 * Samuel J. Mancebo
 * 2021-07-06
 */
import Base from 'modules/base';
import HttpClient from 'core/http-client';
import UserInterface from 'types/user.interface';
import { KanvasFormatedResponse } from 'types/kanvas-formated-response.interface';
import { PaginationArgument, DEFAULT_PAGINATION_ARGUMENT } from 'types/pagination-argument';
interface CreatedUsed {
  user: UserInterface;
}

/**
 * @description Kanvas Users Module
 */
export default class Users extends Base {
  constructor(http: HttpClient) {
    super(http, '/users');
  }

  /**
   * @description Creates a user (signUp) using email and password
   * @param {string} email 
   * @param {string} password 
   * @param {string} confirmPassword 
   * @returns {Promise<UserInterface>} - New created user
   */
  async create(email: string, password: string, confirmPassword: string): Promise<UserInterface> {
    const { data } = await this.http.request<CreatedUsed>({
      method: 'POST',
      url: this.baseUrl,
      data: {
        email,
        password,
        verify_password: confirmPassword,
      }
    });

    return data.user;
  }

  /**
   * @description Updates a user by its Id (Differencial update)
   * @param {number} userId - User Id to perform the update
   * @param {UserInterface} user - An user object with the update changes to perform to the user
   * @returns {Promise<UserInterface>} - Updated user object
   */
  async update(userId: number, user: UserInterface): Promise<UserInterface> {
    const { data } = await this.http.request<UserInterface>({
      method: 'PUT',
      url: `${this.baseUrl}/${userId}`,
      data: user,
    });

    return data;
  }

  /**
   * @description Get a list of users
   * @returns {Promise<UserInterface[]>}
   */
  async get(): Promise<UserInterface[]>;
  /**
   * @description Get a list of users using pagination argument
   * @param {PaginationArgument} pagination 
   * @returns {Promise<KanvasFormatedResponse<UserInterface>>}
   */
  async get(pagination: PaginationArgument): Promise<KanvasFormatedResponse<UserInterface>>;
  async get(pagination: PaginationArgument = DEFAULT_PAGINATION_ARGUMENT): Promise<any> {
    const { page, limit, sort, format = false } = pagination;
    const params = { page, limit, sort, format };

    if (format) {
      const { data } = await this.http.request<KanvasFormatedResponse<UserInterface>>({
        method: 'GET',
        url: this.baseUrl,
        params,
      });
      return data;
    }

    const { data } = await this.http.request<UserInterface[]>({
      method: 'GET',
      url: this.baseUrl,
    });
    return data;
  }

  /**
   * @description Get an user by its ID
   * @param {number} userId 
   * @returns {Promise<UserInterface>}
   */
  async getById(userId: number): Promise<UserInterface> {
    const { data } = await this.http.request<UserInterface>({
      method: 'GET',
      url: `${this.baseUrl}/${userId}`,
    });

    return data;
  }

  /**
   * @description Delete an user by its ID
   * @param {number} userId 
   * @returns {Promise<UserInterface>} - Deleted user
   */
  async remove(userId: number): Promise<UserInterface> {
    const { data } = await this.http.request<UserInterface>({
      method: 'DELETE',
      url: `${this.baseUrl}/${userId}`,
    });

    return data;
  }
}