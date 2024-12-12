export enum TodoStatus {
  UNFINISHED = "Unfinished",
  DONE = "Done",
}

export interface FileError extends Error {
  code?: string;
}
