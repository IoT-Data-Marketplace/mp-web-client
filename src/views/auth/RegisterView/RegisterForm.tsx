import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Checkbox,
  FormHelperText,
  TextField,
  Typography,
  Link,
  makeStyles,
} from '@material-ui/core';
import { StoreState } from '../../../interfaces';

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
  const { accountRoles } = useSelector(
    (state: StoreState) => state.defaultValues
  );

  return (
    <Formik
      initialValues={{
        accountName: '',
        accountURL: '',
        accountEmail: '',
        accountRole: '',
        policy: false,
      }}
      validationSchema={Yup.object().shape({
        accountName: Yup.string().max(255).required('Name is required'),
        accountURL: Yup.string().url('Must be a valid URL').max(255),
        accountEmail: Yup.string().email('Must be a valid Email').max(255),
        accountRole: Yup.string().required('Please select your Role'),
        policy: Yup.boolean().oneOf([true], 'This field must be checked'),
      })}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        console.log('registering ...');
      }}
    >
      {({
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        isSubmitting,
        touched,
        values,
      }) => (
        <form
          className={clsx(classes.root, className)}
          onSubmit={handleSubmit}
          {...rest}
        >
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
            error={Boolean(touched.accountRole && errors.accountRole)}
            helperText={touched.accountRole && errors.accountRole}
            fullWidth
            autoFocus
            // onBlur={handleBlur}
            margin="normal"
            label="Role"
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

          <Box alignItems="center" display="flex" mt={2} ml={-1}>
            <Checkbox
              checked={values.policy}
              name="policy"
              onChange={handleChange}
            />
            <Typography variant="body2" color="textSecondary">
              I have read the{' '}
              <Link component="a" href="#" color="secondary">
                Terms and Conditions
              </Link>
            </Typography>
          </Box>
          {Boolean(touched.policy && errors.policy) && (
            <FormHelperText error>{errors.policy}</FormHelperText>
          )}
          <Box mt={2}>
            <Button
              color="secondary"
              disabled={isSubmitting}
              fullWidth
              size="large"
              type="submit"
              variant="contained"
            >
              Create account
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  );
}

export default RegisterForm;
