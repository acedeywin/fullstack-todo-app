import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { TodoStatus } from "../../shared/types/TodoTypes";
import { BadRequestError } from "../../shared/helpers/Errors";

/**
 * Middleware to validate the creation of a new To-Do item.
 * Ensures that required fields are present and valid.
 */
export const validateTodoCreation = [
  // Validate 'content' field
  body("content").isString().notEmpty().withMessage("Content is required."),

  // Validate 'dueDate' field
  body("dueDate")
    .isISO8601()
    .notEmpty()
    .withMessage("Due date is required.")
    .custom((value) => {
      const today = new Date();
      const inputDate = new Date(value);

      // Normalize dates to ignore the time part
      today.setHours(0, 0, 0, 0);
      inputDate.setHours(0, 0, 0, 0);

      if (inputDate < today) {
        throw new BadRequestError("Due date cannot be in the past.");
      }
      return true;
    }),

  // Final validation result handling
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(403).json({ errors: errors.array() });
        return;
      }
      next();
    } catch (error) {
      next(error);
    }
  },
];

/**
 * Middleware to validate updates to an existing To-Do item.
 * Ensures that optional fields, if provided, are valid.
 */
export const validateTodoUpdate = [
  // Validate 'content' field if present
  body("content")
    .isString()
    .optional()
    .notEmpty()
    .withMessage("Content cannot be empty."),

  // Validate 'status' field if present
  body("status")
    .isString()
    .optional()
    .notEmpty()
    .withMessage("Status cannot be empty.")
    .custom((value) => {
      if (value !== TodoStatus.UNFINISHED && value !== TodoStatus.DONE) {
        throw new BadRequestError("Invalid status value.");
      }
      return true;
    }),

  // Validate 'dueDate' field if present
  body("dueDate")
    .isISO8601()
    .optional()
    .notEmpty()
    .withMessage("Due date cannot be empty.")
    .custom((value) => {
      const today = new Date();
      const inputDate = new Date(value);

      // Normalize dates to ignore the time part
      today.setHours(0, 0, 0, 0);
      inputDate.setHours(0, 0, 0, 0);

      if (inputDate < today) {
        throw new BadRequestError("Due date cannot be in the past.");
      }
      return true;
    }),

  // Final validation result handling
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(403).json({ errors: errors.array() });
        return;
      }
      next();
    } catch (error) {
      next(error);
    }
  },
];
