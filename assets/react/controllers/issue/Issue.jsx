import React, {useEffect, useRef, useState} from "react";
import {Col, Container, Row} from "react-bootstrap";
import {fetchPatch} from "../../../functions/api";
import CardIssueDetails from "./CardIssueDetails";
import StackIssueStatusType from "./StackIssueStatusType";
import MediaViewer from "../MediaViewer";
import CardIssue from "./CardIssue";

export default function Issue({ issueId, issueStatuses, issueTypes }) {
    const [issue, setIssue] = useState(null);
    const [loading, setLoading] = useState(true);

    const handleStatusChange = (e) => {
        const selectedStatus = e.target.value;

        fetchPatch('issues', issue.id, {
            status: selectedStatus
        }).then((updatedIssue) => {
            setIssue(updatedIssue);
        });
    }

    const handleTypeChange = (e) => {
        const selectedType = e.target.value;

        fetchPatch('issues', issue.id, {
            type: selectedType
        }).then((updatedIssue) => {
            setIssue(updatedIssue);
        });
    }

    const onDeleteAttachment = () => {
        setSelectedAttachment(null);
        setOpenMediaViewer(false);
    }

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
            })
            .finally(() => {
                setLoading(false);
            });

        document.addEventListener('onDeleteAttachment', onDeleteAttachment);

        return () => {
            document.removeEventListener('onDeleteAttachment', onDeleteAttachment);
        }
    }, []);

    if (loading) {
        return <>Loading...</>;
    }

    return (
        <React.StrictMode>
            <Container className="mt-5">
                <Row>
                    <Col sm={12} md={8}>
                        <CardIssue issue={issue} setIssue={setIssue} />
                    </Col>
                    <Col sm={12} md={4}>
                        <StackIssueStatusType
                            handleStatusChange={handleStatusChange}
                            handleTypeChange={handleTypeChange}
                            issue={issue}
                            issueTypes={issueTypes}
                            issueStatuses={issueStatuses}/>
                        <CardIssueDetails issue={issue} setIssue={setIssue} />
                    </Col>
                </Row>
            </Container>
        </React.StrictMode>
    )
}