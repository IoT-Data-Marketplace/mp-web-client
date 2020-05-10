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
  VIEW_SENSOR_FOR_ADDRESS: '/app/sensors/:sensorContractAddress',
  REGISTER_SENSOR: '/app/sensors/register',
  NOT_FOUND: '/404',
};
