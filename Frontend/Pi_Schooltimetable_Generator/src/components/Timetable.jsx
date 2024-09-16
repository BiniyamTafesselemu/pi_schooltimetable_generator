import React from "react";
import Data from '../assets/ScheduleData.json'
import { Avatar } from "flowbite-react";
import { useState, useEffect } from 'react';

function Box({ subject }) {
  const [screenSize, setScreenSize] = useState(window.innerWidth);
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
        <>
          {screenSize <= 1024    && (
            <div className='bg-[#FFFFFF] w-full text-center flex flex-col items-center justify-center p-1 text-sm lg:text-xl rounded-md border-[#C1B2E9] border-[0.1rem] m-[0.1rem]'>
              <span className="truncate w-10 lg:w-fit">{subject}</span>
                <div className="font-medium dark:text-white text-left">
                    <div className='text-[0.55rem] lg:text-sm'>Jese Leos</div>
                </div>  
            </div>)
          }
          {screenSize > 1024    && (
            <div className='bg-[#FFFFFF] text-center flex flex-col items-center justify-center p-2 text-sm md:text-xl rounded-md border-[#C1B2E9] border-[0.1rem] m-1'>
              {subject}
              <Avatar alt="User" size="xs" img="https://flowbite.com/docs/images/people/profile-picture-3.jpg" rounded>
                  <div className="space-y-1 font-medium dark:text-white text-left">
                      <div className='text-xs md:text-sm'>Jese Leos</div>
                  </div>
              </Avatar>
            </div>)
          }
        </>
  );
}

function Timetable({timetable}){
  
  // Get the days of the week
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  // Determine the maximum number of slots in any day
  const maxSlots = Math.max(...daysOfWeek.map(day => timetable[day] ? timetable[day].length : 0));
  console.log(maxSlots);
  return (
    <div className="h-96 overflow-y-auto">
    {
      (maxSlots > 0)?(
    <table cellPadding="2">
      <thead>
        <tr className='bg-[#A59BBE]'>
          {daysOfWeek.map(day => (
            <th key={day}><div className='w-[3rem] truncate xl:w-[9rem] text-sm xl:text-md text-center'>{day}</div></th>
          ))}
        </tr>
      </thead>
      <tbody>
      
        {Array.from({ length: maxSlots }).map((_, rowIndex) => (
          <tr key={rowIndex}>
            {daysOfWeek.map(day => (
              <td key={day}>
                
                {timetable[day] && timetable[day][rowIndex] ? (
                  <div>
                    <Box subject={timetable[day][rowIndex].subject}/>
                  </div>
                ) : (
                  <div className="bg-[#d8c5e8] p-5 rounded-md border-[#C1B2E9] border-[0.1rem] m-1"></div> // If no class is available, display empty
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>):
    (<div>No classes scheduled for this week.</div>)
    }
    </div>
  );
};

export default Timetable;
