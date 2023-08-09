import React from 'react';
import ModalCreateIssue from "./modal/ModalCreateIssue";
import {Container, Nav, Navbar, NavDropdown} from "react-bootstrap";

export default function Header() {
    const [openModal, setOpenModal] = React.useState('');
    const [createIssueData, setCreateIssueData] = React.useState([]);

    const handleClick = async () => {
        await fetchCreateIssueData();
        setOpenModal('default');
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
                            <Nav.Link href="#" onClick={handleClick}>Create</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <ModalCreateIssue openModal={openModal} createIssueData={createIssueData} setOpenModal={setOpenModal} />
        </>
    )
}