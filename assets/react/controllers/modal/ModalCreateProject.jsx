import {Button, Form, FormSelect, Modal} from "react-bootstrap";
import React from "react";

export default function ModalCreateProject({openModal, setOpenModal, projectsList, setProjectsList}) {
    const [key, setKey] = React.useState('');
    const [name, setName] = React.useState('');

    const closeModal = () => {
        setOpenModal(false);
    }

    const createProject = () => {
        fetch('/api/projects', {
            body: JSON.stringify({
                key: key,
                name: name
            }),
            headers: {
                'Content-Type': 'application/ld+json'
            },
            method: 'POST'
        })
            .then(response => response.json())
            .then(project => {
                setProjectsList([...projectsList, project]);
            });
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        createProject();
    }

    const handleNameChange = (e) => {
        setName(e.target.value);
    }

    const handleKeyChange = (e) => {
        setKey(e.target.value);
    }

    return (
        <Modal show={openModal} onClose={closeModal}>
            <Modal.Header>
                <h5>Create project</h5>
            </Modal.Header>
            <Form onSubmit={handleSubmit}>
                <Modal.Body>
                    <div className="space-y-6">
                        <Form.Group className="mb-4 block">
                            <Form.Label className="required">Name</Form.Label>
                            <Form.Control required value={name} onChange={handleNameChange} />
                        </Form.Group>
                        <Form.Group className="mb-4 block">
                            <Form.Label className="required">Key</Form.Label>
                            <Form.Control maxLength="10" minLength="2" required  value={key} onChange={handleKeyChange} />
                        </Form.Group>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeModal}>Cancel</Button>
                    <Button type="submit" variant="primary">Create</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}