import React, { useState, useEffect } from "react";
import { useNavigate ,Link} from "react-router-dom";
import "../styles/ApiDashboard.css";
import logo from "../assets/logo1.jpg";
import { FaHome, FaFileAlt, FaChartLine, FaSignOutAlt ,FaKey} from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const ApiDashboard = () => {
  const [userEmail, setUserEmail] = useState(""); 
  const navigate = useNavigate(); 
  const apiKeys = [
    {
      id: 1,
      name: "ID AMNA - Carte d'identité",
      createdAt: "02/05/2024 à 10h51",
    },
  ];
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
    <img src={apiImage} alt={apiName} style={{ width: "100px", height: "100px" }} />
    <span>{apiName}</span>  
  </div>
)}      
       <ul>
          <li>
            <Link to="/ApiDashboard" state={{ apiName, apiImage }}>
              <FaHome style={{ marginRight: "10px" }}/>
              Tableau de bord
            </Link>
          </li>
          <li>
            <Link to="/Documentation" state={{ apiName, apiImage }}>
              <FaFileAlt style={{ marginRight: "10px" }} />
              Documentation
            </Link>
          </li>
          <li>
            <Link to="/LiveInterface" state={{ apiName, apiImage }}>
              <FaChartLine style={{ marginRight: "10px" }}/>
              Interface en direct
            </Link>
          </li>
        </ul>
        </aside>
        <div className="api-dashboard">
      <header className="dashboard-header">
        <h2> <FaHome style={{ marginRight: "10px" }}/>Tableau de bord</h2>
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
      <section className="api-keys">
        <h2><FaKey size={30} />Clés API</h2>
        <p>Gérez vos clés API</p>
        <div className="keys-list">
          {apiKeys.map((key) => (
            <div className="key-card" key={key.id}>
              <div>
                <h3>{key.name}</h3>
                <p>Créée :  {key.createdAt}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
      </div>
    </div>
  );
};

export default ApiDashboard;
