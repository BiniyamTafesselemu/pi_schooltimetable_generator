import React, {useState} from 'react'
import ReactDom from 'react-dom'

import {TextInput, Select } from "flowbite-react";
import { HiMail } from "react-icons/hi";
import { FaUserTag } from 'react-icons/fa'

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

export default function InviteCard({isOpen, onClose}) {
    const [value, setValue] = useState(
        {
            email:'',
            role:'',
        }
    )
    const [error, setError] = useState(
        {
            email:'',
            role:'',
        }
    )

    const handleInput = (event) =>{
        setValue(prev=>({...prev,[event.target.name]:event.target.value}));
        console.log(value.email+" "+value.role)
    }
    const handleSubmit = (event) =>{
        event.preventDefault();
        const validationErrors = validation(value);
        setError(validationErrors);
        if(validationErrors.email == "" && validationErrors.role == ""){
            console.log("submitted value: "+ value);
        }
        else{
            console.log("found error: "+validationErrors.email+" "+validationErrors.role);
        }
    }

    const close = () =>{
        setError(
            {
                email:'',
                role:'',
            } 
        )
        setValue(
            {
                email:'',
                role:'',
            }
        )
        onClose(false);
    }
    const roles = [{id:"1", name:"user"}, {id:"2", name:"admin"},]
    if (!isOpen) return null;
    return ReactDom.createPortal(
        <>
            <div style={OVERLAY_STYLES}></div>
            <div style={MODAL_STYLES}>
            <div className='flex justify-between item-center mb-4'>
                    <h2 className='text-gray-600'>Invite someone!!</h2>
                    <button onClick={close}> 
                        <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18 17.94 6M18 18 6.06 6"/>
                        </svg>
                    </button>
                </div>
                <form action='' onSubmit={handleSubmit}>
                    <div className='flex flex-col md:flex-row gap-2 items-start md:items-center'>
                        {
                            (error.email === "")?
                            (<TextInput id="email" type="email" icon={HiMail} placeholder="name@flowbite.com" className='focus:border-[#5E469C]' name='email' onChange={handleInput}/>):
                            (<div className=' flex flex-col'><TextInput id="email" type="email" icon={HiMail} placeholder="name@flowbite.com" className='focus:border-[#5E469C]' name='email' onChange={handleInput} color={'failure'}
                                helperText={
                                    <>
                                       <span className="font-medium">Oops!</span> {error.email}
                                    </>
                                }
                            /></div>)
                        }
                        {
                            (error.role ==="")?
                            (<Select id="role" icon={FaUserTag} name='role' onChange={handleInput}>
                                {
                                    roles.map((role, index) =>(
                                        <option key={index}>{role.name}</option>
                                    ))
                                }
                            </Select>):
                            (<div className=' flex flex-col items-center justify-center'><Select id="role" icon={FaUserTag} name='role' onChange={handleInput} color={'failure'}
                                helperText={
                                    <>
                                        <span className="font-medium">Oops!</span> {error.role}
                                    </>
                                }
                            >
                                {
                                    roles.map((role, index) =>(
                                        <option key={index}>{role.name}</option>
                                    ))
                                }
                            </Select></div>)
                        }
                    </div>
                    <div className='flex flex-row gap-1 m-1 items-center justify-end'>
                        <button type='submit' className='bg-[#5E469C] hover:bg-[rgb(0,0,0)] border-[#8C5FFF] text-white p-[0.2rem_1rem] rounded-md'>invite!</button>
                    </div>
                </form>
            </div>
        </>,
        document.getElementById('portal')
    )
}

function validation(value){
    let error = {}
    if(value.email === "") error.email = "Enter an email"
    else{
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(value.email)) error.email = "Enter a valid email"
        else error.email = ""
    }

    if(value.role === "") error.role = "Select a role"
    else error.role = ""
    return error;
}
