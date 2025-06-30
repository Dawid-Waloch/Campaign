import React from 'react';

import factory from '../ethereum/factory';

export const getStaticProps = async () => {
        const campaigns = await factory.methods.getDeployedCampaigns().call();
        console.log(campaigns)

        return {
            props: {
                campaigns,
            }
        };
    }

const CampaginIndex = ({ campaigns }) => {
    return <h2>{campaigns[0]}</h2>;
};

export default CampaginIndex;
