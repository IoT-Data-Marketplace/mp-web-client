import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { Box, Button, TextField, makeStyles } from '@material-ui/core';
import { StoreState } from '../../../interfaces';

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
  const { accountRoles } = useSelector(
    (state: StoreState) => state.defaultValues
  );
  const { className, rest, onSubmitSuccess } = props;

  return (
    <Formik
      initialValues={{
        accountRole: '',
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string()
          .email('Must be a valid email')
          .max(255)
          .required('Email is required'),
        password: Yup.string().max(255).required('Password is required'),
        accountRole: Yup.string().required('Please select your Role'),
      })}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        console.log('submitting the form...');
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
          <TextField
            error={Boolean(touched.accountRole && errors.accountRole)}
            helperText={touched.accountRole && errors.accountRole}
            fullWidth
            autoFocus
            margin="normal"
            label="Select Role"
            name="accountRole"
            onChange={handleChange}
            select
            SelectProps={{ native: true }}
            value={values.accountRole}
            variant="outlined"
          >
            {accountRoles.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </TextField>

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
