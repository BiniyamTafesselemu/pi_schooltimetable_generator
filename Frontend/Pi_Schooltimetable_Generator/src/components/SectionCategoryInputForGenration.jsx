import React, {useState} from 'react'
import { Select } from 'flowbite-react';
export default function SectionCategoryInputForGenration({setValues}) {
  const sections = [
    {
      id: 1,
      name: "SectionCategory 1"
    },
    {
      id: 2,
      name: "SectionCategory 2"
    },
    {
      id: 3,
      name: "SectionCategory 3"
    },
    {
      id: 4,
      name: "SectionCategory 4"
    },
  ]
  const [section, setSection] = useState("");
  const handleInput = (event) =>{
    setSection(prev=>event.target.value);
    setValues(prev =>({
      ...prev,
      sectionCategory: section
    }))
  }
  return (
    <div className='m-5'>
        <h2 className='text-left'>Section category info</h2>
        <div className='bg-[#F1F1F1] p-5 w-[21rem] md:w-[40rem] border-[0.01rem] border-solid border-[#8C5FFF] flex flex-row justify-center items-center'>
            <Select onChange={handleInput}>
              {sections.map((section, index)=>(
                <option key={index}>{section.name}</option>
              ))}
            </Select>
        </div>
    </div>
  )
}
