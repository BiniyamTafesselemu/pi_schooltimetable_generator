import './App.css'
import { Routes, Route, useLocation } from 'react-router-dom';

import Home from './Home.jsx';

import Side from './components/Side.jsx';
import Dashboard from './pages/Dashboard.jsx';
import FixError from './pages/FixError.jsx';
import PaymentHistory from './pages/PaymentHistory.jsx';
import ContactUs from './pages/ContactUs.jsx';
import Profile from './pages/Profile.jsx';
import Login from './components/login.jsx';

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
            <Route path="/Dashboard" element={<Dashboard />} />
            <Route path="/FixError" element={<FixError />} />
            <Route path="/PaymentHistory" element={<PaymentHistory />} />
            <Route path= "/ContactUs" element={<ContactUs/>}/>
            <Route path= "/Profile" element={<Profile/>}/>
            <Route path="/Login" element={<Login/>}/>
          </Routes>
        </div>
      </div>
    </div>
  )
}

export default App;
