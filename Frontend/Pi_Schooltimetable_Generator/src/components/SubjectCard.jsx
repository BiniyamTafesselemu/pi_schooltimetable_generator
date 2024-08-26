import Subject_teacher_card from "./Subject_teacher_card"
import { useState } from 'react';
import EditSubject from "./EditSubject";

export default function SubjectCard({Subject, Label}){
    //let teacher = {img: ``, name: "Donald Trump", ID: 21333}
    const [isOpen, setIsOpen] = useState(false);

    return(
        <div className="text-left">
            <h3>{Label}</h3>
            <div className='bg-[#f1f1f1] flex flex-col p-1 border-[0.01rem] border-solid border-[#8C5FFF] md:w-[40rem] w-[20rem]'>
                <div className="flex justify-end">
                    <button onClick={()=> setIsOpen(true)} className='mb-6'>
                        <svg class='w-8 h-8 text-[#5E469C] dark:text-white' aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"/>
                        </svg>
                    </button>
                    <EditSubject open={isOpen} onClose={()=> setIsOpen(false)} sectionCatagory={Subject.SectionCategory} subjectName={Label} Load={Subject.load}/>
                </div>
                <h4 className='md:text-5xl text-2xl md:pl-3'>Section category {Subject.SectionCategory}</h4>
                <div className='inline-flex gap-5 border-b-[0.1rem] border-solid border-[#8C5FFF] p-3 pl-5 text-sm'>
                    <p>Given to {Subject.SectionNumber} Sections</p>
                    <p>Given by {Subject.TeacherNumber} teachers</p>
                </div>
                <div className='flex gap-2 p-2 overflow-x-auto'>
                    {
                        Subject.teachers.map((teacher, index) =>(
                            <Subject_teacher_card Teacher={teacher} key={index} id = {`item-${index}`}/>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}