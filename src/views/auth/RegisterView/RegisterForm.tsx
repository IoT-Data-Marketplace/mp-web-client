import React from 'react';
import { useDispatch } from 'react-redux';
import clsx from 'clsx';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { Box, Button, Checkbox, FormHelperText, Link, makeStyles, TextField, Typography } from '@material-ui/core';
import { signUp } from '../../../state/actions/auth';

const useStyles = makeStyles(() => ({
  root: {},
}));

interface Props {
  className?: string;
  rest?: any;
  onSubmitSuccess: any;
}

function RegisterForm(props: Props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { className, rest, onSubmitSuccess } = props;

  return (
    <Formik
      initialValues={{
        accountName: 'Danijel',
        accountURL: 'http://www.danijel.com',
        accountEmail: 'danijel.fon@gmail.com',
        rsaPublicKey: '',
        policy: false,
      }}
      validationSchema={Yup.object().shape({
        accountName: Yup.string().max(255).required('Name is required'),
        accountURL: Yup.string().url('Must be a valid URL').max(255),
        accountEmail: Yup.string().email('Must be a valid Email').max(255),
        rsaPublicKey: Yup.string().required('Required'),
        // .matches(/^-----BEGIN PUBLIC KEY-----((.)*)-----END PUBLIC KEY-----$/, {
        //   excludeEmptyString: true,
        //   message: 'Please enter a valid RSA Public Key',
        // }),
        policy: Yup.boolean().oneOf([true], 'This field must be checked'),
      })}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        try {
          await dispatch(
            signUp({
              accountName: values.accountName,
              accountURL: values.accountURL,
              accountEmail: values.accountEmail,
              rsaPublicKey: values.rsaPublicKey,
            })
          );
          onSubmitSuccess();
        } catch (error) {
          console.error(error);
        }
      }}
    >
      {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
        <form className={clsx(classes.root, className)} onSubmit={handleSubmit} {...rest}>
          <TextField
            error={Boolean(touched.accountName && errors.accountName)}
            fullWidth
            helperText={touched.accountName && errors.accountName}
            label="Name"
            margin="normal"
            name="accountName"
            onBlur={handleBlur}
            onChange={handleChange}
            type="accountName"
            value={values.accountName}
            variant="outlined"
          />
          <TextField
            error={Boolean(touched.accountURL && errors.accountURL)}
            fullWidth
            helperText={touched.accountURL && errors.accountURL}
            label="URL"
            margin="normal"
            name="accountURL"
            onBlur={handleBlur}
            onChange={handleChange}
            type="accountURL"
            value={values.accountURL}
            variant="outlined"
          />
          <TextField
            error={Boolean(touched.accountEmail && errors.accountEmail)}
            fullWidth
            helperText={touched.accountEmail && errors.accountEmail}
            label="Email Address"
            margin="normal"
            name="accountEmail"
            onBlur={handleBlur}
            onChange={handleChange}
            type="email"
            value={values.accountEmail}
            variant="outlined"
          />
          <TextField
            error={Boolean(touched.rsaPublicKey && errors.rsaPublicKey)}
            fullWidth
            helperText={touched.rsaPublicKey && errors.rsaPublicKey}
            label="RSA Public Key"
            margin="normal"
            multiline
            rows={4}
            name="rsaPublicKey"
            onBlur={handleBlur}
            onChange={handleChange}
            type="email"
            value={values.rsaPublicKey}
            variant="outlined"
          />

          <Box alignItems="center" display="flex" mt={2} ml={-1}>
            <Checkbox checked={values.policy} name="policy" onChange={handleChange} />
            <Typography variant="body2" color="textSecondary">
              I have read the{' '}
              <Link component="a" href="#" color="secondary">
                Terms and Conditions
              </Link>
            </Typography>
          </Box>
          {Boolean(touched.policy && errors.policy) && <FormHelperText error>{errors.policy}</FormHelperText>}
          <Box mt={2}>
            <Button color="secondary" disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained">
              Create account
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  );
}

export default RegisterForm;
