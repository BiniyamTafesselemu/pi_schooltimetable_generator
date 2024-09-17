import React, { useState, useEffect } from 'react';
import HeadBan from "../components/HeadBan";
import onelove from "../assets/SGN_11_28_2021_1638110102536(0).jpeg";
import { useParams, useLocation, useNavigate } from "react-router-dom";

function TeacherProfile({ onUpdate }) {
    const navigate = useNavigate();
    const { teacherID } = useParams();
    const location = useLocation();
    const [teacher, setTeacher] = useState(location.state.teacher);
    const [subjects, setSubjects] = useState([]);

    useEffect(() => {
        if (teacher) {
            setSubjects(teacher.Subject);
        } else {
            setTeacher(null);
        }
    }, [teacher]);

    const handleUpdate = (updatedTeacher) => {
        setTeacher(updatedTeacher);
        // Here you can also update the global teachers array or state if needed
    };

    if (!teacher) return <div>Loading...</div>;

    return (
        <div>
            <div className='text-center z-0'>
                <HeadBan title={"Teacher Profile"} />
                <div className="w-[90%] mx-auto my-10">
                    <div className="flex justify-start text-xl my-2">
                        <h1>Personal Information</h1>
                    </div>
                    <div className="bg-[#F1F1F1] px-2 py-5 border border-gray-600 shadow-md">
                        <div className="flex gap-5 sm:flex-row sm:justify-between ">
                            <div className="flex items-center gap-3">
                                <img className="w-20 h-20 rounded-full" src={onelove} alt="" />
                                <div className="font-medium dark:text-white">
                                    <h1 className="text-lg my-1">{teacher.FullName}</h1>
                                    <h1 className="text-md text-gray-500 dark:text-gray-400 my-1">ID: {teacher.teacherID}</h1>
                                    <select value={teacher.Subject} className="block w-full p-2 border border-gray-300 rounded-md">
                                        {subjects.map((subject, index) => (
                                            <option key={index} value={subject}>{subject}</option>
                                        ))}
                                    </select>
                                </div>
                                
                            </div>
                            <div >
                                    <svg onClick={() => navigate("/TeacherEdit", { state: { teacher }, onUpdate: handleUpdate })} className="w-10 h-10 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"/>
                                    </svg>
                                </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TeacherProfile;