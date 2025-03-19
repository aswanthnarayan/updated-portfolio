import { createTheme } from "@mui/material";

export const Theme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        // Style for the scrollbar
        "*::-webkit-scrollbar": {
          width: "0.4em",
          height: "0.4em",
          backgroundColor: "#0B132B",
        },
        "*::-webkit-scrollbar-thumb": {
          backgroundColor: "#3A506B",
        },
        "*": {
          boxSizing: "unset",
        },
      },
    },
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          color: "#FEFFFF",
          "&:hover": {
            backgroundColor: "transparent",
          },
        },
      },
    },
  },
  typography: {
    fontFamily: "'Jost', sans-serif",
  },
  breakpoints: {
    values: {
      xs: 450,
      sm: 960,
      md: 1048,
      lg: 1200,
      xl: 1536,
    },
  },
  palette: {
    background: {
      main: "#000000",
    },
    backgroundSecondary: {
      main: "#3A506B",
    },
    buttonHover: {
      main: "#53739A",
    },
    textMain: {
      main: "#FEFFFF",
    },
    textSecondary: {
      main: "#6FFFE9",
    },
    textBlack:{
      main: "#000000",
    }
  },
});
