import { TodoRepository } from "../domain/repositories/TodoRepository";
import { Todo } from "../domain/entities/Todo";

/**
 * Service to retrieve all To-Do items.
 */
export class GetTodos {
  constructor(private repository: TodoRepository) {}

  /**
   * Retrieves all To-Do items from the repository.
   *
   * @returns A promise that resolves to an array of all To-Do items.
   */
  async execute(): Promise<Todo[]> {
    // Fetch all To-Do items from the repository
    return await this.repository.findAll();
  }
}
