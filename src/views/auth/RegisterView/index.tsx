import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useHistory } from 'react-router';
import { Box, Button, Card, CardContent, Container, Divider, Link, Typography, makeStyles } from '@material-ui/core';
import LockIcon from '@material-ui/icons/Lock';
import { Alert } from '@material-ui/lab';
import Page from '../../../components/Page';
import RegisterForm from './RegisterForm';

const useStyles = makeStyles((theme: any) => ({
  backButton: {
    marginLeft: theme.spacing(2),
  },
}));

function RegisterView() {
  const classes = useStyles();
  const history = useHistory();

  const handleSubmitSuccess = () => {
    history.push('/app');
  };

  return (
    <Page title="Register">
      <Container maxWidth="sm">
        <Box mb={5} display="flex" alignItems="center">
          <RouterLink to="/">
            <LockIcon />
          </RouterLink>
          <Button component={RouterLink} to="/" className={classes.backButton}>
            Back to home
          </Button>
        </Box>
        <Card>
          <CardContent>
            <Typography gutterBottom variant="h2" color="textPrimary">
              Sign up
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              Sign up to the IoT Data Marketplace Platform
            </Typography>
            <Box mt={2}>
              <Alert severity="info">
                <div>Make sure you are using the right Ethereum Account with your Metamask Browser Extension</div>
              </Alert>
            </Box>
            <Box mt={3}>
              <RegisterForm onSubmitSuccess={handleSubmitSuccess} />
            </Box>
            <Box my={2}>
              <Divider />
            </Box>
            <Link component={RouterLink} to="/login" variant="body2" color="textSecondary">
              Have an account?
            </Link>
          </CardContent>
        </Card>
      </Container>
    </Page>
  );
}

export default RegisterView;
