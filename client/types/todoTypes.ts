export enum TodoStatus {
  UNFINISHED = 'Unfinished',
  DONE = 'Done',
}

export type Todo = {
  id: string;
  content: string;
  dueDate?: string;
  status: TodoStatus;
};
