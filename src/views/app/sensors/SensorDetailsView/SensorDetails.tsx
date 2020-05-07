import React from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Box, makeStyles, Paper, Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useDispatch } from 'react-redux';
import { Sensor, SensorStatus, SensorType } from '../../../../state/interfaces';
import theme from '../../../../theme/Theme';
import { activateSensor } from '../../../../state/actions/sensor/sensorStatus';

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
  // fetchCurrentSensor: any;
}

function SensorDetails(props: Props) {
  const classes = useStyles();
  const { sensor } = props;
  const [currentStatus, setCurrentStatus] = React.useState(SensorStatus[sensor.sensorStatus]);
  const dispatch = useDispatch();

  const onUpdateSensorStatusClicked = async () => {
    try {
      await dispatch(activateSensor(sensor.sensorContractAddress));
      setCurrentStatus(SensorStatus[SensorStatus.ACTIVE]);
      console.log('after update ', currentStatus);
    } catch (e) {
      console.error('Error while activating the sensor...');
    }
  };

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

            {/* <TextField */}
            {/*  className={classes.reviewField} */}
            {/*  id="sensorStatus" */}
            {/*  label="Sensor Status" */}
            {/*  defaultValue={SensorStatus[sensor.sensorStatus]} */}
            {/*  InputProps={{ */}
            {/*    readOnly: true, */}
            {/*  }} */}
            {/*  variant="outlined" */}
            {/* /> */}

            <div
              style={{
                display: 'flex',
              }}
            >
              {/* <Select */}
              {/*  style={{ */}
              {/*    width: '75%', */}
              {/*  }} */}
              {/*  className={classes.reviewField} */}
              {/*  variant="outlined" */}
              {/*  id="sensorStatus" */}
              {/*  label="Sensor Status" */}
              {/*  native */}
              {/*  value={currentStatus} */}
              {/*  inputProps={{ */}
              {/*    name: 'sensorStatus', */}
              {/*    id: 'sensorStatus', */}
              {/*    label: 'Sensor Status', */}
              {/*  }} */}
              {/*  onChange={handleChangeStatus} */}
              {/* > */}
              {/*  {Object.keys(SensorStatus) */}
              {/*    // eslint-disable-next-line no-restricted-globals */}
              {/*    .filter((key) => !isNaN(Number(SensorStatus[key]))) */}
              {/*    .map((status) => { */}
              {/*      return ( */}
              {/*        <option key={uuid()} value={status}> */}
              {/*          {status} */}
              {/*        </option> */}
              {/*      ); */}
              {/*    })} */}
              {/* </Select> */}

              <TextField
                style={{
                  width: '75%',
                }}
                className={classes.reviewField}
                id="sensorStatus"
                label="Sensor Status"
                defaultValue={currentStatus}
                value={currentStatus}
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
                variant="outlined"
                size="small"
                onClick={onUpdateSensorStatusClicked}
                disabled={currentStatus === SensorStatus[SensorStatus.ACTIVE]}
              >
                Activate Sensor
              </Button>
            </div>
          </Box>
        </Box>
      </PerfectScrollbar>
    </Paper>
  );
}

export default SensorDetails;
