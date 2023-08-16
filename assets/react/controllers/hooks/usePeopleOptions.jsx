import { useState, useEffect } from 'react';

export default function usePeopleOptions(projectId) {
    const [options, setOptions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`/api/projects/${projectId}/people`);
                const json = await response.json();

                const data = json.people.map(person => ({
                    value: person['id'],
                    label: `${person['firstName']} ${person['lastName']}`
                }));

                setOptions(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [projectId]);

    return { options, loading };
}