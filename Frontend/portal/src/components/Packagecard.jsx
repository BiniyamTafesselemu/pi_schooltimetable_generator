import React ,{useState} from 'react';
import ManageSubscription from './ManageSubscription';

function Packagecard({ package_id, package_speed, price }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="hover:w-[100%] bg-gradient-to-r from-purple-300 to-gray-300 border border-black rounded-lg p-6 shadow-md bg-white w-[95%] flex flex-col justify-center items-center align-middle h-96">
      <h2 className="text-4xl font-bold">{package_speed}</h2>
      <p className="text-lg">{price} per month</p>
      <ul className="mt-4">
        <li>✓ Fiber Based Internet</li>
        <li>✓ 24/7 Customer Service</li>
      </ul>
      <button onClick={()=> setIsOpen(true)} className="mt-[8%] hover:h-[20%] hover:w-[60%] bg-teal-600 text-white py-2 px-4 rounded">
        Get Now
      </button>
      <ManageSubscription open={isOpen} onClose={()=> setIsOpen(false)}/>

    </div>
  );
}

export default Packagecard;
