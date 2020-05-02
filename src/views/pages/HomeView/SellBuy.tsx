import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import { Box, Button, Container, Typography, makeStyles, Grid } from '@material-ui/core';

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
          <Button color="secondary" component={RouterLink} to="/app" variant="contained" size="large">
            Join the Platform
          </Button>
        </Box>
      </Container>
    </div>
  );
}

export default SellBuy;
