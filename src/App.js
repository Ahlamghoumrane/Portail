import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Authentification/Login";
import PlatformPage from "./portail/PlatformPage";
import "./styles/styles.css"; 



const App = () => {
  useEffect(() => {
    
    document.body.classList.add("login"); 
    return () => {
      document.body.classList.remove("login"); 
    };
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/platform" element={<PlatformPage />} />
      </Routes>
    </Router>
  );
};

export default App;
