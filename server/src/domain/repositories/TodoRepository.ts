import { Todo } from "../entities/Todo";

/**
 * Repository interface for managing To-Do items.
 * Provides an abstraction for data persistence operations.
 */
export interface TodoRepository {
  /**
   * Creates a new To-Do item in the repository.
   *
   * @param todo - The To-Do item to be created.
   * @returns A promise that resolves when the To-Do is successfully created.
   */
  create(todo: Todo): Promise<void>;

  /**
   * Retrieves all To-Do items from the repository.
   *
   * @returns A promise that resolves to an array of all To-Do items.
   */
  findAll(): Promise<Todo[]>;

  /**
   * Finds a specific To-Do item by its unique identifier.
   *
   * @param id - The unique identifier of the To-Do item to find.
   * @returns A promise that resolves to the To-Do item if found, or `null` if not found.
   */
  findById(id: string): Promise<Todo | null>;

  /**
   * Updates an existing To-Do item in the repository.
   *
   * @param todo - The To-Do item with updated properties.
   * @returns A promise that resolves when the To-Do is successfully updated.
   */
  update(todo: Todo): Promise<void>;

  /**
   * Deletes a specific To-Do item from the repository by its unique identifier.
   *
   * @param todoId - The unique identifier of the To-Do item to delete.
   * @returns A promise that resolves when the To-Do is successfully deleted.
   */
  delete(todoId: string): Promise<void>;
}
