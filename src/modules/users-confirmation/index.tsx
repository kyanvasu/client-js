import HttpClient from "core/http-client";
import Base from "modules/base";
import { UserInterface } from "types/user.interface";
import { CreateUserConfirmation, UserValidate } from "types/users-confirmation.interface";

export default class UsersConfirmation extends Base {
  constructor (http: HttpClient) {
    super(http, 'users-confirmation');
  }

  /**
   * @description creates a user to be confirmed
   * @param {CreateUserConfirmation} data User data to be use on the creation
   * @returns {Promise<UserInterface>} branch new user 
   */
  async create(data: CreateUserConfirmation): Promise<UserInterface> {
    const result = await this.http.request<UserInterface>({
      method: 'POST',
      url: this.baseUrl,
      data
    });

    return result.data;
  }

  /**
   * @description base on the current user's activation key retrieve the user data
   * @param {string} activationKey Current user activation key
   * @returns {Promise<UserValidate>} current user data
   */
  async validate(activationKey: string): Promise<UserValidate> {
    const result = await this.http.request<UserValidate>({
      method: 'GET',
      url: `${this.baseUrl}/validate/${activationKey}`,
    });

    return result.data;
  }
  
  /**
   * @description base on the current user's activation key and password generates a usable user
   * @param {string} activationKey Current user activation key
   * @param {string} password new password for the user
   * @returns {Promise<UserInterface>} current user data
   */
  async confirm(activationKey: string, password: string): Promise<UserInterface> {
    const result = await this.http.request<UserInterface>({
      method: 'POST',
      url: `${this.baseUrl}/${activationKey}`,
      data: { password }
    });

    return result.data;
  }
}