import React from 'react';
import RegisterForm from '../components/Auth/RegisterForm';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Common/Button';

export default function SignUpPage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col justify-center">
      <h1 className="text-3xl font-bold text-center mb-8 text-white">Sign Up</h1>
      <RegisterForm />

      <p className="text-center">if you have an account</p>

      <Button link={'/'} label={'Log in'} icon={''}/>
    </div>
  );
}
