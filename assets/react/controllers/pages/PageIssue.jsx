import React from "react";
import { Container, Row} from "react-bootstrap";
import Issue from "../issue/Issue";

export default function PageIssue({ id, issueTypes, projectId }) {
    return (
        <Container className="mt-5">
            <Row>
                <Issue
                    id={id}
                    issueTypes={issueTypes}
                    projectId={projectId}
                    size="md"
                />
            </Row>
        </Container>
    )
}