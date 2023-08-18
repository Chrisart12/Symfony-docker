import React, {useEffect} from 'react';
import {Card, Col, Container, ListGroup, Row} from "react-bootstrap";

export default function YourWork() {
    const [user, setUser] = React.useState(null);
    const [loading, setLoading] = React.useState(true);

    useEffect(() => {
        fetch('/api/users/me')
            .then((response) => response.json())
            .then(user => {
                setUser(user);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <>Loading...</>;
    }

    return (
        <Container className="mt-5">
            <Row>
                <h5 className="fw-bold">Recent projects</h5>
                {user.projects.map(project => (
                    <Col sm={12} md={3} key={project.id}>
                        <Card>
                            <Card.Header>{project.name}</Card.Header>
                            <Card.Body>

                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

            <hr />

            <Row>
                <h5>My issues</h5>
                <Col sm={12} md={6}>
                    <Card>
                        <Card.Header>Assigned to me</Card.Header>
                        <Card.Body>
                            <ListGroup variant="flush">
                                {user.assignedIssues.map(issue => (
                                    <ListGroup.Item action href={`/issues/${issue.id}`} key={issue.id}>[{issue.id}] - {issue.summary}</ListGroup.Item>
                                ))}
                            </ListGroup>
                        </Card.Body>
                    </Card>
                </Col>
                <Col sm={12} md={6}>
                    <Card>
                        <Card.Header>Reported</Card.Header>
                        <Card.Body>
                            <ListGroup variant="flush">
                                {user.reportedIssues.map(issue => (
                                    <ListGroup.Item action key={issue.id}>[{issue.id}] - {issue.summary}</ListGroup.Item>
                                ))}
                            </ListGroup>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}