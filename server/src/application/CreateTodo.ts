import { Todo } from "../domain/entities/Todo";
import { TodoRepository } from "../domain/repositories/TodoRepository";
import { v4 as uuid } from "uuid";

/**
 * Service to create a new To-Do item.
 */
export class CreateTodo {
  constructor(private repository: TodoRepository) {}

  /**
   * Executes the creation of a new To-Do item.
   *
   * @param payload - The data required to create a new To-Do item.
   * @param payload.content - The content or description of the To-Do.
   * @param payload.dueDate - The due date for completing the To-Do.
   * @param payload.createdAt - The timestamp when the To-Do was created.
   * @param payload.updatedAt - The timestamp when the To-Do was last updated.
   *
   * @throws Will throw an error if the repository fails to save the To-Do.
   */
  async execute(payload: Todo): Promise<void> {
    const { content, dueDate, createdAt, updatedAt } = payload;
    const id = uuid(); // Generate a unique identifier for the To-Do item
    const todo = new Todo(id, content, dueDate, createdAt, updatedAt);
    await this.repository.create(todo); // Save the new To-Do item in the repository
  }
}
