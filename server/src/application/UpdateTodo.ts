import { TodoRepository } from "../domain/repositories/TodoRepository";
import { NotFoundError } from "../shared/helpers/Errors";
import { TodoStatus } from "../shared/types/TodoTypes";

/**
 * Service to handle updates to a specific To-Do item.
 */
export class UpdateTodo {
  constructor(private repository: TodoRepository) {}

  /**
   * Updates the properties of a specific To-Do item.
   *
   * @param todoId - The unique identifier of the To-Do item to update.
   * @param updates - An object containing the properties to update.
   * @param updates.content - (Optional) The new content or description for the To-Do.
   * @param updates.status - (Optional) The new status of the To-Do ("Unfinished" or "Done").
   * @param updates.dueDate - (Optional) The new due date for the To-Do.
   *
   * @throws NotFoundError - If no To-Do item with the specified ID exists.
   * @returns A promise that resolves when the update is complete.
   */
  async execute(
    todoId: string,
    updates: { content?: string; status?: TodoStatus; dueDate?: Date },
  ): Promise<void> {
    // Attempt to find the To-Do item by ID
    const todo = await this.repository.findById(todoId);

    // Throw an error if the To-Do item does not exist
    if (!todo) throw new NotFoundError("To-Do item not found.");

    // Call the `update` method on the rehydrated `Todo` instance
    todo.update(updates);

    // Save the updated entity back to the repository
    await this.repository.update(todo);
  }
}
