import React, { useState } from 'react';

import Login from '../Components/Login'
import { useUser } from '../Components/Usercontext'; 
import api from '../../api'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify'; // Import toast

const SignupForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        phoneNumber: ''
    });

    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState({ text: '', type: '' });
    const [showSignup, setShowSignup] = useState(true); // State to toggle between forms
    const { login } = useUser(); // Destructure login function from context

    const validate = () => {
        const newErrors = {};
        if (!formData.name) newErrors.name = 'Name is required';
        if (!formData.email) newErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
        if (!formData.password) newErrors.password = 'Password is required';
        else {
            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
            if (!passwordRegex.test(formData.password)) {
                newErrors.password = 'Password must be at least 8 characters long and include one uppercase letter, one lowercase letter, one number, and one special character';
            }
        }
        if (!formData.phoneNumber) newErrors.phoneNumber = 'Phone number is required';
        else if (!/^[6-9]\d{9}$/.test(formData.phoneNumber)) newErrors.phoneNumber = 'Phone number is invalid';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validate()) return;
       

        try {
            
            const response = await api.post('/signup', formData);
            // console.log('Signup response:', response.data); // Log the response
            localStorage.setItem('token', response.data.token); // Save token if needed
            setMessage({ text: 'Signup successful', type: 'success' });
            toast.success('Signup successful!'); // Toastify success message
        
            const userId = response.data.userId;
            login(userId); // Set user ID in context

            setFormData({
                name: '',
                email: '',
                password: '',
                phoneNumber: ''
            });
        } catch (error) {
            console.error('Signup error:', error.response ? error.response.data : error.message);
            if (error.response && (error.response.status === 400 || error.response.status === 409)) {
                // Assuming a 409 status code for conflict (e.g., email or phone already registered)
                toast.error('Email or phone number already registered.'); // Toastify error message
            } else {
                toast.error('Signup failed. Please try again.'); // General error message
            }
            setMessage({ text: 'Signup failed', type: 'error' });
        }
    };

    const showLoginForm = () => {
        setShowSignup(false);
    };

    return (
        <div className="max-w-md mx-auto mt-28 p-6 border border-gray-300 rounded-lg shadow-lg bg-gray-100 mb-4">
              <ToastContainer />
            {showSignup ? (
                <div className="signup-form">
                    <h2 className="text-2xl font-bold mb-6 text-center">Signup</h2>
                    {message.text && (
                        <p className={`mb-4 text-center ${message.type === 'success' ? 'text-green-500' : 'text-red-500'}`}>
                            {message.text}
                        </p>
                    )}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Enter your name"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter your email"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Enter your password"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                        </div>

                        <div>
                            <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Phone Number</label>
                            <input
                                type="text"
                                id="phoneNumber"
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={handleChange}
                                placeholder="Enter your phone number"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                            {errors.phoneNumber && <p className="text-red-500 text-xs mt-1">{errors.phoneNumber}</p>}
                        </div>

                        <button
                            type="submit"
                            className="w-full px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        >
                            Sign Up
                        </button>
                    </form>
                    <div className='pt-2'>
                        <p>
                            If you already registered, please  login 
                            <button className='text-blue-700 pl-1' onClick={showLoginForm}>Login</button>
                        </p>
                    </div>
                </div>
            ) : (
               <Login></Login>
            )}
        </div>
    );
};

export default SignupForm;
