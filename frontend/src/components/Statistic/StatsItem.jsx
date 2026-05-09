import React, { useEffect, useState } from 'react';

export const StatsItem = ({
  label,
  value,
  icon,
  max = 100,
  thresholds = { warning: 50, critical: 80 },
}) => {
  const [displayValue, setDisplayValue] = useState(0);
  const radius = 65;
  const circumference = 2 * Math.PI * radius;

  const percentage = Math.min((value / max) * 100, 100);
  const offset = circumference - (displayValue / max) * circumference;

  useEffect(() => {
    let start = 0;
    const duration = 1500;
    const increment = value / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setDisplayValue(value);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [value]);

  const getStatusColor = () => {
    if (value >= thresholds.critical) return 'text-red-500 stroke-red-500';
    if (value >= thresholds.warning) return 'text-yellow-400 stroke-yellow-400';
    return 'text-green-500 stroke-green-500';
  };

  const statusClasses = getStatusColor();
  return (
    <div className="flex flex-col items-center justify-center backdrop-blur-md bg-white/5 border border-white/10 rounded-full w-33 h-33 shadow-2xl transition-all hover:bg-white/10 group">
      <svg className="w-48 h-48 transform -rotate-90">
        <circle
          cx="96"
          cy="96"
          r={radius}
          stroke="currentColor"
          strokeWidth="6"
          fill="transperent"
          className="text-white/10"
        />
        <circle
          cx="96"
          cy="96"
          r={radius}
          stroke="currentColor"
          strokeWidth="6"
          fill="transperent"
          strokeDasharray={circumference}
          style={{
            strokeDashoffset: offset,
            transition: 'stroke-dashoffset 1.5s ease-out, stroke 0.5s ease',
          }}
          strokeLinecap="round"
          className={statusClasses.split(' ')[1]}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span
          className={`text-4l font-black tabular-nums transition-colors ${statusClasses.split(' ')[0]}`}
        >
          {displayValue}
        </span>
        <span className="text-gray-400 text-xs font-medium uppercase tracking-tighter mt-1">
          {label}
        </span>
        <div className="mt-2 text-white/40 group-hover:text-blue-400 transition-colors">{icon}</div>
      </div>
    </div>
  );
};
