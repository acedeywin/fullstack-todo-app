import { Router } from "express";
import { TodoController } from "../controllers/TodoController";
import {
  validateTodoCreation,
  validateTodoUpdate,
} from "../middleware/TodoMiddleware";

const todoRoutes = Router();

// Create a new To-Do
todoRoutes.post("/", validateTodoCreation, TodoController.createTodo);

// Get all To-Dos
todoRoutes.get("/", TodoController.getTodos);

// Get a To-Do by Id
todoRoutes.get("/:id", TodoController.getTodo);

// Update a specific To-Do
todoRoutes.put("/:id", validateTodoUpdate, TodoController.updateTodo);

// Delete a specific To-Do
todoRoutes.delete("/:id", TodoController.deleteTodo);

export default todoRoutes;
