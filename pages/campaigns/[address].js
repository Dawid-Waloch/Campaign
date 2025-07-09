import React from 'react';

import Layout from '../../components/Layout';
import Campaign from '../../ethereum/campaign';

export const getServerSideProps  = async (context) => {
    const { address } = context.query;
    const campaign = Campaign(address);
    const summary = await campaign.methods.getSummary().call();

    return {
        props: {
            minimumContribution: summary[0].toString(),
            balance: summary[1].toString(),
            requestsCount: summary[2].toString(),
            approversCount: summary[3].toString(),
            manager: summary[4].toString(),
        },
    };
};

const CampaignShow = ({ 
    minimumContribution,
    balance,
    requestsCount,
    approversCount,
    manager
}) => {
    
    return (
        <Layout>
            <h2>Campaign show</h2>
        </Layout>
    );
};

export default CampaignShow;
