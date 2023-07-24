import React from 'react';
import {Button, Label, Modal, Navbar, Select, TextInput} from "flowbite-react";

export default function Header() {
    const [openModal, setOpenModal] = React.useState('');

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
                        <a
                            className="rounded-lg p-2.5 text-sm font-medium text-gray-900 hover:text-cyan-700 dark:text-gray-300 dark:hover:text-cyan-500"
                            href="/">Your work</a>
                        <a
                            className="rounded-lg p-2.5 text-sm font-medium text-gray-900 hover:text-cyan-700 dark:text-gray-300 dark:hover:text-cyan-500"
                            href="/docs/getting-started/introduction">
                            Projects
                        </a>
                        <a href="/docs/getting-started/quickstart"
                           className="rounded-lg p-2.5 text-sm font-medium text-gray-900 hover:text-cyan-700 dark:text-gray-300 dark:hover:text-cyan-500">
                            Teams
                        </a>
                        <button className="rounded-lg p-2.5 text-sm font-medium text-gray-900 hover:text-cyan-700 dark:text-gray-300 dark:hover:text-cyan-500"
                                data-modal-target="createIssueModal"
                                onClick={() => setOpenModal('default')}>
                            Create
                        </button>
                    </div>
                    <div className="flex items-center gap-1"></div>
                </div>
            </Navbar>
            <Modal show={openModal === 'default'} onClose={() => setOpenModal('')}>
                <Modal.Header>Create issue</Modal.Header>
                <Modal.Body>
                    <div className="space-y-6">

                        <div className="mb-4 block">
                            <Label htmlFor="project" value="Project" />
                            <Select id="project">
                                <option>Project</option>
                            </Select>
                        </div>

                        <div className="mb-4 block">
                            <Label htmlFor="issueType" value="Issue type" />
                            <Select id="project">
                                <option>Bug</option>
                            </Select>
                        </div>

                        <div className="mb-4 block">
                            <Label htmlFor="status" value="Status" />
                            <Select id="status">
                                <option>New</option>
                            </Select>
                        </div>

                        <div className="mb-4 block">
                            <Label htmlFor="summary" value="Summary" />
                            <TextInput id="summary" required />
                        </div>

                        <div className="mb-4 block">
                            <Label htmlFor="assignee" value="Assignee" />
                            <Select id="assignee">
                                <option>Pentiminax</option>
                            </Select>
                        </div>

                        <div className="mb-4 block">
                            <Label htmlFor="reporter" value="Reporter" />
                            <Select id="reporter">
                                <option>Pentiminax</option>
                            </Select>
                        </div>

                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button color="gray" onClick={() => setOpenModal('')}>Cancel</Button>
                    <Button onClick={() => setOpenModal('')}>Create</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}