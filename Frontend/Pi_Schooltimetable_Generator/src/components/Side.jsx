import { useState } from 'react';
import logo from '../assets/pi-school-system-logo-only.png'
import InviteCard from './InviteCard';

export default function Side(){
    const [isOpen, setIsOpen] = useState(false);
    return(
        <div className='bg-[#f1f1f1] border-r-[0.1rem]  border-solid border-[rgb(167,115,222)] flex flex-col h-screen  items-start justify-start p-6 gap-5 w-fit text-xl'>
            <img src={logo} className='w-20 mb-24'></img>
            <a href="/Sections" className="hover:text-[#5E469C]">Sections</a>
            <a href="/Subjects" className="hover:text-[#5E469C]">
                        Subjects
                    </a>
                    <a href="/Teachers" className="hover:text-[#5E469C]">
                        Teachers
                    </a>
                    <button className="hover:text-[#5E469C]" onClick={()=>setIsOpen(true)}>
                        Invite
                    </button>
                    <InviteCard isOpen={isOpen} onClose={setIsOpen}/>
                    <a href="#" className="hover:text-[#5E469C]">
                        Schedules
                    </a>
                    <a href="#" className="hover:text-[#5E469C]">
                        Generate
                    </a>
                    <a href="/" className="hover:text-[#5E469C]">
                        Sign out
                    </a>
        </div>
    );
}