import React from "react";
import {getIssueTypeLabel} from "../../functions/enum";
import {Card, Col, Container, ListGroup, Row, Table} from "react-bootstrap";

export default function Issues({ issues }) {
    const [issuesList, setIssuesList] = React.useState(JSON.parse(issues));
    const [selectedIssue, setSelectedIssue] = React.useState(issuesList[0]);

    const handleClick = (issue) => {
        setSelectedIssue(issue);
    }

    return (
        <Container className="mt-5">
            <Row>
                <Col sm={12} md={3}>
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
                    <Card>
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