import React from 'react';
import clsx from 'clsx';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { Box, Button, makeStyles, TextField, Typography } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { StoreState } from '../../../../state/interfaces/storeState';
import { setPricePerDataUnit } from '../../../../state/actions/sensor/registerSensor';
import web3 from '../../../../blockchain/web3';

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

function PricePerDataUnit(props: Props) {
  const classes = useStyles();
  const { className, rest, onNext, onBack } = props;
  const { pricePerDataUnit } = useSelector((state: StoreState) => state.registerSensor);
  const dispatch = useDispatch();

  return (
    <Formik
      initialValues={{
        pricePerDataUnit,
      }}
      validationSchema={Yup.object().shape({
        pricePerDataUnit: Yup.string().required('This field is required.'),
      })}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        try {
          dispatch(setPricePerDataUnit(values.pricePerDataUnit));
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
            Please enter the Price for the Sensor Data Entry
          </Typography>
          <Box mt={2}>
            <Box mt={2}>
              <Typography variant="subtitle1" color="textSecondary">
                Price per Data Entry
              </Typography>
            </Box>
            <TextField
              error={Boolean(touched.pricePerDataUnit && errors.pricePerDataUnit)}
              fullWidth
              helperText={touched.pricePerDataUnit && errors.pricePerDataUnit}
              label="WEI"
              margin="normal"
              name="pricePerDataUnit"
              onBlur={handleBlur}
              onChange={handleChange}
              type="number"
              value={values.pricePerDataUnit}
              variant="outlined"
            />
          </Box>
          <Box mt={2}>
            <Box mt={2}>
              <Typography variant="subtitle1" color="textSecondary">
                For 1 Million Data Entries you earn
              </Typography>
            </Box>
            <TextField
              error={Boolean(touched.pricePerDataUnit && errors.pricePerDataUnit)}
              fullWidth
              helperText={touched.pricePerDataUnit && errors.pricePerDataUnit}
              label="ETH"
              margin="normal"
              name="earnings"
              onBlur={handleBlur}
              onChange={handleChange}
              type="number"
              value={web3.utils.fromWei((values.pricePerDataUnit * 1000000).toString(), 'ether')}
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

export default PricePerDataUnit;
