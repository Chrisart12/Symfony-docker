import React, {useEffect} from "react";
import {Image} from "react-bootstrap";
import {isImage} from "../../functions/image";

export default function MediaViewer({attachmentPath, openMediaViewer, setOpenMediaViewer}) {
    const closeMediaViewer = () => {
        setOpenMediaViewer(false);
    }

    useEffect(() => {
        console.log(openMediaViewer);
        if (undefined !== attachmentPath && !isImage(attachmentPath) && openMediaViewer) {
            window.open(attachmentPath, '_blank');
            setOpenMediaViewer(false);
        }
    }, [openMediaViewer]);

    return (
        <div className={`media-viewer-popup ${(isImage(attachmentPath) && openMediaViewer) ? 'd-block' : 'd-none'}`}>
            <div className="media-viewer-image-content" onClick={closeMediaViewer}>
                <div className="image-viewer-slider">
                    <Image className="image-viewer-wrapper-image" src={attachmentPath} />
                </div>
            </div>
        </div>
    )
}