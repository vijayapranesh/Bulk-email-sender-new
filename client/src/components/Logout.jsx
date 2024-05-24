import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    const logout = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          await axios.post(
            "http://localhost:4001/api/auth/logout",
            { token },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          localStorage.removeItem("token"); // Clear the token from local storage
          navigate("/login"); // Redirect to the login page
          alert("You have been successfully logged out.");
        } catch (error) {
          alert("Failed to logout");
        }
      } else {
        navigate("/login"); // Redirect to the login page if no token is found
      }
    };

    logout();
  }, [navigate]);

  return null; // This component does not render anything
}

export default Logout;
