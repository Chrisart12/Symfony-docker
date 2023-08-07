import React from "react";
import {getIssueStatusLabel, getIssueTypeLabel} from "../../functions/enum";
import {Card, Col, Container, FormSelect, ListGroup, Row, Table} from "react-bootstrap";

export default function Issues({ issues, issueStatuses, issueTypes }) {
    const [issuesList, setIssuesList] = React.useState(JSON.parse(issues));
    const [issueStatusesList, setIssueStatusesList] = React.useState(JSON.parse(issueStatuses));
    const [issueTypesList, setIssueTypesList] = React.useState(JSON.parse(issueTypes));
    const [selectedIssue, setSelectedIssue] = React.useState(issuesList[0]);

    const handleClick = (issue) => {
        setSelectedIssue(issue);
    }

    const handleStatusChange = (e) => {
        setSelectedIssue({...selectedIssue, status: e.target.value});
        setIssuesList(issuesList.map((issue) => {
            if (issue.id === selectedIssue.id) {
                return {...issue, status: e.target.value};
            }
            return issue;
        }))
    }

    return (
        <Container className="mt-5">
            <Row>
                <Col className="mb-sm-3 mt-sm-0" sm={12} md={3}>
                    <Card>
                        <Card.Header>Backlog</Card.Header>
                        <Card.Body>
                            <ListGroup>
                                {issuesList.map((issue) => (
                                    <ListGroup.Item action key={issue.id} onClick={() => handleClick(issue)}>
                                        <div>{issue.id}</div>
                                        <div>{issue.summary}</div>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        </Card.Body>
                    </Card>
                </Col>
                <Col sm={12} md={6}>
                    <Card>
                        <Card.Body>
                            <Card.Title>{selectedIssue.summary}</Card.Title>
                            <Card.Text>Description</Card.Text>
                            <p>{selectedIssue.description ? selectedIssue.description : <span className="text-muted">Add a description...</span>}</p>
                        </Card.Body>
                    </Card>
                </Col>
                <Col sm={12} md={3}>
                    <FormSelect className="mb-3 mt-sm-3 mt-md-0" value={selectedIssue.status} onChange={handleStatusChange}>
                        {issueStatusesList.map((issueStatus) => (
                            <option key={issueStatus.value} value={issueStatus.value}>{issueStatus.label}</option>
                        ))}
                    </FormSelect>

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
                                        <td><small>{selectedIssue.assignee.email}</small></td>
                                    </tr>
                                    <tr>
                                        <td className="fw-bold"><small>Reporter</small></td>
                                        <td><small>{selectedIssue.reporter.email}</small></td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}