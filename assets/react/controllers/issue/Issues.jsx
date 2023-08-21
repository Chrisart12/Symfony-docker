import React, {useEffect, useState} from "react";
import {Card, Col, Container, ListGroup, Row} from "react-bootstrap";
import {fetchPatch} from "../../../functions/api";
import queryString from 'query-string';
import CardIssueDetails from "./CardIssueDetails";
import StackIssueStatusType from "./StackIssueStatusType";
import IssueAttachments from "./IssueAttachments";
import MediaViewer from "../MediaViewer";
import ButtonAttach from "../attachment/ButtonAttach";

export default function Issues({ issueTypes, projectId }) {
    const [openMediaViewer, setOpenMediaViewer] = React.useState(false);
    const [parsedQueryString, setParsedQueryString] = React.useState(queryString.parse(location.search));
    const [issues, setIssues] = React.useState([]);
    const [selectedAttachment, setSelectedAttachment] = React.useState(null);
    const [selectedIssue, setSelectedIssue] = React.useState(null);
    const [loading, setLoading] = useState(true);

    const handleClick = (issue) => {
        history.replaceState(null, null, `?selectedIssue=${issue.id}`);
        setSelectedIssue(issue);
    }
    const handleDefaultSelectedIssue = (issues) => {
        if (selectedIssue) {
            return;
        }

        let issue = null;

         if (parsedQueryString['selectedIssue']) {
             issue = issues.find((issue) => issue.id === parsedQueryString['selectedIssue']);
         }

         setSelectedIssue(issue ? issue : issues[0]);
    }

    const handleStatusChange = (e) => {
        const selectedStatus = e.target.value;

        fetchPatch('issues', selectedIssue.id, {
            status: selectedStatus
        }).then(() => {
            setSelectedIssue({...selectedIssue, status: selectedStatus});
            setIssues(issues.map((issue) => {
                if (issue.id === selectedIssue.id) {
                    return {...issue, status: selectedStatus};
                }
                return issue;
            }));
        });
    }

    const handleTypeChange = (e) => {
        const selectedType = e.target.value;

        fetchPatch('issues', selectedIssue.id, {
            type: selectedType
        }).then(() => {
            setSelectedIssue({...selectedIssue, type: selectedType});
            setIssues(issues.map((issue) => {
                if (issue.id === selectedIssue.id) {
                    return {...issue, type: selectedType};
                }
                return issue;
            }));
        });
    }

    const showMediaViewer = (attachment) => {
        setSelectedAttachment(attachment);
        setOpenMediaViewer(true);
    }

    const onCreateIssue = (e) => {
        setIssues([...issues, e.detail]);
    }

    const onDeleteAttachment = (e) => {
        if (!selectedIssue) {
            return;
        }

        selectedIssue.attachments = selectedIssue.attachments.filter((attachment) => attachment.id !== e.detail.id);

        setIssues(issues.map((issue) => {
            if (issue.id === selectedIssue.id) {
                return selectedIssue;
            }
            return issue;
        }))

        setSelectedAttachment(null);
        setOpenMediaViewer(false);
    }

    useEffect(() => {
        fetch('/api/issues', {
            headers: {
                'Accept': 'application/ld+json',
                'Content-Type': 'application/ld+json'
            }
        })
            .then(response => response.json())
            .then(issues => {
                setIssues(issues['hydra:member']);
                handleDefaultSelectedIssue(issues['hydra:member']);
            })
            .finally(() => {
                setLoading(false);
            });

        document.addEventListener('onCreateIssue', onCreateIssue);

        return () => {
            document.removeEventListener('onCreateIssue', onCreateIssue);
        }
    }, []);

    if (loading) {
        return <>Loading...</>;
    }

    if (0 === issues.length) {
        return (
            <Container className="mt-5">
                <Row>
                    <Col>
                        <Card>
                            <Card.Body className="bg-light">
                                <Card.Text className="text-center">You don't have any issues</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        )
    }

    return (
        <Container className="mt-5">
            <Row>
                <Col className="mb-sm-3 mt-sm-0" sm={12} md={3}>
                    <Card>
                        <Card.Header>Backlog</Card.Header>
                        <Card.Body>
                            <ListGroup>
                                {issues.map((issue) => (
                                    <ListGroup.Item action active={issue.id === selectedIssue?.id} key={issue.id} onClick={() => handleClick(issue)}>
                                        <div className="fw-bold">{issue.id}</div>
                                        <div><small>{issue.summary}</small></div>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        </Card.Body>
                    </Card>
                </Col>
                <Col sm={12} md={6}>
                    <Card>
                        <Card.Body>
                            <Card.Title className="issue-summary">
                                <div>{selectedIssue?.summary}</div>
                            </Card.Title>

                            <hr />

                            <div className="issue-buttons my-3">
                                <ButtonAttach
                                    issue={selectedIssue}
                                    issues={issues}
                                    setIssue={setSelectedIssue}
                                    setIssues={setIssues}
                                />
                            </div>

                            <Card.Text>Description</Card.Text>

                            <hr />

                            <div className="issue-description">
                                <p dangerouslySetInnerHTML={{__html: selectedIssue?.description ?  selectedIssue?.description : '<span class="text-muted">Add a description...</span>'}}></p>
                            </div>

                            {selectedIssue?.attachments.length > 0 && (
                                <IssueAttachments issue={selectedIssue} showMediaViewer={showMediaViewer} />
                            )}
                        </Card.Body>
                    </Card>
                </Col>
                <Col sm={12} md={3}>
                    <StackIssueStatusType
                        handleStatusChange={handleStatusChange}
                        handleTypeChange={handleTypeChange}
                        issue={selectedIssue}
                        issues={issues}
                        issueTypes={issueTypes}
                        setIssue={setSelectedIssue}
                        setIssues={setIssues}
                    />

                    <CardIssueDetails
                        issue={selectedIssue}
                        issues={issues}
                        projectId={projectId}
                        setIssue={setSelectedIssue}
                        setIssues={setIssues}
                    />
                </Col>
            </Row>
            <MediaViewer
                attachmentPath={selectedAttachment?.path}
                openMediaViewer={openMediaViewer}
                setOpenMediaViewer={setOpenMediaViewer}
            />
        </Container>
    );
}