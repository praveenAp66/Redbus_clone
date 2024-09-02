import React, { createContext, useContext, useState, useEffect } from 'react';

// Create a Context for the user data
const UserContext = createContext();

// Create a provider component
export const UserProvider = ({ children }) => {
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        // Check localStorage for existing user data
        const storedUserId = localStorage.getItem('userId');
        if (storedUserId) {
            setUserId(storedUserId);
        }
    }, []);


    const login = (id) => {
        setUserId(id)
        localStorage.setItem('userId', id); // Persist user ID in localStorage
    };
    const logout = () => {
        setUserId(null)
        localStorage.removeItem('userId');
       
        };

    return (
        <UserContext.Provider value={{ userId, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};

// Custom hook to use the UserContext
export const useUser = () => useContext(UserContext);
