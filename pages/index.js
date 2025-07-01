import React from 'react';
import { Card, Button } from 'semantic-ui-react';
import Link from 'next/link';
import 'semantic-ui-css/semantic.min.css';

import factory from '../ethereum/factory';

export const getStaticProps = async () => {
    const campaigns = await factory.methods.getDeployedCampaigns().call();

    return {
        props: {
            campaigns,
        }
    };
}

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
        <div>
            <h2>Open campaigns</h2>
            <Card.Group>
                {campaigns.map((address) => (
                    <CampaignCard key={address} address={address} />
                ))}
            </Card.Group>
            <Button
                content="Create campaign"
                icon="add circle"
                labelPosition="left"
                primary
            />
        </div>
    );
};

export default CampaginIndex;
