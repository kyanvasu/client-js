export default class TokenProvider {
  private token = '';
  private refreshToken = '';

  constructor(domain?: string) {
    domain;
  }

  setToken(token: string): void {
    this.token = token;
  }

  setRefreshToken(token: string): void {
    this.refreshToken = token;
  }

  getToken(): string {
    return this.token;
  }

  getRefreshToken(): string {
    return this.refreshToken;
  }

  removeToken(): void {
    //
  }
}