import React from 'react';
import RegisterForm from '../components/Auth/RegisterForm';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Common/Button';

export default function SignUpPage() {
  const navigate = useNavigate();
  const buttonStyles = "w- backdrop-blur-md bg-white/5 px-3 py-1 backdrop-blur-xs rounded-md border duration-500 ease-in-out border-gray-500/70 hover:bg-[#00d1ff] hover:text-black hover:shadow-[0_0_25px_rgba(0,209,255,0.4)]  transition-colors";
  return (
    <div className="min-h-screen flex flex-col justify-center">
      <h1 className="text-3xl font-bold text-center mb-8 text-white">Sign Up</h1>
      <RegisterForm />

      <p className="text-center">if you have an account</p>

      <Button label={'Login'} icon='' styles={buttonStyles} to='/login'/>
    </div>
  );
}
