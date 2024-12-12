'use client';

/**
 * Todo context types and API requests handling.
 */
import { Todo } from '../types/todoTypes';
import { apiRequest } from '../utils/apiRequest';
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
} from 'react';

/**
 * @typedef {Object} TodoContextType
 * @property {Todo[]} todos - Array of todo items.
 * @property {string | null} error - Error message if any occurs during API calls.
 * @property {React.Dispatch<React.SetStateAction<string | null>>} setError - Function to update the error state.
 * @property {boolean} loading - Indicates if an API call is in progress.
 * @property {() => Promise<void>} fetchTodos - Function to fetch the list of todos.
 * @property {(todo: Omit<Todo, 'id' | 'status'>) => Promise<void>} addTodo - Function to add a new todo.
 * @property {(todo: Todo) => Promise<void>} updateTodo - Function to update an existing todo.
 * @property {(id: string) => Promise<void>} deleteTodo - Function to delete a todo by ID.
 */
type TodoContextType = {
  todos: Todo[];
  error: string | null;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
  loading: boolean;
  fetchTodos: () => Promise<void>;
  addTodo: (todo: Omit<Todo, 'id' | 'status'>) => Promise<void>;
  updateTodo: (todo: Todo) => Promise<void>;
  deleteTodo: (id: string) => Promise<void>;
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL as string;

const TodoContext = createContext<TodoContextType | undefined>(undefined);

/**
 * Provides the Todo context to child components.
 * @param {Object} props - Component props.
 * @param {ReactNode} props.children - Child components to wrap with the provider.
 */
export const TodoProvider = ({ children }: { children: ReactNode }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  /**
   * Fetches the list of todos from the API.
   */
  const fetchTodos = useCallback(async () => {
    const data = await apiRequest<{ data: Todo[] }>(BASE_URL, {}, setError, setLoading);

    if (data) {
      setTodos(data.data);
    }
  }, []);

  /**
   * Adds a new todo.
   * @param {Omit<Todo, 'id' | 'status'>} todo - The new todo to add.
   */
  const addTodo = async (todo: Omit<Todo, 'id' | 'status'>) => {
    const data = await apiRequest<{ success: boolean }>(
      BASE_URL,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(todo),
      },
      setError,
      setLoading,
    );

    if (data) {
      await fetchTodos();
    }
  };

  /**
   * Updates an existing todo.
   * @param {Todo} todo - The todo to update.
   */
  const updateTodo = async (todo: Todo) => {
    const data = await apiRequest<{ success: boolean }>(
      `${BASE_URL}/${todo.id}`,
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(todo),
      },
      setError,
      setLoading,
    );

    if (data) {
      await fetchTodos();
    }
  };

  /**
   * Deletes a todo by ID.
   * @param {string} id - The ID of the todo to delete.
   */
  const deleteTodo = async (id: string) => {
    const data = await apiRequest<{ success: boolean }>(
      `${BASE_URL}/${id}`,
      {
        method: 'DELETE',
      },
      setError,
      setLoading,
    );

    if (data) {
      await fetchTodos();
    }
  };

  return (
    <TodoContext.Provider
      value={{
        todos,
        error,
        loading,
        setError,
        fetchTodos,
        addTodo,
        updateTodo,
        deleteTodo,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

/**
 * Custom hook to use the Todo context.
 * @returns {TodoContextType} The Todo context value.
 * @throws Will throw an error if used outside of TodoProvider.
 */
export const useTodoContext = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error('useTodoContext must be used within a TodoProvider');
  }
  return context;
};
