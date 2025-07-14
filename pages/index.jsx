import React from 'react';
import { Card, Button } from 'semantic-ui-react';
import Link from 'next/link';

import factory from '../ethereum/factory';
import Layout from '../components/Layout';

export const getStaticProps = async () => {
    const campaigns = await factory.methods.getDeployedCampaigns().call();

    return {
        props: {
            campaigns,
        },
    };
};

const CampaignCard = ({ address }) => (
    <Card fluid>
        <Card.Content>
            <Card.Header>{address}</Card.Header>
            <Card.Description>
                <Link href={`campaigns/${address}`}>View campaign</Link>
            </Card.Description>
        </Card.Content>
    </Card>
);

const CampaginIndex = ({ campaigns }) => {
    return (
        <Layout>
            <div>
                <h2>Open campaigns</h2>
                <Link href={'campaigns/new'}>
                    <Button
                        floated="right"
                        content="Create campaign"
                        icon="add circle"
                        labelPosition="left"
                        primary
                    />
                </Link>

                <Card.Group>
                    {campaigns.map((address) => (
                        <CampaignCard key={address} address={address} />
                    ))}
                </Card.Group>
            </div>
        </Layout>
    );
};

export default CampaginIndex;
