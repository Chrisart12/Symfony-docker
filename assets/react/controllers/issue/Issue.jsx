import React, {useEffect} from "react";
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

    const onAddAttachment = (e) => {
        const updatedAttachments = [...issue.attachments, e.detail];
        console.log({updatedAttachments : updatedAttachments});
        setIssue({ ...issue, attachments: updatedAttachments });
    }

    const onDeleteAttachment = (e) => {
        setSelectedAttachment(null);
        setOpenMediaViewer(false);

        console.log({ issue: issue });

        console.log({attachmentId: e.detail.id});

        issue.attachments = issue.attachments.filter((attachment) => attachment.id !== e.detail.id);

        console.log({ updatedAttachments: issue.attachments });

        console.log({ updatedIssue: issue });

        setIssue(issue);
    }

    useEffect(() => {
        document.addEventListener('onAddAttachment', onAddAttachment);
        document.addEventListener('onDeleteAttachment', onDeleteAttachment);

        return () => {
            document.removeEventListener('onAddAttachment', onAddAttachment);
            document.removeEventListener('onDeleteAttachment', onDeleteAttachment);
        }
    }, []);

    return (
        <React.StrictMode>
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
        </React.StrictMode>
    )
}