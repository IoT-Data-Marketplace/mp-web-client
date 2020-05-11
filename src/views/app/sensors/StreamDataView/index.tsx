import React from 'react';
import { Box, Container } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Page from '../../../../components/Page';
import Header from './Header';
import LineChart from './LineChart';
import RadialChart from './RadialChart';
import ConfigureStreamView from './ConfigureStreamView';

interface RouterProps {
  match: any;
}

type Props = RouterProps;

function SensorListView({ match }: Props) {
  return (
    <Page title="Data Streaming">
      <Container maxWidth="lg">
        <Header sensorContractAddress={match.params.sensorContractAddress} />
        <Box mt={3}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <LineChart />
            </Grid>
            <Grid item xs={12} md={8}>
              <ConfigureStreamView sensorContractAddress={match.params.sensorContractAddress} />
            </Grid>
            <Grid item xs={12} md={4}>
              <RadialChart />
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Page>
  );
}

export default SensorListView;
