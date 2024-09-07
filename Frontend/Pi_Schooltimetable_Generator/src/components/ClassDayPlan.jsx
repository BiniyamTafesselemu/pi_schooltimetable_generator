import React, {useState} from 'react'
import { Checkbox, TextInput } from 'flowbite-react'

export default function ClassDayPlan() {
    const [selectDate, setSelectDate] = useState(
        {
            mon: true,
            tus: true,
            wed: true,
            thr: true,
            fri: true,
            sat: false,
            sun: false,
        }
    )

    const [commonClass, setCommonClass] = useState(
        {
            isCommon: true,
            commonNum: "7",
        }
    );

    const [classesNum, setClassNum] = useState(
        {
            mon: commonClass.commonNum,
            tus: commonClass.commonNum,
            wed: commonClass.commonNum,
            thr: commonClass.commonNum,
            fri: commonClass.commonNum,
            sat: commonClass.commonNum,
            sun: commonClass.commonNum,
        }
    )

    const handleDateCheck = (event) =>{
        const {name, checked} = event.target;
        setSelectDate({
            ...selectDate,
            [name]: checked,
        });
    }

    const handleDateNum = (event) =>{
        const {name, value} = event.target;
        setClassNum({
            ...classesNum,
            [name]: value,
        });
    }

    const handleComNum = (event) =>{
        const {name, value, checked} = event.target;
        if(name === 'commonNum'){
            setCommonClass(prev => ({
                ...prev,
                commonNum: value,
            }));
        }
        else if(name === 'checkCommon'){
            setCommonClass(prev =>({
                ...prev,
                isCommon: checked,
            }));
        }
    }

    return (
    <div className='m-5'>
        <h2 className='text-left'>Class day plan</h2>
        <div className='bg-[#F1F1F1] p-5 md:w-[40rem] flex flex-col items-center justify-center border-[0.01rem] border-solid border-[#8C5FFF]'>
            <div className='flex flex-row gap-3 m-5'>
                <div className='flex flex-col justify-center items-center gap-1'>
                    <div>Mon</div>
                    <div><Checkbox id="monAccept" name='mon' checked={selectDate.mon} onChange={handleDateCheck}/></div>
                    <div>
                        {(!commonClass.isCommon)&&
                            (
                                (selectDate.mon == true)?
                                (<TextInput type='number' min={1} className='w-10' name='mon' onChange={handleDateNum} value={classesNum.mon}/>):
                                (<TextInput type='number' min={1} className='w-10' name='mon' onChange={handleDateNum} value={classesNum.mon} disabled readOnly/>)
                            )    
                        }
                    </div>
                </div>
                <div className='flex flex-col justify-center items-center gap-1'>
                    <div>Tus</div>
                    <div><Checkbox id="tusAccept" name='tus' checked={selectDate.tus} onChange={handleDateCheck}/></div>
                    <div>
                        {(!commonClass.isCommon)&&
                            (
                                (selectDate.tus == true)?
                                (<TextInput type='number' min={1} className='w-10' name='tus' onChange={handleDateNum} value={classesNum.tus}/>):
                                (<TextInput type='number' min={1} className='w-10' name='tus' onChange={handleDateNum} value={classesNum.tus} disabled readOnly/>)
                            )    
                        }
                    </div>
                </div>
                <div className='flex flex-col justify-center items-center gap-1'>
                    <div>Wed</div>
                    <div><Checkbox id="wedAccept" name='wed' checked={selectDate.wed} onChange={handleDateCheck}/></div>
                    <div>
                        {(!commonClass.isCommon)&&
                            (
                                (selectDate.wed == true)?
                                (<TextInput type='number' min={1} className='w-10' name='wed' onChange={handleDateNum} value={classesNum.wed}/>):
                                (<TextInput type='number' min={1} className='w-10' name='wed' onChange={handleDateNum} value={classesNum.wed} disabled readOnly/>)
                            )    
                        }
                    </div>
                </div>
                <div className='flex flex-col justify-center items-center gap-1'>
                    <div>Thr</div>
                    <div><Checkbox id="thrAccept" name='thr' checked={selectDate.thr} onChange={handleDateCheck}/></div>
                    <div>
                        {(!commonClass.isCommon)&&
                            (
                                (selectDate.thr == true)?
                                (<TextInput type='number' min={1} className='w-10' name='thr' onChange={handleDateNum} value={classesNum.thr}/>):
                                (<TextInput type='number' min={1} className='w-10' name='thr' onChange={handleDateNum} value={classesNum.thr} disabled readOnly/>)
                            )    
                        }
                    </div>
                </div>
                <div className='flex flex-col justify-center items-center gap-1'>
                    <div>Fri</div>
                    <div><Checkbox id="friAccept" name='fri' checked={selectDate.fri} onChange={handleDateCheck}/></div>
                    <div>
                        {(!commonClass.isCommon)&&
                            (
                                (selectDate.fri == true)?
                                (<TextInput type='number' min={1} className='w-10' name='fri' onChange={handleDateNum} value={classesNum.fri} />):
                                (<TextInput type='number' min={1} className='w-10' name='fri' onChange={handleDateNum} value={classesNum.fri} disabled readOnly/>)
                            )    
                        }
                    </div>
                </div>
                <div className='flex flex-col justify-center items-center gap-1'>
                    <div>Sat</div>
                    <div><Checkbox id="satAccept" name='sat' checked={selectDate.sat} onChange={handleDateCheck}/></div>
                    <div>
                        {(!commonClass.isCommon)&&
                            (
                                (selectDate.sat == true)?
                                (<TextInput type='number' min={1} className='w-10' name='sat' onChange={handleDateNum} value={classesNum.sat} />):
                                (<TextInput type='number' min={1} className='w-10' name='sat' onChange={handleDateNum} value={classesNum.sat} disabled readOnly/>)
                            )    
                        }
                    </div>
                </div>
                <div className='flex flex-col justify-center items-center gap-1'>
                    <div>Sun</div>
                    <div><Checkbox id="sunAccept" name='sun' checked={selectDate.sun} onChange={handleDateCheck}/></div>
                    <div>
                        {(!commonClass.isCommon)&&
                            (
                                (selectDate.sun == true)?
                                (<TextInput type='number' min={1} className='w-10' name='sun' onChange={handleDateNum} value={classesNum.sun} />):
                                (<TextInput type='number' min={1} className='w-10' name='sun' onChange={handleDateNum} value={classesNum.sun} disabled readOnly/>)
                            )    
                        }
                    </div>
                </div>
            </div>
            <div className='flex flex-row items-center gap-1'>
                <Checkbox id="commonNumAccept" checked = {commonClass.isCommon} onChange={handleComNum} name='checkCommon'/>
                <span>Common number of periods</span>
                {
                    (commonClass.isCommon)&&(<TextInput type='number' min={1} className='w-14' name='commonNum'onChange={handleComNum} value={commonClass.commonNum}/>)
                }
            </div>
        </div>
    </div>
  )
}
