import React from "react";
import { Button, Table, TableBody, TableCell, TableHeader, TableHeaderCell, TableRow } from "semantic-ui-react";
import web3 from "../ethereum/web3";

const RequestsTable = ({ requests, approversCount }) => {
    return (
        <Table>
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
                        <Button positive>Approve</Button>
                    </TableCell>
                    <TableCell>{index}</TableCell>
                </TableRow>
            ))}
        </TableBody>
    </Table>
    );
};

export default RequestsTable;