import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Footer = () => {
    return (
        <footer className="bg-gray-100 py-6">
            <div className="container mx-auto px-4">
                <div className="text-center text-sm text-gray-600">
                    © {new Date().getFullYear()} CarFinder Pro. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
