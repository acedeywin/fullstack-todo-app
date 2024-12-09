export enum TodoStatus {
  UNFINISHED = "Unfinished",
  DONE = "Done",
}

export interface TodoTypes {
  id: string;
  content: string;
  dueDate: Date;
  status: TodoStatus;
  createdAt: Date;
  updatedAt: Date;
}
