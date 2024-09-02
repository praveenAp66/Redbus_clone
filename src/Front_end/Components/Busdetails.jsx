import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { FaBus, FaRupeeSign, FaStarHalfAlt } from "react-icons/fa";
import { GiPathDistance } from "react-icons/gi";
import { MdOutlineAirlineSeatReclineNormal } from "react-icons/md";
import SeatLayout from "../Components/Seatlayout"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '../../api'
import { useNavigate } from 'react-router-dom';

const BusDetails = () => {
    const location = useLocation();
    const { from, to, date } = location.state;
    const navigate = useNavigate(); 

    const [routeExists, setRouteExists] = useState(null);
    const [buses, setBuses] = useState([]);
    const [selectedBusIndex, setSelectedBusIndex] = useState(null);
    const [filteredBuses, setFilteredBuses] = useState([]);


    const [filters, setFilters] = useState({
        ac: false,
        nonAc: false,
        sleeper: false,
        seater: false,
    });

    useEffect(() => {
        const checkRoute = async () => {
            // const accessToken = localStorage.getItem('accessToken');
            try {
                const response = await api.post('/checkroute', { from, to },
                    // { // Configurations for headers
                    //     headers: {
                    //         'Authorization': `Bearer ${accessToken}` // Include the token in the request header
                    //     }
                    // }    
                   
                );
                setRouteExists(response.data.routeExists);

                if (response.data.routeExists) {
                    const params = new URLSearchParams({ origin: from, destination: to ,date:date}).toString();
                    const busesResponse = await api.get(`/getbusesforroute?${params}`,
                        //   { // Configurations for headers
                        // headers: {
                        //     'Authorization': `Bearer ${accessToken}` // Include the token in the request header
                        // }
                    // }    
                       
                    );
                    setBuses(busesResponse.data);

                    if (busesResponse.data.length === 0) {
                        toast.error('No buses available on this date for the selected route. Sorry!');
                    }
                }

            } catch (error) {
                if (error.response && error.response.status === 401) {
                    alert('Session expired, please log in again.');
                    localStorage.removeItem('accessToken');
                     // Redirect to the login page
                     navigate("/signup")
                    }else {
                console.error('Error checking route:', error);
                    }
            }
        };

        checkRoute();
    }, [from, to]);

    const toggleSeatsView = (index) => {
        setSelectedBusIndex(selectedBusIndex === index ? null : index);
    };


    const handleFilterChange = (filterName) => {
        setFilters(prevFilters => ({
            ...prevFilters,
            [filterName]: !prevFilters[filterName]
        }));
       
    };
   
    useEffect(() => {
        const filterBuses = () => {
            return buses.filter(bus => {
                const { ac, nonAc, sleeper, seater } = filters;
        const busTypes = bus.bus_type.split(' '); // Split by space

        // Create a set of bus types for exact matching
        const busTypesSet = new Set(busTypes);

        let isMatch = true;

        if (ac && !busTypesSet.has('AC') && !busTypesSet.has('AC Sleeper') && !busTypesSet.has('AC Seater')) isMatch = false;
        if (nonAc && !busTypesSet.has('Non-AC') && !busTypesSet.has('Non-AC Sleeper') && !busTypesSet.has('Non-AC Seater')) isMatch = false;
        if (sleeper && !busTypesSet.has('Sleeper')) isMatch = false;
        if (seater && !busTypesSet.has('Seater')) isMatch = false;

        return isMatch;
            });
        };
    
        setFilteredBuses(filterBuses());
    }, [filters, buses]); // Depend on both filters and buses
  
// console.log(date)


 // Function to format ISO date string to local 12-hour time
 const formatTo12Hour = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    });
  };

   // Function to calculate arrival time
   const calculateArrivalTime = (departureTime, travelTimeHours) => {
    const departureDate = new Date(departureTime);
    departureDate.setHours(departureDate.getHours() + travelTimeHours);
    return formatTo12Hour(departureDate.toISOString());
};

    return (
        <div className='w-full h-auto bg-white mt-28 p-6 flex justify-start flex-col'>
            <ToastContainer position="top-center" autoClose={3000} />
            <div className='bg-white opacity-70 shadow-md rounded-lg p-8 max-w-lg w-full'>
                <h1 className='text-2xl font-semibold text-gray-800 mb-4'>Bus Ticket Details</h1>
                {routeExists === null ? (
                    <p>Loading...</p>
                ) : routeExists ? (
                    <div className='flex '>
                        <div className='flex items-center space-x-4 border-b-2 border-gray-400 pb-4 mb-4'>
                            <div className='flex items-center'>
                                <span className='text-gray-800 font-semibold mr-2'>From:</span>
                                <span className='font-bold text-gray-600'>{from}</span>
                            </div>
                            <div className='flex items-center'>
                                <span className='text-gray-800 font-semibold mr-2'>To:</span>
                                <span className='font-bold text-gray-600'>{to}</span>
                            </div>
                            <div className='flex items-center'>
                                <span className='text-gray-800 font-semibold mr-2 '>Date:</span>
                                <span className='font-bold text-gray-600 w-24'>{date}</span>
                            </div>
                        </div>


                        {/* Filter Buttons */}
                        <div className='flex space-x-4 mb-4 pl-72 font-semibold '>
                            <button
                                className={`h-10 w-28 py-2 px-4 border border-gray-400 rounded shadow-sm ${filters.ac ? 'bg-customBg text-white' : 'bg-gray-400 text-black'}`}
                                onClick={() => handleFilterChange('ac')}
                            >
                                AC
                            </button>
                            <button
                                className={`h-10 w-28 py-2 px-4 border border-gray-400 rounded  shadow-sm ${filters.nonAc ? 'bg-customBg text-white' : 'bg-gray-400 text-black'}`}
                                onClick={() => handleFilterChange('nonAc')}
                            >
                                Non-AC
                            </button>
                            <button
                                className={`h-10 w-28 py-2 px-4 border border-gray-400 rounded  shadow-sm ${filters.sleeper ? 'bg-customBg  text-white' : 'bg-gray-400 text-black'}`}
                                onClick={() => handleFilterChange('sleeper')}
                            >
                                Sleeper
                            </button>
                            <button
                                className={`h-10 w-28 py-2 px-4 border border-gray-400 rounded shadow-sm  ${filters.seater ? 'bg-customBg text-white' : 'bg-gray-400 text-black'}`}
                                onClick={() => handleFilterChange('seater')}
                            >
                                Seater
                            </button>
                        </div>
                    </div>

                ) : (
                    <p className='text-red-600'>No buses available on this route</p>
                )}
            </div>

            {routeExists && filteredBuses.length > 0 && (
                <div className='mt-4 max-w-[1200px] pl-20 ml-8 h-auto'>
                    <ul>
                        {filteredBuses.map((bus, index) => (
                            <li key={index} className='mb-8 border border-gray-400 w-full pl-3'>
                                <h2 className='text-xl font-semibold '>{bus.Travels_name}</h2>
                                <div className='flex flex-col items-start space-y-4 mt-2'>
                                    <div className='flex space-x-28'>
                                        <p className='flex flex-col font-semibold'>Bus No {bus.bus_number}
                                            <div className='flex'>
                                                <p>({bus.bus_type})</p>
                                                <p className='pt-1 pl-1 text-red-400'><FaBus /></p>
                                            </div>
                                        </p>
                                        <p className='flex flex-col font-semibold'>Departure Time
                                            {/* <p>{bus.departure_time}</p> */}
                                            <p>{date} {formatTo12Hour(bus.departure_time)}</p>
                                        </p>
                                        <p className='flex flex-col '>Travel Time
                                            <p>{bus.travel_time} hr</p>
                                        </p>
                                        <p className='flex flex-col font-semibold'>Arrival Time
                                            <p>{date} {calculateArrivalTime(bus.departure_time, parseInt(bus.travel_time))}</p>
                                        </p>
                                        <div className='flex flex-col'>
                                            <div className='flex'>
                                                <p>Distance</p>
                                                <p className='pt-1 pl-1 text-red-500 '> <GiPathDistance size={20} /></p>
                                            </div>
                                            <div>
                                                <p>{bus.distance} km</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='flex space-x-28 pt-8'>
                                        <div className='flex flex-col'>
                                            <div>
                                                <p className='flex flex-col'> Total No Seats </p>
                                            </div>
                                            <div className='flex'>
                                                <p> {bus.total_seats}</p>
                                                <p className='pl-1 pt-1 text-blue-800'><MdOutlineAirlineSeatReclineNormal /></p>
                                            </div>
                                        </div>
                                        <p className='flex flex-col '>Step from
                                            <p>{bus.step_from}</p>
                                        </p>
                                        <div className='flex flex-col pl-16'>
                                            <div>
                                                <p className='font-semibold'>Amount</p>
                                            </div>
                                            <div className='flex'>
                                                <p className='font-bold'>{bus.fare}</p>
                                                <p className='pl-1 pt-1'><FaRupeeSign /></p>
                                            </div>
                                        </div>
                                        <div className='w-24 h-8 bg-red-500 text-center mt-3'>
                                            <button  className='text-white ' onClick={() => toggleSeatsView(index)}>View Seats</button>
                                        </div>
                                        <div className='flex mt-3 '>
                                            <p className='font-semibold'>Ratings</p>
                                            <p className='pl-1 font-semibold'>{bus.rating}</p>
                                            <p className='pt-1 pl-1 text-green-600'><FaStarHalfAlt /></p>
                                        </div>
                                    </div>

                                    {selectedBusIndex === index && (
                                        <SeatLayout
                                            bus_id={bus.bus_id}
                                            totalSeats={bus.total_seats}
                                            onClose={() => setSelectedBusIndex(null)}
                                            from={from}
                                            to={to}
                                            date={date}
                                            fare={bus.fare}
                                            departuretime={`${date} ${formatTo12Hour(bus.departure_time)}`}
                                            arrivaltime={`${date} ${calculateArrivalTime(bus.departure_time, parseInt(bus.travel_time))}`}
                                            BusNo={bus.bus_number}
                                            tripid={bus.trip_id}
                                        />
                                    )}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default BusDetails;
