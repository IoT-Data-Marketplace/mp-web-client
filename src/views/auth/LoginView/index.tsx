import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import DeviceHubOutlinedIcon from '@material-ui/icons/DeviceHubOutlined';
import { useHistory } from 'react-router';
import {
  Avatar,
  Button,
  Box,
  Container,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Link,
  Typography,
  colors,
  makeStyles,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import LockIcon from '@material-ui/icons/Lock';
import Page from '../../../components/Page';
import LoginForm from './LoginForm';

const useStyles = makeStyles((theme: any) => ({
  backButton: {
    marginLeft: theme.spacing(2),
  },
  card: {
    overflow: 'visible',
    display: 'flex',
    position: 'relative',
    '& > *': {
      flexGrow: 1,
      flexBasis: '50%',
      width: '50%',
    },
  },
  content: {
    padding: theme.spacing(8, 4, 3, 4),
  },
  icon: {
    backgroundColor: colors.green[500],
    color: theme.palette.common.white,
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(1),
    position: 'absolute',
    top: -32,
    left: theme.spacing(3),
    height: 64,
    width: 64,
  },
  media: {
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
    padding: theme.spacing(3),
    color: theme.palette.common.white,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
}));

function LoginView() {
  const classes = useStyles();
  const history = useHistory();

  const handleSubmitSuccess = () => {
    history.push('/app');
  };

  return (
    <Page title="Login">
      <Container maxWidth="md">
        <Box mb={8} display="flex" alignItems="center">
          <RouterLink to="/">
            <DeviceHubOutlinedIcon />
          </RouterLink>
          <Button component={RouterLink} to="/" className={classes.backButton}>
            Back to home
          </Button>
        </Box>
        <Card className={classes.card}>
          <CardContent className={classes.content}>
            <Avatar className={classes.icon}>
              <LockIcon fontSize="large" />
            </Avatar>
            <Typography variant="h2" color="textPrimary">
              Sign in
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              Sign in to the IoT Data Marketplace Platform
            </Typography>
            <Box mt={2}>
              <Alert severity="info">
                <div>
                  Make sure that your Metamask Browser Extension is turned on and your account is the owner of the Data Stream
                  Entity Contract Address
                </div>
              </Alert>
            </Box>
            <Box mt={3}>
              <LoginForm onSubmitSuccess={handleSubmitSuccess} />
            </Box>
            <Box my={2}>
              <Divider />
            </Box>
            <Link component={RouterLink} to="/register" variant="body2" color="textSecondary">
              Create new account
            </Link>
          </CardContent>
          <CardMedia className={classes.media} image="/static/images/IoTSolutions.svg" title="Cover" />
        </Card>
      </Container>
    </Page>
  );
}

export default LoginView;
