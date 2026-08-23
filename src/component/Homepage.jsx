import {
  ArrowRight,
  ChevronDown,
  ChevronRight,
  Clock,
  CreditCard,
  Gift,
  LayoutGrid,
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
  Zap,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

/**
 * DESIGN SYSTEM — "The Ledger"
 * A quiet, editorial auction-house identity: navy authority, brass accents,
 * a serif catalog numeral for every price, hairline rules instead of heavy
 * cards. Built so the eye reads this as a bidding room, not a storefront.
 */
const THEME = {
  ink: "#0F1638", // primary — authority, headers, CTAs
  inkSoft: "#3B4374", // secondary text on dark
  brass: "#B4893C", // muted antique gold — the accent, used sparingly
  brassSoft: "#F3E7CC", // brass tint for backgrounds/badges
  crimson: "#9E3B44", // live/urgency — never candy-red
  crimsonSoft: "#F5E4E1",
  cream: "#FAF8F3", // page background
  line: "#E7E2D6", // hairline divider
  slate: "#6B7280",
};

const FONT_DISPLAY =
  "'Fraunces', 'Iowan Old Style', 'Georgia', serif";
const FONT_BODY =
  "'Inter', -apple-system, 'Segoe UI', sans-serif";

const CATEGORIES = [
  { id: "all", label: "All Lots", icon: LayoutGrid },
  { id: "live", label: "Live", icon: Radio },
  { id: "shops", label: "Sellers", icon: Store },
  { id: "community", label: "Community", icon: Users },
  { id: "buy", label: "Buy Now", icon: ShoppingBag },
  { id: "top", label: "Top Picks", icon: StarIcon },
];

const AUCTIONS = [
  {
    id: 1,
    lot: "001",
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
    lot: "002",
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
    lot: "003",
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
    lot: "004",
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
    lot: "005",
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

const COUPONS = [
  {
    id: 1,
    code: "PHONEPAY20",
    desc: "20% off your buyer's premium via PhonePe",
    icon: Smartphone,
  },
  {
    id: 2,
    code: "SAVE100",
    desc: "₹100 off on winning bids above ₹500",
    icon: CreditCard,
  },
  {
    id: 3,
    code: "DEAL50",
    desc: "Flat ₹50 off your next placed bid",
    icon: Tag,
  },
];

const ENDING_SOON = [
  {
    id: 1,
    lot: "E01",
    title: "Vintage Camera",
    price: "1,200",
    image:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&q=80",
    bids: 5,
    timeLeft: "10m",
  },
  {
    id: 2,
    lot: "E02",
    title: "Sony Headphones",
    price: "2,500",
    image:
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=400&q=80",
    bids: 8,
    timeLeft: "25m",
  },
  {
    id: 3,
    lot: "E03",
    title: "Gaming Mouse",
    price: "800",
    image:
      "https://images.unsplash.com/photo-1527814050087-3793815479db?w=400&q=80",
    bids: 3,
    timeLeft: "45m",
  },
];

// --- SKELETON LOADER COMPONENTS ---
const Shimmer = () => (
  <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/25 to-transparent" />
);

const SkeletonBox = ({ className }) => (
  <div className={`relative overflow-hidden bg-[#EAE6DA] rounded-xl ${className}`}>
    <Shimmer />
  </div>
);

const SkeletonText = ({ className }) => (
  <div className={`relative overflow-hidden bg-[#EAE6DA] rounded-full ${className}`}>
    <Shimmer />
  </div>
);

// Small reusable "LIVE" indicator — a quiet pulse, not a loud pill
const LivePulse = ({ label = "LIVE" }) => (
  <span
    className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold tracking-wide text-white"
    style={{ backgroundColor: THEME.crimson }}
  >
    <span className="relative flex h-1.5 w-1.5">
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white/70" />
      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-white" />
    </span>
    {label}
  </span>
);

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const navigate = useNavigate();
  const scrollRef = useRef(null);

  const [locationText, setLocationText] = useState("Getting location...");
  const [isLocationLoading, setIsLocationLoading] = useState(true);
  const [userCoords, setUserCoords] = useState(null);
  const [isPageLoading, setIsPageLoading] = useState(true);

  useEffect(() => {
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
            setLocationText(fullAddressParts.join(", "));
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
    <div
      className="min-h-screen pb-24 relative"
      style={{ backgroundColor: THEME.cream, fontFamily: FONT_BODY }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700;800&display=swap');
      `}</style>

      <div className="mx-auto max-w-md">
        {/* --- HEADER --- */}
        <header className="px-5 pt-6 pb-2">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2">
                {isLocationLoading ? (
                  <SkeletonBox className="w-5 h-5 rounded-full" />
                ) : (
                  <MapPin size={13} style={{ color: THEME.brass }} />
                )}
                <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                  Bidding From
                </span>
              </div>

              <button className="mt-1 flex items-start gap-1 max-w-[250px] text-left">
                {isLocationLoading ? (
                  <SkeletonText className="w-40 h-5" />
                ) : (
                  <>
                    <span
                      className="text-[15px] font-semibold leading-tight whitespace-normal break-words"
                      style={{ color: THEME.ink }}
                    >
                      {locationText}
                    </span>
                    <ChevronDown size={15} className="text-slate-400 flex-shrink-0 mt-0.5" />
                  </>
                )}
              </button>
            </div>
            <div className="flex items-center gap-3 flex-shrink-0">
              {isLocationLoading ? (
                <SkeletonBox className="w-11 h-11 rounded-full" />
              ) : (
                <img
                  src="https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=100&q=80"
                  alt="Profile"
                  className="h-11 w-11 rounded-full object-cover ring-1 ring-[#E7E2D6]"
                />
              )}
            </div>
          </div>

          {isLocationLoading ? (
            <div className="mt-5 space-y-2">
              <SkeletonText className="w-52 h-8" />
              <SkeletonText className="w-64 h-4" />
            </div>
          ) : (
            <>
              <h1
                className="mt-4 text-[26px] font-semibold leading-tight"
                style={{ color: THEME.ink, fontFamily: FONT_DISPLAY }}
              >
                Good to see you, Sumit
              </h1>
              <p className="mt-1 text-[13px] text-slate-500">
                12 lots closing near you today
              </p>
            </>
          )}
        </header>

        {/* --- SEARCH BAR --- */}
        <div className="mt-4 flex items-center gap-3 px-5">
          {isLocationLoading ? (
            <SkeletonBox className="flex-1 h-[50px] rounded-xl" />
          ) : (
            <div
              className="flex flex-1 items-center gap-2 rounded-xl bg-white px-4 py-3.5 ring-1"
              style={{ borderColor: THEME.line, boxShadow: "0 1px 2px rgba(15,22,56,0.04)" }}
            >
              <Search size={17} className="text-slate-400" />
              <input
                type="text"
                placeholder="Search lots, sellers, categories..."
                className="flex-1 bg-transparent text-[14px] text-slate-700 outline-none placeholder:text-slate-400"
              />
            </div>
          )}
          {isLocationLoading ? (
            <SkeletonBox className="w-[52px] h-[52px] rounded-xl" />
          ) : (
            <button
              className="flex h-[52px] w-[52px] flex-shrink-0 items-center justify-center rounded-xl text-white transition-transform hover:scale-105 active:scale-95"
              style={{ backgroundColor: THEME.ink }}
              onClick={() => navigate("/scan-qr")}
            >
              <QrCode size={21} />
            </button>
          )}
        </div>

        {/* --- CATEGORY PILLS --- */}
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
                  className="flex flex-shrink-0 items-center gap-1.5 rounded-full px-4 py-2.5 text-[13px] font-semibold transition-all"
                  style={
                    isActive
                      ? { backgroundColor: THEME.ink, color: "white" }
                      : { backgroundColor: "white", color: THEME.inkSoft, boxShadow: `inset 0 0 0 1px ${THEME.line}` }
                  }
                >
                  <Icon size={14} />
                  {cat.label}
                </button>
              );
            })
          )}
        </div>

        {/* --- HERO: THE BIDDING ROOM --- */}
        {isPageLoading ? (
          <SkeletonBox className="mx-5 mt-5 h-[220px] rounded-2xl" />
        ) : (
          <div
            className="mx-5 mt-5 overflow-hidden rounded-2xl relative min-h-[220px]"
            style={{ backgroundColor: THEME.ink }}
          >
            {/* Fine gold hairline frame — catalog cover motif */}
            <div className="absolute inset-3 rounded-xl border border-white/10 pointer-events-none" />
            <div className="relative z-10 p-6 flex flex-col gap-5">
              <div className="flex items-center justify-between">
                <LivePulse label="AUCTION ROOM OPEN" />
                <span
                  className="text-[10px] font-semibold uppercase tracking-widest text-white/50"
                  style={{ fontFamily: FONT_DISPLAY }}
                >
                  Nashik Chapter
                </span>
              </div>

              <div>
                <h2
                  className="text-[30px] leading-[1.1] font-semibold text-white"
                  style={{ fontFamily: FONT_DISPLAY }}
                >
                  Place your bid.
                  <br />
                  <span style={{ color: THEME.brass }}>Take the lot.</span>
                </h2>
                <p className="mt-2 text-[13px] text-white/70 max-w-[85%]">
                  Verified local sellers, transparent bidding, real-time close.
                </p>
              </div>

              <div className="flex items-center gap-5 pt-1">
                <div>
                  <p className="text-[17px] font-semibold text-white" style={{ fontFamily: FONT_DISPLAY }}>128</p>
                  <p className="text-[10px] text-white/50 uppercase tracking-wide">Live lots</p>
                </div>
                <div className="h-8 w-px bg-white/10" />
                <div>
                  <p className="text-[17px] font-semibold text-white" style={{ fontFamily: FONT_DISPLAY }}>2.4K</p>
                  <p className="text-[10px] text-white/50 uppercase tracking-wide">Active bidders</p>
                </div>
                <div className="h-8 w-px bg-white/10" />
                <div className="flex items-center gap-1">
                  <ShieldCheck size={13} style={{ color: THEME.brass }} />
                  <p className="text-[10px] text-white/70">Secure escrow</p>
                </div>
              </div>

              <Link
                to="/all-auctions"
                className="mt-1 inline-flex w-fit items-center gap-2 rounded-lg px-5 py-2.5 text-[13px] font-semibold transition-transform hover:scale-[1.02] active:scale-95"
                style={{ backgroundColor: THEME.brass, color: THEME.ink }}
              >
                Browse the room <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        )}

        {/* --- LIVE AUCTIONS (LOT CARDS) --- */}
        <section className="mt-8">
          <div className="flex items-center justify-between px-5 mb-3">
            {isPageLoading ? (
              <>
                <SkeletonText className="w-32 h-6" />
                <SkeletonText className="w-16 h-4" />
              </>
            ) : (
              <>
                <h3
                  className="flex items-center gap-2 text-[16px] font-semibold"
                  style={{ color: THEME.ink, fontFamily: FONT_DISPLAY }}
                >
                  <Zap size={16} style={{ color: THEME.brass }} /> Live Auctions
                </h3>
                <Link
                  to="/all-auctions"
                  className="flex items-center gap-0.5 text-[12px] font-semibold uppercase tracking-wide"
                  style={{ color: THEME.brass }}
                >
                  See All <ChevronRight size={14} />
                </Link>
              </>
            )}
          </div>

          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto px-5 pb-6 snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {isPageLoading ? (
              <>
                <SkeletonBox className="w-[78%] h-72 flex-shrink-0 rounded-2xl" />
                <SkeletonBox className="w-[78%] h-72 flex-shrink-0 rounded-2xl" />
                <SkeletonBox className="w-[78%] h-72 flex-shrink-0 rounded-2xl" />
              </>
            ) : (
              AUCTIONS.map((item) => (
                <Link to={`/auction/${item.id}`} key={item.id} className="w-[78%] flex-shrink-0 snap-center">
                  <div
                    className="h-72 w-full overflow-hidden rounded-2xl bg-white transition-transform hover:scale-[1.01]"
                    style={{ boxShadow: "0 1px 2px rgba(15,22,56,0.04)", border: `1px solid ${THEME.line}` }}
                  >
                    <div className="relative h-40 w-full overflow-hidden bg-slate-100">
                      <img src={item.image} alt={item.title} className="h-full w-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
                      <div className="absolute top-3 left-3">
                        <LivePulse />
                      </div>
                      <div className="absolute top-3 right-3 flex items-center gap-1 rounded-full bg-black/55 backdrop-blur-md px-2.5 py-1 text-[10px] font-medium text-white">
                        <Clock size={11} /> {item.timeLeft}
                      </div>
                      <div className="absolute bottom-3 right-3 flex items-center gap-1 rounded-full bg-black/55 backdrop-blur-md px-2.5 py-1 text-[10px] text-white">
                        <Users size={11} /> {item.watching}
                      </div>
                    </div>
                    <div className="p-4 flex flex-col h-[128px] justify-between">
                      <div>
                        <div className="flex items-center justify-between">
                          <span
                            className="text-[10px] font-semibold uppercase tracking-widest"
                            style={{ color: THEME.brass }}
                          >
                            Lot {item.lot}
                          </span>
                          <span className="flex items-center gap-1 text-[10px] text-slate-400">
                            <TrendingUp size={11} /> {item.bids} bids
                          </span>
                        </div>
                        <p className="text-[15px] font-semibold truncate mt-0.5" style={{ color: THEME.ink }}>
                          {item.title}
                        </p>
                        <p className="flex items-center gap-1 text-[11px] text-slate-400 mt-0.5">
                          <MapPin size={11} /> {item.location} • {item.distance}
                        </p>
                      </div>
                      <div className="flex items-end justify-between pt-3" style={{ borderTop: `1px solid ${THEME.line}` }}>
                        <div>
                          <p className="text-[10px] text-slate-400">Current Bid</p>
                          <p className="text-[19px] font-semibold" style={{ color: THEME.ink, fontFamily: FONT_DISPLAY }}>
                            ₹{item.bid}
                          </p>
                        </div>
                        <button
                          className="rounded-lg px-4 py-2 text-[12px] font-semibold text-white transition-transform hover:scale-105 active:scale-95"
                          style={{ backgroundColor: THEME.ink }}
                        >
                          Place Bid
                        </button>
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
        </section>

        {/* --- VERIFIED SELLERS --- */}
        <section className="mt-2">
          <div className="flex items-center justify-between px-5 mb-3">
            {isPageLoading ? (
              <>
                <SkeletonText className="w-28 h-6" />
                <SkeletonText className="w-16 h-4" />
              </>
            ) : (
              <>
                <h3
                  className="flex items-center gap-2 text-[16px] font-semibold"
                  style={{ color: THEME.ink, fontFamily: FONT_DISPLAY }}
                >
                  <Store size={16} style={{ color: THEME.brass }} /> Verified Sellers
                </h3>
                <Link
                  to="/explore"
                  className="flex items-center gap-0.5 text-[12px] font-semibold uppercase tracking-wide"
                  style={{ color: THEME.brass }}
                >
                  See All <ChevronRight size={14} />
                </Link>
              </>
            )}
          </div>

          <div className="flex gap-4 overflow-x-auto px-5 pb-6 snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {isPageLoading ? (
              <>
                <SkeletonBox className="w-[64%] h-44 flex-shrink-0 rounded-xl" />
                <SkeletonBox className="w-[64%] h-44 flex-shrink-0 rounded-xl" />
              </>
            ) : (
              SHOPS.map((shop) => (
                <div
                  key={shop.id}
                  className="w-[64%] flex-shrink-0 snap-center cursor-pointer"
                  onClick={() => navigate(`/shop/${shop.id}`)}
                >
                  <div
                    className="relative h-44 w-full overflow-hidden rounded-xl bg-white"
                    style={{ border: `1px solid ${THEME.line}` }}
                  >
                    <img src={shop.image} alt={shop.name} className="h-full w-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />
                    <div className="absolute top-3 left-3 flex items-center gap-1 rounded-full bg-white/90 px-2 py-1 text-[9px] font-semibold" style={{ color: THEME.ink }}>
                      <ShieldCheck size={11} style={{ color: THEME.brass }} /> Verified
                    </div>
                    <div className="absolute bottom-3 left-3 right-3">
                      <div className="flex items-center gap-1.5">
                        <h4 className="text-[14px] font-semibold text-white truncate flex-1">{shop.name}</h4>
                        <div className="flex items-center gap-1 bg-white/15 backdrop-blur-sm px-2 py-0.5 rounded-full">
                          <StarIcon size={10} className="fill-amber-400 text-amber-400" />
                          <span className="text-[10px] font-semibold text-white">{shop.rating}</span>
                        </div>
                      </div>
                      <p className="text-[11px] text-white/75 mt-0.5">{shop.type} • {shop.distance} away</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        {/* --- EXCLUSIVE COUPONS --- */}
        <section className="mt-6 px-5">
          <div
            className="flex items-center gap-2 text-[16px] font-semibold mb-3"
            style={{ color: THEME.ink, fontFamily: FONT_DISPLAY }}
          >
            {isPageLoading ? <SkeletonText className="w-40 h-6" /> : <><Gift size={16} style={{ color: THEME.brass }} /> Exclusive Coupons</>}
          </div>
          <div className="space-y-3">
            {isPageLoading ? (
              <>
                <SkeletonBox className="w-full h-[72px] rounded-xl" />
                <SkeletonBox className="w-full h-[72px] rounded-xl" />
                <SkeletonBox className="w-full h-[72px] rounded-xl" />
              </>
            ) : (
              COUPONS.map((coupon) => {
                const Icon = coupon.icon;
                return (
                  <div
                    key={coupon.id}
                    className="flex items-center justify-between rounded-xl p-4 bg-white"
                    style={{ border: `1px solid ${THEME.line}` }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-full" style={{ backgroundColor: THEME.brassSoft }}>
                        <Icon size={17} style={{ color: THEME.brass }} />
                      </div>
                      <div>
                        <p className="text-[10px] text-slate-400 uppercase tracking-wide">Use Code</p>
                        <p className="text-[15px] font-semibold tracking-wide" style={{ color: THEME.ink, fontFamily: FONT_DISPLAY }}>
                          {coupon.code}
                        </p>
                        <p className="text-[11px] text-slate-500 mt-0.5 max-w-[200px]">{coupon.desc}</p>
                      </div>
                    </div>
                    <button
                      className="px-3.5 py-1.5 rounded-full text-[11px] font-semibold transition-colors"
                      style={{ backgroundColor: THEME.ink, color: "white" }}
                    >
                      Copy
                    </button>
                  </div>
                );
              })
            )}
          </div>
        </section>

        {/* --- ENDING SOON --- */}
        <section className="mt-8">
          <div className="flex items-center justify-between px-5 mb-3">
            {isPageLoading ? (
              <>
                <SkeletonText className="w-28 h-6" />
                <SkeletonText className="w-16 h-4" />
              </>
            ) : (
              <>
                <h3
                  className="flex items-center gap-2 text-[16px] font-semibold"
                  style={{ color: THEME.ink, fontFamily: FONT_DISPLAY }}
                >
                  <Timer size={16} style={{ color: THEME.crimson }} /> Ending Soon
                </h3>
                <Link
                  to="/all-auctions"
                  className="flex items-center gap-0.5 text-[12px] font-semibold uppercase tracking-wide"
                  style={{ color: THEME.brass }}
                >
                  See All <ChevronRight size={14} />
                </Link>
              </>
            )}
          </div>

          <div className="flex gap-3 overflow-x-auto px-5 pb-6 snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {isPageLoading ? (
              <>
                <SkeletonBox className="w-[76%] h-56 flex-shrink-0 rounded-xl" />
                <SkeletonBox className="w-[76%] h-56 flex-shrink-0 rounded-xl" />
              </>
            ) : (
              ENDING_SOON.map((item) => (
                <Link to={`/auction/${item.id}`} key={item.id} className="w-[76%] flex-shrink-0 snap-center">
                  <div
                    className="relative h-56 w-full overflow-hidden rounded-xl bg-white"
                    style={{ border: `1px solid ${THEME.line}` }}
                  >
                    <div className="h-32 w-full bg-slate-100 relative">
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                      <div
                        className="absolute top-2 right-2 text-white text-[10px] font-semibold px-2 py-1 rounded-full flex items-center gap-1"
                        style={{ backgroundColor: THEME.crimson }}
                      >
                        <Clock size={11} /> {item.timeLeft}
                      </div>
                      <span
                        className="absolute top-2 left-2 rounded-full bg-white/90 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wide"
                        style={{ color: THEME.brass }}
                      >
                        Lot {item.lot}
                      </span>
                    </div>
                    <div className="p-3.5">
                      <p className="text-[13px] font-semibold" style={{ color: THEME.ink }}>{item.title}</p>
                      <div className="flex items-center justify-between mt-1.5">
                        <p className="text-[15px] font-semibold" style={{ color: THEME.ink, fontFamily: FONT_DISPLAY }}>
                          ₹{item.price}
                        </p>
                        <p className="text-[10px] text-slate-400">{item.bids} bids</p>
                      </div>
                      <button
                        className="w-full mt-2.5 py-2 rounded-lg text-[11px] font-semibold text-white transition-colors hover:opacity-90"
                        style={{ backgroundColor: THEME.crimson }}
                      >
                        Place Bid
                      </button>
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
        </section>

        {/* --- COMMUNITY BANNER --- */}
        <div
          className="mx-5 mt-2 mb-6 flex items-center gap-4 rounded-2xl bg-white p-4"
          style={{ border: `1px solid ${THEME.line}` }}
        >
          {isPageLoading ? (
            <SkeletonBox className="w-full h-24 rounded-2xl" />
          ) : (
            <>
              <div className="relative flex h-14 w-20 flex-shrink-0 items-center">
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80"
                  className="absolute left-0 h-12 w-12 rounded-full object-cover ring-2 ring-white"
                  alt=""
                />
                <img
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80"
                  className="absolute left-6 h-12 w-12 rounded-full object-cover ring-2 ring-white"
                  alt=""
                />
                <img
                  src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&q=80"
                  className="absolute left-12 h-12 w-12 rounded-full object-cover ring-2 ring-white"
                  alt=""
                />
                <span
                  className="absolute -bottom-1 left-6 rounded-full border-2 border-white px-2 py-0.5 text-[9px] font-semibold text-white"
                  style={{ backgroundColor: THEME.brass }}
                >
                  1.2K+
                </span>
              </div>
              <div className="flex-1">
                <p className="text-[14px] font-semibold" style={{ color: THEME.ink, fontFamily: FONT_DISPLAY }}>
                  Join the bidding community
                </p>
                <p className="mt-0.5 text-[11px] text-slate-500">Get lot alerts before they go live.</p>
                <Link
                  to="/community"
                  className="mt-2 inline-flex items-center gap-1 rounded-lg px-3 py-1.5 text-[11px] font-semibold text-white"
                  style={{ backgroundColor: THEME.ink }}
                >
                  Join Now <ChevronRight size={13} />
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}