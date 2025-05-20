export class HttpError extends Error {
  protected _code: number;

  constructor(code: number, message?: string, cause?: ErrorOptions) {
    super(message, cause);
    this._code = code;
  }

  get code(): number {
    return this._code;
  }
}