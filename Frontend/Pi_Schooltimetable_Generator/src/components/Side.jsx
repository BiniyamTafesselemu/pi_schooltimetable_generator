import { useState } from 'react';
import logo from '../assets/pi-school-system-logo.png'
import InviteCard from './InviteCard';

export default function Side(){
    const [isOpen, setIsOpen] = useState(false);
    return(
        <aside className="bg-[#f1f1f1] border-r-[0.1rem] border-solid border-[rgb(167,115,222)] h-screen p-4 w-64 text-lg flex flex-col items-start justify-start overflow-clip">
            <div className="w-full mb-6 flex justify-center">
                <img src={logo} className="w-34 p-2" alt="Logo" />
            </div>
        
            <nav className="w-full">
                <ul className="space-y-2">
                <li>
                    <a href="/Sections" className="hover:text-[#5E469C] block py-2 px-4 border-l-[0.2rem] border-transparent hover:border-[#A773DE] font-medium rounded-md transition-all duration-150 ease-in-out">
                    Sections
                    </a>
                </li>
                <li>
                    <a href="/Subjects" className="hover:text-[#5E469C] block py-2 px-4 border-l-[0.2rem] border-transparent hover:border-[#A773DE] font-medium rounded-md transition-all duration-150 ease-in-out">
                    Subjects
                    </a>
                </li>
                <li>
                    <a href="/Teachers" className="hover:text-[#5E469C] block py-2 px-4 border-l-[0.2rem] border-transparent hover:border-[#A773DE] font-medium rounded-md transition-all duration-150 ease-in-out">
                    Teachers
                    </a>
                </li>
                <li>
                    <button onClick={() => setIsOpen(true)} className="hover:text-[#5E469C] block py-2 px-4 border-l-[0.2rem] border-transparent hover:border-[#A773DE] font-medium rounded-md transition-all duration-150 ease-in-out">
                    Invite
                    </button>
                    <InviteCard isOpen={isOpen} onClose={setIsOpen} />
                </li>
                <li>
                    <a href="#" className="hover:text-[#5E469C] block py-2 px-4 border-l-[0.2rem] border-transparent hover:border-[#A773DE] font-medium rounded-md transition-all duration-150 ease-in-out">
                    Schedules
                    </a>
                </li>
                <li>
                    <a href="#" className="hover:text-[#5E469C] block py-2 px-4 border-l-[0.2rem] border-transparent hover:border-[#A773DE] font-medium rounded-md transition-all duration-150 ease-in-out">
                    Generate
                    </a>
                </li>
                <li>
                    <a href="/" className="hover:text-[#5E469C] block py-2 px-4 border-l-[0.2rem] border-transparent hover:border-[#A773DE] font-medium rounded-md transition-all duration-150 ease-in-out">
                    Sign out
                    </a>
                </li>
                </ul>
            </nav>
        </aside>
    );
}