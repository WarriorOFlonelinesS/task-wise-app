import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginRequest } from '../../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../store';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';


export default function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [hiddenPassword, setHidden] = useState(false);
  const [type, setType] = useState('password');
  const { loading, error } = useSelector((state: RootState) => state.auth);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    remember: false,
  }); 


  const showPassword = () => {
    if (type === 'password') {
      setHidden(true);
      setType('text');
    } else {
      setHidden(false);
      setType('password');
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleChangeChecked = (e) => {
    setFormData((prev) => ({
      ...prev,
      ['remember']: e.target.checked,
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

          <div className="flex items-center border border-gray-500 rounded py-1 pr-3 !mb-4">
            <input
              type={type}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full mb-1 px-4  bg-transparent text-white placeholder-gray-400 focus:outline-none"
              required
            />
            <span onClick={showPassword}>
              {hiddenPassword ? <EyeSlashIcon className="w-6" /> : <EyeIcon className="w-6" />}
            </span>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full backdrop-blur-md bg-white/5 px-6 py-3 backdrop-blur-xs rounded-md border border-gray-300 hover:bg-gray-100 transition-colors"
          >
            {loading ? 'Loading...' : 'Login'}
          </button>
          <div className="p-5 text-center flex justify-center flex-col">
          <div className='justify-center flex items-center'>
          <input id="default-checkbox" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 mr-2"
          name='remember'
          onChange={handleChangeChecked}/> Remember me
          </div>
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
