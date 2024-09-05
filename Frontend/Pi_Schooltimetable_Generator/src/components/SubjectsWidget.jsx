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
        <div className='flex items-center justify-center '>
            <div className='h-80 w-[48rem]'>
                <Carousel slide={false} >
                    {
                        Subjects.map((Subject, index) => (
                            <div key={index} className="flex h-full items-center justify-center">
                                <SubjectCard Subject={Subject} id = {`Subject-${index}`} Label={Label}/>
                            </div>        
                        ))
                    }
                </Carousel>
            </div>
        </div>
  )
}
