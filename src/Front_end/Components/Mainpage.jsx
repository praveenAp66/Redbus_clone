import React, { useRef, useState ,useEffect} from 'react';
import homepage from '../../assets/Homepage-header-800.webp';
import { FaBus } from "react-icons/fa";
import { PiPersonSimpleWalkFill } from "react-icons/pi";
import Offerpage from './Offerpage';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import api from '../../api'
import Fuse from 'fuse.js';

import lodash from 'lodash';

const Mainpage = () => {
    const fromRef = useRef(null);
    const toRef = useRef(null);
    const dateRef = useRef(null);
    const navigate = useNavigate(); 

    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [fromSuggestions, setFromSuggestions] = useState([]);
    const [toSuggestions, setToSuggestions] = useState([]);
    const [allCities, setAllCities] = useState([]);

    useEffect(() => {
        const fetchCities = async () => {
          
            // const accessToken = localStorage.getItem('accessToken');
            try {
                const response = await api.get('/cities',  { // Configurations for headers
                    // headers: {
                    //     'Authorization': `Bearer ${accessToken}` // Include the token in the request header
                    // }
                }    
               )
                // console.log('Fetched cities:', response.data); // Verify data structure
                setAllCities(response.data.cities);
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    alert('Session expired, please log in again.');
                    localStorage.removeItem('accessToken');
                     // Redirect to the login page
                     navigate("/signup")
            }else {
                // Handle other errors
                console.error('Error fetching cities:', error.message);
            }
        }
        };

        fetchCities();
    }, []);
 


    const fetchSuggestions =  (input, setSuggestions) => {
        // if (input) {
        //     const filteredCities = cities.filter(city => city.toLowerCase().startsWith(input.toLowerCase()));
        //     setSuggestions(filteredCities);
        // } else {
        //     setSuggestions([]);
        // }
        if (input && allCities.length > 0) {
            const fuse = new Fuse(allCities, {
             
                threshold: 0.3,
                includeScore: false,
            });

            const results = fuse.search(input);
            // console.log('Fuse results:', results); // Log to verify search results
            setSuggestions(results.map(result => result.item));
        } else {
            setSuggestions([]);
        }
       
    };

    const handleFromChange = (e) => {
        setFrom(e.target.value);
        debouncedFetchSuggestions(e.target.value, setFromSuggestions);
    };

    const handleToChange = (e) => {
        setTo(e.target.value);
        debouncedFetchSuggestions(e.target.value, setToSuggestions);
    };

    const debouncedFetchSuggestions = lodash.debounce(fetchSuggestions, 200);

    const handleSuggestionClick = (suggestion, field) => {
        if (field === 'from') {
            setFrom(suggestion);
            setFromSuggestions([]);
        } else {
            setTo(suggestion);
            setToSuggestions([]);
        }
    };

    const handleClick = (ref) => {
        if (ref.current) {
            ref.current.focus();
            if (ref.current.type === 'date') {
                ref.current.click();
            }
        }


    };

const handlesearch=()=>{
    if(from && to && dateRef.current.value)
    {
        navigate("/Busdetails",{
            state: {
                from,
                to,
                date: dateRef.current.value
            }
        })

    }else
    {
        toast.error('please enter the all the feilds');
    }
};


const today = new Date().toISOString().split('T')[0];
    return (
      
        <div className='relative pt-28 h-full w-full'>
           <ToastContainer />
            <div className='h-[32rem] w-full relative'>
                <img src={homepage} alt="homepage" className='h-full w-full object-cover' />
                <h1 className='absolute top-[45px] left-1/2 transform -translate-x-1/2 font-bold text-3xl text-white text-center'>
                    India's No. 1 Online Bus Ticket Booking Site
                </h1>
                <div className='absolute top-[220px] left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-[7rem] w-[90%] bg-white rounded-3xl flex'>
                    {/* From Section */}
                    <div className='flex flex-row items-center border-r border-gray-300 px-4 w-[24%] h-full cursor-pointer' onClick={() => handleClick(fromRef)}>
                        <div className='flex items-center text-gray-500'>
                            <PiPersonSimpleWalkFill className='mr-2' />
                            <FaBus />
                        </div>
                        <div className='ml-4'>
                            <label className='text-gray-500'>From</label><br />
                            <input
                                type="text"
                                id="from"
                                value={from}
                                onChange={handleFromChange}
                                className='mt-1 border-none border-gray-300 focus:border-gray-500 focus:outline-none'
                                ref={fromRef}
                            />

                            {fromSuggestions.length > 0 && (
                                <ul className='bg-white border border-gray-300 rounded-lg mt-1 absolute z-10'>
                                    {fromSuggestions.map((suggestion, index) => (
                                        <li 
                                            key={index} 
                                            onClick={() => handleSuggestionClick(suggestion, 'from')}
                                            className='p-2 cursor-pointer hover:bg-gray-200'
                                        >
                                            {suggestion}
                                        </li>
                                    ))}
                                </ul>
                            )}

                        </div>
                    </div>

                    {/* To Section */}
                    <div className='flex flex-row items-center border-r border-gray-300 px-4 w-[24%] h-full cursor-pointer' onClick={() => handleClick(toRef)}>
                        <div className='flex items-center text-gray-500'>
                            <FaBus className='mr-2' />
                            <PiPersonSimpleWalkFill />
                        </div>
                        <div className='ml-4'>
                            <label className='text-gray-500'>To</label><br />
                            <input
                                type="text"
                                id="to"
                                value={to}
                                onChange={handleToChange}
                                className='mt-1 border-none border-gray-300 focus:border-gray-500 focus:outline-none'
                                ref={toRef}
                            />

                            {toSuggestions.length > 0 && (
                                <ul className='bg-white border border-gray-300 rounded-lg mt-1 absolute z-10'>
                                    {toSuggestions.map((suggestion, index) => (
                                        <li 
                                            key={index} 
                                            onClick={() => handleSuggestionClick(suggestion, 'to')}
                                            className='p-2 cursor-pointer hover:bg-gray-200'
                                        >
                                            {suggestion}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>

                    {/* Date Section */}
                    <div className='flex flex-row items-center border-r border-gray-300 px-4 w-[24%] h-full cursor-pointer' onClick={() => handleClick(dateRef)}>
                        <div className='ml-4'>
                            <label className='text-gray-500'>Date</label><br />
                            <input
                                type="date"
                                id="date"
                                className='mt-1 border-none border-gray-300 focus:border-gray-500 focus:outline-none'
                                ref={dateRef}
                                min={today} 
                            />
                        </div>
                    </div>

                    {/* Search Button */}
                    <div className='flex items-center justify-center px-0 w-[28%] h-full'>
                        <button className='w-full h-full bg-red-600 text-white rounded-r-3xl font-bold text-2xl'
                        onClick={handlesearch}>
                            Search Buses
                        </button>
                    </div>
                  
                </div>
            </div>
            <div className='relative'>
                <Offerpage />
            </div>
        </div>
    );
}

export default Mainpage;
