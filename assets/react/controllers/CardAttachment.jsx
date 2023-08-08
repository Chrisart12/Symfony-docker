import React from "react";
import {Card} from "react-bootstrap";

export default function CardAttachment({ attachment, showMediaViewer }) {
    return (
        <Card className="cursor-pointer" key={attachment.id} onClick={() => showMediaViewer(attachment)}>
            <Card.Img className="object-fit-cover" height={96} src={attachment.path} variant="top" width={96} />
            <Card.Body className="text-center p-2">
                <small>{attachment.originalName}</small>
            </Card.Body>
            <Card.Footer className="text-center">
                <small>{attachment.createdAt}</small>
            </Card.Footer>
        </Card>
    )
}