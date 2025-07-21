import React, { useState } from 'react';
import { Button, Form, Input } from 'semantic-ui-react';

import web3 from '../../ethereum/web3';
import Campaign from '../../ethereum/campaign';
import ErrorMessageStyled from './NewRequestFormStyled';
import { useRouter } from 'next/router';

const NewRequestForm = ({ address }) => {
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [recipient, setRecipient] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const onSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setErrorMessage('');

        try {
            const accounts = await web3.eth.getAccounts();
            const campaign = Campaign(address);
            await campaign.methods
                .createRequest(
                    description,
                    web3.utils.toWei(amount, 'ether'),
                    recipient,
                )
                .send({ from: accounts[0] });
        } catch (error) {
            setErrorMessage(error.message);
        }

        setLoading(false);
        router.push(`/campaigns/${address}/requests`);
    };

    return (
        <Form onSubmit={onSubmit} error={!!errorMessage}>
            <Form.Field>
                <label>Description</label>
                <Input
                    value={description}
                    onChange={(event) => {
                        setDescription(event.target.value);
                    }}
                />
            </Form.Field>
            <Form.Field>
                <label>Amount in Ether</label>
                <Input
                    label="ether"
                    labelPosition="right"
                    value={amount}
                    onChange={(event) => {
                        setAmount(event.target.value);
                    }}
                />
            </Form.Field>
            <Form.Field>
                <label>Recipient</label>
                <Input
                    value={recipient}
                    onChange={(event) => {
                        setRecipient(event.target.value);
                    }}
                />
            </Form.Field>
            <ErrorMessageStyled error header="Oops!" content={errorMessage} />
            <Button primary loading={loading}>
                Create
            </Button>
        </Form>
    );
};

export default NewRequestForm;
