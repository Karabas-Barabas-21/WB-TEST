import './App.css';
import React from 'react';
import UserDetailPage from './pages/UserDetailPage/UserDetailPage';
import HomePage from './pages/HomePage/HomePage';
import { Routes, Route } from 'react-router-dom'; // Добавьте это

function App() {
  

  return (
    <div className="App">
    <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/user/:id" element={<UserDetailPage />} /> {/* Путь должен совпадать с navigate() */}
      </Routes>

     
    </div>
  );
}

export default App;