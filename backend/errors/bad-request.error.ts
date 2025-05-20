import { HttpError } from "./http.error";

export class BadRequestError extends HttpError {
  constructor(message?: string, cause?: ErrorOptions) {
    super(400, message ?? "Not Found Error", { cause });
  }
}