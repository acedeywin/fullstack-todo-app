import { TodoRepository } from "../domain/repositories/TodoRepository";
import { NotFoundError } from "../shared/helpers/Errors";
import { TodoStatus } from "../shared/types/TodoTypes";

export class UpdateTodo {
  constructor(private repository: TodoRepository) {}

  async execute(
    todoId: string,
    updates: { content?: string; status?: TodoStatus; dueDate?: Date },
  ): Promise<void> {
    const todo = await this.repository.findById(todoId);
    if (!todo) throw new NotFoundError("To-Do item not found.");

    // Call the `update` method on the rehydrated `Todo` instance
    todo.update(updates);

    // Save the updated entity back to the repository
    await this.repository.update(todo);
  }
}
