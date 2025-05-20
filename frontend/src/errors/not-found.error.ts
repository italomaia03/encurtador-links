export class NotFoundError extends Error {
  private _code: number;
  constructor(message: string) {
    super(message);
    this.name = "NotFoundError";
    this._code = 404;
  }

  get code(): number {
    return this._code;
  }
}