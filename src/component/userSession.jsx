// Get User
export const getUser = () => {
  const user = localStorage.getItem("bidkart_user");
  return user ? JSON.parse(user) : null;
};

// Get Token
export const getToken = () => {
  return localStorage.getItem("bidkart_token");
};

// Check Login
export const isLoggedIn = () => {
  return !!localStorage.getItem("bidkart_token");
};

// Logout
export const logoutUser = () => {
  localStorage.clear();
  sessionStorage.clear();
  window.location.href = "/login";
};