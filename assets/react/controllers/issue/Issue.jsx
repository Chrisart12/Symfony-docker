import React from "react";
import {Col, Container, Row} from "react-bootstrap";
import {fetchPatch} from "../../../functions/api";
import CardIssueDetails from "./CardIssueDetails";
import StackIssueStatusType from "./StackIssueStatusType";
import MediaViewer from "../MediaViewer";
import CardIssue from "./CardIssue";


export default function Issue({ serializedIssue, issueStatuses, issueTypes }) {
    const [issue, setIssue] = React.useState(JSON.parse(serializedIssue));
    const [openMediaViewer, setOpenMediaViewer] = React.useState(false);
    const [selectedAttachment, setSelectedAttachment] = React.useState(null);

    const handleStatusChange = (e) => {
        const selectedStatus = e.target.value;

        fetchPatch('issues', issue.id, {
            status: selectedStatus
        }).then(() => {
            setIssue({...issue, status: selectedStatus});
        });
    }

    const handleTypeChange = (e) => {
        const selectedType = e.target.value;

        fetchPatch('issues', issue.id, {
            type: selectedType
        }).then(() => {
            setIssue({...issue, type: selectedType});
        });
    }

    return (
        <Container className="mt-5">
            <Row>
                <Col sm={12} md={8}>
                        <CardIssue issue={issue} setIssue={setIssue} setSelectedAttachment={setSelectedAttachment} />
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
            <MediaViewer
                attachmentPath={selectedAttachment?.path}
                openMediaViewer={openMediaViewer}
                setOpenMediaViewer={setOpenMediaViewer}
            />
        </Container>
    )
}