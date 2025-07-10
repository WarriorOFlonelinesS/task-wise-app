import React from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/Common/Loader';

export default function HomePage() {
  const navigate = useNavigate();
  const data = true
  if(data){
    return <Loader/>
  }
  return (
        <>
      <h1>Home</h1>
      <button
        onClick={() => {
          navigate('/login');
        }}
      />
      Login page
    </>
  );
}
