import Swal from "sweetalert2";

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
            window.location.href = `/issues/${issueId}`;
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