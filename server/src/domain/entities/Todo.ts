import { BadRequestError } from "../../shared/helpers/Errors";
import { TodoStatus } from "../../shared/types/TodoTypes";

export class Todo {
  id: string;
  content: string;
  dueDate: Date;
  status: TodoStatus;
  createdAt: Date;
  updatedAt: Date;

  constructor(
    id: string,
    content: string,
    dueDate: Date,
    createdAt: Date,
    updatedAt: Date,
    status: TodoStatus = TodoStatus.UNFINISHED,
  ) {
    this.id = id;
    this.content = content;
    this.dueDate = dueDate;
    this.status = status;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  async update({
    content,
    status,
    dueDate,
  }: {
    content?: string;
    status?: TodoStatus;
    dueDate?: Date;
  }): Promise<void> {

    this.updatedAt = new Date();

    if (content !== undefined) {
      this.content = content;
    }

    if (status !== undefined) {
      this.status = status;
    }

    if (dueDate !== undefined) {
      this.dueDate = dueDate;
    }
  }
}
