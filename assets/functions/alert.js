import Swal from "sweetalert2";

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