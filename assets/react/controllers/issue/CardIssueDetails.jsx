import React, {useEffect, useState} from "react";
import {Card, Form, Table} from "react-bootstrap";
import Select from "react-select";
import {fetchPatch} from "../../../functions/api";
import {updateIssuesState} from "../../../functions/issue";

export default function CardIssueDetails({ issue, issues = null, setIssue, setIssues = null }) {
    const [loading, setLoading] = useState(true);
    const [options, setOptions] = useState([]);
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
        const fetchData = async () => {
            if (options.length === 0) {
                try {
                    const response = await fetch(`/api/projects/6/people`);
                    const json = await response.json();

                    const data = json['people'].map(person => ({
                        value: person.id,
                        label: `${person.firstName} ${person.lastName}`
                    }));

                    setOptions(data);
                } catch (error) {
                    console.error('Error fetching data:', error);
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchData();

        setStoryPointEstimate(issue.storyPointEstimate);
    }, [issue]);

    if (loading) {
        return <>Loading...</>;
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