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
              <SectionCategoryInputForGenration/>
              <TimingAndDurationInput/>
              <ClassDayPlan/>
            </div>
        </div>
    </div>
  )
}
