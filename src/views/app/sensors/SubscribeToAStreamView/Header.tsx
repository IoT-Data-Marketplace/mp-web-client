import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import { Breadcrumbs, Button, Grid, Link, makeStyles, SvgIcon, Typography } from '@material-ui/core';
import { PlusCircle as PlusCircleIcon } from 'react-feather';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { ROUTES } from '../../../../constants';

const useStyles = makeStyles((theme) => ({
  root: {},
  action: {
    marginBottom: theme.spacing(1),
    '& + &': {
      marginLeft: theme.spacing(1),
    },
  },
  actionIcon: {
    marginRight: theme.spacing(1),
  },
}));

interface Props {
  className?: string;
  rest?: any;
  sensorContractAddress?: string;
}

function Header(props: Props) {
  const { className, rest, sensorContractAddress } = props;
  const classes = useStyles();

  return (
    <Grid container spacing={3} justify="space-between" className={clsx(classes.root, className)} {...rest}>
      <Grid item>
        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
          <Link variant="body1" color="inherit" to="/app" component={RouterLink}>
            Dashboard
          </Link>
          <Typography variant="body1" color="textPrimary">
            Streams
          </Typography>
          <Typography variant="body1" color="textPrimary">
            Buy
          </Typography>
          <Typography variant="body1" color="textPrimary">
            {sensorContractAddress}
          </Typography>
        </Breadcrumbs>
        <Typography variant="h3" color="textPrimary">
          Subscribe to the Data Stream
        </Typography>
      </Grid>
      <Grid item>
        <Button
          color="secondary"
          variant="contained"
          component={RouterLink}
          to={ROUTES.REGISTER_SENSOR}
          className={classes.action}
        >
          <SvgIcon fontSize="small" className={classes.actionIcon}>
            <PlusCircleIcon />
          </SvgIcon>
          Register Sensor
        </Button>

      </Grid>
    </Grid>
  );
}

export default Header;
