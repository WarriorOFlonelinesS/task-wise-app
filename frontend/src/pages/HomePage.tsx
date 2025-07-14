import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/Common/Loader';
import LoginForm from '../components/Auth/LoginForm';
import { RootState } from '../store';
import { useSelector } from 'react-redux';

export default function HomePage() {

  const user  = useSelector((state: RootState) => state.auth.user);
  const [showLoader, setShowLoader] = useState(true);
  const [fade, setFade] = useState(false);

  useEffect(() => {
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

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-white">Welcome to TaskWise</h1>

        <div className="flex flex-col items-center">
          {user ? <h2>You don't have any tasks</h2> : <LoginForm />}
         
        </div>
      </div>
    </div>
  );
}
