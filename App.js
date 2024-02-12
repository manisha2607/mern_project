import React, { useState, useEffect } from 'react';
import './App.css';
import Home from './component/Home';
import { Routes, Route, Navigate } from 'react-router-dom'
import Signup from './component/Signup';
import Login from './component/Login';
import Chat from './component/Chat'; 

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setLoggedIn(true);
    }
  }, []);

  return (
    <Routes>
    <Route path="/" element={isLoggedIn ? <Home /> : <Signup />} />
    <Route path="/signup" element={ isLoggedIn ? <Navigate to="/" /> : <Signup setLoggedIn={setLoggedIn}/> } />
    <Route
      path="/login"
      element={
        isLoggedIn ? <Navigate to="/" /> : <Login setLoggedIn={setLoggedIn} />
      }
    />
    <Route
      path="/chat"
      element={isLoggedIn ? <Chat /> : <Navigate to="/login" />}
    />
  </Routes>
  );
}

export default App;
