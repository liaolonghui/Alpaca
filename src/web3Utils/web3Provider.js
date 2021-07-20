function getProvider() {
  let web3Provider
  async function getpro(params) {
    if (window.ethereum) {
      web3Provider = window.ethereum;
      try {
        // 请求用户授权
        await window.ethereum.enable();
      } catch (error) {
        // 用户不授权时
        alert("User denied account access")
      }
    }
  }
  getpro()
  return web3Provider
}


export default getProvider