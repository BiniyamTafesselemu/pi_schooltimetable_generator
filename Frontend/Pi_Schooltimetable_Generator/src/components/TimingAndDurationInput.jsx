import React, { useState } from 'react'
import { TextInput } from 'flowbite-react'

export default function TimingAndDurationInput({setValues}) {
    const [timeInputs, setTimeInputs] = useState({
        classDuration:{
            Hr:"",
            Min:"",
            Sec:""
        },
        breakDuration:{
            Hr:"",
            Min:"",
            Sec:""
        },
        lunchDuration:{
            Hr:"",
            Min:"",
            Sec:""
        },
        classStartingHr:"",
        breakStartingHr:"",
        lunchStartingHr:"",
    });

    const handleInput = (event)=>{
        switch (event.target.name) {
            case "classDurationHr":
                setTimeInputs(prev=>({
                    ...prev,
                    classDuration:{
                        ...prev.classDuration,
                        Hr:event.target.value
                    }
                }))
                break;
            case "classDurationMin":
                setTimeInputs(prev=>({
                    ...prev,
                    classDuration:{
                        ...prev.classDuration,
                        Min:event.target.value
                    }
                }))
                break;
            case "classDurationSec":
                setTimeInputs(prev=>({
                    ...prev,
                    classDuration:{
                        ...prev.classDuration,
                        Sec:event.target.value
                    }
                }))
                break;
            case "breakDurationHr":
                    setTimeInputs(prev=>({
                        ...prev,
                        breakDuration:{
                            ...prev.breakDuration,
                            Hr:event.target.value
                        }
                    }))
                    break;
            case "breakDurationMin":
                    setTimeInputs(prev=>({
                        ...prev,
                        breakDuration:{
                            ...prev.breakDuration,
                            Min:event.target.value
                        }
                    }))
                    break;
            case "breakDurationSec":
                    setTimeInputs(prev=>({
                        ...prev,
                        breakDuration:{
                            ...prev.breakDuration,
                            Sec:event.target.value
                        }
                    }))
                    break;
            case "lunchDurationHr":
                    setTimeInputs(prev=>({
                        ...prev,
                        lunchDuration:{
                            ...prev.lunchDuration,
                            Hr:event.target.value
                        }
                    }))
                    break;
            case "lunchDurationMin":
                    setTimeInputs(prev=>({
                        ...prev,
                        lunchDuration:{
                            ...prev.lunchDuration,
                            Min:event.target.value
                        }
                    }))
                    break;
            case "lunchDurationSec":
                    setTimeInputs(prev=>({
                        ...prev,
                        lunchDuration:{
                            ...prev.lunchDuration,
                            Sec:event.target.value
                        }
                    }))
                    break;
            case "classStarting":
                    setTimeInputs(prev=>({
                        ...prev,
                        classStartingHr: event.target.value
                    }))
                    break;
            case "breakStarting":
                    setTimeInputs(prev=>({
                        ...prev,
                        breakStartingHr: event.target.value
                    }))
                    break;
            case "lunchStarting":
                    setTimeInputs(prev=>({
                        ...prev,
                        lunchStartingHr: event.target.value
                    }))
                    break;
            default:
                break;
        }
        setValues(prev=>({
            ...prev,
            timingDuration:timeInputs
        }));
    }
  return (
    <div className='m-5'>
        <h2 className='text-left'>Timing and duration</h2>
        <div className='bg-[#F1F1F1] p-5 w-[21rem] md:w-[40rem] border-[0.01rem] border-solid border-[#8C5FFF] flex md:flex-row md:justify-between flex-col'>
            <div className='m-1 md:m-0 flex flex-col gap-1'>
                <div className='flex flex-row items-center gap-1 '>
                    class duration
                    <div className='flex flex-row items-center bg-[#F9FAFB] py-2 border-[#D1D5DB] border-[0.08rem] rounded-md'>
                        <input type='number' name='classDurationHr' min={"0"} onChange={handleInput} className='w-[2.3rem] bg-[rgba(1,1,1,0)] border-[rgba(1,1,1,0)] p-0 text-center'/>
                        :
                        <input type='number' name='classDurationMin' min={"0"} max={"59"} onChange={handleInput} className='w-[2.3rem] bg-[rgba(1,1,1,0)] border-[rgba(1,1,1,0)] p-0 text-center'/>
                        :
                        <input type='number' name='classDurationSec' min={"0"} max={"59"} onChange={handleInput} className='w-[2.3rem] bg-[rgba(1,1,1,0)] border-[rgba(1,1,1,0)] p-0 text-center'/>
                    </div>
                </div>
                <div className='flex flex-row items-center gap-1'>
                    break duration
                    <div className='flex flex-row items-center bg-[#F9FAFB] py-2 border-[#D1D5DB] border-[0.08rem] rounded-md'>
                        <input type='number' name='breakDurationHr' min={"0"} onChange={handleInput} className='w-[2.3rem] bg-[rgba(1,1,1,0)] border-[rgba(1,1,1,0)] p-0 text-center'/>
                        :
                        <input type='number' name='breakDurationMin' min={"0"} max={"59"} onChange={handleInput} className='w-[2.3rem] bg-[rgba(1,1,1,0)] border-[rgba(1,1,1,0)] p-0 text-center'/>
                        :
                        <input type='number' name='breakDurationSec' min={"0"} max={"59"} onChange={handleInput} className='w-[2.3rem] bg-[rgba(1,1,1,0)] border-[rgba(1,1,1,0)] p-0 text-center'/>
                    </div>
                </div>
                <div className='flex flex-row items-center gap-1'>
                    lunch duration
                    <div className='flex flex-row items-center bg-[#F9FAFB] py-2 border-[#D1D5DB] border-[0.08rem] rounded-md'>
                        <input type='number' name='lunchDurationHr' min={"0"} onChange={handleInput} className='w-[2.3rem] bg-[rgba(1,1,1,0)] border-[rgba(1,1,1,0)] p-0 text-center'/>
                        :
                        <input type='number' name='lunchDurationMin' min={"0"} max={"59"} onChange={handleInput} className='w-[2.3rem] bg-[rgba(1,1,1,0)] border-[rgba(1,1,1,0)] p-0 text-center'/>
                        :
                        <input type='number' name='lunchDurationSec' min={"0"} max={"59"} onChange={handleInput} className='w-[2.3rem] bg-[rgba(1,1,1,0)] border-[rgba(1,1,1,0)] p-0 text-center'/>
                    </div>
                </div>
            </div>
            <div className='m-1 md:m-0 flex flex-col gap-1'>
                <div className='flex flex-row items-center gap-1'>
                    class starting hour
                    <TextInput type='time' name='classStarting' onChange={handleInput}/>
                </div>
                <div className='flex flex-row items-center gap-1'>
                    break starting hour
                    <TextInput type='time' name='breakStarting' onChange={handleInput}/>
                </div>
                <div className='flex flex-row items-center gap-1'>
                    lunch starting hour
                    <TextInput type='time' name='lunchStarting' onChange={handleInput}/>
                </div>
            </div>
        </div>
    </div>
  )
}
