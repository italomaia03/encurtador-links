import { NextFunction, Request, Response } from "express";
import { HttpError } from "../errors/http.error";

export const ErrorHandler = (error: HttpError, _req: Request, res: Response, _next: NextFunction) => {
  const status = error.code ?? 500;
  const message = error.message ?? "Internal Server Error";
  const cause = error.cause;
  console.error(cause);

  res.status(error.code).json({ status, message })
}