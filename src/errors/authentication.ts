import { AxiosError } from "axios";
import HttpError from "types/http-error.type";

/**
 * @description Custom error class for authentication errors.
 *
 * @class AuthenticationError
 * @extends {Error}
 */
class AuthenticationError extends Error {
  readonly errors: HttpError;
  readonly code: string | undefined;
  readonly original: AxiosError;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  readonly message: any;

  constructor(error: AxiosError) {
    super();

    this.errors = error.response?.data.errors || {};
    this.original = error;
    this.code = error.code;
    this.message = error.message;
  }
}

export default AuthenticationError;