import React from 'react';
import { Button, Card, Grid } from 'semantic-ui-react';
import Link from 'next/link';

import Layout from '../../../components/Layout/Layout';
import Campaign from '../../../ethereum/campaign';
import web3 from '../../../ethereum/web3';
import CardItem from '../../../components/CardItem/CardItem';
import ContributeForm from '../../../components/ContributeForm/ContributeForm';

export const getServerSideProps  = async (context) => {
    const { address } = context.query;
    const campaign = Campaign(address);
    const summary = await campaign.methods.getSummary().call();

    return {
        props: {
            address: address,
            minimumContribution: summary[0].toString(),
            balance: summary[1].toString(),
            requestsCount: summary[2].toString(),
            approversCount: summary[3].toString(),
            manager: summary[4].toString(),
        },
    };
};

const CampaignShow = ({
    address,
    minimumContribution,
    balance,
    requestsCount,
    approversCount,
    manager
}) => {

    const cardsData = [
        {
            header: manager,
            meta: 'Address of Manager',
            description: 'The manager created this campaign and can create requests to withdraw money'
        },
        {
            header: minimumContribution,
            meta: 'Minimum Contribution (wei)',
            description: 'You must contribute at least this much wei to become an approver'
        },
        {
            header: requestsCount,
            meta: 'Number of Requests',
            description: 'A request tries to withdraw money from the contract. Requests must be approved by approvers'
        },
        {
            header: approversCount,
            meta: 'Number of approvers',
            description: 'Number of people who have already donated to this campaign'
        },
        {
            header: web3.utils.fromWei(balance, 'ether'),
            meta: 'Campaign Balance (ether)',
            description: 'The balance is how much money this campaign has left to spend'
        },
    ];
    
    return (
        <Layout>
            <h2>Campaign show</h2>
            <Grid>
                <Grid.Row>
                    <Grid.Column width={10}>
                        <Card.Group>
                            {cardsData.map((card, index) => (
                                <CardItem key={index} {...card} />
                            ))}
                        </Card.Group>
                    </Grid.Column>
                    <Grid.Column width={6}>
                        <ContributeForm address={address} />
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column>
                        <Link href={`/campaigns/${address}/requests`}>
                            <Button primary>
                                View Requests
                            </Button>
                        </Link>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Layout>
    );
};

export default CampaignShow;
