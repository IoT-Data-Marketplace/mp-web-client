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
  const { dataStreamEntityContractBalance, sensors } = useSelector((state: StoreState) => state.dataStreamEntity);
  const dispatch = useDispatch();
  const classes = useStyles();
  const { className, rest } = props;

  useEffect(() => {
    dispatch(fetchDataStreamEntityContractBalance());
  }, [dispatch]);

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <Grid alignItems="center" container justify="space-between">
        <Grid className={classes.item} item md={3} sm={6} xs={12}>
          <Typography variant="h2" color="textPrimary">
            {`${dataStreamEntityContractBalance} `}ETH
          </Typography>
          <Typography className={classes.overline} variant="overline" color="textSecondary">
            Earned from selling data streams
          </Typography>
        </Grid>
        <Grid className={classes.item} item md={3} sm={6} xs={12}>
          <Typography variant="h2" color="textPrimary">
            {sensors.length}
          </Typography>
          <Typography className={classes.overline} variant="overline" color="textSecondary">
            Sensors
          </Typography>
        </Grid>
        <Grid className={classes.item} item md={3} sm={6} xs={12}>
          <Typography variant="h2" color="textPrimary">
            visitors
          </Typography>
          <Typography className={classes.overline} variant="overline" color="textSecondary">
            Today&apos;s Visitors
          </Typography>
        </Grid>
        <Grid className={classes.item} item md={3} sm={6} xs={12}>
          <Box display="flex" alignItems="center" justifyContent="center">
            <Typography component="span" variant="h2" color="textPrimary">
              watching
            </Typography>
          </Box>
          <Typography className={classes.overline} variant="overline" color="textSecondary">
            Watching now
          </Typography>
        </Grid>
      </Grid>
    </Card>
  );
}

export default Statistics;
