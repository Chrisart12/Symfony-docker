import React from "react";
import {Card, Col, Container, Dropdown, Row, Table} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEllipsis} from "@fortawesome/free-solid-svg-icons";

export default function Projects({ projects }) {
     const [projectsList, setProjectsList] = React.useState(JSON.parse(projects));

     if (0 === projectsList.length) {
         return (
             <Container className="mt-5">
                 <Row>
                     <Col>
                         <Card>
                             <Card.Body className="bg-light">
                                 <Card.Text className="text-center">You don't have any projects</Card.Text>
                             </Card.Body>
                         </Card>
                     </Col>
                 </Row>
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