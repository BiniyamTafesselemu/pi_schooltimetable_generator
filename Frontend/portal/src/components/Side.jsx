import logo from '../assets/logo4.png'
import { Avatar, Dropdown} from "flowbite-react";
import axios from "axios";
import React, { useEffect, useState } from "react";


export default function Side(){
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

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
    // user adata
    const { name , email } = userData; // Use userPackage instead of package
    
    return(
        <div className='bg-[#f1f1f1] border-r-[0.1rem] border-solid border-[rgb(167,115,222)] h-screen flex flex-col justify-between overflow-y-auto'>
            <aside className=" p-4 w-64 text-lg flex flex-col items-start justify-start overflow-clip">
                <div className="w-full mb-6 flex justify-center">
                    <img src={logo} className="w-34 p-2" alt="Logo" />
                </div>
            
                <nav className="w-full">
                    <ul className="space-y-2">
                        <li>
                            <a href="/Dashboard" className="hover:text-[#5E469C] hover:bg-[#211a3718] block py-2 px-4 border-l-[0.2rem] border-transparent hover:border-[#A773DE] font-medium rounded-md transition-all duration-150 ease-in-out">
                            Make a Payment
                            </a>
                        </li>
                        <li>
                            <a href="/FixError" className="hover:text-[#5E469C] hover:bg-[#211a3718] block py-2 px-4 border-l-[0.2rem] border-transparent hover:border-[#A773DE] font-medium rounded-md transition-all duration-150 ease-in-out">
                            Fix Error
                            </a>
                        </li>
                        <li>
                            <a href="/PaymentHistory" className="hover:text-[#5E469C] hover:bg-[#211a3718] block py-2 px-4 border-l-[0.2rem] border-transparent hover:border-[#A773DE] font-medium rounded-md transition-all duration-150 ease-in-out">
                            Payment History
                            </a>
                        </li>
                        <li>
                            <a href="/Profile" className="hover:text-[#5E469C] hover:bg-[#211a3718] block py-2 px-4 border-l-[0.2rem] border-transparent hover:border-[#A773DE] font-medium rounded-md transition-all duration-150 ease-in-out">
                            My detail
                            </a>
                        </li>
                        <li>
                            <a href="/ContactUs" className="hover:text-[#5E469C] hover:bg-[#211a3718] block py-2 px-4 border-l-[0.2rem] border-transparent hover:border-[#A773DE] font-medium rounded-md transition-all duration-150 ease-in-out">
                            Contact Us
                            </a>
                        </li>
                        
                    </ul>
                </nav>
            </aside>
            <div className='flex justify-center my-6'> 
            <div className='hover:bg-[rgba(167,115,222,0.28)] w-fit rounded-xl px-2 py-2'>
                <Dropdown
                    arrowIcon={false}
                    inline
                    label={
                        <Avatar alt="User settings" img="https://flowbite.com/docs/images/people/profile-picture-3.jpg" rounded>
                            <div className="space-y-1 font-medium dark:text-white text-left">
                                <div>{userData.name} </div>
                                <div className="text-sm text-gray-500 dark:text-gray-400">{userData.email}</div>
                            </div>
                        </Avatar>
                    }
                >
                    <Dropdown.Header>
                        <span className="block text-sm">{userData.name}</span>
                        <span className="block truncate text-sm font-medium">{userData.email}</span>
                    </Dropdown.Header>
                    <Dropdown.Divider />
                    <Dropdown.Item href='/'>Sign out</Dropdown.Item>
                </Dropdown>
            </div>
            </div>
        </div>
    );
}