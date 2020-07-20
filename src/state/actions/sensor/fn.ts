import aesjs from 'aes-js';
import { graphQLClient } from '../../graphQLClient';
import { getFetchSensorSummaryGQLQuery } from '../graphQlQueris/gqlQueries';

interface SensorSummary {
  streamSize: number;
  jwt?: string;
}

/*
 * It fetches the sensor details from the backend
 * */
export const fetchSensorSummary = async (sensorContractAddress: string): Promise<SensorSummary> => {
  const res = await graphQLClient.rawRequest(getFetchSensorSummaryGQLQuery(sensorContractAddress));
  return res.data.getSensorSummary;
};

export const decrypt = (encryptedHexText: string): string => {
  const keyPlainText = '9F86D081884C7D659A2FEAA0C55AD015'; // todo this key is just for testing
  // @ts-ignore
  const keyArray = [...Buffer.from(keyPlainText)];
  const key = new Uint8Array(keyArray);
  // eslint-disable-next-line new-cap
  const aesEcb = new aesjs.ModeOfOperation.ecb(key);
  const encryptedBytes = aesjs.utils.hex.toBytes(encryptedHexText);
  const decryptedBytes = aesEcb.decrypt(encryptedBytes);
  let decryptedText = aesjs.utils.utf8.fromBytes(decryptedBytes);
  // @ts-ignore
  decryptedText = aesjs.padding.pkcs7.strip([...Buffer.from(decryptedText)]);
  decryptedText = aesjs.utils.utf8.fromBytes(decryptedText);
  return decryptedText;
};
