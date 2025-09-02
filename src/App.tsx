import './App.css';
import React from 'react';
import UserDetailPage from './pages/UserDetailPage/UserDetailPage';
import HomePage from './pages/HomePage/HomePage';
import { Routes, Route } from 'react-router-dom'; 

function App() {
  

  return (
    <div className="App">
    <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/user/:id" element={<UserDetailPage />} /> {}
      </Routes>

     
    </div>
  );
}

export default App;