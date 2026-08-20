import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingBag, ArrowRight } from "lucide-react";

// THEME COLORS FROM YOUR APP
const THEME = {
  ink: "#0F1638",
  gold: "#D9A441",
  goldSoft: "#FDF3E1",
  mapBg: "#E7ECFA",
};

const SplashScreen = () => {
  const navigate = useNavigate();
  const [fadeOut, setFadeOut] = useState(false);

  // Auto-navigate after 3 seconds (if user doesn't click)
  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => navigate("/home"), 500);
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigate]);

  const handleGetStarted = () => {
    setFadeOut(true);
    setTimeout(() => navigate("/home"), 500);
  };

  return (
    <div 
      className={`min-h-screen w-full flex flex-col items-center justify-between px-6 py-12 transition-opacity duration-500 ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
      style={{
        // Stunning dark blue to gold gradient (Your brand colors)
        background: `linear-gradient(145deg, ${THEME.ink} 0%, #1a2a5c 40%, ${THEME.gold} 100%)`
      }}
    >
      {/* Top Spacer */}
      <div className="flex-1"></div>

      {/* Center Content */}
      <div className="flex flex-col items-center gap-6 text-center">
        
        {/* Icon Circle with Glassmorphism */}
        <div className="w-28 h-28 bg-white/10 backdrop-blur-xl border-2 border-white/20 rounded-full flex items-center justify-center shadow-[0_10px_40px_rgba(0,0,0,0.2)]">
          <ShoppingBag 
            size={52} 
            className={`text-[${THEME.gold}] drop-shadow-md`}
            strokeWidth={1.5}
          />
        </div>

        {/* Title & Tagline */}
        <div className="space-y-2 mt-2">
          <h1 className="text-4xl font-extrabold text-white tracking-tight drop-shadow-sm">
            BidKart
          </h1>
          <p className="text-white/80 text-lg font-medium">
            Your auction & shopping destination
          </p>
        </div>
      </div>

      {/* Bottom Button */}
      <div className="w-full max-w-sm mt-12">
        <button
          onClick={handleGetStarted}
          className="w-full group bg-white py-4 rounded-full font-extrabold text-lg shadow-[0_4px_20px_rgba(0,0,0,0.15)] flex items-center justify-center gap-2 hover:scale-105 transition-transform active:scale-95"
          style={{ color: THEME.ink }}
        >
          Get Started
          <ArrowRight 
            size={20} 
            className="group-hover:translate-x-1 transition-transform" 
          />
        </button>
      </div>
    </div>
  );
};

export default SplashScreen;