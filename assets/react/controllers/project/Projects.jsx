import React from "react";
import {Button, Card, Col, Container, Dropdown, Row, Table} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEllipsis} from "@fortawesome/free-solid-svg-icons";
import ModalCreateProject from "../modal/ModalCreateProject";

export default function Projects({ projects }) {
    const [openModal, setOpenModal] = React.useState(false);
    const [projectsList, setProjectsList] = React.useState(JSON.parse(projects));

     if (0 === projectsList.length) {
         const showModal = () => {
             setOpenModal(true);
         }

         return (
             <Container className="mt-5">
                 <Row>
                     <Col>
                         <Card>
                             <Card.Body className="bg-light">
                                 <Card.Text className="fw-bold text-center">You currently have no projects</Card.Text>
                             </Card.Body>
                         </Card>
                         <div className="text-center mt-3">
                             <Button className="fw-bold" size="sm" onClick={showModal}>Create project</Button>
                         </div>
                     </Col>
                 </Row>
                 <ModalCreateProject openModal={openModal} setOpenModal={setOpenModal} />
             </Container>
         )
     }

    return (
        <Container className="mt-5">
            <Row>
                <Col>
                    <Table bordered hover>
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Key</th>
                            <th>Lead</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {projectsList.map((project) => (
                            <tr className="cursor-pointer" key={project.id}>
                                <td>{project.name}</td>
                                <td>{project.key}</td>
                                <td>{project.lead.email}</td>
                                <td className="text-center">
                                    <Dropdown>
                                        <Dropdown.Toggle className="dropdown-project-actions" variant="secondary">
                                            <FontAwesomeIcon icon={faEllipsis} size="xl" />
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            <Dropdown.Item href="#/action-1">Project settings</Dropdown.Item>
                                            <Dropdown.Item href="#/action-2">Move to trash</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    );
}