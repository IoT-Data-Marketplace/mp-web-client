import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Slide from '@material-ui/core/Slide';
import Typography from '@material-ui/core/Typography';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from 'react-router-dom';
import SideDrawer from '../SideDrawer/SideDrawer';
import { toggleDrawer, Ui } from '../../../../state/actions';
import { StoreState } from '../../../../interfaces';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      backgroundColor: theme.palette.background.default,
    },
    toolbarMargin: {
      ...theme.mixins.toolbar,
    },
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      // color: 'inherit',
      textDecoration: 'none',
    },
  })
);

interface Props {
  children?: React.ReactElement;
  // toggleDrawer: typeof toggleDrawer;
  // ui: Ui;
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
  const { isDrawerOpen } = useSelector((state: StoreState) => state.ui);
  const dispatch = useDispatch();

  const onDrawerButtonClicked = (): void => {
    dispatch(toggleDrawer(!isDrawerOpen));
  };

  return (
    <>
      <HideOnScroll {...props}>
        <AppBar className={classes.appBar} color="default">
          <Toolbar>
            <IconButton
              onClick={onDrawerButtonClicked}
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component={Link}
              to="/"
              variant="h3"
              color="textSecondary"
              className={classes.title}
            >
              Buy Data Streams
            </Typography>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <div className={classes.toolbarMargin} />
      <SideDrawer />
    </>
  );
};

export { Header as default };
