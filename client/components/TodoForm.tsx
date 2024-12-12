'use client';

/**
 * A React functional component that provides a form for adding or updating todos.
 * Integrates Material-UI components and date pickers for enhanced user experience.
 */
import React, { useState } from 'react';
import { Box, TextField, Button, Typography, CircularProgress } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { useTodoContext } from '../context/TodoContext';
import { Todo } from '../types/todoTypes';

/**
 * Props type for the TodoForm component.
 * @typedef {Object} Props
 * @property {() => void} onClose - Function to close the form.
 * @property {Todo | null} [initialData] - Initial data for editing an existing todo.
 */
type Props = {
  onClose: () => void;
  initialData?: Todo | null;
};

/**
 * A form component for creating or updating todos.
 * @param {Props} props - Props for the TodoForm component.
 * @returns {JSX.Element} The rendered form component.
 */
const TodoForm: React.FC<Props> = ({ onClose, initialData }) => {
  const { addTodo, updateTodo, error, loading } = useTodoContext();
  const [content, setContent] = useState(initialData?.content || '');
  const [dueDate, setDueDate] = useState<Date | null>(
    initialData?.dueDate ? new Date(initialData.dueDate) : null,
  );

  /**
   * Handles changes to the content input field.
   * @param {React.ChangeEvent<HTMLInputElement>} e - Input change event.
   */
  const handleContentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };

  /**
   * Handles changes to the due date picker.
   * @param {Dayjs | null} newValue - The new date value.
   */
  const handleDueDateChange = (newValue: Dayjs | null) => {
    setDueDate(newValue ? newValue.toDate() : null);
  };

  /**
   * Determines if the save button should be disabled.
   * @returns {boolean} True if the button should be disabled.
   */
  const handleDisableButton = () => !content.trim() || !dueDate;

  /**
   * Submits the form by either adding or updating a todo.
   */
  const handleSubmit = async () => {
    if (initialData) {
      await updateTodo({
        ...initialData,
        content,
        dueDate: dueDate?.toISOString().split('T')[0],
      });
    } else {
      await addTodo({ content, dueDate: dueDate?.toISOString().split('T')[0] });
    }

    onClose();
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, padding: '0 5px' }}>
        {error && (
          <Typography
            sx={{ textAlign: 'center', paddingTop: '5px' }}
            variant="body2"
            color="error"
          >
            {error}
          </Typography>
        )}
        <TextField
          label="Content"
          value={content}
          onChange={handleContentChange}
          fullWidth
          required={!initialData?.content}
          error={!content.trim() && initialData === null}
        />
        <DatePicker
          label="Due Date"
          value={dayjs(dueDate)}
          onChange={handleDueDateChange}
          disablePast
          slotProps={{
            textField: {
              fullWidth: true,
              required: !initialData?.dueDate,
            },
          }}
        />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '0 5px 10px 5px',
          }}
        >
          <Button
            disabled={handleDisableButton()}
            variant="contained"
            color="primary"
            onClick={handleSubmit}
          >
            {loading ? <CircularProgress size={20} /> : 'Save'}
          </Button>
          <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>
        </Box>
      </Box>
    </LocalizationProvider>
  );
};

export default TodoForm;
