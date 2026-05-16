import React from 'react';
import RegisterForm from '../components/Auth/RegisterForm';
import { useNavigate } from 'react-router-dom';
import { UserPlus, LogIn } from 'lucide-react'; // Добавим иконок для стиля

import Button from '../components/Common/Button';

export default function SignUpPage() {
  const buttonStyles = `
  p-2 rounded-xl border border-white/10 backdrop-blur-xl bg-white/5 
  text-cyan-400 shadow-lg transition-all duration-300
  hover:bg-cyan-500 hover:text-black hover:shadow-[0_0_20px_rgba(6,182,212,0.4)]
  active:scale-95 mb-3
`;

  return (
    <div className="min-h-screen w-full bg-[#050b0a] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-from)_0%,_transparent_70%)] from-cyan-950/30 to-black flex flex-col justify-center items-center p-6">
      {/* Декоративный элемент сверху */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent opacity-30" />

      <div className="w-full max-w-md">
        {/* Header блока */}
        <div className="text-center mb-10">
          <div className="inline-block p-3 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-4">
            <UserPlus className="w-8 h-8 text-cyan-400" />
          </div>
          <h1 className="text-4xl font-black text-white uppercase tracking-tighter italic">
            New <span className="text-cyan-500">Identity</span>
          </h1>
          <p className="text-gray-500 font-mono text-xs mt-2 tracking-widest">
            ESTABLISHING SECURE CONNECTION...
          </p>
        </div>

        {/* Форма (Анимация внутри сохранена) */}
        <div className="relative group">
          {/* Свечение за формой */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-magenta-500 rounded-2xl opacity-10 group-hover:opacity-20 transition duration-1000 blur"></div>

          <div className="relative bg-gray-900/40 backdrop-blur-xl border border-white/10 p-8 rounded-2xl shadow-2xl">
            <RegisterForm />
          </div>
        </div>

        {/* Footer блока */}
        <div className="mt-10 flex flex-col items-center">
          <div className="flex items-center w-full gap-4 mb-6">
            <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-white/10" />
            <p className="text-gray-500 font-mono text-[10px] uppercase tracking-[0.2em]">
              Already Registered?
            </p>
            <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-white/10" />
          </div>

          <Button
            label="Authorize"
            icon={<LogIn className="w-4 h-4" />}
            styles={buttonStyles}
            link="/"
          />
        </div>
      </div>

      {/* Декоративные сканеры по бокам */}
      <div className="fixed top-0 left-4 h-full w-[1px] bg-cyan-500/5 hidden lg:block" />
      <div className="fixed top-0 right-4 h-full w-[1px] bg-cyan-500/5 hidden lg:block" />
    </div>
  );
}
