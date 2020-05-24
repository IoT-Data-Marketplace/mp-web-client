import React, { useEffect } from 'react';
import { Box, Container } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import Page from '../../../../components/Page';
import Header from './Header';
import { getAllDataMarketplaceSensors } from '../../../../state/actions/sensor/sensor';
import Results from './Results';

function SensorListView() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllDataMarketplaceSensors());
  }, [dispatch]);

  return (
    <Page title="Sensor  List">
      <Container>
        <Header />
        <Box mt={3}>
          <Results />
        </Box>
      </Container>
    </Page>
  );
}

export default SensorListView;
