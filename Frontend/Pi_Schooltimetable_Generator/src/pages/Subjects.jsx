import SubjectsWidget from "../components/SubjectsWidget";
import AddSubject from "../components/AddSubject";
import SearchSubject from "../components/SearchSubject";
import SubjectCard from "../components/SubjectCard";
import HeadBan from "../components/HeadBan";

import { useState } from 'react';

export default function Subjects(){

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
  const [result, setResult] = useState([]);
  return(
      <div>
        <div className='text-center z-0'>  
          <div className= 'text-center'>
              <HeadBan title={"Subjects"}/>
              <SearchSubject func={setResult}/>
          </div>      
          {
            (result.length == 0)?
            (<DefaultDisplay/>):
            (
              <>
                <SearchResult result={result} setResult={setResult}/>
                <button onClick={()=>window.location.reload()}>canncel</button>
              </>
            )
          }
            <button style={ADD_STYLES} className='bg-[#5E469C] hover:bg-[rgb(0,0,0)] border-[#8C5FFF] text-white p-[0.2rem_1rem] rounded-md' onClick={()=> setIsOpen(true)}>ADD</button>
            <AddSubject open={isOpen} onClose={()=> setIsOpen(false)}/>
          <div>
          </div>
        </div>
      </div>
    )
}

function DefaultDisplay(){
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
              ID: "21333"
            }, 
            {
              img: ``, 
              name: "Kamila Harris", 
              ID: "333"
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
              ID: "2100"
            }, 
            {
              img: ``, 
              name: "Joe Biden", 
              ID: "1968"
            }, 
            {
              img: ``, 
              name: "Hasan Piker", 
              ID: "1"
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
              name: "Antony Devis", 
              ID: "234401"
            }, 
            {
              img: ``, 
              name: "Symon White", 
              ID: "303"
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
              ID: "2102"
            }, 
            {
              img: ``, 
              name: "Samuel Wanigton", 
              ID: "10968"
            }, 
            {
              img: ``, 
              name: "Hakim Tanker", 
              ID: "5"
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
              name: "Antony Devis", 
              ID: "25501"
            }, 
            {
              img: ``, 
              name: "Symon White", 
              ID: "22303"
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
              name: "Antony Devis", 
              ID: "2344"
            }, 
            {
              img: ``, 
              name: "Symon White", 
              ID: "322303"
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
              ID: "2122301"
            }, 
            {
              img: ``, 
              name: "Samuel Wanigton", 
              ID: "90456"
            }, 
            {
              img: ``, 
              name: "Hakim Tanker", 
              ID: "900231"
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
              name: "Antony Devis", 
              ID: "2019965"
            }, 
            {
              img: ``, 
              name: "Symon White", 
              ID: "3031255"
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
              name: "Antony Devis", 
              ID: "77401"
            }, 
            {
              img: ``, 
              name: "Symon White", 
              ID: "830356"
            }
          ]
        },
      ]
    },
  ]
  return(
    <div className= 'flex flex-col'>
      {
        Subjects.map((subject, index)=>(      
          <SubjectsWidget Subjects={subject.information} Label={subject.Name} key={index}/>
        ))
      }
    </div>
  )
}

function SearchResult({result}){
  return(
    <div className='flex flex-col items-center'>
        {result.map((x, index)=>(
          <SubjectCard Label={x.Name} Subject={x.information} key={index}/>
        ))}
    </div>
  )
}