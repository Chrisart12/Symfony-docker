import {Card, Col, Container, Row} from "react-bootstrap";
import CardAttachment from "./CardAttachment";
import React from "react";

export default function IssueAttachments({issue, showMediaViewer}) {
    return (
        <>
            <Card.Text className="fw-bold">Attachments ({issue?.attachments.length})</Card.Text>
            <hr />
            <Container className="overflow-x-auto" fluid>
                <Row className="flex-row flex-nowrap mb-3">
                    {issue?.attachments.map((attachment) => (
                        <Col key={attachment.id} sm={4}>
                            <CardAttachment attachment={attachment} showMediaViewer={showMediaViewer} />
                        </Col>
                    ))}
                </Row>
            </Container>
        </>
    )
}