import TokenProvider from 'core/token-provider';
import HttpClient from 'core/http-client';
import Auth from 'modules/auth';
import ClientOptions from 'types/client-options';
import Application from 'modules/application';
import Users from 'modules/users';
import Companies from 'modules/companies';
import FileSystem from 'modules/filesystem';
import Roles from 'modules/roles';

// Export interface and types definitions.
export * from './types/';

export default class KanvasSDK {
  public readonly http: HttpClient;
  public readonly tokenProvider: TokenProvider;
  public readonly auth: Auth;
  public readonly application: Application;
  public readonly users: Users;
  public readonly companies: Companies;
  public readonly filesystem: FileSystem;
  public readonly roles: Roles;

  constructor(options: ClientOptions) {
    this.tokenProvider = new TokenProvider(options);
    this.http = new HttpClient(options, this.tokenProvider);
    this.auth = new Auth(this.http, this.tokenProvider);
    this.application = new Application(this.http);
    this.users = new Users(this.http);
    this.companies = new Companies(this.http);
    this.filesystem = new FileSystem(this.http);
    this.roles = new Roles(this.http);
  }
}
