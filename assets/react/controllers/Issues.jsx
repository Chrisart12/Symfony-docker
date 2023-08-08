import React, {useEffect} from "react";
import {Card, Col, Container, FormSelect, ListGroup, Row, Stack, Table} from "react-bootstrap";
import {patch} from "../../functions/api";
import queryString from 'query-string';

export default function Issues({ issues, issueStatuses, issueTypes }) {
    const [parsedQueryString, setParsedQueryString] = React.useState(queryString.parse(location.search));

    const [issuesList, setIssuesList] = React.useState(JSON.parse(issues));
    const [issueStatusesList, setIssueStatusesList] = React.useState(JSON.parse(issueStatuses));
    const [issueTypesList, setIssueTypesList] = React.useState(JSON.parse(issueTypes));
    const [selectedIssue, setSelectedIssue] = React.useState();

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

    useEffect(() => {
        document.addEventListener('onCreateIssue', (e) => {
           setIssuesList([...issuesList, e.detail]);
        });

        handleDefaultSelectedIssue();

        return () => {
            document.removeEventListener('onCreateIssue', (e) => {
                setIssuesList([...issuesList, e.detail]);
            });
        }
    }, []);

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
                            <Card.Text>Description</Card.Text>
                                <div className="content-editable issue-description">
                                <p dangerouslySetInnerHTML={{__html: selectedIssue?.description ?  selectedIssue?.description : '<span class="text-muted">Add a description...</span>'}}></p>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
                <Col sm={12} md={3}>
                    <Stack direction="horizontal" gap={2}>
                        <FormSelect className="mb-3 mt-sm-3 mt-md-0" value={selectedIssue?.type} onChange={handleTypeChange}>
                            {issueTypesList.map((issueType) => (
                                <option key={issueType.value} value={issueType.value}>{issueType.label}</option>
                            ))}
                        </FormSelect>

                        <FormSelect className="mb-3 mt-sm-3 mt-md-0" value={selectedIssue?.status} onChange={handleStatusChange}>
                            {issueStatusesList.map((issueStatus) => (
                                <option key={issueStatus.value} value={issueStatus.value}>{issueStatus.label}</option>
                            ))}
                        </FormSelect>
                    </Stack>

                    <Card>
                        <Card.Header>Details</Card.Header>
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
                                        <td><small>{selectedIssue?.assignee.email}</small></td>
                                    </tr>
                                    <tr>
                                        <td className="fw-bold"><small>Reporter</small></td>
                                        <td><small>{selectedIssue?.reporter.email}</small></td>
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