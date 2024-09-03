import React, {useState} from 'react'
import ReactDom from 'react-dom'

const MODAL_STYLES = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#fff',
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

import {TextInput, Select } from "flowbite-react";

export default function AddSection({open, onClose}) {
    const cycles = [{id:"1", Name:"elementary"}, {id:"2", Name:"preparatotry"},]
    const [values, setValues] = useState(
        {
            SchoolCycle:"",
            SectionCategory:"",
            Sections:[]
        }
    )

    const [error, setError] = useState(
        {
            SchoolCycle:"",
            SectionCategory:"",
            Sections:""
        }
    )

    const handleInput = (event) =>{
        setValues(prev=>({...prev,[event.target.name]:event.target.value}));
        console.log(values.SchoolCycle+" "+values.SectionCategory+" "+values.Sections+" ");
    }

    const handleSubmit = (event) =>{
        event.preventDefault();
        const validationErrors = Validation(values)
        setError(validationErrors);
        if(validationErrors.SchoolCycle == "" && validationErrors.SectionCategory == "" && validationErrors.Sections == "") console.log("successfully submitted:" + values.SectionCategory);
        else console.log("found error:" + validationErrors.SchoolCycle+" "+ validationErrors.SectionCategory+" "+ validationErrors.Sections+" ");
    }

    const close = () =>{
        setError({
            SchoolCycle:"",
            SectionCategory:"",
            Sections:""
        });
        setValues(
            {
                SchoolCycle:"",
                SectionCategory:"",
                Sections:[]
            }
        );
        onClose();
    }

    const addSection = (event) => {
        event.preventDefault();
        let newSec;
        if(values.Sections.length == 0) newSec = 'A';
        else newSec = String.fromCharCode(values.Sections[values.Sections.length-1].charCodeAt(0)+1);

        setValues(prev => {            
            const updatedSections = [...prev.Sections, newSec];
            const sortedAndUniqueSections = [...new Set(updatedSections)].sort();
            return { ...prev, Sections: sortedAndUniqueSections };
        });
    };
    

    const deleteSection = (index) => {
        setValues((prevValues) => ({
          ...prevValues,
          Sections: [
            ...prevValues.Sections.slice(0, index),
            ...prevValues.Sections.slice(index + 1)
          ]
        }));
      };
      

    if(!open) return null;
    
    return ReactDom.createPortal(
        <>
            <div style={OVERLAY_STYLES}></div>
            <div style={MODAL_STYLES}>
                <div className='flex flex-row justify-between items-center'>
                    <h2 className='text-gray-600'>Add</h2>
                    <button onClick={close}> 
                        <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18 17.94 6M18 18 6.06 6"/>
                        </svg>
                    </button>
                </div>
                <form action='' onSubmit={handleSubmit}>
                    <div className='flex flex-row gap-1 border-b-[0.1rem] p-2 pb-3'>  
                        {
                            error.SchoolCycle === ""? 
                            (<div className='flex flex-col w-fit'><Select id="Cycles" placeholder="Section Category" required onChange={handleInput} name='SchoolCycle' className='w-[10rem]'>
                                {
                                    cycles.map((cycle, index) => (
                                        <option key={index}>{cycle.Name}</option>
                                    ))
                                }
                            </Select></div>)
                            :
                            (<div className='flex flex-col w-fit'><Select id="Cycles" placeholder="Section Category" required onChange={handleInput} name='SchoolCycle' color = "failure" className='w-[10rem]'
                                helperText={
                                    <>
                                        <span className="font-medium">Oops!</span> {error.SchoolCycle}
                                    </>
                                }
                            >
                                {
                                    cycles.map((cycle, index) => (
                                        <option key={index}>{cycle.Name}</option>
                                    ))
                                }
                            </Select></div>)
                            
                        }
                        {
                            error.SectionCategory === ""?
                            (<div className='flex flex-col w-[12rem]'><TextInput id="SectionCategory" type="number" min={1} addon="SectionCategory" onChange={handleInput} name='SectionCategory' /></div>):
                            (<div className='flex flex-col w-[12rem]'><TextInput id="SectionCategory" type="number" min={1} addon="SectionCategory" onChange={handleInput} name='SectionCategory' color='failure'
                                helperText={
                                    <>
                                        <span className="font-medium">Oops!</span> {error.SectionCategory}
                                    </>
                                }
                            /></div>)
                        }
                        
                    </div>
                    <div className='flex flex-row gap-1 justify-between items-center p-2'>
                    {
                            values.Sections.map((x,index)=>(
                                <button key={index} className='hover:bg-[#5e469c] hover:text-white w-8 h-8 rounded-[100%] flex justify-center items-center p-4 hover:border-white border-[0.05rem]' title={'remove '+x.SectionName+'?'} onClick={()=>deleteSection(index)} type="button">
                                    {x}
                                </button>
                            ))
                        }
                        {
                            (error.Sections == '')?
                            (<button title='add a section' onClick={addSection} type="button">
                            <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m-7 7V5"/>
                            </svg>
                        </button>):
                        (<button title='add a section' onClick={addSection} type="button" className='rounded-[100%] border-red-700 border-[0.05rem]'>
                            <svg class="w-6 h-6 text-red-700 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m-7 7V5"/>
                            </svg>
                        </button>)
                        }
                    </div>
                    {
                        (error.Sections)&&(<div className='text-red-700'>
                            {error.Sections}
                        </div>)
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

    if(values.SchoolCycle == ""){
        error.SchoolCycle = "Choose a school cycle"
        console.log(error.SchoolCycle)
    }
    else{
        error.SchoolCycle = ""
    }

    if(values.Sections.length == 0){
        error.Sections = "Add a section"
        console.log(error.Sections)
    }
    else{
        error.Sections = ""
    }

    return error;
}
