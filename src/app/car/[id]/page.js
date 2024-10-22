import { prisma } from '@/lib/prisma';

export default async function CarDetailsPage({ params }) {
    const car = await prisma.car.findUnique({
        where: { id: parseInt(params.id) },
    });

    if (!car) {
        return <div>Car not found</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">{car.title}</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <img src={car.image} alt={car.title} className="w-full h-auto rounded-lg" />
                <div>
                    <p className="text-2xl font-semibold mb-4">${car.price.toLocaleString()}</p>
                    <p className="mb-2"><strong>Year:</strong> {car.year}</p>
                    <p className="mb-2"><strong>Make:</strong> {car.make}</p>
                    <p className="mb-2"><strong>Model:</strong> {car.model}</p>
                    <p className="mb-2"><strong>Mileage:</strong> {car.mileage.toLocaleString()} miles</p>
                    <p className="mb-4">{car.description}</p>
                    <button className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600">
                        Contact Seller
                    </button>
                </div>
            </div>
        </div>
    );
}
