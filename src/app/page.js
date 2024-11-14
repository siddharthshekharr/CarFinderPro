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
import { useState, useEffect } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { Download } from 'lucide-react'; // Import the Download icon
import { Checkbox } from "@/components/ui/checkbox";

const commonFeatures = {
    safety: [
        "ABS",
        "Front Collision Warning",
        "Lane Departure Warning",
        "Blind Spot Detection",
        "Backup Camera",
        "Airbags",
        "Traction Control",
        "Stability Control",
        "Parking Sensors",
        "Night Vision"
    ],
    comfort: [
        "Adaptive Cruise Control",
        "Day Running Lights",
        "Keyless Entry",
        "Power Windows",
        "Climate Control",
        "Heated Seats",
        "Ventilated Seats",
        "Sunroof",
        "Power Seats",
        "Navigation System"
    ],
    performance: [
        "Turbo Charged",
        "Sport Mode",
        "Paddle Shifters",
        "Launch Control",
        "Performance Tires"
    ],
    technology: [
        "Bluetooth",
        "Apple CarPlay",
        "Android Auto",
        "Wireless Charging",
        "Premium Sound System",
        "Head-Up Display",
        "Digital Dashboard"
    ]
};

export default function Home() {
    const [mileage, setMileage] = useState(100000);
    const [price, setPrice] = useState(50000);
    const [uiOptions, setUiOptions] = useState(null);
    const [selectedMake, setSelectedMake] = useState('');
    const [models, setModels] = useState([]);
    const [formData, setFormData] = useState({
        make: '',
        model: '',
        bodyType: '',
        minYear: '',
        maxYear: '',
        transmission: '',
        fuelType: '',
        mileage: 100000,
        price: 50000,
        driveType: '',
        seatingCapacity: '',
        engineSize: '',
        horsepower: '',
        mpgCity: '',
        mpgHighway: '',
        color: '',
        interiorColor: '',
        warranty: '',
        zipCode: ''
    });
    const [selectedFeatures, setSelectedFeatures] = useState({
        safety: [],
        comfort: [],
        performance: [],
        technology: []
    });

    useEffect(() => {
        fetch('/car_database.json')
            .then(response => response.json())
            .then(data => {
                setUiOptions(data.ui_options);
            })
            .catch(error => console.error('Error loading car database:', error));
    }, []);

    useEffect(() => {
        if (selectedMake && uiOptions) {
            setModels(uiOptions.models_by_make[selectedMake] || []);
        }
    }, [selectedMake, uiOptions]);

    const handleInputChange = (name, value) => {
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
        if (name === 'make') {
            setSelectedMake(value);
        }
    };

    const handleSubmit = async () => {
        const dataToSubmit = {
            ...formData,
            safetyFeatures: selectedFeatures.safety.join('|'),
            comfortFeatures: selectedFeatures.comfort.join('|'),
            performanceFeatures: selectedFeatures.performance.join('|'),
            technologyFeatures: selectedFeatures.technology.join('|')
        };

        try {
            const response = await fetch('/api/saveSearch', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataToSubmit),
            });

            if (!response.ok) {
                throw new Error('Failed to save search data');
            }

            const result = await response.json();
            console.log(result.message);
            toast.success('Search data saved successfully!', {
                duration: 3000,
                position: 'top-center',
            });
        } catch (error) {
            console.error('Error:', error);
            toast.error('Failed to save search data. Please try again.', {
                duration: 3000,
                position: 'top-center',
            });
        }
    };

    const handleDownload = async () => {
        try {
            const response = await fetch('/api/downloadSearches');
            if (!response.ok) throw new Error('Download failed');

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = 'searches.csv';
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            toast.success('CSV file downloaded successfully!');
        } catch (error) {
            console.error('Error downloading CSV:', error);
            toast.error('Failed to download CSV file. Please try again.');
        }
    };

    if (!uiOptions) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
            <Toaster />
            <Header />
            <main className="flex-grow">
                <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16 md:py-32 px-4">
                    <div className="container mx-auto max-w-6xl">
                        <h1 className="text-3xl md:text-6xl font-bold mb-4 md:mb-6 text-center leading-tight">Find Your Dream Car</h1>
                        <p className="text-lg md:text-2xl mb-8 md:mb-12 text-center text-blue-100">Discover millions of cars to find the perfect match for you</p>
                        <Card className="bg-white/95 backdrop-blur-md shadow-2xl">
                            <CardContent className="p-4 md:p-8">
                                <Tabs defaultValue="search" className="w-full">
                                    <TabsList className="grid w-full grid-cols-2 mb-6 md:mb-8">
                                        <TabsTrigger value="search" className="text-base md:text-lg">Advanced Search</TabsTrigger>
                                        <TabsTrigger value="budget" className="text-base md:text-lg">Search by Budget</TabsTrigger>
                                    </TabsList>
                                    <TabsContent value="search">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                                            <Select onValueChange={(value) => handleInputChange('make', value)}>
                                                <SelectTrigger className="bg-gray-50">
                                                    <SelectValue placeholder="Make" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {uiOptions.makes.map(make => (
                                                        <SelectItem key={make} value={make}>{make}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <Select onValueChange={(value) => handleInputChange('model', value)}>
                                                <SelectTrigger className="bg-gray-50">
                                                    <SelectValue placeholder="Model" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {models.map(model => (
                                                        <SelectItem key={model} value={model}>{model}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <Select onValueChange={(value) => handleInputChange('bodyType', value)}>
                                                <SelectTrigger className="bg-gray-50">
                                                    <SelectValue placeholder="Body Type" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {uiOptions.body_types.map(type => (
                                                        <SelectItem key={type} value={type}>{type}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <div className="grid grid-cols-2 gap-2 sm:gap-4">
                                                <Select onValueChange={(value) => handleInputChange('minYear', value)}>
                                                    <SelectTrigger className="bg-gray-50">
                                                        <SelectValue placeholder="Min Year" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {uiOptions.years.map(year => (
                                                            <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                                <Select onValueChange={(value) => handleInputChange('maxYear', value)}>
                                                    <SelectTrigger className="bg-gray-50">
                                                        <SelectValue placeholder="Max Year" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {uiOptions.years.map(year => (
                                                            <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <Select onValueChange={(value) => handleInputChange('transmission', value)}>
                                                <SelectTrigger className="bg-gray-50">
                                                    <SelectValue placeholder="Transmission" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {uiOptions.transmission_types.map(type => (
                                                        <SelectItem key={type} value={type}>{type}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <Select onValueChange={(value) => handleInputChange('fuelType', value)}>
                                                <SelectTrigger className="bg-gray-50">
                                                    <SelectValue placeholder="Fuel Type" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {uiOptions.fuel_types.map(type => (
                                                        <SelectItem key={type} value={type}>{type}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <div className="col-span-full">
                                                <label className="block text-sm font-medium mb-2 text-gray-700">
                                                    Mileage (up to {mileage.toLocaleString()} miles)
                                                </label>
                                                <Slider
                                                    defaultValue={[100000]}
                                                    max={300000}
                                                    step={5000}
                                                    onValueChange={(value) => {
                                                        setMileage(value[0]);
                                                        handleInputChange('mileage', value[0]);
                                                    }}
                                                    className="mb-6"
                                                />
                                            </div>
                                            <div className="col-span-full">
                                                <label className="block text-sm font-medium mb-2 text-gray-700">
                                                    Price (up to ${price.toLocaleString()})
                                                </label>
                                                <Slider
                                                    defaultValue={[50000]}
                                                    max={200000}
                                                    step={1000}
                                                    onValueChange={(value) => {
                                                        setPrice(value[0]);
                                                        handleInputChange('price', value[0]);
                                                    }}
                                                    className="mb-6"
                                                />
                                            </div>
                                            <Select onValueChange={(value) => handleInputChange('driveType', value)}>
                                                <SelectTrigger className="bg-gray-50">
                                                    <SelectValue placeholder="Drive Type" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {uiOptions.drive_types.map(type => (
                                                        <SelectItem key={type} value={type}>{type}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <Select onValueChange={(value) => handleInputChange('seatingCapacity', value)}>
                                                <SelectTrigger className="bg-gray-50">
                                                    <SelectValue placeholder="Seating Capacity" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {uiOptions.seating_capacity.map(capacity => (
                                                        <SelectItem key={capacity} value={capacity.toString()}>{capacity}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <Input
                                                type="text"
                                                placeholder="ZIP Code"
                                                className="bg-gray-50"
                                                onChange={(e) => handleInputChange('zipCode', e.target.value)}
                                            />
                                            <div className="col-span-full mt-6">
                                                <h3 className="text-lg font-semibold mb-4 text-gray-700">Safety Features</h3>
                                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                                    {commonFeatures.safety.map(feature => (
                                                        <div key={feature} className="flex items-center space-x-2">
                                                            <Checkbox
                                                                id={feature}
                                                                checked={selectedFeatures.safety.includes(feature)}
                                                                onCheckedChange={(checked) => {
                                                                    setSelectedFeatures(prev => ({
                                                                        ...prev,
                                                                        safety: checked
                                                                            ? [...prev.safety, feature]
                                                                            : prev.safety.filter(f => f !== feature)
                                                                    }));
                                                                }}
                                                            />
                                                            <label htmlFor={feature} className="text-sm text-gray-600">
                                                                {feature}
                                                            </label>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="col-span-full mt-6">
                                                <h3 className="text-lg font-semibold mb-4 text-gray-700">Comfort Features</h3>
                                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                                    {commonFeatures.comfort.map(feature => (
                                                        <div key={feature} className="flex items-center space-x-2">
                                                            <Checkbox
                                                                id={feature}
                                                                checked={selectedFeatures.comfort.includes(feature)}
                                                                onCheckedChange={(checked) => {
                                                                    setSelectedFeatures(prev => ({
                                                                        ...prev,
                                                                        comfort: checked
                                                                            ? [...prev.comfort, feature]
                                                                            : prev.comfort.filter(f => f !== feature)
                                                                    }));
                                                                }}
                                                            />
                                                            <label htmlFor={feature} className="text-sm text-gray-600">
                                                                {feature}
                                                            </label>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="col-span-full mt-6">
                                                <h3 className="text-lg font-semibold mb-4 text-gray-700">Performance Features</h3>
                                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                                    {commonFeatures.performance.map(feature => (
                                                        <div key={feature} className="flex items-center space-x-2">
                                                            <Checkbox
                                                                id={feature}
                                                                checked={selectedFeatures.performance.includes(feature)}
                                                                onCheckedChange={(checked) => {
                                                                    setSelectedFeatures(prev => ({
                                                                        ...prev,
                                                                        performance: checked
                                                                            ? [...prev.performance, feature]
                                                                            : prev.performance.filter(f => f !== feature)
                                                                    }));
                                                                }}
                                                            />
                                                            <label htmlFor={feature} className="text-sm text-gray-600">
                                                                {feature}
                                                            </label>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="col-span-full mt-6">
                                                <h3 className="text-lg font-semibold mb-4 text-gray-700">Technology Features</h3>
                                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                                    {commonFeatures.technology.map(feature => (
                                                        <div key={feature} className="flex items-center space-x-2">
                                                            <Checkbox
                                                                id={feature}
                                                                checked={selectedFeatures.technology.includes(feature)}
                                                                onCheckedChange={(checked) => {
                                                                    setSelectedFeatures(prev => ({
                                                                        ...prev,
                                                                        technology: checked
                                                                            ? [...prev.technology, feature]
                                                                            : prev.technology.filter(f => f !== feature)
                                                                    }));
                                                                }}
                                                            />
                                                            <label htmlFor={feature} className="text-sm text-gray-600">
                                                                {feature}
                                                            </label>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                        <Button
                                            className="w-full mt-6 bg-yellow-400 hover:bg-yellow-500 text-blue-800 text-base md:text-lg py-4 md:py-6"
                                            onClick={handleSubmit}
                                        >
                                            Search Cars
                                        </Button>
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

                {/* Add this button after the search section */}
                <div className="container mx-auto max-w-6xl mt-8 text-center">
                    <Button
                        onClick={handleDownload}
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                        <Download className="mr-2 h-4 w-4" /> Download Search Data
                    </Button>
                </div>
            </main>
            <Footer />
        </div>
    );
}