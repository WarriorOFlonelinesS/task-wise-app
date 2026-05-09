import React, { useEffect, useState } from 'react';
<<<<<<< HEAD
import { useNavigate } from 'react-router-dom';
import Loader from '../components/Common/Loader';
import LoginForm from '../components/Auth/LoginForm';
import { RootState } from '../store';
import { useSelector } from 'react-redux';
import Dashboard from '../components/Tasks/Dashboard';

export default function HomePage() {
  const user = useSelector((state: RootState) => state.auth.user);

  const [showLoader, setShowLoader] = useState(true);
  const [fade, setFade] = useState(false);

  useEffect(() => {
=======

import Loader from '../components/Common/Loader';
import LoginForm from '../components/Auth/LoginForm';
import { RootState } from '../store';
import { useDispatch, useSelector } from 'react-redux';
import Dashboard from '../components/Tasks/Dashboard';
import { loginRequestWithToken } from '../features/auth/authSlice';
import Cookies from 'js-cookie';

export default function HomePage() {
  const tokenFromCookie = Cookies.get('token');

  const user = useSelector((state: RootState) => state.auth.user);
  const [showLoader, setShowLoader] = useState(true);
  const [fade, setFade] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (tokenFromCookie !== undefined) {
      dispatch(loginRequestWithToken(tokenFromCookie));
    }
>>>>>>> frontend/profile
    const timer = setTimeout(() => {
      setFade(true);
      setTimeout(() => setShowLoader(false), 1000);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {showLoader && (
        <div
          className={`fixed inset-0 flex items-center justify-center transition-opacity duration-1000 z-50 ${
            fade ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
        >
          <Loader />
        </div>
      )}

<<<<<<< HEAD
      <div className="container mx-auto px-4 py-1 flex w-full justify-center">
        <div className="flex flex-col w-full items-center">
=======
      <div className=" mx-auto px-4 py-1 bg-gradient-to-br from-[#0f3936] to-[#184e4a] flex w-full justify-center">
        <div className="flex flex-col h-screen w-full items-center overflow-hidden">
>>>>>>> frontend/profile
          {user ? <Dashboard /> : <LoginForm />}
        </div>
      </div>
    </div>
  );
}
