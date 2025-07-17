import React, { useState } from "react";
import { Button, Table, TableBody, TableCell, TableHeader, TableHeaderCell, TableRow } from "semantic-ui-react";

import web3 from "../../ethereum/web3";
import Campaign from "../../ethereum/campaign";
import ErrorMessageStyled from "./RequestsTableStyled";

const RequestsTable = ({ requests, approversCount, address }) => {
    const [loadingIndex, setLoadingIndex] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const onApprove = async (index) => {
        setLoadingIndex(index);
        setErrorMessage('');

        try {
            const campaign = Campaign(address);
            const accounts = await web3.eth.getAccounts();
            await campaign.methods.approveRequest(index).send({
                from: accounts[0]
            });
        } catch (error) {
            setErrorMessage(error.message);
        }
        
        setLoadingIndex(null);
    };

    return (
        <>
            {errorMessage && (
                <ErrorMessageStyled error header="Oops!" content={errorMessage} />
            )}
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
                        <TableRow key={index}>
                            <TableCell>{index}</TableCell>
                            <TableCell>{request.description}</TableCell>
                            <TableCell>{web3.utils.fromWei(request.value.toString(), "ether")}</TableCell>
                            <TableCell>{request.recipient}</TableCell>
                            <TableCell>{request.approvalCount}/{approversCount}</TableCell>
                            <TableCell>
                                <Button 
                                    key={index}
                                    positive
                                    basic
                                    onClick={() => onApprove(index)}
                                    loading={loadingIndex === index}
                                > 
                                    Approve
                                </Button>
                            </TableCell>
                            <TableCell>{index}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>
    );
};

export default RequestsTable;