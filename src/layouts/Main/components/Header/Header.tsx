import React from 'react';
import DeviceHubOutlinedIcon from '@material-ui/icons/DeviceHubOutlined';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Slide from '@material-ui/core/Slide';
import Typography from '@material-ui/core/Typography';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import { Link } from 'react-router-dom';

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
      textDecoration: 'none',
    },
  })
);

interface Props {
  children?: React.ReactElement;
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

  return (
    <>
      <HideOnScroll {...props}>
        <AppBar className={classes.appBar} color="default">
          <Toolbar>
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
              <DeviceHubOutlinedIcon />
            </IconButton>
            <Typography component={Link} to="/" variant="h3" color="textSecondary" className={classes.title}>
              IoT Data Marketplace
            </Typography>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <div className={classes.toolbarMargin} />
    </>
  );
};

export { Header as default };
