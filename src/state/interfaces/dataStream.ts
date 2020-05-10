import { Sensor } from './sensor';

export interface DataStreamRecord {
  key: string;
  value: number;
  offset: number;
}

export interface DataStream {
  sensor: Sensor;
  records: DataStreamRecord[];
}
