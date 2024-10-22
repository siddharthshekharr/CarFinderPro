'use client';

import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useState } from 'react';

export default function Home() {
    const [mileage, setMileage] = useState([100000]);
    const [price, setPrice] = useState([50000]);

    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
            <Header />
            <main className="flex-grow">
                <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-32 px-4">
                    <div className="container mx-auto max-w-6xl">
                        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-center leading-tight">Find Your Dream Car</h1>
                        <p className="text-xl md:text-2xl mb-12 text-center text-blue-100">Discover millions of cars to find the perfect match for you</p>
                        <Card className="bg-white/95 backdrop-blur-md shadow-2xl">
                            <CardContent className="p-6 md:p-8">
                                <Tabs defaultValue="search" className="w-full">
                                    <TabsList className="grid w-full grid-cols-2 mb-8">
                                        <TabsTrigger value="search" className="text-lg">Advanced Search</TabsTrigger>
                                        <TabsTrigger value="budget" className="text-lg">Search by Budget</TabsTrigger>
                                    </TabsList>
                                    <TabsContent value="search">
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                            <Select>
                                                <SelectTrigger className="bg-gray-50">
                                                    <SelectValue placeholder="Make" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="honda">Honda</SelectItem>
                                                    <SelectItem value="toyota">Toyota</SelectItem>
                                                    <SelectItem value="ford">Ford</SelectItem>
                                                    <SelectItem value="chevrolet">Chevrolet</SelectItem>
                                                    <SelectItem value="bmw">BMW</SelectItem>
                                                    <SelectItem value="mercedes">Mercedes-Benz</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <Select>
                                                <SelectTrigger className="bg-gray-50">
                                                    <SelectValue placeholder="Model" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="civic">Civic</SelectItem>
                                                    <SelectItem value="camry">Camry</SelectItem>
                                                    <SelectItem value="f150">F-150</SelectItem>
                                                    <SelectItem value="silverado">Silverado</SelectItem>
                                                    <SelectItem value="3series">3 Series</SelectItem>
                                                    <SelectItem value="cclass">C-Class</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <Select>
                                                <SelectTrigger className="bg-gray-50">
                                                    <SelectValue placeholder="Body Type" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="sedan">Sedan</SelectItem>
                                                    <SelectItem value="suv">SUV</SelectItem>
                                                    <SelectItem value="truck">Truck</SelectItem>
                                                    <SelectItem value="coupe">Coupe</SelectItem>
                                                    <SelectItem value="hatchback">Hatchback</SelectItem>
                                                    <SelectItem value="convertible">Convertible</SelectItem>
                                                    <SelectItem value="wagon">Wagon</SelectItem>
                                                    <SelectItem value="van">Van</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <div className="flex gap-4">
                                                <Select className="w-1/2">
                                                    <SelectTrigger className="bg-gray-50">
                                                        <SelectValue placeholder="Min Year" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {[...Array(30)].map((_, i) => (
                                                            <SelectItem key={i} value={`${2023 - i}`}>
                                                                {2023 - i}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                                <Select className="w-1/2">
                                                    <SelectTrigger className="bg-gray-50">
                                                        <SelectValue placeholder="Max Year" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {[...Array(30)].map((_, i) => (
                                                            <SelectItem key={i} value={`${2023 - i}`}>
                                                                {2023 - i}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <Select>
                                                <SelectTrigger className="bg-gray-50">
                                                    <SelectValue placeholder="Transmission" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="automatic">Automatic</SelectItem>
                                                    <SelectItem value="manual">Manual</SelectItem>
                                                    <SelectItem value="cvt">CVT</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <Select>
                                                <SelectTrigger className="bg-gray-50">
                                                    <SelectValue placeholder="Fuel Type" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="gasoline">Gasoline</SelectItem>
                                                    <SelectItem value="diesel">Diesel</SelectItem>
                                                    <SelectItem value="electric">Electric</SelectItem>
                                                    <SelectItem value="hybrid">Hybrid</SelectItem>
                                                    <SelectItem value="plugin_hybrid">Plug-in Hybrid</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <div className="col-span-3">
                                                <label className="block text-sm font-medium mb-2 text-gray-700">
                                                    Mileage (up to {mileage.toLocaleString()} miles)
                                                </label>
                                                <Slider
                                                    defaultValue={[100000]}
                                                    max={300000}
                                                    step={5000}
                                                    onValueChange={(value) => setMileage(value[0])}
                                                    className="mb-6"
                                                />
                                            </div>
                                            <div className="col-span-3">
                                                <label className="block text-sm font-medium mb-2 text-gray-700">
                                                    Price (up to ${price.toLocaleString()})
                                                </label>
                                                <Slider
                                                    defaultValue={[50000]}
                                                    max={200000}
                                                    step={1000}
                                                    onValueChange={(value) => setPrice(value[0])}
                                                    className="mb-6"
                                                />
                                            </div>
                                            <Select>
                                                <SelectTrigger className="bg-gray-50">
                                                    <SelectValue placeholder="Exterior Color" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="black">Black</SelectItem>
                                                    <SelectItem value="white">White</SelectItem>
                                                    <SelectItem value="silver">Silver</SelectItem>
                                                    <SelectItem value="red">Red</SelectItem>
                                                    <SelectItem value="blue">Blue</SelectItem>
                                                    <SelectItem value="gray">Gray</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <Select>
                                                <SelectTrigger className="bg-gray-50">
                                                    <SelectValue placeholder="Interior Color" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="black">Black</SelectItem>
                                                    <SelectItem value="gray">Gray</SelectItem>
                                                    <SelectItem value="beige">Beige</SelectItem>
                                                    <SelectItem value="brown">Brown</SelectItem>
                                                    <SelectItem value="tan">Tan</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <Input type="text" placeholder="ZIP Code" className="bg-gray-50" />
                                        </div>
                                        <Button className="w-full mt-6 bg-yellow-400 hover:bg-yellow-500 text-blue-800 text-lg py-6">Search Cars</Button>
                                    </TabsContent>
                                    <TabsContent value="budget">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <Select>
                                                <SelectTrigger className="bg-gray-50">
                                                    <SelectValue placeholder="Min Price" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="5000">$5,000</SelectItem>
                                                    <SelectItem value="10000">$10,000</SelectItem>
                                                    <SelectItem value="15000">$15,000</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <Select>
                                                <SelectTrigger className="bg-gray-50">
                                                    <SelectValue placeholder="Max Price" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="20000">$20,000</SelectItem>
                                                    <SelectItem value="30000">$30,000</SelectItem>
                                                    <SelectItem value="40000">$40,000</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <Input type="text" placeholder="ZIP Code" className="bg-gray-50" />
                                        </div>
                                        <Button className="w-full mt-6 bg-yellow-400 hover:bg-yellow-500 text-blue-800 text-lg py-6">Search by Budget</Button>
                                    </TabsContent>
                                </Tabs>
                            </CardContent>
                        </Card>
                    </div>
                </section>

                <section className="py-24 px-4">
                    <div className="container mx-auto max-w-6xl">
                        <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center text-gray-800">Explore by Category</h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                            {['Used Pickups', 'Used SUVs', 'Used Convertibles', 'Used Hybrid Cars', 'Used Electric Cars',
                                'Used Coupes', 'Used Hatchbacks', 'Used Sedans', 'Used Wagons', 'Used Minivans'].map((type) => (
                                    <Card key={type} className="text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                                        <CardContent className="p-6">
                                            <CardTitle className="font-semibold text-gray-700 text-lg">{type}</CardTitle>
                                        </CardContent>
                                    </Card>
                                ))}
                        </div>
                    </div>
                </section>

                <section className="py-24 px-4 bg-blue-50">
                    <div className="container mx-auto max-w-6xl">
                        <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center text-gray-800">Shop by Price Range</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            {['$1,000 - $5,000', '$5,000 - $10,000', '$10,000 - $15,000', '$15,000 - $20,000',
                                '$20,000 - $25,000', '$25,000 - $30,000', '$30,000 - $40,000', '$40,000+'].map((price) => (
                                    <Button key={price} variant="outline" className="text-lg py-8 bg-yellow-400 hover:bg-yellow-500 text-blue-800 border-yellow-500 shadow-md hover:shadow-lg transition-all duration-300">
                                        {price}
                                    </Button>
                                ))}
                        </div>
                    </div>
                </section>

                <section className="py-24 px-4">
                    <div className="container mx-auto max-w-6xl">
                        <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center text-gray-800">Popular Models</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {[
                                { name: 'Honda CR-V', description: 'Versatile compact SUV with excellent fuel economy.' },
                                { name: 'Tesla Model 3', description: 'High-tech electric car with impressive range.' },
                                { name: 'Ford F-150', description: 'America\'s best-selling pickup for decades.' },
                                { name: 'Toyota Camry', description: 'Reliable mid-size sedan with a comfortable ride.' }
                            ].map((car) => (
                                <Card key={car.name} className="hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                                    <CardHeader>
                                        <CardTitle className="text-2xl font-bold">{car.name}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <CardDescription className="mb-6 text-gray-600">{car.description}</CardDescription>
                                        <Button asChild className="w-full bg-yellow-400 hover:bg-yellow-500 text-blue-800">
                                            <Link href={`/cars?model=${car.name.toLowerCase().replace(' ', '-')}`}>View Listings</Link>
                                        </Button>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="py-24 px-4 bg-gradient-to-r from-blue-100 to-indigo-100">
                    <div className="container mx-auto max-w-4xl">
                        <h2 className="text-3xl md:text-5xl font-bold mb-4 text-center text-gray-800">Why Choose Us?</h2>
                        <p className="text-xl md:text-2xl text-center mb-12 text-gray-600">Experience the CarFinder advantage</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <Card className="bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
                                <CardHeader>
                                    <CardTitle className="flex items-center text-2xl text-blue-800">
                                        <svg className="h-8 w-8 mr-3 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        Comprehensive Reports
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-gray-600">Get a full vehicle history report with every listing, including accident history and service records.</p>
                                </CardContent>
                            </Card>
                            <Card className="bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
                                <CardHeader>
                                    <CardTitle className="flex items-center text-2xl text-blue-800">
                                        <svg className="h-8 w-8 mr-3 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        Time-Saving Search
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-gray-600">Our advanced filters help you quickly find cars that match your exact criteria, saving you time and effort.</p>
                                </CardContent>
                            </Card>
                            <Card className="bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
                                <CardHeader>
                                    <CardTitle className="flex items-center text-2xl text-blue-800">
                                        <svg className="h-8 w-8 mr-3 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                        </svg>
                                        Verified Listings
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-gray-600">All our listings are verified for accuracy, including mileage and vehicle condition, ensuring you get what you expect.</p>
                                </CardContent>
                            </Card>
                            <Card className="bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
                                <CardHeader>
                                    <CardTitle className="flex items-center text-2xl text-blue-800">
                                        <svg className="h-8 w-8 mr-3 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                                        </svg>
                                        Expert Support
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-gray-600">Our team of car experts is always ready to assist you with any questions or concerns throughout your car-buying journey.</p>
                                </CardContent>
                            </Card>
                        </div>
                        <div className="mt-12 text-center">
                            <Button className="bg-blue-600 hover:bg-blue-700 text-white text-lg py-4 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
                                Start Your Car Search
                            </Button>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
