import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import {
  Avatar,
  Box,
  Breadcrumbs,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Link,
  Paper,
  Step,
  StepConnector,
  StepLabel,
  Stepper,
  Typography,
  makeStyles,
  withStyles,
  colors,
} from '@material-ui/core';
import DeviceHubIcon from '@material-ui/icons/DeviceHub';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { User as UserIcon, Star as StarIcon, Briefcase as BriefcaseIcon, File as FileIcon } from 'react-feather';
import { useSelector } from 'react-redux';
import Page from '../../../../components/Page';
import { ROUTES } from '../../../../constants';
import SensorType from './SensorType';
import SensorGeolocation from './SensorGeolocation';
import SensorReviewRegister from './SensorReviewRegister';
import { StoreState } from '../../../../state/interfaces/storeState';

const steps = [
  {
    label: 'Sensor Type',
    icon: DeviceHubIcon,
  },
  {
    label: 'Geolocation',
    icon: LocationOnIcon,
  },
  {
    label: 'Review & Register',
    icon: FileIcon,
  },
];

const CustomStepConnector = withStyles((theme) => ({
  vertical: {
    marginLeft: 19,
    padding: 0,
  },
  line: {
    borderColor: theme.palette.divider,
  },
}))(StepConnector);

const useCustomStepIconStyles = makeStyles((theme) => ({
  root: {},
  active: {
    backgroundColor: theme.palette.secondary.main,
    boxShadow: theme.shadows[10],
  },
  completed: {
    backgroundColor: theme.palette.secondary.main,
  },
}));

function CustomStepIcon({ active, completed, icon }) {
  const classes = useCustomStepIconStyles();

  const Icon = steps[icon - 1].icon;

  return (
    <Avatar
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed,
      })}
    >
      <Icon size="20" />
    </Avatar>
  );
}

CustomStepIcon.propTypes = {
  active: PropTypes.bool,
  completed: PropTypes.bool,
  icon: PropTypes.number,
};

const useStyles = makeStyles((theme: any) => ({
  root: {
    // backgroundColor: theme.palette.background.dark,
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
  },
  avatar: {
    backgroundColor: colors.red[600],
  },
}));

function ProjectCreateView() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState(false);
  const { generatedContractAddress } = useSelector((state: StoreState) => state.registerSensor);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleComplete = () => {
    setCompleted(true);
  };
  return (
    <Page title="Register Sensor">
      <Container maxWidth="lg">
        <Box mb={3}>
          <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
            <Link variant="body1" color="inherit" to={ROUTES.APP} component={RouterLink}>
              Dashboard
            </Link>
            <Typography variant="body1" color="textPrimary">
              Sensors
            </Typography>
            <Typography variant="body1" color="textPrimary">
              Register
            </Typography>
          </Breadcrumbs>
          <Typography variant="h3" color="textPrimary">
            Register new Sensor
          </Typography>
        </Box>
        {!completed ? (
          <Paper>
            <Grid container>
              <Grid item xs={12} md={3}>
                <Stepper
                  activeStep={activeStep}
                  connector={<CustomStepConnector />}
                  orientation="vertical"
                  component={Box}
                  // bgcolor="transparent"
                >
                  {steps.map((step) => (
                    <Step key={step.label}>
                      <StepLabel StepIconComponent={CustomStepIcon}>{step.label}</StepLabel>
                    </Step>
                  ))}
                </Stepper>
              </Grid>
              <Grid item xs={12} md={9}>
                <Box p={3}>
                  {activeStep === 0 && <SensorType onNext={handleNext} />}
                  {activeStep === 1 && <SensorGeolocation onBack={handleBack} onNext={handleNext} />}
                  {activeStep === 2 && <SensorReviewRegister onBack={handleBack} onComplete={handleComplete} />}
                </Box>
              </Grid>
            </Grid>
          </Paper>
        ) : (
          <Card>
            <CardContent>
              <Box maxWidth={450} mx="auto">
                <Box display="flex" justifyContent="center">
                  <Avatar className={classes.avatar}>
                    <StarIcon />
                  </Avatar>
                </Box>
                <Box mt={2}>
                  <Typography variant="h3" color="textPrimary" align="center">
                    You have successfully registered the sensor
                  </Typography>
                </Box>
                <Box mt={2} display="flex" justifyContent="center">
                  <Button
                    variant="contained"
                    color="secondary"
                    component={RouterLink}
                    to={`${ROUTES.SENSORS}/${generatedContractAddress}`}
                  >
                    See Sensor Details
                  </Button>
                </Box>
              </Box>
            </CardContent>
          </Card>
        )}
      </Container>
    </Page>
  );
}

export default ProjectCreateView;
