import { useState } from "react";
import { supabase } from "../supabaseClient"; 
import { useNavigate } from "react-router-dom"; 
import logo from "../assets/icons.jpg";
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
      alert("Login successful!");
      navigate("/platform"); 
    }
  };

  return (
    <div className="login-container">
      <img
        src={logo} 
        alt="Logo"
        className="logo"
      />
      <h1>Log in</h1>
      <form onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="email">Email address</label>
        <input
          type="email"
          id="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {error && <span className="error-text">Required</span>}

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        
        <button
          type="submit"
          className="login-button"
          onClick={handleLogin}
          disabled={!email || !password}
        >
          Log in
        </button>
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
};

export default Login;
