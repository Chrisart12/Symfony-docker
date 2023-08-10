import React from "react";
import {Card, Table} from "react-bootstrap";

export default function CardIssueDetails({ issue }) {
    return (
        <Card>
            <Card.Header>Details</Card.Header>
            <Card.Body>
                <Table>
                    <thead>
                    <tr>
                        <th></th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody className="">
                    <tr>
                        <td className="fw-bold"><small>Assignee</small></td>
                        <td><small>{issue?.assignee.firstName} {issue?.assignee.lastName}</small></td>
                    </tr>
                    <tr>
                        <td className="fw-bold"><small>Reporter</small></td>
                        <td><small>{issue?.reporter.email}</small></td>
                    </tr>
                    </tbody>
                </Table>
            </Card.Body>
        </Card>
    )
}