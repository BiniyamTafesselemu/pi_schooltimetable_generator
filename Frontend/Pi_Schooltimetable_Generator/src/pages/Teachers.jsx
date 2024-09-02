import { useNavigate } from "react-router-dom";
import HeadBan from "../components/HeadBan";
import Avater from "../assets/SGN_11_28_2021_1638110102536(0).jpeg";
import { useState } from "react";

const teachers = [
    {
        "teacherID": "00371",
        "FullName": "Maray Gahama",
        "Subject": ["English", "Amharic"],
        "Grade": ["1", "2"]
    },
    {
        "teacherID": "00372",
        "FullName": "Sara Tesfaye",
        "Subject": ["Mathematics", "Science"],
        "Grade": ["3", "4"]
    },
    {
        "teacherID": "00373",
        "FullName": "Khalid Ibrahim",
        "Subject": ["History"],
        "Grade": ["5", "6"]
    },
    {
        "teacherID": "00374",
        "FullName": "Linda Assefa",
        "Subject": ["Geography", "Social Studies"],
        "Grade": ["7", "8"]
    },
    {
        "teacherID": "00375",
        "FullName": "Abdi Kedir",
        "Subject": ["Physics"],
        "Grade": ["9", "10"]
    },
    {
        "teacherID": "00376",
        "FullName": "Nina Belay",
        "Subject": ["Chemistry", "Biology"],
        "Grade": ["5", "6"]
    },
    {
        "teacherID": "00377",
        "FullName": "Samuel Gashaw",
        "Subject": ["Amharic"],
        "Grade": ["1", "2"]
    },
    {
        "teacherID": "00378",
        "FullName": "Fatima Mohamed",
        "Subject": ["English", "Literature"],
        "Grade": ["7", "8"]
    },
    {
        "teacherID": "00379",
        "FullName": "Yared Tesfaye",
        "Subject": ["Mathematics"],
        "Grade": ["3", "4"]
    },
    {
        "teacherID": "00380",
        "FullName": "Amina Ali",
        "Subject": ["Art"],
        "Grade": ["1", "2"]
    },
    {
        "teacherID": "00381",
        "FullName": "Jemal Abdi",
        "Subject": ["Music"],
        "Grade": ["3", "4"]
    },
    {
        "teacherID": "00382",
        "FullName": "Hanna Biruk",
        "Subject": ["Physical Education"],
        "Grade": ["5", "6"]
    },
    {
        "teacherID": "00383",
        "FullName": "Mekdes Kassa",
        "Subject": ["Social Studies"],
        "Grade": ["7", "8"]
    },
    {
        "teacherID": "00384",
        "FullName": "Tadesse Bekele",
        "Subject": ["Computer Science"],
        "Grade": ["9", "10"]
    },
    {
        "teacherID": "00385",
        "FullName": "Hana Negash",
        "Subject": ["Biology"],
        "Grade": ["3", "4"]
    },
    {
        "teacherID": "00386",
        "FullName": "Dawit Kedir",
        "Subject": ["Chemistry"],
        "Grade": ["5", "6"]
    },
    {
        "teacherID": "00387",
        "FullName": "Selam Tesfaye",
        "Subject": ["English", "History"],
        "Grade": ["7", "8"]
    },
    {
        "teacherID": "00388",
        "FullName": "Mulugeta Beshah",
        "Subject": ["Mathematics", "Physics"],
        "Grade": ["9", "10"]
    },
    {
        "teacherID": "00389",
        "FullName": "Zahra Mohammed",
        "Subject": ["Literature"],
        "Grade": ["1", "2"]
    },
    {
        "teacherID": "00390",
        "FullName": "Teferi Bekele",
        "Subject": ["Amharic"],
        "Grade": ["3", "4"]
    }
  ];

export default function Teachers() {
    const navigate = useNavigate();
    const [selectedGrade, setSelectedGrade] = useState("");
    const [searchQuery, setSearchQuery] = useState(""); // State for search input

    // Filter teachers based on selected grade and search query
    const filteredTeachers = teachers.filter(teacher => {
        const matchesGrade = selectedGrade ? teacher.Grade.includes(selectedGrade) : true;
        const matchesSearch = teacher.FullName.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesGrade && matchesSearch;
    });

    return (
        <div>
            <div className='text-center z-0'>
                <HeadBan title={"Teachers"} />
            </div>
            <div className="flex flex-row justify-evenly my-5 sm:my-8">
                <div>
                    <form className="max-w-md mx-auto">
                        <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                                </svg>
                            </div>
                            <input
                                type="search"
                                id="default-search"
                                className="block w-full rounded-lg px-16 text-sm text-gray-900 border border-gray-700 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Teacher Name"
                                required
                                value={searchQuery} // Controlled input
                                onChange={(e) => setSearchQuery(e.target.value)} // Update state on change
                            />
                        </div>
                    </form>
                </div>
                <div className="flex items-center ">
                    <button type="button" onClick={() => navigate('/AddTeachers')} className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">Add</button>
                </div>
            </div>
            <div className="w-[95%] mx-auto">
                    <hr/>
                </div>
            <div className="w-[90%] mx-auto my-2 sm:my-5">
                <div className="flex justify-end text-xl my-2">
                    <form className="max-w-sm ">
                        <select 
                            id="class" 
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            onChange={(e) => setSelectedGrade(e.target.value)} // Update state on change
                        >
                            <option value="">Select Grade</option>
                            {/* ... other grade options */}
                        </select>
                    </form>
                </div>

                <div className="bg-[#F1F1F1] px-2 py-5 shadow-md gap-2 sm:gap-5">
                    {filteredTeachers.map((teacher) => (
                        <div 
                            key={teacher.teacherID} 
                            onClick={() => navigate(`/TeacherProfile/${teacher.teacherID}`, { state: { teacher } })} // Pass teacher data
                            className="bg-white border hover:bg-purple-300 border-purple-400 w-[80%] mx-auto flex flex-row justify-between hover:w-[85%]"
                        >
                            <div className="flex flex-row px-5">
                                <div className="flex items-center align-middle">
                                    <img className="rounded-full h-16 w-16" src={Avater} alt="" />
                                </div>
                                <div className="flex flex-col justify-start p-2">
                                    <h1 className="mb-1 text-xl text-gray-900 dark:text-white">{teacher.FullName}</h1>
                                    <h2 className="mb-2 font-normal text-gray-700 dark:text-gray-400">{teacher.Subject.join(', ')}</h2>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}