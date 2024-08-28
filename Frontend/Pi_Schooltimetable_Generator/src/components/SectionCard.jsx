import { Tabs } from "flowbite-react";
import Section_TeacherCard from "./Section_TeacherCard";
import Teachers from "../pages/Teachers";
import { useState } from 'react';
import EditSection from "./EditSection";

export default function SectionCard({Sec, index}) {
    const [isOpen, setIsOpen] = useState(false);
  return (
    <div className='bg-[#f1f1f1] border-[0.1rem]  border-solid border-[rgb(167,115,222)] md:w-[40rem] p-1 m-5' id={'SectionCard'+index}>
        <div className='flex flex-row justify-end'>
            <button onClick={()=> setIsOpen(true)}>
                <svg class='w-8 h-8 text-[#5E469C] dark:text-white' aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"/>
                </svg>
            </button>
            <EditSection open={isOpen} onClose={()=> setIsOpen(false)} Sections = {Sec}/>
        </div>
        <div className="flex justify-between items-center">
            <h2 className='text-4xl p-3'>{Sec.SectionCategory}</h2>
            <button className="bg-[#5E469C] hover:bg-[rgb(0,0,0)] border-[#8C5FFF] text-white p-[0.3rem_0.5rem] rounded-md">Generate</button>
        </div>
        <div>
        <Tabs aria-label="Tabs with icons" variant="underline" >
            {
                Sec.Sections.map((section, index)=>(
                    <Tabs.Item title={section.SectionName} key={index} id={"Tab"+index} >
                        <div className=" p-[0rem_4rem] md:h-[7.5rem] h-[6.2rem] overflow-y-auto">
                            {
                                section.Subjects.map((x, index) => (
                                    <Section_TeacherCard Sub={x} key={index} id = {"subject"+index}/>
                                ))
                            }
                        </div>
                    </Tabs.Item>
                ))
            }
        </Tabs>
        </div> 
    </div>
  )
}
