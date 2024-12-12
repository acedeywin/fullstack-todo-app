'use client';

import React, { useState, useEffect } from 'react';
import { Typography, Button, Paper } from '@mui/material';
import { useTodoContext } from '../context/TodoContext';
import TodoList from '../components/TodoList';
import TodoForm from '../components/TodoForm';
import EmptyContentIcon from '../components/Icon/EmptyContentIcon';
import { PageList, PagePaper } from '../styles/TodoStyles';
import { Todo } from '../types/todoTypes';

export default function Home() {
  const { todos, fetchTodos, error, setError } = useTodoContext();
  const [isEditing, setIsEditing] = useState(false);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const handleClose = async () => {
    if (error === null) {
      setError(null);
      setIsEditing(false);
      setEditingTodo(null);
    }
  };

  return (
    <PagePaper elevation={3}>
      <PageList>
        <Typography variant="h4" gutterBottom>
          To-Do App
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setIsEditing(true)}
          sx={{ mb: 2 }}
        >
          Add Task
        </Button>
      </PageList>
      {isEditing ? (
        <TodoForm onClose={handleClose} initialData={editingTodo} />
      ) : todos.length > 0 ? (
        <TodoList
          onEdit={(todo) => {
            setEditingTodo(todo);
            setIsEditing(true);
          }}
        />
      ) : (
        <PageList>
          <Typography variant="body1" sx={{ mb: 2 }}>
            No To-do item found
          </Typography>
          <EmptyContentIcon width="186" height="136" />
        </PageList>
      )}
    </PagePaper>
  );
}
