import React, { Component, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { logoutRequest } from '../../features/auth/authSlice';

export const LogoutButton = () => {
  const dispatch = useDispatch();
  const { loading, error, token } = useSelector((state: RootState) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (token) {  // Add null check to prevent type error
      dispatch(logoutRequest({ token }));
    } else {
      console.error('No token available for logout');
    }
  };

  return (
    <div className="w-96 mx-auto p-6 rounded-lg">
      <form onSubmit={handleSubmit} className="space-y-1">
        <button
          type="submit"
          disabled={loading}
          className="w- backdrop-blur-md bg-white/5 px-6 py-3 backdrop-blur-xs rounded-md border border-gray-300 hover:bg-gray-100 transition-colors"
        >
          {loading ? 'Loading...' : 'Log out'}
        </button>
        {error && <p className="text-red-600 text-sm text-center">{error}</p>}
      </form>
    </div>
  );
};

export default LogoutButton;
