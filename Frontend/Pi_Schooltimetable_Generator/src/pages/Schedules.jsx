import React, { useState } from 'react';
import Data from '../assets/ScheduleData.json';
import { Avatar, Carousel, Select} from "flowbite-react";
import HeadBan from '../components/HeadBan'

function TimetableRow({ date, datePlan }) {
  return (
    <div>
      <h3 className='flex justify-center'>{date}</h3>
      {datePlan && (
        <ul>
          {datePlan.map((x, index) => (
            <li key={index} className='bg-[#FFFFFF] text-center flex flex-col items-center justify-center p-2 text-xl rounded-md border-[#C1B2E9] border-[0.1rem] m-1'>
              {x?.subject}
              <Avatar alt="User" size="xs" img="https://flowbite.com/docs/images/people/profile-picture-3.jpg" rounded>
                  <div className="space-y-1 font-medium dark:text-white text-left">
                      <div className='text-sm'>Jese Leos</div>
                  </div>
              </Avatar>
            </li>
          ))}
        </ul>
      )}
    </div> 
  );
}
function Box({ subject }) {
  return (
            <div className='bg-[#FFFFFF] text-center flex flex-col items-center justify-center p-2 text-xl rounded-md border-[#C1B2E9] border-[0.1rem] m-1'>
              {subject}
              <Avatar alt="User" size="xs" img="https://flowbite.com/docs/images/people/profile-picture-3.jpg" rounded>
                  <div className="space-y-1 font-medium dark:text-white text-left">
                      <div className='text-sm'>Jese Leos</div>
                  </div>
              </Avatar>
            </div>
  );
}


export default function Schedules() {
  const jsonData = Data;
  const timetables = jsonData.timetables;
  // Days of the week to display as rows
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const [SectionCategory, setSectionCategory] = useState(0);
  const handleInput = (event)=>{
    setSectionCategory(prev => event.target.value);
    console.log(SectionCategory);
  }
  return (
    <div>
    <HeadBan title={"Schedules"}/>
    <div>
      <div className='flex flex-row items-center justify-end m-3'>
      <Select onChange={handleInput}>
        {
          timetables.map((option,index)=>(
            <option key={index} value={index}>{option.SectionCategory}</option>
          ))        
        }
      </Select>
      </div>
      <div className='h-[30rem] flex flex-col justify-start overflow-y-auto
      '>
      <div className="h-full overflow-x-auto">
        <Carousel slide={false}>
      {
        timetables[SectionCategory].Sections.map((section, index) => (
          <div key={`${section.Name}-${index}`} className='w-fit'>
            <div className='flex flex-row justify-between items-center'>
              <h2 className='text-2xl font-bold'>Sec {section.Name}</h2>
              <button className="bg-[#5E469C] text-white hover:bg-black block p-1 text-center border-transparent font-medium rounded-[0.5rem_0.5rem_0rem_0rem] transition-all duration-150 ease-in-out">
                <svg className="w-7 h-7" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeLinejoin="round" strokeWidth="2" d="M16.444 18H19a1 1 0 0 0 1-1v-5a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h2.556M17 11V5a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v6h10ZM7 15h10v4a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1v-4Z"/>
                </svg>
              </button>
            </div>
            <div className='p-5 bg-[#F1F1F1] border-[0.1rem] border-[#8973C1] items-start justify-start h-fit'>
            <table>
              <thead>
                <tr className='bg-[#A59BBE]'>
                  {daysOfWeek.map((day) => (
                    <th key={day}><div className='w-[9rem] text-center'>{day}</div></th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  {daysOfWeek.map((day) => (
                    <td key={`${section.Name}-${day}`}>
                      {/* Safely check if timetable[day] exists */}
                      {section.timetable[day] && section.timetable[day].length > 0 ? (
                        section.timetable[day].map((slot, i) => (
                          <div key={i}>
                            <Box subject={slot.subject}/>
                          </div>
                        ))
                      ) : (
                        <div className='text-center'>No class</div>
                      )}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
            </div>
          </div>
        )
        )
      }
      </Carousel>
      </div>
      </div>
    </div>
    </div>
  );
}

