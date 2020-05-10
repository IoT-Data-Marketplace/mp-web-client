import React from 'react';
import { Box, Container } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Page from '../../../../components/Page';
import Header from './Header';
import LineChart from './LineChart';

interface RouterProps {
  match: any;
}

type Props = RouterProps;

function SensorListView({ match }: Props) {
  console.log('match: ', match.params.sensorContractAddress);
  return (
    <Page title="Data Streaming">
      <Container maxWidth="lg">
        <Header />
        <Box mt={3}>
          <Grid item xs={12}>
            <LineChart />
          </Grid>
        </Box>
      </Container>
    </Page>
  );
}

export default SensorListView;
