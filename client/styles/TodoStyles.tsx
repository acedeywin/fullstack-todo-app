import React from 'react';
import { List, Paper } from '@mui/material';
import { styled } from '@mui/system';

export const PageList = styled(List)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: '200px',
  padding: theme.spacing(2),
  gap: theme.spacing(2),
  marginBottom: '5px',
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
}));

export const PagePaper = styled(Paper)(({ theme }) => ({
  p: 4,
  borderRadius: 4,
  backgroundColor: theme.palette.background.paper,
  boxShadow: '0px 4px 12px rgba(0,0,0,0.1)',
}));
