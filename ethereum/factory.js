import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const address = '0x75991c94813a2Bd9203c094245f027404f267039';

const instance = new web3.eth.Contract(CampaignFactory.abi, address);

export default instance;
