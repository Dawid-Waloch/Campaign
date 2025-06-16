const path = require('path');
const fs = require('fs');
const solc = require('solc');

const lotteryPath = path.resolve(__dirname, 'contracts', 'Campaign.sol');
const source = fs.readFileSync(lotteryPath, 'utf-8');

const input = {
  language: 'Solidity',
  sources: {
    'Campaign.sol': {
      content: source,
    },
  },
  settings: {
    outputSelection: {
      '*': {
        '*': ['*'],
      },
    },
  },
};

console.log(JSON.parse(solc.compile(JSON.stringify(input))).contracts)

module.exports = JSON.parse(solc.compile(JSON.stringify(input))).contracts['Campaign.sol'].Campaign;