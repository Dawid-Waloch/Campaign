import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const address = '0x09Bdb853Cd50A952d2e9d26B73a50FFB3232B6e8';

const instance = new web3.eth.Contract(CampaignFactory.abi, address);

export default instance;
