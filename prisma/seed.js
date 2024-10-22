const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const cars = [
        {
            title: '2018 Honda Civic',
            make: 'Honda',
            model: 'Civic',
            year: 2018,
            price: 18500,
            mileage: 35000,
            image: 'https://example.com/honda-civic.jpg',
            description: 'Well-maintained Honda Civic with low mileage.',
        },
        {
            title: '2020 Toyota Camry',
            make: 'Toyota',
            model: 'Camry',
            year: 2020,
            price: 24000,
            mileage: 20000,
            image: 'https://example.com/toyota-camry.jpg',
            description: 'Like-new Toyota Camry with excellent fuel efficiency.',
        },
        // Add more sample cars here
    ];

    for (const car of cars) {
        await prisma.car.create({ data: car });
    }

    console.log('Seed data inserted successfully');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
