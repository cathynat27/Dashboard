// AuthContext.js
import React, { createContext, useContext, useState } from "react";

// Create AuthContext
const AuthContext = createContext();

// Create AuthProvider component
export const AuthProvider = ({ children }) => {
  const [userRole, setUserRole] = useState(null);
  const [userNames, setUserNames] = useState("");
  const updateUserNames = (newUserNames) => {
    setUserNames(newUserNames);
  };

  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const handleLoginIndex = () => setIsLoggedIn(true);
  const handleLogout = () => setIsLoggedIn(false);
  return (
    <AuthContext.Provider
      value={{
        userRole,
        setUserRole,
        userNames,
        updateUserNames,
        setUserNames,
        isLoggedIn,
        setIsLoggedIn,
        handleLoginIndex,
        handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to consume AuthContext
export const useAuth = () => useContext(AuthContext);
