import { Todo } from "../domain/entities/Todo";
import { TodoRepository } from "../domain/repositories/TodoRepository";
import { v4 as uuid } from "uuid";

export class CreateTodo {
  constructor(private repository: TodoRepository) {}

  async execute(payload: Todo): Promise<void> {
    const { content, dueDate, createdAt, updatedAt } = payload
    const id = uuid();
    const todo = new Todo(id, content, dueDate, createdAt, updatedAt);
    await this.repository.create(todo);
  }
}
