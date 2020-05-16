import React from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Box, makeStyles, Paper, Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useDispatch } from 'react-redux';
import { Alert } from '@material-ui/lab';
import { Sensor, SensorStatus, SensorType } from '../../../../state/interfaces';
import theme from '../../../../theme/Theme';
import { activateSensor } from '../../../../state/actions/sensor/sensorStatus';
import web3 from '../../../../blockchain/web3';

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

function BuyDataStreamForm(props: Props) {
  const classes = useStyles();
  const { sensor } = props;
  const [currentStatus, setCurrentStatus] = React.useState(SensorStatus[sensor.sensorStatus]);
  const [numberOfEntriesToBuy, setNumberOfEntriesToBuy] = React.useState(0);
  const dispatch = useDispatch();

  const onUpdateSensorStatusClicked = async () => {
    try {
      await dispatch(activateSensor(sensor.sensorContractAddress));
      setCurrentStatus(SensorStatus[SensorStatus.ACTIVE]);
    } catch (e) {
      console.error('Error while activating the sensor...');
    }
  };

  return (
    <Paper>
      <PerfectScrollbar>
        <Box minWidth={800} p={6}>
          <Typography variant="h3" color="textPrimary">
            Data Stream Details
          </Typography>
          <Box mt={2}>
            <Typography variant="subtitle1" color="textSecondary">
              Here you can review the sensor details and chose how many data entries you want to buy
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
              defaultValue={currentStatus}
              value={currentStatus}
              InputProps={{
                readOnly: true,
              }}
              variant="outlined"
            />

            <TextField
              className={classes.reviewField}
              id="streamSize"
              label="Stream Size"
              defaultValue={sensor.streamSize}
              InputProps={{
                readOnly: true,
              }}
              variant="outlined"
            />

            <TextField
              className={classes.reviewField}
              id="pricePerDataUnit"
              label="Price Per Data Unit in WEI"
              defaultValue={sensor.pricePerDataUnit}
              InputProps={{
                readOnly: true,
              }}
              variant="outlined"
            />

            <TextField
              className={classes.reviewField}
              id="numOfEntriesToBuy"
              label="Number of Data Entries to buy"
              defaultValue={numberOfEntriesToBuy}
              value={numberOfEntriesToBuy}
              onChange={(event) => setNumberOfEntriesToBuy(parseInt(event.target.value, 10))}
              variant="outlined"
              type="number"
            />

            <Box mt={2}>
              <Typography variant="subtitle1" color="textSecondary">
                Total price for this stream
              </Typography>
            </Box>
            <TextField
              className={classes.reviewField}
              label="ETH"
              margin="normal"
              name="earnings"
              type="number"
              value={web3.utils.fromWei((numberOfEntriesToBuy * sensor.pricePerDataUnit).toString(), 'ether')}
              variant="outlined"
              InputProps={{
                readOnly: true,
              }}
            />

            <Button
              color="primary"
              variant="contained"
              size="large"
              onClick={() => console.log('buy data stream')}
            >
              Buy
            </Button>
          </Box>
        </Box>
      </PerfectScrollbar>
    </Paper>
  );
}

export default BuyDataStreamForm;
