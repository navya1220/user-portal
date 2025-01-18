import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';

const UserDetail = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then((response) => setUser(response.data))
      .catch((error) => console.error(error));
  }, [id]);

  if (!user)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg font-semibold text-gray-600">Loading...</p>
      </div>
    );

  return (
    <motion.div
      className="p-8 bg-gradient-to-br from-blue-50 to-blue-100 min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-lg mx-auto bg-white p-8 shadow-2xl rounded-2xl">
        <motion.h1
          className="text-3xl font-bold mb-6 text-blue-600"
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
          <p className="text-lg text-gray-700">
            <strong>Email:</strong> {user.email}
          </p>
          <p className="text-lg text-gray-700">
            <strong>Phone:</strong> {user.phone}
          </p>
          <p className="text-lg text-gray-700">
            <strong>Company:</strong> {user.company.name}
          </p>
          <p className="text-lg text-gray-700">
            <strong>Website:</strong>{' '}
            <a
              href={`https://${user.website}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline hover:text-blue-700"
            >
              {user.website}
            </a>
          </p>
        </motion.div>
        <motion.button
          onClick={() => navigate(-1)}
          className="mt-6 px-6 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
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
