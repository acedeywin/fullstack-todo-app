'use client';

/**
 * A React functional component that displays a list of todos.
 * Provides functionality to edit, delete, and toggle the status of todos.
 */
import React from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CircleChecked from '@mui/icons-material/CheckCircle';
import CircleUnchecked from '@mui/icons-material/RadioButtonUnchecked';
import { List, ListItem, Checkbox, Typography, Button, Box } from '@mui/material';
import { useTodoContext } from '../context/TodoContext';
import { Todo, TodoStatus } from '../types/todoTypes';

/**
 * Props type for the TodoList component.
 * @typedef {Object} Props
 * @property {(todo: Todo) => void} onEdit - Function to handle editing a todo.
 */
type Props = {
  onEdit: (todo: Todo) => void;
};

/**
 * A component that renders a list of todos with actions to edit, delete, and update their status.
 * @param {Props} props - Props for the TodoList component.
 * @returns {JSX.Element} The rendered TodoList component.
 */
const TodoList: React.FC<Props> = ({ onEdit }) => {
  const { todos, deleteTodo, updateTodo, loading } = useTodoContext();

  /**
   * Toggles the status of a todo between DONE and UNFINISHED.
   * @param {Todo} todo - The todo to update.
   */
  const handleUpdate = (todo: Todo) => {
    updateTodo({
      ...todo,
      status: todo.status === TodoStatus.DONE ? TodoStatus.UNFINISHED : TodoStatus.DONE,
    });
  };

  return (
    <List>
      {todos.map((todo) => (
        <ListItem
          key={todo.id}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            p: 2,
            borderRadius: 2,
            mb: 1,
            boxShadow: '0px 2px 5px rgba(0,0,0,0.1)',
            backgroundColor: 'white',
          }}
        >
          <Box display="flex" alignItems="center">
            <Checkbox
              disabled={loading}
              checked={todo.status === 'Done'}
              onChange={() => handleUpdate(todo)}
              icon={<CircleUnchecked />}
              checkedIcon={<CircleChecked />}
            />
            <Typography
              sx={{
                textDecoration: todo.status === 'Done' ? 'line-through' : 'none',
              }}
            >
              {todo.content}
            </Typography>
          </Box>
          <Box>
            <Button
              disabled={loading}
              size="small"
              variant="text"
              color="primary"
              onClick={() => onEdit(todo)}
            >
              <EditIcon />
            </Button>
            <Button
              disabled={loading}
              size="small"
              variant="text"
              color="error"
              onClick={() => deleteTodo(todo.id)}
            >
              <DeleteIcon />
            </Button>
          </Box>
        </ListItem>
      ))}
    </List>
  );
};

export default TodoList;
