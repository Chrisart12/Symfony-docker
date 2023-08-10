import React, {useState} from "react";
import {Card, Table} from "react-bootstrap";
import Select from "react-select";
import {patch} from "../../../functions/api";

export default function CardIssueDetails({ issue, setIssue }) {
    if (!issue) {
        return;
    }
    const [options, setOptions] = useState([]);

    const handleAssigneeChange = (e) => {
        if (e.value === issue.assignee.id) {
            return;
        }

        patch('issues', issue.id, {
            'assignee': `/api/users/${e.value}`
        })
            .then(response => response.json())
            .then((updatedIssue) => {
                setIssue(updatedIssue);
            });
    }

    const handleReporterChange = (e) => {
        if (e.value === issue.reporter.id) {
            return;
        }

        patch('issues', issue.id, {
            'reporter': `/api/users/${e.value}`
        })
            .then(response => response.json())
            .then((updatedIssue) => {
                setIssue(updatedIssue);
            });
    }

    React.useEffect(() => {
        if (0 === options.length) {
            fetch(`/api/projects/6/people`)
                .then(response => response.json())
                .then(json => {
                    json['people'].forEach(person => {
                        options.push({value: person.id, label: `${person.firstName} ${person.lastName}`});
                    });
                });
        }
    }, [options]);

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
                                value={{value: issue.assignee.id, label: `${issue.assignee.firstName } ${issue.assignee.lastName}`}}
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
                                value={{value: issue.reporter.id, label: `${issue.reporter.firstName } ${issue.reporter.lastName}`}}
                            />
                        </td>
                    </tr>
                    </tbody>
                </Table>
            </Card.Body>
        </Card>
    )
}