import {Card} from "react-bootstrap";
import {EditText} from "react-edit-text";
import ButtonAttach from "../attachment/ButtonAttach";
import {Editor} from "react-draft-wysiwyg";
import IssueAttachments from "./IssueAttachments";
import React, {useEffect} from "react";
import {fetchPatch} from "../../../functions/api";

export default function CardIssue({ issue, setIssue, setSelectedAttachment }) {
    const [openMediaViewer, setOpenMediaViewer] = React.useState(false);

    const handleSave = (e) => {
        const body = {};

        body[e.name] = e.value;

        fetchPatch('issues', issue.id,body)
            .then(response => response.json())
            .then(() => {
                document.title = `[${issue.id}] ${e.value} - TaskSphere`;

            });
    }

    const onDeleteAttachment = (e) => {
        setSelectedAttachment(null);
        setOpenMediaViewer(false);

        issue.attachments = issue.attachments.filter((attachment) => attachment.id !== e.detail.id);
        setIssue({...issue, attachments: issue.attachments});
    }

    const showMediaViewer = (attachment) => {
        setSelectedAttachment(attachment);
        setOpenMediaViewer(true);
    }

    const updateSummaryValue = (e) => {
        const updatedSummary = e.target.value;

        setIssue({...issue, summary: updatedSummary});
    }

    useEffect(() => {
        document.addEventListener('onDeleteAttachment', onDeleteAttachment);

        return () => {
            document.removeEventListener('onDeleteAttachment', onDeleteAttachment);
        }
    }, []);

    return (
        <Card className="card-issue">
            <Card.Body>
                <Card.Title className="issue-summary">
                    <EditText className="w-100" inputClassName="w-100" name="summary" onChange={updateSummaryValue} onSave={handleSave} value={issue.summary} />
                </Card.Title>
                <div className="issue-buttons my-3">
                    <ButtonAttach issue={issue} setIssue={setIssue} />
                </div>
                <Card.Text className="fw-bold">Description</Card.Text>
                <hr />
                <div className="issue-description">
                    <Editor toolbar={{ options: ['blockType', 'history', 'inline', 'link', 'remove', 'textAlign']}}  />
                </div>
                {issue.attachments.length > 0 && (
                    <IssueAttachments issue={issue} showMediaViewer={showMediaViewer} />
                )}
            </Card.Body>
        </Card>
    )
}