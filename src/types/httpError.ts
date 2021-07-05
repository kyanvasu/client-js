type HttpError = {
  readonly data: Array<null>;
  readonly type: string;
  readonly message: string;
};

export default HttpError;