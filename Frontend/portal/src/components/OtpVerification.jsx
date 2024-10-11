import { useNavigate } from "react-router-dom";
import React, { useState } from 'react';
import ReactDom from 'react-dom';
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

export default function OtpVerification({ open, onClose, userId }) {
    const [otp, setOtp] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        {console.log('User ID:', userId);
            console.log('Submitting OTP:', otp);}

        // Check if userId is defined
        if (!userId) {
            setError('User ID is not defined.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:8000/verify-otp', { user_id: userId, otp });
            const { token } = response.data;

            // Store the token if necessary (e.g., localStorage)
            localStorage.setItem('token', token);

            // Navigate to the dashboard
            navigate('/Dashboard');
        } catch (err) {
            if (err.response) {
                setError(err.response.data.error || 'Invalid OTP. Please try again.');
            } else {
                setError('Something went wrong. Please try again later.');
            }
        }
    };

    // Log userId and OTP for debugging
    console.log('User ID:', userId);
    console.log('Submitting OTP:', otp);

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
                    <h1 className="text-4xl font-bold text-center text-purple-700 mb-8">OTP Verification</h1>
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label className="block text-gray-700 font-bold mb-2" htmlFor="otp">
                                Enter OTP
                            </label>
                            <input
                                className="w-full px-4 py-2 rounded-lg border border-gray-400"
                                id="otp"
                                name="otp"
                                type="text"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                required
                                pattern="\d{6}" // Assuming OTP is 6 digits
                                title="Please enter a 6-digit OTP"
                            />
                        </div>
                        {error && <p className="text-red-600">{error}</p>}
                        <div>
                            <button type="submit" className="w-full bg-purple-700 hover:bg-purple-900 text-white font-bold py-2 px-4 rounded-lg">
                                Verify OTP
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>,
        document.getElementById('portal')
    );
}