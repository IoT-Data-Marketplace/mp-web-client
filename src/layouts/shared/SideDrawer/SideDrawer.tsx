import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';

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

  const { content } = props;

  return (
    <>
      <Drawer
        variant="persistent"
        classes={{
          root: classes.drawer,
          paper: classes.drawerPaper,
        }}
        open
      >
        {content}
      </Drawer>
    </>
  );
};

export { SideDrawer as default };
