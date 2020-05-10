import React from 'react';
import { Popup } from 'react-leaflet';
import TextField from '@material-ui/core/TextField';
import { makeStyles, Card, Box, Typography } from '@material-ui/core';
import PerfectScrollbar from 'react-perfect-scrollbar';
import Divider from '@material-ui/core/Divider';
import { Sensor, SensorType } from '../../../../state/interfaces';
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

const SensorDetailsPopup = (props: Props) => {
  const classes = useStyles();
  const { sensor } = props;
  return (
    <Popup>
      <Card
        style={{
          margin: 0,
          width: '300px',
          height: '500px',
          overflow: 'auto',
        }}
      >
        <PerfectScrollbar>
          <Typography
            style={{
              paddingBottom: theme.spacing(2),
            }}
            variant="h3"
            color="textPrimary"
          >
            Data Stream Details
          </Typography>

          <TextField
            className={classes.reviewField}
            id="sensorContractAddress"
            label="Sensor Contract Address"
            defaultValue={sensor.sensorContractAddress}
            InputProps={{
              readOnly: true,
            }}
            variant="outlined"
          />

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
            id="streamSize"
            label="Stream Size"
            defaultValue={sensor.streamSize}
            InputProps={{
              readOnly: true,
            }}
            variant="outlined"
          />
        </PerfectScrollbar>
      </Card>
    </Popup>
  );
};

export default SensorDetailsPopup;
