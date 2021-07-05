export default class TokenProvider {
  private token = '';

  setToken(token: string): void {
    this.token = token;
  }

  getToken(): string {
    return this.token;
  }
}