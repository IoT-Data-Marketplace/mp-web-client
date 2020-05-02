import React, { useState } from 'react';
import clsx from 'clsx';
import { Box, Button, FormHelperText, Paper, Typography, makeStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { useDispatch, useSelector } from 'react-redux';
import { StoreState } from '../../../../state/interfaces/storeState';
import theme from '../../../../theme/Theme';
import { registerSensor } from '../../../../state/actions/registerSensor';
import {SensorType} from "../../../../state/interfaces";

const useStyles = makeStyles(() => ({
  root: {},
  editor: {
    '& .ql-editor': {
      height: 400,
    },
  },
  reviewGrid: {
    display: 'grid',
  },
  reviewField: {
    margin: theme.spacing(2),
  },
}));

interface Props {
  className?: string;
  rest?: any;
  onComplete?: any;
  onBack?: any;
}

function SensorReviewRegister(props: Props) {
  const classes = useStyles();
  const sensorToRegister = useSelector((state: StoreState) => state.registerSensor);
  const { geolocation, sensorType } = sensorToRegister;
  const { dataStreamEntityContractAddress } = useSelector((state: StoreState) => state.dataStreamEntity);
  const dispatch = useDispatch();
  const [isSubmitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const { className, rest, onComplete, onBack } = props;

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await dispatch(registerSensor(sensorToRegister, dataStreamEntityContractAddress));

      // Do api call
      setSubmitting(false);

      if (onComplete) {
        onComplete();
      }
    } catch (err) {
      setError(err.message);
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={clsx(classes.root, className)} {...rest}>
      <Typography variant="h3" color="textPrimary">
        Review you Sensor Details
      </Typography>
      <Box mt={2}>
        <Typography variant="subtitle1" color="textSecondary">
          Here you can review your Sensor Information before you register it.
        </Typography>
      </Box>
      <Box mt={2} className={classes.reviewGrid}>
        <TextField
          className={classes.reviewField}
          id="sensorType"
          label="Sensor Type"
          defaultValue={SensorType[sensorType]}
          InputProps={{
            readOnly: true,
          }}
          variant="outlined"
        />

        <TextField
          className={classes.reviewField}
          id="latitude"
          label="Latitude"
          defaultValue={geolocation.latitude}
          InputProps={{
            readOnly: true,
          }}
          variant="outlined"
        />

        <TextField
          className={classes.reviewField}
          id="Longitude"
          label="Longitude"
          defaultValue={geolocation.longitude}
          InputProps={{
            readOnly: true,
          }}
          variant="outlined"
        />
      </Box>
      {error && (
        <Box mt={2}>
          <FormHelperText error>{FormHelperText}</FormHelperText>
        </Box>
      )}
      <Box mt={6} display="flex">
        {onBack && (
          <Button onClick={onBack} size="large">
            Previous
          </Button>
        )}
        <Box flexGrow={1} />
        <Button color="secondary" disabled={isSubmitting} type="submit" variant="contained" size="large">
          Register Sensor
        </Button>
      </Box>
    </form>
  );
}

export default SensorReviewRegister;
