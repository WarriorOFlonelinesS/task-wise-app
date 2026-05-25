import React, { useState } from 'react';

export default function AddTask({ onClose, addToDo }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md">
      <div className="relative rounded-lg border border-white w-full max-w-md p-8 mx-4">
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-2xl font-bold focus:outline-none"
          onClick={onClose}
          aria-label="Close"
        >
          &times;
        </button>

        <input
          type="text"
          placeholder="Додати нове завдання"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full mb-3 px-4 py-2 bg-transparent text-white placeholder-gray-400 border border-gray-500 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
        <input
          type="text"
          placeholder="Додати новий опис"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full mb-3 px-4 py-2 bg-transparent text-white placeholder-gray-400 border border-gray-500 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
        <button
          title="Add new task"
          className="w-full py-2 bg-transparent border border-[#00ff9f] text-[#00ff9f] uppercase font-mono tracking-tighter rounded-sm transition-all duration-300 hover:bg-[#00ff9f] hover:text-black hover:shadow-[0_0_15px_rgba(0,255,159,0.5)] disabled:opacity-20 disabled:grayscale disabled:border-white/20 disabled:text-white"
          onClick={() => {
            setTitle('');
            setDescription('');
            addToDo(title, description);
            onClose();
          }}
          disabled={title.length === 0 && description.length === 0}
        >
          ДОДАТИ ЗАВДАННЯ
        </button>
      </div>
    </div>
  );
}
