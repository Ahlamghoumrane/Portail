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
  const [serviceCode, setServiceCode] = useState(''); 
  const [tokenData, setTokenData] = useState(null);
  
  useEffect(() => {
    const fetchServiceToken = async () => {
     

      try {
        const API_URL = `https://api-metadata-services-580423739496.europe-west9.run.app/api/service_metadata?service_code=${serviceCode}`;
        const AUTH_TOKEN = '973b404d-f549-42de-bb17-95211c1bdf0a';

        const response = await fetch(API_URL, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${AUTH_TOKEN}`,
          },
        });

        if (response.ok) {
          const serviceData = await response.json();
          console.log('API Response for service metadata:', serviceData);

         
          const serviceId = serviceData; 
          const ORGANIZATION_ID = 'ff46fac6-f7aa-47fb-875c-f3e26fc0f2d7';
          const TOKEN_URL = `https://api-metadata-services-580423739496.europe-west9.run.app/api/orga_service_token?organization_id=${ORGANIZATION_ID}&service_id=${serviceId}`;

          const tokenResponse = await fetch(TOKEN_URL, {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Authorization': `Bearer ${AUTH_TOKEN}`,
            },
          });

          if (tokenResponse.ok) {
            const tokenData = await tokenResponse.json();
            console.log('API Response for service token:', tokenData);
            setTokenData(tokenData);
          } else {
           
            console.error('Error fetching token:', tokenResponse.statusText);
          }
        } else {
         
          console.error('Error fetching metadata:', response.statusText);
        }
      } catch (err) {
       
        console.error('Fetch error:', err);
      } finally {
      
      }
    };
    if (serviceCode) {
      fetchServiceToken();
    }

  }, [serviceCode]);

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
  

    const [selectedType, setSelectedType] = useState("Succée");
    const [selectedPeriod, setSelectedPeriod] = useState("daily_last_30");
  
    
    const getData = () => {
      switch (selectedPeriod) {
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
const { apiServiceCode, apiImage } = location.state || {};
useEffect(() => {
  if (apiServiceCode) {
    setServiceCode(apiServiceCode);
  }
}, [apiServiceCode]);
  
  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    setUserEmail(email || "Utilisateur non connecté");
  }, []);
  const handleLogout = () => {
    localStorage.removeItem("userEmail"); 
    navigate("/"); 
  };
 
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
        {apiServiceCode && apiImage && (
  <div className="api-info">
    <img src={apiImage} alt={apiServiceCode} style={{ width: "150px", height: "80px",marginTop:"20px" }} />
    <span className="api-name"s>{apiServiceCode}</span>  
  </div>
)}    
       <ul>
          <li>
          <Link to="/ApiDashboard" state={{ apiServiceCode, apiImage }} className={getLinkClass("/ApiDashboard")}>
          <img src={Tableaudebord} alt="Tableau de bord" /> Tableau de bord </Link>
          </li>
          <li>
            <Link to="/Documentation" state={{ apiServiceCode, apiImage }}className={getLinkClass("/Documentation")}>
            <img src={Documentation2} alt="Documentation"  />Documentation
            </Link>
          </li>
          <li>
            <Link to="/LiveInterface" state={{ apiServiceCode, apiImage }}className={getLinkClass("/LiveInterface")}>
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
      <section className="api-keys" style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
            <h3 style={{ color: "#003348", display: "flex", alignItems: "center", gap: "8px" }}>
              <FaKey size={20} />
              Clés API
            </h3>
            <div>
           
            </div>
            <div className="keys-list" style={{ marginTop: "20px" }}>
              {tokenData ? (
                <div className="key-card" style={{ marginBottom: "20px" }}>
                  <p style={{ fontFamily: "monospace", color: "#003348", marginTop: "40px",}}>
                    {visibleKey === 0 ? (
                      <pre>{JSON.stringify(tokenData, null, 2)}</pre>
                    ) : (
                      <span>************************************</span>
                    )}
                    
                      <button className="toggle-key-button" onClick={() => handleToggleVisibility(0)}
                         style={{background: 'none',border: 'none',color: '#003348',cursor: 'pointer',fontSize: '16px',marginLeft:"20px"}}>
                        {visibleKey === 0 ?  <FaEye /> :<FaEyeSlash />}
                      </button>
                      <button className="copy-key-button" onClick={() => handleCopy(JSON.stringify(tokenData))}
                         style={{background: 'none',border: 'none',color: '#003348',cursor: 'pointer',fontSize: '16px',marginLeft:"20px"}}>
                        <FaCopy />
                      </button>
                    
                  </p>
                </div>
              ) : (
                <p>Chargement des données...</p>
              )}
            </div>
          </section>
          <section className="api-metrics">
  <h3>Métriques de l'API</h3>
  <div className="metrics-filter">
  <div className="metrics-header" style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          style={{
            border: "none",
            background: "transparent",
            fontSize: "16px",
            color: "#003348",
            cursor: "pointer",
            outline: "none",
            margin: 0,
          }}
        >
          <option value="Success">Success</option>
          <option value="Errors">Errors</option>
        </select>
        <div style={{ display: "flex", gap: "20px" }}>
          {["daily_last_30", "daily_last_month", "monthly_last_year"].map((period) => (
            <button
              key={period}
              onClick={() => setSelectedPeriod(period)}
              style={{
                border: "none",
                background: "transparent",
                fontSize: "16px",
                color: selectedPeriod === period ? "#000" : "#003348",
                fontWeight: selectedPeriod === period ? "bold" : "normal",
                textDecoration: selectedPeriod === period ? "underline" : "none",
                cursor: "pointer",
              }}
            >
              {period}
            </button>
          ))}
        </div>
        </div>
  </div>
  <div className="metrics-chart">
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={getData()}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="traffic"
          stroke="#003348"
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </ResponsiveContainer>
  </div>
</section>

    </div>
      </div>
    </div>
  );
};

export default ApiDashboard;
