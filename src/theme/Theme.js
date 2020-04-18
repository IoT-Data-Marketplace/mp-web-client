import { createMuiTheme } from '@material-ui/core/styles';

const blackLight = '#282C34';
const blackDark = '#1c2025';

const theme = createMuiTheme({
  palette: {
    // type: 'dark',
    common: {
      black: `${blackLight}`,
      blackDark: `${blackDark}`,
    },
    primary: {
      main: `${blackLight}`,
    },
    secondary: {
      main: `${blackDark}`,
    },
  },
  typography: {
    h5: {
      fontWeight: 700,
    },
  },
});

export default theme;
