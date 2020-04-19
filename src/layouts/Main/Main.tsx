import React from 'react';
import clsx from 'clsx';
import { makeStyles, Theme, useTheme } from '@material-ui/core/styles';

import { connect } from 'react-redux';
import Header from './components';
import { StoreState } from '../../interfaces';
import { toggleDrawer, Ui } from '../../state/actions';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    // paddingTop: 56,
    // height: '100%',
    [theme.breakpoints.up('sm')]: {
      // paddingTop: 64,
    },
  },
  // shiftContent: {
  //   paddingLeft: 240,
  // },
  content: {
    minHeight: 'calc(100vh + 645px)',
    backgroundColor: theme.palette.primary.dark,
    color: 'white',
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    // marginLeft: -256,
  },

  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

interface Props {
  children?: React.ReactNode;
  ui: Ui;
}

const _Main = (props: Props) => {
  const { children } = props;

  const classes = useStyles();

  const { ui } = props;

  return (
    <>
      <Header />
      <main
        style={{
          paddingLeft: ui.isDrawerOpen ? '286px' : '30px',
        }}
        className={clsx(classes.content, {
          [classes.contentShift]: ui.isDrawerOpen,
        })}
      >
        {children}
      </main>
    </>
  );
};

const mapStateToProps = ({ ui }: StoreState) => {
  return { ui };
};

const Main = connect(mapStateToProps, { toggleDrawer })(_Main);

export { Main as default };
