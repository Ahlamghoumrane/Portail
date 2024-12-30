import React, { useState, useEffect } from "react";
import "../styles/Catalog.css";
import "../styles/Settings.css";
import logo from "../assets/Logo ID Aman (10).jpg";
import { FaSignOutAlt } from "react-icons/fa";
import profile from "../assets/profile.jpg";
import home1 from "../assets/home1.jpg";
import home from "../assets/home.jpg";
import settings from "../assets/settings.jpg";
import settings1 from "../assets/settings1.jpg";
import Facematching from "../assets/image-api-face-matching.jpg";
import Justificatifdedomicile from "../assets/image-api-proof-of-address.jpg";
import Document from "../assets/image-api-business-document.jpg";
import sanction from "../assets/image-api-pep-sanction-screening.jpg";
import iconlogo from "../assets/icon.jpg";
import { useNavigate, Link } from "react-router-dom";
import axios from 'axios';

const Catalog = () => {
  const [userEmail, setUserEmail] = useState("");
  const [activeTab, setActiveTab] = useState("apis");
  const [activeInnerTab, setActiveInnerTab] = useState("profil");
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    Prénom: 'Non renseigné',
    Nom: 'Non renseigné',
    email: 'Non renseigné',
    tel: 'Non renseigné',
    entreprise: 'Non renseigné',
    Activité: 'Non renseigné',
    Adresse: 'Non renseigné',
    Alerte: 'Non renseigné',
    identification: 'Non renseigné',
    type: 'Non renseigné',
    Facturation: 'Non renseigné',
  });

  const navigate = useNavigate();

  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    setUserEmail(email || "");
  }, []);

  useEffect(() => {
    const fetchOrganizationData = async () => {
      try {
        const response = await axios.get(
          'https://api-metadata-services-580423739496.europe-west9.run.app/api/organization_metadata?organization_id=ff46fac6-f7aa-47fb-875c-f3e26fc0f2d7',
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer 973b404d-f549-42de-bb17-95211c1bdf0a`
            }
          }
        );
        console.log('Statut HTTP:', response.status);  
        if (response.status === 200) {
          console.log('Données reçues:', response.data); 
          setFormData({
            Prénom: response.data.admin_first_name || 'Non renseigné',
            Nom: response.data.admin_last_name || 'Non renseigné',
            email: response.data.contact_email || 'Non renseigné',
            tel: response.data.admin_tel || 'Non renseigné',
            entreprise: response.data.organization_name || 'Non renseigné',
            Activité: response.data.orga_activity || 'Non renseigné',
            Adresse: response.data.orga_address || 'Non renseigné',
            Alerte: response.data.orga_alert_email || 'Non renseigné',
            identification: response.data.orga_register_num || 'Non renseigné',
            type: response.data.status !== undefined ? (response.data.status ? 'Active' : 'Inactive') : 'Non renseigné',
            Facturation: response.data.orga_invoice_email || 'Non renseigné',
          });
        } else {
          console.error('Erreur dans la réponse de l\'API:', response.status);
        }
  
        setIsLoading(false);  
      } catch (err) {
        console.error('Erreur lors de la récupération des données:', err);  
        setIsLoading(false);
      }
    };
  
    fetchOrganizationData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  useEffect(() => {
    if (activeTab === "apis") {
      setActiveInnerTab("mesApis");  
    }
  }, [activeTab]);

  useEffect(() => {
    if (activeTab === "settings") {
      setActiveInnerTab("profil");  
    }
  }, [activeTab]); 

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
      icon: (
        <img
          src={iconlogo}
          alt=""
          style={{ width: "15px", height: "20px", objectFit: "contain" }}
        />
      ),
    },
    {
      id: 2,
      name: "Justificatif de domicile",
      image: Justificatifdedomicile,
      description: [
        "Extrayez automatiquement les informations d'adresse, validez leur récence et récupérez les dates d'émission pour une conformité sans faille.",
      ],
      icon: (
        <img
          src={iconlogo}
          alt=""
          style={{ width: "15px", height: "20px", objectFit: "contain" }}
        />
      ),
    },
    {
      id: 3,
      name: "Document d’entreprise",
      image: Document,
      description: [
        "Analysez et extrayez automatiquement les informations clés telles que le numéro de registre de commerce, la dénomination sociale et la date d'enregistrement pour une validation rapide et précise.",
      ],
      icon: (
        <img
          src={iconlogo}
          alt=""
          style={{ width: "15px", height: "20px", objectFit: "contain" }}
        />
      ),
    },
    {
      id: 4,
      name: "PPE & Sanction Screening",
      image: sanction,
      description: [
        "Identifiez instantanément les personnes physiques et morales présentes sur les listes de sanctions et PEPs pour une gestion proactive des risques.",
      ],
      icon: (
        <img
          src={iconlogo}
          alt=""
          style={{ width: "15px", height: "20px", objectFit: "contain" }}
        />
      ),
    },
  ];

  if (isLoading) {
    return <div>Loading...</div>;
  }

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
              style={{ width: "80px", height: "80px", margin: "20px auto" }}
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
                    <img src={home} alt="home" />
                    APIs
                  </Link>
                </li>
                <li>
                  <Link
                    to="/Catalog"
                    onClick={() => setActiveTab("settings")}
                    className={activeTab === "settings" ? "active-link" : ""}
                  >
                    <img src={settings} alt="settings" />
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
                >
                  Mes APIs
                </h3>
                <h3
                  className={
                    activeInnerTab === "documents" ? "active-tab" : ""
                  }
                  onClick={() => setActiveInnerTab("documents")}
                >
                  Catalogue de documents
                </h3>
              </div>
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
                        <img id="image" src={api.image} alt={api.name} />
                        <button
                          className="see-api-button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleApiClick(api.name, api.image);
                          }}
                        >
                          <h6 className="api-button">Voir l'API</h6>
                        </button>
                      </div>
                      <h2>
                        {api.icon}
                        {api.name}
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
            <div>
              <h2>
                <img src={settings1} alt="settings" style={{ width: "20px", height: "20px", marginRight: "10px" }} />
                Paramètres
              </h2>
              <p>gérer vos paramètres de compte</p>
              <div className="tabs">
                <h3
                  className={activeInnerTab === "profil" ? "active-tab" : ""}
                  onClick={() => setActiveInnerTab("profil")}
                >
                  Profil
                </h3>
                <h3
                  className={activeInnerTab === "entreprise" ? "active-tab" : ""}
                  onClick={() => setActiveInnerTab("entreprise")}
                >
                  Informations sur l’entreprise
                </h3>
              </div>

              {activeInnerTab === "profil" && (
                <div className="settings-section">
                  <h2>Profil</h2>
                  <form className="form-grid">
                    {console.log('formData:', formData)} 
                    <div className="form-group">
                      <label>Prénom</label>
                      <input type="text" name="Prénom" placeholder="Prénom" value={formData.Prénom} onChange={handleInputChange} />
                    </div>
                    <div className="form-group">
                      <label>Nom</label>
                      <input type="text" name="Nom" placeholder="Nom" value={formData.Nom} onChange={handleInputChange} />
                    </div>
                    <div className="form-group">
                      <label>Adresse email</label>
                      <input name="email" type="email" value={formData.email} onChange={handleInputChange} />
                    </div>
                    <div className="form-group">
                      <label> N° de téléphone</label>
                      <input name="tel" type="tel" value={formData.tel} onChange={handleInputChange} />
                    </div>
                  </form>
                </div>
              )}

              {activeInnerTab === "entreprise" && (
                <div className="settings-section">
                  <h2>Informations sur l’entreprise</h2>
                  <form className="form-grid">
                    {console.log('formData:', formData)} 
                    <div className="form-group">
                      <label>Raison sociale </label>
                      <input name="entreprise" type="text" value={formData.entreprise} onChange={handleInputChange} />
                    </div>
                    <div className="form-group">
                      <label> Activité </label>
                      <input name="Activité" type="text" value={formData.Activité} onChange={handleInputChange} />
                    </div>
                    <div className="form-group">
                      <label>Adresse du siège</label>
                      <input name="Adresse" type="text" value={formData.Adresse} onChange={handleInputChange} />
                    </div>
                    <div className="form-group">
                      <label>Alerte email </label>
                      <input name="Alerte" type="email" value={formData.Alerte} onChange={handleInputChange} />
                    </div>
                    <div className="form-group">
                      <label>N° d’identification</label>
                      <input name="identification" type="text" value={formData.identification} onChange={handleInputChange} />
                    </div>
                    <div className="form-group">
                      <label>Type d'entreprise</label>
                      <select name="type" value={formData.type} style={{ width: "85%" }} onChange={handleInputChange}>
                        <option value="sarl">SARL</option>
                        <option value="sas">SAS</option>
                        <option value="autoentrepreneur">Auto-entrepreneur</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Facturation email</label>
                      <input name="Facturation" type="email" value={formData.Facturation} onChange={handleInputChange} />
                    </div>
                  </form>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Catalog;