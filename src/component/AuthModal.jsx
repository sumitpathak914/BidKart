// import {
//     Briefcase,
//     Eye,
//     EyeOff,
//     Lock,
//     LogIn,
//     Mail,
//     MapPin,
//     User,
//     UserPlus,
// } from "lucide-react";
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// const THEME = {
//   ink: "#0F1638",
//   gold: "#D9A441",
//   goldSoft: "#FDF3E1",
//   mapBg: "#E7ECFA",
// };

// const API_URL = "http://localhost:5000/api/auth";

// export default function LoginPage() {
//   const navigate = useNavigate();

//   const [mode, setMode] = useState("login"); // login | register
//   const [role, setRole] = useState("customer"); // customer | business
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [showPassword, setShowPassword] = useState(false);

//   // Login State
//   const [loginData, setLoginData] = useState({ email: "", password: "" });

//   // Register State (Customer)
//   const [customerData, setCustomerData] = useState({
//     name: "",
//     email: "",
//     mobile: "",
//     password: "",
//   });

//   // Register State (Business)
//   const [businessData, setBusinessData] = useState({
//     name: "",
//     email: "",
//     mobile: "",
//     password: "",
//     businessName: "",
//     panNumber: "",
//     gstNumber: "",
//     businessAddress: "",
//   });

//   // Check if already logged in
//   useEffect(() => {
//     const savedUser = localStorage.getItem("bidkart_user");
//     const token = localStorage.getItem("bidkart_token");
//     if (savedUser && token) {
//       navigate("/home");
//     }
//   }, [navigate]);

//   // Login Handler
//   const handleLogin = async (e) => {
//     debugger;
//     e.preventDefault();
//     setLoading(true);
//     setError("");

//     try {
//       const response = await fetch(`${API_URL}/login`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(loginData),
//       });

//       const data = await response.json();

//       if (data.success) {
//         // Save user data and token to localStorage
//         localStorage.setItem("bidkart_user", JSON.stringify(data.data));
//         localStorage.setItem("bidkart_token", data.data.token);

//         // Store user role for later use
//         const userRole = data.data.user.role || data.data.userType || null;
//         localStorage.setItem("bidkart_user_role", userRole);

//         alert("Login successful!");
//         navigate("/home");
//       } else {
//         setError(data.message || "Invalid credentials");
//       }
//     } catch (err) {
//       setError("Unable to connect to server. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Register Handler
//   const handleRegister = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");

//     const payload = role === "customer" ? customerData : businessData;

//     try {
//       const response = await fetch(`${API_URL}/register`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });

//       const data = await response.json();

//       if (data.success) {
//         // Save user data and token to localStorage
//         localStorage.setItem("bidkart_user", JSON.stringify(data.data));
//         localStorage.setItem("bidkart_token", data.data.token);

//         // Store user role
//         const userRole = role;
//         localStorage.setItem("bidkart_user_role", userRole);

//         alert("Registration successful!");
//         navigate("/");
//       } else {
//         setError(data.message || "Registration failed");
//       }
//     } catch (err) {
//       setError("Unable to connect to server. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#F6F5F1] flex items-center justify-center p-4">
//       <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden">
//         {/* Header */}
//         <div
//           className="relative p-6 pt-8 text-white text-center"
//           style={{
//             background: `linear-gradient(135deg, ${THEME.ink} 0%, #1a2a5c 100%)`,
//           }}
//         >
//           <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16"></div>
//           <div className="absolute bottom-0 left-0 w-20 h-20 bg-[#D9A441]/10 rounded-full -ml-10 -mb-10"></div>

//           <div className="relative z-10">
//             <div className="w-20 h-20 bg-[#D9A441] rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
//               <span className="text-3xl font-extrabold text-white">B</span>
//             </div>
//             <h2 className="text-2xl font-extrabold">
//               {mode === "login" ? "Welcome Back!" : "Create Account"}
//             </h2>
//             <p className="text-sm text-white/80">
//               {mode === "login"
//                 ? "Login to continue bidding"
//                 : "Join our community today"}
//             </p>
//           </div>
//         </div>

