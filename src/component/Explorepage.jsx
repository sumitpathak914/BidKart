import {
    Bike,
    CheckCircle2,
    ChevronDown,
    Heart,
    LocateFixed,
    MapPin,
    Monitor,
    Search,
    Shirt,
    SlidersHorizontal,
    Sofa,
    Star as StarIcon,
    Store
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const THEME = {
  ink: "#0F1638",
  gold: "#D9A441",
  goldSoft: "#FDF3E1",
  mapBg: "#E7ECFA",
};

// --- SKELETON LOADER COMPONENTS ---
const Shimmer = () => (
  <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
);

const SkeletonBox = ({ className }) => (
  <div
    className={`relative overflow-hidden bg-slate-200 rounded-xl ${className}`}
  >
    <Shimmer />
  </div>
);

const SkeletonText = ({ className }) => (
  <div
    className={`relative overflow-hidden bg-slate-200 rounded-full ${className}`}
  >
    <Shimmer />
  </div>
);

const FILTERS = [
  { id: "all", label: "All", icon: Store },
  { id: "electronics", label: "Electronics", icon: Monitor },
  { id: "fashion", label: "Fashion", icon: Shirt },
  { id: "home", label: "Home", icon: Sofa },
  { id: "cycles", label: "Cycles", icon: Bike },
];

const PINS = [
  { id: 1, name: "Electro World", distance: "0.8 km", top: "20%", left: "38%" },
  { id: 2, name: "Cycle Point", distance: "1.2 km", top: "18%", left: "78%" },
  { id: 3, name: "Fashion Hub", distance: "0.6 km", top: "34%", left: "10%" },
  { id: 4, name: "Home Style", distance: "0.7 km", top: "38%", left: "52%" },
  { id: 5, name: "Gadget Zone", distance: "1.0 km", top: "52%", left: "82%" },
  {
    id: 6,
    name: "Daily Needs Mart",
    distance: "0.7 km",
    top: "68%",
    left: "8%",
  },
  { id: 7, name: "Shoppy Store", distance: "1.4 km", top: "78%", left: "38%" },
  { id: 8, name: "Tech House", distance: "1.6 km", top: "72%", left: "70%" },
];

const SHOPS = [
  {
    id: 1,
    name: "Fashion Hub",
    verified: true,
    category: "Clothing Store",
    rating: 4.8,
    reviews: 256,
    open: true,
    closes: "9:00 PM",
    address: "Mahatma Nagar, Nashik",
    distance: "0.6 km",
    image:
      "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=400&q=80",
  },
  {
    id: 2,
    name: "Electro World",
    verified: true,
    category: "Electronics Store",
    rating: 4.7,
    reviews: 192,
    open: true,
    closes: "8:30 PM",
    address: "College Road, Nashik",
    distance: "0.8 km",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&q=80",
  },
  {
    id: 3,
    name: "Home Style",
    verified: true,
    category: "Home & Furniture",
    rating: 4.6,
    reviews: 148,
    open: true,
    closes: "9:00 PM",
    address: "Gangapur Road, Nashik",
    distance: "0.7 km",
    image:
      "https://images.unsplash.com/photo-1567016432779-094069958ea5?w=400&q=80",
  },
  {
    id: 4,
    name: "Cycle Point",
    verified: true,
    category: "Bicycle Store",
    rating: 4.5,
    reviews: 112,
    open: true,
    closes: "8:00 PM",
    address: "Untwadi Road, Nashik",
    distance: "1.2 km",
    image:
      "https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=400&q=80",
  },
];

function MapPinMarker({ pin }) {
  return (
    <div
      className="absolute flex -translate-x-1/2 -translate-y-full flex-col items-center"
      style={{ top: pin.top, left: pin.left }}
    >
      <div className="flex items-center gap-1.5 rounded-full bg-white px-2.5 py-1 shadow-md shadow-slate-400/20">
        <span
          className="flex h-6 w-6 items-center justify-center rounded-full"
          style={{ backgroundColor: THEME.ink }}
        >
          <Store size={12} className="text-white" />
        </span>
        <div className="pr-0.5">
          <p className="text-[10px] font-bold leading-tight text-[#0F1638]">
            {pin.name}
          </p>
          <p className="text-[9px] leading-tight text-slate-400">
            {pin.distance}
          </p>
        </div>
      </div>
      <span
        className="-mt-0.5 h-2 w-2 rotate-45"
        style={{ backgroundColor: "white" }}
      />
    </div>
  );
}

export default function ExplorePage() {
  const [activeFilter, setActiveFilter] = useState("all");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  // Loading Simulation
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  // --- SKELETON VIEW ---
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F6F5F1] pb-24">
        <div className="mx-auto max-w-md">
          <header className="px-5 pt-6">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <SkeletonBox className="w-6 h-6 rounded-full" />
                  <SkeletonText className="w-32 h-4" />
                  <SkeletonBox className="w-4 h-4 rounded-full" />
                </div>
                <div className="mt-1">
                  <SkeletonText className="w-40 h-5" />
                </div>
              </div>
              <div className="flex items-center gap-3">
                <SkeletonBox className="w-10 h-10 rounded-full" />
                <SkeletonBox className="w-10 h-10 rounded-full" />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-3">
              <SkeletonBox className="flex-1 h-[52px] rounded-2xl" />
              <SkeletonBox className="w-[68px] h-[52px] rounded-2xl" />
            </div>
            <div className="mt-4 flex gap-2 overflow-x-auto px-0 pb-1">
              <SkeletonBox className="w-20 h-9 rounded-full flex-shrink-0" />
              <SkeletonBox className="w-24 h-9 rounded-full flex-shrink-0" />
              <SkeletonBox className="w-20 h-9 rounded-full flex-shrink-0" />
              <SkeletonBox className="w-20 h-9 rounded-full flex-shrink-0" />
            </div>
          </header>
          <SkeletonBox className="relative mx-5 mt-4 h-[300px] overflow-hidden rounded-3xl" />
          <section className="mt-6 px-5">
            <div className="flex items-center justify-between">
              <SkeletonText className="w-40 h-6" />
              <div className="flex items-center gap-1">
                <SkeletonText className="w-10 h-4" />
                <SkeletonBox className="w-4 h-4 rounded-full" />
              </div>
            </div>
            <div className="mt-4 flex flex-col gap-3">
              <div className="flex gap-3 rounded-2xl bg-white p-3 shadow-sm shadow-slate-200/70">
                <SkeletonBox className="h-24 w-24 rounded-xl flex-shrink-0" />
                <div className="flex flex-1 flex-col gap-2">
                  <SkeletonText className="w-3/4 h-4" />
                  <SkeletonText className="w-1/2 h-3" />
                  <SkeletonText className="w-1/3 h-3" />
                  <div className="flex items-center justify-between mt-auto pt-1.5">
                    <SkeletonText className="w-20 h-3" />
                    <SkeletonBox className="w-16 h-7 rounded-lg" />
                  </div>
                </div>
              </div>
              <div className="flex gap-3 rounded-2xl bg-white p-3 shadow-sm shadow-slate-200/70">
                <SkeletonBox className="h-24 w-24 rounded-xl flex-shrink-0" />
                <div className="flex flex-1 flex-col gap-2">
                  <SkeletonText className="w-3/4 h-4" />
                  <SkeletonText className="w-1/2 h-3" />
                  <SkeletonText className="w-1/3 h-3" />
                  <div className="flex items-center justify-between mt-auto pt-1.5">
                    <SkeletonText className="w-20 h-3" />
                    <SkeletonBox className="w-16 h-7 rounded-lg" />
                  </div>
                </div>
              </div>
              <div className="flex gap-3 rounded-2xl bg-white p-3 shadow-sm shadow-slate-200/70">
                <SkeletonBox className="h-24 w-24 rounded-xl flex-shrink-0" />
                <div className="flex flex-1 flex-col gap-2">
                  <SkeletonText className="w-3/4 h-4" />
                  <SkeletonText className="w-1/2 h-3" />
                  <SkeletonText className="w-1/3 h-3" />
                  <div className="flex items-center justify-between mt-auto pt-1.5">
                    <SkeletonText className="w-20 h-3" />
                    <SkeletonBox className="w-16 h-7 rounded-lg" />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F6F5F1] pb-24">
      <div className="mx-auto max-w-md">
        {/* Header */}
        <header className="px-5 pt-6">
          <div className="flex items-start justify-between">
            <button className="flex items-center gap-1">
              <MapPin size={16} style={{ color: THEME.gold }} />
              <span className="text-[15px] font-bold text-[#0F1638]">
                Nashik, Maharashtra
              </span>
              <ChevronDown size={15} className="text-slate-400" />
            </button>
            <div className="flex items-center gap-3">
              {/* <button
                aria-label="Notifications"
                className="relative flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm shadow-slate-200"
              >
                <Bell size={17} className="text-[#0F1638]" />
                <span
                  className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full text-[10px] font-bold text-white"
                  style={{ backgroundColor: THEME.gold }}
                >
                  3
                </span>
              </button> */}
              <img
                src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&q=80"
                alt="Profile"
                className="h-10 w-10 rounded-full object-cover ring-2 ring-white"
              />
            </div>
          </div>

          {/* Search + Scan QR */}
          <div className="mt-4 flex items-center gap-3">
            <div className="flex flex-1 items-center gap-2 rounded-2xl bg-white px-4 py-3.5 shadow-sm shadow-slate-200/70">
              <Search size={18} className="text-slate-400" />
              <input
                type="text"
                placeholder="Search for shops, products & auctions..."
                className="flex-1 bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
              />
            </div>
            {/* <button
              className="flex h-[52px] w-[68px] flex-col items-center justify-center gap-1 rounded-2xl text-white shadow-md"
              style={{ backgroundColor: THEME.ink }}
            >
              <QrCode size={17} />
              <span className="text-[10px] font-semibold">Scan QR</span>
            </button> */}
          </div>
        </header>

        {/* Category filter pills */}
        <div className="mt-4 flex gap-2 overflow-x-auto px-5 pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {FILTERS.map((f) => {
            const Icon = f.icon;
            const isActive = activeFilter === f.id;
            return (
              <button
                key={f.id}
                onClick={() => setActiveFilter(f.id)}
                className="flex flex-shrink-0 items-center gap-1.5 rounded-full px-4 py-2 text-[13px] font-semibold transition-colors"
                style={{
                  backgroundColor: isActive ? THEME.ink : "white",
                  color: isActive ? "white" : "#334155",
                }}
              >
                <Icon size={14} />
                {f.label}
              </button>
            );
          })}
        </div>

        {/* Map */}
        <div
          className="relative mx-5 mt-4 h-[300px] overflow-hidden rounded-3xl"
          style={{ backgroundColor: THEME.mapBg }}
        >
          {/* subtle road grid */}
          <svg
            className="absolute inset-0 h-full w-full opacity-40"
            preserveAspectRatio="none"
          >
            <line
              x1="0"
              y1="45%"
              x2="100%"
              y2="55%"
              stroke="#C7D3F0"
              strokeWidth="10"
            />
            <line
              x1="30%"
              y1="0"
              x2="55%"
              y2="100%"
              stroke="#C7D3F0"
              strokeWidth="8"
            />
            <line
              x1="75%"
              y1="0"
              x2="60%"
              y2="100%"
              stroke="#C7D3F0"
              strokeWidth="6"
            />
          </svg>

          {PINS.map((pin) => (
            <MapPinMarker key={pin.id} pin={pin} />
          ))}

          {/* You are here */}
          <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
            <span
              className="absolute h-14 w-14 animate-ping rounded-full opacity-30"
              style={{ backgroundColor: THEME.ink }}
            />
            <span
              className="relative flex h-4 w-4 items-center justify-center rounded-full border-2 border-white"
              style={{ backgroundColor: THEME.ink }}
            />
            <span className="mt-2 rounded-full bg-[#0F1638] px-3 py-1 text-[11px] font-semibold text-white shadow-md">
              You are here
            </span>
          </div>

          {/* Floating controls */}
          <div className="absolute bottom-4 right-4 flex flex-col gap-2">
            <button className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md">
              <LocateFixed size={17} className="text-[#0F1638]" />
            </button>
            <button className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md">
              <SlidersHorizontal size={16} className="text-[#0F1638]" />
            </button>
          </div>
        </div>

        {/* Shops near you */}
        <section className="mt-6 px-5">
          <div className="flex items-center justify-between">
            <h3 className="text-[17px] font-extrabold text-[#0F1638]">
              Shops Near You
            </h3>
            <button className="flex items-center gap-1 text-[13px] font-medium text-slate-500">
              Sort by:{" "}
              <span className="font-semibold text-[#0F1638]">Distance</span>
              <ChevronDown size={14} />
            </button>
          </div>

          <div className="mt-4 flex flex-col gap-3">
            {SHOPS.map((shop) => (
              <div
                key={shop.id}
                className="flex gap-3 rounded-2xl bg-white p-3 shadow-sm shadow-slate-200/70"
              >
                <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-xl">
                  <img
                    src={shop.image}
                    alt={shop.name}
                    className="h-full w-full object-cover"
                  />
                  <span className="absolute bottom-1.5 left-1.5 rounded-full bg-white/95 px-2 py-0.5 text-[10px] font-semibold text-[#0F1638]">
                    {shop.distance}
                  </span>
                </div>

                <div className="flex flex-1 flex-col">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-1">
                      <p className="text-[15px] font-bold text-[#0F1638]">
                        {shop.name}
                      </p>
                      {shop.verified && (
                        <CheckCircle2
                          size={14}
                          className="fill-[#0F1638] text-white"
                        />
                      )}
                    </div>
                    <button aria-label="Save shop">
                      <Heart size={17} className="text-slate-300" />
                    </button>
                  </div>

                  <span
                    className="mt-1 w-fit rounded-md px-2 py-0.5 text-[11px] font-semibold"
                    style={{
                      backgroundColor: THEME.goldSoft,
                      color: THEME.ink,
                    }}
                  >
                    {shop.category}
                  </span>

                  <div className="mt-1.5 flex items-center gap-1 text-[12px] text-slate-600">
                    <StarIcon
                      size={12}
                      className="fill-[#D9A441] text-[#D9A441]"
                    />
                    <span className="font-semibold text-[#0F1638]">
                      {shop.rating}
                    </span>
                    <span className="text-slate-400">({shop.reviews})</span>
                  </div>

                  <div className="mt-1 flex items-center gap-1 text-[11px]">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    <span className="font-medium text-emerald-600">Open</span>
                    <span className="text-slate-400">
                      &middot; Closes {shop.closes}
                    </span>
                  </div>

                  <div className="mt-auto flex items-end justify-between pt-1.5">
                    <p className="flex items-center gap-1 text-[11px] text-slate-400">
                      <MapPin size={11} /> {shop.address}
                    </p>
                    <button
                      onClick={() => navigate(`/shop/${shop.id}`)}
                      className="rounded-lg px-3.5 py-1.5 text-[12px] font-semibold text-white"
                      style={{ backgroundColor: THEME.ink }}
                    >
                      View Shop
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
