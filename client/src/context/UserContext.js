import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // Retrieve user data from localStorage or sessionStorage on app load
    useEffect(() => {
        const savedUser = JSON.parse(localStorage.getItem('user'));
        if (savedUser) {
            setUser(savedUser);
        }
    }, []);

    const login = (userData) => {
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));  // Persist the user data
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');  // Remove user data from storage
    };

    return (
        <UserContext.Provider value={{ user, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};
