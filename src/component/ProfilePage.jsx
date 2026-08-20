import React, { useState } from "react";
import {
  MapPin,
  ChevronDown,
  Bell,
  Settings,
  HelpCircle,
  Wallet,
  User,
  Package,
  ShoppingBag,
  Heart,
  Award,
  Star,
  Building2,
  Store,
  Briefcase,
  List,
  Gavel,
  Trophy,
  Eye,
  Edit2,
  LogOut,
  ChevronRight,
  Crown,
  Shield,
  CheckCircle,
  Mail,
  Phone,
  UserCircle,
  Users,
  Boxes,      // For My Stock
  Users2,     // For My Customers
  MessageCircle, // For My Community
} from "lucide-react";

const THEME = {
  ink: "#0F1638",
  gold: "#D9A441",
  goldSoft: "#FDF3E1",
  mapBg: "#E7ECFA",
};

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("business");
  const [userType, setUserType] = useState("business"); // "business" or "customer"

  const businessProfile = {
    name: "Cycle World Nashik",
    type: "Business Account",
    email: "cyclesworld@gmail.com",
    phone: "+91 98765 43210",
    location: "Nashik, Maharashtra",
    listings: 78,
    bids: 24,
    rating: 4.8,
    joinDate: "Jan 2024",
    verified: true,
  };

  const customerProfile = {
    name: "Rahul Patil",
    type: "Customer Account",
    email: "rahulpatil@gmail.com",
    phone: "+91 98765 43210",
    location: "Nashik, Maharashtra",
    wonAuctions: 12,
    bidsPlaced: 3,
    rating: 4.6,
    joinDate: "Mar 2024",
    verified: false,
  };

  // --- UPDATED Business Tools with 3 New Options ---
  const businessTools = [
    { id: "listings", label: "My Auction Listings", icon: List, desc: "Manage and track your listed items", count: 78 },
    { id: "bids", label: "Biddings & Purchases", icon: Gavel, desc: "My Bids - Items you have placed bids on", count: 24 },
    { id: "won", label: "Won Auctions", icon: Trophy, desc: "Items you have won", count: 12 },
    { id: "watchlist", label: "Watchlist", icon: Eye, desc: "Items you are watching", count: 45 },
    
    // --- NEW ITEMS HERE ---
    { id: "community", label: "My Community", icon: MessageCircle, desc: "Join & manage local communities", count: 3 },
    { id: "customers", label: "My Customers", icon: Users2, desc: "View & connect with your customer base", count: 158 },
    { id: "stock", label: "My Stock", icon: Boxes, desc: "Manage inventory and stock levels", count: 210 },
  ];

  const accountOptions = [
    { id: "profile", label: "My Profile", icon: User, desc: "View and edit your profile" },
    { id: "wallet", label: "My Wallet", icon: Wallet, desc: "Manage your wallet and transactions" },
    { id: "settings", label: "Settings", icon: Settings, desc: "Notification, privacy & more" },
    { id: "help", label: "Help & Support", icon: HelpCircle, desc: "Get help and contact support" },
  ];

  const renderBusinessTools = () => (
    <div className="space-y-3">
      {businessTools.map((tool) => {
        const Icon = tool.icon;
        return (
          <button
            key={tool.id}
            className="w-full bg-white rounded-xl p-4 border border-slate-100 text-left hover:shadow-md transition-shadow flex items-center justify-between group"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[#FDF3E1] rounded-lg group-hover:bg-[#D9A441]/20 transition-colors">
                <Icon size={20} className="text-[#D9A441]" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-[#0F1638]">{tool.label}</p>
                <p className="text-xs text-slate-500">{tool.desc}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              {/* Count Badge */}
              <span className="px-2 py-1 bg-slate-50 rounded-full text-[10px] font-bold text-[#0F1638] border border-slate-200">
                {tool.count}
              </span>
              <ChevronRight size={18} className="text-slate-300 group-hover:text-[#D9A441] transition-colors" />
            </div>
          </button>
        );
      })}
    </div>
  );

  const renderAccountOptions = () => (
    <div className="space-y-3">
      {accountOptions.map((option) => {
        const Icon = option.icon;
        return (
          <button
            key={option.id}
            className="w-full bg-white rounded-xl p-4 border border-slate-100 text-left hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-slate-50 rounded-lg">
                <Icon size={20} className="text-[#0F1638]" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-[#0F1638]">{option.label}</p>
                <p className="text-xs text-slate-500">{option.desc}</p>
              </div>
              <ChevronRight size={18} className="text-slate-400" />
            </div>
          </button>
        );
      })}
    </div>
  );

  const renderBusinessFeatures = () => (
    <div className="bg-[#FDF3E1] rounded-xl p-4 border border-[#D9A441]/30">
      <div className="flex items-start gap-3">
        <div className="p-2 bg-[#D9A441] rounded-lg">
          <Store size={20} className="text-white" />
        </div>
        <div className="flex-1">
          <p className="font-semibold text-[#0F1638]">Business Account</p>
          <ul className="mt-2 space-y-1">
            <li className="flex items-center gap-2 text-xs text-slate-600">
              <CheckCircle size={12} className="text-[#D9A441]" />
              Can list items for auction
            </li>
            <li className="flex items-center gap-2 text-xs text-slate-600">
              <CheckCircle size={12} className="text-[#D9A441]" />
              Can manage their auction listings
            </li>
            <li className="flex items-center gap-2 text-xs text-slate-600">
              <CheckCircle size={12} className="text-[#D9A441]" />
              Can place bids on other items
            </li>
            <li className="flex items-center gap-2 text-xs text-slate-600">
              <CheckCircle size={12} className="text-[#D9A441]" />
              Full access to bidding and selling features
            </li>
          </ul>
        </div>
      </div>
    </div>
  );

  const renderProfileCard = (profile, isBusiness) => (
    <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
      {/* Profile Header */}
      <div className="flex items-start gap-4">
        <div className="relative">
          <div className="w-16 h-16 rounded-full bg-[#FDF3E1] flex items-center justify-center">
            <UserCircle size={40} className="text-[#D9A441]" />
          </div>
          {profile.verified && (
            <div className="absolute -bottom-1 -right-1 bg-blue-500 rounded-full p-0.5">
              <CheckCircle size={14} className="text-white fill-blue-500" />
            </div>
          )}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-[#0F1638]">{profile.name}</h2>
            <span className="text-xs bg-[#FDF3E1] text-[#D9A441] px-2 py-0.5 rounded-full font-medium">
              {isBusiness ? "Business" : "Customer"}
            </span>
          </div>
          <p className="text-sm text-slate-500">{profile.type}</p>
          <div className="flex flex-col gap-0.5 mt-1">
            <p className="text-xs text-slate-600 flex items-center gap-1">
              <Mail size={12} className="text-slate-400" /> {profile.email}
            </p>
            <p className="text-xs text-slate-600 flex items-center gap-1">
              <Phone size={12} className="text-slate-400" /> {profile.phone}
            </p>
          </div>
          <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
            <MapPin size={12} className="text-[#D9A441]" /> {profile.location}
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-3 mt-4 pt-4 border-t border-slate-100">
        {isBusiness ? (
          <>
            <div className="text-center">
              <p className="text-xl font-bold text-[#0F1638]">{profile.listings}</p>
              <p className="text-xs text-slate-500">Active Listings</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-bold text-[#0F1638]">{profile.bids}</p>
              <p className="text-xs text-slate-500">Bids Placed</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-0.5">
                <p className="text-xl font-bold text-[#0F1638]">{profile.rating}</p>
                <Star size={16} className="fill-[#D9A441] text-[#D9A441]" />
              </div>
              <p className="text-xs text-slate-500">Ratings</p>
            </div>
          </>
        ) : (
          <>
            <div className="text-center">
              <p className="text-xl font-bold text-[#0F1638]">{profile.wonAuctions}</p>
              <p className="text-xs text-slate-500">Won Auctions</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-bold text-[#0F1638]">{profile.bidsPlaced}</p>
              <p className="text-xs text-slate-500">Bids Placed</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-0.5">
                <p className="text-xl font-bold text-[#0F1638]">{profile.rating}</p>
                <Star size={16} className="fill-[#D9A441] text-[#D9A441]" />
              </div>
              <p className="text-xs text-slate-500">Rating</p>
            </div>
          </>
        )}
      </div>

      {/* Edit Profile Button */}
      <button className="w-full mt-4 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-[#0F1638] hover:bg-slate-50 transition-colors flex items-center justify-center gap-2">
        <Edit2 size={16} />
        Edit Profile
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F6F5F1] pb-24">
      <div className="mx-auto max-w-md">
        {/* Header */}
        <header className="bg-white border-b border-slate-100 px-5 py-4 sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-[#0F1638]">Profile</h1>
              <p className="text-xs text-slate-500">Manage your account</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                aria-label="Notifications"
                className="relative flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm"
              >
                <Bell size={17} style={{ color: THEME.ink }} />
                <span
                  className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full text-[10px] font-bold text-white"
                  style={{ backgroundColor: THEME.gold }}
                >
                  3
                </span>
              </button>
              <button className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                <LogOut size={20} className="text-slate-500" />
              </button>
            </div>
          </div>

          {/* Account Type Tabs */}
          <div className="flex gap-2 mt-4 bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => setUserType("business")}
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
                userType === "business"
                  ? "bg-white text-[#0F1638] shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <Store size={16} />
                Business
              </div>
            </button>
            <button
              onClick={() => setUserType("customer")}
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
                userType === "customer"
                  ? "bg-white text-[#0F1638] shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <User size={16} />
                Customer
              </div>
            </button>
          </div>
        </header>

        {/* Content */}
        <div className="p-5 space-y-6">
          {/* Profile Card */}
          {userType === "business" 
            ? renderProfileCard(businessProfile, true)
            : renderProfileCard(customerProfile, false)
          }

          {/* Account Type Label */}
          <div className="flex items-center gap-2">
            <div className="flex-1 h-px bg-slate-200"></div>
            <span className="text-xs font-medium text-slate-400">
              {userType === "business" ? "Business Account" : "Customer Account"}
            </span>
            <div className="flex-1 h-px bg-slate-200"></div>
          </div>

          {/* Business Tools (only for business account) */}
          {userType === "business" && (
            <>
              <div>
                <h3 className="text-sm font-semibold text-[#0F1638] mb-3">Business Tools</h3>
                {renderBusinessTools()}
              </div>

              {/* Business Features */}
              {renderBusinessFeatures()}
            </>
          )}

          {/* Account Options */}
          <div>
            <h3 className="text-sm font-semibold text-[#0F1638] mb-3">Account</h3>
            {renderAccountOptions()}
          </div>

          {/* Logout Button */}
          <button className="w-full py-3.5 rounded-xl border-2 border-red-200 text-red-600 font-semibold hover:bg-red-50 transition-colors flex items-center justify-center gap-2">
            <LogOut size={18} />
            Log Out
          </button>

          {/* Version */}
          <p className="text-center text-xs text-slate-400">Version 1.0.0</p>
        </div>
      </div>
    </div>
  );
}