/**
 * Represents an error for when a requested resource is not found.
 * Extends the built-in `Error` class.
 */
export class NotFoundError extends Error {
  status: number;

  /**
   * Constructs a NotFoundError instance.
   *
   * @param message - A descriptive message for the error.
   */
  constructor(message: string) {
    super(message); // Pass the message to the base Error class
    this.status = 404; // HTTP status code for "Not Found"
  }
}

/**
 * Represents an error for invalid or bad client requests.
 * Extends the built-in `Error` class.
 */
export class BadRequestError extends Error {
  status: number;

  /**
   * Constructs a BadRequestError instance.
   *
   * @param message - A descriptive message for the error.
   */
  constructor(message: string) {
    super(message); // Pass the message to the base Error class
    this.status = 400; // HTTP status code for "Bad Request"
  }
}

/**
 * A general-purpose custom error class for defining application-specific errors.
 * Extends the built-in `Error` class and allows for custom HTTP status codes.
 */
export class CustomError extends Error {
  status: number;

  /**
   * Constructs a CustomError instance.
   *
   * @param message - A descriptive message for the error.
   * @param status - The HTTP status code for the error (default is 500 for server errors).
   */
  constructor(message: string, status: number = 500) {
    super(message); // Pass the message to the base Error class
    this.status = status; // Assign the provided status code

    // Maintain the prototype chain for proper instanceof checks
    Object.setPrototypeOf(this, CustomError.prototype);
  }
}
