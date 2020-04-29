import React from 'react';
import { Box, Container, makeStyles } from '@material-ui/core';
import Page from '../../components/Page';
import Header from './Header';
import Statistics from './Statistics';

const useStyles = makeStyles((theme: any) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    height: '1000px',
    paddingTop: theme.spacing(10),
    paddingBottom: theme.spacing(3),
  },
}));

function OverviewView() {
  const classes = useStyles();

  return (
    <Page className={classes.root} title="Overview">
      <Container maxWidth="lg">
        <Header />
        <Box mt={3}>
          <div>box1</div>
          <Statistics />
        </Box>
        <Box mt={6}>
          <div>box2</div>
          {/* <Notifications /> */}
        </Box>
        <Box mt={6}>
          <div>box3</div>
          {/* <Projects /> */}
        </Box>
        <Box mt={6}>
          <div>box4</div>
          {/* <Todos /> */}
        </Box>
      </Container>
    </Page>
  );
}

export default OverviewView;
