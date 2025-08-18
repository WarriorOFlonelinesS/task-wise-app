import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerRequest } from '../../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../store';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';


export default function RegisterForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, user } = useSelector((state: RootState) => state.auth);
  const [hiddenPassword, setHidden] = useState(false);
  const [type, setType] = useState('password');
  const [hiddenConfPassword, setConfHidden] = useState(false);
  const [typeConfPass, setTypeConfPass] = useState('password');
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  });
  
  const showPassword = () => {
;
    if (type === 'password') {
      setHidden(true);
      setType('text');
    } else {
      setHidden(false);
      setType('password');
    }
  };

  const showConfPassword = () => {
    if (typeConfPass === 'password') {
      setConfHidden(true);
      setTypeConfPass('text');
    } else {
      setConfHidden(false);
      setTypeConfPass('password');
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    if (user) {
      setShowSuccess(true);
      setTimeout(() => {
        navigate('/');
      }, 2000); 
    }
  }, [user, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const adjustedData = { ...formData, password_confirmation: formData.passwordConfirmation };
    dispatch(registerRequest(adjustedData as any));
  };

  return (
    <div className="w-96 mx-auto p-6 rounded-lg">
      {showSuccess && (
        <div className="mb-4 p-3 bg-green-500 text-white rounded text-center">
          Registration successful! Redirecting to login...
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-1">
        <div>
          <input
            type="text"
            name="name"
            placeholder="Username"
            value={formData.name}
            onChange={handleChange}
            className="w-full mb-3 px-4 py-2 bg-transparent text-white placeholder-gray-400 border border-gray-500 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>
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
        <div className="flex items-center border border-gray-500 rounded  py-1 pr-3">
          <input
            type={typeConfPass}
            name="passwordConfirmation"
            placeholder="Confirmation password"
            value={formData.passwordConfirmation}
            onChange={handleChange}
            className="w-full mb-1 px-4  bg-transparent text-white placeholder-gray-400 focus:outline-none"
            required
          />

          <span onClick={showConfPassword}>
            {hiddenConfPassword ? <EyeSlashIcon className="w-6" /> : <EyeIcon className="w-6" />}
          </span>
        </div>
        <p className="text-center font-thin italic py-2">Minimum 8 symbols, maximum 225</p>
        <button
          type="submit"
          disabled={loading}
          className="w-full backdrop-blur-md bg-white/5 px-6 py-3 backdrop-blur-xs rounded-md border border-gray-300 hover:bg-gray-100 transition-colors"
        >
          {loading ? 'Loading...' : 'Sign up'}
        </button>
        {error && <p className="text-red-600 text-sm text-center">{error}</p>}
      </form>
    </div>
  );
}
