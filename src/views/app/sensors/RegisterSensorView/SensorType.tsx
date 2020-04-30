import React, { useState } from 'react';
import clsx from 'clsx';
import { Box, Paper, FormHelperText, Typography, Radio, Button, makeStyles } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { setSensorType } from '../../../../state/actions/registerSensor';
import { SensorType as SenType } from '../../../../state/interfaces/sensor';
import { StoreState } from '../../../../state/interfaces/storeState';

const typeOptions = [
  {
    value: SenType.TEMPERATURE,
    title: 'Temperature',
    description: 'It measures the Temperature...',
  },
  {
    value: SenType.HUMIDITY,
    title: 'Humidity',
    description: 'It measures the Humidity...',
  },
  {
    value: SenType.AIR_POLUTION,
    title: 'Air Polution',
    description: 'It measures the Air Polution...',
  },
];

const useStyles = makeStyles((theme) => ({
  root: {},
  stepButton: {
    '& + &': {
      marginLeft: theme.spacing(2),
    },
  },
  paper: {
    display: 'flex',
    alignItems: 'flex-start',
    padding: theme.spacing(2),
    margin: theme.spacing(2),
  },
}));

interface Props {
  className?: string;
  rest?: any;
  onNext?: any;
  onBack?: any;
}

function SensorType(props: Props) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { sensorType } = useSelector((state: StoreState) => state.registerSensor);
  const [isSubmitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const { className, rest, onNext, onBack } = props;

  const handleChange = (newType) => {
    dispatch(setSensorType(newType));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Do api call
      setSubmitting(false);

      if (onNext) {
        onNext();
      }
    } catch (err) {
      setError(err.message);
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={clsx(classes.root, className)} {...rest}>
      <Typography variant="h3" color="textPrimary">
        Please select the sensor type
      </Typography>
      <Box mt={2}>
        <Typography variant="subtitle1" color="textSecondary">
          It determines what kind of data you want to push and sell
        </Typography>
      </Box>
      <Box mt={2}>
        {typeOptions.map((typeOption) => (
          <Paper
            className={classes.paper}
            component={Box}
            elevation={sensorType === typeOption.value ? 10 : 1}
            key={typeOption.value}
          >
            <Radio checked={sensorType === typeOption.value} onClick={() => handleChange(typeOption.value)} />
            <Box ml={2}>
              <Typography gutterBottom variant="h5" color="textPrimary">
                {typeOption.title}
              </Typography>
              <Typography variant="body1" color="textPrimary">
                {typeOption.description}
              </Typography>
            </Box>
          </Paper>
        ))}
      </Box>
      {error && (
        <Box mt={2}>
          <FormHelperText error>{error}</FormHelperText>
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
          Geolocation
        </Button>
      </Box>
    </form>
  );
}

export default SensorType;
