import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CyberInsight({ text }) {
  const isDataLoading = !text || text.includes('Очікую завантаження');

  return (
    <div className="p-1.5 font-mono w-full">
      <motion.div
        layout
        transition={{ type: 'spring', stiffness: 180, damping: 25 }}
        className="relative border-l-4 border-cyan-500 bg-gray-900/30 p-5 shadow-[0_0_20px_rgba(6,182,212,0.15)] backdrop-blur-md rounded-r-xl min-h-[110px] flex flex-col justify-between overflow-hidden"
      >
        <div className="absolute top-0 left-0 h-[1px] w-full bg-gradient-to-r from-cyan-500/50 via-transparent to-transparent" />
        <div className="mb-2 text-[10px] uppercase tracking-[0.3em] text-cyan-400/70 flex items-center gap-2 select-none">
          <span
            className={`h-1.5 w-1.5 rounded-full bg-cyan-500 ${isDataLoading ? 'animate-ping' : 'animate-pulse'}`}
          />
          {isDataLoading ? 'AI_CORE: DECODING_STREAM...' : 'AI_CORE: INSIGHT_READY'}
        </div>
        <div className="flex-1 flex items-center">
          <AnimatePresence mode="wait">
            {isDataLoading ? (
              <motion.div
                key="cyber-loader"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-full"
              >
                <div className="text-sm text-cyan-500/40 tracking-widest break-all select-none">
                  <span className="animate-pulse">X90_TR4_//_</span>
                  {Array.from({ length: 12 })
                    .map(() => String.fromCharCode(33 + Math.floor(Math.random() * 50)))
                    .join('')}
                </div>
                <div className="text-[11px] text-gray-500 mt-1 uppercase tracking-wider">
                  Аналізую метрики дедлайнів...
                </div>
              </motion.div>
            ) : (
              <motion.p
                key="cyber-text"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="text-sm font-medium text-gray-200 leading-relaxed tracking-wide w-full"
              >
                <TypewriterText text={text} />
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {isDataLoading && (
          <motion.div
            initial={{ top: '0%' }}
            animate={{ top: '100%' }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
            className="absolute left-0 h-[1px] w-full bg-cyan-500/20 shadow-[0_0_8px_cyan]"
          />
        )}

        {/* Правый нижний маркер хакера */}
        <div className="absolute bottom-1 right-2 text-[8px] font-mono text-white/10 select-none">
          TW_AI_v3.6
        </div>
      </motion.div>
    </div>
  );
}

// Эффект заменяющихся символов (расшифровка)
const TypewriterText = ({ text }) => {
  const [displayedText, setDisplayedText] = useState('');
  const characters = 'XYZ0123456789#$@%?_/';

  useEffect(() => {
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayedText(
        text
          .split('')
          .map((char, index) => {
            if (index < iteration) return text[index];
            return characters[Math.floor(Math.random() * characters.length)];
          })
          .join(''),
      );

      if (iteration >= text.length) clearInterval(interval);
      iteration += 1;
    }, 20);

    return () => clearInterval(interval);
  }, [text]);

  return <span>{displayedText}</span>;
};
