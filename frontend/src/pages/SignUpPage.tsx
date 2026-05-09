import React from 'react';
import RegisterForm from '../components/Auth/RegisterForm';
import { useNavigate } from 'react-router-dom';
<<<<<<< HEAD

export default function SignUpPage() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col justify-center">
=======
import Button from '../components/Common/Button';

export default function SignUpPage() {
  const buttonStyles =
    'flex justify-center my-3 w-32 backdrop-blur-md bg-white/5 px-3 py-1 backdrop-blur-xs rounded-md border duration-500 ease-in-out border-gray-500/70 hover:bg-[#00d1ff] hover:text-black hover:shadow-[0_0_25px_rgba(0,209,255,0.4)]  transition-colors';
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
>>>>>>> frontend/profile
      <h1 className="text-3xl font-bold text-center mb-8 text-white">Sign Up</h1>
      <RegisterForm />

      <p className="text-center">if you have an account</p>

<<<<<<< HEAD
      <button
        title="Log in"
        onClick={() => {
          navigate('/');
        }}
        className="backdrop-blur-md bg-white/5 px-6 py-3 backdrop-blur-xs rounded-md border border-gray-300 hover:bg-gray-100 transition-colors mt-5 w-52 self-center"
      >
        Log in
      </button>
=======
      <Button label={'Login'} icon="" styles={buttonStyles} to="/" />
>>>>>>> frontend/profile
    </div>
  );
}
