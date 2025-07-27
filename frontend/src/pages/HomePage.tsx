import React, { useEffect, useState } from 'react';
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

      <div className=" mx-auto px-4 py-1 flex w-full justify-center">
        <div className="flex flex-col h-screen w-full items-center overflow-hidden">
          {user ? <Dashboard /> : <LoginForm />}
        </div>
      </div>
    </div>
  );
}