//         {/* Body */}
//         <div className="p-6">
//           {/* Role Toggle (Only for register) */}
//           {mode === "register" && (
//             <div className="flex gap-2 p-1 bg-slate-100 rounded-xl mb-4">
//               <button
//                 onClick={() => setRole("customer")}
//                 className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all ${
//                   role === "customer"
//                     ? "bg-white shadow-sm text-[#0F1638]"
//                     : "text-slate-500 hover:text-slate-700"
//                 }`}
//               >
//                 <div className="flex items-center justify-center gap-2">
//                   <User size={16} /> Customer
//                 </div>
//               </button>
//               <button
//                 onClick={() => setRole("business")}
//                 className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all ${
//                   role === "business"
//                     ? "bg-white shadow-sm text-[#0F1638]"
//                     : "text-slate-500 hover:text-slate-700"
//                 }`}
//               >
//                 <div className="flex items-center justify-center gap-2">
//                   <Briefcase size={16} /> Business
//                 </div>
//               </button>
//             </div>
//           )}

//           {/* Error Message */}
//           {error && (
//             <div className="bg-red-50 border border-red-200 rounded-xl p-3 mb-4 text-sm text-red-600">
//               {error}
//             </div>
//           )}

//           {/* Login Form */}
//           {mode === "login" && (
//             <form onSubmit={handleLogin} className="space-y-4">
//               <div className="relative">
//                 <Mail
//                   size={18}
//                   className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
//                 />
//                 <input
//                   type="email"
//                   placeholder="Email Address"
//                   required
//                   value={loginData.email}
//                   onChange={(e) =>
//                     setLoginData({ ...loginData, email: e.target.value })
//                   }
//                   className="w-full pl-10 pr-4 py-3.5 rounded-xl border border-slate-200 text-sm outline-none focus:border-[#D9A441] transition-colors bg-slate-50"
//                 />
//               </div>
//               <div className="relative">
//                 <Lock
//                   size={18}
//                   className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
//                 />
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   placeholder="Password"
//                   required
//                   value={loginData.password}
//                   onChange={(e) =>
//                     setLoginData({ ...loginData, password: e.target.value })
//                   }
//                   className="w-full pl-10 pr-12 py-3.5 rounded-xl border border-slate-200 text-sm outline-none focus:border-[#D9A441] transition-colors bg-slate-50"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
//                 >
//                   {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//                 </button>
//               </div>
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="w-full py-3.5 rounded-xl text-white font-bold shadow-lg flex items-center justify-center gap-2 transition-transform hover:scale-[1.01] active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
//                 style={{ backgroundColor: THEME.ink }}
//               >
//                 <LogIn size={18} /> {loading ? "Logging in..." : "Login"}
//               </button>
//             </form>
//           )}

//           {/* Register Form (Customer) */}
//           {mode === "register" && role === "customer" && (
//             <form onSubmit={handleRegister} className="space-y-3">
//               <input
//                 type="text"
//                 placeholder="Full Name"
//                 required
//                 value={customerData.name}
//                 onChange={(e) =>
//                   setCustomerData({ ...customerData, name: e.target.value })
//                 }
//                 className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm outline-none focus:border-[#D9A441] transition-colors bg-slate-50"
//               />
//               <input
//                 type="email"
//                 placeholder="Email Address"
//                 required
//                 value={customerData.email}
//                 onChange={(e) =>
//                   setCustomerData({ ...customerData, email: e.target.value })
//                 }
//                 className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm outline-none focus:border-[#D9A441] transition-colors bg-slate-50"
//               />
//               <input
//                 type="tel"
//                 placeholder="Mobile Number"
//                 required
//                 value={customerData.mobile}
//                 onChange={(e) =>
//                   setCustomerData({ ...customerData, mobile: e.target.value })
//                 }
//                 className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm outline-none focus:border-[#D9A441] transition-colors bg-slate-50"
//               />
//               <div className="relative">
//                 <Lock
//                   size={18}
//                   className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
//                 />
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   placeholder="Password"
//                   required
//                   value={customerData.password}
//                   onChange={(e) =>
//                     setCustomerData({
//                       ...customerData,
//                       password: e.target.value,
//                     })
//                   }
//                   className="w-full pl-10 pr-12 py-3 rounded-xl border border-slate-200 text-sm outline-none focus:border-[#D9A441] transition-colors bg-slate-50"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
//                 >
//                   {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//                 </button>
//               </div>
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="w-full py-3.5 rounded-xl text-white font-bold shadow-lg flex items-center justify-center gap-2 transition-transform hover:scale-[1.01] active:scale-95 disabled:opacity-70"
//                 style={{ backgroundColor: THEME.ink }}
//               >
//                 <UserPlus size={18} />{" "}
//                 {loading ? "Creating..." : "Register as Customer"}
//               </button>
//             </form>
//           )}

