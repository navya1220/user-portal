import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { UserContext } from '../context/UserContext'; 

const UserDetail = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const { isDarkMode } = useContext(UserContext); 

  useEffect(() => {
    axios
      .get(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then((response) => setUser(response.data))
      .catch((error) => console.error(error));
  }, [id]);

  if (!user)
    return (
      <div
        className={`flex items-center justify-center min-h-screen ${
          isDarkMode ? 'bg-gray-900 text-gray-200' : 'bg-gray-100 text-gray-800'
        }`}
      >
        <p className="text-lg font-semibold">Loading...</p>
      </div>
    );

  return (
    <motion.div
      className={`p-8 min-h-screen ${
        isDarkMode
          ? 'bg-gradient-to-br from-gray-800 to-gray-900 text-gray-200'
          : 'bg-gradient-to-br from-blue-50 to-blue-100 text-gray-800'
      }`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div
        className={`max-w-lg mx-auto p-8 shadow-2xl rounded-2xl ${
          isDarkMode ? 'bg-gray-800 text-gray-200' : 'bg-white text-gray-800'
        }`}
      >
        <motion.h1
          className={`text-3xl font-bold mb-6 ${
            isDarkMode ? 'text-gray-100' : 'text-blue-600'
          }`}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {user.name}
        </motion.h1>
        <motion.div
          className="space-y-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <p className="text-lg">
            <strong>Email:</strong> {user.email}
          </p>
          <p className="text-lg">
            <strong>Phone:</strong> {user.phone}
          </p>
          <p className="text-lg">
            <strong>Company:</strong> {user.company.name}
          </p>
          <p className="text-lg">
            <strong>Website:</strong>{' '}
            <a
              href={`https://${user.website}`}
              target="_blank"
              rel="noopener noreferrer"
              className={`underline ${
                isDarkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-500 hover:text-blue-700'
              }`}
            >
              {user.website}
            </a>
          </p>
        </motion.div>
        <motion.button
          onClick={() => navigate(-1)}
          className={`mt-6 px-6 py-2 rounded-lg shadow-md transition duration-300 ${
            isDarkMode
              ? 'bg-gray-700 text-gray-100 hover:bg-gray-600'
              : 'bg-blue-500 text-white hover:bg-blue-600'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Go Back
        </motion.button>
      </div>
    </motion.div>
  );
};

export default UserDetail;
