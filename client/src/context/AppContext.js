import React, { createContext, useState } from 'react';

export const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null); // For user details
  const [cart, setCart] = useState([]); // For cart details

  return (
    <AppContext.Provider value={{ user, setUser, cart, setCart }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
