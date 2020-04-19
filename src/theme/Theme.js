import { createMuiTheme } from '@material-ui/core/styles';
import typography from './typography';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    action: {
      active: 'rgba(255, 255, 255, 0.54)',
      hover: 'rgba(255, 255, 255, 0.04)',
      selected: 'rgba(255, 255, 255, 0.08)',
      disabled: 'rgba(255, 255, 255, 0.26)',
      disabledBackground: 'rgba(255, 255, 255, 0.12)',
      focus: 'rgba(255, 255, 255, 0.12)',
    },
    background: {
      default: '#282C34',
      dark: '#1c2025',
      paper: '#282C34',
    },
    primary: {
      main: '#1b527f',
    },
    secondary: {
      main: '#1b527f',
    },
    text: {
      primary: '#e6e5e8',
      secondary: '#adb0bb',
    },
  },
  typography,
});

export default theme;
