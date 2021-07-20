import Web3 from 'web3'
import getProvider from './web3Provider'

function getFarmMethods(ContractAddress) {
  
  const web3 = new Web3(getProvider())
  // deposit
  // 智能合约的abi，abi是由编译器生成的
  const depositABI = [{"inputs": [{"internalType": "uint256","name": "_amount","type": "uint256"}],"name": "deposit","outputs": [],"stateMutability": "nonpayable","type": "function"}]
  // 根据abi获取合约
  const depositContract = new web3.eth.Contract(depositABI, ContractAddress)


  // withdraw
  const withdrawABI = [
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_amount",
          "type": "uint256"
        }
      ],
      "name": "withdraw",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]
  const withdrawContract = new web3.eth.Contract(withdrawABI, ContractAddress)


  // claimableReward
  const claimableRewardABI = [
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_user",
          "type": "address"
        }
      ],
      "name": "claimableReward",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ]
  const claimableRewardContract = new web3.eth.Contract(claimableRewardABI, ContractAddress)


  // claim
  const claimABI = [
    {
      "inputs": [],
      "name": "claim",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]
  const claimContract = new web3.eth.Contract(claimABI, ContractAddress)


  return {
    deposit: depositContract.methods.deposit,
    withdraw: withdrawContract.methods.withdraw,
    claimableReward: claimableRewardContract.methods.claimableReward,
    claim: claimContract.methods.claim
  }
}

export default getFarmMethods