import web3 from './web3';
import DataStreamEntity from './contracts/DataStreamEntity.json';

export default (contractAddress: string) => new web3.eth.Contract(JSON.parse(DataStreamEntity.interface), contractAddress);
