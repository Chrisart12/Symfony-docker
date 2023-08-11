/**
 * @param {string} resourceName
 * @param {string | number} id
 * @return {Promise<Response>}
 */
export function fetchDelete(resourceName, id) {
    return fetch(`/api/${resourceName}/${id}`, {
        headers: {
            'Accept': 'application/ld+json',
            'Content-Type': 'application/merge-patch+json'
        },
        method: 'DELETE'
    });
}

/**
 * @param {string} resourceName
 * @param {string | number} id
 * @param body
 * @return {Promise<Response>}
 */
export function fetchPatch(resourceName, id, body) {
    return fetch(`/api/${resourceName}/${id}`, {
        body: JSON.stringify(body),
        headers: {
            'Accept': 'application/ld+json',
            'Content-Type': 'application/merge-patch+json'
        },
        method: 'PATCH'
    });
}