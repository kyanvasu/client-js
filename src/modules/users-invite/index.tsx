import HttpClient from "core/http-client";
import { UserInviteInterface } from "index";
import Module from "modules/module";

export default class UserInvite extends Module<UserInviteInterface> {
  constructor(http: HttpClient) {
    super(http, '/users-invite')
  }
}