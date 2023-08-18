import Swal from "sweetalert2";
import {visit} from "@hotwired/turbo";

export function showCreateAttachmentAlert() {
    Swal.fire({
        icon: 'success',
        position: 'bottom-start',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        title: `Successfully attached`,
        toast: true
    }).then(() => {});
}

export function showCreatedIssueAlert(issueId) {
    Swal.fire({
        confirmButtonText: 'View issue',
        icon: 'success',
        position: 'bottom-start',
        showCloseButton: true,
        showConfirmButton: true,
        timer: 5000,
        timerProgressBar: true,
        title: `You've created "${issueId}" issue`,
        toast: true
    }).then((result) => {
        if (result.isConfirmed) {
            visit(`/issues/${issueId}`);
        }
    });
}

export function showConfirmationModalDeleteIssue() {
    return new Promise((resolve) => {
        Swal.fire({
            title: 'Delete this attachment?',
            text: "Once you delete, it's gone for good.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
        }).then((result) => {
            resolve(result);
        })
    })
}

export function showShareAlert() {
    Swal.fire({
        icon: 'success',
        position: 'bottom-start',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        title: 'Link copied to clipboard',
        toast: true
    }).then(() => {

    });
}