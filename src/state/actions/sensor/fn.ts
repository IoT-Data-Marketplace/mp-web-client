import { graphQLClient } from '../../graphQLClient';
import { getFetchSensorSummaryGQLQuery } from '../graphQlQueris/gqlQueries';


interface SensorSummary {
  streamSize: number
}

/*
 * It fetches the sensor details from the backend
 * */
export const fetchSensorSummary = async (sensorContractAddress: string): Promise<SensorSummary> => {
  const res = await graphQLClient.rawRequest(getFetchSensorSummaryGQLQuery(sensorContractAddress));
  return res.data.getSensorSummary;
};
