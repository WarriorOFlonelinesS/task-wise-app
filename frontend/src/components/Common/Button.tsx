import { Icon } from 'lucide-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
export const Button = ({ link, label, icon }) => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-center mx-auto p-2 rounded-lg">
        <button
          onClick={() => {
            navigate(link);
          }}
          className="w- backdrop-blur-md bg-white/5 px-3 py-1 backdrop-blur-xs rounded-md border border-gray-300 hover:bg-gray-600 transition-colors"
        >
          <div className='flex'>{icon}
          <span>{label}</span></div>
        </button>
    </div>
  );
};

export default Button;
