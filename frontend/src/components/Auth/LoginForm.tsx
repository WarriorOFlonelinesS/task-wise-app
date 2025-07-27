import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginRequest } from '../../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../store';

export default function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, user } = useSelector((state: RootState) => state.auth);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginRequest(formData));
  };

  return (
    <>
      <h1 className="text-3xl font-bold text-center mb-8 text-white">Welcome to TaskWise</h1>
      <div className="w-96 mx-auto p-6 rounded-lg">
        <form onSubmit={handleSubmit} className="space-y-1">
    
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full mb-3 px-4 py-2 bg-transparent text-white placeholder-gray-400 border border-gray-500 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full mb-3 px-4 py-2 bg-transparent text-white placeholder-gray-400 border border-gray-500 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full backdrop-blur-md bg-white/5 px-6 py-3 backdrop-blur-xs rounded-md border border-gray-300 hover:bg-gray-100 transition-colors"
          >
            {loading ? 'Loading...' : 'Login'}
          </button>
          <div className="p-5 text-center flex justify-center flex-col">
            <p className="p-5 ">if you don't have an account</p>
            <button
              title="Sign up"
              onClick={() => {
                navigate('/signup');
              }}
              className="backdrop-blur-md bg-white/5 px-6 py-3 backdrop-blur-xs rounded-md border border-gray-300 hover:bg-gray-100 transition-colors self-center"
            >
              Sign up
            </button>

            {error && <p className="text-red-600 text-sm text-center">{error}</p>}
          </div>
        </form>
      </div>
    </>
  );
}
