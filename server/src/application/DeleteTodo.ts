import { TodoRepository } from "../domain/repositories/TodoRepository";
import { NotFoundError } from "../shared/helpers/Errors";

/**
 * Service to handle the deletion of a To-Do item.
 */
export class DeleteTodo {
  constructor(private repository: TodoRepository) {}

  /**
   * Executes the deletion of a specific To-Do item.
   *
   * @param todoId - The unique identifier of the To-Do item to be deleted.
   *
   * @throws NotFoundError - If the To-Do item with the specified ID is not found.
   * @returns A promise that resolves when the deletion is complete.
   */
  async execute(todoId: string): Promise<void> {
    // Attempt to find the To-Do item by ID
    const todo = await this.repository.findById(todoId);

    // Throw an error if the To-Do item does not exist
    if (!todo) {
      throw new NotFoundError("To-Do item not found.");
    }

    // Proceed with deletion if the To-Do item exists
    await this.repository.delete(todoId);
  }
}
