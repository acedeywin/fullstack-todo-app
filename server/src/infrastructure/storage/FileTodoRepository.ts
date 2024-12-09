import fs from "fs/promises";
import path from "path";

import { Todo } from "../../domain/entities/Todo";
import { TodoRepository } from "../../domain/repositories/TodoRepository";
import { FileError, NotFoundError } from "../../shared/helpers/Errors";

const FILE_PATH = path.resolve(__dirname, "../data/todos.json");


export class FileTodoRepository implements TodoRepository {
  private async loadTodos(): Promise<Todo[]> {
    try {
      const data = await fs.readFile(FILE_PATH, "utf-8");
      const todos = JSON.parse(data);
      return todos.map(
        (todo: Todo) =>
          new Todo(todo.id, todo.content, new Date(todo.dueDate), new Date(todo.createdAt), new Date(todo.updatedAt), todo.status),
      ); // Rehydrate objects as Todo instances
    } catch (err: unknown) {
      const error = err as FileError;
      if (error.code === "ENOENT") return [];
      throw err;
    }
  }

  private async saveTodos(todos: Todo[]): Promise<void> {
    await fs.writeFile(FILE_PATH, JSON.stringify(todos, null, 2));
  }

  async create(todo: Todo): Promise<void> {
    const todos = await this.loadTodos();
    todos.push(todo);
    await this.saveTodos(todos);
  }

  async findAll(): Promise<Todo[]> {
    return this.loadTodos();
  }

  async findById(id: string): Promise<Todo | null> {
    const todos = await this.loadTodos();
    return todos.find((todo) => todo.id === id) || null;
  }

  async update(todo: Todo): Promise<void> {
    const todos = await this.loadTodos();
    const index = todos.findIndex((t) => t.id === todo.id);
    if (index === -1) {
      throw new NotFoundError("To-Do item not found.");
    }
    todos[index] = todo;
    await this.saveTodos(todos);
  }

  async delete(todoId: string): Promise<void> {
    const todos = await this.loadTodos();
    const filteredTodos = todos.filter((todo) => todo.id !== todoId);
    await this.saveTodos(filteredTodos);
  }
}
