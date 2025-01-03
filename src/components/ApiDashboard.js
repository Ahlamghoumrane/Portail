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
import { Line } from "react-chartjs-2";
import {Chart as ChartJS,CategoryScale,LinearScale,PointElement,LineElement,Title,Tooltip,Legend,} from "chart.js";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);


const ApiDashboard = () => {
  const [metricsData, setMetricsData] = useState({});
  const [error, setError] = useState(null);
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
            //const cleanedData = tokenData.replace(/^"(.+)"$/, '$1');
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
    const [selectedType, setSelectedType] = useState("Succée");
    const [selectedPeriod, setSelectedPeriod] = useState("daily_last_30");
   
    useEffect(() => {
      const fetchApiMetrics = async () => {
        try {
          const AUTH_TOKEN = '973b404d-f549-42de-bb17-95211c1bdf0a';
    
          console.log("Service Code utilisé :", serviceCode);
    
          const SERVICE_METADATA_URL = `https://api-metadata-services-580423739496.europe-west9.run.app/api/service_metadata?service_code=${serviceCode}`;
          const metadataResponse = await fetch(SERVICE_METADATA_URL, {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Authorization': `Bearer ${AUTH_TOKEN}`,
            },
          });
    
          if (!metadataResponse.ok) {
            throw new Error(`Erreur Service Metadata : ${metadataResponse.statusText}`);
          }
    
          const serviceId = await metadataResponse.json();
          console.log("Service ID récupéré :", serviceId);
          const API_METRICS_URL = `https://api-metadata-services-580423739496.europe-west9.run.app/api/get_calls_statistics`;
          const params = new URLSearchParams({
            organization_id: "8067a437-22b9-49c7-9e84-129fff27a24b",
            service_id: serviceId,
          });
    
          console.log("URL des métriques :", `${API_METRICS_URL}?${params.toString()}`);
    
          const metricsResponse = await fetch(`${API_METRICS_URL}?${params.toString()}`, {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Authorization': `Bearer ${AUTH_TOKEN}`,
            },
          });
    
          if (!metricsResponse.ok) {
            throw new Error(`Erreur Metrics : ${metricsResponse.statusText}`);
          }
    
          const metricsData = await metricsResponse.json();
          console.log("Métriques récupérées :", metricsData);
    
          setMetricsData(metricsData);
        } catch (err) {
          setError(`Erreur : ${err.message}`);
          console.error("Erreur détectée :", err);
        }
      };
    
      if (serviceCode) {
        fetchApiMetrics();
      }
    }, [serviceCode]);
    
    const prepareChartData = () => {
      if (!metricsData.data || !metricsData.data[selectedType]) return null;
  
      const data = metricsData.data[selectedType][selectedPeriod];
      return {
        labels: data.map((item) => item.date),
        datasets: [
          {
            label: `${selectedType} (${selectedPeriod})`,
            data: data.map((item) => item.count),
            borderColor: selectedType === "Succée" ? "green" : "red",
            backgroundColor:
              selectedType === "Succée"
                ? "rgba(0, 255, 0, 0.3)"
                : "rgba(255, 0, 0, 0.3)",
          },
        ],
      };
    };
  
  const location = useLocation();
const { apiServiceCode, apiImage,apidocumentationLink } = location.state || {};
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
  if (error) {
    return <div>Error: {error}</div>;
  }
 
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
            <Link to="/Documentation" state={{ apiServiceCode, apiImage ,apidocumentationLink}} className={getLinkClass("/Documentation")}>
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
            <div className="keys-list" style={{  }}>
              {tokenData ? (
                <div className="key-card" style={{ marginBottom: "40px" }}>
                  <p style={{  display: "flex",  alignItems: "center",fontFamily: "monospace", color: "#003348", marginTop: "20px", gap: "5px", }}>
                    {visibleKey === 0 ? (
                      <pre style={{ margin: 0, whiteSpace: "nowrap"}}>{JSON.stringify(tokenData, null, 2)}</pre>
                    ) : (
                      <span >************************************</span>
                    )}
                    
                      <button className="toggle-key-button" onClick={() => handleToggleVisibility(0)}
                         style={{background: 'none',border: 'none',color: '#003348',cursor: 'pointer',fontSize: '16px'}}>
                        {visibleKey === 0 ?  <FaEye /> :<FaEyeSlash />}
                      </button>
                      <button className="copy-key-button" onClick={() => handleCopy(JSON.stringify(tokenData))}
                         style={{background: 'none',border: 'none',color: '#003348',cursor: 'pointer',fontSize: '16px'}}>
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
          <div style={{ display: "flex", alignItems: "center", gap: "20px", marginBottom: "20px" }}>
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
            
          }}
        >
          <option value="Succée">Succès</option>
          <option value="Erreur utilisation">Erreurs d'Utilisation</option>
        </select>
        <div>
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
      {{
        daily_last_30: "Derniers 30 jours",
        daily_last_month: "Mois dernier",
        monthly_last_year: "Année dernière (par mois)",
      }[period]}
    </button>
   ))}
 </div>
      </div>
      <div>
        {prepareChartData() ? (
          <Line data={prepareChartData()} />
        ) : (
          <div>Aucune donnée disponible pour le type et la période sélectionnés.</div>
        )}
      </div>

         </section>

    </div>
      </div>
    </div>
  );
};

export default ApiDashboard;
