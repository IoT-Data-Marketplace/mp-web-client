import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import {
  Box,
  Button,
  Container,
  Typography,
  makeStyles,
  Grid,
} from '@material-ui/core';

const useStyles = makeStyles((theme: any) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    paddingTop: 128,
    paddingBottom: 128,
  },
  browseButton: {
    marginLeft: theme.spacing(2),
  },
}));

interface Props {
  className?: string;
  rest?: any;
}

function SellBuy(props: Props) {
  const classes = useStyles();
  const { className, rest } = props;
  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <Container maxWidth="lg">
        <Typography variant="h1" align="center" color="textPrimary">
          Ready to start trading?
        </Typography>
        <Typography variant="h1" align="center" color="secondary">
          Chose whether you want to buy or sell data streams.
        </Typography>
        <Box mt={6} display="flex" justifyContent="center" alignItems="center">
          <Grid container spacing={3}>
            <Grid item xs={6} md={6}>
              <Box
                display="flex"
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <RouterLink to="/app">
                  <Button size="large" color="secondary" variant="contained">
                    buy
                  </Button>
                </RouterLink>
              </Box>
            </Grid>
            <Grid item xs={6} md={6}>
              <Box
                display="flex"
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <RouterLink to="/app">
                  <Button size="large" color="secondary" variant="contained">
                    Sell
                  </Button>
                </RouterLink>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </div>
  );
}

export default SellBuy;
