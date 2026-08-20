import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Globe,
  Bell,
  Mail,
  Smartphone,
  User,
  Shield,
  LogOut,
  ChevronRight,
} from "lucide-react";

// --- TUMCHYA APP CHA THEME ---
const THEME = {
  ink: "#0F1638",
  gold: "#D9A441",
  goldSoft: "#FDF3E1",
  mapBg: "#E7ECFA",
};

export default function SettingsPage() {
  const navigate = useNavigate();
  
  // --- Language State ---
  const [language, setLanguage] = useState("English");

  // --- Notification States ---
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
  });

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  const toggleNotification = (key) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="min-h-screen bg-[#F6F5F1] pb-24">
      <div className="mx-auto max-w-md">
        
        {/* Header */}
        <header className="bg-white px-5 py-4 sticky top-0 z-10 border-b border-slate-100 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-2">
            <button onClick={() => navigate(-1)} className="p-1 hover:bg-slate-100 rounded-full transition-colors">
              <ArrowLeft size={22} className="text-[#0F1638]" />
            </button>
            <h1 className="text-[17px] font-bold text-[#0F1638]">Settings</h1>
          </div>
        </header>

        <div className="px-4 pt-4 pb-6 space-y-6">
          
          {/* --- Section 1: Language --- */}
          <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-[#FDF3E1] rounded-lg">
                  <Globe size={18} className="text-[#D9A441]" />
                </div>
                <div>
                  <p className="text-sm font-bold text-[#0F1638]">Language</p>
                  <p className="text-xs text-slate-500">Select your preferred language</p>
                </div>
              </div>
              <select 
                value={language}
                onChange={handleLanguageChange}
                className="bg-transparent text-sm font-semibold text-[#0F1638] outline-none cursor-pointer border border-slate-200 rounded-lg px-3 py-1"
              >
                <option value="English">English</option>
                <option value="Hindi">Hindi</option>
                <option value="Marathi">Marathi</option>
              </select>
            </div>
          </div>

          {/* --- Section 2: Notifications --- */}
          <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <div className="p-2 bg-[#FDF3E1] rounded-lg">
                <Bell size={18} className="text-[#D9A441]" />
              </div>
              <div>
                <p className="text-sm font-bold text-[#0F1638]">Notifications</p>
                <p className="text-xs text-slate-500">Manage your notification preferences</p>
              </div>
            </div>
            
            <div className="space-y-3 pt-2 border-t border-slate-100">
              {/* Email Toggle */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Mail size={16} className="text-slate-500" />
                  <span className="text-sm text-[#0F1638]">Email Notifications</span>
                </div>
                <button 
                  onClick={() => toggleNotification('email')} 
                  className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${notifications.email ? "bg-[#D9A441]" : "bg-slate-300"}`}
                >
                  <span className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${notifications.email ? "translate-x-5" : "translate-x-1"}`} />
                </button>
              </div>
              
              {/* Push Toggle */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Smartphone size={16} className="text-slate-500" />
                  <span className="text-sm text-[#0F1638]">Push Notifications</span>
                </div>
                <button 
                  onClick={() => toggleNotification('push')} 
                  className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${notifications.push ? "bg-[#D9A441]" : "bg-slate-300"}`}
                >
                  <span className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${notifications.push ? "translate-x-5" : "translate-x-1"}`} />
                </button>
              </div>
              
              {/* SMS Toggle */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Smartphone size={16} className="text-slate-500" />
                  <span className="text-sm text-[#0F1638]">SMS Notifications</span>
                </div>
                <button 
                  onClick={() => toggleNotification('sms')} 
                  className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${notifications.sms ? "bg-[#D9A441]" : "bg-slate-300"}`}
                >
                  <span className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${notifications.sms ? "translate-x-5" : "translate-x-1"}`} />
                </button>
              </div>
            </div>
          </div>

          {/* --- Section 3: Account --- */}
          <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <div className="p-2 bg-[#FDF3E1] rounded-lg">
                <User size={18} className="text-[#D9A441]" />
              </div>
              <div>
                <p className="text-sm font-bold text-[#0F1638]">Account</p>
                <p className="text-xs text-slate-500">Manage your account settings</p>
              </div>
            </div>
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <button className="w-full flex items-center justify-between p-2 hover:bg-slate-50 rounded-lg transition-colors">
                <div className="flex items-center gap-2">
                  <Shield size={16} className="text-slate-500" />
                  <span className="text-sm text-[#0F1638]">Privacy & Security</span>
                </div>
                <ChevronRight size={16} className="text-slate-400" />
              </button>
              <button className="w-full flex items-center justify-between p-2 hover:bg-slate-50 rounded-lg transition-colors">
                <div className="flex items-center gap-2">
                  <LogOut size={16} className="text-red-500" />
                  <span className="text-sm text-red-500 font-medium">Log Out</span>
                </div>
                <ChevronRight size={16} className="text-slate-400" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}