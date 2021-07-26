import Web3 from 'web3'
import getProvider from './web3Provider'

async function getdepositContract(ContractAddress) {
  const web3 = new Web3(await getProvider())
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

async function getapproveContract(ContractAddress) {
  const web3 = new Web3(await getProvider())
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

async function getwithdrawContract(ContractAddress) {
  const web3 = new Web3(await getProvider())
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

async function getclaimableRewardContract(ContractAddress) {
  const web3 = new Web3(await getProvider())
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

async function getclaimContract(ContractAddress) {
  const web3 = new Web3(await getProvider())
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

async function getTotalstakedContract(ContractAddress) {
  const web3 = new Web3(await getProvider())
  // total_staked
  const totalstakedABI = [
    {
      "inputs": [],
      "name": "total_staked_",
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
  const totalstakedContract = new web3.eth.Contract(totalstakedABI, ContractAddress)
  return totalstakedContract
}

async function getUserstakedContract(ContractAddress) {
  const web3 = new Web3(await getProvider())
  // total_staked
  const userstakedABI = [
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_user",
          "type": "address"
        }
      ],
      "name": "user_staked",
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
  const userstakedContract = new web3.eth.Contract(userstakedABI, ContractAddress)
  return userstakedContract
}

// allowance
async function getAllowanceContract(ContractAddress) {
  const web3 = new Web3(await getProvider())
  // total_staked
  const allowanceABI = [
    {
      "stateMutability": "view",
      "type": "function",
      "name": "allowance",
      "inputs": [
        {"name": "arg0", "type": "address"},
        {"name": "arg1", "type": "address"}
      ],
      "outputs": [{"name": "", "type": "uint256"}],
      "gas": 1878
    }
  ]
  const allowanceContract = new web3.eth.Contract(allowanceABI, ContractAddress)
  return allowanceContract
}

export default {
  getapproveContract,
  getdepositContract,
  getwithdrawContract,
  getclaimableRewardContract,
  getclaimContract,
  getTotalstakedContract, // total-staked
  getUserstakedContract,  // user-staked
  getAllowanceContract, // Allowance
}