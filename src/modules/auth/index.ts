import HttpClient from 'core/http-client';
import TokenProvider from 'core/token-provider';
import Base from 'modules/base';
import LoginResponse from 'types/login-response.interface';

type AuthEvents = {
  loggedIn: (data: LoginResponse) => void;
  loggedOut: () => void;
};

export default class Auth extends Base<AuthEvents> {
  tokenProvider: TokenProvider;

  constructor(http: HttpClient, tokenProvider: TokenProvider) {
    super(http);
    this.tokenProvider = tokenProvider;
  }

  async login(email: string, password: string): Promise<LoginResponse> {
    const { data } = await this.http.request<LoginResponse>({
      url: '/auth',
      method: 'POST',
      data: {
        email,
        password
      }
    });

    this.tokenProvider.setToken(data.token);
    this.emit('loggedIn', data);

    return data;
  }

  async logout(): Promise<void> {
    await this.http.request({
      url: 'auth/logout',
      method: 'PUT',
    });

    this.tokenProvider.removeToken();
    this.emit('loggedOut');
  }
}