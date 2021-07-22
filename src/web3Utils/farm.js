import Web3 from 'web3'
import getProvider from './web3Provider'

function getdepositContract(ContractAddress) {
  const web3 = new Web3(getProvider())
  // deposit
  // 智能合约的abi，abi是由编译器生成的
  const depositABI = [{
      "inputs": [{"internalType": "uint256","name": "_amount","type": "uint256"}],
      "name": "deposit",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
  }]
  // 根据abi获取合约
  const depositContract = new web3.eth.Contract(depositABI, ContractAddress)
  return depositContract
}

function getapproveContract(ContractAddress) {
  const web3 = new Web3(getProvider())
  const approveABI = [{
    "stateMutability": "nonpayable", 
    "type": "function", 
    "name": "approve", 
    "inputs": [{"name": "_spender", "type": "address"}, {"name": "_value", "type": "uint256"}], 
    "outputs": [{"name": "", "type": "bool"}], 
    "gas": 37821
  }]
  const approveContract = new web3.eth.Contract(approveABI, ContractAddress)
  return approveContract
}

function getwithdrawContract(ContractAddress) {
  const web3 = new Web3(getProvider())
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
  return withdrawContract
}

function getclaimableRewardContract(ContractAddress) {
  const web3 = new Web3(getProvider())
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
  return claimableRewardContract
}

function getclaimContract(ContractAddress) {
  const web3 = new Web3(getProvider())
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
  return claimContract
}

export default {
  getapproveContract,
  getdepositContract,
  getwithdrawContract,
  getclaimableRewardContract,
  getclaimContract
}