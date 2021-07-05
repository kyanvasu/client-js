/**
 * @description Custom interface for API successful login response.
 */
export default interface LoginResponse {
  token: string;
  refresh_token: string;
  expires: string;
  refresh_token_expires: string;
  id: number;
}