import { EventEmitter, DefaultEventMap } from 'tsee';
import HttpClient from "core/httpClient";
import TokenProvider from "core/tokenProvider";

export default class Base<T extends DefaultEventMap> extends EventEmitter<T> {
  http: HttpClient;
  tokenProvider: TokenProvider;

  constructor() {
    super();
    this.http = new HttpClient({ endpoint: '', appKey: '' });
    this.tokenProvider = new TokenProvider();
  }
}