export default interface ClientOptions {
  /**
   * Set the app key for the Kanvas application.
   */
  appKey: string;
  /**
   * Set the base url for API requests.
   */
  baseUrl: string;
  /**
   * Set the public key for Stripe queries.
   */
  stripePublicKey: string;
  /**
   * Append additional headers to all requests.
   */
  headers?: Record<string, string>;
  /**
   * This defines the storage implementation for use.
   * Can be localStorage, asyncStorage, or any other Storage compatible service.
   */
  storage?: Storage;
  /**
   * Defines the token key name to be used for storage.
   */
  tokenKey?: string;
  /**
   * Defines the refresh token key name to be used for storage.
   */
  refreshTokenKey?: string;
}