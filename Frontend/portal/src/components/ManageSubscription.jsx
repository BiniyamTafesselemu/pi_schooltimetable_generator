import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'; // Import Axios

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
    width: '90%',
    maxWidth: '400px',
    height: '75%',
    overflow: 'auto',
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

export default function ManageSubscription({ open, onClose }) {
    const [currentStep, setCurrentStep] = useState(0);
    const [selectedPlan, setSelectedPlan] = useState('');
    const [packages, setPackages] = useState([]);
    const [currentSubscription, setCurrentSubscription] = useState({});

    useEffect(() => {
        const fetchPackages = async () => {
            try {
                const response = await axios.get('http://localhost:8000/packages');
                setPackages(response.data);
                if (response.data.length > 0) {
                    setSelectedPlan(response.data[0].id);
                }
            } catch (error) {
                console.error('Error fetching packages:', error);
            }
        };

        const fetchCurrentSubscription = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:8000/dashboard', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setCurrentSubscription(response.data);
            } catch (error) {
                console.error('Error fetching current subscription:', error);
            }
        };

        fetchPackages();
        fetchCurrentSubscription();
    }, []);

    useEffect(() => {
        if (open) {
            // Reset to initial state when modal opens
            setCurrentStep(0);
            setSelectedPlan(packages.length > 0 ? packages[0].id : '');
        }
    }, [open, packages]);

    const steps = [
        {
            title: 'Current Subscription',
            content: (
                <div>
                    <p><strong>Current Plan:</strong> {currentSubscription.package?.speed || 'Loading...'}</p>
                    <p><strong>Price:</strong> {currentSubscription.package?.total_price || 'Loading...'} Birr</p>
                    <p><strong>Next Billing Date:</strong> {currentSubscription.due_date || 'Loading...'}</p>
                </div>
            ),
        },
        {
            title: 'Select New Plan',
            content: (
                <div>
                    <label className="block">
                        Select Plan:
                        <select
                            value={selectedPlan}
                            onChange={(e) => setSelectedPlan(e.target.value)}
                            className="border rounded p-2 w-full text-sm md:text-base"
                        >
                            {packages.map((pkg) => (
                                <option key={pkg.package_id} value={pkg.package_id}>
                                    {pkg.package_speed} - {pkg.price} Birr
                                </option>
                            ))}

                        </select>
                    </label>
                </div>
            ),
        },
    ];

    const nextStep = () => {
        setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
    };

    const prevStep = () => {
        setCurrentStep((prev) => Math.max(prev - 1, 0));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem('token');
        if (!token) {
            alert('No token found. Please log in first.');
            return;
        }

        try {
            const response = await axios.put(
                'http://localhost:8000/change-subscription',
                { new_package_id: selectedPlan },
                
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            alert(response.data.message || `Subscribed to plan with ID ${selectedPlan}!`);
            onClose();
        } catch (error) {
            console.error('Error updating subscription:', error);
            alert('Failed to update the subscription. Please try again.');
        }
    };

    if (!open) return null;

    return ReactDOM.createPortal(
        <>
            <div style={OVERLAY_STYLES}></div>
            <div style={MODAL_STYLES}>
                <div className="flex justify-between items-center mb-4">
                    <button onClick={onClose} style={CLOSE_BUTTON_STYLES}>
                        <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L17.94 6M18 18L6.06 6" />
                        </svg>
                    </button>
                </div>
                <div>
                    <form onSubmit={(e) => e.preventDefault()} className="max-w-md mx-auto p-5 bg-white rounded shadow-md">
                        <h2 className="text-xl font-bold mb-4">{steps[currentStep].title}</h2>
                        {steps[currentStep].content}
                        <div className="mt-4">
                            {currentStep > 0 && (
                                <button
                                    type="button"
                                    onClick={prevStep}
                                    className="mr-2 bg-gray-300 hover:bg-gray-400 text-white font-bold py-2 px-4 rounded"
                                >
                                    Back
                                </button>
                            )}
                            {currentStep === steps.length - 1 ? (
                                <button
                                    type="submit"
                                    onClick={handleSubmit}
                                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
                                >
                                    Submit
                                </button>
                            ) : (
                                <button
                                    type="button"
                                    onClick={nextStep}
                                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                                >
                                    Next
                                </button>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </>,
        document.getElementById('portal')
    );
}