import React, { useEffect } from 'react';

import factory from '../ethereum/factory';

const Home = () => {
    useEffect(async () => {
        const campaigns = await factory.methods.deployedCampaigns().call();
        console.log(campaigns);
    }, []);

    return <h2>Campaigns </h2>;
};

export default Home;
