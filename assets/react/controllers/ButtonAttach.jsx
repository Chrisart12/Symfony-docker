import {Button} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPaperclip} from "@fortawesome/free-solid-svg-icons";
import React, {useRef} from "react";

export default function ButtonAttach({ issue, setIssue, issues = null, setIssues = null }) {
    const inputFile = useRef(null);

    /**
     * @param {Event<HTMLInputElement>} e
     */
    const handleChange = (e) => {
        /** @type {FileList}*/
        const files = e.target.files;

        if (0 === files.length) {
            return;
        }

        const formData = new FormData();
        formData.append('attachment', files[0]);

        fetch(`/issues/${issue.id}/attachments`, {
            body: formData,
            method: 'POST'
        }).then(response => response.json())
            .then(issue => {
                setIssue(issue);

                if (issues && setIssues) {
                    setIssues(issues.map((currentIssue) => {
                        if (currentIssue.id === issue.id) {
                            return issue;
                        }
                        return currentIssue;
                    }));
                }
            });
    }

    const handleClick = () => {
        inputFile.current.click();
    }

    return (
        <>
            <Button onClick={handleClick} size="sm">
                <FontAwesomeIcon icon={faPaperclip} />&nbsp;Attach
            </Button>
            <input className="d-none" type="file" ref={inputFile} onChange={handleChange} />
        </>
    )
}