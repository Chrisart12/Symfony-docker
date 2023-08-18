import React from 'react';
import ModalCreateIssue from "./modal/ModalCreateIssue";
import {Container, Form, Nav, Navbar} from "react-bootstrap";
import Select from "react-select";
import {visit} from "@hotwired/turbo";

export default function Header() {
    const [createIssueData, setCreateIssueData] = React.useState([]);
    const [openModal, setOpenModal] = React.useState(false);
    const [options, setOptions] = React.useState([]);

    let timeout;

    const openModalCreateIssue = async () => {
        await fetchCreateIssueData();
        setOpenModal(true);
    }

    const fetchCreateIssueData = async () => {
        const response = await fetch('/issues/create');
        const json = await response.json();
        setCreateIssueData(json);
    }

    const handleChange = (e) => {
        visit(e.value);
    }

    const handleInputChange = (inputValue) => {
        if ('' === inputValue) {
            return;
        }

        clearTimeout(timeout);

        timeout = setTimeout(() => {
            fetch(`/search?query=${inputValue}`)
                .then((response) => response.json())
                .then(json => {
                    setOptions(json);
                });
        }, 350);
    }

    return (
        <>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand className="fw-bold text-primary" href="/">TaskSphere</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbar" />
                    <Navbar.Collapse id="navbar">
                        <Nav className="me-auto">
                            <Nav.Link href="#home">Your work</Nav.Link>
                            <Nav.Link href="/projects">Projects</Nav.Link>
                            <Nav.Link href="/teams">Teams</Nav.Link>
                            <Nav.Link href="/issues">Issues</Nav.Link>
                            <Nav.Link href="#" onClick={openModalCreateIssue}>Create</Nav.Link>
                        </Nav>
                        <div className="d-flex" >
                            <Select
                                options={options}
                                onChange={handleChange}
                                onInputChange={handleInputChange}
                                placeholder="Search..."
                                styles={{control: (base) => ({ ...base, width: '300px' })}}
                            />
                        </div>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <ModalCreateIssue openModal={openModal} createIssueData={createIssueData} setOpenModal={setOpenModal} />
        </>
    )
}