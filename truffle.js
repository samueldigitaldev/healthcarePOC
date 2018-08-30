var HDWalletProvider = require("truffle-hdwallet-provider");
var mnemonic = "boil income desk reopen summer heart quarter stem carbon picnic fossil december";

module.exports = {
  networks: {
    development: {
      host: 'localhost',
      port: 7545,
      network_id: '*' // Match any network id
    },
    rinkeby: {
      provider: new HDWalletProvider(mnemonic, "https://rinkeby.infura.io/Ng5NLQIo99KoqJDegRmw"),
      network_id: '3'
    }
  }
}
