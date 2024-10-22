'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useState } from 'react';

export default function FilterSidebar() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [filters, setFilters] = useState({
        make: searchParams.get('make') || '',
        model: searchParams.get('model') || '',
        minPrice: searchParams.get('minPrice') || '',
        maxPrice: searchParams.get('maxPrice') || '',
        minYear: searchParams.get('minYear') || '',
        maxYear: searchParams.get('maxYear') || '',
    });

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters((prev) => ({ ...prev, [name]: value }));
    };

    const applyFilters = () => {
        const params = new URLSearchParams();
        Object.entries(filters).forEach(([key, value]) => {
            if (value) params.append(key, value);
        });
        router.push(`/cars?${params.toString()}`);
    };

    return (
        <div className="w-full md:w-64 mb-6 md:mb-0 md:mr-6">
            <h2 className="text-xl font-semibold mb-4">Filters</h2>
            <div className="space-y-4">
                <input
                    type="text"
                    name="make"
                    placeholder="Make"
                    value={filters.make}
                    onChange={handleFilterChange}
                    className="w-full p-2 border rounded"
                />
                <input
                    type="text"
                    name="model"
                    placeholder="Model"
                    value={filters.model}
                    onChange={handleFilterChange}
                    className="w-full p-2 border rounded"
                />
                <input
                    type="number"
                    name="minPrice"
                    placeholder="Min Price"
                    value={filters.minPrice}
                    onChange={handleFilterChange}
                    className="w-full p-2 border rounded"
                />
                <input
                    type="number"
                    name="maxPrice"
                    placeholder="Max Price"
                    value={filters.maxPrice}
                    onChange={handleFilterChange}
                    className="w-full p-2 border rounded"
                />
                <input
                    type="number"
                    name="minYear"
                    placeholder="Min Year"
                    value={filters.minYear}
                    onChange={handleFilterChange}
                    className="w-full p-2 border rounded"
                />
                <input
                    type="number"
                    name="maxYear"
                    placeholder="Max Year"
                    value={filters.maxYear}
                    onChange={handleFilterChange}
                    className="w-full p-2 border rounded"
                />
                <button
                    onClick={applyFilters}
                    className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                >
                    Apply Filters
                </button>
            </div>
        </div>
    );
}
