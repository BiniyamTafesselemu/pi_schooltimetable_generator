import React, { useState, useEffect } from 'react';
import ReactDom from 'react-dom';
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

export default function PaymentForm({ open, onClose }) {
  const [step, setStep] = useState(1);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [progress, setProgress] = useState(33);
  const [currentSubscription, setCurrentSubscription] = useState(null);
  const [subscriptionPlans, setSubscriptionPlans] = useState([]);
  const [packageId, setPackageId] = useState(null);

  useEffect(() => {
    const fetchCurrentSubscription = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:8000/dashboard', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const subscriptionData = response.data;
        setCurrentSubscription(subscriptionData);
        setPackageId(subscriptionData.package?.id); // Set package ID
       

      } catch (error) {
        console.error('Error fetching current subscription:', error);
      }
    };

    fetchCurrentSubscription();
  }, []);

  useEffect(() => {
    const fetchSubscriptionPlans = async () => {
      if (packageId) {
        try {
          const token = localStorage.getItem('token');
          const response = await axios.get(`http://localhost:8000/get-subscription-plan/${packageId}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          console.log('Subscription plans fetched:', response.data);
          setSubscriptionPlans(response.data);
        } catch (error) {
          console.error('Error fetching subscription plans:', error);
        }
      }
    };

    fetchSubscriptionPlans();
  }, [packageId]);

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
      setProgress(progress + 33);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
      setProgress(progress - 33);
    }
  };

  const handlePayment = async () => {
    if (!selectedPlan) return;

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:8000/make-payment', {
        subscription_id: selectedPlan.subscription_id, // Pass the selected subscription ID
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert(response.data.message); // Show success message
      onClose(); // Close the modal
    } catch (error) {
      alert(error.response?.data?.error || 'Payment failed. Please try again.'); // Show error message
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

        <div className="w-full max-w-lg mx-auto mt-10">
          <div className="relative pt-1">
            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
              <div style={{ width: `${progress}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"></div>
            </div>
          </div>

          <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            {step === 1 && (
              <div>
                <h2 className="text-xl font-bold mb-4">Current Subscription</h2>
                {currentSubscription ? (
                  <>
                    <p className="mb-2"><strong>Package:</strong> {currentSubscription.package?.speed || 'Loading...'}</p>
                    <p className="mb-4"><strong>Price:</strong> {currentSubscription.package?.total_price || 'Loading...'}</p>
                  </>
                ) : (
                  <p>Loading subscription details...</p>
                )}
                <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700" onClick={handleNext}>
                  Next
                </button>
              </div>
            )}

            {step === 2 && (
              <div>
                <h2 className="text-xl font-bold mb-4">Choose Subscription Plan</h2>
                {subscriptionPlans.length > 0 ? (
                  <div className="flex flex-col space-y-4">
                    {subscriptionPlans.map((plan) => (
                      <label key={plan.subscription_id} className="inline-flex items-center">
                        <input
                          type="radio"
                          name="subscriptionPlan"
                          value={plan.subscription_id}
                          className="form-radio h-5 w-5 text-blue-600"
                          onChange={() => setSelectedPlan(plan)}
                        />
                        <span className="ml-2 text-gray-700">
                          {plan.duration_in_months} month - {plan.total_price} Birr
                        </span>
                      </label>
                    ))}
                  </div>
                ) : (
                  <p>Loading subscription plans...</p>
                )}
                <div className="flex justify-between mt-6">
                  <button className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700" onClick={handleBack}>
                    Back
                  </button>
                  <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700" onClick={handleNext} disabled={!selectedPlan}>
                    Next
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div>
                <h2 className="text-xl font-bold mb-4">Confirm and Pay</h2>
                {selectedPlan ? (
                  <div>
                    <p className="mb-2"><strong>Selected Plan:</strong> {selectedPlan.duration_in_months} months</p>
                    <p className="mb-4"><strong>Amount:</strong> {selectedPlan.total_price} Birr</p>
                  </div>
                ) : (
                  <p className="mb-4">No plan selected</p>
                )}
                <div className="flex justify-between mt-6">
                  <button className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700" onClick={handleBack}>
                    Back
                  </button>
                  <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700" onClick={handlePayment}>
                    Pay Now
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>,
    document.getElementById('portal')
  );
}

