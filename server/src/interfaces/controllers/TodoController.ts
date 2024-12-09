import { Request, Response, NextFunction } from "express";
import { FileTodoRepository } from "../../infrastructure/storage/FileTodoRepository";
import { CreateTodo } from "../../application/CreateTodo";
import { GetTodos } from "../../application/GetTodos";
import { UpdateTodo } from "../../application/UpdateTodo";
import { DeleteTodo } from "../../application/DeleteTodo";
import { GetTodo } from "../../application/GetTodo";
import { Todo } from "../../domain/entities/Todo";

const repository = new FileTodoRepository();

export class TodoController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { content, dueDate } = req.body;

      const payload = {
        content, 
        dueDate: new Date(dueDate), 
        createdAt: new Date(),
        updatedAt: new Date(),
      } as Todo

      const useCase = new CreateTodo(repository);
      await useCase.execute(payload);

      res.status(201).json({ message: "To-Do created successfully." });
      return;
    } catch (error) {
      next(error);
    }
  }

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

  static async update(req: Request, res: Response, next: NextFunction) {
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

  static async delete(req: Request, res: Response, next: NextFunction) {
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
