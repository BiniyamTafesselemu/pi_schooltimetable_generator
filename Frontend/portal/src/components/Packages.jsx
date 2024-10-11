import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Packagecard from './Packagecard';

const Packages = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(6);
    const [wifiPackages, setWifiPackages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPackages = async () => {
            try {
                const response = await axios.get('http://localhost:8000/packages');
                setWifiPackages(response.data);
                console.log(response.data);
            } catch (err) {
                setError(err.message);
                console.error('Error fetching packages:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchPackages();
    }, []);

    useEffect(() => {
        const updateItemsPerPage = () => {
            const screenWidth = window.innerWidth;
            if (screenWidth < 640) {
                setItemsPerPage(2);
            } else if (screenWidth < 1024) {
                setItemsPerPage(4);
            } else {
                setItemsPerPage(6);
            }
        };

        updateItemsPerPage();
        window.addEventListener('resize', updateItemsPerPage);
        return () => window.removeEventListener('resize', updateItemsPerPage);
    }, []);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => {
            if (prevIndex + itemsPerPage >= wifiPackages.length) {
                return 0; // Wrap around to the start
            }
            return prevIndex + itemsPerPage;
        });
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => {
            if (prevIndex - itemsPerPage < 0) {
                return Math.max(0, wifiPackages.length - itemsPerPage); // Wrap around to the last set
            }
            return prevIndex - itemsPerPage;
        });
    };

    useEffect(() => {
        const interval = setInterval(nextSlide, 10000);
        return () => clearInterval(interval);
    }, [itemsPerPage, wifiPackages]);

    // Calculate the current packages to display, and wrap around if necessary
    const displayedPackages = wifiPackages.slice(currentIndex, currentIndex + itemsPerPage);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="flex flex-row items-center">
            <button 
                type="button" 
                onClick={prevSlide} 
                className="z-10 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
            >
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                    <svg className="w-4 h-4 text-white dark:text-gray-800" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4"/>
                    </svg>
                </span>
            </button>

            <div className="bg-[#F1F1F1] px-2 py-5 shadow-md gap-2 w-[90%] mx-auto overflow-hidden flex flex-wrap justify-center">
                {displayedPackages.map((pkg) => (
                    <div key={pkg.package_id} className="flex flex-col">
                        <Packagecard 
                            package_id={pkg.package_id}
                            package_speed={pkg.package_speed}
                            price={pkg.price}
                        />
                    </div>
                ))}
            </div>

            <button 
                type="button" 
                onClick={nextSlide} 
                className="end-0 flex items-center justify-center h-full ml-[1%] mr-[2%] cursor-pointer group focus:outline-none"
            >
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                    <svg className="w-4 h-4 text-white dark:text-gray-800" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
                    </svg>
                </span>
            </button>
        </div>
    );
};

export default Packages;
