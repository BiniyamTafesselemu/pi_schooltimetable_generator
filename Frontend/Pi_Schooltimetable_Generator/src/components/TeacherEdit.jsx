import React, { useState, useEffect } from 'react';
import onelove from "../assets/SGN_11_28_2021_1638110102536(0).jpeg";
import HeadBan from "./HeadBan";
import { useLocation, useNavigate } from "react-router-dom";

function TeacherEdit() {
    const location = useLocation();
    const navigate = useNavigate();
    const { teacher } = location.state; // Get teacher data from state
    const [name, setName] = useState(teacher.FullName);
    const [subjects, setSubjects] = useState(teacher.Subject);
    const [newSubject, setNewSubject] = useState("");

    const handleAddSubject = (e) => {
        e.preventDefault();
        if (newSubject && !subjects.includes(newSubject)) {
            setSubjects([...subjects, newSubject]);
            setNewSubject("");
        }
    };

    const handleDeleteSubject = (subjectToDelete) => {
        setSubjects(subjects.filter(subject => subject !== subjectToDelete));
    };

    const handleSave = () => {
        // Save logic (e.g., send updated data to backend)
        console.log("Updated Teacher Data:", { name, subjects });
        navigate(-1); // Go back to the profile page
    };

    return (
        <div>
            <div className='text-center z-0'>
                <HeadBan title={"Teacher Edit"} />
                <div className="w-[90%] mx-auto my-10">
                    <div className="flex justify-start text-xl my-2">
                        <h1>Edit Personal Information</h1>
                    </div>
                    <div className="bg-[#F1F1F1]  py-5 border border-gray-600 shadow-md px-[10%] ">
                        <div className="flex gap-5 sm:flex-row sm:justify-between">
                            <div className="flex  gap-3">
                                <img className="h-20 sm:h-40 w-20 sm:w-40 rounded-full items-center align-middle" src={onelove} alt="" />
                                <div className="font-medium dark:text-white">
                                    <input 
                                        value={name} 
                                        onChange={(e) => setName(e.target.value)} 
                                        placeholder="Teacher Name" 
                                        className="w-[100%] border border-purple-300 my-4 rounded-md text-center" 
                                    />
                                    <select 
                                        value={subjects[0]} 
                                        onChange={(e) => setSubjects([e.target.value])} 
                                        className="block w-full p-2 border border-gray-300 rounded-md"
                                    >
                                        {subjects.map((subject, index) => (
                                            <option key={index} value={subject}>{subject}</option>
                                        ))}
                                    </select>
                                    <input 
                                        value={newSubject} 
                                        onChange={(e) => setNewSubject(e.target.value)} 
                                        placeholder="Add Subject" 
                                        className="w-[100%] border border-purple-300 my-4 rounded-md text-center" 
                                    />
                                    <button onClick={handleAddSubject} className="mt-2 px-4 py-2 bg-green-500 text-white rounded-md">Add Subject</button>
                                    <ul>
                                        {subjects.map((subject, index) => (
                                            <li key={index} className="flex justify-between items-center">
                                                <span>{subject}</span>
                                                <button onClick={() => handleDeleteSubject(subject)} className="text-red-500">Delete</button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end my-[3%] mr-[3%]">
                        <button onClick={handleSave} className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 rounded-lg py-2 px-4">Save</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TeacherEdit;