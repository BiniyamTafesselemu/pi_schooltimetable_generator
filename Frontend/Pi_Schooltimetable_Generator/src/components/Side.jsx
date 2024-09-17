import { useState } from 'react';
import logo from '../assets/pi-school-system-logo.png'
import InviteCard from './InviteCard';
import { Avatar, Dropdown} from "flowbite-react";

export default function Side(){
    const [isOpen, setIsOpen] = useState(false);
    return(
        <div className='bg-[#f1f1f1] border-r-[0.1rem] border-solid border-[rgb(167,115,222)] h-screen flex flex-col justify-between overflow-y-auto'>
            <aside className=" p-4 w-64 text-lg flex flex-col items-start justify-start overflow-clip">
                <div className="w-full mb-6 flex justify-center">
                    <img src={logo} className="w-34 p-2" alt="Logo" />
                </div>
            
                <nav className="w-full">
                    <ul className="space-y-2">
                        <li>
                            <a href="/Sections" className="hover:text-[#5E469C] hover:bg-[#211a3718] block py-2 px-4 border-l-[0.2rem] border-transparent hover:border-[#A773DE] font-medium rounded-md transition-all duration-150 ease-in-out">
                            Sections
                            </a>
                        </li>
                        <li>
                            <a href="/Subjects" className="hover:text-[#5E469C] hover:bg-[#211a3718] block py-2 px-4 border-l-[0.2rem] border-transparent hover:border-[#A773DE] font-medium rounded-md transition-all duration-150 ease-in-out">
                            Subjects
                            </a>
                        </li>
                        <li>
                            <a href="/Teachers" className="hover:text-[#5E469C] hover:bg-[#211a3718] block py-2 px-4 border-l-[0.2rem] border-transparent hover:border-[#A773DE] font-medium rounded-md transition-all duration-150 ease-in-out">
                            Teachers
                            </a>
                        </li>
                        <li>
                            <a href="/Schedules" className="hover:text-[#5E469C] hover:bg-[#211a3718] block py-2 px-4 border-l-[0.2rem] border-transparent hover:border-[#A773DE] font-medium rounded-md transition-all duration-150 ease-in-out">
                            Schedules
                            </a>
                        </li>
                        <li>
                            <a href="/GenerateSchedule" className="hover:text-[#5E469C] hover:bg-[#211a3718] block py-2 px-4 border-l-[0.2rem] border-transparent hover:border-[#A773DE] font-medium rounded-md transition-all duration-150 ease-in-out">
                            Generate
                            </a>
                        </li>
                        <li>
                            <div className='block'>
                                <button onClick={() => setIsOpen(true)} className="bg-[#5E469C] w-full text-white hover:bg-black block py-2 px-4 border-l-[0.2rem] border-transparent font-medium rounded-md transition-all duration-150 ease-in-out">
                                    Invite
                                </button>
                                <InviteCard isOpen={isOpen} onClose={setIsOpen} />
                            </div>
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
                                <div>Jese Leos</div>
                                <div className="text-sm text-gray-500 dark:text-gray-400">name@flowbite.com</div>
                            </div>
                        </Avatar>
                    }
                >
                    <Dropdown.Header>
                        <span className="block text-sm">Bonnie Green</span>
                        <span className="block truncate text-sm font-medium">name@flowbite.com</span>
                    </Dropdown.Header>
                    <Dropdown.Item>Switch Account</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item href='/'>Sign out</Dropdown.Item>
                </Dropdown>
            </div>
            </div>
        </div>
    );
}