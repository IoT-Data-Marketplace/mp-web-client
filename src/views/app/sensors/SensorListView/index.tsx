import React, { useEffect } from 'react';
import { Box, Container } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import Page from '../../../../components/Page';
import Header from './Header';
import { StoreState } from '../../../../state/interfaces/storeState';
import { getSensorsForDataStreamEntityContractAddress } from '../../../../state/actions/sensor';
import Results from './Results';

function SensorListView() {
  const { dataStreamEntityContractAddress } = useSelector((state: StoreState) => state.dataStreamEntity);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSensorsForDataStreamEntityContractAddress(dataStreamEntityContractAddress));
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
