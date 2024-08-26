import { Carousel } from "flowbite-react";
import SubjectCard from "./SubjectCard";
export default function SubjectsWidget({Subjects, Label}) {  
    /*
        {
            Name: "Socalism", 
            SectionCategory: "12", 
            SectionNumber: "4", 
            TeacherNumber: "2", 
            teachers: [
                {img: ``, name: "Donald Trump", ID: 21333}, 
                {img: ``, name: "Kamila Harris", ID: 333}
            ]
        }
    */
    return (
        <div className='flex items-center justify-center z-0'>
            <div className='h-56 sm:h-4 xl:h-80 2xl:h-86 w-[48rem] z-0'>
                <Carousel slide={false} className='z-0'>
                    {
                        Subjects.map((Subject, index) => (
                            <div className="flex h-full items-center justify-center z-0">
                                <SubjectCard Subject={Subject} id = {`Subject-${index}`} Label={Label}/>
                            </div>        
                        ))
                    }
                </Carousel>
            </div>
        </div>
  )
}
