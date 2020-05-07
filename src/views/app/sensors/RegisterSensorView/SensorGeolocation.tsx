import React from 'react';
import clsx from 'clsx';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { Box, Button, makeStyles, TextField, Typography } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { StoreState } from '../../../../state/interfaces/storeState';
import { setSensorGeolocation } from '../../../../state/actions/sensor/registerSensor';

const useStyles = makeStyles((theme) => ({
  root: {},
  addTab: {
    marginLeft: theme.spacing(2),
  },
  tag: {
    '& + &': {
      marginLeft: theme.spacing(1),
    },
  },
  datePicker: {
    '& + &': {
      marginLeft: theme.spacing(2),
    },
  },
}));

interface Props {
  className?: string;
  rest?: any;
  onNext?: any;
  onBack?: any;
}

function SensorGeolocation(props: Props) {
  const classes = useStyles();
  const { className, rest, onNext, onBack } = props;
  const { geolocation } = useSelector((state: StoreState) => state.registerSensor);
  const dispatch = useDispatch();

  return (
    <Formik
      initialValues={{
        latitude: geolocation.latitude,
        longitude: geolocation.longitude,
      }}
      validationSchema={Yup.object().shape({
        latitude: Yup.string()
          .required('Latitude field is required.')
          .matches(/^(\+|-)?(?:90(?:(?:\.0{1,6})?)|(?:[0-9]|[1-8][0-9])(?:(?:\.[0-9]{1,6})?))$/, {
            excludeEmptyString: true,
            message: 'Please enter a valid Latitude',
          }),
        longitude: Yup.string()
          .required('Longitude field is required.')
          .matches(/^(\+|-)?(?:180(?:(?:\.0{1,6})?)|(?:[0-9]|[1-9][0-9]|1[0-7][0-9])(?:(?:\.[0-9]{1,6})?))$/, {
            excludeEmptyString: true,
            message: 'Please enter a valid Longitude',
          }),
      })}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        try {
          dispatch(
            setSensorGeolocation({
              latitude: values.latitude,
              longitude: values.longitude,
            })
          );
          // Do API call to store step data in server session
          // It is important to have it on server to be able to reuse it if user
          // decides to continue later.
          setStatus({ success: true });
          setSubmitting(false);

          if (onNext) {
            onNext();
          }
        } catch (err) {
          // setErrors({ submit: err.message });
          // setStatus({ success: false });
          // setSubmitting(false);
        }
      }}
    >
      {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, setFieldValue, setFieldTouched, touched, values }) => (
        <form onSubmit={handleSubmit} className={clsx(classes.root, className)} {...rest}>
          <Typography variant="h3" color="textPrimary">
            Please enter the Coordinates of your Sensor
          </Typography>
          <Box mt={2}>
            <Typography variant="subtitle1" color="textSecondary">
              It has to be static for now
            </Typography>
          </Box>
          <Box mt={2}>
            <TextField
              error={Boolean(touched.latitude && errors.latitude)}
              fullWidth
              helperText={touched.latitude && errors.latitude}
              label="Latitude"
              margin="normal"
              name="latitude"
              onBlur={handleBlur}
              onChange={handleChange}
              type="string"
              value={values.latitude}
              variant="outlined"
            />
            <TextField
              error={Boolean(touched.longitude && errors.longitude)}
              fullWidth
              helperText={touched.longitude && errors.longitude}
              label="Longitude"
              margin="normal"
              name="longitude"
              onBlur={handleBlur}
              onChange={handleChange}
              type="longitude"
              value={values.longitude}
              variant="outlined"
            />
          </Box>
          <Box mt={6} display="flex">
            {onBack && (
              <Button onClick={onBack} size="large">
                Previous
              </Button>
            )}
            <Box flexGrow={1} />
            <Button color="secondary" disabled={isSubmitting} type="submit" variant="contained" size="large">
              Review & Register
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  );
}

export default SensorGeolocation;
