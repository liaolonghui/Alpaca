import Vue from 'vue'
import Web3 from 'web3'
import getProvider from './web3Provider'


async function getPairContract(contractAddress) {
  const web3 = new Web3(await getProvider(Vue.prototype.walletName || ''))
  const getReservesABI = [
    { 
      "constant": true, 
      "inputs": [], 
      "name": "getReserves", 
      "outputs": [ 
      { "internalType": "uint112", "name": "_reserve0", "type": "uint112" }, 
      { "internalType": "uint112", "name": "_reserve1", "type": "uint112" }, 
      { "internalType": "uint32", "name": "_blockTimestampLast", "type": "uint32" } 
      ], 
      "payable": false, 
      "stateMutability": "view", 
      "type": "function" 
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "balanceOf",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "totalSupply",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
  ]

  const getReservesContract = new web3.eth.Contract(getReservesABI, contractAddress)
  return getReservesContract
}


export default getPairContract
