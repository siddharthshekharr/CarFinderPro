'use client';

import { useState, useEffect } from 'react';

export function useCarSearch(searchParams) {
    const [cars, setCars] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCars = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(`/api/cars?${searchParams.toString()}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch cars');
                }
                const data = await response.json();
                setCars(data);
            } catch (err) {
                setError(err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCars();
    }, [searchParams]);

    return { cars, isLoading, error };
}
