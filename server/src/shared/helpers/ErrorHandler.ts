import { Request, Response } from "express";
import { CustomError } from "./Errors";

/**
 * Middleware to handle errors globally in the Express application.
 * Converts thrown errors into standardized HTTP responses.
 *
 * @param error - The error object, which may be an instance of `CustomError` or a general error.
 * @param req - The incoming HTTP request.
 * @param res - The outgoing HTTP response.
 */
export function errorHandler(error: CustomError, req: Request, res: Response) {
  // Determine the HTTP status code to return (default to 500 for server errors)
  const status = error.status || 500;

  // Determine the error message to return (default to a generic message)
  const message = error.message || "An unexpected error occurred.";

  res.status(status).json({
    status: "error",
    message,
  });

  return;
}
