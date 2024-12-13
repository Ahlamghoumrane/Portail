import React, { useState, useEffect } from "react";
import { useNavigate,Link } from "react-router-dom";
import "../styles/ApiDocumentation.css";
import logo from "../assets/logo1.jpg";
import { FaHome, FaFileAlt, FaChartLine, FaSignOutAlt } from "react-icons/fa";
import { useLocation } from "react-router-dom";

const Documentation = () => {
  const [userEmail, setUserEmail] = useState(""); 
  const navigate = useNavigate(); 
  const location = useLocation();
const { apiName, apiImage } = location.state || {};
  
  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    setUserEmail(email || "Utilisateur non connecté");
  }, []);
  const handleLogout = () => {
    localStorage.removeItem("userEmail"); 
    navigate("/"); 
  };

  return (
    <div className="dashboard-container">
      <header className="navbar">
        <div className="navbar-logo">
          <img src={logo} alt="Logo" />
        </div>
        <div className="navbar-right">
          <span className="user-email">{userEmail}</span>
          <button className="logout-button" onClick={handleLogout}>
            <FaSignOutAlt style={{ marginRight: "5px" }} /> Déconnexion
          </button>
        </div>
      </header>
      <div className="dashboard-layout">
        <aside className="sidebar">
        {apiName && apiImage && (
          <div className="api-info">
          <img src={apiImage} alt={apiName} className="api-image" />
          <span className="api-name">{apiName}</span>
        </div>        
)}
          <ul>
          <li>
            <Link to="/ApiDashboard" state={{ apiName, apiImage }}>
              <FaHome style={{ marginRight: "10px" }} />
              Tableau de bord
            </Link>
          </li>
          <li>
            <Link to="/Documentation" state={{ apiName, apiImage }}>
              <FaFileAlt style={{ marginRight: "10px" }}/>
              Documentation
            </Link>
          </li>
          <li>
            <Link to="/LiveInterface" state={{ apiName, apiImage }}>
              <FaChartLine style={{ marginRight: "10px" }} />
              Interface en direct
            </Link>
          </li>
        </ul>
        </aside>
        <main className="main-content">
          <h2><FaFileAlt style={{ marginRight: "10px" }}/>Documentation de l'API</h2>
          <p> Comment utiliser votre API dans votre environnement</p>
        </main>
      </div>
    </div>
  );
};

export default Documentation;
