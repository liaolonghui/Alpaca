async function getProvider(walletName) {

  // 如果是BC 币安链钱包
  if (walletName == 'BC') {
    if (window.BinanceChain) {
      try {
        await window.BinanceChain.request({ method: 'eth_accounts' })
      } catch (err) {
        console.warn("User denied account access")
      }
      return window.BinanceChain
    }
  }

  let web3Provider
  if (window.ethereum) {
    web3Provider = window.ethereum;
    try {
      // 请求用户授权
      await window.ethereum.request({ method: 'eth_requestAccounts' }) // window.ethereum.enable();
    } catch (error) {
      // 用户不授权时
      console.warn("User denied account access")
    }
  } else if (window.web3) {   // 老版 MetaMask Legacy dapp browsers...
    web3Provider = window.web3.currentProvider;
  } else {
    web3Provider = 'https://data-seed-prebsc-1-s1.binance.org:8545'
  }
  return web3Provider
}


export default getProvider