import React, {useState} from 'react'
import HeadBan from '../components/HeadBan'

export default function ContactUs() {


  return (
    <div>
        <div className=' bg-slate-200'>  
            <div className= 'z-20 text-center'>
                <HeadBan title={"Contact Us"}/>
            </div>
            <div className='h-96'>
            <div className="  w-[100%]  h-[55%] flex justify-center items-center ">
                <p className="text-center w-[65%] text-lg text-pretty">
                Spectrum is a leading internet provider offering high-speed connectivity and reliable service for homes and businesses across the Ethiopia.
                </p>
            </div>


            <div className="  w-[100%] text-center h-[100%] ">
            <div className="bg-white shadow-md rounded-lg p-6  w-[85%] mx-auto  ">
            <h2 className="text-xl font-semibold mb-4">Get in Touch</h2>
            <div className='sm:flex '>
            <div className="mt-4 sm:w-[35%]">
            <div className='flex justify-center items-center'>
            <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 8v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8m18 0-8.029-4.46a2 2 0 0 0-1.942 0L3 8m18 0-9 6.5L3 8"/>
</svg>

            </div>
            <h2 className="text-lg font-semibold">Email us</h2>    
            <p>Email us for general queries, including marketing and partnership opportunities.</p>
            <p className="text-blue-600 mb-2">spectrum@gmail.com</p>
            </div>
    
            <div className="mt-4 sm:w-[35%]">
            <div className='flex justify-center items-center'>
            <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.427 14.768 17.2 13.542a1.733 1.733 0 0 0-2.45 0l-.613.613a1.732 1.732 0 0 1-2.45 0l-1.838-1.84a1.735 1.735 0 0 1 0-2.452l.612-.613a1.735 1.735 0 0 0 0-2.452L9.237 5.572a1.6 1.6 0 0 0-2.45 0c-3.223 3.2-1.702 6.896 1.519 10.117 3.22 3.221 6.914 4.745 10.12 1.535a1.601 1.601 0 0 0 0-2.456Z"/>
</svg>

            </div>
              <h2 className="text-lg font-semibold">Call us</h2>
              <p>Call us to speak to a member of our team.</p>
              <p className="text-blue-600 mb-2">+251-786-5000</p>
              </div>
    
            <div className="mt-4 sm:w-[35%]">
            <div className='flex justify-center items-center'>
            <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
  <path fill-rule="evenodd" d="M10 2a3 3 0 0 0-3 3v1H5a3 3 0 0 0-3 3v2.382l1.447.723.005.003.027.013.12.056c.108.05.272.123.486.212.429.177 1.056.416 1.834.655C7.481 13.524 9.63 14 12 14c2.372 0 4.52-.475 6.08-.956.78-.24 1.406-.478 1.835-.655a14.028 14.028 0 0 0 .606-.268l.027-.013.005-.002L22 11.381V9a3 3 0 0 0-3-3h-2V5a3 3 0 0 0-3-3h-4Zm5 4V5a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v1h6Zm6.447 7.894.553-.276V19a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3v-5.382l.553.276.002.002.004.002.013.006.041.02.151.07c.13.06.318.144.557.242.478.198 1.163.46 2.01.72C7.019 15.476 9.37 16 12 16c2.628 0 4.98-.525 6.67-1.044a22.95 22.95 0 0 0 2.01-.72 15.994 15.994 0 0 0 .707-.312l.041-.02.013-.006.004-.002.001-.001-.431-.866.432.865ZM12 10a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2H12Z" clip-rule="evenodd"/>
</svg>

            </div>
              <h2 className="text-lg font-semibold">Support</h2>
              <p>Email us for support:</p>
              <p className="text-blue-600">supportspectrum@gmil.com</p>
            </div>
            </div>
          </div>
            </div>
            </div>
        </div>
    </div>
  )
}
