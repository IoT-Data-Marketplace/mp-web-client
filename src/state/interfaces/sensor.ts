export enum SensorType {
  TEMPERATURE,
  HUMIDITY,
  AIR_POLLUTION,
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
  dataStreamEntityContractAddress: string;
  sensorType: SensorType;
  geolocation: Geolocation;
}

export interface SensorState {
  sensors: IoTSensor[];
}