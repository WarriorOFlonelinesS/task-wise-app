import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import LogoutButton from '../components/Auth/LogoutButton';
import { useNavigate } from 'react-router-dom';

function ProfilePage() {
  const user = useSelector((state: RootState) => state.auth.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);

  if (!user) return null;

  return (
    <div className='flex justify-center flex-col'>
      <h1 className="text-3xl font-bold text-center mb-8 text-white">Profile</h1>
      <h2 className="text-2xl font-bold text-center mb-8 text-white">Welcome, {user.name}</h2>
      <p className='text-center'>{user.email}</p>
      <LogoutButton />
    </div>
  );
}

export default ProfilePage;
