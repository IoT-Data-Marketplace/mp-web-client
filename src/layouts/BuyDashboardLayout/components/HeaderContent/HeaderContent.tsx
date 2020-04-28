import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {getDataMarketplaceByContractAddress, toggleDrawer} from '../../../../state/actions';
import { StoreState } from '../../../../interfaces';

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
    dispatch(getDataMarketplaceByContractAddress());
  };

  return (
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
  );
};

export { HeaderContent as default };
