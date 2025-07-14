import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

function ProfilePage() {
  const user = useSelector((state: RootState) => state.auth.user);
  return (
    <>
      <h1 className="text-3xl font-bold text-center mb-8 text-white">Profile</h1>
      <h2 className="text-2xl font-bold text-center mb-8 text-white">Welcome, {user.name}</h2>
      <p>{user.email}</p>
    </>
  );
}

export default ProfilePage;
