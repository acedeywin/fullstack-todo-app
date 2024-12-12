import { TodoStatus } from "../../shared/types/TodoTypes";

/**
 * Represents a To-Do item with its properties and behavior.
 */
export class Todo {
  id: string;
  content: string;
  dueDate: Date;
  status: TodoStatus;
  createdAt: Date;
  updatedAt: Date;

  /**
   * Constructs a new instance of a To-Do item.
   *
   * @param id - The unique identifier of the To-Do item.
   * @param content - The content or description of the To-Do.
   * @param dueDate - The due date for completing the To-Do.
   * @param createdAt - The timestamp when the To-Do was created.
   * @param updatedAt - The timestamp when the To-Do was last updated.
   * @param status - The current status of the To-Do (default: UNFINISHED).
   */
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

  /**
   * Updates the properties of the To-Do item.
   *
   * @param updates - An object containing the fields to update.
   * @param updates.content - (Optional) The new content or description for the To-Do.
   * @param updates.status - (Optional) The new status of the To-Do.
   * @param updates.dueDate - (Optional) The new due date for the To-Do.
   *
   * @throws BadRequestError - If any of the updated fields are invalid.
   * @returns A promise that resolves after updating the fields.
   */
  async update({
    content,
    status,
    dueDate,
  }: {
    content?: string;
    status?: TodoStatus;
    dueDate?: Date;
  }): Promise<void> {
    // Update the `updatedAt` timestamp to the current time
    this.updatedAt = new Date();

    // Update content if provided
    if (content !== undefined) {
      this.content = content;
    }

    // Update status if provided
    if (status !== undefined) {
      this.status = status;
    }

    // Update due date if provided
    if (dueDate !== undefined) {
      this.dueDate = dueDate;
    }
  }
}
