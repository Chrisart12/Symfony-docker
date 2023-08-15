import React, {useEffect, useState} from "react";
import {Col, Container, Row, Stack} from "react-bootstrap";
import CardIssueDetails from "./CardIssueDetails";
import StackIssueStatusType from "./StackIssueStatusType";
import CardIssue from "./CardIssue";
import {faShareFromSquare, faEye} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {showShareAlert} from "../../../functions/alert";

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

    const handleShare = () => {
        navigator.clipboard.writeText(window.location.href)
            .then(() => {
                showShareAlert();
            });
    }

    return (
        <Container className="mt-5">
            <Row>
                <Col sm={12} md={8}>
                    <CardIssue issue={issue} setIssue={setIssue} />
                </Col>
                <Col sm={12} md={4}>
                    <Stack direction="horizontal" gap={3} className="justify-content-end mb-3">
                        <FontAwesomeIcon icon={faEye} size="lg" title="Watch" />
                        <FontAwesomeIcon className="cursor-pointer" icon={faShareFromSquare} onClick={handleShare} size="lg" title="Share" />
                    </Stack>
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