import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();
  return (
    <>
      <h1 className="text-3xl font-bold text-center mb-8 text-white">Task AI Manager</h1>
      <h2>You don't have any tasks</h2>
      <button
        title="Profile"
        onClick={() => {
          navigate('/profile');
        }}
        className="backdrop-blur-md bg-white/5 px-6 py-3 backdrop-blur-xs rounded-md border border-gray-300 hover:bg-gray-100 transition-colors mt-5"
      >
        Profile
      </button>
    </>
  );
}
