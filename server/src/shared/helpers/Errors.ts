export interface FileError extends Error {
    code?: string;
  }

export class NotFoundError extends Error {
  status: number;

  constructor(message: string) {
    super(message);
    this.status = 404; // HTTP status for "Not Found"
  }
}

export class BadRequestError extends Error {
  status: number;

  constructor(message: string) {
    super(message);
    this.status = 400; // Bad Request error
  }
}

export class CustomError extends Error {
  status: number;

  constructor(message: string, status: number = 500) {
    super(message);
    this.status = status;
    Object.setPrototypeOf(this, CustomError.prototype); // Maintain prototype chain
  }
}
