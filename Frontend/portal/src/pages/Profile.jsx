import EditProfile from '../components/EditProfile';
import HeadBan from '../components/HeadBan'
import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Profile() {

  const [isOpen, setIsOpen] = useState(false);
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
    const { name , email , phone_number } = userData; // Use userPackage instead of package


  return (
    <div>
      <div>
          <HeadBan title={"My profile"}/>
          <div className="w-[90%] mx-auto my-10">
          <div className="flex justify-start text-xl my-2">
              <h1>Personal Information</h1>
          </div>
          <div className="bg-[#F1F1F1] py-5 border border-gray-600 shadow-md px-[10%]">
          <div className='flex justify-end'> 
          <svg onClick={()=> setIsOpen(true)} className="w-8 h-8 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" strokeLinecap="square" strokeLinejoin="round" strokeWidth="1" d="M7 19H5a1 1 0 0 1-1-1v-1a3 3 0 0 1 3-3h1m4-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm7.441 1.559a1.907 1.907 0 0 1 0 2.698l-6.069 6.069L10 19l.674-3.372 6.07-6.07a1.907 1.907 0 0 1 2.697 0Z"/>
</svg>
<EditProfile open={isOpen} onClose={()=> setIsOpen(false)}/>

          </div>
              <div className="flex gap-5 sm:flex-row sm:justify-between">
                  <div className="flex gap-3">
                      
                      <div className="font-medium dark:text-white">
                          <div className="flex flex-col sm:flex-row sm:gap-9">
                              <div className="my-1">
                              <div>
                              <label className='text-sm'>Full Name</label>
                              <h1 className='w-[100%] text-md py-2 px-5 bg-white border border-black rounded-md'>{userData.name}</h1>  
                            </div>
                            <div>
                            <label className='text-sm'>Email</label>
                            <h1 className='w-[100%] text-md py-2 px-5 bg-white border border-black rounded-md'>{userData.email}</h1>  
                          </div>

                              </div>
                              <div className="my-1">
                              <div>
                              <label className='text-sm'>Phone number</label>
                              <h1 className='w-[100%] text-md py-2 px-5 bg-white border border-black rounded-md'>{userData.phone_number}</h1>  
                            </div>

                                  
                          </div>
                      </div>
                 
                                  </div>
                              </div>
                                
                              </div>
                  </div>
              </div>
      </div>    
    </div>
  );
}

