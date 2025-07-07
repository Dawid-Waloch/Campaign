import React, { useState } from "react";
import { Form, Button, Input } from "semantic-ui-react";
import 'semantic-ui-css/semantic.min.css';

import Layout from "../../components/Layout";
import factory from "../../ethereum/factory";
import web3 from "../../ethereum/web3";

const NewCampaign = () => {
    const [minimumContribution, setMinimumContribution] = useState('');

    const onSubmit = async (event) => {
        event.preventDefault();

        const accounts = await web3.eth.getAccounts();
        await factory.methods
            .createCampaign(minimumContribution)
            .send({
                from: accounts[0]
            });
    };

    return (
        <Layout>
            <h3>Create a campaign</h3>
            <Form onSubmit={onSubmit}>
                <Form.Field>
                    <label>Minimum Contribution</label>
                    <Input
                        label="wei"
                        labelPosition="right"
                        value={minimumContribution}
                        onChange={event => setMinimumContribution(event.target.value)}
                    />
                </Form.Field>
                <Button primary type="submit">Create</Button>
            </Form>
        </Layout>
    );
};

export default NewCampaign;