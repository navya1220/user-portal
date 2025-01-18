import React, { createContext, useState } from 'react';

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  return (
    <UserContext.Provider value={{ users, setUsers, isDarkMode, toggleTheme }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
