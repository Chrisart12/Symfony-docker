import React from 'react';
import ModalCreateIssue from "./modal/ModalCreateIssue";
import {Container, Form, Nav, Navbar} from "react-bootstrap";

export default function Header() {
    const [createIssueData, setCreateIssueData] = React.useState([]);
    const [openModal, setOpenModal] = React.useState(false);
    const [query, setQuery] = React.useState('');

    const handleChange = (e) => {
        setQuery(e.target.value);
    }

    const openModalCreateIssue = async () => {
        await fetchCreateIssueData();
        setOpenModal(true);
    }

    const fetchCreateIssueData = async () => {
        const response = await fetch('/issues/create');
        const json = await response.json();
        setCreateIssueData(json);
    }

    return (
        <>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand href="/">TaskSphere</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbar" />
                    <Navbar.Collapse id="navbar">
                        <Nav className="me-auto">
                            <Nav.Link href="#home">Your work</Nav.Link>
                            <Nav.Link href="/projects">Projects</Nav.Link>
                            <Nav.Link href="/teams">Teams</Nav.Link>
                            <Nav.Link href="/issues">Issues</Nav.Link>
                            <Nav.Link href="#" onClick={openModalCreateIssue}>Create</Nav.Link>
                        </Nav>
                        <Form action="/search" className="d-flex" >
                            <Form.Control name="query" onChange={handleChange} placeholder="Search..." type="search" value={query} />
                        </Form>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <ModalCreateIssue openModal={openModal} createIssueData={createIssueData} setOpenModal={setOpenModal} />
        </>
    )
}