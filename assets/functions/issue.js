/**
 * @param {Array<any>} issues
 * @param setIssues
 * @param updatedIssue
 */
export function updateIssuesState(issues, setIssues, updatedIssue) {
    if (issues && setIssues) {
        setIssues(prevIssues => prevIssues.map(currentIssue =>
            currentIssue.id === updatedIssue.id ? updatedIssue : currentIssue
        ));
    }
}