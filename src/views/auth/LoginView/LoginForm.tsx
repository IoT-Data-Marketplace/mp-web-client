import React from 'react';
import { useDispatch } from 'react-redux';
import clsx from 'clsx';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { Box, Button, makeStyles, TextField } from '@material-ui/core';
import { signIn } from '../../../state/actions';

const useStyles = makeStyles(() => ({
  root: {},
}));

interface Props {
  className?: string;
  rest?: any;
  onSubmitSuccess: any;
}

function LoginForm(props: Props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { className, rest, onSubmitSuccess } = props;

  return (
    <Formik
      initialValues={{
        dataStreamEntityContractAddress: '',
      }}
      validationSchema={Yup.object().shape({
        dataStreamEntityContractAddress: Yup.string().matches(/0x+[A-F,a-f,0-9]{40}/, { excludeEmptyString: true }),
      })}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        try {
          await dispatch(
            signIn({
              dataStreamEntityContractAddress: values.dataStreamEntityContractAddress,
            })
          );
          onSubmitSuccess();
        } catch (error) {
          // setStatus({ success: false });
          // setErrors({ submit: error.message });
          // setSubmitting(false);
        }
      }}
    >
      {({ errors, handleChange, handleBlur, handleSubmit, isSubmitting, touched, values }) => (
        <form noValidate className={clsx(classes.root, className)} onSubmit={handleSubmit} {...rest}>
          <TextField
            error={Boolean(touched.dataStreamEntityContractAddress && errors.dataStreamEntityContractAddress)}
            fullWidth
            helperText={touched.dataStreamEntityContractAddress && errors.dataStreamEntityContractAddress}
            label="Data Stream Entity Contract Address"
            margin="normal"
            name="dataStreamEntityContractAddress"
            onBlur={handleBlur}
            onChange={handleChange}
            type="string"
            value={values.dataStreamEntityContractAddress}
            variant="outlined"
          />
          <Box mt={2}>
            <Button color="secondary" disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained">
              Log In
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  );
}

export default LoginForm;
