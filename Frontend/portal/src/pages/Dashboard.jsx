import React ,{useState} from 'react';
import HeadBan from "../components/HeadBan";
import Packages from "../components/Packages";
import Userdata from "../components/Userdata";
import ManageSubscription from '../components/ManageSubscription';
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
    
    return (
        <div>
            <div className='text-center z-0'>  
                <div className='z-20 text-center'>
                    <HeadBan title={"Welcome"}/>
                </div>
                <div className="my-[2%] mx-auto">
                    <Userdata/>
                </div>
                <div className="w-[95%] mx-auto">
                    <hr/>
                </div>
                <div>
                    <h1 className=' text-4xl my-[2%]'>Quick Action</h1>
                    <div className='flex flex-row justify-between sm:mx-[10%] gap-auto'>
                        <div onClick={()=> setIsOpen(true)} className=' hover:border-white hover:w-[40%] sm:hover:w-[30%] hover:bg-gray-400 hover:text-white p-2 w-[35%] sm:w-[20%] border rounded-md border-black flex flex-col justify-center items-center bg-[#F1F1FF]'> 
                        <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" stroke-linecap="square" stroke-linejoin="round" stroke-width="2" d="M10 19H5a1 1 0 0 1-1-1v-1a3 3 0 0 1 3-3h2m10 1a3 3 0 0 1-3 3m3-3a3 3 0 0 0-3-3m3 3h1m-4 3a3 3 0 0 1-3-3m3 3v1m-3-4a3 3 0 0 1 3-3m-3 3h-1m4-3v-1m-2.121 1.879-.707-.707m5.656 5.656-.707-.707m-4.242 0-.707.707m5.656-5.656-.707.707M12 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
</svg>

                        <h1 className='text-xl'>Manage Subscription</h1>
                        </div>
                        <ManageSubscription open={isOpen} onClose={()=> setIsOpen(false)}/>


                        <div onClick={()=>navigate('/FixError')} className='hover:border-white hover:w-[40%] sm:hover:w-[30%] hover:bg-gray-400 hover:text-white p-2 w-[35%] sm:w-[20%] border rounded-md shadow-lg border-black flex flex-col justify-center items-center bg-[#F1F1FF]'> 
                        <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                        <path fill-rule="evenodd" d="M11.644 3.066a1 1 0 0 1 .712 0l7 2.666A1 1 0 0 1 20 6.68a17.694 17.694 0 0 1-2.023 7.98 17.406 17.406 0 0 1-5.402 6.158 1 1 0 0 1-1.15 0 17.405 17.405 0 0 1-5.403-6.157A17.695 17.695 0 0 1 4 6.68a1 1 0 0 1 .644-.949l7-2.666Zm4.014 7.187a1 1 0 0 0-1.316-1.506l-3.296 2.884-.839-.838a1 1 0 0 0-1.414 1.414l1.5 1.5a1 1 0 0 0 1.366.046l4-3.5Z" clip-rule="evenodd"/>
                      </svg>
                      
                        <h1 className='text-xl'>Fix Error</h1>
                        </div>

                        <div onClick={()=>navigate('/Profile')} className='hover:border-white hover:w-[40%] sm:hover:w-[30%] hover:bg-gray-400 hover:text-white p-2 w-[35%] sm:w-[20%] border rounded-md border-black flex flex-col justify-center items-center bg-[#F1F1FF]'> 
                        <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 9h3m-3 3h3m-3 3h3m-6 1c-.306-.613-.933-1-1.618-1H7.618c-.685 0-1.312.387-1.618 1M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Zm7 5a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z"/>
                      </svg>
                      
                        <h1 className='text-xl'>Update My Details</h1>
                        </div>

                        
                    </div>
                </div>
                <div className="w-[95%] mx-auto mt-[2%]">
                    <hr/>
                </div>
                <div>
                <h1 className=' text-2xl text-pretty my-[2%] flex ml-[5%] justify-start'>WIFI-Packages Provided</h1>
                </div>
                <div>
                    <Packages/>
                </div>              
            </div>   
        </div>
    );
}