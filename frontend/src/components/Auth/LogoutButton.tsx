import React, { Component, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { logoutRequest } from '../../features/auth/authSlice';
import Cookies from 'js-cookie';

export const LogoutButton = () => {
  const dispatch = useDispatch();
  const { loading, error, token } = useSelector((state: RootState) => state.auth);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (token) {
      dispatch(logoutRequest({ token }));
      Cookies.remove('token');
    } else {
      console.error('No token available for logout');
    }
  };

  return (
    <div className="flex justify-center mx-auto p-2 rounded-lg">
      <form onSubmit={handleSubmit} className="space-y-1">
        <button
          type="submit"
          disabled={loading}
          className="backdrop-blur-md bg-red-800 px-2 py-1 rounded-md border border-gray-300 transition-all duration-300 hover:bg-red-900 hover:shadow-[0_0_20px_rgba(185,28,28,1)]"
        >
          {loading ? 'Loading...' : 'Log out'}
        </button>
        {error && <p className="text-red-600 text-sm text-center">{error}</p>}
      </form>
    </div>
  );
};

export default LogoutButton;
