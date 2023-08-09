import React from 'react';
import {Button, Form, FormSelect, Modal} from "react-bootstrap";
import {showCreatedIssueAlert} from "../../../functions/alert";

export default function ModalCreateIssue({openModal, createIssueData, setOpenModal}) {
    const [summary, setSummary] = React.useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch('/api/issues', {
            body: JSON.stringify({
                assignee: '/api/users/1',
                project: '/api/projects/1',
                reporter: '/api/users/1',
                summary: summary,
            }),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        })
            .then(response => response.json())
            .then((issue) => {
                setOpenModal(true);

                showCreatedIssueAlert(issue.id);

                document.dispatchEvent(new CustomEvent('onCreateIssue', {
                    detail: issue
                }));
            });
    }

    return (
        <Modal show={openModal} onClose={() => setOpenModal(false)}>
            <Modal.Header>
                <h5>Create issue</h5>
            </Modal.Header>
            <form onSubmit={handleSubmit}>
                <Modal.Body>
                    <div className="space-y-6">
                        <div className="mb-4 block">
                            <Form.Label className="required" htmlFor="project">Project</Form.Label>
                            <FormSelect id="project">
                                {createIssueData.projects?.map((project) => (
                                    <option key={project.id} value={project.id}>{project.name}</option>
                                ))}
                            </FormSelect>
                        </div>

                        <div className="mb-4 block">
                            <Form.Label className="required" htmlFor="issueType">Issue Type</Form.Label>
                            <FormSelect id="issueType">
                                {createIssueData.types?.map((type) => (
                                    <option key={type.value} value={type.value}>{type.label}</option>
                                ))}
                            </FormSelect>
                        </div>

                        <div className="mb-4 block">
                            <Form.Label className="required" htmlFor="status">Status</Form.Label>
                            <FormSelect id="status">
                                {createIssueData.statuses?.map((status) => (
                                    <option key={status.value} value={status.value}>{status.label}</option>
                                ))}
                            </FormSelect>
                        </div>

                        <Form.Group className="mb-4 block">
                            <Form.Label className="required" htmlFor="summary">Summary</Form.Label>
                            <Form.Control id="summary" onChange={(e) => setSummary(e.target.value)} required />
                        </Form.Group>

                        <div className="mb-4 block">
                            <Form.Label htmlFor="assignee">Assignee</Form.Label>
                            <FormSelect id="assignee">
                                <option>Pentiminax</option>
                            </FormSelect>
                        </div>

                        <div className="mb-4 block">
                            <Form.Label className="required" htmlFor="reporter">Reporter</Form.Label>
                            <FormSelect id="reporter">
                                <option>Pentiminax</option>
                            </FormSelect>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setOpenModal(false)}>Cancel</Button>
                    <Button type="submit" variant="primary">Create</Button>
                </Modal.Footer>
            </form>
        </Modal>
    )
}