import { Avatar } from "flowbite-react";

export default function Subject_teacher_card({Teacher}){
    return(
        <Avatar img={Teacher.img} size="sm" rounded>
        <div className='space-y-1 font-medium dark:text-white text-left'>
          <div className= 'md:text-sm text-[0rem]'>{Teacher.name}</div>
          <div className='md:text-xs text-[0rem] text-gray-500 dark:text-gray-400'>{Teacher.ID}</div>
        </div>
      </Avatar>
    )
}