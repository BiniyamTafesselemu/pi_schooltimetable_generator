import { TextInput, Select } from "flowbite-react";
import { HiSearch } from "react-icons/hi";
import Button from "../components/Button";

import SubjectsWidget from "../components/SubjectsWidget";
import AddSubject from "../components/AddSubject";
import { useState } from 'react';
import SearchSubject from "../components/SearchSubject";

import HeadBan from "../components/HeadBan";

export default function Subjects(){
  //Data used 
  let Subjects = [
    {
      Name: "Socalism",
      information:[
        {
          SectionCategory: "12", 
          load: "14:00",
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
          load: "14:00", 
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
          load: "22:00", 
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
          load: "18:00", 
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
          load: "14:00", 
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
          load: "16:00",
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
          load: "16:00",
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
          load: "18:00",
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
          load: "22:00",
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
        <div className='text-center z-0'>  
          <div className= 'z-20 text-center'>
              <HeadBan title={"Subjects"}/>
              <SearchSubject/>
          </div>      
          <div className= 'flex flex-col '>
            {
              Subjects.map((subject, index)=>(
                
                  <SubjectsWidget Subjects={subject.information} Label={subject.Name} key={index}/>
  
              ))
            }
            </div>

            <button style={ADD_STYLES} className='bg-[#5E469C] hover:bg-[rgb(0,0,0)] border-[#8C5FFF] text-white p-[0.2rem_1rem] rounded-md' onClick={()=> setIsOpen(true)}>ADD</button>
            <AddSubject open={isOpen} onClose={()=> setIsOpen(false)}/>
        </div>
      </div>
    )
}