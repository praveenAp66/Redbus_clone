import React, { useState, useEffect } from 'react';
import { MdClose } from "react-icons/md";
import { MdOutlineAirlineSeatReclineNormal } from "react-icons/md";
import { GiSteeringWheel } from "react-icons/gi";
import { FaLongArrowAltRight } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '../../api'
import { useNavigate } from 'react-router-dom';


import { Link } from 'react-router-dom';

const SeatLayout = ({ totalSeats, onClose, from, to, date, fare, bus_id ,departuretime,arrivaltime,BusNo,tripid}) => {
    const [selectedSeats, setSelectedSeats] = useState(new Set());
    const [reservedSeats, setReservedSeats] = useState(new Set());
    const [bookedSeats, setBookedSeats] = useState(new Set()); // Add bookedSeats state
    const navigate = useNavigate(); 
    
    


    const maxSeats = 10;


    useEffect(() => {
        // Fetch reserved seats from backend
        const fetchReservedSeats = async () => {
            // const accessToken = localStorage.getItem('accessToken');

            try {
                const response = await api.get(`/getreservedseats`,{
                    params: {
                        bus_id: bus_id,
                        date: date,  
                        tripid:tripid,// Include the date in the API request
                    },
                
                // Configurations for headers
                    // headers: {
                    //     'Authorization': `Bearer ${accessToken}` // Include the token in the request header
                    // }
                    
            });
                setReservedSeats(new Set(response.data.reservedSeats.map(num => Number(num))));
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    alert('Session expired, please log in again.');
                    localStorage.removeItem('accessToken');
                     // Redirect to the login page
                     navigate("/signup")
            }else {
                console.error('Error fetching reserved seats:', error);
            }
        }
        };



        const fetchBookedSeats = async () => {
            // const accessToken = localStorage.getItem('accessToken');
            try {
                const response = await api.get(`/bookedseats`,
                 {
                    params: {
                        bus_id: bus_id,
                        date: date,  
                        tripId: tripid,
                    },
                
                // Configurations for headers
                    // headers: {
                    //     'Authorization': `Bearer ${accessToken}` // Include the token in the request header
                    // }
            });
                setBookedSeats(new Set(response.data.bookedSeats.map(num => Number(num))));
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    alert('Session expired, please log in again.');
                    localStorage.removeItem('accessToken');
                     // Redirect to the login page
                     navigate("/signup")
            }else {
                console.error('Error fetching booked seats:', error);
            }
        }
        };

        fetchReservedSeats();
        fetchBookedSeats();
    }, [bus_id]);

  


    const handleSeatClick = (seatNumber) => {
        if (reservedSeats.has(seatNumber) || bookedSeats.has(seatNumber)) {
            return; // Do nothing if the seat is reserved
        }

        setSelectedSeats(prevSelected => {
            const newSelected = new Set(prevSelected);
            if (newSelected.has(seatNumber)) {
                newSelected.delete(seatNumber); // Deselect if already selected
            } else {
                if (newSelected.size < maxSeats) {
                    newSelected.add(seatNumber); // Select the seat if less than maxSeats
                } else {
                    // Optionally alert the user or show feedback

                    toast.error(`You can select a maximum of ${maxSeats} seats.`);
                }
            }
            return newSelected;
        });
        // console.log(Seat ${seatNumber} clicked); 
    };


//   console.log("bookedseats",bookedSeats)

const totalSeatsCount = Number(totalSeats); // Ensure totalSeats is a number
const availableSeatsCount = totalSeatsCount - bookedSeats.size;

    return (


        <div className='mt-2 w-full max-w-96 mx-auto relative border border-gray-200 pb-2'>
            <ToastContainer />
            {/* Close Button */}
            <MdClose
                className='absolute top-1 right-1 text-red-600 cursor-pointer'
                onClick={onClose}
                size={16}
            />

            <div className='flex flex-col pl-2'>

                <div className='flex'>
                    Booked
                    <div className='pl-1'>
                        <MdOutlineAirlineSeatReclineNormal size={16} className='bg-red-500 text-white ml- mt-1' />
                    </div>
                </div>
                <div className='flex'>
                    unavailable
                    <div className='pl-1'>
                        <MdOutlineAirlineSeatReclineNormal size={16} className='bg-yellow-700 text-white ml-1 mt-1' />
                    </div>
                </div>
                <div>
                    Available Seats : {availableSeatsCount}
                </div>
            </div>

            {/* Steering Wheel */}
            <div className='flex justify-center mb-2'>
                <GiSteeringWheel size={20} className='text-gray-700' />
            </div>

            {/* Container for the seating layout */}
            <div className='grid grid-cols-4 gap-4 pt-2 pl-8'>
                {/* Seats */}
                {Array.from({ length: totalSeats }).map((_, seatIndex) => {
                    const seatNumber = seatIndex + 1;
                    const isSelected = selectedSeats.has(seatNumber);
                    const isReserved = reservedSeats.has(seatNumber);
                    const isBooked = bookedSeats.has(seatNumber);

                    return (
                        <div
                            key={seatIndex}
                            className={`flex items-center justify-center cursor-pointer  ${ isBooked ? 'bg-red-500' :isReserved ? 'bg-yellow-700' : isSelected ? 'bg-green-500' : 'bg-gray-300'}
                            transition-colors duration-300 w-6 h-6 rounded-lg `}
                            onClick={() => handleSeatClick(seatNumber)} // Pass seat number on click
                            style={{ cursor:isBooked  || isReserved ?  'not-allowed' : 'pointer' }}
                        >
                            <MdOutlineAirlineSeatReclineNormal size={16} className='text-white' />
                        </div>
                    );
                })}
            </div>
            {/* Form Container */}
            <div className='mt-2  pb-2'>
                {selectedSeats.size > 0 && (
                    <div className='w-full max-w-xs  p-2 border border-gray-200 rounded-lg  '>
                        <h2 className='text-sm font-semibold mb-2 text-red-400'>Booking Details</h2>
                        <div className='flex flex-col'>
                            <div className='flex space-x-6  '>
                                <div className='mb-1'>
                                    <label className='block text-xs font-bold'>{from}</label>
                                </div>
                                <div className=''>
                                    <p className=""><FaLongArrowAltRight />
                                    </p>
                                </div>
                                <div className='mb-1'>
                                    <label className='block text-xs font-bold'>{to}</label>
                                </div>
                                <div className='mb-2 '>
                                    <label className='block text-xs font-bold '>Date: {date}</label>
                                </div>

                            </div>

                            <div className='mb-2'>
                                <label className='block text-xs font-bold '>Seat no: {Array.from(selectedSeats).join(",")}</label>
                            </div>



                            <div className='mb-2'>
                                <label className='block text-xs font-bold '>Amout:  {selectedSeats.size * fare}</label>
                            </div>


                            <Link
                                to="/passengerform"
                                state={{
                                    selectedSeats: Array.from(selectedSeats),
                                    bus_id: bus_id,
                                    date:date,
                                    fare: fare,
                                    from: from,
                                    to:to,
                                    departuretime:departuretime,
                                    arrivaltime:arrivaltime,
                                    BusNo,
                                    tripid
                                }}
                                className='w-full px-2 py-1 bg-red-400 text-white rounded-md hover:bg-red-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-400 text-xs text-center'
                            >
                                Proceed to Book
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </div>


    );
};
export default SeatLayout;