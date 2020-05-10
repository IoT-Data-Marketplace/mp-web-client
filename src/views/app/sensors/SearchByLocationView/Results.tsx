import React from 'react';
import { useSelector } from 'react-redux';
import { Card } from '@material-ui/core';
import { Map, Marker, TileLayer } from 'react-leaflet';
import { StoreState } from '../../../../state/interfaces/storeState';
import useWindowDimensions from '../../../../hooks/useWindowDimensions';
import SensorDetailsPopup from './SensorDetailsPopup';

enum SensorStatusColor {
  warning,
  success,
  error,
}

const Results = () => {
  const { sensors } = useSelector((state: StoreState) => state.sensor);
  const { height } = useWindowDimensions();

  const position = [sensors[0].geolocation.latitude, sensors[0].geolocation.longitude];

  const markers = sensors.map((sensor) => (
    <Marker key={sensor.sensorContractAddress} position={[sensor.geolocation.latitude, sensor.geolocation.longitude]}>
      <SensorDetailsPopup sensor={sensor} />
    </Marker>
  ));

  console.log('sensors: ', sensors);
  return (
    <Card>
      <Map
        style={{
          height: height * 0.8,
          width: '100%',
          background: 'black',
        }}
        center={position}
        zoom={9}
      >
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {markers}
      </Map>
    </Card>
  );
};

export default Results;
