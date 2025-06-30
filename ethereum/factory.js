import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const address = '0x167eDB915E732DEA407dC8573dD320409f5Cd603';

const instance = new web3.eth.Contract(CampaignFactory.abi, address);

export default instance;
