import Web3 from 'web3';

const metamaskEnabled = () => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  if (window.ethereum) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    window.web3 = new Web3(window.ethereum);
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    window.ethereum.enable();
    return true;
  }
  return false;
};

// eslint-disable-next-line import/no-mutable-exports
let web3;

if (metamaskEnabled()) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  web3 = new Web3(window.web3.currentProvider);
} else {
  alert('Please enable Metamask Extension in your Browser');
}

export default web3;
