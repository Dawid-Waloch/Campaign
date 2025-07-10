import React, { useState } from "react";
import { Button, Form, Input } from "semantic-ui-react";
import { useRouter } from "next/router";

import Campaign from "../ethereum/campaign";
import web3 from "../ethereum/web3";
import { ErrorMessageStyled } from "./ErrorMessageStyled";

const ContributeForm = ({ address }) => {
    const [errorMessage, setErrorMessage] = useState('');
    const [contributionAmount, setContributionAmount] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const onSubmit = async (event) => {
        event.preventDefault();
        const campaign = Campaign(address);
        setLoading(true);
        setErrorMessage('');

        try {
            const accounts = await web3.eth.getAccounts();
            await campaign.methods.contribute().send({
                from: accounts[0],
                value: web3.utils.toWei(contributionAmount, 'ether')
            });

            router.replace(router.asPath);
        } catch (err) {
            setErrorMessage(err.message);
        }

        setLoading(false);
    }

    return (
        <Form onSubmit={onSubmit} error={!!errorMessage}>
            <Form.Field>
                <label>Amount to Contribute</label>
                <Input
                    label="ether"
                    labelPosition="right"
                    value={contributionAmount}
                    onChange={(event) => {setContributionAmount(event.target.value)}}
                />
            </Form.Field>
            <ErrorMessageStyled error header="Oops!" content={errorMessage} />
            <Button primary loading={loading}>Contribute</Button>
        </Form>
    );
};

export default ContributeForm;