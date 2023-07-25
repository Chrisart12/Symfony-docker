import React from 'react';
import {Button, Label, Modal, Select, TextInput} from "flowbite-react";

export default function ModalCreateIssue({openModal, projects, setOpenModal}) {
    const handleSubmit = (e) => {
        e.preventDefault();

        fetch('/api/issues', {
            body: JSON.stringify({
                project: '/api/projects/1',
                summary: '',
            }),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        })
            .then(response => response.json())
            .then(json => {
                setOpenModal('');
            });
    }

    return (
        <Modal show={openModal === 'default'} onClose={() => setOpenModal('')}>
            <Modal.Header>Create issue</Modal.Header>
            <form onSubmit={handleSubmit}>
                <Modal.Body>
                    <div className="space-y-6">
                        <div className="mb-4 block">
                            <Label className="required" htmlFor="project" value="Project" />
                            <Select id="project">
                                {projects.map((project) => (
                                    <option key={project.id} value={project.id}>{project.name}</option>
                                ))}
                            </Select>
                        </div>

                        <div className="mb-4 block">
                            <Label className="required" htmlFor="issueType" value="Issue type" />
                            <Select id="project">
                                <option>Bug</option>
                            </Select>
                        </div>

                        <div className="mb-4 block">
                            <Label htmlFor="status" value="Status" />
                            <Select id="status">
                                <option>New</option>
                            </Select>
                        </div>

                        <div className="mb-4 block">
                            <Label className="required" htmlFor="summary" value="Summary" />
                            <TextInput id="summary" required />
                        </div>

                        <div className="mb-4 block">
                            <Label htmlFor="assignee" value="Assignee" />
                            <Select id="assignee">
                                <option>Pentiminax</option>
                            </Select>
                        </div>

                        <div className="mb-4 block">
                            <Label className="required" htmlFor="reporter" value="Reporter" />
                            <Select id="reporter">
                                <option>Pentiminax</option>
                            </Select>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button color="gray" onClick={() => setOpenModal('')}>Cancel</Button>
                    <Button type="submit">Create</Button>
                </Modal.Footer>
            </form>
        </Modal>
    )
}