import React from "react";
import {Image} from "react-bootstrap";

export default function MediaViewer({imageSrc, openMediaViewer, setOpenMediaViewer}) {
    const closeMediaViewer = () => {
        setOpenMediaViewer(false);
    }

    return (
        <div className={`media-viewer-popup ${openMediaViewer ? 'd-block' : 'd-none'}`}>
            <div className="media-viewer-image-content" onClick={closeMediaViewer}>
                <div className="image-viewer-slider">
                    <Image className="image-viewer-wrapper-image" src={imageSrc} />
                </div>
            </div>
        </div>
    )
}