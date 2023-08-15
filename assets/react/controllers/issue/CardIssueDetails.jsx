import React, {useEffect, useState} from "react";
import {Card, Table} from "react-bootstrap";
import Select from "react-select";
import {fetchPatch} from "../../../functions/api";

export default function CardIssueDetails({ issue, issues = null, setIssue, setIssues = null }) {
    const [options, setOptions] = useState([]);
    const [loading, setLoading] = useState(true);

    const handleAssigneeChange = (e) => {
        if (e.value === issue.assignee.id) {
            return;
        }

        fetchPatch('issues', issue.id, {
            'assignee': `/api/users/${e.value}`
        })
            .then(response => response.json())
            .then((updatedIssue) => {
                setIssue(updatedIssue);

                if (issues && setIssues) {
                    setIssues(issues.map((currentIssue) => {
                        if (currentIssue.id === updatedIssue.id) {
                            return updatedIssue;
                        }
                        return currentIssue;
                    }));
                }
            });
    }

    const handleReporterChange = (e) => {
        if (e.value === issue.reporter.id) {
            return;
        }

        fetchPatch('issues', issue.id, {
            'reporter': `/api/users/${e.value}`
        })
            .then(response => response.json())
            .then((updatedIssue) => {
                setIssue(updatedIssue);

                if (issues && setIssues) {
                    setIssues(issues.map((currentIssue) => {
                        if (currentIssue.id === updatedIssue.id) {
                            return updatedIssue;
                        }
                        return currentIssue;
                    }));
                }
            });
    }

    useEffect(() => {
        fetch(`/api/projects/6/people`)
            .then(response => response.json())
            .then(json => {
                const data = [];

                console.log({people: data});

                json['people'].forEach(person => {
                    console.log({person: person});
                    data.push({ value: person.id, label: `${person.firstName} ${person.lastName}` });
                    setOptions(data);
                });
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

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