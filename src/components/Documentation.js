import React, { useState, useEffect } from "react";
import { useNavigate,Link } from "react-router-dom";
import "../styles/ApiDocumentation.css";
import logo from "../assets/Logo ID Aman (10).jpg";
import Tableaudebord from "../assets/tableau de bord.jpg";
import Documentation2 from "../assets/documentation2.jpg";
import Documentation1 from "../assets/documentation1.jpg";
import liveinterface from "../assets/Live interface.jpg";
import { FaSignOutAlt } from "react-icons/fa";
import { useLocation } from "react-router-dom";

const Documentation = () => {
  const [userEmail, setUserEmail] = useState(""); 
  const navigate = useNavigate(); 
  const location = useLocation();
const { apiServiceCode, apiImage, apidocumentationLink } = location.state || {};
const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    setUserEmail(email || "Utilisateur non connecté");
  }, []);
  const handleLogout = () => {
    localStorage.removeItem("userEmail"); 
    navigate("/"); 
  };
  const handleLogoClick = () => {
    navigate("/Catalog");
  };
  const getLinkClass = (path) => {
    return location.pathname === path ? "active-link" : "inactive-link";
  };

  return (
    <div className="dashboard-container">
      <header className="navbar">
        <div className="navbar-logo">
          <img src={logo} alt="Logo"  onClick={handleLogoClick}/>
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
        { apiServiceCode && apiImage && (
          <div className="api-info">
          <img src={apiImage} alt={ apiServiceCode} style={{ width: "150px", height: "80px",marginTop:"20px" }}/>
          <span className="api-name">{ apiServiceCode}</span>
        </div>        
)}
          <ul>
          <li>
          <Link to="/ApiDashboard" state={{  apiServiceCode, apiImage }} className={getLinkClass("/ApiDashboard")} >
          <img src={Tableaudebord} alt="Tableau de bord" /> Tableau de bord </Link>
          </li>
          <li>
            <Link to="/Documentation" state={{  apiServiceCode, apiImage , apidocumentationLink}}className={getLinkClass("/Documentation")}>
            <img src={Documentation2} alt="Documentation" />Documentation
            </Link>
          </li>
          <li>
            <Link to="/LiveInterface" state={{  apiServiceCode, apiImage }} className={getLinkClass("/LiveInterface")}>
            <img src={liveinterface} alt="liveinterface"  />Interface en direct
            </Link>
          </li>
        </ul>
        </aside>
        <main className="main-content">
          <h1><img src={Documentation1} alt="Documentation" style={{ width: "25px", height: "25px", marginRight: "10px" }} />Documentation de l'API</h1>
          <p> Comment utiliser votre API dans votre environnement</p>
          {apidocumentationLink && (
             <div style={{ position: "relative" }}>
             {isLoading && (
               <div
                 style={{
                   position: "absolute",
                   top: "50%",
                   left: "50%",
                   transform: "translate(-50%, -50%)",
                   fontSize: "18px",
                   color: "#555",
                 }}
               >
                 Chargement de la documentation...
               </div>
             )}
            <iframe
              src={apidocumentationLink}
              title={`Documentation ${apiServiceCode}`}
              style={{
                width: "100%",
                height: "80vh",
                border: "none",
              }}
              onLoad={() => setIsLoading(false)}
            />
         </div>
      )}
        </main>
      </div>
    </div>
  );
};

export default Documentation;
