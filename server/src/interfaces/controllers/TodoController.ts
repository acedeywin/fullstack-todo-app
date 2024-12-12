import { Request, Response, NextFunction } from "express";
import { FileTodoRepository } from "../../infrastructure/storage/FileTodoRepository";
import { CreateTodo } from "../../application/CreateTodo";
import { GetTodos } from "../../application/GetTodos";
import { UpdateTodo } from "../../application/UpdateTodo";
import { DeleteTodo } from "../../application/DeleteTodo";
import { GetTodo } from "../../application/GetTodo";
import { Todo } from "../../domain/entities/Todo";

// Initialize the file-based repository for managing To-Do items
const repository = new FileTodoRepository();

/**
 * Controller for handling HTTP requests related to To-Do operations.
 * Acts as the interface layer between the client and application use cases.
 */
export class TodoController {
  /**
   * Handles the creation of a new To-Do item.
   *
   * @param req - The incoming HTTP request containing the To-Do data in the body.
   * @param res - The HTTP response to be sent back to the client.
   * @param next - Middleware function for error handling.
   */
  static async createTodo(req: Request, res: Response, next: NextFunction) {
    try {
      const { content, dueDate } = req.body;

      const payload = {
        content,
        dueDate: new Date(dueDate),
        createdAt: new Date(),
        updatedAt: new Date(),
      } as Todo;

      const useCase = new CreateTodo(repository);
      await useCase.execute(payload);

      res.status(201).json({ message: "To-Do created successfully." });
      return;
    } catch (error) {
      next(error);
    }
  }

  /**
   * Retrieves all To-Do items.
   *
   * @param req - The incoming HTTP request.
   * @param res - The HTTP response containing the list of To-Do items.
   * @param next - Middleware function for error handling.
   */
  static async getTodos(req: Request, res: Response, next: NextFunction) {
    try {
      const useCase = new GetTodos(repository);
      const todos = await useCase.execute();

      res.status(200).json({
        status: "success",
        message: "To-Dos fetched successfully",
        data: todos,
      });
      return;
    } catch (error) {
      next(error);
    }
  }

  /**
   * Retrieves a single To-Do item by its ID.
   *
   * @param req - The incoming HTTP request containing the To-Do ID in the params.
   * @param res - The HTTP response containing the requested To-Do item.
   * @param next - Middleware function for error handling.
   */
  static async getTodo(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const useCase = new GetTodo(repository);
      const todo = await useCase.execute(id as string);

      res.status(200).json({
        status: "success",
        message: "To-Do fetched successfully",
        data: todo,
      });
      return;
    } catch (error) {
      next(error);
    }
  }

  /**
   * Updates an existing To-Do item.
   *
   * @param req - The incoming HTTP request containing the To-Do ID in the params and updated data in the body.
   * @param res - The HTTP response indicating the update was successful.
   * @param next - Middleware function for error handling.
   */
  static async updateTodo(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { content, status, dueDate } = req.body;

      const useCase = new UpdateTodo(repository);
      await useCase.execute(id as string, { content, status, dueDate });

      res.status(200).json({ message: "To-Do updated successfully." });
      return;
    } catch (error) {
      next(error);
    }
  }

  /**
   * Deletes a specific To-Do item by its ID.
   *
   * @param req - The incoming HTTP request containing the To-Do ID in the params.
   * @param res - The HTTP response indicating the deletion was successful.
   * @param next - Middleware function for error handling.
   */
  static async deleteTodo(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const useCase = new DeleteTodo(repository);
      await useCase.execute(id as string);

      res.status(200).json({ message: "To-Do deleted successfully." });
      return;
    } catch (error) {
      next(error);
    }
  }
}
