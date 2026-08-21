import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("bidkart_user");
    const storedToken = localStorage.getItem("bidkart_token");

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    }

    setLoading(false);
  }, []);

  const login = (userData, tokenData) => {
    localStorage.setItem("bidkart_user", JSON.stringify(userData));
    localStorage.setItem("bidkart_token", tokenData);

    setUser(userData);
    setToken(tokenData);
  };

  const logout = () => {
    localStorage.removeItem("bidkart_user");
    localStorage.removeItem("bidkart_token");

    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        logout,
        isAuthenticated: !!token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);