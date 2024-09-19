import React, { useState, useEffect  } from 'react';
import Data from '../assets/ScheduleData.json';
import { Avatar, Carousel, Select} from "flowbite-react";
import HeadBan from '../components/HeadBan'
import Timetable from '../components/Timetable';

export default function Schedules() {
  const jsonData = Data;
  const timetables = jsonData.timetables;
  const [screenSize, setScreenSize] = useState(window.innerWidth);
  const [SectionCategory, setSectionCategory] = useState(0);
  const handleInput = (event)=>{
    setSectionCategory(prev => event.target.value);
    console.log(SectionCategory);
  }

  useEffect(() => {
    const handleResize = () => {
      setScreenSize(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize',   
  handleResize);
      };
  }, []);

  return (
    <div>
    <HeadBan title={"Schedules"}/>
    <div className='flex flex-row items-center justify-end m-3'>
      <Select onChange={handleInput}>
        {
          timetables.map((option,index)=>(
            <option key={index} value={index}>{option.SectionCategory}</option>
          ))        
        }
      </Select>
      </div>
    <div className='block'>
      
      <div className='h-[30rem]'>
        <Carousel slide={false}>
      {
        timetables[SectionCategory].Sections.map((section, index) => (
          <div key={`${section.Name}-${index}`} className='w-fit'>
            <div className='flex flex-row justify-between items-center px-4'>
              <h2 className='text-2xl font-bold'>Sec {section.Name}</h2>
              <div>
              <button className="bg-[#5E469C] text-white hover:bg-black block p-1 text-center border-transparent font-medium rounded-[0.5rem_0.5rem_0rem_0rem] transition-all duration-150 ease-in-out">
                <svg className="w-7 h-7" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeLinejoin="round" strokeWidth="2" d="M16.444 18H19a1 1 0 0 0 1-1v-5a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h2.556M17 11V5a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v6h10ZM7 15h10v4a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1v-4Z"/>
                </svg>
              </button>
              </div>
            </div>
            <div className='p-[0.1rem] xl:p-5 bg-[#F1F1F1] border-[0.1rem] border-[#8973C1] items-start justify-start h-fit'>
              <Timetable timetable={section.timetable}/>
            </div>
          </div>
        )
        )
      }
      </Carousel>
      
      </div>
    </div>
    </div>
  );
}

