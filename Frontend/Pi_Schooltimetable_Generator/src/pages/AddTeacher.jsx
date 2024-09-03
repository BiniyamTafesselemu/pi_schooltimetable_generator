import { useNavigate } from "react-router-dom";
import  { useRef, useState } from "react";
import HeadBan from "../components/HeadBan";

// Subjects array
const subjects = [
    "Mathematics "+ "Catregory1",
    "Mathematics "+ "Catregory3",
    "Mathematics "+ "Catregory4",
    "Mathematics "+ "Catregory5",
    "English",
    "Science",
    "History",
    "Geography",
    "Physics",
    "Chemistry",
    "Biology",
    "Computer Science",
    "Art",
    "Music",
    "Physical Education",
    "Economics",
    "Psychology",
    "Sociology"
];

function AddTeacher() {
    const navigate = useNavigate();
    const fileInputRef = useRef(null);
    const [fileURL, setFileURL] = useState(""); // State to hold the selected image URL
    const [selectedSubjects, setSelectedSubjects] = useState([]); // State to hold selected subjects
    const [teacherName, setTeacherName] = useState(""); // State for teacher's name
    const [email, setEmail] = useState(""); // State for email
    const [dob, setDob] = useState(""); // State for date of birth

    const handleIconClick = () => {
        fileInputRef.current.click(); // Trigger the file input click
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const url = URL.createObjectURL(file); // Create a URL for the selected file
            setFileURL(url); // Update the state with the image URL
        } else {
            setFileURL(""); // Reset state if no file is selected
        }
    };

    const handleSubjectChange = (event) => {
        const subject = event.target.value;
        if (subject && !selectedSubjects.includes(subject)) {
            setSelectedSubjects([...selectedSubjects, subject]); // Add selected subject to the array
        }
        event.target.value = ""; // Reset the select input
    };

    const removeSubject = (subjectToRemove) => {
        setSelectedSubjects(selectedSubjects.filter(subject => subject !== subjectToRemove)); // Remove subject from the array
    };

    const handleAdd = () => {
        // Save logic (e.g., send updated data to backend)
        console.log("Add Teacher Data:", {
            teacherName,
            email,
            dob,
            selectedSubjects,
            fileURL // You can handle the file upload here
        });
        navigate(-1); // Go back to the previous page
    };

    return (
        <div>
            <div className='text-center z-0'>
                <HeadBan title={" Add Teacher "} />
                <div className="w-[90%] mx-auto my-10">
                    <div className="flex justify-start text-xl my-2">
                        <h1>Add Personal Information</h1>
                    </div>
                    <div className="bg-[#F1F1F1] py-5 border border-gray-600 shadow-md px-[10%] ">
                        <div className="flex gap-5 sm:flex-row sm:justify-between">
                            <div className="flex gap-3">
                                <div>
                                    <label className="text-pretty text-sm"> Add photo
                                        <div className="flex justify-center items-center" onClick={handleIconClick}>
                                            {fileURL ? (
                                                <img 
                                                    src={fileURL} 
                                                    alt="Selected" 
                                                    className="w-16 h-16 rounded-full" // Display the image with rounded corners
                                                />
                                            ) : (
                                                <svg className="w-16 h-16 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0 0a8.949 8.949 0 0 0 4.951-1.488A3.987 3.987 0 0 0 13 16h-2a3.987 3.987 0 0 0-3.951 3.512A8.948 8.948 0 0 0 12 21Zm3-11a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
                                                </svg>
                                            )}
                                        </div>
                                    </label>
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        onChange={handleFileChange}
                                        style={{ display: 'none' }} // Hide the file input
                                        accept="image/*" // Accept image files
                                    />
                                </div>
                                <div className="font-medium dark:text-white">
                                    <div className="flex flex-col sm:flex-row sm:gap-2">
                                        <div className="my-1">
                                            <input
                                                type="text"
                                                value={teacherName} 
                                                onChange={(e) => setTeacherName(e.target.value)} // Update state on change
                                                placeholder="Teacher full Name" 
                                                className="w-[100%] border border-purple-300 mb-1 py-2 rounded-md text-center" 
                                            />
                                            <input 
                                                type="text"
                                                value={email} 
                                                onChange={(e) => setEmail(e.target.value)} // Update state on change
                                                placeholder="Email" 
                                                className="w-[100%] border border-purple-300 mb-1 py-2 rounded-md text-center" 
                                            />
                                        </div>
                                        <div className="my-1">
                                            <input 
                                                type="date"
                                                value={dob} 
                                                onChange={(e) => setDob(e.target.value)} // Update state on change
                                                placeholder="Date of birth"
                                                className="w-[100%] border border-purple-300 mb-1 rounded-md text-center" 
                                            />
                                            <select 
                                                onChange={handleSubjectChange} // Update state on change
                                                className="block w-full p-2 border border-gray-300 mb-1 rounded-md"
                                            >
                                                <option value="">Select a subject</option>
                                                {subjects.map((subject, index) => (
                                                    <option key={index} value={subject}>{subject}</option>
                                                ))}
                                            </select>
                                            <div className="my-4">
                                                <div className="flex flex-wrap gap-2">
                                                    {selectedSubjects.map((subject, index) => (
                                                        <div key={index} className="flex items-center bg-gray-200 rounded-md p-2">
                                                            <span>{subject}</span>
                                                            <button 
                                                                onClick={() => removeSubject(subject)} 
                                                                className="ml-2 text-red-500 hover:text-red-700"
                                                            >
                                                                &times; {/* Remove icon */}
                                                            </button>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                   
                    <div className="flex justify-end my-[3%] mr-[3%]">
                        <button onClick={handleAdd} className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 rounded-lg py-2 px-4">Add</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddTeacher;