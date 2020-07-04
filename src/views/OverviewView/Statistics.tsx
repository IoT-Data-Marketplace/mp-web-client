import React, { useEffect } from 'react';
import clsx from 'clsx';
import { Box, Card, Grid, makeStyles, Typography } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { StoreState } from '../../state/interfaces/storeState';
import { fetchDataStreamEntityContractBalance } from '../../state/actions';

const useStyles = makeStyles((theme) => ({
  root: {},
  item: {
    padding: theme.spacing(3),
    textAlign: 'center',
    [theme.breakpoints.up('md')]: {
      '&:not(:last-of-type)': {
        borderRight: `1px solid ${theme.palette.divider}`,
      },
    },
    [theme.breakpoints.down('sm')]: {
      '&:not(:last-of-type)': {
        borderBottom: `1px solid ${theme.palette.divider}`,
      },
    },
  },
  label: {
    marginLeft: theme.spacing(1),
  },
  overline: {
    marginTop: theme.spacing(1),
  },
}));

interface Props {
  className?: string;
  rest?: any;
}

function Statistics(props: Props) {
  const { dataStreamEntityContractBalance, sensorContractAddresses } = useSelector((state: StoreState) => state.dataStreamEntity);
  const dispatch = useDispatch();
  const classes = useStyles();
  const { className, rest } = props;

  useEffect(() => {
    dispatch(fetchDataStreamEntityContractBalance());
  }, [dispatch]);

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <Grid alignItems="center" container justify="space-between">
        <Grid className={classes.item} item md={6} sm={6} xs={12}>
          <Typography variant="h2" color="textPrimary">
            {`${dataStreamEntityContractBalance} `}ETH
          </Typography>
          <Typography className={classes.overline} variant="overline" color="textSecondary">
            Earned from selling data streams
          </Typography>
        </Grid>
        <Grid className={classes.item} item md={6} sm={6} xs={12}>
          <Typography variant="h2" color="textPrimary">
            {sensorContractAddresses.length}
          </Typography>
          <Typography className={classes.overline} variant="overline" color="textSecondary">
            Sensors
          </Typography>
        </Grid>
      </Grid>
    </Card>
  );
}

export default Statistics;
