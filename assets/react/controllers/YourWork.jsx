import React from 'react';
import {Card, Col, Container, Row} from "react-bootstrap";

export default function YourWork() {
    return (
        <Container className="mt-5">
            <Row>
                <h5 className="fw-bold">Recent projects</h5>
                <Col sm={12} md={3}>
                    <Card>
                        <Card.Header>Project 1</Card.Header>
                        <Card.Body></Card.Body>
                    </Card>
                </Col>
            </Row>

            <hr />

            <Row>
                <h5>My issues</h5>
                <Col sm={12} md={6}>
                    <Card>
                        <Card.Header>Assigned to me</Card.Header>
                        <Card.Body>

                        </Card.Body>
                    </Card>
                </Col>
                <Col sm={12} md={6}>
                    <Card>
                        <Card.Header>Reported</Card.Header>
                        <Card.Body>

                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}