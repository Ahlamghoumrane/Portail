import React, { useState, useEffect } from "react";
import { useNavigate,Link } from "react-router-dom";
import "../styles/LiveInterface.css";
import logo from "../assets/logo1.jpg";
import liveInterface from "../assets/live interface.png";
import { FaHome, FaFileAlt, FaChartLine, FaSignOutAlt,FaCamera,FaFileUpload } from "react-icons/fa";
import { useLocation } from "react-router-dom";

const LiveInterface = () => {
  const [userEmail, setUserEmail] = useState(""); 
  const navigate = useNavigate(); 
  const location = useLocation();
  const { apiName, apiImage } = location.state || {};
  const [activeTab, setActiveTab] = useState("extracted");

  
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
      <div className="live-interface">
        <div className="document-viewer">
          <img
            src={liveInterface}
            alt="Scanned Document"
            className="document-image"
          />
          <div className="document-actions">
            <button className="camera-button"><FaCamera style={{ marginRight: "10px" }} />Réponse de l'API</button>
            <button className="upload-button">< FaFileUpload style={{ marginRight: "10px" }} />Ajouter un document</button>
          </div>
        </div>
        <div className="tab-container">
        <div className="tabs">
          <button
            className={activeTab === "extracted" ? "tab active" : "tab"}
            onClick={() => setActiveTab("extracted")}
          >
            Extracted Data
          </button>
          <button
            className={activeTab === "api" ? "tab active" : "tab"}
            onClick={() => setActiveTab("api")}
          >
            API Response
          </button>
        </div>
        <div className="tab-content">
          {activeTab === "extracted" && (
            <div className="extracted-data">
              <h2>Données extraites</h2>
              <ul>
              <li>
                <strong>Country Code:</strong> GBR
                <span className="confidence">Confidence score: 1</span>
              </li>
              <li>
                <strong>ID Number:</strong> 707797979
                <span className="confidence">Confidence score: 1</span>
              </li>
              <li>
                <strong>Given Name(s):</strong> HENRI
                <span className="confidence">Confidence score: 0.99</span>
              </li>
              <li>
                <strong>Surname:</strong> PUDARSAN
                <span className="confidence">Confidence score: 0.99</span>
              </li>
              <li>
                <strong>Date of Birth:</strong> 1995-05-20
                <span className="confidence">Confidence score: 1</span>
              </li>
              <li>
                <strong>Place of Birth:</strong> CAMBRIDGE
                <span className="confidence">Confidence score: 0.89</span>
              </li>
              <li>
                <strong>Gender:</strong> M
                <span className="confidence">Confidence score: 1</span>
              </li>
              <li>
                <strong>Date of Issue:</strong> 2012-04-22
                <span className="confidence">Confidence score: 1</span>
              </li>
              <li>
                <strong>Expiry Date:</strong> 2017-04-22
                <span className="confidence">Confidence score: 1</span>
              </li>
              </ul>
            </div>
          )}

          {activeTab === "api" && (
            <div className="api-response">
              <h2>Réponse de l'API</h2>
              <pre>
              {`{
  "country_code": "GBR",
  "id_number": "707797979",
  "given_names": ["HENRI"],
  "surname": "PUDARSAN",
  "date_of_birth": "1995-05-20",
  "place_of_birth": "CAMBRIDGE",
  "gender": "M",
  "date_of_issue": "2012-04-22",
  "expiry_date": "2017-04-22"
}`}
            </pre>
            </div>
          )}
        </div>
      </div>
        </div>

    </main>
      </div>
    </div>
  );
};

export default LiveInterface;
