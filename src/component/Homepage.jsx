import {
    ArrowRight,
    Bell,
    ChevronDown,
    ChevronRight,
    Clock,
    CreditCard,
    Flame,
    Gift,
    Heart,
    LayoutGrid,
    Loader2,
    MapPin,
    QrCode,
    Radio,
    Search,
    ShieldCheck,
    ShoppingBag,
    Smartphone,
    Star as StarIcon,
    Store,
    Tag,
    Timer,
    TrendingUp,
    Users,
    X,
    Zap,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import BannerImage from "../assets/banner.png"; // Importing the banner image

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

// --- NEW DATA: BEST DEALS ---
const BEST_DEALS = [
  {
    id: 1,
    name: "Premium Cotton Shirt",
    price: "₹ 899",
    image:
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&q=80",
    shop: "Fashion Hub",
  },
  {
    id: 2,
    name: "Men's Running Shoes",
    price: "₹ 1,299",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80",
    shop: "Sport Zone",
  },
  {
    id: 3,
    name: "Smart Watch Pro",
    price: "₹ 4,500",
    image:
      "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=400&q=80",
    shop: "Electro World",
  },
  {
    id: 4,
    name: "Classic Jeans",
    price: "₹ 1,050",
    image:
      "https://images.unsplash.com/photo-1542272617-08f0865b947d?w=400&q=80",
    shop: "Fashion Hub",
  },
];

// --- NEW DATA: COUPONS ---
const COUPONS = [
  {
    id: 1,
    code: "PHONEPAY20",
    desc: "20% off using PhonePe",
    icon: Smartphone,
    color: "#5B4DFF",
  },
  {
    id: 2,
    code: "SAVE100",
    desc: "₹100 off on orders above ₹500",
    icon: CreditCard,
    color: "#D9A441",
  },
  { id: 3, code: "DEAL50", desc: "Flat ₹50 off", icon: Tag, color: "#0F1638" },
];

// --- NEW DATA: ENDING SOON BIDS ---
const ENDING_SOON = [
  {
    id: 1,
    title: "Vintage Camera",
    price: "₹ 1,200",
    image:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&q=80",
    bids: 5,
    timeLeft: "10m",
  },
  {
    id: 2,
    title: "Sony Headphones",
    price: "₹ 2,500",
    image:
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=400&q=80",
    bids: 8,
    timeLeft: "25m",
  },
  {
    id: 3,
    title: "Gaming Mouse",
    price: "₹ 800",
    image:
      "https://images.unsplash.com/photo-1527814050087-3793815479db?w=400&q=80",
    bids: 3,
    timeLeft: "45m",
  },
];

// --- SKELETON LOADER COMPONENTS ---
const Shimmer = () => (
  <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
);

const SkeletonBox = ({ className }) => (
  <div className={`relative overflow-hidden bg-slate-200 rounded-xl ${className}`}>
    <Shimmer />
  </div>
);

const SkeletonText = ({ className }) => (
  <div className={`relative overflow-hidden bg-slate-200 rounded-full ${className}`}>
    <Shimmer />
  </div>
);

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const navigate = useNavigate();
  const scrollRef = useRef(null);

  // --- STATE FOR THE MODAL ---
   const [showPromoModal, setShowPromoModal] = useState(() => {
    const isClosed = sessionStorage.getItem('promoClosed');
    return isClosed !== "true";
  });
  const [locationText, setLocationText] = useState("Getting location...");
  const [isLocationLoading, setIsLocationLoading] = useState(true);
  const [userCoords, setUserCoords] = useState(null);
  const [isPageLoading, setIsPageLoading] = useState(true); // Overall skeleton state

  useEffect(() => {
    // Simulate page load
    const timer = setTimeout(() => setIsPageLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

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

            const fullAddressParts = [
              addr.road,
              addr.neighbourhood,
              addr.suburb,
              addr.city_district,
              addr.city,
              addr.state,
              addr.country,
            ].filter(Boolean);

            const fullAddress = fullAddressParts.join(", ");
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

  // --- FUNCTION TO HANDLE CLOSING THE MODAL ---
  const handleClosePromoModal = () => {
    sessionStorage.setItem('promoClosed', 'true'); // Save to session
    setShowPromoModal(false);
  };

  return (
    <div className="min-h-screen bg-[#F8F7F4] pb-24 relative">
      {/* {showPromoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
          <div className="bg-white w-full max-w-sm rounded-3xl shadow-2xl overflow-hidden animate-scale-up relative">
            <button
              onClick={handleClosePromoModal}
              className="absolute top-4 right-4 z-10 p-1 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors"
            >
              <X size={20} className="text-slate-500" />
            </button>
            <div
              className="relative p-6 text-white text-center"
              style={{ background: `linear-gradient(135deg, ${THEME.ink} 0%, #1a2a5c 100%)` }}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16"></div>
              <div className="absolute bottom-0 left-0 w-20 h-20 bg-[#D9A441]/10 rounded-full -ml-10 -mb-10"></div>
            </div>
            <div className="p-6 space-y-4 h-[600px]">
              <img src={BannerImage} alt="Promotion" className="w-full h-full object-cover" />
              <div className="pt-4 border-t border-slate-100 flex gap-3">
                <button
                  onClick={handleClosePromoModal}
                  className="flex-1 py-3 rounded-xl border border-slate-200 text-slate-600 font-semibold hover:bg-slate-50 transition-colors"
                >
                  Maybe Later
                </button>
                <button
                  onClick={() => {
                    handleClosePromoModal();
                    navigate("/profile");
                  }}
                  className="flex-[1.5] py-3 rounded-xl text-white font-bold shadow-lg flex items-center justify-center gap-2 transition-transform hover:scale-105 active:scale-95"
                  style={{ backgroundColor: THEME.ink }}
                >
                  Promote Now <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )} */}

      <div className="mx-auto max-w-md">
        {/* --- PREMIUM HEADER --- */}
        <header className="px-5 pt-6 pb-2 bg-[#F8F7F4]">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2">
                {isLocationLoading ? (
                  <SkeletonBox className="w-6 h-6 rounded-full" />
                ) : (
                  <span className="flex h-6 w-6 items-center justify-center rounded-full" style={{ backgroundColor: THEME.gold }}>
                    <MapPin size={12} className="text-white" />
                  </span>
                )}
                <span className="text-xs font-semibold text-slate-500">
                  Current Location
                </span>
              </div>

              <button className="mt-0.5 flex items-start gap-1 max-w-[250px] text-left" style={{ color: THEME.ink }}>
                {isLocationLoading ? (
                  <SkeletonText className="w-40 h-5" />
                ) : (
                  <>
                    <span className="text-base font-bold leading-tight whitespace-normal break-words">
                      {locationText}
                    </span>
                    <ChevronDown size={16} className="text-slate-400 flex-shrink-0 mt-1" />
                  </>
                )}
              </button>
            </div>
            <div className="flex items-center gap-3 flex-shrink-0">
              {isLocationLoading ? (
                <>
                  <SkeletonBox className="w-11 h-11 rounded-full" />
                  <SkeletonBox className="w-11 h-11 rounded-full" />
                </>
              ) : (
                <>
              
                  <img src="https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=100&q=80" alt="Profile" className="h-11 w-11 rounded-full object-cover border-2 border-white shadow-md shadow-slate-200" />
                </>
              )}
            </div>
          </div>

          {isLocationLoading ? (
            <div className="mt-5 space-y-2">
              <SkeletonText className="w-48 h-8" />
              <SkeletonText className="w-64 h-4" />
            </div>
          ) : (
            <>
              <h1 className="mt-5 text-2xl font-extrabold" style={{ color: THEME.ink }}>
                Hi, Sumit <span className="inline-block animate-bounce">👋</span>
              </h1>
              <p className="mt-0.5 text-sm text-slate-500 font-medium">
                Discover amazing deals near you
              </p>
            </>
          )}
        </header>

        {/* --- MODERN SEARCH BAR --- */}
        <div className="mt-3 flex items-center gap-3 px-5">
          {isLocationLoading ? (
            <SkeletonBox className="flex-1 h-[52px] rounded-2xl" />
          ) : (
            <div className="flex flex-1 items-center gap-2 rounded-2xl bg-white px-4 py-3.5 shadow-lg shadow-slate-200/60 ring-1 ring-slate-100">
              <Search size={18} className="text-slate-400" />
              <input
                type="text"
                placeholder="Search products, shops..."
                className="flex-1 bg-transparent text-[14px] text-slate-700 outline-none placeholder:text-slate-400"
              />
            </div>
          )}
          {isLocationLoading ? (
            <SkeletonBox className="w-[54px] h-[54px] rounded-2xl" />
          ) : (
            <button className="flex h-[54px] w-[54px] flex-shrink-0 items-center justify-center rounded-2xl text-white shadow-lg transition-transform hover:scale-105 active:scale-95" style={{ backgroundColor: THEME.ink }} onClick={() => navigate("/scan-qr")}>
              <QrCode size={22} />
            </button>
          )}
        </div>

        {/* --- FLAT CATEGORY PILLS --- */}
        <div className="mt-5 flex gap-2 overflow-x-auto px-5 pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {isPageLoading ? (
            <>
              <SkeletonBox className="w-20 h-9 rounded-full" />
              <SkeletonBox className="w-20 h-9 rounded-full" />
              <SkeletonBox className="w-20 h-9 rounded-full" />
              <SkeletonBox className="w-20 h-9 rounded-full" />
            </>
          ) : (
            CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex flex-shrink-0 items-center gap-1.5 rounded-full px-4 py-2.5 text-[13px] font-bold transition-all ${isActive ? "text-white shadow-md" : "bg-white text-slate-600 shadow-sm ring-1 ring-slate-100"}`}
                  style={{ backgroundColor: isActive ? THEME.ink : "white" }}
                >
                  <Icon size={14} />
                  {cat.label}
                </button>
              );
            })
          )}
        </div>

        {/* --- HERO BANNER --- */}
        {isPageLoading ? (
          <SkeletonBox className="mx-5 mt-5 h-[200px] rounded-3xl" />
        ) : (
          <div className="mx-5 mt-5 overflow-hidden rounded-3xl relative shadow-2xl min-h-[200px]" style={{ backgroundImage: `linear-gradient(to right, rgba(15, 22, 56, 0.95) 0%, rgba(15, 22, 56, 0.6) 50%, rgba(15, 22, 56, 0.2) 100%), url('https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&q=80')`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <div className="relative z-10 p-6 py-10 flex flex-col gap-4">
              <div className="self-start flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-md px-4 py-1.5 border border-white/20 shadow-lg">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[11px] font-bold text-white tracking-wide">LIVE AUCTIONS</span>
              </div>
              <div>
                <h2 className="text-3xl font-black text-white leading-tight">Bid. Win. <span style={{ color: THEME.gold }}>Repeat.</span></h2>
                <p className="mt-1 text-sm text-white/80 font-medium max-w-[80%]">Discover exclusive items from verified local sellers near you.</p>
              </div>
              <div className="flex flex-wrap items-center gap-3 mt-2">
                <Link to="/all-auctions" className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-extrabold shadow-lg transition-transform hover:scale-105 active:scale-95" style={{ color: THEME.ink }}>Explore Now <ChevronRight size={18} /></Link>
                <div className="flex items-center gap-1.5 text-[11px] text-white/80 font-medium bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                  <ShieldCheck size={14} className="text-emerald-400" /> Secure Bidding
                </div>
              </div>
              <div className="absolute bottom-6 right-6 w-24 h-1 rounded-full bg-gradient-to-r from-transparent to-[#D9A441]/50 opacity-50"></div>
              <div className="absolute top-6 right-6 w-32 h-32 bg-[#D9A441]/5 rounded-full blur-2xl"></div>
            </div>
          </div>
        )}

        {/* --- FOCUS SCROLL: LIVE AUCTIONS --- */}
        <section className="mt-7">
          <div className="flex items-center justify-between px-5 mb-2">
            {isPageLoading ? (
              <>
                <SkeletonText className="w-32 h-6" />
                <SkeletonText className="w-16 h-4" />
              </>
            ) : (
              <>
                <h3 className="flex items-center gap-2 text-[17px] font-extrabold" style={{ color: THEME.ink }}>
                  <Zap size={18} style={{ color: THEME.gold }} /> Live Auctions
                </h3>
                <Link to="/all-auctions" className="flex items-center gap-0.5 text-[13px] font-bold" style={{ color: THEME.gold }}>See All <ChevronRight size={15} /></Link>
              </>
            )}
          </div>

          <div ref={scrollRef} className="flex gap-4 overflow-x-auto px-5 pb-6 snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {isPageLoading ? (
              <>
                <SkeletonBox className="w-[80%] h-72 flex-shrink-0 rounded-3xl" />
                <SkeletonBox className="w-[80%] h-72 flex-shrink-0 rounded-3xl" />
                <SkeletonBox className="w-[80%] h-72 flex-shrink-0 rounded-3xl" />
              </>
            ) : (
              AUCTIONS.map((item) => (
                <Link to={`/auction/${item.id}`} key={item.id} className="w-[80%] flex-shrink-0 snap-center">
                  <div className="relative h-72 w-full overflow-hidden rounded-3xl bg-white shadow-xl shadow-slate-200/70 ring-1 ring-slate-100/50 transition-transform hover:scale-[1.01]">
                    <div className="relative h-44 w-full overflow-hidden bg-slate-100">
                      <img src={item.image} alt={item.title} className="h-full w-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                      <div className="absolute top-3 left-3 flex items-center gap-2">
                        <span className="rounded-lg bg-red-500 px-2.5 py-1 text-[10px] font-bold text-white shadow-lg shadow-red-500/30">LIVE</span>
                        <span className="flex items-center gap-1 rounded-lg bg-black/60 backdrop-blur-md px-2.5 py-1 text-[10px] font-medium text-white"><Clock size={12} /> {item.timeLeft}</span>
                      </div>
                      {/* <button className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 backdrop-blur-md shadow-md hover:bg-white transition-colors"><Heart size={15} className="text-slate-600" /></button> */}
                      <div className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full bg-black/60 backdrop-blur-md px-3 py-1 text-white text-[10px]"><Users size={12} /> {item.watching} watching</div>
                    </div>
                    <div className="p-4 flex flex-col h-[112px] justify-between">
                      <div>
                        <div className="flex items-center justify-between">
                          <p className="text-[15px] font-bold truncate" style={{ color: THEME.ink }}>{item.title}</p>
                        </div>
                        <p className="flex items-center gap-1 text-[11px] text-slate-400 mt-0.5"><MapPin size={11} /> {item.location} • {item.distance}</p>
                      </div>
                      <div className="flex items-end justify-between border-t border-slate-100 pt-3">
                        <div>
                          <p className="text-[10px] text-slate-400 font-medium">Current Bid</p>
                          <p className="text-[17px] font-extrabold" style={{ color: THEME.ink }}>₹{item.bid}</p>
                        </div>
                        <button className="rounded-xl px-4 py-1.5 text-[12px] font-bold text-white shadow-md transition-transform hover:scale-105 active:scale-95" style={{ backgroundColor: THEME.ink }}>Place Bid</button>
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
        </section>

        {/* --- FOCUS SCROLL: SHOPS NEAR YOU --- */}
        <section className="mt-2">
          <div className="flex items-center justify-between px-5 mb-2">
            {isPageLoading ? (
              <>
                <SkeletonText className="w-28 h-6" />
                <SkeletonText className="w-16 h-4" />
              </>
            ) : (
              <>
                <h3 className="flex items-center gap-2 text-[17px] font-extrabold" style={{ color: THEME.ink }}>
                  <Store size={18} style={{ color: THEME.gold }} /> Top Shops
                </h3>
                <Link to="/explore" className="flex items-center gap-0.5 text-[13px] font-bold" style={{ color: THEME.gold }}>See All <ChevronRight size={15} /></Link>
              </>
            )}
          </div>

          <div className="flex gap-4 overflow-x-auto px-5 pb-6 snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {isPageLoading ? (
              <>
                <SkeletonBox className="w-[65%] h-48 flex-shrink-0 rounded-2xl" />
                <SkeletonBox className="w-[65%] h-48 flex-shrink-0 rounded-2xl" />
              </>
            ) : (
              SHOPS.map((shop) => (
                <div key={shop.id} className="w-[65%] flex-shrink-0 snap-center cursor-pointer" onClick={() => navigate(`/shop/${shop.id}`)}>
                  <div className="relative h-48 w-full overflow-hidden rounded-2xl bg-white shadow-lg shadow-slate-200/70 ring-1 ring-slate-100/50">
                    <img src={shop.image} alt={shop.name} className="h-full w-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                    <div className="absolute bottom-3 left-3 right-3">
                      <div className="flex items-center gap-1.5">
                        <h4 className="text-[15px] font-bold text-white truncate flex-1">{shop.name}</h4>
                        <div className="flex items-center gap-1 bg-white/20 backdrop-blur-sm px-2 py-0.5 rounded-full"><StarIcon size={10} className="fill-amber-400 text-amber-400" /><span className="text-[10px] font-bold text-white">{shop.rating}</span></div>
                      </div>
                      <p className="text-[11px] text-white/80 mt-0.5">{shop.type} • {shop.distance} away</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        {/* --- NEW SECTION 1: BEST DEALS IN YOUR AREA --- */}
        <section className="mt-6">
          <div className="flex items-center justify-between px-5 mb-2">
            {isPageLoading ? (
              <>
                <SkeletonText className="w-36 h-6" />
                <SkeletonText className="w-16 h-4" />
              </>
            ) : (
              <>
                <h3 className="flex items-center gap-2 text-[17px] font-extrabold" style={{ color: THEME.ink }}>
                  <Flame size={18} style={{ color: THEME.gold }} /> Best Deals In Your Area
                </h3>
                <Link to="/explore" className="flex items-center gap-0.5 text-[13px] font-bold" style={{ color: THEME.gold }}>View All <ChevronRight size={15} /></Link>
              </>
            )}
          </div>

          <div className="flex gap-3 overflow-x-auto px-5 pb-2 snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {isPageLoading ? (
              <>
                <SkeletonBox className="w-40 h-56 flex-shrink-0 rounded-2xl" />
                <SkeletonBox className="w-40 h-56 flex-shrink-0 rounded-2xl" />
              </>
            ) : (
              BEST_DEALS.map((deal) => (
                <div key={deal.id} className="w-40 flex-shrink-0 snap-center">
                  <div className="bg-white rounded-2xl overflow-hidden shadow-md shadow-slate-200/70 ring-1 ring-slate-100/50">
                    <div className="relative h-36 w-full">
                      <img src={deal.image} alt={deal.name} className="w-full h-full object-cover" />
                      <span className="absolute bottom-2 right-2 bg-black/60 backdrop-blur-sm text-white text-[9px] px-2 py-0.5 rounded-full">{deal.shop}</span>
                    </div>
                    <div className="p-3">
                      <p className="text-[13px] font-bold text-[#0F1638] truncate">{deal.name}</p>
                      <p className="text-[14px] font-extrabold text-[#D9A441] mt-0.5">{deal.price}</p>
                      <button onClick={() => navigate(`/shop/${deal.id}`)} className="w-full mt-2 py-1.5 rounded-lg text-[10px] font-bold text-white shadow-sm transition-colors hover:opacity-90" style={{ backgroundColor: THEME.ink }}>View Shop</button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        {/* --- NEW SECTION 2: COUPONS & OFFERS --- */}
        <section className="mt-6 px-5">
          <div className="flex items-center gap-2 text-[17px] font-extrabold mb-3" style={{ color: THEME.ink }}>
            {isPageLoading ? <SkeletonText className="w-40 h-6" /> : <><Gift size={18} className="text-[#D9A441]" /> Exclusive Coupons</>}
          </div>
          <div className="space-y-3">
            {isPageLoading ? (
              <>
                <SkeletonBox className="w-full h-20 rounded-2xl" />
                <SkeletonBox className="w-full h-20 rounded-2xl" />
                <SkeletonBox className="w-full h-20 rounded-2xl" />
              </>
            ) : (
              COUPONS.map((coupon) => {
                const Icon = coupon.icon;
                return (
                  <div key={coupon.id} className="relative overflow-hidden rounded-2xl p-4 text-white shadow-lg" style={{ backgroundColor: coupon.color }}>
                    <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-12 -mt-12"></div>
                    <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/10 rounded-full -ml-8 -mb-8"></div>
                    <div className="relative z-10 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-white/20 rounded-full"><Icon size={20} /></div>
                        <div><p className="text-[11px] opacity-90">Use Code</p><p className="text-lg font-extrabold tracking-wider">{coupon.code}</p><p className="text-[11px] opacity-90 mt-0.5">{coupon.desc}</p></div>
                      </div>
                      <button className="bg-white/20 px-4 py-1.5 rounded-full text-xs font-semibold hover:bg-white/30 transition-colors">Copy</button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </section>

        {/* --- NEW SECTION 3: ENDING SOON BIDS --- */}
        <section className="mt-6">
          <div className="flex items-center justify-between px-5 mb-2">
            {isPageLoading ? (
              <>
                <SkeletonText className="w-28 h-6" />
                <SkeletonText className="w-16 h-4" />
              </>
            ) : (
              <>
                <h3 className="flex items-center gap-2 text-[17px] font-extrabold" style={{ color: THEME.ink }}>
                  <Timer size={18} style={{ color: THEME.gold }} /> Ending Soon
                </h3>
                <Link to="/all-auctions" className="flex items-center gap-0.5 text-[13px] font-bold" style={{ color: THEME.gold }}>View All <ChevronRight size={15} /></Link>
              </>
            )}
          </div>

          <div className="flex gap-3 overflow-x-auto px-5 pb-6 snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {isPageLoading ? (
              <>
                <SkeletonBox className="w-[80%] h-56 flex-shrink-0 rounded-2xl" />
                <SkeletonBox className="w-[80%] h-56 flex-shrink-0 rounded-2xl" />
              </>
            ) : (
              ENDING_SOON.map((item) => (
                <Link to={`/auction/${item.id}`} key={item.id} className="w-[80%] flex-shrink-0 snap-center">
                  <div className="relative h-56 w-full overflow-hidden rounded-2xl bg-white shadow-lg shadow-slate-200/70 ring-1 ring-slate-100/50">
                    <div className="h-32 w-full bg-slate-100"><img src={item.image} alt={item.title} className="w-full h-full object-cover" /></div>
                    <div className="absolute top-2 right-2 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-md flex items-center gap-1"><Clock size={12} /> {item.timeLeft}</div>
                    <div className="p-3">
                      <p className="text-[14px] font-bold text-[#0F1638]">{item.title}</p>
                      <div className="flex items-center justify-between mt-1"><p className="text-[14px] font-extrabold text-[#D9A441]">{item.price}</p><p className="text-[10px] text-slate-500">{item.bids} bids</p></div>
                      <button className="w-full mt-2 py-1.5 rounded-lg text-[10px] font-bold text-white shadow-sm transition-colors hover:opacity-90" style={{ backgroundColor: THEME.ink }}>Place Bid</button>
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
        </section>

        {/* --- CLEAN COMMUNITY BANNER --- */}
        <div className="mx-5 mt-2 mb-6 flex items-center gap-4 rounded-3xl bg-white p-4 shadow-lg shadow-slate-200/70 ring-1 ring-slate-100/50">
          {isPageLoading ? (
            <SkeletonBox className="w-full h-24 rounded-3xl" />
          ) : (
            <>
              <div className="relative flex h-14 w-20 flex-shrink-0 items-center">
                <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80" className="absolute left-0 h-12 w-12 rounded-full object-cover ring-2 ring-white shadow-md" alt="" />
                <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80" className="absolute left-6 h-12 w-12 rounded-full object-cover ring-2 ring-white shadow-md" alt="" />
                <img src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&q=80" className="absolute left-12 h-12 w-12 rounded-full object-cover ring-2 ring-white shadow-md" alt="" />
                <span className="absolute -bottom-1 left-6 rounded-full border-2 border-white px-2 py-0.5 text-[9px] font-bold text-white shadow-md" style={{ backgroundColor: THEME.gold }}>1.2K+</span>
              </div>
              <div className="flex-1">
                <p className="text-[15px] font-extrabold" style={{ color: THEME.ink }}>Join Local Communities</p>
                <p className="mt-0.5 text-[11px] text-slate-500 font-medium">Connect & get the best local deals.</p>
                <Link to="/community" className="mt-2 inline-flex items-center gap-1 rounded-lg px-3 py-1.5 text-[11px] font-bold text-white shadow-md transition-transform hover:scale-105 active:scale-95" style={{ backgroundColor: THEME.ink }}>Join Now <ChevronRight size={13} /></Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}