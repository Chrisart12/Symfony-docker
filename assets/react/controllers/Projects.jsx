import React from "react";
import {Table} from "flowbite-react";

export default function Projects({ projects }) {
     const [projectsList, setProjectsList] = React.useState(JSON.parse(projects));

    return (
        <div className="container mx-auto mt-6">
            <Table hoverable>
                <Table.Head>
                    <Table.HeadCell>Name</Table.HeadCell>
                    <Table.HeadCell>Key</Table.HeadCell>
                    <Table.HeadCell>Lead</Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                    {projectsList.map((project) => (
                        <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800" key={project.id}>
                            <Table.Cell>{project.name}</Table.Cell>
                            <Table.Cell>{project.key}</Table.Cell>
                            <Table.Cell>{project.lead.email}</Table.Cell>
                        </Table.Row>
                    ))}

                </Table.Body>
            </Table>
        </div>

    );
}