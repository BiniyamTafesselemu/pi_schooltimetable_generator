import { TextInput, Select } from "flowbite-react";
import { HiSearch } from "react-icons/hi";
import Button from "../components/Button";

import SubjectsWidget from "../components/SubjectsWidget";
import AddSubject from "../components/AddSubject";
import { useState } from 'react';

export default function Subjects(){
  //Data used 
  let Subjects = [
    {
      Name: "Socalism",
      information:[
        {
          SectionCategory: "12", 
          SectionNumber: "4", 
          TeacherNumber: "2", 
          teachers: [
            {
              img: ``, 
              name: "Donald Trump", 
              ID: 21333
            }, 
            {
              img: ``, 
              name: "Kamila Harris", 
              ID: 333
            }
          ]
        },
        {
          SectionCategory: "11", 
          SectionNumber: "5", 
          TeacherNumber: "3", 
          teachers: [
            {
              img: ``, 
              name: "Brack Obama", 
              ID: 2100
            }, 
            {
              img: ``, 
              name: "Joe Biden", 
              ID: 1968
            }, 
            {
              img: ``, 
              name: "Hasan Piker", 
              ID: 1
            }
          ]
        }
      ]
    },

    {
      Name: "Mathemathics",
      information:[
        {
          SectionCategory: "12", 
          SectionNumber: "5", 
          TeacherNumber: "2", 
          teachers: [
            {
              img: ``, 
              name: "ANtony Devis", 
              ID: 234401
            }, 
            {
              img: ``, 
              name: "Symon White", 
              ID: 303
            }
          ]
        },
        {
          SectionCategory: "10", 
          SectionNumber: "5", 
          TeacherNumber: "3", 
          teachers: [
            {
              img: ``, 
              name: "Ken", 
              ID: 2100
            }, 
            {
              img: ``, 
              name: "Samuel Wanigton", 
              ID: 1968
            }, 
            {
              img: ``, 
              name: "Hakim The tanker", 
              ID: 1
            }
          ]
        }
      ]
    },

    {
      Name: "Physics",
      information:[
        {
          SectionCategory: "8", 
          SectionNumber: "5", 
          TeacherNumber: "2", 
          teachers: [
            {
              img: ``, 
              name: "ANtony Devis", 
              ID: 234401
            }, 
            {
              img: ``, 
              name: "Symon White", 
              ID: 303
            }
          ]
        },
        {
          SectionCategory: "9", 
          SectionNumber: "2", 
          TeacherNumber: "2", 
          teachers: [
            {
              img: ``, 
              name: "ANtony Devis", 
              ID: 234401
            }, 
            {
              img: ``, 
              name: "Symon White", 
              ID: 303
            }
          ]
        },
        {
          SectionCategory: "10", 
          SectionNumber: "5", 
          TeacherNumber: "3", 
          teachers: [
            {
              img: ``, 
              name: "Ken", 
              ID: 2100
            }, 
            {
              img: ``, 
              name: "Samuel Wanigton", 
              ID: 1968
            }, 
            {
              img: ``, 
              name: "Hakim The tanker", 
              ID: 1
            }
          ]
        },
        {
          SectionCategory: "11", 
          SectionNumber: "5", 
          TeacherNumber: "2", 
          teachers: [
            {
              img: ``, 
              name: "ANtony Devis", 
              ID: 234401
            }, 
            {
              img: ``, 
              name: "Symon White", 
              ID: 303
            }
          ]
        },
        {
          SectionCategory: "12", 
          SectionNumber: "5", 
          TeacherNumber: "2", 
          teachers: [
            {
              img: ``, 
              name: "ANtony Devis", 
              ID: 234401
            }, 
            {
              img: ``, 
              name: "Symon White", 
              ID: 303
            }
          ]
        },
      ]
    },
  ]

  // Add button styling
  const ADD_STYLES = {
    position: 'fixed',
    top: '95%',
    right: '2.5%',
    transform: 'translate(-50%, -50%)',
    width:'full',
    zIndex: 100
  } 
  //for pop up conditionals 
  const [isOpen, setIsOpen] = useState(false);
  return(
      <div>
        <div className='text-center bg-[#DCD4F1] h-screen m-[-2rem_0rem_0rem_9.5rem] overflow-y-auto z-0'>  
          <div className= 'z-20 text-center'>
              <header className="bg-[#f1f1f1] border-b-[0.1rem] border-solid border-[rgb(167,115,222)] p-4">
                <h1 className="text-5xl font-bold text-[#5E469C]">Subjects</h1>
              </header>
              
              <form className='flex flex-row justify-center items-center gap-1 m-[1.5rem_0rem]'>
                <TextInput id="SubjectName" type="text" rightIcon={HiSearch} placeholder="Subject"  className='w-3/12 z-20' required />
                <Select id="Section category" className='w-2/12 z-20' required>
                  <option>category 1</option>
                  <option>category 2</option>
                  <option>category 3</option>
                  <option>category 5</option>
                </Select>
                <Button Name={"Filter"} className='z-20'/>
              </form>
          </div>      
            {
              Subjects.map((subject, index)=>(
                <div>
                  <SubjectsWidget Subjects={subject.information} Label={subject.Name} key={index}/>
                </div>
              ))
            }

            <button style={ADD_STYLES} className='bg-[#5E469C] hover:bg-[rgb(0,0,0)] border-[#8C5FFF] text-white p-[0.2rem_1rem] rounded-md' onClick={()=> setIsOpen(true)}>ADD</button>
            <AddSubject open={isOpen} onClose={()=> setIsOpen(false)}/>
        </div>
      </div>
    )
}