import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    // Retrieve user data from localStorage or sessionStorage on app load
    useEffect(() => {
        
    }, [user]);

    const login = (userData) => {
        setUser(userData);
        setIsLoggedIn(true)
        localStorage.setItem('user', JSON.stringify(userData));  // Persist the user data
    };

    const logout = () => {
        setUser(null);
        setIsLoggedIn(false)
        localStorage.removeItem('user');  // Remove user data from storage
    };

    return (
        <UserContext.Provider value={{ user, login, logout, isLoggedIn, setIsLoggedIn }}>
            {children}
        </UserContext.Provider>
    );
};
