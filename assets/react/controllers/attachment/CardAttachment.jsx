import React from "react";
import {Card} from "react-bootstrap";
import {isImage} from "../../../functions/image";
import {faTrash} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export default function CardAttachment({ attachment, showMediaViewer }) {
    const formatDate = (date) => {
        return new Date(date).toLocaleDateString();
    }

    return (
        <Card className="cursor-pointer h-100" key={attachment.id} onClick={() => showMediaViewer(attachment)}>
            <FontAwesomeIcon style={{ position: 'absolute', right: 5, top: 5 }} icon={faTrash} />
            {isImage(attachment.originalName)
                ? <Card.Img className="object-fit-cover" height={96} src={attachment.path} variant="top" width={96} />
                : <></>
            }
            <Card.Body className="text-center p-2">
                <small>{attachment.originalName}</small>
            </Card.Body>
            <Card.Footer className="text-center">
                <small>{formatDate(attachment.createdAt)}</small>
            </Card.Footer>
        </Card>
    )
}