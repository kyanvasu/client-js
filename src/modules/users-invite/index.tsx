import HttpClient from "core/http-client";
import { UserInviteInterface, UserInviteHashInterface } from "index";
import Module from "modules/module";

export default class UserInvite extends Module<UserInviteInterface> {
  constructor(http: HttpClient) {
    super(http, '/users-invite')
  }

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