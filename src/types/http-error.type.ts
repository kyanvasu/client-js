/* eslint-disable @typescript-eslint/no-explicit-any */
type HttpError = {
  readonly type: string;
  readonly message: string;
  readonly data: any[];
};

export default HttpError;