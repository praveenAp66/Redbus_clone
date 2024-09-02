import React from 'react';
import { useLocation } from 'react-router-dom';

const Viewallbuses = () => {
  // Retrieve the state from the location
  const location = useLocation();
  const { offers } = location.state || { offers: [] };

  return (
    <div className='mt-[100px] w-full bg-gray-100'>
      <div className='text-center pt-4'>
        <h1 className='text-[40px] mt-6'>All Government Buses</h1> {/* Added mt-6 for margin-top */}
      </div>
      <div className='h-auto w-full m-auto mt-3 px-4'>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
          {offers.map((bus) => (
            <div key={bus.id} className='px-4 mt-8'>
              <div className='h-full w-full flex flex-col p-6 bg-gray-100 rounded-2xl shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl hover:bg-gradient-to-l hover:from-blue-200 hover:to-sky-200'>
                <div className='flex flex-row items-center mb-4'>
                  <img src={bus.src} alt={bus.name} className='h-12 w-12 object-contain' />
                  <h1 className='font-bold pl-4 text-2xl'>{bus.name}</h1>
                </div>
                <div className='h-auto w-full flex flex-col space-y-2'>
                  <p className='text-sm text-gray-700'>
                    1450 services including Garuda Plus, Rajdhani and more
                  </p>
                  <p className='text-sm text-gray-600 bg-gray-200 p-2 rounded'>
                    Official booking partner of {bus.name}
                  </p>
                  <h4 className='text-sm text-red-600 font-semibold'>
                    Use code <span className='font-bold'>FIRST</span> to save up to ₹250 (only for first-time users)
                  </h4>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Viewallbuses;
