import React from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Box, makeStyles, Paper, Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Sensor, SensorStatus, SensorType } from '../../../../state/interfaces';
import theme from '../../../../theme/Theme';

const useStyles = makeStyles(() => ({
  reviewGrid: {
    display: 'grid',
  },
  reviewField: {
    margin: theme.spacing(2),
  },
}));

interface Props {
  sensor: Sensor;
}

function SensorDetails(props: Props) {
  const classes = useStyles();
  const { sensor } = props;

  return (
    <Paper>
      <PerfectScrollbar>
        <Box minWidth={800} p={6}>
          <Typography variant="h3" color="textPrimary">
            Review you Sensor Details
          </Typography>
          <Box mt={2}>
            <Typography variant="subtitle1" color="textSecondary">
              Here you can review your Sensor Information before you register it.
            </Typography>
          </Box>
          <Box mt={2} className={classes.reviewGrid}>
            <div
              style={{
                display: 'flex',
              }}
            >
              <TextField
                style={{
                  width: '75%',
                }}
                className={classes.reviewField}
                id="sensorContractAddress"
                label="Sensor Contract Address"
                defaultValue={sensor.sensorContractAddress}
                InputProps={{
                  readOnly: true,
                }}
                variant="outlined"
              />
              <Button
                style={{
                  width: '20%',
                  float: 'right',
                }}
                color="inherit"
                component="a"
                href={`https://rinkeby.etherscan.io/address/${sensor.sensorContractAddress}`}
                variant="outlined"
                size="small"
              >
                Check on Etherscan
              </Button>
            </div>

            <TextField
              className={classes.reviewField}
              id="sensorType"
              label="Sensor Type"
              defaultValue={SensorType[sensor.sensorType]}
              InputProps={{
                readOnly: true,
              }}
              variant="outlined"
            />

            <TextField
              className={classes.reviewField}
              id="latitude"
              label="Latitude"
              defaultValue={sensor.geolocation.latitude}
              InputProps={{
                readOnly: true,
              }}
              variant="outlined"
            />

            <TextField
              className={classes.reviewField}
              id="Longitude"
              label="Longitude"
              defaultValue={sensor.geolocation.longitude}
              InputProps={{
                readOnly: true,
              }}
              variant="outlined"
            />

            <TextField
              className={classes.reviewField}
              id="sensorStatus"
              label="Sensor Status"
              defaultValue={SensorStatus[sensor.sensorStatus]}
              InputProps={{
                readOnly: true,
              }}
              variant="outlined"
            />
          </Box>
        </Box>
      </PerfectScrollbar>
    </Paper>
  );
}

export default SensorDetails;
