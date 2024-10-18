import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../Components/Usercontext';
import api from '../../api'
import { Link } from 'react-router-dom';




const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login } = useUser();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
            const response = await api.post('/login', { email, password },
                { // Configurations for headers
                    headers: {
                        'Authorization': `Bearer ${token}` // Include the token in the request header
                    }
                }
            );
            toast.success('Login successful!');
            // console.log('Login response userid  :', response.data.userId);
            // console.log('Login response accessToken :', response.data.accessToken);

            localStorage.setItem('accessToken', response.data.accessToken)
            // Check if userId is in the response
            const userId = response.data.userId;
            if (userId) {
                login(userId); // Set user ID in context

            } else {
                console.error('User ID not found in response:', response.data);
                toast.error('User ID not found in response.');
            }

            // Add a delay before navigating to the main page
            setTimeout(() => {
                navigate("/");
            }, 1500); // 1.5 seconds delay to show the toast notification


        } catch (error) {
            console.error('Error logging in:', error.response ? error.response.data : error.message);
            setError(error.response ? error.response.data.message : 'Error logging in');
            toast.error('Login failed. Please check your email and password.');
        }
    };


    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 mt-16">
            <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-lg">
                <ToastContainer />
                <h2 className="text-3xl font-bold text-center text-gray-800">Login</h2>
                {error && <p className="text-red-500 text-center">{error}</p>}
                <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full px-4 py-2 text-white bg-indigo-600 font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Login
                    </button>
                  
                </form>
                <div className=''>
                        <p>
                            If you not registered, please  
                            <Link  to={'/signup'} className='text-blue-700 pl-1' >Signup</Link>
                        </p>
                    </div>
            </div>
        </div>
    );
};

export default LoginForm;
