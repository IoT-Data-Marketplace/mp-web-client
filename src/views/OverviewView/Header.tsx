import React from 'react';
import { useSelector } from 'react-redux';
import clsx from 'clsx';
import {
  Box,
  Button,
  Grid,
  Hidden,
  makeStyles,
  Typography,
} from '@material-ui/core';
import BarChartIcon from '@material-ui/icons/BarChart';
import { StoreState } from '../../state/interfaces/storeState';

const useStyles = makeStyles((theme) => ({
  root: {},
  action: {
    backgroundColor: theme.palette.common.white,
  },
  actionIcon: {
    marginRight: theme.spacing(1),
  },
  image: {
    width: '100%',
    maxHeight: 400,
  },
}));

interface Props {
  className?: string;
  rest?: any;
}

function Header(props: Props) {
  const classes = useStyles();
  const { name } = useSelector((state: StoreState) => state.dataStreamEntity);
  const { className, rest } = props;

  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <Grid alignItems="center" container justify="space-between" spacing={3}>
        <Grid item md={6} xs={12}>
          <Typography variant="overline" color="textSecondary">
            Home
          </Typography>
          <Typography variant="h3" color="textPrimary">
            Hello, {name}
          </Typography>
          <Typography variant="subtitle1" color="textPrimary">
            Welcome to the IoT Data Marketplace, here you can buy or sell IoT
            generated data.
          </Typography>
          <Box mt={2}>
            <Button className={classes.action} variant="contained">
              <BarChartIcon className={classes.actionIcon} />
              View summary
            </Button>
          </Box>
        </Grid>
        <Hidden smDown>
          <Grid item md={6}>
            <img
              alt="Cover"
              className={classes.image}
              src="/static/images/IoTSolutions.svg"
            />
          </Grid>
        </Hidden>
      </Grid>
    </div>
  );
}

export default Header;
