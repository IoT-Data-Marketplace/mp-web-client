import React from 'react';
import clsx from 'clsx';
import { makeStyles, Theme, useTheme } from '@material-ui/core/styles';

import Header from './components';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    paddingTop: 56,
    height: '100%',
    [theme.breakpoints.up('sm')]: {
      paddingTop: 64,
    },
  },
  shiftContent: {
    paddingLeft: 240,
  },
  content: {
    // height: '1000%',
    height: '1000px',
    backgroundColor: theme.palette.primary.dark,
    paddingLeft: '256px',
    color: 'white',
  },
}));

interface Props {
  children?: React.ReactNode;
}

const Main = (props: Props) => {
  const { children } = props;

  const classes = useStyles();

  // const [openSidebar, setOpenSidebar] = useState(false);
  //
  // const handleSidebarOpen = () => {
  //   setOpenSidebar(true);
  // };
  //
  // const handleSidebarClose = () => {
  //   setOpenSidebar(false);
  // };
  //
  // const shouldOpenSidebar = isDesktop ? true : openSidebar;

  return (
    <>
      <Header />

      <main className={classes.content}>
        {children}
        {/* <Footer /> */}
      </main>
    </>
  );
};

export default Main;
