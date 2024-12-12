'use client';

import { ThemeProvider, CssBaseline, Container } from '@mui/material';
import theme from '../styles/theme';
import { TodoProvider } from '../context/TodoContext';

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <TodoProvider>
        <Container maxWidth="md" sx={{ py: 4 }}>
          {children}
        </Container>
      </TodoProvider>
    </ThemeProvider>
  );
}
