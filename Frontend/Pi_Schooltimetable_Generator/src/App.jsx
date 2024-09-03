import './App.css'
import { Routes, Route } from 'react-router-dom';

import Home from './Home.jsx';
import Test from './Test.jsx';

import Side from './components/Side.jsx';
import Class from './pages/Class.jsx';
import Subjects from './pages/Subjects.jsx';
import Teachers from './pages/Teachers.jsx';

function App() {
  return (
    <>
      <div className='flex md:flex-row flex-col h-screen bg-[#DCD4F1]'>
        <div className='m-0 px-0 py-0 md:h-full h-[0rem] w-[0rem] overflow-x-hidden md:w-fit'>
          <Side/>
        </div>
        <div className='md:flex-1 overflow-y-auto'>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Sections" element={<Class />} />
            <Route path="/Subjects" element={<Subjects />} />
            <Route path="/Teachers" element={<Teachers />} />
          </Routes>
        </div>
      </div>
    </>
  )
}

export default App
