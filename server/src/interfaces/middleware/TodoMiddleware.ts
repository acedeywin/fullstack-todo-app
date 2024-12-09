import { NextFunction, Request, Response } from "express";
import { body, param, query, validationResult } from "express-validator";
import { TodoStatus } from "../../shared/types/TodoTypes";
import { BadRequestError } from "../../shared/helpers/Errors";

export const validateTodoCreation = [
  body("content").isString().notEmpty().withMessage("Content is required."),
  body("dueDate")
    .isISO8601()
    .notEmpty()
    .withMessage("Due date is required.")
    .custom((value) => {
      const today = new Date();
      const inputDate = new Date(value);

      // Set time to 00:00:00 for comparison to ignore the time part
      today.setHours(0, 0, 0, 0);
      inputDate.setHours(0, 0, 0, 0);

      if (inputDate < today) {
        throw new BadRequestError("Due date cannot be in the past.");
      }
      return true;
    }),

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

export const validateTodoUpdate = [
  body("content").isString().optional().notEmpty().withMessage("Content cannot be empty."),

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

  body("dueDate")
    .isISO8601()
    .optional()
    .notEmpty()
    .withMessage("Due date cannot be empty.")
    .custom((value) => {
      const today = new Date();
      const inputDate = new Date(value);

      // Set time to 00:00:00 for comparison to ignore the time part
      today.setHours(0, 0, 0, 0);
      inputDate.setHours(0, 0, 0, 0);

      if (inputDate < today) {
        throw new BadRequestError("Due date cannot be in the past.");
      }
      return true;
    }),

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
