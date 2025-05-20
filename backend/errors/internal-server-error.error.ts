import { HttpError } from "./http.error";

export class InternalServerError extends HttpError {
  constructor(message?: string, cause?: ErrorOptions) {
    super(500, message ?? "Internal Server Error", { cause });
  }
}