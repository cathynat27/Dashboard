// AuthContext.js
import React, { createContext, useContext, useState, useEffect } from "react";

// Create AuthContext
const AuthContext = createContext();

// Create AuthProvider component
export const AuthProvider = ({ children }) => {
  // Initialize state from localStorage or default values
  const [userRole, setUserRole] = useState(() => {
    return localStorage.getItem('userRole') || null;
  });
  
  const [userNames, setUserNames] = useState(() => {
    return localStorage.getItem('userNames') || "";
  });
  
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('isLoggedIn') === 'true';
  });
  
  const [notificationCount, setNotificationCount] = useState(() => {
    return parseInt(localStorage.getItem('notificationCount')) || 0;
  });
  
  const [selectedUser, setSelectedUser] = useState(() => {
    const saved = localStorage.getItem('selectedUser');
    return saved ? JSON.parse(saved) : null;
  });

  // Persist to localStorage whenever state changes
  useEffect(() => {
    if (userRole) {
      localStorage.setItem('userRole', userRole);
    } else {
      localStorage.removeItem('userRole');
    }
  }, [userRole]);

  useEffect(() => {
    localStorage.setItem('userNames', userNames);
  }, [userNames]);

  useEffect(() => {
    localStorage.setItem('isLoggedIn', isLoggedIn.toString());
  }, [isLoggedIn]);

  useEffect(() => {
    localStorage.setItem('notificationCount', notificationCount.toString());
  }, [notificationCount]);

  useEffect(() => {
    if (selectedUser) {
      localStorage.setItem('selectedUser', JSON.stringify(selectedUser));
    } else {
      localStorage.removeItem('selectedUser');
    }
  }, [selectedUser]);

  const updateUserNames = (newUserNames) => {
    setUserNames(newUserNames);
  };

  const updateNotificationCount = (newCount) => {
    setNotificationCount(newCount);
  };

  const handleLoginIndex = () => setIsLoggedIn(true);
  
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole(null);
    setUserNames("");
    setNotificationCount(0);
    setSelectedUser(null);
    // Clear localStorage on logout
    localStorage.removeItem('userRole');
    localStorage.removeItem('userNames');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('notificationCount');
    localStorage.removeItem('selectedUser');
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
  };

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
        notificationCount,
        setNotificationCount,
        updateNotificationCount,
        selectedUser,
        setSelectedUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to consume AuthContext
export const useAuth = () => useContext(AuthContext);
