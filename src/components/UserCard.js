import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const UserCard = ({ user }) => (
  <motion.div
    className="bg-white p-6 shadow-xl rounded-xl transform transition hover:scale-105 hover:shadow-2xl"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
  >
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-blue-600">{user.name}</h2>
      <p className="text-gray-600">{user.email}</p>
      <p className="text-gray-500">{user.address.city}</p>
      <Link
        to={`/user/${user.id}`}
        className="inline-block mt-4 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
      >
        View Details
      </Link>
    </div>
  </motion.div>
);

export default UserCard;
