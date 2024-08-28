import React from 'react'
import ReactDom from 'react-dom'
import Button from './Button'

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

export default function AddSection({open, onClose}) {
    if(!open) return null;
    return ReactDom.createPortal(
        <>
            <div style={OVERLAY_STYLES}></div>
            <div style={MODAL_STYLES}>
                <div className='flex flex-row justify-between items-center'>
                    <h2 className='text-gray-600'>Add</h2>
                    <button onClick={onClose}> 
                        <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18 17.94 6M18 18 6.06 6"/>
                        </svg>
                    </button>
                </div>
                <form action='' onSubmit={''}>
                    <div className='flex flex-row gap-1 border-b-[0.1rem] p-2 pb-3'>
                        <Select id="Cycles" placeholder="Section Category" required>
                            <option>United States</option>
                            <option>Canada</option>
                            <option>France</option>
                            <option>Germany</option>
                        </Select>
                        <TextInput id="SectionCategory" type="number" addon="SectionCategory" />
                    </div>
                    <div className='flex flex-row gap-1 justify-between items-center p-2'>
                        <button title='add a section'>
                            <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m-7 7V5"/>
                            </svg>
                        </button>
                    </div>
                    <div className='flex flex-row gap-1 m-1 items-center justify-end'>
                        <Button Name={"Save"} fun={()=>{console.log("Save!")}}/>
                    </div>
                </form>
            </div>
        </>,
        document.getElementById('portal')
  )
}
