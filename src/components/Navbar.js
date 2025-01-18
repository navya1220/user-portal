import React, { useContext } from 'react';
import { UserContext } from '../context/UserContext';

const UserManagerNavbar = () => {
  const { toggleTheme, isDarkMode } = useContext(UserContext);

  return (
    <nav className="navbar p-4 flex justify-between items-center bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
      <h1 className="text-xl font-bold">User Manager Dashboard</h1>
      <button
        onClick={toggleTheme}
        className="px-4 py-2 bg-gray-100 text-gray-800 font-semibold rounded-md hover:bg-gray-200 transition"
      >
        {isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      </button>
    </nav>
  );
};

export default UserManagerNavbar;
