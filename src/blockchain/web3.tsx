import Web3 from 'web3';

const ethEnabled = () => {
  // @ts-ignore
  if (window.ethereum) {
    // @ts-ignore
    window.web3 = new Web3(window.ethereum);
    // @ts-ignore
    window.ethereum.enable();
    return true;
  }
  return false;
};

// eslint-disable-next-line import/no-mutable-exports
let web3;

if (ethEnabled()) {
  // @ts-ignore
  web3 = new Web3(window.web3.currentProvider);
} else {
  web3 = new Web3();
  alert('Please Enable Metamask Extension in your Browser');
}

export default web3;
