import TokenProvider from 'core/token-provider';
import HttpClient from 'core/http-client';
import Auth from 'modules/auth';
import ClientOptions from 'types/client-options';
import Application from 'modules/application';
import Users from 'modules/users';

export default class KanvasSDK {
  public readonly http: HttpClient;
  public readonly tokenProvider: TokenProvider;
  public readonly auth: Auth;
  public readonly application: Application;
  public readonly users: Users;

  constructor(options: ClientOptions) {
    this.tokenProvider = new TokenProvider(options);
    this.http = new HttpClient(options, this.tokenProvider);
    this.auth = new Auth(this.http, this.tokenProvider);
    this.application = new Application(this.http);
    this.users = new Users(this.http);
  }
}
