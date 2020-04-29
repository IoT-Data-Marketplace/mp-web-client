import React from 'react';
import clsx from 'clsx';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { Box, Button, makeStyles } from '@material-ui/core';

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
  const { className, rest } = props;

  return (
    <Formik
      initialValues={{}}
      validationSchema={Yup.object().shape({
        email: Yup.string()
          .email('Must be a valid email')
          .max(255)
          .required('Email is required'),
        password: Yup.string().max(255).required('Password is required'),
      })}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        // try {
        //   await dispatch(login(values.email, values.password));
        //   onSubmitSuccess();
        // } catch (error) {
        //   const message = (error.response && error.response.data.message) || 'Something went wrong';
        //
        //   setStatus({ success: false });
        //   setErrors({ submit: message });
        //   setSubmitting(false);
        // }
      }}
    >
      {({
        errors,
        handleChange,
        handleSubmit,
        isSubmitting,
        touched,
        values,
      }) => (
        <form
          noValidate
          className={clsx(classes.root, className)}
          onSubmit={handleSubmit}
          {...rest}
        >
          <Box mt={2}>
            <Button
              color="secondary"
              disabled={isSubmitting}
              fullWidth
              size="large"
              type="submit"
              variant="contained"
            >
              Log In
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  );
}

export default LoginForm;
