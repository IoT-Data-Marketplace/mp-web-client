import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Slide from '@material-ui/core/Slide';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      backgroundColor: theme.palette.background.default,
    },
  })
);

interface Props {
  children?: React.ReactElement;
  headerContent: React.ReactChild;
}

function HideOnScroll(props: Props) {
  const { children } = props;
  const trigger = useScrollTrigger({});

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

const Header = (props: Props) => {
  const classes = useStyles();
  const { headerContent } = props;

  return (
    <>
      <HideOnScroll {...props}>
        <AppBar className={classes.appBar} color="default">
          {headerContent}
        </AppBar>
      </HideOnScroll>
    </>
  );
};

export { Header as default };
