import React, {useEffect, useState} from "react";
import {Card, Form, Placeholder, Table} from "react-bootstrap";
import Select from "react-select";
import {fetchPatch} from "../../../functions/api";
import {updateIssuesState} from "../../../functions/issue";
import usePeopleOptions from "../hooks/usePeopleOptions";

export default function CardIssueDetails({ issue, issues = null, projectId, setIssue, setIssues = null }) {
    const {options, loading} = usePeopleOptions(projectId);
    const [storyPointEstimate, setStoryPointEstimate] = useState(issue.storyPointEstimate);

    const handleAssigneeChange = (e) => {
        if (e.value === issue.assignee.id) {
            return;
        }

        fetchPatch('issues', issue.id, {
            assignee: `/api/users/${e.value}`
        })
            .then(response => response.json())
            .then((updatedIssue) => {
                setIssue({ ...issue, assignee: updatedIssue.assignee });
                updateIssuesState(issues, setIssues, updatedIssue);
            });
    }

    const handleReporterChange = (e) => {
        if (e.value === issue.reporter.id) {
            return;
        }

        fetchPatch('issues', issue.id, {
            reporter: `/api/users/${e.value}`
        })
            .then(response => response.json())
            .then((updatedIssue) => {
                setIssue({ ...issue, reporter: updatedIssue.reporter });
                updateIssuesState(issues, setIssues, updatedIssue);
            });
    }

    const handleStoryPointEstimateBlur = (e) => {
        fetchPatch('issues', issue.id, {
            'storyPointEstimate': parseInt(e.target.value)
        })
            .then(response => response.json())
            .then(updatedIssue => {
                setIssue({ ...issue, storyPointEstimate: updatedIssue.storyPointEstimate });
                updateIssuesState(issues, setIssues, updatedIssue);
            });
    }

    const handleStoryPointEstimateChange = (e) => {
        setStoryPointEstimate(e.target.value);
    }

    useEffect(() => {
        setStoryPointEstimate(issue.storyPointEstimate);
    }, [issue]);

    if (loading) {
        return (
            <Card>
                <Card.Header>Details</Card.Header>
                <Card.Body>
                    <Placeholder as={Card.Text} animation="glow">
                        <Placeholder className="mb-3" size="lg" xs={12}  />
                        <Placeholder className="mb-3" size="lg" xs={12} />
                        <Placeholder size="lg" xs={12} />
                    </Placeholder>
                </Card.Body>
            </Card>
        )
    }

    return (
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
                    <tbody className="align-middle">
                    <tr>
                        <td className="fw-bold"><small>Assignee</small></td>
                        <td>
                            <Select
                                onChange={handleAssigneeChange}
                                options={options}
                                placeholder="Assignee"
                                value={options.find(option => option.value === issue.assignee.id)}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td className="fw-bold"><small>Story point estimate</small></td>
                        <td>
                            <Form.Group>
                                <Form.Control onBlur={handleStoryPointEstimateBlur} onChange={handleStoryPointEstimateChange} min={0} required type="number" value={storyPointEstimate} />
                            </Form.Group>
                        </td>
                    </tr>
                    <tr>
                        <td className="fw-bold"><small>Reporter</small></td>
                        <td>
                            <Select
                                onChange={handleReporterChange}
                                options={options}
                                placeholder="Reporter"
                                value={options.find(option => option.value === issue.reporter.id)}
                            />
                        </td>
                    </tr>
                    </tbody>
                </Table>
            </Card.Body>
        </Card>
    )
}