import { useState } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.jpg";
import "../styles/Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Veuillez remplir tous les champs.");
      return;
    }

    if (!validateEmail(email)) {
      setError("Adresse e-mail invalide.");
      return;
    }

    if (password.length < 6) {
      setError("Le mot de passe doit contenir au moins 6 caractères.");
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError("Email ou mot de passe invalide.");
        return;
      }

      const { user } = data;
      if (user) {
        const userId = user.id;
        const organizationId = userId; 
        localStorage.setItem("user_id", userId);
        localStorage.setItem("organization_id", organizationId);
        localStorage.setItem("userEmail", email);
        navigate("/Catalog"); 
      }
    } catch (err) {
      console.error("Erreur lors de la connexion :", err);
      setError("Une erreur inattendue s'est produite.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login">
        <div className="login-container">
          <img src={logo} alt="Logo" className="logo" />
          <h1>Bienvenue sur ID AMAN</h1>
          <p>Assurez votre conformité dès maintenant</p>
          <form onSubmit={handleLogin} className="login-form">
            <div className="input-container">
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <label htmlFor="email" className={email ? "active" : ""}>
                Adresse mail
              </label>
            </div>
            <div className="input-container">
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <label htmlFor="password" className={password ? "active" : ""}>
                Mot de passe
              </label>
            </div>
            <button
              type="submit"
              className="login-button"
              disabled={!email || !password || isLoading}
            >
              {isLoading ? "Connexion..." : "Se connecter"}
            </button>
            {error && <p className="error-message">{error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
