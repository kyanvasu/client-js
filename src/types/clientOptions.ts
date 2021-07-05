export interface ClientOptions {
  appKey: string;
  baseUrl: string;
  headers?: Record<string, string>;
  domain?: string;
  cookies?: boolean;
}

export default ClientOptions;