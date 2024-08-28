import Subject_teacher_card from "./Subject_teacher_card"
export default function Section_TeacherCard({Sub}) {
  return (
    <div className='flex flex-row justify-between items-center bg-white hover:bg-[rgb(167,115,222)] border-b-[0.1rem]  border-solid border-[rgb(167,115,222)] hover:border-white p-[0.5rem_1rem]'>
        <p className='text-2xl'>{Sub.Subject}</p>
        <Subject_teacher_card Teacher={Sub.Teacher}/>
    </div>
  )
}
