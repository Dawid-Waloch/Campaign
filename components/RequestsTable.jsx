import React from "react";
import { Table, TableBody, TableCell, TableHeader, TableHeaderCell, TableRow } from "semantic-ui-react";

const RequestsTable = ({requests, approversCount}) => {
    return (
        <Table>
        <TableHeader>
            <TableRow>
                <TableHeaderCell>ID</TableHeaderCell>
                <TableHeaderCell>Description</TableHeaderCell>
                <TableHeaderCell>Recipient</TableHeaderCell>
                <TableHeaderCell>ApprovalCount</TableHeaderCell>
                <TableHeaderCell>Approve</TableHeaderCell>
                <TableHeaderCell>Finalize</TableHeaderCell>
            </TableRow>
            <TableBody>
                {requests.map((request, index) => {
                    <TableRow key={index}>
                        <TableCell>{index}</TableCell>
                        <TableCell>{request.description}</TableCell>
                        <TableCell>{request.amount}</TableCell>
                        <TableCell>{request.recipient}</TableCell>
                        <TableCell>{request.approvalCount}/{approversCount/2}</TableCell>
                        <TableCell>{index}</TableCell>
                        <TableCell>{index}</TableCell>
                    </TableRow>
                })};
                
            </TableBody>
        </TableHeader>
    </Table>
    );
};

export default RequestsTable;