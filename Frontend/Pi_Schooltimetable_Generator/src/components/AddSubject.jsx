import React, {useState} from 'react'
import ReactDom from 'react-dom'

const MODAL_STYLES = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#fff',
    padding: '1rem',
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

import {TextInput, Select } from "flowbite-react";

export default function AddSubject({open, onClose}) {
    const SectionCategories = [{id:'1', Name: 'SectionCategory 1'}, {id:'2', Name: 'SectionCategory 2'}, {id:'3', Name: 'SectionCategory 3'}, {id:'4', Name: 'SectionCategory 4'}]
    const [values, setValues] = useState(
        {
            subjectName:'',
            SectionCategory:'',
            Load:''
        }
    )

    const [error, setError] = useState(
        {
            subjectName:'',
            SectionCategory:'',
            Load:''
        }
    )

    const handleInput = (event) =>{
        setValues(prev=>({...prev,[event.target.name]:event.target.value}));
        console.log(values.SchoolCycle+" "+values.SectionCategory+" "+values.Sections+" ");
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const validationErrors = Validation(values);
        setError(validationErrors);
        if(validationErrors.subjectName == "" && validationErrors.Load == "" && validationErrors.SectionCategory == "") console.log("successfully submitted:" + values.subjectName);
        else console.log("found error:" + validationErrors.SectionCategory+" "+ validationErrors.subjectName+" "+ validationErrors.Load+" ");
    }

    const close = () => {
        setError({
            SectionCategory: '',
            subjectName: '',
            Load: ''
        });
        setValues({
            SectionCategory: '',
            subjectName: '',
            Load: ''
        });
        onClose();
    }

    if(!open) return null;
    return ReactDom.createPortal(
        <>
            <div style={OVERLAY_STYLES}></div>
            <div style={MODAL_STYLES}>
                <button onClick={close}> 
                    <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 17.94 6M18 18 6.06 6"/>
                    </svg>
                </button>
                <form action='' onSubmit={handleSubmit}>
                    <div className='flex flex-row gap-3 m-2'>
                        {
                            (error.subjectName === "")?
                            (<div className=' flex flex-col'><TextInput id="base" type="text" sizing="md" placeholder="Subject Name" name='subjectName' onChange={handleInput}/></div>):
                            (<div className=' flex flex-col'><TextInput id="base" type="text" sizing="md" placeholder="Subject Name" name='subjectName' onChange={handleInput} color= 'failure'
                                helperText={
                                    <>
                                        <span className="font-medium">Oops!</span> {error.subjectName}
                                    </>
                                }
                            /></div>)
                        }
                        {
                            (error.Load === "")?
                            (<div className=' flex flex-col'><TextInput id="base" type="text" sizing="md" placeholder="Subject Load" name='Load' onChange={handleInput}/></div>):
                            (<div className=' flex flex-col'><TextInput id="base" type="text" sizing="md" placeholder="Subject Load" name='Load' onChange={handleInput} color= "failure"
                                helperText={
                                    <>
                                        <span className="font-medium">Oops!</span> {error.Load}
                                    </>
                                }
                            /></div>)
                        }
                    </div>
                    {
                        (error.SectionCategory === "")?
                        (<Select id="countries" placeholder="Section Category" name='SectionCategory' onChange={handleInput} className='m-2'>
                            {
                                SectionCategories.map((x, index)=>(
                                    <option key={index}>{x.Name}</option>
                                ))
                            }
                        </Select>):
                        (<Select id="countries" placeholder="Section Category" name='SectionCategory' onChange={handleInput} color= "failure" className='m-2'
                            helperText={
                                    <>
                                        <span className="font-medium">Oops!</span> {error.Load}
                                    </>
                                }
                        >
                            {
                                SectionCategories.map((x, index)=>(
                                    <option key={index}>{x.Name}</option>
                                ))
                            }   
                    </Select>)
                    }
                    <div className='flex flex-row gap-1 m-1 items-center justify-end'>
                        <button type='submit' className='bg-[#5E469C] hover:bg-[rgb(0,0,0)] border-[#8C5FFF] text-white p-[0.2rem_1rem] rounded-md'>Save</button>
                    </div>
                </form>
            </div>
        </>,
        document.getElementById('portal')
  )
}

function Validation(values){
    let error = {}

    if(values.SectionCategory == ""){
        error.SectionCategory = "Choose a section Category"
        console.log(error.SectionCategory)
    }
    else{
        error.SectionCategory = "" 
    }

    if(values.subjectName == ""){
        error.subjectName = "Choose a subjectName"
        console.log(error.subjectName)
    }
    else{
        error.subjectName = ""
    }

    if(values.Load == ""){
        error.Load = "Add a Load"
        console.log(error.Load)
    }
    else{
        error.Load = ""
    }

    return error;
}
