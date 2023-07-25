import React from 'react';
import {Navbar} from "flowbite-react";
import NavbarLink from "./NavbarLink";
import ModalCreateIssue from "./ModalCreateIssue";

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
            <Navbar className="sticky top-0 z-[60] bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between w-full mx-auto py-2.5 px-4">
                <div className="mx-auto flex flex-wrap justify-between items-center w-full">

                    <div className="flex items-center gap-3">
                        <a className="flex items-center gap-3 text-2xl font-semibold text-gray-900 dark:text-white" href="#">
                            <span>TaskSphere</span>
                        </a>
                    </div>

                    <div className="items-center gap-1 lg:flex">
                        <NavbarLink href="your-work" text="Your work" />
                        <NavbarLink href="/projects" text="Projects" />
                        <NavbarLink href="/people" text="Teams" />
                        <NavbarLink href="#" onClick={handleClick}  text="Create" />
                    </div>

                    <div className="flex items-center gap-1"></div>
                </div>
            </Navbar>
            <ModalCreateIssue openModal={openModal} createIssueData={createIssueData} setOpenModal={setOpenModal} />
        </>
    )
}