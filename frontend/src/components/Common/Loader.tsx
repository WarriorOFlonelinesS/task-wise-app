import React from 'react';

export default function Loader() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-[#c9e7e2] font-sans bg-gradient-to-br from-[#0f3936] to-[#184e4a] w-screen">
      <h1 className="text-5xl font-bold text-[#e6f7f3] m-0">Task Wise AI</h1>
      <p className="text-2xl font-normal text-[#a3cfc7] mt-4 mb-12 text-center leading-snug">
        Bringing your tasks to the next level
        <br />
        with AI
      </p>
      <div className="my-8 flex justify-center">
        <div className="w-32 h-32 rounded-full border-4 border-[#2bb89b33] border-t-[#2bb89b] flex items-center justify-center animate-spin">
          <img
            src="/openai-mark.png"
            alt="AI Logo"
            className="w-16 h-16 drop-shadow-[0_0_8px_#2bb89b88]"
          />
        </div>
      </div>
      <div className="mt-10 text-2xl text-[#e6f7f3] tracking-wide">Loading...</div>
    </div>
  );
}
