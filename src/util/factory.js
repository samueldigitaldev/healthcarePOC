import getWeb3 from './web3'
import PatientFactory from '../../build/PatientFactory.json' //abi

const version = getWeb3.version; // "1.0.0"

const instance = new getWeb3.eth.Contract(
    JSON.parse(PatientFactory.interface),
    '0xD9ff87A239879c6738decE12Ff18B0ae3F53E013'
)

export default instance
