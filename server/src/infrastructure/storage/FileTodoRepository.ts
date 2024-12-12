import fs from "fs/promises";
import path from "path";

import { Todo } from "../../domain/entities/Todo";
import { TodoRepository } from "../../domain/repositories/TodoRepository";
import { NotFoundError } from "../../shared/helpers/Errors";
import { FileError } from "../../shared/types/TodoTypes";

const FILE_PATH = path.resolve(__dirname, "../data/todos.json");

/**
 * Implementation of the TodoRepository interface using a file-based storage system.
 * Manages persistence and retrieval of To-Do items in a JSON file.
 */
export class FileTodoRepository implements TodoRepository {

  constructor() {
    // Ensure the file exists when the repository is instantiated
    this.fileExists();
  }

  /**
   * Ensures that the file for storing To-Do items exists.
   * If it doesn't, creates a new file with an empty array.
   */
  private async fileExists(): Promise<void> {
    try {
      // Check if the file exists
      await fs.access(FILE_PATH);
    } catch {
      // If the file does not exist, create it with an empty array
      await fs.writeFile(FILE_PATH, JSON.stringify([], null, 2), "utf-8");
    }
  }

  /**
   * Loads all To-Do items from the file.
   *
   * @returns A promise that resolves to an array of To-Do items.
   * @throws FileError - If there is an issue reading the file, except when the file is not found (ENOENT).
   */
  private async loadTodos(): Promise<Todo[]> {
    try {
      const data = await fs.readFile(FILE_PATH, "utf-8");
      const todos = JSON.parse(data);
      // Rehydrate plain objects into Todo instances
      return todos.map(
        (todo: Todo) =>
          new Todo(
            todo.id,
            todo.content,
            new Date(todo.dueDate),
            new Date(todo.createdAt),
            new Date(todo.updatedAt),
            todo.status,
          ),
      );
    } catch (err: unknown) {
      const error = err as FileError;
      // Return an empty array if the file does not exist
      if (error.code === "ENOENT") return [];
      throw err;
    }
  }

  /**
   * Saves all To-Do items to the file.
   *
   * @param todos - The array of To-Do items to save.
   * @returns A promise that resolves when the file is successfully written.
   */
  private async saveTodos(todos: Todo[]): Promise<void> {
    await fs.writeFile(FILE_PATH, JSON.stringify(todos, null, 2));
  }

  /**
   * Adds a new To-Do item to the file.
   *
   * @param todo - The To-Do item to create.
   * @returns A promise that resolves when the To-Do is successfully added.
   */
  async create(todo: Todo): Promise<void> {
    const todos = await this.loadTodos();
    todos.push(todo);
    await this.saveTodos(todos);
  }

  /**
   * Retrieves all To-Do items, sorted by creation date (latest first).
   *
   * @returns A promise that resolves to an array of To-Do items.
   */
  async findAll(): Promise<Todo[]> {
    const todos = await this.loadTodos();
    // Sort by createdAt in descending order
    return todos.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  /**
   * Finds a specific To-Do item by its unique identifier.
   *
   * @param id - The unique identifier of the To-Do item to find.
   * @returns A promise that resolves to the found To-Do item or `null` if not found.
   */
  async findById(id: string): Promise<Todo | null> {
    const todos = await this.loadTodos();
    return todos.find((todo) => todo.id === id) || null;
  }

  /**
   * Updates an existing To-Do item.
   *
   * @param todo - The To-Do item with updated properties.
   * @returns A promise that resolves when the update is successful.
   * @throws NotFoundError - If the To-Do item with the specified ID is not found.
   */
  async update(todo: Todo): Promise<void> {
    const todos = await this.loadTodos();
    const index = todos.findIndex((t) => t.id === todo.id);
    if (index === -1) {
      throw new NotFoundError("To-Do item not found.");
    }
    // Replace the existing item with the updated one
    todos[index] = todo;
    await this.saveTodos(todos);
  }

  /**
   * Deletes a specific To-Do item by its unique identifier.
   *
   * @param todoId - The unique identifier of the To-Do item to delete.
   * @returns A promise that resolves when the deletion is successful.
   */
  async delete(todoId: string): Promise<void> {
    const todos = await this.loadTodos();
    // Filter out the To-Do item with the specified ID
    const filteredTodos = todos.filter((todo) => todo.id !== todoId);
    await this.saveTodos(filteredTodos);
  }
}
