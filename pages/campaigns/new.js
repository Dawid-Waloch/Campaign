import React, { useState } from "react";
import { Form, Button, Input, Message } from "semantic-ui-react";
import { useRouter } from "next/router";
import 'semantic-ui-css/semantic.min.css';

import Layout from "../../components/Layout";
import factory from "../../ethereum/factory";
import web3 from "../../ethereum/web3";

const NewCampaign = () => {
    const [minimumContribution, setMinimumContribution] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
    
    const router = useRouter();

    const onSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setErrorMessage('');
        
        try {
            const accounts = await web3.eth.getAccounts();
            await factory.methods
                .createCampaign(minimumContribution)
                .send({
                    from: accounts[0]
                });

            router.push('/');
        } catch (err) {
            setErrorMessage(err.message);
        }

        setLoading(false);
    };

    return (
        <Layout>
            <h3>Create a campaign</h3>
            <Form onSubmit={onSubmit} error={!!errorMessage}>
                <Form.Field>
                    <label>Minimum Contribution</label>
                    <Input
                        label="wei"
                        labelPosition="right"
                        value={minimumContribution}
                        onChange={event => setMinimumContribution(event.target.value)}
                    />
                </Form.Field>
                <Message
                    error
                    header="Oops!"
                    content={errorMessage}
                />
                <Button primary loading={loading} type="submit">Create</Button>
            </Form>
        </Layout>
    );
};

export default NewCampaign;