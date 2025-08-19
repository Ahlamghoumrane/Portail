import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import logo from "../assets/logo.jpg";


const ResetPassword = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  
  const token = new URLSearchParams(window.location.hash.replace("#", "?")).get("access_token");

  useEffect(() => {
    if (!token) {
      setError("Lien invalide ou expiré.");
    }
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (password.length < 6) {
      setError("Le mot de passe doit comporter au moins 6 caractères.");
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await supabase.auth.updateUser({
        password,
      }, { access_token: token });

      if (error) {
        setError("Erreur lors de la mise à jour du mot de passe.");
      } else {
        setMessage("Votre mot de passe a été mis à jour avec succès.");
        setTimeout(() => {
          navigate("/"); 
        }, 2000);
      }
    } catch (error) {
      setError("Une erreur est survenue. Essayez à nouveau.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="reset-password-container">
      <img src={logo} alt="Logo ID Aman" className="logoforgot" />
      <h2>Réinitialiser votre mot de passe</h2>
      {error && <p className="error-message">{error}</p>}
      {message && <p className="success-message">{message}</p>}
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Entrez votre nouveau mot de passe"
          />
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Mise à jour en cours..." : "Mettre à jour le mot de passe"}
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
