import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Catalog from './components/Catalog';
import ApiDashboard from './components/ApiDashboard';
import Documentation from './components/Documentation';
import LiveInterface from './components/LiveInterface';


const App = () => {
  return (
   
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/ApiDashboard" element={<ApiDashboard />} />
        <Route path="/Documentation" element={<Documentation />} />
        <Route path="/LiveInterface" element={<LiveInterface />} />
      </Routes>
    </Router>
    
  );
};

export default App;
