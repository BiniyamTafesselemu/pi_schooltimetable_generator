import React, {useState} from 'react'
import HeadBan from '../components/HeadBan'
import ClassDayPlan from '../components/ClassDayPlan'
import TimingAndDurationInput from '../components/TimingAndDurationInput'
import SectionCategoryInputForGenration from '../components/SectionCategoryInputForGenration'

export default function Generate() {
  const [values, setValues] = useState({
    sectionCategory:null,
    timingDuration:null,
    classDay:{
      Dates:
      {
        mon: true,
        tus: true,
        wed: true,
        thr: true,
        fri: true,
        sat: false,
        sun: false,
    },
      classeNums:
      {
        mon: "7",
        tus: "7",
        wed: "7",
        thr: "7",
        fri: "7",
        sat: "7",
        sun: "7",
    }
    }
  })

  const handleSubmit = (event)=>{
    event.preventDefault();
    if(values.classDay == null || values.sectionCategory == null || values.timingDuration == null){
      alert("Please fillout the form");
    }
    else alert("submitting "+values);
  }

  return (
    <div>
        <div className='text-center z-0'>  
            <div className= 'z-20 text-center'>
                <HeadBan title={"Generate Schedule"}/>
            </div>
            <div className='flex flex-col justify-center items-center'>
              <form onSubmit={handleSubmit}>
                <SectionCategoryInputForGenration setValues={setValues}/>
                <TimingAndDurationInput setValues={setValues}/>
                <ClassDayPlan setValues={setValues}/>
                <div className='flex flex-row items-end justify-end'><button type='submit' className='bg-[#5E469C] hover:bg-[rgb(0,0,0)] border-[#8C5FFF] text-white p-[0.2rem_1rem] rounded-md mx-5'>Generate</button></div>
              </form>
            </div>
        </div>
    </div>
  )
}
