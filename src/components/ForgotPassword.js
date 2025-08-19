import { useState } from "react";
import { supabase } from "../supabaseClient"; 
import { Link } from "react-router-dom";
import logo from "../assets/logo.jpg";


const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!email) {
      setError("Veuillez entrer votre adresse e-mail.");
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email.trim()); 

      if (error) {
        console.error("Erreur Supabase:", error); 
        setError("Une erreur est survenue. Essayez à nouveau.");
      } else {
        
        setMessage("Si cet e-mail existe dans notre base de données, un e-mail de réinitialisation a été envoyé.");
      }
    } catch (error) {
      console.error("Erreur lors de la tentative de réinitialisation:", error); // Affiche les erreurs côté client
      setError("Une erreur est survenue. Essayez à nouveau.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="forgot-password-container">
      <img src={logo} alt="Logo ID Aman" className="logoforgot" />
      <h2>Réinitialiser votre mot de passe</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Entrez votre e-mail"
            aria-label="Email"
          />
        </div>
        {error && <p className="error-message" aria-live="assertive">{error}</p>}  {/* Affichage de l'erreur */}
        {message && <p className="success-message" aria-live="assertive">{message}</p>}
        <button type="submit" disabled={isLoading} aria-live="polite">
          {isLoading ? "Envoi en cours..." : "Envoyer le lien de réinitialisation"}
        </button>
      </form>
      <div className="login-link">
        <Link to="/">Retour à la connexion</Link>
      </div>
    </div>
  );
};

export default ForgotPassword;
