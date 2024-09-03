import React, {useState} from 'react'
import { TextInput, Select } from "flowbite-react";
import { HiSearch } from "react-icons/hi";

const MODAL_STYLES = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    padding: '1rem',
    width: 'fit',
    zIndex: 1000
}

const OVERLAY_STYLES = {
    position: 'fixed',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor:'rgba(0, 0, 0, 0.7)',
    zIndex: 1000
}

export default function SearchSubject({func}) {
    const [value, setValue] = useState({
        SubjectName:"",
        SectionCategory:""
    })
    const handleSubmit = (event) =>{
        event.preventDefault();
        const validationErrors = Validate(value);
        if(validationErrors.SubjectName != "" && validationErrors.SectionCategory == ""){
            console.log("Search for Section category"); 
            func(SearchResult());
        }
        else if(validationErrors.SubjectName == "" && validationErrors.SectionCategory != ""){
            console.log("Search for Subject Name");   
            func(SearchResult());
        }

        else if(validationErrors.SubjectName == "" && validationErrors.SectionCategory == ""){
            console.log("Search for Subject Name and Section Category");   
            func(SearchResult()); 
        }

        else{
            console.log("Error!! no input");
            func([]);
        }
    }
    const handleInput = (event) =>{
        setValue(prev=>({...prev,[event.target.name]:event.target.value}))
        console.log(value.SectionCategory+"-"+value.SubjectName);
    }

    const SectionCategories = [{id:"1", name:"SecrionCategory 1"}, {id:"2", name:"SecrionCategory 2"}, {id:"3", name:"SecrionCategory 3"}, {id:"4", name:"SecrionCategory 4"}, {id:"5", name:"SecrionCategory 5"}]
    return (
        <>
            <form className='flex flex-row justify-center items-center gap-1 m-[1.5rem_0rem]' action='' onSubmit={handleSubmit}>
                <TextInput id="SubjectName" type="text" rightIcon={HiSearch} placeholder="Subject"  className='w-3/12 z-20' onChange={handleInput} name='SubjectName'/>
                <Select id="Section category" className='w-fit z-20' name='SectionCategory' onChange={handleInput}>
                    {
                        SectionCategories.map((SectionCategory, index)=>(
                            <option key={index}>{SectionCategory.name}</option>
                        ))
                    }
                </Select>
                <button type='submit' className='bg-[#5E469C] hover:bg-[rgb(0,0,0)] border-[#8C5FFF] text-white p-[0.2rem_1rem] rounded-md'>filter</button>
            </form>
        </>
    )
}

function Validate(value){
    let error = {};
    if(value.SubjectName == ""){
        error.SubjectName = "no subject input"
    }
    else{
        error.SubjectName = ""
    }
    if(value.SectionCategory == ""){
        error.SectionCategory = "no SectionCategory input"
    }
    else{
        error.SectionCategory = ""
    }
    return error;
}

function SearchResult(){
    const result = [
        {
            Name: "Mathemathics",
            information: {
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
            }
        },
        {
            Name: "Mathemathics",
            information: {
                SectionCategory: "5",
                load: "2:00", 
                SectionNumber: "2", 
                TeacherNumber: "1", 
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
            }
        },
    ]
    return result;
}

