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
      <div>
        <nav>
          <Side/>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Sections" element={<Class />} />
          <Route path="/Subjects" element={<Subjects />} />
          <Route path="/Teachers" element={<Teachers />} />
        </Routes>
      </div>
    </>
  )
}

export default App
