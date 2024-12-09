import { TodoRepository } from "../domain/repositories/TodoRepository";
import { NotFoundError } from "../shared/helpers/Errors";

export class DeleteTodo {
  constructor(private repository: TodoRepository) {}

  async execute(todoId: string): Promise<void> {
    const todo = await this.repository.findById(todoId);
    if (!todo) throw new NotFoundError("To-Do item not found.");
    await this.repository.delete(todoId);
  }
}
