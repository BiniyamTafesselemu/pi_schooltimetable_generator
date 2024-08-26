import { Sidebar } from "flowbite-react";

export default function Side(){
    return(
        <div className='bg-[#f1f1f1] md:border-r-[0.1rem] border-b-[0.1rem]  border-solid border-[rgb(167,115,222)] flex md:flex-col flex-row md:h-screen h-fit  items-center justify-center p-4 gap-3 md:text-xl text-sm'>
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
                    <a href="#" className="hover:text-[#5E469C]">
                        Sign out
                    </a>
        </div>
    );
}