import React from "react";
import {Card} from "react-bootstrap";
import {isImage} from "../../../functions/image";
import {faTrash} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {fetchDelete} from "../../../functions/api";

export default function CardAttachment({ attachment, showMediaViewer }) {
    const formatDate = (date) => {
        return new Date(date).toLocaleDateString();
    }

    const deleteAttachment = (e) => {
        e.stopPropagation();

        fetchDelete('attachments', attachment.id)
            .then(() => {
                document.dispatchEvent(new CustomEvent('onDeleteAttachment', {
                    detail: attachment
                }));
            });
    }

    return (
        <Card className="card-attachment cursor-pointer h-100" key={attachment.id} onClick={() => showMediaViewer(attachment)}>
            <FontAwesomeIcon className="button-delete-attachment" icon={faTrash} onClick={deleteAttachment} />
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