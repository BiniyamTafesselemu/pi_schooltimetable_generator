import React from 'react'
import { TextInput } from 'flowbite-react'

export default function TimingAndDurationInput() {
  return (
    <div className='m-5'>
        <h2 className='text-left'>Timing and duration</h2>
        <div className='bg-[#F1F1F1] p-5 w-[21rem] md:w-[40rem] border-[0.01rem] border-solid border-[#8C5FFF] flex md:flex-row md:justify-between flex-col'>
            <div className='m-1 md:m-0 flex flex-col gap-1'>
                <div className='flex flex-row items-center gap-1 '>
                    class duration
                    <div className='flex flex-row items-center bg-[#F9FAFB] py-2 border-[#D1D5DB] border-[0.08rem] rounded-md'>
                        <input type='number' min={"0"} className='w-[2.3rem] bg-[rgba(1,1,1,0)] border-[rgba(1,1,1,0)] p-0 text-center'/>
                        :
                        <input type='number' min={"0"} max={"59"} className='w-[2.3rem] bg-[rgba(1,1,1,0)] border-[rgba(1,1,1,0)] p-0 text-center'/>
                        :
                        <input type='number' min={"0"} max={"59"} className='w-[2.3rem] bg-[rgba(1,1,1,0)] border-[rgba(1,1,1,0)] p-0 text-center'/>
                    </div>
                </div>
                <div className='flex flex-row items-center gap-1'>
                    break duration
                    <div className='flex flex-row items-center bg-[#F9FAFB] py-2 border-[#D1D5DB] border-[0.08rem] rounded-md'>
                        <input type='number' min={"0"} className='w-[2.3rem] bg-[rgba(1,1,1,0)] border-[rgba(1,1,1,0)] p-0 text-center'/>
                        :
                        <input type='number' min={"0"} max={"59"} className='w-[2.3rem] bg-[rgba(1,1,1,0)] border-[rgba(1,1,1,0)] p-0 text-center'/>
                        :
                        <input type='number' min={"0"} max={"59"} className='w-[2.3rem] bg-[rgba(1,1,1,0)] border-[rgba(1,1,1,0)] p-0 text-center'/>
                    </div>
                </div>
                <div className='flex flex-row items-center gap-1'>
                    lunch duration
                    <div className='flex flex-row items-center bg-[#F9FAFB] py-2 border-[#D1D5DB] border-[0.08rem] rounded-md'>
                        <input type='number' min={"0"} className='w-[2.3rem] bg-[rgba(1,1,1,0)] border-[rgba(1,1,1,0)] p-0 text-center'/>
                        :
                        <input type='number' min={"0"} max={"59"} className='w-[2.3rem] bg-[rgba(1,1,1,0)] border-[rgba(1,1,1,0)] p-0 text-center'/>
                        :
                        <input type='number' min={"0"} max={"59"} className='w-[2.3rem] bg-[rgba(1,1,1,0)] border-[rgba(1,1,1,0)] p-0 text-center'/>
                    </div>
                </div>
            </div>
            <div className='m-1 md:m-0 flex flex-col gap-1'>
                <div className='flex flex-row items-center gap-1'>
                    class starting hour
                    <TextInput type='time'/>
                </div>
                <div className='flex flex-row items-center gap-1'>
                    break starting hour
                    <TextInput type='time'/>
                </div>
                <div className='flex flex-row items-center gap-1'>
                    lunch starting hour
                    <TextInput type='time'/>
                </div>
            </div>
        </div>
    </div>
  )
}
