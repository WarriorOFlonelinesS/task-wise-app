import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SignUpPage from './pages/SignUpPage';
import React from 'react';

import ProfilePage from './pages/ProfilePage';
import StatisticPage from './pages/StatisticPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/statistic" element={<StatisticPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
