import { Suspense } from 'react';
import CarList from '@/components/CarList';
import FilterSidebar from '@/components/FilterSidebar';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function CarsPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-6">Cars for Sale</h1>
                <div className="flex flex-col md:flex-row gap-8">
                    <aside className="w-full md:w-1/4">
                        <FilterSidebar />
                    </aside>
                    <div className="w-full md:w-3/4">
                        <Suspense fallback={<div>Loading...</div>}>
                            <CarList />
                        </Suspense>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
