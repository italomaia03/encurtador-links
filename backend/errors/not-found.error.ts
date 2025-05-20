import { HttpError } from "./http.error";

export class NotFoundError extends HttpError {
  constructor(message?: string, cause?: ErrorOptions) {
    super(404, message ?? "Not Found Error", { cause });
  }

}