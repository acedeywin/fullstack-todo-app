import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#3f51b5', // Blue
      contrastText: '#ffffff', // White text on primary
    },
    background: {
      default: '#f4f6f8', // Light gray background
      paper: '#ffffff', // White background for cards and papers
    },
    text: {
      primary: '#333333', // Darker text for readability
      secondary: '#757575', // Lighter text for secondary information
    },
    action: {
      hover: 'rgba(63, 81, 181, 0.08)', // Light hover effect for primary actions
      disabled: 'rgba(0, 0, 0, 0.26)', // Disabled actions styling
    },
  },
  typography: {
    fontFamily: "'Roboto', 'Arial', sans-serif",
    h4: {
      fontWeight: 700,
      fontSize: '1.8rem',
      lineHeight: 1.5,
    },
    h6: {
      fontWeight: 600,
      fontSize: '1.25rem',
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.43,
      color: '#757575',
    },
    button: {
      fontSize: '0.875rem',
      fontWeight: 500,
      textTransform: 'none',
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: '12px',
          padding: '10px 16px',
          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)', // Light shadow for buttons
          transition: 'all 0.3s ease',
          '&:hover': {
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
          },
        },
        containedPrimary: {
          backgroundColor: '#3f51b5',
          color: '#ffffff', // White text on primary button
          '&:hover': {
            backgroundColor: '#303f9f', // Slightly darker blue on hover
          },
        },
        containedSecondary: {
          backgroundColor: '#f50057',
          color: '#ffffff',
          '&:hover': {
            backgroundColor: '#c51162', // Slightly darker pink on hover
          },
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          '& .MuiSvgIcon-root': {
            fontSize: '28px', // Larger size for better visibility
          },
          '&.Mui-checked': {
            color: '#3f51b5', // Primary color for checked state
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)', // Light shadow
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        h4: {
          fontWeight: 700,
          fontSize: '1.8rem',
          lineHeight: 1.5,
          color: '#333333', // Darker color for headings
        },
        body1: {
          lineHeight: 1.6,
        },
      },
    },
    MuiList: {
      styleOverrides: {
        root: {
          padding: '0px',
        },
      },
    },
  },
});

export default theme;
