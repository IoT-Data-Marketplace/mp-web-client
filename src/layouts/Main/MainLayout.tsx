import React from 'react';
import clsx from 'clsx';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Header from './components';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    content: {
      flexGrow: 1,
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
  })
);

interface Props {
  children?: React.ReactNode;
}

const MainLayout = (props: Props) => {
  const { children } = props;

  const classes = useStyles();

  return (
    <>
      <Header />
      <main className={clsx(classes.content)}>{children}</main>
    </>
  );
};

export { MainLayout as default };
