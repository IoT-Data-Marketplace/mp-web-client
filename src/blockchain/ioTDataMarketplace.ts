import web3 from './web3';
import IoTDataMarketplace from './contracts/IoTDataMarketplace.json';

export default () =>
  new web3.eth.Contract(
    JSON.parse(IoTDataMarketplace.interface),
    process.env.REACT_APP_IOT_DATA_MARKETPLACE_CONTRACT_ADDRESS
  );
