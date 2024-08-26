import { Avatar } from "flowbite-react";

export default function Subject_teacher_card({Teacher}){
    return(
        <Avatar img={Teacher.img} rounded>
        <div className="space-y-1 font-medium dark:text-white">
          <div className='text-sm'>{Teacher.name}</div>
          <div className='text-xs text-gray-500 dark:text-gray-400'>{Teacher.ID}</div>
        </div>
      </Avatar>
    )
}