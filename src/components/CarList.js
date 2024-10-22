'use client';

import { useSearchParams } from 'next/navigation';
import { useCarSearch } from '@/hooks/useCarSearch';
import Link from 'next/link';

export default function CarList() {
    const searchParams = useSearchParams();
    const { cars, isLoading, error } = useCarSearch(searchParams);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cars.map((car) => (
                <Link href={`/car/${car.id}`} key={car.id} className="border rounded-lg p-4 hover:shadow-lg transition">
                    <img src={car.image} alt={car.title} className="w-full h-48 object-cover mb-4 rounded" />
                    <h2 className="text-xl font-semibold mb-2">{car.title}</h2>
                    <p className="text-gray-600 mb-2">${car.price.toLocaleString()}</p>
                    <p className="text-sm text-gray-500">{car.mileage.toLocaleString()} miles</p>
                </Link>
            ))}
        </div>
    );
}
