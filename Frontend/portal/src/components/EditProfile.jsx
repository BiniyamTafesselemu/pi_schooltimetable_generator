import React, { useState } from 'react';
import ReactDom from 'react-dom';

const MODAL_STYLES = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#fff',
    padding: '1rem',
    borderRadius: '10px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
    zIndex: 1000,
    width: '90%', // Responsive width
    maxWidth: '400px', // Max width for larger screens
    height : '75%'
};

const OVERLAY_STYLES = {
    position: 'fixed',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    zIndex: 1000,
};

const CLOSE_BUTTON_STYLES = {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    border: 'none',
    borderRadius: '50%',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
    padding: '0.5rem',
    cursor: 'pointer',
};

export default function EditProfile({ open, onClose }) {
    const [isOtpOpen, setIsOtpOpen] = useState(false);

    const handleLogin = (e) => {
        e.preventDefault();
        // Assuming login is successful, open OTP modal
        setIsOtpOpen(true);
        // You might also want to send the login data to your server here
    };

    if (!open) return null;

    return ReactDom.createPortal(
        <>
            <div style={OVERLAY_STYLES}></div>
            <div style={MODAL_STYLES}>
                <div className='flex justify-between items-center mb-4'>
                    <button  onClick={onClose} style={CLOSE_BUTTON_STYLES}>
                        <svg className=" w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L17.94 6M18 18L6.06 6" />
                        </svg>
                    </button>
                </div>
                <div>
                <h1 className='text-xl'>NOTIFICATION</h1>
                <div className="w-[100%] mx-auto my-[2%]">
                    <hr/>
                </div>
                <p> Please Contact Customer Care to Updata Your Detail.Thank You!</p>
                </div>

            </div>
        </>,
        document.getElementById('portal')
    );
}
