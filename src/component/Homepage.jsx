import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  MapPin, ChevronDown, Bell, Search, SlidersHorizontal, QrCode,
  ChevronRight, Heart, Clock, LayoutGrid, Radio, Store, Users,
  ShoppingBag, Star as StarIcon,
} from "lucide-react";

const THEME = {
  ink: "#0F1638",
  gold: "#D9A441",
  goldSoft: "#FDF3E1",
  mapBg: "#E7ECFA",
};

const CATEGORIES = [
  { id: "all", label: "All Categories", icon: LayoutGrid },
  { id: "live", label: "Live Auctions", icon: Radio },
  { id: "shops", label: "Shops Near You", icon: Store },
  { id: "community", label: "Communities", icon: Users },
  { id: "buy", label: "Buy Now", icon: ShoppingBag },
  { id: "top", label: "Top Picks", icon: StarIcon },
];

const AUCTIONS = [
  { id: 1, title: "Hero Sprint Cycle", location: "Nashik", distance: "4.8 km", image: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=400&q=80", bid: "3,200", bids: 47, watching: 152, timeLeft: "18m left" },
  { id: 2, title: "Nike Style Shoes", location: "Nashik", distance: "5.2 km", image: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=400&q=80", bid: "1,450", bids: 31, watching: 98, timeLeft: "32m left" },
  { id: 3, title: "Canon DSLR Camera", location: "Nashik", distance: "6.1 km", image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&q=80", bid: "8,500", bids: 22, watching: 64, timeLeft: "1h 12m left" },
  { id: 4, title: "iPhone 13", location: "Nashik", distance: "7.3 km", image: "https://images.unsplash.com/photo-1632661674596-df8be070a5c5?w=400&q=80", bid: "32,000", bids: 18, watching: 52, timeLeft: "45m left" },
];

const SHOPS = [
  { id: 1, name: "Fashion Hub", type: "Clothing Store", distance: "2.3 km away", rating: 4.8, image: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=400&q=80" },
  { id: 2, name: "Electro World", type: "Electronics Store", distance: "3.1 km away", rating: 4.6, image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&q=80" },
  { id: 3, name: "Home Style", type: "Furniture Store", distance: "4.0 km away", rating: 4.7, image: "https://images.unsplash.com/photo-1567016432779-094069958ea5?w=400&q=80" },
  { id: 4, name: "Cycle Point", type: "Bicycle Store", distance: "4.8 km away", rating: 4.5, image: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=400&q=80" },
];

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState("all");
const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#F6F5F1] pb-24">
      <div className="mx-auto max-w-md">
        {/* Header */}
        <header className="px-5 pt-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-medium" style={{ color: THEME.gold }}>
                Location
              </p>
              <button className="mt-0.5 flex items-center gap-1" style={{ color: THEME.ink }}>
                <MapPin size={16} style={{ color: THEME.gold }} />
                <span className="text-sm font-semibold">Nashik, India</span>
                <ChevronDown size={15} className="text-slate-400" />
              </button>
            </div>
            <div className="flex items-center gap-3">
              <button
                aria-label="Notifications"
                className="relative flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm shadow-slate-200"
              >
                <Bell size={17} style={{ color: THEME.ink }} />
                <span
                  className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full text-[10px] font-bold text-white"
                  style={{ backgroundColor: THEME.gold }}
                >
                  3
                </span>
              </button>
              <img
                src="https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=100&q=80"
                alt="Profile"
                className="h-10 w-10 rounded-full object-cover ring-2 ring-white"
              />
            </div>
          </div>

          <h1 className="mt-4 text-2xl font-bold" style={{ color: THEME.ink }}>
            Hi, Sumit <span className="inline-block">👋</span>
          </h1>
          <p className="mt-0.5 text-sm text-slate-500">
            Bid, win &amp; shop from trusted local shops
          </p>
        </header>

        {/* Search + Scan QR */}
        <div className="mt-4 flex items-center gap-3 px-5">
          <div className="flex flex-1 items-center gap-2 rounded-2xl bg-white px-4 py-3.5 shadow-sm shadow-slate-200/70">
            <Search size={18} className="text-slate-400" />
            <input
              type="text"
              placeholder="Search for products, shops & auctions..."
              className="flex-1 bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
            />
            <SlidersHorizontal size={16} className="text-slate-400" />
          </div>
          {/* <button
            className="flex h-[52px] w-[70px] flex-col items-center justify-center gap-1 rounded-2xl text-white shadow-md"
            style={{ backgroundColor: THEME.ink }}
          >
            <QrCode size={17} />
            <span className="text-[10px] font-semibold">Scan QR</span>
          </button> */}
                  <button
  className="flex h-[52px] w-[70px] flex-col items-center justify-center gap-1 rounded-2xl text-white shadow-md"
  style={{ backgroundColor: THEME.ink }}
  onClick={() => navigate("/scan-qr")}
>
  <QrCode size={17} />
  <span className="text-[10px] font-semibold">Scan QR</span>
</button>
        </div>

        {/* Hero banner */}
        <div 
          className="mx-5 mt-5 overflow-hidden rounded-3xl p-6 text-white shadow-lg"
          style={{ 
            background: `linear-gradient(135deg, ${THEME.ink} 0%, #1a2a5c 50%, ${THEME.ink} 100%)` 
          }}
        >
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> 
            LIVE NOW
          </span>
          <h2 className="mt-3 text-2xl font-bold leading-tight">
            Bid. Win. <span style={{ color: THEME.gold }}>Save.</span>
          </h2>
          <p className="mt-2 text-sm text-blue-100">
            Amazing deals on products from trusted local shops.
          </p>
          <Link
            to="/explore"
            className="mt-4 inline-flex items-center gap-1 rounded-xl px-4 py-2.5 text-sm font-semibold"
            style={{ backgroundColor: THEME.gold, color: THEME.ink }}
          >
            Explore Auctions <ChevronRight size={16} />
          </Link>
          <div className="mt-5 flex gap-1.5">
            <span className="h-1.5 w-4 rounded-full" style={{ backgroundColor: THEME.gold }} />
            <span className="h-1.5 w-1.5 rounded-full bg-white/40" />
            <span className="h-1.5 w-1.5 rounded-full bg-white/40" />
            <span className="h-1.5 w-1.5 rounded-full bg-white/40" />
          </div>
        </div>

        {/* Category quick links */}
        <div className="mx-5 mt-5 grid grid-cols-3 gap-y-5 rounded-3xl bg-white px-4 py-5 shadow-sm shadow-slate-200/70 sm:grid-cols-6">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className="flex flex-col items-center gap-2 text-center"
              >
                <span
                  className={`flex h-12 w-12 items-center justify-center rounded-2xl transition-colors`}
                  style={{
                    backgroundColor: isActive ? THEME.ink : "#EEF2FF",
                    color: isActive ? "white" : THEME.ink,
                  }}
                >
                  <Icon size={20} />
                </span>
                <span className="text-[11px] font-medium leading-tight text-slate-700">
                  {cat.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Live Auctions */}
        <section className="mt-6">
          <div className="flex items-center justify-between px-5">
            <h3 className="flex items-center gap-1.5 text-base font-bold" style={{ color: THEME.ink }}>
              ⚡ Live Auctions
            </h3>
            <Link
              to="/explore"
              className="flex items-center gap-0.5 text-sm font-medium"
              style={{ color: THEME.gold }}
            >
              See All <ChevronRight size={15} />
            </Link>
          </div>

          <div className="mt-3 flex gap-4 overflow-x-auto px-5 pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {AUCTIONS.map((item) => (
              <Link


                     to={`/auction/${item.id}`} // <--- ADD THIS LINE
                key={item.id}
                className="w-44 flex-shrink-0 overflow-hidden rounded-2xl bg-white shadow-sm shadow-slate-200/70"
              >
                <div className="relative h-32 w-full">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover"
                  />
                  <span className="absolute left-2 top-2 rounded-md bg-red-500 px-2 py-0.5 text-[10px] font-bold text-white">
                    LIVE
                  </span>
                  <span className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-white/90">
                    <Heart size={13} className="text-slate-500" />
                  </span>
                  <span className="absolute bottom-2 right-2 flex items-center gap-1 rounded-md bg-black/60 px-1.5 py-0.5 text-[10px] font-medium text-white">
                    <Clock size={10} /> {item.timeLeft}
                  </span>
                </div>
                <div className="p-3">
                  <p className="truncate text-sm font-semibold" style={{ color: THEME.ink }}>
                    {item.title}
                  </p>
                  <p className="mt-0.5 flex items-center gap-1 text-[11px] text-slate-400">
                    <MapPin size={11} /> {item.location} • {item.distance}
                  </p>
                  <p className="mt-1.5 text-[11px] text-slate-400">Current Bid</p>
                  <p className="text-sm font-bold" style={{ color: THEME.ink }}>
                    ₹{item.bid}
                  </p>
                  <p className="mt-0.5 text-[10px] text-slate-400">
                    {item.bids} Bids • {item.watching} watching
                  </p>
                  <button 
                    className="mt-2 w-full rounded-lg py-2 text-xs font-semibold text-white"
                    style={{ backgroundColor: THEME.ink }}
                  >
                    Place Bid
                  </button>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Shops Near You */}
        <section className="mt-6">
          <div className="flex items-center justify-between px-5">
            <h3 className="flex items-center gap-1.5 text-base font-bold" style={{ color: THEME.ink }}>
              🏬 Shops Near You
            </h3>
            <Link
              to="/explore"
              className="flex items-center gap-0.5 text-sm font-medium"
              style={{ color: THEME.gold }}
            >
              See All <ChevronRight size={15} />
            </Link>
          </div>

          <div className="mt-3 flex gap-4 overflow-x-auto px-5 pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {SHOPS.map((shop) => (
              <div key={shop.id} className="w-36 flex-shrink-0">
                <div className="relative h-24 w-full overflow-hidden rounded-2xl">
                  <img
                    src={shop.image}
                    alt={shop.name}
                    className="h-full w-full object-cover"
                  />
                  <span className="absolute bottom-1.5 right-1.5 flex items-center gap-0.5 rounded-md bg-white/95 px-1.5 py-0.5 text-[10px] font-semibold text-slate-800">
                    <StarIcon size={10} className="fill-amber-400 text-amber-400" />
                    {shop.rating}
                  </span>
                </div>
                <p className="mt-2 text-sm font-semibold" style={{ color: THEME.ink }}>
                  {shop.name}
                </p>
                <p className="text-[11px] text-slate-400">{shop.type}</p>
                <p className="mt-0.5 flex items-center gap-1 text-[11px] text-slate-400">
                  <MapPin size={10} /> {shop.distance}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Community banner */}
        <div 
          className="mx-5 mt-6 flex items-center gap-4 rounded-3xl p-4"
          style={{ backgroundColor: THEME.goldSoft }}
        >
          <div className="relative flex h-11 w-16 flex-shrink-0 items-center">
            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80"
              className="absolute left-0 h-11 w-11 rounded-full object-cover ring-2"
              style={{ ringColor: THEME.goldSoft }}
              alt=""
            />
            <img
              src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80"
              className="absolute left-5 h-11 w-11 rounded-full object-cover ring-2"
              style={{ ringColor: THEME.goldSoft }}
              alt=""
            />
            <img
              src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&q=80"
              className="absolute left-10 h-11 w-11 rounded-full object-cover ring-2"
              style={{ ringColor: THEME.goldSoft }}
              alt=""
            />
            <span 
              className="absolute -bottom-1 left-3 rounded-full px-1.5 py-0.5 text-[9px] font-bold text-white"
              style={{ backgroundColor: THEME.gold }}
            >
              1.2K+
            </span>
          </div>
          <div className="flex-1">
            <p className="text-sm font-bold" style={{ color: THEME.ink }}>
              Join Communities
            </p>
            <p className="mt-0.5 text-[11px] text-slate-500">
              Connect, share &amp; get the best deals from people near you.
            </p>
            <Link
              to="/explore"
              className="mt-2 inline-flex items-center gap-1 rounded-xl px-3.5 py-2 text-xs font-semibold text-white"
              style={{ backgroundColor: THEME.ink }}
            >
              Explore Communities <ChevronRight size={13} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}