//           {/* Register Form (Business) */}
//           {mode === "register" && role === "business" && (
//             <form onSubmit={handleRegister} className="space-y-3">
//               <input
//                 type="text"
//                 placeholder="Full Name"
//                 required
//                 value={businessData.name}
//                 onChange={(e) =>
//                   setBusinessData({ ...businessData, name: e.target.value })
//                 }
//                 className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm outline-none focus:border-[#D9A441] transition-colors bg-slate-50"
//               />
//               <input
//                 type="email"
//                 placeholder="Email Address"
//                 required
//                 value={businessData.email}
//                 onChange={(e) =>
//                   setBusinessData({ ...businessData, email: e.target.value })
//                 }
//                 className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm outline-none focus:border-[#D9A441] transition-colors bg-slate-50"
//               />
//               <input
//                 type="tel"
//                 placeholder="Mobile Number"
//                 required
//                 value={businessData.mobile}
//                 onChange={(e) =>
//                   setBusinessData({ ...businessData, mobile: e.target.value })
//                 }
//                 className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm outline-none focus:border-[#D9A441] transition-colors bg-slate-50"
//               />
//               <div className="relative">
//                 <Lock
//                   size={18}
//                   className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
//                 />
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   placeholder="Password"
//                   required
//                   value={businessData.password}
//                   onChange={(e) =>
//                     setBusinessData({
//                       ...businessData,
//                       password: e.target.value,
//                     })
//                   }
//                   className="w-full pl-10 pr-12 py-3 rounded-xl border border-slate-200 text-sm outline-none focus:border-[#D9A441] transition-colors bg-slate-50"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
//                 >
//                   {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//                 </button>
//               </div>
//               <input
//                 type="text"
//                 placeholder="Business Name"
//                 required
//                 value={businessData.businessName}
//                 onChange={(e) =>
//                   setBusinessData({
//                     ...businessData,
//                     businessName: e.target.value,
//                   })
//                 }
//                 className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm outline-none focus:border-[#D9A441] transition-colors bg-slate-50"
//               />
//               <input
//                 type="text"
//                 placeholder="PAN Number"
//                 required
//                 value={businessData.panNumber}
//                 onChange={(e) =>
//                   setBusinessData({
//                     ...businessData,
//                     panNumber: e.target.value,
//                   })
//                 }
//                 className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm outline-none focus:border-[#D9A441] transition-colors bg-slate-50"
//               />
//               <input
//                 type="text"
//                 placeholder="GST Number"
//                 required
//                 value={businessData.gstNumber}
//                 onChange={(e) =>
//                   setBusinessData({
//                     ...businessData,
//                     gstNumber: e.target.value,
//                   })
//                 }
//                 className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm outline-none focus:border-[#D9A441] transition-colors bg-slate-50"
//               />
//               <div className="relative">
//                 <MapPin
//                   size={18}
//                   className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
//                 />
//                 <input
//                   type="text"
//                   placeholder="Business Address"
//                   required
//                   value={businessData.businessAddress}
//                   onChange={(e) =>
//                     setBusinessData({
//                       ...businessData,
//                       businessAddress: e.target.value,
//                     })
//                   }
//                   className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-sm outline-none focus:border-[#D9A441] transition-colors bg-slate-50"
//                 />
//               </div>
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="w-full py-3.5 rounded-xl text-white font-bold shadow-lg flex items-center justify-center gap-2 transition-transform hover:scale-[1.01] active:scale-95 disabled:opacity-70"
//                 style={{ backgroundColor: THEME.ink }}
//               >
//                 <Briefcase size={18} />{" "}
//                 {loading ? "Registering..." : "Register as Business"}
//               </button>
//             </form>
//           )}

