import { Request, Response, NextFunction } from "express";
import { CustomError } from "./Errors";

export function errorHandler(
  error: CustomError,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const status = error.status || 500; // Default to 500 if status is not provided
  const message = error.message || "An unexpected error occurred.";

  res.status(status).json({
    status: "error",
    message,
  });
  return;
}
