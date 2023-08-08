import React from "react";
import {Card, Col, Container, Row, Table} from "react-bootstrap";

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
                        </tr>
                        </thead>
                        <tbody>
                        {projectsList.map((project) => (
                            <tr key={project.id}>
                                <td>{project.name}</td>
                                <td>{project.key}</td>
                                <td>{project.lead.email}</td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    );
}