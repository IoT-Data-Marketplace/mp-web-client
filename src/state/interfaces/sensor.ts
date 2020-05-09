export enum SensorType {
  TEMPERATURE,
  HUMIDITY,
  AIR_POLLUTION,
}

export enum SensorStatus {
  INACTIVE,
  ACTIVE,
  BLOCKED,
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

export interface Sensor {
  sensorContractAddress: string;
  dataStreamEntityContractAddress: string;
  sensorType: SensorType;
  geolocation: Geolocation;
  sensorStatus: SensorStatus;
  streamSize: number;
}

export interface SensorState {
  sensors: Sensor[];
}
