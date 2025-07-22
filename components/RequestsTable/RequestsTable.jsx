import React, { useState } from 'react';
import {
    Button,
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableHeaderCell,
    TableRow,
} from 'semantic-ui-react';

import web3 from '../../ethereum/web3';
import Campaign from '../../ethereum/campaign';
import ErrorMessageStyled from './RequestsTableStyled';
import { useRouter } from 'next/router';

const RequestsTable = ({
    requests,
    approversCount,
    address,
    requestsCount,
}) => {
    const [loadingApproveIndex, setLoadingApproveIndex] = useState(null);
    const [loadingFinalizeIndex, setLoadingFinalizeIndex] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const router = useRouter();

    const onApprove = async (index) => {
        setLoadingApproveIndex(index);
        setErrorMessage('');

        try {
            const campaign = Campaign(address);
            const accounts = await web3.eth.getAccounts();
            await campaign.methods.approveRequest(index).send({
                from: accounts[0],
            });
        } catch (error) {
            setErrorMessage(error.message);
        }

        setLoadingApproveIndex(null);
        router.replace(router.asPath);
    };

    const onFinalize = async (index) => {
        setLoadingFinalizeIndex(index);
        setErrorMessage('');

        try {
            const campaign = Campaign(address);
            const accounts = await web3.eth.getAccounts();
            await campaign.methods.finalizeRequest(index).send({
                from: accounts[0],
            });
        } catch (error) {
            setErrorMessage(error.message);
        }

        setLoadingFinalizeIndex(null);
        router.replace(router.asPath);
    };

    return (
        <>
            <Table celled>
                <TableHeader>
                    <TableRow>
                        <TableHeaderCell>ID</TableHeaderCell>
                        <TableHeaderCell>Description</TableHeaderCell>
                        <TableHeaderCell>Amount</TableHeaderCell>
                        <TableHeaderCell>Recipient</TableHeaderCell>
                        <TableHeaderCell>ApprovalCount</TableHeaderCell>
                        <TableHeaderCell>Approve</TableHeaderCell>
                        <TableHeaderCell>Finalize</TableHeaderCell>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {requests.map((request, index) => (
                        <TableRow
                            key={index}
                            disabled={request.complete}
                            positive={
                                request.approvalCount > approversCount / 2 &&
                                !request.complete
                            }
                        >
                            <TableCell>{index}</TableCell>
                            <TableCell>{request.description}</TableCell>
                            <TableCell>
                                {web3.utils.fromWei(
                                    request.value.toString(),
                                    'ether',
                                )}
                            </TableCell>
                            <TableCell>{request.recipient}</TableCell>
                            <TableCell>
                                {request.approvalCount}/{approversCount}
                            </TableCell>
                            <TableCell>
                                {!request.complete && (
                                    <Button
                                        color="green"
                                        basic
                                        onClick={() => onApprove(index)}
                                        loading={loadingApproveIndex === index}
                                    >
                                        Approve
                                    </Button>
                                )}
                            </TableCell>
                            <TableCell>
                                {!request.complete && (
                                    <Button
                                        color="teal"
                                        basic
                                        onClick={() => onFinalize(index)}
                                        loading={loadingFinalizeIndex === index}
                                    >
                                        Finalize
                                    </Button>
                                )}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <div>Found {requestsCount} requests.</div>
            {errorMessage && (
                <ErrorMessageStyled
                    error
                    header="Oops!"
                    content={errorMessage}
                />
            )}
        </>
    );
};

export default RequestsTable;
