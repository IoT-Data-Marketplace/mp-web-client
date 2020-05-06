import React from 'react';
import { Box, Container } from '@material-ui/core';
import Page from '../../components/Page';
import Header from './Header';
import Statistics from './Statistics';

function OverviewView() {
  return (
    <Page title="Overview">
      <Container maxWidth="lg">
        <Header />
        <Box mt={3}>
          <Statistics />
        </Box>
      </Container>
    </Page>
  );
}

export default OverviewView;
