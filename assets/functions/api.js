export function patch(resourceName, id, body) {
    return fetch(`/api/${resourceName}/${id}`, {
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/merge-patch+json'
        },
        method: 'PATCH'
    });
}