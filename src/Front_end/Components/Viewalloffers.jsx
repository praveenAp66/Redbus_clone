import React from 'react';
import { useLocation } from 'react-router-dom';
import { IoCopyOutline } from "react-icons/io5";

const Viewalloffers = () => {
  const location = useLocation();
  const { offers } = location.state || {};

  return (
    <div className='p-8 mt-28 bg-gray-100 min-h-screen'>
      <h1 className='font-bold text-2xl mb-6 text-center'>All Offers</h1>
      <div className='flex justify-center'>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl'>
          {offers && offers.map((img) => (
            <div key={img.id} className='h-[145px] w-[268px] flex flex-row p-4 rounded-2xl text-white bg-gradient-to-r from-blue-500 to-sky-500 shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl hover:bg-gradient-to-l hover:from-blue-600 hover:to-sky-600'>
              <div className='flex'>
                <div className='flex items-center'>
                  <img src={img.src} alt={img.name} className='h-[64px] w-[64px] object-cover rounded-xl' />
                </div>
                <div className='pl-4 pb-1 h-[109px] w-[164px] flex flex-col justify-between'>
                  <div className='font-bold h-6 w-12 bg-gray-500 flex items-center justify-center rounded-lg'>Bus</div>
                  <div className='font-bold'>Save up to Rs 250 on Bus Ticket</div>
                  <div>Valid till 31st August</div>
                  <div className='flex items-center space-x-2'>
                    <div className='font-bold h-6 w-12 flex items-center justify-center border-dashed border-2 border-white'>First</div>
                    <span><IoCopyOutline /></span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Viewalloffers;
