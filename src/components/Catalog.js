import React, { useState, useEffect } from "react";
import "../styles/Catalog.css";
import logo from "../assets/Logo ID Aman (10).jpg";
import { FaSignOutAlt } from "react-icons/fa";
import profile from "../assets/profile.jpg";
import home1 from "../assets/home1.jpg";
import home from "../assets/home.jpg";
import settings1 from "../assets/settings1.jpg";
import settings from "../assets/settings.jpg";
import Facematching from "../assets/image-api-face-matching.jpg";
import Justificatifdedomicile from "../assets/image-api-proof-of-address.jpg";
import Document from "../assets/image-api-business-document.jpg";
import sanction from "../assets/image-api-pep-sanction-screening.jpg";
import iconlogo from "../assets/icon.jpg";
import { useNavigate, Link } from "react-router-dom";

const Catalog = () => {
  const [userEmail, setUserEmail] = useState("");
  const [activeTab, setActiveTab] = useState("apis");
  const [activeInnerTab, setActiveInnerTab] = useState("mesApis");
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
    navigate("/ApiDashboard", { state: { apiName, apiImage } });
  };

  const apis = [
    {
      id: 1,
      name: "Visage & ID Matching",
      image: Facematching,
      description: [
        "Vérifiez en temps réel la correspondance entre la photo en direct et le document d'identité pour prévenir toute tentative de fraude.",
      ],
      icon: <img src={iconlogo} alt="" />,
    },
    {
      id: 2,
      image: Justificatifdedomicile,
      name: "Justificatif de domicile",
      description: [
        "Extrayez automatiquement les informations d'adresse, validez leur récence et récupérez les dates d'émission pour une conformité sans faille.",
      ],
      icon: <img src={iconlogo} alt="" />,
    },
    {
      id: 3,
      name: "Document d’entreprise ",
      image: Document,
      description: [
        "Analysez et extrayez automatiquement les informations clés telles que le numéro de registre de commerce, la dénomination sociale et la date d'enregistrement pour une validation rapide et précise.",
      ],
      icon: <img src={iconlogo} alt="" />,
    },
    {
      id: 4,
      image: sanction,
      name: "PPE & Sanction Screening",
      description: [
        "Identifiez instantanément les personnes physiques et morales présentes sur les listes de sanctions et PEPs pour une gestion proactive des risques.",
      ],
      icon: <img src={iconlogo} alt="" />,
    },
  ];

  return (
    <div className="main-content">
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

      <div className="catalog-container">
        <div className="sidebar">
          <div className="profile">
            <img
              src={profile}
              alt="Profile"
              style={{
                width: "80px",
                height: "80px",
                marginRight: "10px",
                marginTop: "20px",
              }}
            />
            <p className="profile-email">{userEmail}</p>
            <nav>
              <ul>
                <li>
                  <Link
                    to="/Catalog"
                    onClick={() => setActiveTab("apis")}
                    className={activeTab === "apis" ? "active-link" : ""}
                  >
                    <img
                      src={home}
                      alt="home"
                      style={{
                        width: "20px",
                        height: "20px",
                        marginRight: "10px",
                      }}
                    />
                    APIs
                  </Link>
                  <Link to="/Catalog" onClick={() => setActiveTab("settings")}
                    className={activeTab === "settings" ? "active-link" : ""}
                  >
                    <img src={settings} alt="settings" style={{
                        width: "20px",
                        height: "20px",
                        marginRight: "10px",
                      }}
                    />
                    Paramètres
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="content-area">
          {activeTab === "apis" && (
            <>
              <h1>
                <img
                  src={home1}
                  alt="home"
                  style={{ width: "25px", height: "25px", marginRight: "10px" }}
                />
                APIs
              </h1>
              <div className="tabs">
                <h3
                  className={activeInnerTab === "mesApis" ? "active-tab" : ""}
                  onClick={() => setActiveInnerTab("mesApis")}
                  style={{ cursor: "pointer", marginRight: "20px" }}
                >
                  Mes APIs
                </h3>
                <h3
                  className={
                    activeInnerTab === "documents" ? "active-tab" : ""
                  }
                  onClick={() => setActiveInnerTab("documents")}
                  style={{ cursor: "pointer" }}
                >
                  Catalogue de documents
                </h3>
              </div>

              {activeInnerTab === "mesApis" && (
                <div className="api-grid">
                 
                </div>
              )}
              {activeInnerTab === "documents" && (
                <div className="api-grid">
                  {apis.map((api) => (
                    <div
                      key={api.id}
                      className="api-card"
                      onClick={() => handleApiClick(api.name, api.image)}
                      style={{ cursor: "pointer" }}
                    >
                      <div className="image-container">
                        <img src={api.image} alt={api.name} />
                        <button
                          className="see-api-button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleApiClick(api.name, api.image);
                          }}
                        >
                          Voir l'API
                        </button>
                      </div>
                      <h2>
                        <span className="api-icon"> {api.icon}</span>
                        <span className="api-name">{api.name}</span>
                      </h2>
                      <ul>
                        {api.description.map((desc, index) => (
                          <li key={index}>{desc}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {activeTab === "settings" && (
            <div className="settings-page">
              <h1>
                <img
                  src={settings1}
                  alt="settings"
                  style={{
                    width: "25px",
                    height: "25px",
                    marginRight: "10px",
                  }}
                />
                Paramètres
              </h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Catalog;
