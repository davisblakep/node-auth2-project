import React from 'react';
import './App.css';
import HomePage from './pages/HomePage';
import NavBar from './navbar/NavBar';

function App() {
  return (
    <div>
      <NavBar />
      <div>
        <HomePage />
      </div>
    </div>
  );
}

export default App;
