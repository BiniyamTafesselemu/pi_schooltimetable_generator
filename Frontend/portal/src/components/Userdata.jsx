import React, { useEffect, useState } from "react";
import axios from "axios";
import PaymentForm from "./PaymentForm";

export default function Userdata() {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem('token'); // Get the JWT token from local storage

            try {
                const response = await axios.get('http://localhost:8000/dashboard', {
                    headers: {
                        Authorization: `Bearer ${token}`, // Include the token in the headers
                    },
                });
                setUserData(response.data); // Set user data from the response
            } catch (err) {
                setError(err.response?.data?.error || 'Failed to fetch user data.'); // Set error message
            } finally {
                setLoading(false); // Stop loading
            }
        };

        fetchUserData();
    }, []);

    // Loading state
    if (loading) return <p>Loading...</p>;

    // Error state
    if (error) return <p className="text-red-600">{error}</p>;

    // If userData is null or undefined, handle it gracefully
    if (!userData) return <p>No user data available.</p>;

    // Extracting data from userData
    const { due_date, starting_date, package: userPackage } = userData; // Use userPackage instead of package

    // Calculate days left until due date
    const daysLeft = Math.max(0, Math.floor((new Date(due_date) - new Date()) / (1000 * 60 * 60 * 24)));     
    const isActive = new Date(due_date) > new Date(); // Check if subscription is active

    return (
        <div className='text-center z-0'>  
            <div className='z-20 text-center'>
                <div className="w-[95%] sm:w-[65%] mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
                    <div className="p-6">
                        <h2 className="text-lg font-semibold">Package : {userPackage.speed}</h2>
                        <p className="text-gray-600">ID: {userData.user_id}</p>
                        <p className={isActive ? "text-green-500" : "text-red-500"}>
                            {isActive ? "Active" : "Inactive"}
                        </p>
                        <div className="relative pt-1">
                            <div className="flex mb-2 items-center justify-between">
                                <div>
                                    <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-teal-600 bg-teal-200">
                                        {daysLeft} Days Left
                                    </span>
                                </div>
                                <div>
                                    <span className="text-xs font-semibold inline-block text-gray-600">
                                        Due by: {new Date(due_date).toLocaleDateString()} {/* Format date */}
                                    </span>
                                </div>
                            </div>
                            <div className="flex h-2 bg-gray-200 rounded">
                                <div
                                    className={`h-full rounded ${daysLeft < 10 ? 'bg-red-600' : daysLeft >= 15 ? 'bg-green-600' : 'bg-yellow-500'}`}
                                    style={{ width: `${(daysLeft / 30) * 100}%` }} // Assuming 30 days for progress bar
                                ></div>
                            </div>
                        </div>
                        
                        <button onClick={()=> setIsOpen(true)} className="mt-4 w-full bg-teal-600 text-white font-semibold py-2 rounded hover:bg-teal-500 transition duration-200">
                            Pay Now
                        </button>
                        <PaymentForm open={isOpen} onClose={()=> setIsOpen(false)}/>

                    </div>
                </div>
            </div>
        </div>
    );
}