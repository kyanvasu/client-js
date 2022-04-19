import { HttpClient, TokenProvider } from './core';
import { Application, Auth, Companies, Users, FileSystem, Roles, UserInvite, CompaniesBranches, UserNotifications, Notifications, Subscription, UsersConfirmation } from './modules';
import { ClientOptions } from './types';

// Export interface and types definitions.
export * from './types';
export * from './core';
export * from './modules';
export * from './errors';

export default class KanvasSDK {
  public readonly http: HttpClient;
  public readonly tokenProvider: TokenProvider;
  public readonly auth: Auth;
  public readonly application: Application;
  public readonly users: Users;
  public readonly companies: Companies;
  public readonly filesystem: FileSystem;
  public readonly roles: Roles;
  public readonly userInvite: UserInvite;
  public readonly companiesBranches: CompaniesBranches;
  public readonly userNotifications: UserNotifications;
  public readonly notifications: Notifications;
  public readonly subscription: Subscription;
  public readonly usersConfirmation: UsersConfirmation;

  constructor(options: ClientOptions) {
    this.tokenProvider = new TokenProvider(options);
    this.http = new HttpClient(options, this.tokenProvider);
    this.auth = new Auth(this.http, this.tokenProvider);
    this.application = new Application(this.http);
    this.users = new Users(this.http);
    this.companies = new Companies(this.http);
    this.filesystem = new FileSystem(this.http);
    this.roles = new Roles(this.http);
    this.userInvite = new UserInvite(this.http);
    this.companiesBranches = new CompaniesBranches(this.http);
    this.userNotifications = new UserNotifications(this.http);
    this.notifications = new Notifications(this.http);
    this.subscription = new Subscription(this.http);
    this.usersConfirmation = new UsersConfirmation(this.http);
  }
}
