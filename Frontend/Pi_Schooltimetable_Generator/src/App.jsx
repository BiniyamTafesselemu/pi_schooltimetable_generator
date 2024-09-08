import './App.css'
import { Routes, Route, useLocation } from 'react-router-dom';

import Home from './Home.jsx';
import Test from './Test.jsx';

import Side from './components/Side.jsx';
import Class from './pages/Class.jsx';
import Subjects from './pages/Subjects.jsx';
import Teachers from './pages/Teachers.jsx';
import TeacherProfile from './pages/TeacherProfile.jsx';
import TeacherEdit from './components/TeacherEdit.jsx';
import AddTeacher from './pages/AddTeacher.jsx';
import Generate from './pages/Generate.jsx';

function App() {
  const location = useLocation();
  return (
    <div>
      <div className='flex md:flex-row flex-col h-screen bg-[#DCD4F1]'>
      {location.pathname !== '/' &&
        (<div className='m-0 px-0 py-0 md:h-full h-[0rem] w-[0rem] overflow-x-hidden md:w-fit'>
          <Side/>
        </div>)
      }
        <div className='md:flex-1 overflow-y-auto overflow-x-hidden'>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Sections" element={<Class />} />
            <Route path="/Subjects" element={<Subjects />} />
            <Route path="/Teachers" element={<Teachers />} />
            <Route path="/AddTeachers" element={<AddTeacher/>} />
            <Route path="/TeacherProfile/:teacherID" element={<TeacherProfile/>}/>
            <Route path="TeacherEdit" element={<TeacherEdit/>}/>
            <Route path= "/GenerateSchedule" element={<Generate/>}/>
          </Routes>
        </div>
      </div>
    </div>
  )
}

export default App;
