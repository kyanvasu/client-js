import HttpClient from "core/http-client";
import { UserInviteInterface, UserInviteHashInterface, ProcessUserInvite } from "types/user-invite.interface";
import Module from "modules/module";
import { CreatedUser } from "types/user.interface";

export default class UserInvite extends Module<UserInviteInterface> {
  constructor(http: HttpClient) {
    super(http, '/users-invite')
  }

  /**
   * @description process the user invite information and create a brand new user
   * @param {string} hash - unique code to submit the user 
   * @param {CreateUserInvite} user - user invite info to be store 
   * @returns {UserInterface}
   */
  async process(hash: string, user: ProcessUserInvite): Promise<CreatedUser> {
    const { data } = await this.http.request<CreatedUser>({
      url: `${this.baseUrl}/${hash}`,
      method: 'POST',
      data: user,
    });

    return data;
  }

  /**
   * @description fetch an invite user base on the hash and user invite
   * @param {string} hash  - unique code to find the user
   * @returns {UserInviteInterface | UserInviteHashInterface}
   */
  async getByHash(hash: string): Promise<UserInviteInterface | UserInviteHashInterface> {
    const { data } = await this.http.request<UserInviteInterface | UserInviteHashInterface>({
      url: `${this.baseUrl}/validate/${hash}`,
      method: 'GET'
    });
    
    return data;
  }

  /**
   * @description Resend an invitation to a created user
   * @param {number|string} id user invitation id to resend the message
   * @returns {Promise<string>}
   */
  async resend(id: number | string): Promise<string> {
    const { data } =  await this.http.request<string>({
      url: `${this.baseUrl}/${id}/resend`,
      method: 'POST'
    })

    return data;
  }
}