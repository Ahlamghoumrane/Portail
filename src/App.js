import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import PlatformPage from './components/PlatformPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/platform" element={<PlatformPage />} />
      </Routes>
    </Router>
  );
}

export default App;

