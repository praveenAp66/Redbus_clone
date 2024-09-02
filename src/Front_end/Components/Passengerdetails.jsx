
import React, { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import {useLocation } from 'react-router-dom';
import lodash from 'lodash';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../Components/Usercontext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import api from '../../api'


const PassengerForm = () => {
    const location = useLocation();
    const selectedSeats = location.state?.selectedSeats || [];
    const bus_id=location.state.bus_id;
    const date=location.state.date;
    const fare=location.state.fare;
    const from=location.state.from;
    const departuretime=location.state.departuretime;
    const arrivaltime=location.state.arrivaltime;
    const to=location.state.to;
    const BusNo=location.state.BusNo;
    const tripid=location.state.tripid;
   
    const [states, Setstates] = useState('');
    const [stateSuggestions, setstateSuggestions] = useState([]);
    const navigate=useNavigate();
    const { userId } = useUser();

    const { register, handleSubmit, control, formState: { errors } } = useForm({
        defaultValues: {
            passengers: selectedSeats.map(seat => ({
                seatNumber: seat,
                name: '',
                age: '',
                gender: '',
                state: '',
            }))
        }
    });

    const { fields } = useFieldArray({
        control,
        name: "passengers"
    });


    // const user = useUser();
    // console.log(user); // This should print the user object with userId
    // console.log(date)

    const onSubmit = async (data) => {
        const accessToken = localStorage.getItem('accessToken');
        try {
            // Prepare seat data for freezing
            const seatsToFreeze = data.passengers.map(p => ({ number: p.seatNumber }));
            // console.log(seatsToFreeze)
        

            // Freeze seats via API
            const response = await api.post('/reserverseats',
                {
                seats: seatsToFreeze,
                userId: userId,
                busid:bus_id,
                tripid:tripid,
                date:date,  
            },
            { // Configurations for headers
                 headers: {
                     'Authorization': `Bearer ${accessToken}` // Include the token in the request header
                 }
            }    
        );

        // console.log('API response:', response.data);

            // Proceed to payment
            navigate('/payment', { state: { 
                selectedSeats: data.passengers.map(p => p.seatNumber),
                userId: userId,
                busid:bus_id,
                date:date,
                fare:fare,
                from:from,
                to:to,
                departuretime,
                arrivaltime,
                BusNo,
                tripid,
                passengers: data.passengers // Include passenger details
                
            
            } });
        } catch (error) {
            if (error.response && error.response.status === 401) {
               alert("Please Login to Continue")
                localStorage.removeItem('accessToken');
                // Redirect to the login page
                navigate("/signup");
        }else {
            console.error('Failed to freeze seats:', error);
            // Handle error (e.g., show a message to the user)
        }
    }
    };

    const indianStates = [
        "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
        "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
        "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
        "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
        "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
        "Uttar Pradesh", "Uttarakhand", "West Bengal"
    ];


    const fetchSuggestions = async (input, setSuggestions) => {
        if (input) {
            const filteredStates = indianStates.filter(state => state.toLowerCase().startsWith(input.toLowerCase()));
            setSuggestions(filteredStates);
        } else {
            setSuggestions([]);
        }
    };


    const handleStateChange = (e) => {
        Setstates(e.target.value);
        debouncedFetchSuggestions(e.target.value, setstateSuggestions);
    };


    const debouncedFetchSuggestions = lodash.debounce(fetchSuggestions, 300);

 

    const handleSuggestionClick = (suggestion, field) => {
       
        Setstates(suggestion);
        setstateSuggestions([]);
    
    };


  
   
    return (
        <div className="p-4 border border-gray-200 w-[900px] mx-auto mt-28 bg-gray-100">
             <ToastContainer />
            <h2 className="text-lg font-bold mb-4">Passenger Details</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                {fields.map((field, index) => (
                    <div key={field.id} className="mb-6 border-b border-gray-200 pb-4 shadow-md pl-10 bg-white">
                        <h3 className="text-sm font-bold mb-2">Passenger {index + 1} | Seat No {field.seatNumber}</h3>
                        <div className="flex flex-col space-y-4">

                            <div className="flex space-x-6">
                                <div>
                                    <label htmlFor="" className='text-sm font-semibold'>Name</label><br />
                                    <input
                                        {...register(`passengers.${index}.name`, { required: true })}
                                        type="text"
                                        className={`p-2 border ${errors.passengers?.[index]?.name ? 'border-red-500' : 'border-gray-200'} rounded-md h-8 w-[475px]`}
                                    />
                                    {errors.passengers?.[index]?.name && <span className="text-red-500 text-xs">Name is required</span>}
                                </div>
                            </div>

                            <div className='flex space-x-20'>
                                <div>
                                    <label htmlFor="" className='text-sm block mb-2 font-semibold'>Select Gender</label>
                                    <div className="flex gap-2">
                                        <label className="flex items-center">
                                            <input
                                                {...register(`passengers.${index}.gender`, { required: true })}
                                                type="radio"
                                                value="male"
                                                className={`mr-2 h-4 w-4 ${errors.passengers?.[index]?.gender === 'male' ? 'text-red-500' : 'text-gray-300'} border-gray-300 rounded-full`}
                                            />
                                            <span className="text-sm">Male</span>
                                        </label>
                                        <label className="flex items-center">
                                            <input
                                                {...register(`passengers.${index}.gender`, { required: true })}
                                                type="radio"
                                                value="female"
                                                className={`mr-2 h-4 w-4 ${errors.passengers?.[index]?.gender === 'female' ? 'text-red-500' : 'text-gray-300'} border-gray-300 rounded-full`}
                                            />
                                            <span className="text-sm">Female</span>
                                        </label>
                                        <label className="flex items-center">
                                            <input
                                                {...register(`passengers.${index}.gender`, { required: true })}
                                                type="radio"
                                                value="other"
                                                className={`mr-2 h-4 w-4 ${errors.passengers?.[index]?.gender === 'other' ? 'text-red-500' : 'text-gray-300'} border-gray-300 rounded-full`}
                                            />
                                            <span className="text-sm">Other</span>
                                        </label>
                                        {errors.passengers?.[index]?.gender && <span className="text-red-500 text-xs">Gender is required</span>}
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="" className='text-sm font-semibold'>Age</label><br />
                                    <input
                                        {...register(`passengers.${index}.age`, { required: true, min: 1 })}
                                        type="number"
                                        className={`w-full p-2 border ${errors.passengers?.[index]?.age ? 'border-red-500' : 'border-gray-300'} rounded-md h-8`}
                                    />
                                    {errors.passengers?.[index]?.age && <span className="text-red-500 text-xs">Valid age is required</span>}
                                </div>
                            </div>

                            <div>
                                <label htmlFor="" className='text-sm font-semibold'>State of Residence</label><br />
                                <input
                                    {...register(`passengers.${index}.state`, { required: true })}
                                    type="text"
                                    value={states}
                                    onChange={handleStateChange}

                                    className={`p-2 border ${errors.passengers?.[index]?.state ? 'border-red-500' : 'border-gray-300'} rounded-md h-8 w-[475px]`}
                                />

                                {setstateSuggestions.length > 0 && (
                                    <ul className='bg-white border border-gray-300 rounded-lg mt-1 absolute z-10'>
                                        {stateSuggestions.map((suggestion, index) => (
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
                                {errors.passengers?.[index]?.state && <span className="text-red-500 text-xs">State is required</span>}


                            </div>

                        </div>
                    </div>
                ))}
                <div className='flex flex-col justify-center items-center'>
                    <div className="mb-4">
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                {...register("terms", { required: true })}
                                className="mr-2"
                            />
                            I agree to the terms and conditions
                        </label>
                        {errors.terms && <span className="text-red-500 text-xs">You must agree to the terms</span>}
                    </div>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-red-400 text-white rounded-md hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 flex justify-center items-center"
                    >
                        Proceed to Payment
                    </button>
                </div>
            </form>
        </div>
    );
};
export default PassengerForm;