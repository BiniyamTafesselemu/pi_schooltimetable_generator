import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import HeadBan from "../components/HeadBan";

// Subjects array
const subjects = [
    {
        section_category: "1",
        subjects: ["English", "Mathematics", "Biology"]
    },
    {
        section_category: "2",
        subjects: ["Civics", "Geography", "Physics"]
    },
    {
        section_category: "3",
        subjects: ["History", "Literature", "Chemistry"]
    },
    {
        section_category: "4",
        subjects: ["Art", "Music", "Physical Education"]
    },
    {
        section_category: "5",
        subjects: ["Computer Science", "Economics", "Psychology"]
    }
];

function AddTeacher() {
    const navigate = useNavigate();
    const fileInputRef = useRef(null);
    const [fileURL, setFileURL] = useState(""); 
    const [selectedSubjects, setSelectedSubjects] = useState([]); 
    const [teacherName, setTeacherName] = useState(""); 
    const [email, setEmail] = useState(""); 
    const [dob, setDob] = useState(""); 
    const [isMainDropdownOpen, setMainDropdownOpen] = useState(false);
    const [selectedSection, setSelectedSection] = useState('');
    const [isSubDropdownOpen, setSubDropdownOpen] = useState(false);
    const [subDropdownTop, setSubDropdownTop] = useState(0); // To set the top position of the sub-dropdown
    const sectionRefs = useRef([]); // Store refs for each section button

    const handleIconClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setFileURL(url);
        } else {
            setFileURL("");
        }
    };

    const handleSubjectChange = (subject) => {
        if (subject && !selectedSubjects.includes(subject)) {
            setSelectedSubjects([...selectedSubjects, subject]);
        }
    };

    const removeSubject = (subjectToRemove) => {
        setSelectedSubjects(selectedSubjects.filter(subject => subject !== subjectToRemove));
    };

    const handleAdd = () => {
        console.log("Add Teacher Data:", {
            teacherName,
            email,
            dob,
            selectedSubjects,
            fileURL
        });
        navigate(-1);
    };

    const toggleMainDropdown = () => {
        setMainDropdownOpen(!isMainDropdownOpen);
        setSubDropdownOpen(false); // Close sub-dropdown if main is toggled
    };

    const toggleSubDropdown = (section, index) => {
        setSelectedSection(section);
        setSubDropdownOpen(!isSubDropdownOpen);

        // Calculate the top position based on the clicked section's position
        if (sectionRefs.current[index]) {
            const sectionRect = sectionRefs.current[index].getBoundingClientRect();
            const dropdownRect = sectionRefs.current[0].parentNode.getBoundingClientRect(); // Dropdown container
            setSubDropdownTop(sectionRect.top - dropdownRect.top); // Calculate top offset
        }
    };

    return (
        <div>
            <div className='text-center z-0'>
                <HeadBan title={" Add Teacher "} />
                <div className="w-[90%] mx-auto my-10">
                    <div className="flex justify-start text-xl my-2">
                        <h1>Add Personal Information</h1>
                    </div>
                    <div className="bg-[#F1F1F1] py-5 border border-gray-600 shadow-md px-[10%]">
                        <div className="flex gap-5 sm:flex-row sm:justify-between">
                            <div className="flex gap-3">
                                <div>
                                    <label className="text-pretty text-sm"> Add photo
                                        <div className="flex justify-center items-center" onClick={handleIconClick}>
                                            {fileURL ? (
                                                <img src={fileURL} alt="Selected" className="w-16 h-16 rounded-full" />
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
                                        style={{ display: 'none' }}
                                        accept="image/*"
                                    />
                                </div>
                                <div className="font-medium dark:text-white">
                                    <div className="flex flex-col sm:flex-row sm:gap-2">
                                        <div className="my-1">
                                            <input
                                                type="text"
                                                value={teacherName} 
                                                onChange={(e) => setTeacherName(e.target.value)}
                                                placeholder="Teacher full Name" 
                                                className="w-[100%] border border-purple-300 mb-1 py-2 rounded-md text-center" 
                                            />
                                            <input 
                                                type="text"
                                                value={email} 
                                                onChange={(e) => setEmail(e.target.value)}
                                                placeholder="Email" 
                                                className="w-[100%] border border-purple-300 mb-1 py-2 rounded-md text-center" 
                                            />
   
                                        </div>
                                        <div className="my-1">
                                            <input 
                                                type="date"
                                                value={dob} 
                                                onChange={(e) => setDob(e.target.value)}
                                                className="w-[100%] border border-purple-300 mb-1 rounded-md text-center" 
                                            />

                                            {/* Main Dropdown for Section Categories */}
                                            
                                    </div>
                                </div>
                                
                                            <div className=" flex flex-row  w-[100%] justify-between">
                                            <div className="relative inline-block text-left mx-[5%]">
                                                <button
                                                    id="multiLevelDropdownButton"
                                                    onClick={toggleMainDropdown}
                                                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex items-center"
                                                    type="button"
                                                >
                                                    Select Section
                                                    <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                                                    </svg>
                                                </button>

                                                {/* Main Dropdown Menu */}
                                                {isMainDropdownOpen && (
                                                    <div className="absolute z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44">
                                                        <ul className="py-2 text-sm text-gray-700" aria-labelledby="multiLevelDropdownButton">
                                                            {subjects.map((section, index) => (
                                                                <li key={section.section_category}>
                                                                    <button
                                                                        ref={(el) => sectionRefs.current[index] = el} // Attach ref to each section
                                                                        onClick={() => toggleSubDropdown(section.section_category, index)}
                                                                        className="flex items-center justify-between w-full px-4 py-2 hover:bg-gray-100"
                                                                    >
                                                                        Section {section.section_category}
                                                                        <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                                                                        </svg>
                                                                    </button>

                                                                    {/* Sub Dropdown Menu */}
                                                                    {isSubDropdownOpen && selectedSection === section.section_category && (
                                                                        <div 
                                                                            className="absolute left-full z-20 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 ml-2"
                                                                            style={{ top: subDropdownTop + "px" }} // Set dynamic top position
                                                                        >
                                                                            <ul className="py-2 text-sm text-gray-700">
                                                                                {section.subjects.map((subject) => (
                                                                                    <li key={subject}>
                                                                                        <button
                                                                                            onClick={() => handleSubjectChange(subject)}
                                                                                            className="block px-4 py-2 hover:bg-gray-100"
                                                                                        >
                                                                                            {subject}
                                                                                        </button>
                                                                                    </li>
                                                                                ))}
                                                                            </ul>
                                                                        </div>
                                                                    )}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="my-4 sm:mx-[60%]">
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

                        <div className="flex justify-end my-[3%] mr-[3%]">
                            <button onClick={handleAdd} className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 rounded-lg py-2 px-4">Add</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddTeacher;

