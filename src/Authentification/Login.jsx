import { useState } from "react";
import { supabase } from "../supabaseClient"; 
import { useNavigate } from "react-router-dom"; 
import logo from "../assets/logo.jpg";
import "../styles/styles.css"; 

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); 

  // Fonction pour gérer la connexion
  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError("Invalid email or password");
    } else {
      
      navigate("/platform"); 
    }
  };

  return (
    <div className="login-page">
    <div className="login">
    <div className="login-container">
      <img
        src={logo} 
        alt="Logo"
        className="logo"
      />
      <h1>Bienvenue sur ID AMAN</h1>
      <form onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="email">Adresse mail</label>
        <input
          type="email"
          id="email"
          placeholder="Entrez votre email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {error && <span className="error-text">Required</span>}

        <label htmlFor="password">Mot de passe </label>
        <input
          type="password"
          id="password"
          placeholder="Entrez votre mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        
        <button
          type="submit"
          className="login-button"
          onClick={handleLogin}
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