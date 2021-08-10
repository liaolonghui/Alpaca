import Web3 from 'web3'
import getProvider from './web3Provider'

const factory_address ='0xa0A43A273C8992467005667A733ff73185f57c51'
const router_address = '0xeaBa760F2f0F68981C9D9816741616277c7AbC3f'

// pair


// factory
export async function getFactoryContract() {
    const web3 = new Web3(await getProvider())
    const factoryABI = [
        {
            "inputs": [
              {
                "internalType": "address",
                "name": "",
                "type": "address"
              },
              {
                "internalType": "address",
                "name": "",
                "type": "address"
              }
            ],
            "name": "getPair",
            "outputs": [
              {
                "internalType": "address",
                "name": "",
                "type": "address"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          }
    ]
    const factoryContract = new web3.eth.Contract(factoryABI, factory_address)
    return factoryContract
}

// router
export async function getRouterContract() {
  const web3 = new Web3(await getProvider())

  const routerABI = [
    {
        "inputs": [
        {
            "internalType": "address",
            "name": "_factory",
            "type": "address"
        },
        {
            "internalType": "address",
            "name": "_WETH",
            "type": "address"
        }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
        {
            "indexed": false,
            "internalType": "uint256",
            "name": "amountA",
            "type": "uint256"
        },
        {
            "indexed": false,
            "internalType": "uint256",
            "name": "amountB",
            "type": "uint256"
        }
        ],
        "name": "RouterdebugLiquidity",
        "type": "event"
    },
    {
        "inputs": [],
        "name": "WETH",
        "outputs": [
        {
            "internalType": "address",
            "name": "",
            "type": "address"
        }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "factory",
        "outputs": [
        {
            "internalType": "address",
            "name": "",
            "type": "address"
        }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "stateMutability": "payable",
        "type": "receive"
    },
    {
        "inputs": [
        {
            "internalType": "address",
            "name": "tokenA",
            "type": "address"
        },
        {
            "internalType": "address",
            "name": "tokenB",
            "type": "address"
        },
        {
            "internalType": "uint256",
            "name": "amountADesired",
            "type": "uint256"
        },
        {
            "internalType": "uint256",
            "name": "amountBDesired",
            "type": "uint256"
        },
        {
            "internalType": "uint256",
            "name": "amountAMin",
            "type": "uint256"
        },
        {
            "internalType": "uint256",
            "name": "amountBMin",
            "type": "uint256"
        },
        {
            "internalType": "address",
            "name": "to",
            "type": "address"
        },
        {
            "internalType": "uint256",
            "name": "deadline",
            "type": "uint256"
        }
        ],
        "name": "addLiquidity",
        "outputs": [
        {
            "internalType": "uint256",
            "name": "amountA",
            "type": "uint256"
        },
        {
            "internalType": "uint256",
            "name": "amountB",
            "type": "uint256"
        },
        {
            "internalType": "uint256",
            "name": "liquidity",
            "type": "uint256"
        }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
        {
            "internalType": "address",
            "name": "token",
            "type": "address"
        },
        {
            "internalType": "uint256",
            "name": "amountTokenDesired",
            "type": "uint256"
        },
        {
            "internalType": "uint256",
            "name": "amountTokenMin",
            "type": "uint256"
        },
        {
            "internalType": "uint256",
            "name": "amountETHMin",
            "type": "uint256"
        },
        {
            "internalType": "address",
            "name": "to",
            "type": "address"
        },
        {
            "internalType": "uint256",
            "name": "deadline",
            "type": "uint256"
        }
        ],
        "name": "addLiquidityETH",
        "outputs": [
        {
            "internalType": "uint256",
            "name": "amountToken",
            "type": "uint256"
        },
        {
            "internalType": "uint256",
            "name": "amountETH",
            "type": "uint256"
        },
        {
            "internalType": "uint256",
            "name": "liquidity",
            "type": "uint256"
        }
        ],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [
        {
            "internalType": "address",
            "name": "tokenA",
            "type": "address"
        },
        {
            "internalType": "address",
            "name": "tokenB",
            "type": "address"
        },
        {
            "internalType": "uint256",
            "name": "liquidity",
            "type": "uint256"
        },
        {
            "internalType": "uint256",
            "name": "amountAMin",
            "type": "uint256"
        },
        {
            "internalType": "uint256",
            "name": "amountBMin",
            "type": "uint256"
        },
        {
            "internalType": "address",
            "name": "to",
            "type": "address"
        },
        {
            "internalType": "uint256",
            "name": "deadline",
            "type": "uint256"
        }
        ],
        "name": "removeLiquidity",
        "outputs": [
        {
            "internalType": "uint256",
            "name": "amountA",
            "type": "uint256"
        },
        {
            "internalType": "uint256",
            "name": "amountB",
            "type": "uint256"
        }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
        {
            "internalType": "address",
            "name": "token",
            "type": "address"
        },
        {
            "internalType": "uint256",
            "name": "liquidity",
            "type": "uint256"
        },
        {
            "internalType": "uint256",
            "name": "amountTokenMin",
            "type": "uint256"
        },
        {
            "internalType": "uint256",
            "name": "amountETHMin",
            "type": "uint256"
        },
        {
            "internalType": "address",
            "name": "to",
            "type": "address"
        },
        {
            "internalType": "uint256",
            "name": "deadline",
            "type": "uint256"
        }
        ],
        "name": "removeLiquidityETH",
        "outputs": [
        {
            "internalType": "uint256",
            "name": "amountToken",
            "type": "uint256"
        },
        {
            "internalType": "uint256",
            "name": "amountETH",
            "type": "uint256"
        }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
        {
            "internalType": "address",
            "name": "tokenA",
            "type": "address"
        },
        {
            "internalType": "address",
            "name": "tokenB",
            "type": "address"
        },
        {
            "internalType": "uint256",
            "name": "liquidity",
            "type": "uint256"
        },
        {
            "internalType": "uint256",
            "name": "amountAMin",
            "type": "uint256"
        },
        {
            "internalType": "uint256",
            "name": "amountBMin",
            "type": "uint256"
        },
        {
            "internalType": "address",
            "name": "to",
            "type": "address"
        },
        {
            "internalType": "uint256",
            "name": "deadline",
            "type": "uint256"
        },
        {
            "internalType": "bool",
            "name": "approveMax",
            "type": "bool"
        },
        {
            "internalType": "uint8",
            "name": "v",
            "type": "uint8"
        },
        {
            "internalType": "bytes32",
            "name": "r",
            "type": "bytes32"
        },
        {
            "internalType": "bytes32",
            "name": "s",
            "type": "bytes32"
        }
        ],
        "name": "removeLiquidityWithPermit",
        "outputs": [
        {
            "internalType": "uint256",
            "name": "amountA",
            "type": "uint256"
        },
        {
            "internalType": "uint256",
            "name": "amountB",
            "type": "uint256"
        }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
        {
            "internalType": "address",
            "name": "token",
            "type": "address"
        },
        {
            "internalType": "uint256",
            "name": "liquidity",
            "type": "uint256"
        },
        {
            "internalType": "uint256",
            "name": "amountTokenMin",
            "type": "uint256"
        },
        {
            "internalType": "uint256",
            "name": "amountETHMin",
            "type": "uint256"
        },
        {
            "internalType": "address",
            "name": "to",
            "type": "address"
        },
        {
            "internalType": "uint256",
            "name": "deadline",
            "type": "uint256"
        },
        {
            "internalType": "bool",
            "name": "approveMax",
            "type": "bool"
        },
        {
            "internalType": "uint8",
            "name": "v",
            "type": "uint8"
        },
        {
            "internalType": "bytes32",
            "name": "r",
            "type": "bytes32"
        },
        {
            "internalType": "bytes32",
            "name": "s",
            "type": "bytes32"
        }
        ],
        "name": "removeLiquidityETHWithPermit",
        "outputs": [
        {
            "internalType": "uint256",
            "name": "amountToken",
            "type": "uint256"
        },
        {
            "internalType": "uint256",
            "name": "amountETH",
            "type": "uint256"
        }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
        {
            "internalType": "address",
            "name": "token",
            "type": "address"
        },
        {
            "internalType": "uint256",
            "name": "liquidity",
            "type": "uint256"
        },
        {
            "internalType": "uint256",
            "name": "amountTokenMin",
            "type": "uint256"
        },
        {
            "internalType": "uint256",
            "name": "amountETHMin",
            "type": "uint256"
        },
        {
            "internalType": "address",
            "name": "to",
            "type": "address"
        },
        {
            "internalType": "uint256",
            "name": "deadline",
            "type": "uint256"
        }
        ],
        "name": "removeLiquidityETHSupportingFeeOnTransferTokens",
        "outputs": [
        {
            "internalType": "uint256",
            "name": "amountETH",
            "type": "uint256"
        }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
        {
            "internalType": "address",
            "name": "token",
            "type": "address"
        },
        {
            "internalType": "uint256",
            "name": "liquidity",
            "type": "uint256"
        },
        {
            "internalType": "uint256",
            "name": "amountTokenMin",
            "type": "uint256"
        },
        {
            "internalType": "uint256",
            "name": "amountETHMin",
            "type": "uint256"
        },
        {
            "internalType": "address",
            "name": "to",
            "type": "address"
        },
        {
            "internalType": "uint256",
            "name": "deadline",
            "type": "uint256"
        },
        {
            "internalType": "bool",
            "name": "approveMax",
            "type": "bool"
        },
        {
            "internalType": "uint8",
            "name": "v",
            "type": "uint8"
        },
        {
            "internalType": "bytes32",
            "name": "r",
            "type": "bytes32"
        },
        {
            "internalType": "bytes32",
            "name": "s",
            "type": "bytes32"
        }
        ],
        "name": "removeLiquidityETHWithPermitSupportingFeeOnTransferTokens",
        "outputs": [
        {
            "internalType": "uint256",
            "name": "amountETH",
            "type": "uint256"
        }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
        {
            "internalType": "uint256",
            "name": "amountIn",
            "type": "uint256"
        },
        {
            "internalType": "uint256",
            "name": "amountOutMin",
            "type": "uint256"
        },
        {
            "internalType": "address[]",
            "name": "path",
            "type": "address[]"
        },
        {
            "internalType": "address",
            "name": "to",
            "type": "address"
        },
        {
            "internalType": "uint256",
            "name": "deadline",
            "type": "uint256"
        }
        ],
        "name": "swapExactTokensForTokens",
        "outputs": [
        {
            "internalType": "uint256[]",
            "name": "amounts",
            "type": "uint256[]"
        }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
        {
            "internalType": "uint256",
            "name": "amountOut",
            "type": "uint256"
        },
        {
            "internalType": "uint256",
            "name": "amountInMax",
            "type": "uint256"
        },
        {
            "internalType": "address[]",
            "name": "path",
            "type": "address[]"
        },
        {
            "internalType": "address",
            "name": "to",
            "type": "address"
        },
        {
            "internalType": "uint256",
            "name": "deadline",
            "type": "uint256"
        }
        ],
        "name": "swapTokensForExactTokens",
        "outputs": [
        {
            "internalType": "uint256[]",
            "name": "amounts",
            "type": "uint256[]"
        }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
        {
            "internalType": "uint256",
            "name": "amountOutMin",
            "type": "uint256"
        },
        {
            "internalType": "address[]",
            "name": "path",
            "type": "address[]"
        },
        {
            "internalType": "address",
            "name": "to",
            "type": "address"
        },
        {
            "internalType": "uint256",
            "name": "deadline",
            "type": "uint256"
        }
        ],
        "name": "swapExactETHForTokens",
        "outputs": [
        {
            "internalType": "uint256[]",
            "name": "amounts",
            "type": "uint256[]"
        }
        ],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [
        {
            "internalType": "uint256",
            "name": "amountOut",
            "type": "uint256"
        },
        {
            "internalType": "uint256",
            "name": "amountInMax",
            "type": "uint256"
        },
        {
            "internalType": "address[]",
            "name": "path",
            "type": "address[]"
        },
        {
            "internalType": "address",
            "name": "to",
            "type": "address"
        },
        {
            "internalType": "uint256",
            "name": "deadline",
            "type": "uint256"
        }
        ],
        "name": "swapTokensForExactETH",
        "outputs": [
        {
            "internalType": "uint256[]",
            "name": "amounts",
            "type": "uint256[]"
        }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
        {
            "internalType": "uint256",
            "name": "amountIn",
            "type": "uint256"
        },
        {
            "internalType": "uint256",
            "name": "amountOutMin",
            "type": "uint256"
        },
        {
            "internalType": "address[]",
            "name": "path",
            "type": "address[]"
        },
        {
            "internalType": "address",
            "name": "to",
            "type": "address"
        },
        {
            "internalType": "uint256",
            "name": "deadline",
            "type": "uint256"
        }
        ],
        "name": "swapExactTokensForETH",
        "outputs": [
        {
            "internalType": "uint256[]",
            "name": "amounts",
            "type": "uint256[]"
        }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
        {
            "internalType": "uint256",
            "name": "amountOut",
            "type": "uint256"
        },
        {
            "internalType": "address[]",
            "name": "path",
            "type": "address[]"
        },
        {
            "internalType": "address",
            "name": "to",
            "type": "address"
        },
        {
            "internalType": "uint256",
            "name": "deadline",
            "type": "uint256"
        }
        ],
        "name": "swapETHForExactTokens",
        "outputs": [
        {
            "internalType": "uint256[]",
            "name": "amounts",
            "type": "uint256[]"
        }
        ],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [
        {
            "internalType": "uint256",
            "name": "amountIn",
            "type": "uint256"
        },
        {
            "internalType": "uint256",
            "name": "amountOutMin",
            "type": "uint256"
        },
        {
            "internalType": "address[]",
            "name": "path",
            "type": "address[]"
        },
        {
            "internalType": "address",
            "name": "to",
            "type": "address"
        },
        {
            "internalType": "uint256",
            "name": "deadline",
            "type": "uint256"
        }
        ],
        "name": "swapExactTokensForTokensSupportingFeeOnTransferTokens",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
        {
            "internalType": "uint256",
            "name": "amountOutMin",
            "type": "uint256"
        },
        {
            "internalType": "address[]",
            "name": "path",
            "type": "address[]"
        },
        {
            "internalType": "address",
            "name": "to",
            "type": "address"
        },
        {
            "internalType": "uint256",
            "name": "deadline",
            "type": "uint256"
        }
        ],
        "name": "swapExactETHForTokensSupportingFeeOnTransferTokens",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [
        {
            "internalType": "uint256",
            "name": "amountIn",
            "type": "uint256"
        },
        {
            "internalType": "uint256",
            "name": "amountOutMin",
            "type": "uint256"
        },
        {
            "internalType": "address[]",
            "name": "path",
            "type": "address[]"
        },
        {
            "internalType": "address",
            "name": "to",
            "type": "address"
        },
        {
            "internalType": "uint256",
            "name": "deadline",
            "type": "uint256"
        }
        ],
        "name": "swapExactTokensForETHSupportingFeeOnTransferTokens",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
        {
            "internalType": "uint256",
            "name": "amountA",
            "type": "uint256"
        },
        {
            "internalType": "uint256",
            "name": "reserveA",
            "type": "uint256"
        },
        {
            "internalType": "uint256",
            "name": "reserveB",
            "type": "uint256"
        }
        ],
        "name": "quote",
        "outputs": [
        {
            "internalType": "uint256",
            "name": "amountB",
            "type": "uint256"
        }
        ],
        "stateMutability": "pure",
        "type": "function"
    },
    {
        "inputs": [
        {
            "internalType": "uint256",
            "name": "amountIn",
            "type": "uint256"
        },
        {
            "internalType": "uint256",
            "name": "reserveIn",
            "type": "uint256"
        },
        {
            "internalType": "uint256",
            "name": "reserveOut",
            "type": "uint256"
        }
        ],
        "name": "getAmountOut",
        "outputs": [
        {
            "internalType": "uint256",
            "name": "amountOut",
            "type": "uint256"
        }
        ],
        "stateMutability": "pure",
        "type": "function"
    },
    {
        "inputs": [
        {
            "internalType": "uint256",
            "name": "amountOut",
            "type": "uint256"
        },
        {
            "internalType": "uint256",
            "name": "reserveIn",
            "type": "uint256"
        },
        {
            "internalType": "uint256",
            "name": "reserveOut",
            "type": "uint256"
        }
        ],
        "name": "getAmountIn",
        "outputs": [
        {
            "internalType": "uint256",
            "name": "amountIn",
            "type": "uint256"
        }
        ],
        "stateMutability": "pure",
        "type": "function"
    },
    {
        "inputs": [
        {
            "internalType": "uint256",
            "name": "amountIn",
            "type": "uint256"
        },
        {
            "internalType": "address[]",
            "name": "path",
            "type": "address[]"
        }
        ],
        "name": "getAmountsOut",
        "outputs": [
        {
            "internalType": "uint256[]",
            "name": "amounts",
            "type": "uint256[]"
        }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
        {
            "internalType": "uint256",
            "name": "amountOut",
            "type": "uint256"
        },
        {
            "internalType": "address[]",
            "name": "path",
            "type": "address[]"
        }
        ],
        "name": "getAmountsIn",
        "outputs": [
        {
            "internalType": "uint256[]",
            "name": "amounts",
            "type": "uint256[]"
        }
        ],
        "stateMutability": "view",
        "type": "function"
    }
  ]

  const routerContract = new web3.eth.Contract(routerABI, router_address)

  return routerContract
}

// swapExactETHForTokens   bnb -> 其他
// swapTokensForExactETH
// swapExactETHForTokensSupportingFeeOnTransferTokens

// swapExactTokensForETH   其他 -> bnb
// swapETHForExactTokens
// swapExactTokensForETHSupportingFeeOnTransferTokens

// swapExactTokensForTokens 其他 -> 其他
// swapTokensForExactTokens
// swapExactTokensForTokensSupportingFeeOnTransferTokens


// addLiquidity     不涉及bnb
// addLiquidityETH  涉及bnb
// removeLiquidity
// removeLiquidityETH
// removeLiquidityETHWithPermit
// removeLiquidityETHSupportingFeeOnTransferTokens
// removeLiquidityETHWithPermitSupportingFeeOnTransferTokens