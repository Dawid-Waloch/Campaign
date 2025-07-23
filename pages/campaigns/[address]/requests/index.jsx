import React, { useState } from 'react';
import Layout from '../../../../components/Layout/Layout';
import Link from 'next/link';
import { Button } from 'semantic-ui-react';

import RequestsTable from '../../../../components/RequestsTable/RequestsTable';
import Campaign from '../../../../ethereum/campaign';
import AddRequestButtonStyled from '../../../../components/AddRequestButtonStyled';

export const getServerSideProps = async (context) => {
    const { address } = context.query;
    const campaign = Campaign(address);
    const requestsCount = await campaign.methods.getRequestsCount().call();
    const approversCount = await campaign.methods.approversCount().call();

    const requestsRaw = await Promise.all(
        Array(parseInt(requestsCount))
            .fill()
            .map((_, index) => {
                return campaign.methods.requests(index).call();
            }),
    );

    const requests = requestsRaw.map((request) => ({
        description: request.description,
        value: request.value.toString(),
        recipient: request.recipient,
        complete: request.complete,
        approvalCount: request.approvalCount.toString(),
    }));

    return {
        props: {
            address: address,
            requests: requests,
            requestsCount: requestsCount.toString(),
            approversCount: approversCount.toString(),
        },
    };
};

const RequestIndex = ({ address, requests, approversCount, requestsCount }) => {
    const [completedRequestsSection, useCompletedRequestsSection] = useState(false)
    const completedRequests = requests.filter((request) => request.complete);
    const completedRequestsFound = completedRequests.length;
    const uncompletedRequests = requests.filter((request) => !request.complete);
    const uncompletedRequestsFound = uncompletedRequests.length;

    return (
        <Layout>
            <Link href={`/campaigns/${address}`}>
                <Button primary>Back</Button>
            </Link>
            <h3>Requests</h3>
            <Button primary onClick={() => useCompletedRequestsSection(false)}>
                Uncompleted requests
            </Button>
            <Button primary onClick={() => useCompletedRequestsSection(true)}>
                Completed requests
            </Button>
            <Link href={`/campaigns/${address}/requests/new`}>
                <AddRequestButtonStyled primary floated="right">
                    Add Request
                </AddRequestButtonStyled>
            </Link>

            {!completedRequestsSection && (
                <RequestsTable
                    requests={uncompletedRequests}
                    approversCount={approversCount}
                    address={address}
                    requestsCount={uncompletedRequestsFound}
                />
            )}
            {completedRequestsSection && (
                <RequestsTable
                    requests={completedRequests}
                    approversCount={approversCount}
                    address={address}
                    requestsCount={completedRequestsFound}
                />
            )}
            
        </Layout>
    );
};

export default RequestIndex;
