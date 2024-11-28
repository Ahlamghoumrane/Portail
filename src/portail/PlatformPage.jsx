import React, { useEffect } from "react";
import { supabase } from "../supabaseClient"; 
import "../styles/styles.css"; 

const PlatformPage = () => {
  useEffect(() => {
    document.body.classList.add("platform");
    return () => {
      document.body.classList.remove("platform");
    };
  }, []);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error logging out:", error.message);
    } else {
      window.location.href = "http://localhost:3000/"; 
    }
  };

  return (
    
    <div className="platform-container">
      <button className="logout-button" onClick={handleLogout}>Log Out</button>
    </div>
    
  );
};

export default PlatformPage;
