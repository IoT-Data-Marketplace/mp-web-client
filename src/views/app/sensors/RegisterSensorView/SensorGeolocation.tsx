import React, { createRef, useState } from 'react';
import clsx from 'clsx';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { Box, Button, Card, makeStyles, TextField, Typography } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { Map, Marker, TileLayer } from 'react-leaflet';
import { StoreState } from '../../../../state/interfaces/storeState';
import { setSensorGeolocation } from '../../../../state/actions/sensor/registerSensor';
import useWindowDimensions from '../../../../hooks/useWindowDimensions';

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
  const [markerPosition, setMarkerPosition] = useState([geolocation.latitude, geolocation.longitude]);
  const dispatch = useDispatch();
  const { height } = useWindowDimensions();

  // $FlowFixMe: ref
  const refmarker = createRef<Marker>();

  const updatePosition = () => {
    // eslint-disable-next-line no-shadow
    const marker = refmarker.current;
    if (marker != null) {
      console.log(marker.leafletElement.getLatLng());
      setMarkerPosition([marker.leafletElement.getLatLng().lat, marker.leafletElement.getLatLng().lng]);
    }
  };

  return (
    <Formik
      initialValues={{
        latitude: markerPosition[0],
        longitude: markerPosition[1],
      }}
      validationSchema={Yup.object().shape({
        latitude: Yup.string().required('Latitude field is required.'),
        // .matches(/^(\+|-)?(?:90(?:(?:\.0{1,6})?)|(?:[0-9]|[1-8][0-9])(?:(?:\.[0-9]{1,6})?))$/, {
        //   excludeEmptyString: true,
        //   message: 'Please enter a valid Latitude',
        // }),
        longitude: Yup.string().required('Longitude field is required.'),
        // .matches(/^(\+|-)?(?:180(?:(?:\.0{1,6})?)|(?:[0-9]|[1-9][0-9]|1[0-7][0-9])(?:(?:\.[0-9]{1,6})?))$/, {
        //   excludeEmptyString: true,
        //   message: 'Please enter a valid Longitude',
        // }),
      })}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        try {
          dispatch(
            setSensorGeolocation({
              latitude: markerPosition[0].toString(),
              longitude: markerPosition[1].toString(),
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
            <Card>
              <Map
                style={{
                  height: height * 0.5,
                  width: '100%',
                  background: 'black',
                }}
                center={markerPosition}
                zoom={9}
              >
                <TileLayer
                  attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker draggable onDragend={updatePosition} position={markerPosition} ref={refmarker} />
              </Map>
            </Card>
            <TextField
              error={Boolean(touched.latitude && errors.latitude)}
              fullWidth
              helperText={touched.latitude && errors.latitude}
              label="Latitude"
              margin="normal"
              name="latitude"
              onBlur={handleBlur}
              onChange={(event) => setMarkerPosition([event.target.value, markerPosition[1]])}
              type="string"
              value={markerPosition[0]}
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
              value={markerPosition[1]}
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
              Price per Data Unit
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  );
}

export default SensorGeolocation;
