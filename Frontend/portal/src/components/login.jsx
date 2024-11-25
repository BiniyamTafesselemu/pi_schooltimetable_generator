import React, { useState } from 'react';
import ReactDom from 'react-dom';
import OtpVerification from './OtpVerification'; // Import the OTP component
import axios from 'axios'; // Import Axios for API calls

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
    height: '75%',
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

export default function Login({ open, onClose }) {
    const [isOtpOpen, setIsOtpOpen] = useState(false);
    const [userId, setUserId] = useState('');
    const [phone, setPhone] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');

        try {
            const response = await axios.post('http://localhost:8000/login', { user_id: userId, phone_number: phone });
            if (response.data.message) {
                setSuccessMessage(response.data.message);
                setIsOtpOpen(true);
            } else {
                setError(response.data.error || 'Something went wrong. Please check your User ID or Phone number.');
            }
        } catch (err) {
            setError('Something went wrong. Please try again later.');
            console.error('Login error:', err); // Log the error for debugging
        }
    };

    if (!open) return null;

    return ReactDom.createPortal(
        <>
            <div style={OVERLAY_STYLES}></div>
            <div style={MODAL_STYLES}>
                <div className='flex justify-between items-center mb-4'>
                    <button onClick={onClose} style={CLOSE_BUTTON_STYLES}>
                        <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L17.94 6M18 18L6.06 6" />
                        </svg>
                    </button>
                </div>

                <div className="flex flex-col justify-center items-center">
                    <h1 className="text-4xl font-bold text-center text-purple-700 mb-2">Welcome</h1>
                    {error && <p className="text-sm text-red-600">{error}</p>}
                    {successMessage && <p className="text-sm text-green-600">{successMessage}</p>}
                    <form className="space-y-6" onSubmit={handleLogin}>
                        <div>
                            <label className="block text-gray-700 font-bold mb-2" htmlFor="userId">
                                User ID
                            </label>
                            <input
                                className="w-full px-4 py-2 rounded-lg border border-gray-400"
                                id="userId"
                                name="userId"
                                type="text"
                                value={userId}
                                onChange={(e) => setUserId(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-bold mb-2" htmlFor="phone">
                                Phone number
                            </label>
                            <input
                                className="w-full px-4 py-2 rounded-lg border border-gray-400"
                                id="phone"
                                name="phone"
                                type="text"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                required
                            />
                        </div>
                       
                        <div>
                            <button className="w-full bg-purple-700 hover:bg-purple-900 text-white font-bold py-2 px-4 rounded-lg">
                                Log In
                            </button>
                        </div>
                    </form>
                </div>

                {/* Render the OTP Verification Modal */}
                <OtpVerification open={isOtpOpen} onClose={() => setIsOtpOpen(false)} userId={userId} />
            </div>
        </>,
        document.getElementById('portal')
    );
}