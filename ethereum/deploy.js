require('dotenv').config({ path: '../.env' });
const HDWalletProvider = require('@truffle/hdwallet-provider');
const { Web3 } = require('web3');

const compiledFactory = require('./build/CampaignFactory.json');

const provider = new HDWalletProvider(
    process.env.MNEMONIC,
    process.env.ENDPOINT,
);
const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();

    console.log('Attempting to deploy from account', accounts[0]);

    const result = await new web3.eth.Contract(compiledFactory.abi)
        .deploy({ data: compiledFactory.evm.bytecode.object })
        .send({ from: accounts[0], gas: '6000000' });

    console.log(JSON.stringify(compiledFactory.abi));
    console.log('Contract deployed to', result.options.address);
    provider.engine.stop();
};
deploy();
