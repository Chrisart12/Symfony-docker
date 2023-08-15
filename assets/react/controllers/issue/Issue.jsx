import React, {useEffect, useRef, useState} from "react";
import {Col, Container, Row} from "react-bootstrap";
import {fetchPatch} from "../../../functions/api";
import CardIssueDetails from "./CardIssueDetails";
import StackIssueStatusType from "./StackIssueStatusType";
import CardIssue from "./CardIssue";

export default function Issue({ issueId, issueStatuses, issueTypes }) {
    const [issue, setIssue] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`/api/issues/${issueId}`, {
            headers: {
                'Accept': 'application/ld+json',
                'Content-Type': 'application/ld+json'
            }
        })
            .then(response => response.json())
            .then((issue) => {
                setIssue(issue);
                document.title = `[${issue.id}] ${issue.summary} - TaskSphere`;
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
                <Col sm={12} md={8}>
                    <CardIssue issue={issue} setIssue={setIssue} />
                </Col>
                <Col sm={12} md={4}>
                    <StackIssueStatusType
                        issue={issue}
                        issueTypes={issueTypes}
                        issueStatuses={issueStatuses}
                        setIssue={setIssue}
                    />
                    <CardIssueDetails issue={issue} setIssue={setIssue}/>
                </Col>
            </Row>
        </Container>
    )
}