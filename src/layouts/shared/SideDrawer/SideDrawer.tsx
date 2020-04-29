import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import { useMediaQuery, useTheme } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { StoreState } from '../../../state/interfaces/storeState';

const drawerWidth = 256;

interface Props {
  children?: React.ReactElement;
  content: React.ReactChild;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
      paddingTop: '80px',
    },
  })
);

const SideDrawer = (props: Props) => {
  const classes = useStyles();
  const theme = useTheme();
  const mobileDevice = useMediaQuery(theme.breakpoints.down('sm'));
  const { isDrawerOpen } = useSelector((state: StoreState) => state.ui);

  const open = mobileDevice ? isDrawerOpen : true;

  const { content } = props;

  return (
    <>
      <Drawer
        variant="persistent"
        classes={{
          root: classes.drawer,
          paper: classes.drawerPaper,
        }}
        open={open}
      >
        {content}
      </Drawer>
    </>
  );
};

export { SideDrawer as default };
