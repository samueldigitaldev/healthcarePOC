import Web3 from 'web3'

let web3

if(typeof window !== 'undefined' && window.web3 !== 'undefined') {
//check if inside browser and if metamask has injected web3
    web3 = new Web3(window.web3.currentProvider)

}else {
//metamask not available - so we will use infura
//rendered on Next server which means there is no window object
    const provider = new Web3.providers.HttpProvider(
        'https://rinkeby.infura.io/Ng5NLQIo99KoqJDegRmw'
    )
    web3 = new Web3(provider)
}

export default web3