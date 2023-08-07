/**
 * @param {1 | 2 | 3 | 4 | 5} issueStatusId
 */
export function getIssueStatusLabel(issueStatusId) {
    switch (issueStatusId) {
        case 1:
            return 'New';
        case 2:
            return 'Ready';
        case 3:
            return 'In development';
        case 4:
            return 'In review';
        case 5:
            return 'Resolved';
        default:
            return 'Unknown';
    }
}

/**
 * @param {1 | 2 | 3 | 4 | 5} issueTypeId
 */
export function getIssueTypeLabel(issueTypeId) {
    switch (issueTypeId) {
        case 1:
            return 'Bug';
        case 2:
            return 'Feature';
        case 3:
            return 'Story';
        case 4:
            return 'Task';
        case 5:
            return 'Epic';
        default:
            return 'Unknown';
    }
}