import { Todo } from "../entities/Todo";

export interface TodoRepository {
  create(todo: Todo): Promise<void>;
  findAll(): Promise<Todo[]>;
  findById(id: string): Promise<Todo | null>;
  update(todo: Todo): Promise<void>;
  delete(todoId: string): Promise<void>;
}
