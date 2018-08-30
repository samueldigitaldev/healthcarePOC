const path = require('path')
const solc = require('solc')
const fs = require('fs-extra')

const buildPath = path.resolve(__dirname, 'build') //path is for cross platform compatability
fs.removeSync(buildPath)

const campaignPath = path.resolve(__dirname, 'contracts', 'PatientFactory.sol')
const source = fs.readFileSync(campaignPath, 'utf8')
const output = solc.compile(source, 1).contracts //compile contract

fs.ensureDirSync(buildPath)

for (let contract in output) {
    fs.outputJsonSync(
        path.resolve(buildPath, contract.replace(":", "") + '.json'),
        output[contract]
    )
}

