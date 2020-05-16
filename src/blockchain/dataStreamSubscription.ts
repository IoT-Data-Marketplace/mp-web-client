import web3 from './web3';
import DataStreamSubscription from './contracts/DataStreamSubscription.json';

export default (contractAddress: string) => new web3.eth.Contract(JSON.parse(DataStreamSubscription.interface), contractAddress);
