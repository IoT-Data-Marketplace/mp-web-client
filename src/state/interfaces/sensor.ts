export enum SensorType {
  TEMPERATURE,
  HUMIDITY,
  AIR_POLUTION,
}

export interface Geolocation {
  latitude: string;
  longitude: string;
}

export interface RegisterSensor {
  sensorType: SensorType;
  geolocation: Geolocation;
}
