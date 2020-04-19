import React from 'react';
import clsx from 'clsx';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Header from '../shared/Header';
import HeaderContent from './components/HeaderContent';
import SideDrawer from '../shared/SideDrawer';

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

const SellDashboardLayout = (props: Props) => {
  const { children } = props;

  const classes = useStyles();

  return (
    <>
      <Header headerContent={<HeaderContent />} />
      <SideDrawer content={<div>sell data side drawer content</div>} />
      <main className={clsx(classes.content)}>{children}</main>
    </>
  );
};

export { SellDashboardLayout as default };
