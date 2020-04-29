import React from 'react';
import clsx from 'clsx';
import {
  Avatar,
  Box,
  Container,
  Grid,
  Typography,
  makeStyles,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    paddingTop: 128,
    paddingBottom: 128,
  },
  avatar: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
  },
}));

interface Props {
  className?: string;
  rest?: any;
}

function Features(props: Props) {
  const classes = useStyles();

  const { className, rest } = props;

  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <Container maxWidth="lg">
        <Typography
          component="p"
          variant="overline"
          color="secondary"
          align="center"
        >
          Explore
        </Typography>
        <Typography variant="h1" align="center" color="textPrimary">
          Explore the Marketplace
        </Typography>
        <Box mt={8}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Box display="flex">
                <Avatar className={classes.avatar}>01</Avatar>
                <Box ml={2}>
                  <Typography variant="h4" gutterBottom color="textPrimary">
                    200 Data Sellers
                  </Typography>
                  <Typography variant="body1" color="textPrimary">
                    There are currently over 200 data sellers
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box display="flex">
                <Avatar className={classes.avatar}>02</Avatar>
                <Box ml={2}>
                  <Typography variant="h4" gutterBottom color="textPrimary">
                    3000 Sensors
                  </Typography>
                  <Typography variant="body1" color="textPrimary">
                    There are currently over 3000 sensors generating the data
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box display="flex">
                <Avatar className={classes.avatar}>03</Avatar>
                <Box ml={2}>
                  <Typography variant="h4" gutterBottom color="textPrimary">
                    500 Data Streams
                  </Typography>
                  <Typography variant="body1" color="textPrimary" gutterBottom>
                    Chose from 500+ data streams
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </div>
  );
}

export default Features;
