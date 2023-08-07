import React from 'react';
import NavbarLink from "./NavbarLink";
import ModalCreateIssue from "./ModalCreateIssue";
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
                    <Navbar.Brand href="#home">TaskSphere</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbar" />
                    <Navbar.Collapse id="navbar">
                        <Nav className="me-auto">
                            <Nav.Link href="#home">Your work</Nav.Link>
                            <Nav.Link href="#link">Projects</Nav.Link>
                            <NavDropdown title="Teams" id="basic-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">Teams</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">
                                    Another action
                                </NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.4">
                                    Separated link
                                </NavDropdown.Item>
                            </NavDropdown>
                            <Nav.Link href="#" onClick={handleClick}>Create</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <ModalCreateIssue openModal={openModal} createIssueData={createIssueData} setOpenModal={setOpenModal} />
        </>
    )
}