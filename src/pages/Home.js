import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { UserContext } from '../context/UserContext';
import UserCard from '../components/UserCard';
import { motion } from 'framer-motion';

const Home = () => {
  const { users, setUsers, isDarkMode } = useContext(UserContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  useEffect(() => {
    axios
      .get('https://jsonplaceholder.typicode.com/users')
      .then((response) => setUsers(response.data))
      .catch((error) => console.error(error));
  }, [setUsers]);

  const filteredUsers = users
    .filter((user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) =>
      sortOrder === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
    );

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div
      className={`p-8 min-h-screen space-y-6 transition-colors duration-300 ${
        isDarkMode
          ? 'bg-gray-900 text-gray-100'
          : 'bg-gradient-to-r from-gray-50 to-gray-200 text-gray-900'
      }`}
    >
      {/* Search and Sort Controls */}
      <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <input
          type="text"
          placeholder="Search by name..."
          className={`border px-4 py-2 rounded-md shadow w-full max-w-md transition-colors duration-300 ${
            isDarkMode
              ? 'bg-gray-800 border-gray-700 text-gray-100'
              : 'bg-white border-gray-300 text-gray-900'
          }`}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
          className={`px-6 py-2 font-semibold rounded-md shadow-lg transition ${
            isDarkMode
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-blue-500 text-white hover:bg-blue-600'
          }`}
        >
          Sort: {sortOrder === 'asc' ? 'A-Z' : 'Z-A'}
        </button>
      </div>

      {/* User Cards */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0, scale: 0.8 },
          visible: { opacity: 1, scale: 1, transition: { staggerChildren: 0.2 } },
        }}
      >
        {currentUsers.map((user) => (
          <motion.div
            key={user.id}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <UserCard user={user} />
          </motion.div>
        ))}
      </motion.div>

      {/* Pagination */}
      <div className="flex justify-center items-center space-x-2 mt-8">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-4 py-2 font-semibold rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed ${
            isDarkMode
              ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
          }`}
        >
          Previous
        </button>
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`px-4 py-2 font-semibold rounded-lg transition ${
              currentPage === index + 1
                ? isDarkMode
                  ? 'bg-blue-600 text-white'
                  : 'bg-blue-500 text-white'
                : isDarkMode
                ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
            }`}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 font-semibold rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed ${
            isDarkMode
              ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Home;
