import {Card, Col, Container, Placeholder, Row, Stack} from "react-bootstrap";
import CardIssue from "./CardIssue";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye, faShareFromSquare} from "@fortawesome/free-solid-svg-icons";
import StackIssueStatusType from "./StackIssueStatusType";
import CardIssueDetails from "./CardIssueDetails";
import React, {useEffect, useState} from "react";
import {showShareAlert} from "../../../functions/alert";

export default function Issue({ id, issueTypes, projectId, size="sm" }) {
    const [issue, setIssue] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`/api/issues/${id}`, {
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
        return (
            <Container className="mt-5">
                <Row>
                    <Col sm={12} md={8}>
                        <Card>
                            <Placeholder animation="glow" as={Card.Header}>
                                <Placeholder xs={12}  />
                            </Placeholder>
                            <Card.Body>
                                <Placeholder animation="glow" as={Card.Title}>
                                    <Placeholder xs={12}  />
                                </Placeholder>
                                <Placeholder animation="glow" as={Card.Text}>
                                    <Placeholder xs={12}  />
                                </Placeholder>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        );
    }

    const handleShare = () => {
        navigator.clipboard.writeText(window.location.href)
            .then(() => {
                showShareAlert();
            });
    }

    return (
        <>
            <Col sm={12} md={"sm" === size ? 6 : 8}>
                <CardIssue issue={issue} setIssue={setIssue} />
            </Col>
            <Col sm={12} md={"sm" === size ? 3 : 4}>
                <Stack direction="horizontal" gap={3} className="justify-content-end mb-3">
                    <FontAwesomeIcon icon={faEye} size="lg" title="Watch" />
                    <FontAwesomeIcon className="cursor-pointer" icon={faShareFromSquare} onClick={handleShare} size="lg" title="Share" />
                </Stack>
                <StackIssueStatusType
                    issue={issue}
                    issueTypes={issueTypes}
                    setIssue={setIssue}
                />
                <CardIssueDetails issue={issue} setIssue={setIssue} projectId={projectId} />
            </Col>
        </>
    )
}