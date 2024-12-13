import React, { useState, useEffect } from "react";
import "../styles/Catalog.css";
import logo from "../assets/logo1.jpg";
import { FaListAlt, FaCogs,FaSignOutAlt} from "react-icons/fa";
import id from "../assets/id.png";
import passport from "../assets/id.png";
import invoice from "../assets/facture.png";
import sanction from "../assets/sanction.jpg";
import { FaIdCard, FaUserCheck , FaMapMarkerAlt,FaExclamationTriangle } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
const Catalog = () => {
  const [userEmail, setUserEmail] = useState("");
  const [activeTab, setActiveTab] = useState("apis");
  const navigate = useNavigate(); 

  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    setUserEmail(email || "");
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userEmail");
    navigate("/"); 
  };

  const handleApiClick = (apiName, apiImage) => {
    navigate(`/ApiDashboard`, { state: { apiName, apiImage } });
  };
  
  const apis = [
    {
      id: 1,
      name: "ID SCAN",
      image:id,
      description: [
        ".Scanner les documents",
        ".Contrôler les documents et leur classification en temps réel",
        ".Extraction de données",
      ],
      icon: <FaIdCard />,
    },
    {
      id: 2,
      image:passport,
      name: "LIVENESS SCAN",
      description: [
        ".Photo de la personne concernée",
        ".Vérification en temps réel de la correspondance de la photo avec le document d'identité",
      ],
      icon: <FaUserCheck />,
    },
    {
      id: 3,
      name: "ADDRESS SCAN",
      image:invoice,
      description: [
        ".Template Matching",
        ".Extraction automatique de l'adresse",
        ".Récupération de la date d'émission",
        ".Vérification de récence",
      ],
      icon: <FaMapMarkerAlt />,
    },
    {
      id: 4,
      image:sanction,
      name: "PEP/SANCTION SCAN",
      description: [
        ".Screening des personnes physiques et morales pour identifier les personnes sanctionnées/PEPs",
        ".Screening des personnes physiques et morales pour identifier les PEPs",
      ],
      icon: <FaExclamationTriangle />,
    },
  ];

  return (
    <div className="main-content">
      <header className="navbar">
        <div className="navbar-logo">
          <img src={logo} alt="Logo" />
        </div>
        <div className="navbar-right">
          <span className="user-email">{userEmail || "Utilisateur non connecté"}</span>
          <button className="logout-button" onClick={handleLogout}>
            <FaSignOutAlt style={{ marginRight: "5px" }} />Déconnexion
          </button>
        </div>
      </header>

      <div className="catalog-container">
        <div className="sidebar">
          <div className="profile">
          <i className="fa fa-user" style={{ fontSize: '60px', color: '#003348' }}></i>
            <p className="profile-email">{userEmail}</p>
            <nav>
              <ul>
                <li onClick={() => setActiveTab("apis")}>
                  <FaListAlt style={{ marginRight: "10px" }} /> APIs
                </li>
                <li onClick={() => setActiveTab("settings")}>
                  <FaCogs style={{ marginRight: "10px" }} /> Paramètres
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="content-area">
          <div className="header-tabs">
            {activeTab !== "settings" && (
              <>
                <h1><FaListAlt style={{ marginRight: "10px" }} />APIs</h1>
                <div className="tabs">
                  <h3
                    className={activeTab === "apis" ? "active-tab" : ""}
                    onClick={() => setActiveTab("apis")}
                    style={{ cursor: "pointer", marginRight: "20px" }}
                  >
                    Mes APIs
                  </h3>
                  <h3
                    className={activeTab === "documents" ? "active-tab" : ""}
                    onClick={() => setActiveTab("documents")}
                    style={{ cursor: "pointer" }}
                  >
                    Catalogue de documents
                  </h3>
                </div>
              </>
            )}
          </div>
          {activeTab === "apis" ? (
            <div className="api-grid">
              {apis.map((api) => (
                <div key={api.id} className="api-card">
                  <div className="image-container">
                    <img src={api.image} alt={api.name} />
                    <button
                      className="see-api-button"
                      onClick={() => handleApiClick(api.name,api.image)}
                    >
                      Voir l'API
                    </button>
                  </div>

                  <h3>{api.icon}{api.name}</h3>
                  <ul>
    {api.description.map((desc, index) => (
      <li key={index}>{desc}</li>
    ))}
  </ul>
                </div>
              ))}
            </div>
          ) : activeTab === "documents" ? (
            <div className="document-catalog">
              <h2>Catalogue de documents</h2>
            
            </div>
          ) : activeTab === "settings" ? (
            <div className="settings-page">
              <h1><FaCogs style={{ marginRight: "10px" }} />Paramètres </h1>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Catalog;

