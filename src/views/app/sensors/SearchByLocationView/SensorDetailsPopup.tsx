import React from 'react';
import { Popup } from 'react-leaflet';
import TextField from '@material-ui/core/TextField';
import { Box, Button, Card, makeStyles, Typography } from '@material-ui/core';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Link as RouterLink } from 'react-router-dom';
import { Sensor, SensorType } from '../../../../state/interfaces';
import theme from '../../../../theme/Theme';
import { ROUTES } from '../../../../constants';

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
          height: '350px',
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
      <Box
        mt={6}
        style={{
          marginTop: theme.spacing(1),
        }}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        {sensor.subscribed ? (
          <Button
            color="inherit"
            component={RouterLink}
            to={`${ROUTES.DATA_STREAMS}/${sensor.sensorContractAddress}`}
            variant="contained"
            size="large"
          >
            Start Streaming
          </Button>
        ) : (
          <Button
            color="inherit"
            component={RouterLink}
            to={`/app/data-streams/buy/${sensor.sensorContractAddress}`}
            variant="contained"
            size="large"
          >
            Buy This Data Stream
          </Button>
        )}



      </Box>
    </Popup>
  );
};

export default SensorDetailsPopup;
