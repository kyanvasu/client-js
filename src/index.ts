import ClientOptions from './types/clientOptions';
import Auth from './modules/auth';
import TokenProvider from './core/tokenProvider';
import HttpClient from 'core/httpClient';

export default class KanvasSDK {
  public readonly tokenProvider: TokenProvider;
  public readonly auth: Auth;
  public readonly http: HttpClient;

  constructor(options: ClientOptions) {
    this.tokenProvider = new TokenProvider(options.domain);
    this.http = new HttpClient(options, this.tokenProvider);
    this.auth = new Auth(this.http, this.tokenProvider);
  }
}
