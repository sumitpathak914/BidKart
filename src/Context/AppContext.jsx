import React, { createContext, useContext, useState, useEffect } from "react";

// Initial State (Memory)
const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // --- Auth State (Global) ---
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);

  // --- Theme State (Global) ---
  const [darkMode, setDarkMode] = useState(false);

  // Check for user on app load (if exists in localStorage, load it)
  useEffect(() => {
    const savedUser = localStorage.getItem("bidkart_user");
    const savedToken = localStorage.getItem("bidkart_token");
    
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  // --- Auth Actions ---
  const login = (userData, tokenData) => {
    setUser(userData);
    setToken(tokenData);
    localStorage.setItem("bidkart_user", JSON.stringify(userData));
    localStorage.setItem("bidkart_token", tokenData);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("bidkart_user");
    localStorage.removeItem("bidkart_token");
  };

  // --- Theme Actions ---
  const toggleDarkMode = () => {
    setDarkMode((prev) => {
      const newValue = !prev;
      localStorage.setItem("bidkart_theme", newValue ? "dark" : "light");
      return newValue;
    });
  };

  return (
    <AppContext.Provider
      value={{
        user,
        token,
        showAuthModal,
        setShowAuthModal,
        login,
        logout,
        darkMode,
        toggleDarkMode,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use the context
export const useApp = () => useContext(AppContext);