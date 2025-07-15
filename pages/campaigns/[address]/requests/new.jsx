import React, { useState } from "react";
import Layout from "../../../../components/Layout/Layout";
import { Button, Form, Input } from "semantic-ui-react";
import { useRouter } from "next/router";

import Campaign from '../../../../ethereum/campaign';
import web3 from "../../../../ethereum/web3";

const NewRequest = () => {
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [recipient, setRecipient] = useState('');
    const router = useRouter();
    const { address } = router.query;

    const onSubmit = async (event) => {
        event.preventDefault();
        const accounts = await web3.eth.getAccounts();
        const campaign = Campaign(address);
        await campaign.methods
            .createRequest(description, web3.utils.toWei(amount, "ether"), recipient)
            .send({ from: accounts[0] });
    };

    return (
        <Layout>
            <h3>Create a request</h3>
            <Form onSubmit={onSubmit}>
                <Form.Field>
                    <label>Description</label>
                    <Input
                        value={description}
                        onChange={(event) => {setDescription(event.target.value)}}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Amount in Ether</label>
                    <Input 
                        label="ether"
                        labelPosition="right"
                        value={amount}
                        onChange={(event) => {setAmount(event.target.value)}}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Recipient</label>
                    <Input
                        value={recipient}
                        onChange={(event) => {setRecipient(event.target.value)}}
                    />
                </Form.Field>
                <Button primary>Create</Button>
            </Form>
        </Layout>
    );
};

export default NewRequest;