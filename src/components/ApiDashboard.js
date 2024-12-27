import React, { useState, useEffect } from "react";
import { useNavigate ,Link } from "react-router-dom";
import "../styles/ApiDashboard.css";
import logo from "../assets/Logo ID Aman (10).jpg";
import Tableaudebord from "../assets/tableau de bord.jpg";
import Tableaudebord1 from "../assets/tableau de bord1.jpg";
import Documentation2 from "../assets/documentation2.jpg";
import liveinterface from "../assets/Live interface.jpg";
import { FaSignOutAlt ,FaKey,FaCopy,FaEyeSlash,FaEye} from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";


const ApiDashboard = () => {
  const [userEmail, setUserEmail] = useState(""); 
  const navigate = useNavigate(); 
  
  

  const handleLogoClick = () => {
    navigate("/Catalog");
  };

  const dataLastYear = [
    { name: "Janvier", traffic: 10 },
    { name: "Février", traffic: 15 },
    { name: "Mars", traffic: 20 },
    { name: "Avril", traffic: 25 },
    { name: "Mai", traffic: 10 },
    { name: "Juin", traffic: 5 },
    { name: "Juillet", traffic: 30 },
    { name: "Août", traffic: 40 },
    { name: "Septembre", traffic: 35 },
    { name: "Octobre", traffic: 20 },
    { name: "Novembre", traffic: 15 },
    { name: "Décembre", traffic: 10 },
  ];
  
  const dataLastQuarter = [
    { name: "Semaine 1", traffic: 15 },
    { name: "Semaine 2", traffic: 20 },
    { name: "Semaine 3", traffic: 25 },
    { name: "Semaine 4", traffic: 30 },
    { name: "Semaine 5", traffic: 10 },
  ];
  
  const dataLastDay = [
    { name: "00:00", traffic: 5 },
    { name: "06:00", traffic: 15 },
    { name: "12:00", traffic: 10 },
    { name: "18:00", traffic: 20 },
    { name: "23:59", traffic: 8 },
  ];
  

    const [selectedFilter, setSelectedFilter] = useState("Last Year");
  
    
    const getData = () => {
      switch (selectedFilter) {
        case "Last Year":
          return dataLastYear;
        case "Last Quarter":
          return dataLastQuarter;
        case "Last Day":
          return dataLastDay;
        default:
          return dataLastYear;
      }
    };
  
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
  const apiKeys = [
    {
      id: 1,
      name: "ID AMNA - Carte d'identité",
      createdAt: "2024-05-02T10:51:00",
      value: "1234567890abcdef", 
    },
  ];
  const getLinkClass = (path) => {
    return location.pathname === path ? "active-link" : "inactive-link";
  };
  const [visibleKey, setVisibleKey] = useState(null); 

  const handleToggleVisibility = (id) => {
    setVisibleKey(visibleKey === id ? null : id); 
  };

  const handleCopy = (keyValue) => {
    navigator.clipboard.writeText(keyValue); 
  };

  return (
    <div className="dashboard-container">
      <header className="navbar">
        <div className="navbar-logo">
          <img src={logo} alt="Logo" onClick={handleLogoClick} />
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
    <img src={apiImage} alt={apiName} style={{ width: "150px", height: "80px",marginTop:"20px" }} />
    <span className="api-name"s>{apiName}</span>  
  </div>
)}    
       <ul>
          <li>
          <Link to="/ApiDashboard" state={{ apiName, apiImage }} className={getLinkClass("/ApiDashboard")}>
          <img src={Tableaudebord} alt="Tableau de bord" /> Tableau de bord </Link>
          </li>
          <li>
            <Link to="/Documentation" state={{ apiName, apiImage }}className={getLinkClass("/Documentation")}>
            <img src={Documentation2} alt="Documentation"  />Documentation
            </Link>
          </li>
          <li>
            <Link to="/LiveInterface" state={{ apiName, apiImage }}className={getLinkClass("/LiveInterface")}>
            <img src={liveinterface} alt="liveinterface" />Interface en direct
            </Link>
          </li>
        </ul>
        </aside>
        <div className="api-dashboard">
      <header className="dashboard-header">
        <h1><img src={Tableaudebord1} alt="Tableau de bord" style={{ width: "25px", height: "25px", marginRight: "6px" }} /> Tableau de bord</h1>
        <p>Gérer l'utilisation et l'abonnement</p>
      </header>
        <section className="api-usage">
        <h3>Utilisation de l'API</h3>
        <div className="usage-info">
          <p><strong>25 pages gratuites restantes</strong></p>
          <p>Vos 25 pages gratuites mensuelles seront renouvelées le 2 décembre 2024.</p>
        </div>
      </section>
      <section className="api-metrics">
      <h3>Métriques de l'API</h3>
      <div className="metrics-filter">
        <button
          className={selectedFilter === "Last Year" ? "active-filter" : ""}
          onClick={() => setSelectedFilter("Last Year")}
        >
          L'année dernière
        </button>
        <button
          className={selectedFilter === "Last Quarter" ? "active-filter" : ""}
          onClick={() => setSelectedFilter("Last Quarter")}
        >
         Le dernier trimestre
        </button>
        <button
          className={selectedFilter === "Last Day" ? "active-filter" : ""}
          onClick={() => setSelectedFilter("Last Day")}
        >
          Le dernier jour
        </button>
      </div>
      <div className="metrics-chart">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={getData()}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="traffic" stroke="#003348" activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
    <section className="api-keys" style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
  <h3 style={{ color: '#003348', display: 'flex', alignItems: 'center', gap: '8px' }}>
    <FaKey size={20} />
    Clés API
  </h3>

  <div className="keys-list" style={{ marginTop: '20px' }}>
    {apiKeys.length > 0 ? (
      apiKeys.map((key) => (
        <div
          className="key-card"
          key={key.id}
        >
          
            <h4 style={{ margin: '0', color: '#003348' }}>{userEmail}</h4> 
            <p style={{ margin: '5px 0', color: '#666' }}>
              Créée : {new Date(key.createdAt).toLocaleString()}
            </p>
            <p style={{ fontFamily: 'monospace', color: '#003348',marginTop:"40px" }}>
              {visibleKey === key.id ? key.value : '*'.repeat(40)} 
         
            <button
              onClick={() => handleToggleVisibility(key.id)}
              style={{background: 'none',border: 'none',color: '#003348',cursor: 'pointer',fontSize: '16px',}}>
              {visibleKey === key.id ? <FaEyeSlash /> : <FaEye />}
            </button>
            <button
              onClick={() => handleCopy(key.value)}
              style={{background: 'none',border: 'none',color: '#003348',cursor: 'pointer',fontSize: '16px',}}>
              <FaCopy />
            </button></p>
          </div>
      ))
    ) : (
      <p style={{ color: '#666' }}>Aucune clé API disponible.</p>
    )}
  </div>
</section>


    </div>
      </div>
    </div>
  );
};

export default ApiDashboard;
