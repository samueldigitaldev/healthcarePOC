import { Connect, SimpleSigner } from 'uport-connect'

//this allows you to sign transactions from the dapp to your smart phone back to the browser
export let uport = new Connect('Sam\'s Healthcare Dapp', {
    clientId: '2ommFh3n9QgHCy1y4RAmRiQGX9Xiys1xz4f',
    network: 'rinkeby', //"*"
    signer: SimpleSigner('fc5aba6106a1be9b756bcd5c7682d62ee20376baf05ee86c2c16c567b41db9f5') //THIS IS A HUGE NO NO - WILL GET HACKED
  })

export const web3 = uport.getWeb3()
