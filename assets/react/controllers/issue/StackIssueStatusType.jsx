import {FormSelect, Stack} from "react-bootstrap";
import React from "react";

export default function StackIssueStatusType({handleStatusChange, handleTypeChange, issue, issueStatuses, issueTypes}) {
    return (
        <Stack className="stack-issue-status-type" direction="horizontal" gap={2}>
            <FormSelect className="mb-3 mt-sm-3 mt-md-0" onChange={handleTypeChange} value={issue?.type}>
                {issueTypes.map((issueType) => (
                    <option key={issueType.value} value={issueType.value}>{issueType.label}</option>
                ))}
            </FormSelect>

            <FormSelect className="mb-3 mt-sm-3 mt-md-0" onChange={handleStatusChange} value={issue?.status}>
                {issueStatuses.map((issueStatus) => (
                    <option key={issueStatus.value} value={issueStatus.value}>{issueStatus.label}</option>
                ))}
            </FormSelect>
        </Stack>
    )
}