import React, { useEffect } from 'react';
import { Box, Container } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Page from '../../../../components/Page';
import Header from './Header';
import { StoreState } from '../../../../state/interfaces/storeState';
import BuyDataStreamForm from './BuyDataStreamForm';

function SubscribeToAStreamView() {
  const { sensors } = useSelector((state: StoreState) => state.sensor);

  const { sensorContractAddress } = useParams();

  let sensor = {
    dataStreamEntityContractAddress: '',
    sensorContractAddress: '',
    sensorType: 0,
    geolocation: {
      latitude: '',
      longitude: '',
    },
    sensorStatus: 0,
    streamSize: 0,
    pricePerDataUnit: 0,
    subscribed: false,
  };

  const found = sensors.find((sen) => sen.sensorContractAddress === sensorContractAddress);

  if (found !== undefined) {
    sensor = {
      dataStreamEntityContractAddress: found.dataStreamEntityContractAddress,
      sensorContractAddress: found.sensorContractAddress,
      sensorType: found.sensorType,
      geolocation: {
        latitude: found.geolocation.latitude,
        longitude: found.geolocation.longitude,
      },
      sensorStatus: found.sensorStatus,
      streamSize: found.streamSize,
      pricePerDataUnit: found.pricePerDataUnit,
      subscribed: found.subscribed,
    };
  }

  return (
    <Page title="Sensor  List">
      <Container>
        <Header sensorContractAddress={sensorContractAddress} />
        <Box mt={3}>
          <BuyDataStreamForm sensor={sensor} />
        </Box>
      </Container>
    </Page>
  );
}

export default SubscribeToAStreamView;
