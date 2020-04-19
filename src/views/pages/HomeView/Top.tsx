import React from 'react';
import clsx from 'clsx';
import { Box, Container, Grid, Typography } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: any) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    paddingTop: 200,
    paddingBottom: 200,
    [theme.breakpoints.down('md')]: {
      paddingTop: 60,
      paddingBottom: 60,
    },
  },
  image: {
    perspectiveOrigin: 'left center',
    transformStyle: 'preserve-3d',
    perspective: 1500,
    '& > img': {
      maxWidth: '90%',
      height: 'auto',
      transform: 'rotateY(-35deg) rotateX(15deg)',
      backfaceVisibility: 'hidden',
      boxShadow: theme.shadows[16],
    },
  },
}));

interface Props {
  className?: string;
  rest?: any;
}

function Top(props: Props) {
  const classes = useStyles();
  const { className, rest } = props;

  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={12} md={5}>
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="center"
              height="100%"
            >
              <Typography variant="overline" color="secondary">
                Introducing
              </Typography>
              <Typography variant="h1" color="textPrimary">
                IoT Data Marketplace Powered by Blockchain
              </Typography>
              <Box mt={3}>
                <Typography variant="body1" color="textSecondary">
                  Data Sovereignty Provision in Cloud-and-Blockchain-Integrated
                  IoT Data Platform
                </Typography>
              </Box>
              <Box mt={3}>
                <Grid container spacing={3}>
                  <Grid item>
                    <Typography variant="h1" color="secondary">
                      200+
                    </Typography>
                    <Typography variant="overline" color="textSecondary">
                      Data Sellers
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="h1" color="secondary">
                      3000+
                    </Typography>
                    <Typography variant="overline" color="textSecondary">
                      Sensors
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="h1" color="secondary">
                      500+
                    </Typography>
                    <Typography variant="overline" color="textSecondary">
                      Streams
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={7}>
            <Box position="relative">
              <div className={classes.image}>
                <img alt="Presentation" src="/static/home/IoTSolutions.svg" />
              </div>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default Top;
