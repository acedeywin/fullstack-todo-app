import { TodoRepository } from "../domain/repositories/TodoRepository";
import { Todo } from "../domain/entities/Todo";

export class GetTodos {
  constructor(private repository: TodoRepository) {}

  async execute(): Promise<Todo[]> {
    return await this.repository.findAll();
  }
}
