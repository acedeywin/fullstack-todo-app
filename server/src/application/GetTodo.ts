import { Todo } from "../domain/entities/Todo";
import { TodoRepository } from "../domain/repositories/TodoRepository";
import { NotFoundError } from "../shared/helpers/Errors";

export class GetTodo {
  constructor(private repository: TodoRepository) {}

  async execute(todoId: string): Promise<Todo> {
    const todo = await this.repository.findById(todoId);
    if (!todo) throw new NotFoundError("To-Do item not found.");
    return todo;
  }
}
