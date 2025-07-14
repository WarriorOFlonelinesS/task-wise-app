import React from 'react';
import RegisterForm from '../components/Auth/RegisterForm';
import { useNavigate } from 'react-router-dom';

export default function SignUpPage() {
  const navigate = useNavigate();
  return (
    <>
      <h1 className="text-3xl font-bold text-center mb-8 text-white">Sign Up</h1>
      <RegisterForm />
      <div>
        <p>if you  have an account</p>
      </div>

      <button
        title="Log in"
        onClick={() => {
          navigate('/');
        }}
        className="backdrop-blur-md bg-white/5 px-6 py-3 backdrop-blur-xs rounded-md border border-gray-300 hover:bg-gray-100 transition-colors mt-5"
      >Log in</button>
    </>
  );
}
