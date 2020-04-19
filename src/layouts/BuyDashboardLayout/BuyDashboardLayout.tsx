import React from 'react';
import clsx from 'clsx';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Header from '../shared/Header';
import HeaderContent from './components/HeaderContent';
import SideDrawer from '../shared/SideDrawer';
import SideDrawerContent from './components/SideDrawerContent';

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

const BuyDashboardLayout = (props: Props) => {
  const { children } = props;

  const classes = useStyles();

  return (
    <>
      <Header headerContent={<HeaderContent />} />
      <SideDrawer content={<SideDrawerContent/>} />
      <main className={clsx(classes.content)}>{children}</main>
    </>
  );
};

export { BuyDashboardLayout as default };
