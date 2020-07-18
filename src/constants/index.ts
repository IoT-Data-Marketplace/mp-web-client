/* eslint-disable import/prefer-default-export */
export const ROUTES = {
  ROOT: '/',
  HOME: '/home',
  LOGIN: '/login',
  REGISTER: '/register',
  APP: '/app',
  APP_OVERVIEW: '/app/overview',
  SENSORS: '/app/sensors',
  DATA_STREAMS: '/app/data-streams',
  SEARCH_DATA_STREAMS_BY_LOCATION: '/app/data-streams/search/location',
  DATA_STREAM_FOR_SENSOR: '/app/data-streams/:sensorContractAddress',
  BUY_DATA_STREAM: '/app/data-streams/buy/:sensorContractAddress',
  VIEW_SENSOR_FOR_ADDRESS: '/app/sensors/:sensorContractAddress',
  REGISTER_SENSOR: '/app/sensors/register',
  NOT_FOUND: '/404',
};

export const DEFAULT_ETH_ADDRESS = '0x0000000000000000000000000000000000000000';

export const baseEndpoint = process.env.NODE_ENV === 'production' ? 'https://iot-data-mp.com' : 'http://localhost:8050';
