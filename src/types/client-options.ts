export interface ClientOptions {
  appKey: string;
  baseUrl: string;
  headers?: Record<string, string>;
  domain?: string;
  storage?: Storage;
  tokenKey?: string;
  refreshTokenKey?: string;
}

export default ClientOptions;