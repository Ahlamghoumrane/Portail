import { useState } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.jpg";
import "../styles/Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Veuillez remplir tous les champs.");
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError("Email ou mot de passe invalide.");
    } else {
      localStorage.setItem("userEmail", email); 
      navigate("/Catalog");
    }
  };

  return (
    <div className="login-page">
      <div className="login">
        <div className="login-container">
          <img src={logo} alt="Logo" className="logo" />
          <h1>Bienvenue sur ID AMAN</h1>
          <p>Assurez votre conformité des maintenant</p>
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
              disabled={!email || !password}
            >
              Se connecter
            </button>

            {error && <p className="error-message">{error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
