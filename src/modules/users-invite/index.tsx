import HttpClient from "core/http-client";
import { UserInviteInterface } from "index";
import Module from "modules/module";

export default class UserInvite extends Module<UserInviteInterface> {
  constructor(http: HttpClient) {
    super(http, '/users-invite')
  }

  async resend(id: number | string): Promise<string> {
    const { data } =  await this.http.request<string>({
      url: `${this.baseUrl}/${id}/resend`,
      method: 'POST'
    })

    return data;
  }
}