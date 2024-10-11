import { useEffect, useState } from 'react';
import axios from 'axios';
import HeadBan from "../components/HeadBan";
import TranscationCard from "../components/TranscationCard";

export default function PaymentHistory() {
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPayments = async () => {
            const token = localStorage.getItem('token'); // Get the JWT token from local storage

            try {
                const response = await axios.get('http://localhost:8000/payments', {

                    headers: {
                        // Include any necessary headers, e.g., authorization
                        'Authorization': `Bearer ${token}`, // Replace `yourToken` with the actual token
                    }
                });
                setPayments(response.data.payments);
            } catch (err) {
                console.error('Error fetching payments:', err);
                setError(err.response ? err.response.data : 'Error fetching payments');
            } finally {
                setLoading(false);
            }
        };

        fetchPayments();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <div className='text-center z-0'>
                <HeadBan title={"Payment History"} />
            </div>
            <div className="sm:w-[95%] mx-auto">
                <div className="flex justify-start text-xl my-2">
                    <h1>Transaction History</h1>
                </div>
                <div className="bg-[#F1F1F1] py-5 border border-gray-600 shadow-md px-[2%] sm:px-[8%]">
                    <div className="flex">
                        <h1 className="w-[35%] flex justify-start">Package</h1>
                        <h1 className="w-[35%] flex justify-center">Subscription</h1>
                        <h1 className="w-[35%] flex justify-center">Amount</h1>
                        <h1 className="w-[35%] flex justify-end">Date</h1>
                    </div>
                    <div className="w-[100%] mt-[2%] mb-[1%]">
                        <hr className="border-t-1 border-black" />
                    </div>
                    {/* Map through the payments array to render TranscationCard */}
                    {payments.map((payment, index) => (
                        <TranscationCard 
                            key={payment.payment_id} 
                            packageName={payment.package_speed} // Assuming package_speed as package name
                            subscription={`${payment.duration} month${payment.duration > 1 ? 's' : ''}`} 
                            amount={`${payment.amount} ETB`} 
                            date={new Date(payment.payment_date).toLocaleDateString()} // Format date
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

