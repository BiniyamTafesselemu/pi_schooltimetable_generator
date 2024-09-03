import { Sidebar } from "flowbite-react";

export default function Side(){
    return(
        <div className='bg-[#f1f1f1] border-r-[0.1rem]  border-solid border-[rgb(167,115,222)] flex flex-col h-screen  items-start justify-center p-6 gap-3 w-fit text-xl'>
            <a href="/Sections" className="hover:text-[#5E469C]">Sections</a>
            <a href="/Subjects" className="hover:text-[#5E469C]">
                        Subjects
                    </a>
                    <a href="/Teachers" className="hover:text-[#5E469C]">
                        Teachers
                    </a>
                    <a href="#" className="hover:text-[#5E469C]">
                        Invite
                    </a>
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