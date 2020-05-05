import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { toggleDrawer, toggleIsLoggedIn } from '../../../../state/actions';
import { StoreState } from '../../../../state/interfaces/storeState';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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

const HeaderContent = () => {
  const classes = useStyles();
  const { isDrawerOpen } = useSelector((state: StoreState) => state.ui);
  const dispatch = useDispatch();

  const onDrawerButtonClicked = (): void => {
    dispatch(toggleDrawer(!isDrawerOpen));
  };

  return (
    <Toolbar>
      <IconButton onClick={onDrawerButtonClicked} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
        <MenuIcon />
      </IconButton>
      <Typography component={Link} to="/" variant="h3" color="textSecondary" className={classes.title}>
        IoT Data Trading Platform
      </Typography>
      <Button color="primary" variant="contained" size="medium" onClick={() => dispatch(toggleIsLoggedIn(false))}>
        Logout
      </Button>
    </Toolbar>
  );
};

export { HeaderContent as default };
