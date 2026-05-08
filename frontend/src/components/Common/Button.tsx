import { Icon } from 'lucide-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
export const Button = ({ onClick= () => {}, label='', icon='', styles, to='' }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (to) {
      navigate(to);
    } else if (onClick){
      onClick();
    }
  };

  return (
    
      <button
        onClick={handleClick}
        className={styles}
      >
        <div className="flex">
          {icon}
          <span>{label}</span>
        </div>
      </button>

  );
};

export default Button;


