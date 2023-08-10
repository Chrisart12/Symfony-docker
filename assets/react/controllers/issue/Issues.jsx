import React, {useEffect} from "react";
import {Card, Col, Container, ListGroup, Row} from "react-bootstrap";
import {patch} from "../../../functions/api";
import queryString from 'query-string';
import CardIssueDetails from "./CardIssueDetails";
import StackIssueStatusType from "./StackIssueStatusType";
import IssueAttachments from "./IssueAttachments";
import MediaViewer from "../MediaViewer";
import ButtonAttach from "../attachment/ButtonAttach";

export default function Issues({ issues, issueStatuses, issueTypes }) {
    const [openMediaViewer, setOpenMediaViewer] = React.useState(false);
    const [parsedQueryString, setParsedQueryString] = React.useState(queryString.parse(location.search));
    const [issuesList, setIssuesList] = React.useState(JSON.parse(issues));
    const [selectedAttachment, setSelectedAttachment] = React.useState(null);
    const [selectedIssue, setSelectedIssue] = React.useState(null);

    const handleClick = (issue) => {
        history.replaceState(null, null, `?selectedIssue=${issue.id}`);
        setSelectedIssue(issue);
    }
    const handleDefaultSelectedIssue = () => {
        let issue = undefined;

         if (parsedQueryString['selectedIssue']) {
             issue = issuesList.find((issue) => issue.id === parsedQueryString['selectedIssue']);
         }

         setSelectedIssue(issue ? issue : issuesList[0]);
    }

    const handleStatusChange = (e) => {
        const selectedStatus = e.target.value;

        patch('issues', selectedIssue.id, {
            status: selectedStatus
        }).then(() => {
            setSelectedIssue({...selectedIssue, status: selectedStatus});
            setIssuesList(issuesList.map((issue) => {
                if (issue.id === selectedIssue.id) {
                    return {...issue, status: selectedStatus};
                }
                return issue;
            }));
        });
    }

    const handleTypeChange = (e) => {
        const selectedType = e.target.value;

        patch('issues', selectedIssue.id, {
            type: selectedType
        }).then(() => {
            setSelectedIssue({...selectedIssue, type: selectedType});
            setIssuesList(issuesList.map((issue) => {
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
        setIssuesList([...issuesList, e.detail]);
    }

    useEffect(() => {
        document.addEventListener('onCreateIssue', onCreateIssue);

        handleDefaultSelectedIssue();

        return () => {
            document.removeEventListener('onCreateIssue', onCreateIssue);
        }
    }, []);

    if (0 === issuesList.length) {
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
                                {issuesList.map((issue) => (
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
                            <Card.Title className="content-editable issue-summary">
                                <div>{selectedIssue?.summary}</div>
                            </Card.Title>

                            <hr />

                            <div className="issue-buttons my-3">
                                <ButtonAttach
                                    issue={selectedIssue}
                                    issues={issuesList}
                                    setIssue={setSelectedIssue}
                                    setIssues={setIssuesList}
                                />
                            </div>

                            <Card.Text>Description</Card.Text>

                            <hr />

                            <div className="content-editable issue-description">
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
                        issueTypes={issueTypes}
                        issueStatuses={issueStatuses}/>

                    <CardIssueDetails issue={selectedIssue} issues={issuesList} setIssue={setSelectedIssue} setIssues={setIssuesList} />
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