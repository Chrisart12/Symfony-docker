import {Button, Form, FormSelect, Modal} from "react-bootstrap";
import React from "react";

export default function ModalCreateProject({openModal, setOpenModal}) {
    const closeModal = () => {
        setOpenModal(false);
    }

    return (
        <Modal show={openModal} onClose={closeModal}>
            <Modal.Header>
                <h5>Create project</h5>
            </Modal.Header>
            <Form>
                <Modal.Body>
                    <div className="space-y-6">
                        <Form.Group className="mb-4 block">
                            <Form.Label className="required">Name</Form.Label>
                            <Form.Control required />
                        </Form.Group>
                        <Form.Group className="mb-4 block">
                            <Form.Label className="required">Key</Form.Label>
                            <Form.Control max="6" min="2" required />
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