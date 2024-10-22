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
                    <div className="container mx-auto max-w-5xl">
                        <h2 className="text-3xl md:text-5xl font-bold mb-4 text-center text-gray-800">Why Choose Us?</h2>
                        <p className="text-xl md:text-2xl text-center mb-12 text-gray-600">Every vehicle comes with a comprehensive history report</p>
                        <Card className="p-8 md:p-12 shadow-2xl">
                            <CardContent className="flex flex-col md:flex-row items-center">
                                <div className="md:w-1/3 mb-8 md:mb-0 md:mr-12">
                                    <Badge className="text-6xl p-8 bg-blue-600 text-white">CFP</Badge>
                                </div>
                                <div className="md:w-2/3">
                                    <CardTitle className="text-3xl font-bold mb-8 text-blue-800">The CarFinder Pro Advantage</CardTitle>
                                    <ul className="space-y-6 text-lg text-gray-700">
                                        <li className="flex items-center">
                                            <Badge variant="secondary" className="mr-4 p-1">✓</Badge>
                                            Full vehicle history report with every listing
                                        </li>
                                        <li className="flex items-center">
                                            <Badge variant="secondary" className="mr-4 p-1">✓</Badge>
                                            Quickly identify cars with no reported accidents
                                        </li>
                                        <li className="flex items-center">
                                            <Badge variant="secondary" className="mr-4 p-1">✓</Badge>
                                            Review detailed service records
                                        </li>
                                        <li className="flex items-center">
                                            <Badge variant="secondary" className="mr-4 p-1">✓</Badge>
                                            Find cars with a single owner
                                        </li>
                                    </ul>
                                    <Button className="mt-10 bg-yellow-400 hover:bg-yellow-500 text-blue-800 text-lg py-6 px-8">Learn More About CarFinder Pro Reports</Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
