import { Todo } from "../domain/entities/Todo";
import { TodoRepository } from "../domain/repositories/TodoRepository";
import { NotFoundError } from "../shared/helpers/Errors";

/**
 * Service to handle retrieval of a specific To-Do item by ID.
 */
export class GetTodo {
  constructor(private repository: TodoRepository) {}

  /**
   * Retrieves a To-Do item by its unique identifier.
   *
   * @param todoId - The unique identifier of the To-Do item to retrieve.
   *
   * @returns The requested To-Do item if found.
   *
   * @throws NotFoundError - If no To-Do item with the specified ID exists.
   */
  async execute(todoId: string): Promise<Todo> {
    // Attempt to find the To-Do item by ID
    const todo = await this.repository.findById(todoId);

    // Throw an error if the To-Do item does not exist
    if (!todo) {
      throw new NotFoundError("To-Do item not found.");
    }

    // Return the found To-Do item
    return todo;
  }
}
