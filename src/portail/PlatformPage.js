import React from "react";
import { supabase } from "../supabaseClient"; 


const PlatformPage = () => {
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error logging out:", error.message);
    } else {
      window.location.href = "http://localhost:3000/"; 
    }
  };

  return (
    <div className="platform-page">
      <div className="platform-container">
        <button className="logout-button" onClick={handleLogout}>Log Out</button>
      </div>
    </div>
  );
};

export default PlatformPage;
