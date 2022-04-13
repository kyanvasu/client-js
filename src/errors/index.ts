export { default as AuthenticationError } from './authentication'

export enum HttpErrors {
  Unauthorized = 401,
  NotFound = 404,
  UnprocessableEntity = 422,
  InternalServerError = 500,
}