import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const address = '0x1db026A1F8BC14c5bC18fC321ac12f39Fe9eee80';

const instance = new web3.eth.Contract(CampaignFactory.abi, address);

export default instance;
