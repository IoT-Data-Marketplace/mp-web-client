import web3 from './web3';
import Sensor from './contracts/Sensor.json';

export default (contractAddress: string) => {
  return new web3.eth.Contract(JSON.parse(Sensor.interface), contractAddress);
};
