async function getProvider() {
  let web3Provider
  if (window.ethereum) {
    web3Provider = window.ethereum;
    try {
      // 请求用户授权
      await window.ethereum.enable();
    } catch (error) {
      // 用户不授权时
      console.wran("User denied account access")
    }
  } else if (window.web3) {   // 老版 MetaMask Legacy dapp browsers...
    web3Provider = window.web3.currentProvider;
  } else {
    web3Provider = new Web3.providers.HttpProvider("http://127.0.0.1:8545")
  }
  return web3Provider
}


export default getProvider