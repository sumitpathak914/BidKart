import {
  Bell,
  ChevronDown,
  ChevronRight,
  Clock,
  Heart,
  LayoutGrid,
  Loader2,
  MapPin,
  QrCode,
  Radio,
  Search,
  ShieldCheck,
  ShoppingBag,
  Star as StarIcon,
  Store,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const THEME = {
  ink: "#0F1638",
  gold: "#D9A441",
  goldSoft: "#FDF3E1",
  mapBg: "#E7ECFA",
};

const CATEGORIES = [
  { id: "all", label: "All", icon: LayoutGrid },
  { id: "live", label: "Live", icon: Radio },
  { id: "shops", label: "Shops", icon: Store },
  { id: "community", label: "Community", icon: Users },
  { id: "buy", label: "Buy Now", icon: ShoppingBag },
  { id: "top", label: "Top Picks", icon: StarIcon },
];

const AUCTIONS = [
  {
    id: 1,
    title: "Hero Sprint 27.5T Cycle",
    location: "Nashik",
    distance: "4.8 km",
    image:
      "https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=400&q=80",
    bid: "3,200",
    bids: 47,
    watching: 152,
    timeLeft: "18m",
  },
  {
    id: 2,
    title: "Nike Air Max Premium",
    location: "Nashik",
    distance: "5.2 km",
    image:
      "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=400&q=80",
    bid: "1,450",
    bids: 31,
    watching: 98,
    timeLeft: "32m",
  },
  {
    id: 3,
    title: "Canon EOS 200D DSLR",
    location: "Nashik",
    distance: "6.1 km",
    image:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&q=80",
    bid: "8,500",
    bids: 22,
    watching: 64,
    timeLeft: "1h 12m",
  },
  {
    id: 4,
    title: "iPhone 13 Pro Max",
    location: "Nashik",
    distance: "7.3 km",
    image:
      "https://images.unsplash.com/photo-1632661674596-df8be070a5c5?w=400&q=80",
    bid: "32,000",
    bids: 18,
    watching: 52,
    timeLeft: "45m",
  },
  {
    id: 5,
    title: "Wooden Center Table",
    location: "Nashik",
    distance: "2.1 km",
    image:
      "https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=400&q=80",
    bid: "1,200",
    bids: 12,
    watching: 35,
    timeLeft: "2h 10m",
  },
];

const SHOPS = [
  {
    id: 1,
    name: "Fashion Hub",
    type: "Clothing Store",
    distance: "2.3 km",
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=400&q=80",
  },
  {
    id: 2,
    name: "Electro World",
    type: "Electronics",
    distance: "3.1 km",
    rating: 4.6,
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&q=80",
  },
  {
    id: 3,
    name: "Home Style",
    type: "Furniture",
    distance: "4.0 km",
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1567016432779-094069958ea5?w=400&q=80",
  },
  {
    id: 4,
    name: "Cycle Point",
    type: "Bicycle Store",
    distance: "4.8 km",
    rating: 4.5,
    image:
      "https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=400&q=80",
  },
];

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const navigate = useNavigate();
  const scrollRef = useRef(null);

  const [locationText, setLocationText] = useState("Getting location...");
  const [isLocationLoading, setIsLocationLoading] = useState(true);
  const [userCoords, setUserCoords] = useState(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocationText("Location not supported");
      setIsLocationLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        setUserCoords({ latitude, longitude });

        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1&accept-language=en`,
          );
          const data = await response.json();

          if (data && data.address) {
            const addr = data.address;
            
            // FULL ADDRESS constructed without cutting anything
            const fullAddressParts = [
              addr.road,
              addr.neighbourhood,
              addr.suburb,
              addr.city_district,
              addr.city,
              addr.state,
              addr.country
            ].filter(Boolean); // Remove empty/null values

            const fullAddress = fullAddressParts.join(", ");
            
            // Set the full long address
            setLocationText(fullAddress);
          } else {
            setLocationText("Nashik, Maharashtra, India");
          }
        } catch (error) {
          console.error("Reverse Geocoding Error:", error);
          setLocationText("Nashik, Maharashtra, India");
        } finally {
          setIsLocationLoading(false);
        }
      },
      (error) => {
        console.error("Geolocation Error:", error);
        setLocationText("Nashik, Maharashtra, India");
        setIsLocationLoading(false);
      },
      { enableHighAccuracy: true },
    );
  }, []);

  return (
    <div className="min-h-screen bg-[#F8F7F4] pb-24">
      <div className="mx-auto max-w-md">
        {/* --- PREMIUM HEADER --- */}
        <header className="px-5 pt-6 pb-2 bg-[#F8F7F4]">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span
                  className="flex h-6 w-6 items-center justify-center rounded-full"
                  style={{ backgroundColor: THEME.gold }}
                >
                  <MapPin size={12} className="text-white" />
                </span>
                <span className="text-xs font-semibold text-slate-500">
                  Current Location
                </span>
              </div>

              {/* --- FULL ADDRESS DISPLAY (No truncate, allows multiple lines) --- */}
              <button
                className="mt-0.5 flex items-start gap-1 max-w-[250px] text-left"
                style={{ color: THEME.ink }}
              >
                {isLocationLoading ? (
                  <span className="flex items-center gap-2 text-sm font-semibold">
                    <Loader2 size={14} className="animate-spin" /> Loading...
                  </span>
                ) : (
                  <>
                    {/* REMOVED truncate, added whitespace-normal to allow full address on 2 lines */}
                    <span className="text-base font-bold leading-tight whitespace-normal break-words">
                      {locationText}
                    </span>
                    <ChevronDown size={16} className="text-slate-400 flex-shrink-0 mt-1" />
                  </>
                )}
              </button>
            </div>
            <div className="flex items-center gap-3 flex-shrink-0">
              <button
                aria-label="Notifications"
                className="relative flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-md shadow-slate-200"
              >
                <Bell size={18} style={{ color: THEME.ink }} />
                <span
                  className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold text-white border-2 border-white"
                  style={{ backgroundColor: THEME.gold }}
                >
                  3
                </span>
              </button>
              <img
                src="https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=100&q=80"
                alt="Profile"
                className="h-11 w-11 rounded-full object-cover border-2 border-white shadow-md shadow-slate-200"
              />
            </div>
          </div>

          <h1
            className="mt-5 text-2xl font-extrabold"
            style={{ color: THEME.ink }}
          >
            Hi, Sumit <span className="inline-block animate-bounce">👋</span>
          </h1>
          <p className="mt-0.5 text-sm text-slate-500 font-medium">
            Discover amazing deals near you
          </p>
        </header>

        {/* --- MODERN SEARCH BAR --- */}
        <div className="mt-3 flex items-center gap-3 px-5">
          <div className="flex flex-1 items-center gap-2 rounded-2xl bg-white px-4 py-3.5 shadow-lg shadow-slate-200/60 ring-1 ring-slate-100">
            <Search size={18} className="text-slate-400" />
            <input
              type="text"
              placeholder="Search products, shops..."
              className="flex-1 bg-transparent text-[14px] text-slate-700 outline-none placeholder:text-slate-400"
            />
          </div>
          <button
            className="flex h-[54px] w-[54px] flex-shrink-0 items-center justify-center rounded-2xl text-white shadow-lg transition-transform hover:scale-105 active:scale-95"
            style={{ backgroundColor: THEME.ink }}
            onClick={() => navigate("/scan-qr")}
          >
            <QrCode size={22} />
          </button>
        </div>

        {/* --- FLAT CATEGORY PILLS --- */}
        <div className="mt-5 flex gap-2 overflow-x-auto px-5 pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex flex-shrink-0 items-center gap-1.5 rounded-full px-4 py-2.5 text-[13px] font-bold transition-all ${
                  isActive
                    ? "text-white shadow-md"
                    : "bg-white text-slate-600 shadow-sm ring-1 ring-slate-100"
                }`}
                style={{ backgroundColor: isActive ? THEME.ink : "white" }}
              >
                <Icon size={14} />
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* --- HERO BANNER (Premium Glass look) --- */}
        <div
          className="mx-5 mt-5 overflow-hidden rounded-3xl p-6 text-white shadow-2xl relative"
          style={{
            background: `linear-gradient(145deg, ${THEME.ink} 0%, #243b75 100%)`,
          }}
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-2xl"></div>
          <div className="absolute bottom-0 right-0 w-24 h-24 bg-[#D9A441]/20 rounded-full -mr-12 -mb-12 blur-xl"></div>

          <div className="relative z-10 flex justify-between items-start">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 backdrop-blur-md px-3 py-1 text-[11px] font-semibold border border-white/10">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              LIVE NOW
            </span>
            <TrendingUp size={20} className="text-white/30" />
          </div>

          <h2 className="relative z-10 mt-3 text-2xl font-extrabold leading-tight">
            Bid. Win. <span style={{ color: THEME.gold }}>Repeat.</span>
          </h2>
          <p className="relative z-10 mt-1 text-sm text-blue-100/80 font-medium">
            Exclusive auctions from verified local sellers.
          </p>

          <div className="relative z-10 mt-5 flex items-center gap-3">
            <Link
              to="/explore"
              className="inline-flex items-center gap-1 rounded-xl bg-white px-5 py-2.5 text-sm font-extrabold shadow-lg transition-transform hover:scale-105 active:scale-95"
              style={{ color: THEME.ink }}
            >
              Explore Now <ChevronRight size={18} />
            </Link>
            <div className="flex items-center gap-1 text-[11px] text-white/60 font-medium">
              <ShieldCheck size={14} className="text-emerald-400" /> Safe
              Bidding
            </div>
          </div>
        </div>

        {/* --- FOCUS SCROLL: LIVE AUCTIONS --- */}
        <section className="mt-7">
          <div className="flex items-center justify-between px-5 mb-2">
            <h3
              className="flex items-center gap-2 text-[17px] font-extrabold"
              style={{ color: THEME.ink }}
            >
              <Zap size={18} style={{ color: THEME.gold }} /> Live Auctions
            </h3>
            <Link
              to="/all-auctions"
              className="flex items-center gap-0.5 text-[13px] font-bold"
              style={{ color: THEME.gold }}
            >
              See All <ChevronRight size={15} />
            </Link>
          </div>

          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto px-5 pb-6 snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {AUCTIONS.map((item) => (
              <Link
                to={`/auction/${item.id}`}
                key={item.id}
                className="w-[80%] flex-shrink-0 snap-center"
              >
                <div className="relative h-72 w-full overflow-hidden rounded-3xl bg-white shadow-xl shadow-slate-200/70 ring-1 ring-slate-100/50 transition-transform hover:scale-[1.01]">
                  <div className="relative h-44 w-full overflow-hidden bg-slate-100">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>

                    <div className="absolute top-3 left-3 flex items-center gap-2">
                      <span className="rounded-lg bg-red-500 px-2.5 py-1 text-[10px] font-bold text-white shadow-lg shadow-red-500/30">
                        LIVE
                      </span>
                      <span className="flex items-center gap-1 rounded-lg bg-black/60 backdrop-blur-md px-2.5 py-1 text-[10px] font-medium text-white">
                        <Clock size={12} /> {item.timeLeft}
                      </span>
                    </div>
                    <button className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 backdrop-blur-md shadow-md hover:bg-white transition-colors">
                      <Heart size={15} className="text-slate-600" />
                    </button>
                    <div className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full bg-black/60 backdrop-blur-md px-3 py-1 text-white text-[10px]">
                      <Users size={12} /> {item.watching} watching
                    </div>
                  </div>

                  <div className="p-4 flex flex-col h-[112px] justify-between">
                    <div>
                      <div className="flex items-center justify-between">
                        <p
                          className="text-[15px] font-bold truncate"
                          style={{ color: THEME.ink }}
                        >
                          {item.title}
                        </p>
                      </div>
                      <p className="flex items-center gap-1 text-[11px] text-slate-400 mt-0.5">
                        <MapPin size={11} /> {item.location} • {item.distance}
                      </p>
                    </div>

                    <div className="flex items-end justify-between border-t border-slate-100 pt-3">
                      <div>
                        <p className="text-[10px] text-slate-400 font-medium">
                          Current Bid
                        </p>
                        <p
                          className="text-[17px] font-extrabold"
                          style={{ color: THEME.ink }}
                        >
                          ₹{item.bid}
                        </p>
                      </div>
                      <button
                        className="rounded-xl px-4 py-1.5 text-[12px] font-bold text-white shadow-md transition-transform hover:scale-105 active:scale-95"
                        style={{ backgroundColor: THEME.ink }}
                      >
                        Place Bid
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* --- FOCUS SCROLL: SHOPS NEAR YOU --- */}
        <section className="mt-2">
          <div className="flex items-center justify-between px-5 mb-2">
            <h3
              className="flex items-center gap-2 text-[17px] font-extrabold"
              style={{ color: THEME.ink }}
            >
              <Store size={18} style={{ color: THEME.gold }} /> Top Shops
            </h3>
            <Link
              to="/explore"
              className="flex items-center gap-0.5 text-[13px] font-bold"
              style={{ color: THEME.gold }}
            >
              See All <ChevronRight size={15} />
            </Link>
          </div>

          <div className="flex gap-4 overflow-x-auto px-5 pb-6 snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {SHOPS.map((shop) => (
              <div
                key={shop.id}
                className="w-[65%] flex-shrink-0 snap-center cursor-pointer"
                onClick={() => navigate(`/shop/${shop.id}`)}
              >
                <div className="relative h-48 w-full overflow-hidden rounded-2xl bg-white shadow-lg shadow-slate-200/70 ring-1 ring-slate-100/50">
                  <img
                    src={shop.image}
                    alt={shop.name}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

                  <div className="absolute bottom-3 left-3 right-3">
                    <div className="flex items-center gap-1.5">
                      <h4 className="text-[15px] font-bold text-white truncate flex-1">
                        {shop.name}
                      </h4>
                      <div className="flex items-center gap-1 bg-white/20 backdrop-blur-sm px-2 py-0.5 rounded-full">
                        <StarIcon
                          size={10}
                          className="fill-amber-400 text-amber-400"
                        />
                        <span className="text-[10px] font-bold text-white">
                          {shop.rating}
                        </span>
                      </div>
                    </div>
                    <p className="text-[11px] text-white/80 mt-0.5">
                      {shop.type} • {shop.distance} away
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* --- CLEAN COMMUNITY BANNER --- */}
        <div className="mx-5 mt-2 mb-6 flex items-center gap-4 rounded-3xl bg-white p-4 shadow-lg shadow-slate-200/70 ring-1 ring-slate-100/50">
          <div className="relative flex h-14 w-20 flex-shrink-0 items-center">
            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80"
              className="absolute left-0 h-12 w-12 rounded-full object-cover ring-2 ring-white shadow-md"
              alt=""
            />
            <img
              src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80"
              className="absolute left-6 h-12 w-12 rounded-full object-cover ring-2 ring-white shadow-md"
              alt=""
            />
            <img
              src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&q=80"
              className="absolute left-12 h-12 w-12 rounded-full object-cover ring-2 ring-white shadow-md"
              alt=""
            />
            <span
              className="absolute -bottom-1 left-6 rounded-full border-2 border-white px-2 py-0.5 text-[9px] font-bold text-white shadow-md"
              style={{ backgroundColor: THEME.gold }}
            >
              1.2K+
            </span>
          </div>
          <div className="flex-1">
            <p
              className="text-[15px] font-extrabold"
              style={{ color: THEME.ink }}
            >
              Join Local Communities
            </p>
            <p className="mt-0.5 text-[11px] text-slate-500 font-medium">
              Connect & get the best local deals.
            </p>
            <Link
              to="/community"
              className="mt-2 inline-flex items-center gap-1 rounded-lg px-3 py-1.5 text-[11px] font-bold text-white shadow-md transition-transform hover:scale-105 active:scale-95"
              style={{ backgroundColor: THEME.ink }}
            >
              Join Now <ChevronRight size={13} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}