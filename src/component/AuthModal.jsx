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

const THEME = {
  ink: "#0F1638",
  gold: "#D9A441",
  goldSoft: "#FDF3E1",
  mapBg: "#E7ECFA",
};

const API_URL = "http://localhost:5000/api/auth";

export default function LoginPage() {
  const navigate = useNavigate();

  const [mode, setMode] = useState("login"); // login | register
  const [role, setRole] = useState("customer"); // customer | business
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

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
      navigate("/");
    }
  }, [navigate]);

  // Login Handler
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();

      if (data.success) {
        // Save user data and token to localStorage
        localStorage.setItem("bidkart_user", JSON.stringify(data.data));
        localStorage.setItem("bidkart_token", data.data.token);

        // Store user role for later use
        const userRole = data.data.role || data.data.userType || "customer";
        localStorage.setItem("bidkart_user_role", userRole);

        alert("Login successful!");
        navigate("/");
      } else {
        setError(data.message || "Invalid credentials");
      }
    } catch (err) {
      setError("Unable to connect to server. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Register Handler
  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const payload = role === "customer" ? customerData : businessData;

    try {
      const response = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (data.success) {
        // Save user data and token to localStorage
        localStorage.setItem("bidkart_user", JSON.stringify(data.data));
        localStorage.setItem("bidkart_token", data.data.token);

        // Store user role
        const userRole = role;
        localStorage.setItem("bidkart_user_role", userRole);

        alert("Registration successful!");
        navigate("/");
      } else {
        setError(data.message || "Registration failed");
      }
    } catch (err) {
      setError("Unable to connect to server. Please try again.");
    } finally {
      setLoading(false);
    }
  };

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
              {error}
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
