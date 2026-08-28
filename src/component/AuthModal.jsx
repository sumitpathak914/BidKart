// src/LoginPage.jsx
import {
  Briefcase,
  Eye,
  EyeOff,
  Lock,
  LogIn,
  Mail,
  MapPin,
  User,
  UserPlus,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Firebase मधून Token फंक्शन import करा
import { getDeviceToken } from "../Context/firebase";

const THEME = {
  ink: "#0F1638",
  gold: "#D9A441",
  goldSoft: "#FDF3E1",
  mapBg: "#E7ECFA",
};

const API_URL = "https://test.aakarcanvassing.com/api/auth";

export default function LoginPage() {
  const navigate = useNavigate();

  const [mode, setMode] = useState("login"); // login | register
  const [role, setRole] = useState("customer"); // customer | business
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
  const [fcmToken, setFcmToken] = useState(""); // For debugging
  const [showToken, setShowToken] = useState(false); // Toggle token visibility
  const [tokenError, setTokenError] = useState(""); // Store token errors

  // Login State
  const [loginData, setLoginData] = useState({ email: "", password: "" });

  // Register State (Customer)
  const [customerData, setCustomerData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
  });

  // Register State (Business)
  const [businessData, setBusinessData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    businessName: "",
    panNumber: "",
    gstNumber: "",
    businessAddress: "",
  });

  // Check if already logged in
  useEffect(() => {
    const savedUser = localStorage.getItem("bidkart_user");
    const token = localStorage.getItem("bidkart_token");
    if (savedUser && token) {
      navigate("/home");
    }

    // Hide splash screen after 2 seconds
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  // 🔥 Get and print FCM Token on component mount with better error handling
  useEffect(() => {
    const getAndPrintToken = async () => {
      try {
        console.log("🔄 Getting FCM Token...");
        console.log("📋 Checking if getDeviceToken function exists:", typeof getDeviceToken);
        console.log("📋 getDeviceToken function:", getDeviceToken);
        
        // Check if Firebase is initialized
        try {
          const token = await getDeviceToken();
          
          if (token && token !== null && token !== undefined && token !== "") {
            setFcmToken(token);
            setTokenError("");
            console.log("✅ FCM Token retrieved successfully!");
            console.log("📱 FCM Token:", token);
            console.log("📏 Token Length:", token.length);
            console.log("📋 Token Type:", typeof token);
            console.log("📋 First 20 chars:", token.substring(0, 20) + "...");
            
            // Print token in a formatted way
            console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
            console.log("🔥 FCM DEVICE TOKEN");
            console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
            console.log(token);
            console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
          } else {
            setFcmToken("");
            setTokenError("Token is null or empty");
            console.warn("⚠️ No FCM Token received - token is null, undefined, or empty");
            console.warn("⚠️ Token value:", token);
            console.warn("⚠️ Token type:", typeof token);
            
            // Log Firebase availability
            console.warn("⚠️ Checking Firebase availability...");
            try {
              const firebaseModule = await import("../Context/firebase");
              console.log("📋 Firebase module:", Object.keys(firebaseModule));
            } catch (importError) {
              console.error("❌ Cannot import firebase module:", importError);
            }
          }
        } catch (tokenError) {
          setFcmToken("");
          setTokenError(`Error: ${tokenError.message || "Unknown error"}`);
          console.error("❌ Error getting FCM Token:", tokenError);
          console.error("❌ Error details:", tokenError.message);
          console.error("❌ Error stack:", tokenError.stack);
          
          // Check if this is a permission issue
          if (tokenError.message && tokenError.message.includes("permission")) {
            console.error("🔴 This looks like a permission issue. Check Firebase configuration.");
          }
          if (tokenError.message && tokenError.message.includes("not initialized")) {
            console.error("🔴 Firebase may not be initialized properly.");
          }
        }
      } catch (outerError) {
        console.error("❌ Outer error in getAndPrintToken:", outerError);
        setTokenError(`Fatal error: ${outerError.message}`);
      }
    };

    getAndPrintToken();
  }, []);

  // 🔥 Function to manually fetch and print FCM Token with better error handling
  const handlePrintFCMToken = async () => {
    try {
      console.log("🔄 Manual FCM Token fetch...");
      console.log("📋 Environment check:");
      console.log("  - getDeviceToken exists:", typeof getDeviceToken);
      console.log("  - navigator:", navigator ? "Available" : "Not available");
      console.log("  - navigator.clipboard:", navigator.clipboard ? "Available" : "Not available");
      
      setLoading(true);
      setTokenError("");
      
      // Try to get token with detailed logging
      console.log("📋 Attempting to get token...");
      const token = await getDeviceToken();
      console.log("📋 Raw token value:", token);
      console.log("📋 Token type:", typeof token);
      console.log("📋 Is token empty?", token === "" || token === null || token === undefined);
      
      if (token && token !== null && token !== undefined && token !== "") {
        setFcmToken(token);
        setTokenError("");
        console.log("✅ FCM Token fetched manually!");
        console.log("📱 FCM Token:", token);
        console.log("📏 Token Length:", token.length);
        console.log("📋 First 20 chars:", token.substring(0, 20) + "...");
        
        // Show in alert for easy copy
        alert(`FCM Token:\n\n${token}\n\nToken Length: ${token.length} characters`);
        
        // Also copy to clipboard if available
        if (navigator.clipboard && navigator.clipboard.writeText) {
          try {
            await navigator.clipboard.writeText(token);
            console.log("📋 Token copied to clipboard!");
          } catch (clipError) {
            console.warn("Could not copy to clipboard:", clipError);
            // Try fallback method
            try {
              // Fallback for older browsers
              const textArea = document.createElement('textarea');
              textArea.value = token;
              document.body.appendChild(textArea);
              textArea.select();
              document.execCommand('copy');
              document.body.removeChild(textArea);
              console.log("📋 Token copied using fallback method!");
            } catch (fallbackError) {
              console.warn("Fallback copy also failed:", fallbackError);
            }
          }
        } else {
          console.warn("Clipboard API not available. Please copy manually.");
        }
      } else {
        setFcmToken("");
        setTokenError("Failed to get token - it's null or empty");
        alert(`❌ Failed to get FCM Token.\n\nToken value: ${token}\nToken type: ${typeof token}\n\nCheck console for more details.`);
        console.error("❌ getDeviceToken returned invalid value:", token);
        console.error("❌ Token type:", typeof token);
        
        // Additional debugging
        console.log("📋 Attempting to load firebase module directly...");
        try {
          const firebaseModule = await import("../Context/firebase");
          console.log("📋 Firebase module loaded. Available functions:", Object.keys(firebaseModule));
          
          // Try to access getDeviceToken again
          if (firebaseModule.getDeviceToken) {
            console.log("📋 getDeviceToken found in module. Trying again...");
            const retryToken = await firebaseModule.getDeviceToken();
            console.log("📋 Retry token:", retryToken);
          } else {
            console.error("❌ getDeviceToken not found in firebase module");
          }
        } catch (importError) {
          console.error("❌ Cannot import firebase module for debugging:", importError);
        }
      }
    } catch (error) {
      setFcmToken("");
      setTokenError(`Error: ${error.message || "Unknown error"}`);
      console.error("❌ Error in handlePrintFCMToken:", error);
      console.error("❌ Error stack:", error.stack);
      
      // Specific error handling
      let errorMsg = `Error getting token: ${error.message}`;
      if (error.message && error.message.includes("permission")) {
        errorMsg += "\n\nThis appears to be a permission issue. Check Firebase configuration.";
      }
      if (error.message && error.message.includes("initialize")) {
        errorMsg += "\n\nFirebase may not be initialized. Check your firebase.js configuration.";
      }
      if (error.message && error.message.includes("messaging")) {
        errorMsg += "\n\nFirebase Messaging may not be available. Check your browser permissions.";
      }
      alert(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Login Handler with FCM Token logging
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
      console.log("🔐 LOGIN ATTEMPT");
      console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
      
      // १. सर्वात आधी Device Token Generate करा
      console.log("🔄 Generating device token for login...");
      let deviceToken = null;
      try {
        deviceToken = await getDeviceToken();
        console.log("📱 FCM Token for Login:", deviceToken);
        console.log("📏 Token Length:", deviceToken?.length || 0);
      } catch (tokenError) {
        console.error("⚠️ Could not get device token:", tokenError);
        // Continue with login even if token fails
      }
      
      if (!deviceToken) {
        console.warn("⚠️ Warning: Device token is empty/null - continuing without token");
      }

      // २. Login Payload मध्ये deviceToken जोडा (only if available)
      const payload = {
        email: loginData.email,
        password: loginData.password,
        ...(deviceToken && { deviceToken: deviceToken }), // Only add if exists
      };

      console.log("📤 Login Payload:", {
        email: payload.email,
        password: "***HIDDEN***",
        hasDeviceToken: !!deviceToken,
        deviceTokenPreview: deviceToken ? `${deviceToken.substring(0, 20)}...` : "null"
      });

      // ३. API ला Request पाठवा
      console.log("🔄 Sending login request to server...");
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      console.log("📥 Server Response:", data);

      if (data.success) {
        console.log("✅ Login successful!");
        
        // ४. User Object store करा
        localStorage.setItem("bidkart_user", JSON.stringify(data.data.user));
        console.log("👤 User stored:", data.data.user.email);

        // ५. JWT Token store करा
        localStorage.setItem("bidkart_token", data.data.token);
        console.log("🔑 JWT Token stored");

        // ६. Role store करा
        const userRole = data.data.user.role || data.data.userType || "customer";
        localStorage.setItem("bidkart_user_role", userRole);
        console.log("🎭 User Role:", userRole);

        alert("✅ Login successful!");
        navigate("/home");
      } else {
        console.error("❌ Login failed:", data.message);
        setError(data.message || "Invalid credentials");
      }
    } catch (err) {
      console.error("❌ Login Error:", err);
      console.error("Error Stack:", err.stack);
      setError("Unable to connect to server. Please try again.");
    } finally {
      setLoading(false);
      console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    }
  };

  // ✅ Register Handler with FCM Token logging
  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log("📝 REGISTRATION ATTEMPT");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log("👤 Role:", role);

    // Get FCM Token for registration (try but don't fail if not available)
    console.log("🔄 Getting FCM token for registration...");
    let deviceToken = null;
    try {
      deviceToken = await getDeviceToken();
      console.log("📱 FCM Token for Registration:", deviceToken);
      console.log("📏 Token Length:", deviceToken?.length || 0);
    } catch (tokenError) {
      console.error("⚠️ Failed to get FCM token (continuing):", tokenError.message);
    }

    let payload;

    if (role === "customer") {
      payload = {
        name: customerData.name,
        email: customerData.email,
        mobile: customerData.mobile,
        password: customerData.password,
        role: "customer",
        ...(deviceToken && { deviceToken: deviceToken }), // Only add if exists
      };
      console.log("📝 Customer Registration Data:", {
        name: payload.name,
        email: payload.email,
        mobile: payload.mobile,
        role: payload.role,
        hasDeviceToken: !!payload.deviceToken
      });
    } else {
      payload = {
        name: businessData.name,
        email: businessData.email,
        mobile: businessData.mobile,
        password: businessData.password,
        role: "business",
        businessName: businessData.businessName,
        panNumber: businessData.panNumber,
        gstNumber: businessData.gstNumber,
        businessAddress: businessData.businessAddress,
        ...(deviceToken && { deviceToken: deviceToken }), // Only add if exists
      };
      console.log("📝 Business Registration Data:", {
        name: payload.name,
        email: payload.email,
        businessName: payload.businessName,
        role: payload.role,
        hasDeviceToken: !!payload.deviceToken
      });
    }

    try {
      console.log("🔄 Sending registration request...");
      const response = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      console.log("📥 Registration Response:", data);

      if (data.success) {
        console.log("✅ Registration successful!");
        localStorage.setItem("bidkart_user", JSON.stringify(data.data.user));
        localStorage.setItem("bidkart_token", data.data.token);
        localStorage.setItem("bidkart_user_role", role);
        console.log("👤 User stored with role:", role);

        alert("✅ Registration successful!");
        navigate("/");
      } else {
        console.error("❌ Registration failed:", data.message);
        setError(data.message || "Registration failed");
      }
    } catch (err) {
      console.error("❌ Registration Error:", err);
      console.error("Error Stack:", err.stack);
      setError("Unable to connect to server. Please try again.");
    } finally {
      setLoading(false);
      console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    }
  };

  // Splash Screen
  if (showSplash) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: THEME.ink }}
      >
        <div className="text-center">
          <div className="w-32 h-32 bg-[#D9A441] rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl">
            <span className="text-5xl font-extrabold text-white">B</span>
          </div>
          <h1 className="text-4xl font-extrabold text-white mb-2">BidKart</h1>
          <div className="w-16 h-1 bg-[#D9A441] mx-auto rounded-full"></div>
          <p className="text-white/70 mt-4 text-sm">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F6F5F1] flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div
          className="relative p-6 pt-8 text-white text-center"
          style={{
            background: `linear-gradient(135deg, ${THEME.ink} 0%, #1a2a5c 100%)`,
          }}
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16"></div>
          <div className="absolute bottom-0 left-0 w-20 h-20 bg-[#D9A441]/10 rounded-full -ml-10 -mb-10"></div>

          <div className="relative z-10">
            <div className="w-20 h-20 bg-[#D9A441] rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <span className="text-3xl font-extrabold text-white">B</span>
            </div>
            <h2 className="text-2xl font-extrabold">
              {mode === "login" ? "Welcome Back!" : "Create Account"}
            </h2>
            <p className="text-sm text-white/80">
              {mode === "login"
                ? "Login to continue bidding"
                : "Join our community today"}
            </p>
          </div>
        </div>

        {/* Body */}
        <div className="p-6">
          {/* 🔥 FCM Token Debug Section - Enhanced */}
          <div className="mb-4 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-lg">🔥</span>
                <span className="text-xs font-bold text-blue-700">FCM TOKEN DEBUG</span>
              </div>
              <button
                onClick={() => setShowToken(!showToken)}
                className="text-xs text-blue-600 hover:text-blue-800 font-medium"
              >
                {showToken ? "Hide" : "Show"}
              </button>
            </div>
            
            {showToken && (
              <div className="mb-2">
                <div className="bg-white p-2 rounded-lg text-xs text-gray-600 break-all font-mono border border-blue-100 min-h-[40px]">
                  {fcmToken ? (
                    fcmToken
                  ) : (
                    <span className="text-red-500">
                      {tokenError || "No token available"}
                    </span>
                  )}
                </div>
                <div className="text-[10px] text-gray-500 mt-1 flex justify-between">
                  <span>Length: {fcmToken?.length || 0} characters</span>
                  {tokenError && (
                    <span className="text-red-500 font-medium">⚠️ {tokenError}</span>
                  )}
                </div>
              </div>
            )}
            
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={handlePrintFCMToken}
                disabled={loading}
                className="flex-1 py-1.5 px-3 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded-lg transition-all disabled:opacity-50 min-w-[100px]"
              >
                {loading ? "⏳ Loading..." : "🖨️ Print Token"}
              </button>
              {fcmToken && (
                <button
                  onClick={() => {
                    if (navigator.clipboard?.writeText) {
                      navigator.clipboard.writeText(fcmToken);
                      alert("✅ Token copied to clipboard!");
                    } else {
                      // Fallback
                      const textArea = document.createElement('textarea');
                      textArea.value = fcmToken;
                      document.body.appendChild(textArea);
                      textArea.select();
                      document.execCommand('copy');
                      document.body.removeChild(textArea);
                      alert("✅ Token copied to clipboard!");
                    }
                  }}
                  className="px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white text-xs font-medium rounded-lg transition-all"
                >
                  📋 Copy
                </button>
              )}
              <button
                onClick={() => {
                  console.clear();
                  console.log("🧹 Console cleared. Check for token errors:");
                  console.log("📋 Current token state:", fcmToken || "No token");
                  console.log("📋 Token error:", tokenError || "None");
                  handlePrintFCMToken();
                }}
                className="px-3 py-1.5 bg-gray-600 hover:bg-gray-700 text-white text-xs font-medium rounded-lg transition-all"
              >
                🔄 Retry
              </button>
            </div>
            
            {/* Quick troubleshooting tips */}
            <div className="mt-2 text-[10px] text-blue-600">
              💡 Tips: Check console (F12) for detailed logs • Make sure Firebase is configured • Check browser permissions
            </div>
          </div>

          {/* Role Toggle (Only for register) */}
          {mode === "register" && (
            <div className="flex gap-2 p-1 bg-slate-100 rounded-xl mb-4">
              <button
                onClick={() => setRole("customer")}
                className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                  role === "customer"
                    ? "bg-white shadow-sm text-[#0F1638]"
                    : "text-slate-500 hover:text-slate-700"
                }`}
              >
                <div className="flex items-center justify-center gap-2">
                  <User size={16} /> Customer
                </div>
              </button>
              <button
                onClick={() => setRole("business")}
                className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                  role === "business"
                    ? "bg-white shadow-sm text-[#0F1638]"
                    : "text-slate-500 hover:text-slate-700"
                }`}
              >
                <div className="flex items-center justify-center gap-2">
                  <Briefcase size={16} /> Business
                </div>
              </button>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-3 mb-4 text-sm text-red-600">
              ❌ {error}
            </div>
          )}

          {/* Login Form */}
          {mode === "login" && (
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  required
                  value={loginData.email}
                  onChange={(e) =>
                    setLoginData({ ...loginData, email: e.target.value })
                  }
                  className="w-full pl-10 pr-4 py-3.5 rounded-xl border border-slate-200 text-sm outline-none focus:border-[#D9A441] transition-colors bg-slate-50"
                />
              </div>
              <div className="relative">
                <Lock
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  required
                  value={loginData.password}
                  onChange={(e) =>
                    setLoginData({ ...loginData, password: e.target.value })
                  }
                  className="w-full pl-10 pr-12 py-3.5 rounded-xl border border-slate-200 text-sm outline-none focus:border-[#D9A441] transition-colors bg-slate-50"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl text-white font-bold shadow-lg flex items-center justify-center gap-2 transition-transform hover:scale-[1.01] active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
                style={{ backgroundColor: THEME.ink }}
              >
                <LogIn size={18} /> {loading ? "Logging in..." : "Login"}
              </button>
            </form>
          )}

          {/* Register Form (Customer) */}
          {mode === "register" && role === "customer" && (
            <form onSubmit={handleRegister} className="space-y-3">
              <input
                type="text"
                placeholder="Full Name"
                required
                value={customerData.name}
                onChange={(e) =>
                  setCustomerData({ ...customerData, name: e.target.value })
                }
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm outline-none focus:border-[#D9A441] transition-colors bg-slate-50"
              />
              <input
                type="email"
                placeholder="Email Address"
                required
                value={customerData.email}
                onChange={(e) =>
                  setCustomerData({ ...customerData, email: e.target.value })
                }
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm outline-none focus:border-[#D9A441] transition-colors bg-slate-50"
              />
              <input
                type="tel"
                placeholder="Mobile Number"
                required
                value={customerData.mobile}
                onChange={(e) =>
                  setCustomerData({ ...customerData, mobile: e.target.value })
                }
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm outline-none focus:border-[#D9A441] transition-colors bg-slate-50"
              />
              <div className="relative">
                <Lock
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  required
                  value={customerData.password}
                  onChange={(e) =>
                    setCustomerData({
                      ...customerData,
                      password: e.target.value,
                    })
                  }
                  className="w-full pl-10 pr-12 py-3 rounded-xl border border-slate-200 text-sm outline-none focus:border-[#D9A441] transition-colors bg-slate-50"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl text-white font-bold shadow-lg flex items-center justify-center gap-2 transition-transform hover:scale-[1.01] active:scale-95 disabled:opacity-70"
                style={{ backgroundColor: THEME.ink }}
              >
                <UserPlus size={18} />{" "}
                {loading ? "Creating..." : "Register as Customer"}
              </button>
            </form>
          )}

          {/* Register Form (Business) */}
          {mode === "register" && role === "business" && (
            <form onSubmit={handleRegister} className="space-y-3">
              <input
                type="text"
                placeholder="Full Name"
                required
                value={businessData.name}
                onChange={(e) =>
                  setBusinessData({ ...businessData, name: e.target.value })
                }
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm outline-none focus:border-[#D9A441] transition-colors bg-slate-50"
              />
              <input
                type="email"
                placeholder="Email Address"
                required
                value={businessData.email}
                onChange={(e) =>
                  setBusinessData({ ...businessData, email: e.target.value })
                }
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm outline-none focus:border-[#D9A441] transition-colors bg-slate-50"
              />
              <input
                type="tel"
                placeholder="Mobile Number"
                required
                value={businessData.mobile}
                onChange={(e) =>
                  setBusinessData({ ...businessData, mobile: e.target.value })
                }
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm outline-none focus:border-[#D9A441] transition-colors bg-slate-50"
              />
              <div className="relative">
                <Lock
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  required
                  value={businessData.password}
                  onChange={(e) =>
                    setBusinessData({
                      ...businessData,
                      password: e.target.value,
                    })
                  }
                  className="w-full pl-10 pr-12 py-3 rounded-xl border border-slate-200 text-sm outline-none focus:border-[#D9A441] transition-colors bg-slate-50"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              <input
                type="text"
                placeholder="Business Name"
                required
                value={businessData.businessName}
                onChange={(e) =>
                  setBusinessData({
                    ...businessData,
                    businessName: e.target.value,
                  })
                }
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm outline-none focus:border-[#D9A441] transition-colors bg-slate-50"
              />
              <input
                type="text"
                placeholder="PAN Number"
                required
                value={businessData.panNumber}
                onChange={(e) =>
                  setBusinessData({
                    ...businessData,
                    panNumber: e.target.value,
                  })
                }
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm outline-none focus:border-[#D9A441] transition-colors bg-slate-50"
              />
              <input
                type="text"
                placeholder="GST Number"
                required
                value={businessData.gstNumber}
                onChange={(e) =>
                  setBusinessData({
                    ...businessData,
                    gstNumber: e.target.value,
                  })
                }
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm outline-none focus:border-[#D9A441] transition-colors bg-slate-50"
              />
              <div className="relative">
                <MapPin
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type="text"
                  placeholder="Business Address"
                  required
                  value={businessData.businessAddress}
                  onChange={(e) =>
                    setBusinessData({
                      ...businessData,
                      businessAddress: e.target.value,
                    })
                  }
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-sm outline-none focus:border-[#D9A441] transition-colors bg-slate-50"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl text-white font-bold shadow-lg flex items-center justify-center gap-2 transition-transform hover:scale-[1.01] active:scale-95 disabled:opacity-70"
                style={{ backgroundColor: THEME.ink }}
              >
                <Briefcase size={18} />{" "}
                {loading ? "Registering..." : "Register as Business"}
              </button>
            </form>
          )}

          {/* Switch between Login/Register */}
          <div className="mt-6 text-center text-sm">
            <span className="text-slate-500">
              {mode === "login"
                ? "Don't have an account?"
                : "Already have an account?"}
            </span>
            <button
              onClick={() => {
                setMode(mode === "login" ? "register" : "login");
                setError("");
                setShowPassword(false);
              }}
              className="ml-1 font-semibold hover:underline"
              style={{ color: THEME.gold }}
            >
              {mode === "login" ? "Sign Up" : "Login"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}