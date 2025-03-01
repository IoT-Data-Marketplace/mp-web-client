import React from 'react';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { ThemeProvider } from '@material-ui/styles';
import makeStyles from '@material-ui/core/styles/makeStyles';
import createStyles from '@material-ui/styles/createStyles';
import Routes from './Routes';
import theme from './theme/Theme';
import LoadingBackdrop from './components/LoadingBackdrop';

const browserHistory = createBrowserHistory();

const useStyles = makeStyles(() =>
  createStyles({
    '@global': {
      '*': {
        boxSizing: 'border-box',
        margin: 0,
        padding: 0,
      },
      html: {
        '-webkit-font-smoothing': 'antialiased',
        '-moz-osx-font-smoothing': 'grayscale',
        height: '100%',
        width: '100%',
      },
      body: {
        height: '100%',
        width: '100%',
        backgroundColor: '#1c2025', // todo figure out how to put in in the global theme
      },
      '#root': {
        height: '100%',
        width: '100%',
      },
    },
  })
);

function App() {
  useStyles();
  return (
    <ThemeProvider theme={theme}>
      <Router history={browserHistory}>
        <Routes />
      </Router>
      <LoadingBackdrop />
    </ThemeProvider>
  );
}

export default App;
