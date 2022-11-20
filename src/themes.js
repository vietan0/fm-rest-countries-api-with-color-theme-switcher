const sharedOverrides = {
  typography: {
    fontFamily: ['Nunito Sans', 'Helvetica', 'Arial', 'sans-serif'].join(','),
  },
  components: {
    MuiCardContent: {
      styleOverrides: {
        root: {
          ':last-child': {
            paddingBottom: '0',
          },
        },
      },
    },
  },
};

export const lightTheme = {
  ...sharedOverrides,
  palette: {
    primary: {
      main: 'hsl(209, 23%, 22%)',
    },
    text: {
      primary: 'hsl(200, 15%, 8%)',
    },
    background: {
      default: 'hsl(0, 0%, 98%)',
    },
  },
};

export const darkTheme = {
  ...sharedOverrides,
  palette: {
    mode: 'dark',
    primary: {
      main: 'hsl(0, 0%, 98%)',
    },
    text: {
      primary: 'hsl(0, 0%, 100%)',
    },
    background: {
      default: 'hsl(207, 26%, 8%)',
      paper: 'hsl(209, 23%, 10%)',
    },
  },
};
