import {FormSelect, Stack} from "react-bootstrap";
import React, {useEffect} from "react";
import {fetchPatch} from "../../../functions/api";
import {updateIssuesState} from "../../../functions/issue";

export default function StackIssueStatusType({issue, issues = null, issueTypes, setIssue, setIssues}) {
    const [enabledStatuses, setEnabledStatuses] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    useEffect(() => {
        getEnabledStatuses();
        setLoading(false);
    }, []);

    const getEnabledStatuses = () => {
        fetch(`/issues/${issue.id}/enabled-statuses`)
            .then(response => response.json())
            .then(enabledStatuses => {
                setEnabledStatuses(enabledStatuses);
            });
    }

    const handleStatusChange = (e) => {
        const selectedStatus = e.target.value;

        fetchPatch('issues', issue.id, {
            status: selectedStatus
        }).then(() => {
            setIssue({...issue, status: selectedStatus});
            getEnabledStatuses();
        });
    }

    const handleTypeChange = (e) => {
        const selectedType = e.target.value;

        fetchPatch('issues', issue.id, {
            type: selectedType
        }).then((updatedIssue) => {
            setIssue({...issue, type: selectedType});
            updateIssuesState(issues, setIssues, updatedIssue);
        });
    }

    if (loading) {
        return <>Loading...</>;
    }

    return (
        <Stack className="stack-issue-status-type" direction="horizontal" gap={2}>
            <FormSelect className="mb-3 mt-sm-3 mt-md-0" onChange={handleTypeChange} value={issue?.type}>
                {issueTypes.map((issueType) => (
                    <option key={issueType.value} value={issueType.value}>{issueType.label}</option>
                ))}
            </FormSelect>

            <FormSelect className="mb-3 mt-sm-3 mt-md-0" onChange={handleStatusChange} value={issue?.status}>
                {enabledStatuses.map((status) => (
                    <option key={status.value} value={status.value}>{status.label}</option>
                ))}
            </FormSelect>
        </Stack>
    )
}