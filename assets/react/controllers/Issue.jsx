import React, {useRef} from "react";
import {Button, Card, Col, Container, FormSelect, Row, Stack, Table} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faPaperclip } from '@fortawesome/free-solid-svg-icons';
import {patch} from "../../functions/api";
import CardIssueDetails from "./CardIssueDetails";
import StackIssueStatusType from "./StackIssueStatusType";

export default function Issue({ serializedIssue, issueStatuses, issueTypes }) {
    const [issue, setIssue] = React.useState(JSON.parse(serializedIssue));
    const inputFile = useRef(null);

    /**
     * @param {Event<HTMLInputElement>} e
     */
    const handleChange = (e) => {
        /** @type {FileList}*/
        const files = e.target.files;

        if (0 === files.length) {
            return;
        }

        const formData = new FormData();
        formData.append('attachment', files[0]);

        fetch(`/issues/${issue.id}/attachments`, {
            body: formData,
            method: 'POST'
        });
    }

    const handleClick = () => {
        inputFile.current.click();
    }

    const handleStatusChange = (e) => {
        const selectedStatus = e.target.value;

        patch('issues', issue.id, {
            status: selectedStatus
        }).then(() => {
            setIssue({...issue, status: selectedStatus});
        });
    }

    const handleTypeChange = (e) => {
        const selectedType = e.target.value;

        patch('issues', issue.id, {
            type: selectedType
        }).then(() => {
            setIssue({...issue, type: selectedType});
        });
    }

    return (
        <Container className="mt-5">
            <Row>
                <Col sm={12} md={8}>
                    <Card>
                        <Card.Body>
                            <Card.Title className="content-editable issue-summary">
                                <div>{issue.summary}</div>
                            </Card.Title>
                            <div className="issue-buttons my-3">
                                <Button onClick={handleClick} size="sm">
                                    <FontAwesomeIcon icon={faPaperclip} />&nbsp;Attach
                                </Button>
                                <input className="d-none" type="file" ref={inputFile} onChange={handleChange} />
                            </div>
                            <Card.Text className="fw-bold">Description</Card.Text>
                            <hr />
                            <div className="content-editable issue-description">
                                <p dangerouslySetInnerHTML={{__html: issue.description ?  issue.description : '<span class="text-muted">Add a description...</span>'}}></p>
                            </div>
                            {issue.attachments.length > 0 && (
                                <>
                                    <Card.Text className="fw-bold">Attachments ({issue.attachments.length})</Card.Text>
                                    <hr />
                                    <Stack direction="horizontal" gap={2}>
                                        {issue.attachments.map((attachment) => (
                                            <div key={attachment.id}>
                                                <img alt="" className="object-fit-cover" height="128" width="128" src={attachment.path}  />
                                            </div>
                                        ))}
                                    </Stack>
                                </>
                            )}
                        </Card.Body>
                    </Card>
                </Col>
                <Col sm={12} md={4}>
                    <StackIssueStatusType
                        handleStatusChange={handleStatusChange}
                        handleTypeChange={handleTypeChange}
                        issue={issue}
                        issueTypes={issueTypes}
                        issueStatuses={issueStatuses}/>
                    <CardIssueDetails issue={issue} />
                </Col>
            </Row>
        </Container>
    )
}