//           {/* Switch between Login/Register */}
//           <div className="mt-6 text-center text-sm">
//             <span className="text-slate-500">
//               {mode === "login"
//                 ? "Don't have an account?"
//                 : "Already have an account?"}
//             </span>
//             <button
//               onClick={() => {
//                 setMode(mode === "login" ? "register" : "login");
//                 setError("");
//                 setShowPassword(false);
//               }}
//               className="ml-1 font-semibold hover:underline"
//               style={{ color: THEME.gold }}
//             >
//               {mode === "login" ? "Sign Up" : "Login"}
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
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
    ShoppingBag,
    Sparkles,
    Shield,
    Star
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

  const [mode, setMode] = useState("login");
  const [role, setRole] = useState("customer");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [customerData, setCustomerData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
  });
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

  useEffect(() => {
    const savedUser = localStorage.getItem("bidkart_user");
    const token = localStorage.getItem("bidkart_token");
    if (savedUser && token) {
      navigate("/home");
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const mockUser = {
        id: 1,
        name: loginData.email?.split('@')[0] || "Fashionista",
        email: loginData.email || "fashion@style.com",
        role: "customer",
        token: "mock_token_" + Date.now()
      };

      localStorage.setItem("bidkart_user", JSON.stringify(mockUser));
      localStorage.setItem("bidkart_token", mockUser.token);
      localStorage.setItem("bidkart_user_role", "customer");

      alert("✨ Welcome to StyleHub!");
      navigate("/home");
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const payload = role === "customer" ? customerData : businessData;
      
      const mockUser = {
        id: Date.now(),
        name: payload.name || "StyleSeeker",
        email: payload.email || "style@fashion.com",
        role: role,
        token: "mock_token_" + Date.now()
      };

      localStorage.setItem("bidkart_user", JSON.stringify(mockUser));
      localStorage.setItem("bidkart_token", mockUser.token);
      localStorage.setItem("bidkart_user_role", role);

      alert(`✨ ${role === "customer" ? "Customer" : "Business"} account created!`);
      navigate("/home");
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Image with Opacity */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1600&q=80')",
          opacity: 0.15
        }}
      />
      
      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0F1638]/90 via-[#0F1638]/70 to-[#1a2a5c]/80" />
      
      {/* Decorative Elements */}
      <div className="absolute top-20 right-20 w-64 h-64 bg-[#D9A441]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-20 w-80 h-80 bg-[#D9A441]/5 rounded-full blur-3xl" />
      
      {/* Floating Fashion Icons */}
      <div className="absolute top-10 left-10 text-[#D9A441]/20 animate-pulse">
        <ShoppingBag size={60} />
      </div>
      <div className="absolute bottom-10 right-10 text-[#D9A441]/20 animate-pulse delay-1000">
        <Sparkles size={50} />
      </div>
      <div className="absolute top-1/2 left-5 text-[#D9A441]/10 animate-pulse delay-500">
        <Star size={40} />
      </div>

      <div className="relative z-10 w-full max-w-md">
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/20">
          
          {/* Header with Fashion Theme */}
          <div
            className="relative p-6 pt-8 text-white text-center"
            style={{
              background: `linear-gradient(135deg, ${THEME.ink} 0%, #1a2a5c 100%)`,
            }}
          >
            {/* Decorative Circles */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-[#D9A441]/10 rounded-full -mr-20 -mt-20"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#D9A441]/5 rounded-full -ml-16 -mb-16"></div>
            
            {/* Sparkle Decorations */}
            <div className="absolute top-4 left-4 text-[#D9A441]/30">
              <Sparkles size={20} />
            </div>
            <div className="absolute bottom-4 right-4 text-[#D9A441]/30">
              <Sparkles size={20} />
            </div>

            <div className="relative z-10">
              {/* Logo with Fashion Theme */}
              <div className="w-20 h-20 mx-auto mb-4 relative">
                <div className="w-20 h-20 bg-gradient-to-br from-[#D9A441] to-[#c4902f] rounded-full flex items-center justify-center shadow-lg shadow-[#D9A441]/30">
                  <ShoppingBag size={32} className="text-white" />
                </div>
                <div className="absolute -bottom-1 -right-1 bg-[#0F1638] rounded-full p-1 border-2 border-[#D9A441]">
                  <Sparkles size={12} className="text-[#D9A441]" />
                </div>
              </div>
              
              <h2 className="text-2xl font-extrabold tracking-tight">
                {mode === "login" ? "Welcome Back!" : "Join StyleHub"}
              </h2>
              <p className="text-sm text-white/80 mt-1">
                {mode === "login"
                  ? "Your fashion journey continues here"
                  : "Start your style journey today"}
              </p>
              
              {/* Fashion Tagline */}
              <div className="mt-2 flex items-center justify-center gap-2">
                <span className="h-px w-8 bg-[#D9A441]/30"></span>
                <span className="text-[10px] text-[#D9A441] font-medium tracking-wider uppercase">
                  {mode === "login" ? "Style & Elegance" : "Express Yourself"}
                </span>
                <span className="h-px w-8 bg-[#D9A441]/30"></span>
              </div>
            </div>
          </div>

          {/* Body */}
          <div className="p-6">
            {/* Role Toggle with Fashion Styling */}
            {mode === "register" && (
              <div className="flex gap-2 p-1 bg-gradient-to-r from-[#FDF3E1] to-[#fce8d0] rounded-xl mb-4 border border-[#D9A441]/20">
                <button
                  onClick={() => setRole("customer")}
                  className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                    role === "customer"
                      ? "bg-white shadow-md text-[#0F1638]"
                      : "text-slate-600 hover:text-slate-800"
                  }`}
                >
                  <div className="flex items-center justify-center gap-2">
                    <User size={16} /> Shopper
                  </div>
                </button>
                <button
                  onClick={() => setRole("business")}
                  className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                    role === "business"
                      ? "bg-white shadow-md text-[#0F1638]"
                      : "text-slate-600 hover:text-slate-800"
                  }`}
                >
                  <div className="flex items-center justify-center gap-2">
                    <Briefcase size={16} /> Brand
                  </div>
                </button>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-3 mb-4 text-sm text-red-600 flex items-center gap-2">
                <Shield size={16} />
                {error}
              </div>
            )}

            {/* Login Form */}
            {mode === "login" && (
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="relative group">
                  <Mail
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#D9A441] transition-colors"
                  />
                  <input
                    type="email"
                    placeholder="Email Address"
                    value={loginData.email}
                    onChange={(e) =>
                      setLoginData({ ...loginData, email: e.target.value })
                    }
                    className="w-full pl-10 pr-4 py-3.5 rounded-xl border border-slate-200 text-sm outline-none focus:border-[#D9A441] transition-all bg-slate-50/50 focus:bg-white focus:shadow-md"
                    placeholder="you@fashion.com"
                  />
                </div>
                <div className="relative group">
                  <Lock
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#D9A441] transition-colors"
                  />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={loginData.password}
                    onChange={(e) =>
                      setLoginData({ ...loginData, password: e.target.value })
                    }
                    className="w-full pl-10 pr-12 py-3.5 rounded-xl border border-slate-200 text-sm outline-none focus:border-[#D9A441] transition-all bg-slate-50/50 focus:bg-white focus:shadow-md"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>

                {/* Fashion Quote */}
                <div className="text-xs text-center text-slate-400 italic bg-slate-50/50 p-2 rounded-lg border border-slate-100">
                  "Fashion is the armor to survive the reality of everyday life."
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-xl text-white font-bold shadow-lg flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed bg-gradient-to-r from-[#0F1638] to-[#1a2a5c] hover:shadow-[#D9A441]/20"
                >
                  <LogIn size={18} /> 
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Logging in...
                    </span>
                  ) : (
                    "Login to StyleHub"
                  )}
                </button>
              </form>
            )}

            {/* Register Forms - Simplified with Fashion Theme */}
            {mode === "register" && role === "customer" && (
              <form onSubmit={handleRegister} className="space-y-3">
                <input
                  type="text"
                  placeholder="Full Name"
                  value={customerData.name}
                  onChange={(e) =>
                    setCustomerData({ ...customerData, name: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm outline-none focus:border-[#D9A441] transition-all bg-slate-50/50 focus:bg-white focus:shadow-md"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  value={customerData.email}
                  onChange={(e) =>
                    setCustomerData({ ...customerData, email: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm outline-none focus:border-[#D9A441] transition-all bg-slate-50/50 focus:bg-white focus:shadow-md"
                />
                <input
                  type="tel"
                  placeholder="Mobile Number"
                  value={customerData.mobile}
                  onChange={(e) =>
                    setCustomerData({ ...customerData, mobile: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm outline-none focus:border-[#D9A441] transition-all bg-slate-50/50 focus:bg-white focus:shadow-md"
                />
                <div className="relative">
                  <Lock
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={customerData.password}
                    onChange={(e) =>
                      setCustomerData({
                        ...customerData,
                        password: e.target.value,
                      })
                    }
                    className="w-full pl-10 pr-12 py-3 rounded-xl border border-slate-200 text-sm outline-none focus:border-[#D9A441] transition-all bg-slate-50/50 focus:bg-white focus:shadow-md"
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
                  className="w-full py-3.5 rounded-xl text-white font-bold shadow-lg flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-70 bg-gradient-to-r from-[#0F1638] to-[#1a2a5c]"
                >
                  <UserPlus size={18} />{" "}
                  {loading ? "Creating..." : "Join as Shopper"}
                </button>
              </form>
            )}

            {mode === "register" && role === "business" && (
              <form onSubmit={handleRegister} className="space-y-3 max-h-[400px] overflow-y-auto pr-1">
                <input
                  type="text"
                  placeholder="Full Name"
                  value={businessData.name}
                  onChange={(e) =>
                    setBusinessData({ ...businessData, name: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm outline-none focus:border-[#D9A441] transition-all bg-slate-50/50 focus:bg-white focus:shadow-md"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  value={businessData.email}
                  onChange={(e) =>
                    setBusinessData({ ...businessData, email: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm outline-none focus:border-[#D9A441] transition-all bg-slate-50/50 focus:bg-white focus:shadow-md"
                />
                <input
                  type="tel"
                  placeholder="Mobile Number"
                  value={businessData.mobile}
                  onChange={(e) =>
                    setBusinessData({ ...businessData, mobile: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm outline-none focus:border-[#D9A441] transition-all bg-slate-50/50 focus:bg-white focus:shadow-md"
                />
                <div className="relative">
                  <Lock
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={businessData.password}
                    onChange={(e) =>
                      setBusinessData({
                        ...businessData,
                        password: e.target.value,
                      })
                    }
                    className="w-full pl-10 pr-12 py-3 rounded-xl border border-slate-200 text-sm outline-none focus:border-[#D9A441] transition-all bg-slate-50/50 focus:bg-white focus:shadow-md"
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
                  placeholder="Brand Name"
                  value={businessData.businessName}
                  onChange={(e) =>
                    setBusinessData({
                      ...businessData,
                      businessName: e.target.value,
                    })
                  }
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm outline-none focus:border-[#D9A441] transition-all bg-slate-50/50 focus:bg-white focus:shadow-md"
                />
                <input
                  type="text"
                  placeholder="PAN Number"
                  value={businessData.panNumber}
                  onChange={(e) =>
                    setBusinessData({
                      ...businessData,
                      panNumber: e.target.value,
                    })
                  }
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm outline-none focus:border-[#D9A441] transition-all bg-slate-50/50 focus:bg-white focus:shadow-md"
                />
                <input
                  type="text"
                  placeholder="GST Number"
                  value={businessData.gstNumber}
                  onChange={(e) =>
                    setBusinessData({
                      ...businessData,
                      gstNumber: e.target.value,
                    })
                  }
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm outline-none focus:border-[#D9A441] transition-all bg-slate-50/50 focus:bg-white focus:shadow-md"
                />
                <div className="relative">
                  <MapPin
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <input
                    type="text"
                    placeholder="Business Address"
                    value={businessData.businessAddress}
                    onChange={(e) =>
                      setBusinessData({
                        ...businessData,
                        businessAddress: e.target.value,
                      })
                    }
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-sm outline-none focus:border-[#D9A441] transition-all bg-slate-50/50 focus:bg-white focus:shadow-md"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-xl text-white font-bold shadow-lg flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-70 bg-gradient-to-r from-[#0F1638] to-[#1a2a5c]"
                >
                  <Briefcase size={18} />{" "}
                  {loading ? "Registering..." : "Register as Brand"}
                </button>
              </form>
            )}

            {/* Switch between Login/Register */}
            <div className="mt-6 text-center text-sm">
              <span className="text-slate-500">
                {mode === "login"
                  ? "New to StyleHub?"
                  : "Already have an account?"}
              </span>
              <button
                onClick={() => {
                  setMode(mode === "login" ? "register" : "login");
                  setError("");
                  setShowPassword(false);
                }}
                className="ml-2 font-semibold hover:underline transition-colors"
                style={{ color: THEME.gold }}
              >
                {mode === "login" ? "Create Account" : "Login"}
              </button>
            </div>

            {/* Bypass Mode Indicator */}
            <div className="mt-4 text-center">
              <span className="text-[10px] text-slate-400 bg-slate-100/80 px-4 py-1.5 rounded-full backdrop-blur-sm border border-slate-200/50 inline-flex items-center gap-2">
                <Sparkles size={12} className="text-[#D9A441]" />
                Demo Mode - Instant Access
                <Sparkles size={12} className="text-[#D9A441]" />
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6 text-white/40 text-xs">
          <p>© 2026 StyleHub - Where Fashion Meets Community</p>
        </div>
      </div>
    </div>
  );
}