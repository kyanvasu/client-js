/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * @description Custom error interface for API errors.
 */
export default interface HttpError {
  readonly type: string;
  readonly message: string;
  readonly data: any[];
}