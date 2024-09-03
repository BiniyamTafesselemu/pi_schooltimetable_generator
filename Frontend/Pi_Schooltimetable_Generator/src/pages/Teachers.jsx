import { useNavigate } from "react-router-dom";
import HeadBan from "../components/HeadBan";
import Avater from "../assets/SGN_11_28_2021_1638110102536(0).jpeg";
import { useState, useEffect } from "react";

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
    const [searchQuery, setSearchQuery] = useState(""); 
    const [currentIndex, setCurrentIndex] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(3);

    useEffect(() => {
        // Dynamically set items per page based on screen width
        const updateItemsPerPage = () => {
            if (window.innerWidth >= 1024) {
                setItemsPerPage(3);
            } else if (window.innerWidth >= 768) {
                setItemsPerPage(2);
            } else {
                setItemsPerPage(1);
            }
        };

        updateItemsPerPage();
        window.addEventListener('resize', updateItemsPerPage);
        return () => window.removeEventListener('resize', updateItemsPerPage);
    }, []);

    const filteredTeachers = teachers.filter(teacher => {
        const matchesGrade = selectedGrade ? teacher.Grade.includes(selectedGrade) : true;
        const matchesSearch = teacher.FullName.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesGrade && matchesSearch;
    });

    const nextSlide = () => {
        if (currentIndex + itemsPerPage < filteredTeachers.length) {
            setCurrentIndex(currentIndex + itemsPerPage);
        }
    };

    const prevSlide = () => {
        if (currentIndex - itemsPerPage >= 0) {
            setCurrentIndex(currentIndex - itemsPerPage);
        }
    };

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
                                value={searchQuery} 
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </form>
                </div>
                <div className="flex items-center ">
                    <button type="button" onClick={() => navigate('/AddTeachers')} className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">Add</button>
                </div>
            </div>

            {/* Image Carousel */}
            <div className="flex flex-row items-center">
                <button type="button" onClick={prevSlide} className="z-10 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-prev>
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                        <svg className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4"/>
                        </svg>
                        <span className="sr-only">Previous</span>
                    </span>
                </button>
                
                <div className="bg-[#F1F1F1] px-2 py-5 shadow-md gap-2 w-[90%] mx-auto flex justify-center">
                    <div className="flex justify-between flex-wrap">
                        {filteredTeachers.slice(currentIndex, currentIndex + itemsPerPage).map((teacher) => (
                            <div 
                                key={teacher.teacherID} 
                                onClick={() => navigate(`/TeacherProfile/${teacher.teacherID}`, { state: { teacher } })}
                                className="bg-white border hover:bg-purple-300 border-purple-400 w-auto mx-auto my-2 flex flex-col justify-between"
                            >
                                <div className="flex flex-col items-center p-2">
                                    <img className="h-60 w-52 sm:h-72 sm:w-full" src={Avater} alt="" />
                                    <h1 className="mb-1 text-xl text-gray-900">{teacher.FullName}</h1>
                                    <h2 className="mb-2 font-normal text-gray-700">{teacher.Subject.join(', ')}</h2>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <button type="button" onClick={nextSlide} className="end-0 flex items-center justify-center h-full ml-[1%] mr-[2%] cursor-pointer group focus:outline-none" data-carousel-next>
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                        <svg className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
                        </svg>
                        <span className="sr-only">Next</span>
                    </span>
                </button>
            </div>

            <div className="w-[95%] mx-auto mt-3 sm:mt-5">
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
                            <option value="1">Grade 1</option>
                            <option value="2">Grade 2</option>
                            <option value="3">Grade 3</option>
                            <option value="4">Grade 4</option>
                            <option value="5">Grade 5</option>
                            <option value="6">Grade 6</option>
                            <option value="7">Grade 7</option>
                            <option value="8">Grade 8</option>
                            <option value="9">Grade 9</option>
                            <option value="10">Grade 10</option>

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
