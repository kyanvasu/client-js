import { AxiosError } from "axios";
import HttpError from "../types/httpError";

class AuthenticationError extends Error {
  readonly errors: HttpError;
  readonly code: string | undefined;
  readonly original: AxiosError;

  constructor(error: AxiosError) {
    super();

    this.errors = error.response?.data.errors || {};
    this.original = error;
    this.code = error.code;
    this.message = error.message;
  }
}

export default AuthenticationError;
