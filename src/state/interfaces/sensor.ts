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
  generatedContractAddress: string;
  sensorType: SensorType;
  geolocation: Geolocation;
}

export interface IoTSensor {
  sensorContractAddress: string;
  sensorType: SensorType;
  geolocation: Geolocation;
}
