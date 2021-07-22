function getProvider() {
  let web3Provider
  async function getpro() {
    if (window.ethereum) {
      web3Provider = window.ethereum;
      try {
        // 请求用户授权
        await window.ethereum.enable();
      } catch (error) {
        // 用户不授权时
        alert("User denied account access")
      }   
    } else {
      web3Provider = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545"));
    } 
  }
  getpro()
  return web3Provider
}


export default getProvider