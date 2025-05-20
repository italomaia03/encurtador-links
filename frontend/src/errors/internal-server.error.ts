export class InternalServerError extends Error {
  private _code: number;
  constructor(message: string) {
    super(message);
    this.name = "InternalServerError";
    this._code = 500;
  }

  get code(): number {
    return this._code;
  }
}