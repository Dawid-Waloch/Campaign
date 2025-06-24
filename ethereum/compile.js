const path = require('path');
const fs = require('fs-extra');
const solc = require('solc');

const buildPath = path.resolve(__dirname, 'build');
fs.removeSync(buildPath);

const campaignPath = path.resolve(__dirname, 'contracts', 'Campaign.sol');
const source = fs.readFileSync(campaignPath, 'utf-8');

const input = {
    language: 'Solidity',
    sources: {
        'Campaign.sol': {
            content: source
        }
    },
    settings: {
        outputSelection: {
            '*': {
                '*': ['abi', 'evm.bytecode']
            }
        }
    }
};

const output = JSON.parse(solc.compile(JSON.stringify(input)));

fs.ensureDirSync(buildPath);

for (let contract in output.contracts['Campaign.sol']) {
    fs.outputJsonSync(
        path.resolve(__dirname, 'build', contract.replace(':', '') + '.json'),
        output.contracts['Campaign.sol'][contract]
    );
}

// module.exports = JSON.parse(solc.compile(JSON.stringify(input))).contracts[
//     'Campaign.sol'
// ].Campaign;
