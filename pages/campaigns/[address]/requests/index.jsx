import React from "react";
import Layout from "../../../../components/Layout/Layout";
import Link from "next/link";
import { Button } from "semantic-ui-react";

import RequestsTable from "../../../../components/RequestsTable";
import web3 from "../../../../ethereum/web3";
import Campaign from "../../../../ethereum/campaign";

export const getServerSideProps = async (context) => {
    const { address } = context.query;
    const accounts = await web3.eth.getAccounts();
    const campaign = Campaign(address);
    const requestsCount = await campaign.methods.getRequestsCount().call();
    const approversCount = await campaign.methods.approversCount().call();

    const requestsRaw = await Promise.all(
        Array(parseInt(requestsCount))
            .fill()
            .map((_, index) => {
                return campaign.methods.requests(index).call();
            })
    );

    const requests = requestsRaw.map((request) => ({
        description: request.description,
        value: request.value.toString(),
        recipient: request.recipient,
        complete: request.complete,
        approvalCount: request.approvalCount.toString()
    }));

    return {
        props: {
            address: address,
            requests: requests,
            requestsCount: requestsCount.toString(),
            approversCount: approversCount.toString()
        }
    };
};

const RequestIndex = ({ address, requests, requestsCount, approversCount }) => {
    return (
        <Layout>
            <h3>Requests</h3>
            <Link href={`/campaigns/${address}/requests/new`}>
                <Button primary>Add Request</Button>
            </Link>
            
            <RequestsTable requests={requests} approversCount={approversCount} />
        </Layout>
    )
};

export default RequestIndex;