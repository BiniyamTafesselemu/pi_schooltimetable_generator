import React from 'react'
import HeadBan from '../components/HeadBan'
import ClassDayPlan from '../components/ClassDayPlan'
import TimingAndDurationInput from '../components/TimingAndDurationInput'
import SectionCategoryInputForGenration from '../components/SectionCategoryInputForGenration'

export default function Generate() {
  return (
    <div>
        <div className='text-center z-0'>  
            <div className= 'z-20 text-center'>
                <HeadBan title={"Generate Schedule"}/>
            </div>
            <div className='flex flex-col justify-center items-center'>
              <form>
                <SectionCategoryInputForGenration/>
                <TimingAndDurationInput/>
                <ClassDayPlan/>
                <div className='flex flex-row items-end justify-end'><button type='submit' className='bg-[#5E469C] hover:bg-[rgb(0,0,0)] border-[#8C5FFF] text-white p-[0.2rem_1rem] rounded-md mx-5'>Generate</button></div>
              </form>
            </div>
        </div>
    </div>
  )
}
