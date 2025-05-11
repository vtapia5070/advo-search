import { useState, useEffect, useCallback } from 'react';
import { Advocate } from '@/types/advocate';

export function useFetchAdvocates(searchTerm: string) {
    const [advocates, setAdvocates] = useState<Advocate[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchAdvocates = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        const url = searchTerm
            ? `/api/advocates?q=${encodeURIComponent(searchTerm)}`
            : '/api/advocates';

        const response = await fetch(url);
        if (!response.ok) {
            setError('Failed to fetch advocates');
            setIsLoading(false);
            throw new Error('Failed to fetch advocates');
        }
        const { data } = await response.json();
        setIsLoading(false);
        setAdvocates(data);
    }, [searchTerm]);

    useEffect(() => {
        fetchAdvocates();
    }, [fetchAdvocates]);

    return {
        advocates,
        isLoading,
        error,
        fetchAdvocates,
    };
}
