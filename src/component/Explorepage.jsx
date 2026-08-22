import axios from "axios";
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
  Store,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// Import userSession functions
import { getToken, getUser, isLoggedIn, logoutUser } from "./userSession";

const THEME = {
  ink: "#0F1638",
  gold: "#D9A441",
  goldSoft: "#FDF3E1",
  mapBg: "#E7ECFA",
};

// API Base URL
const API_BASE_URL = "http://test.aakarcanvassing.com";

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

// Generate pins for map based on shop locations
const generatePins = (shops) => {
  if (!shops || shops.length === 0) {
    return [
      { id: 1, name: "You are here", distance: "", top: "45%", left: "45%" },
    ];
  }

  return shops.map((shop, index) => ({
    id: shop.business_id || index + 1,
    name: shop.business_name || shop.name,
    distance: shop.distance || `${(Math.random() * 2 + 0.5).toFixed(1)} km`,
    top: `${15 + Math.random() * 70}%`,
    left: `${5 + Math.random() * 90}%`,
  }));
};

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
          {pin.distance && (
            <p className="text-[9px] leading-tight text-slate-400">
              {pin.distance}
            </p>
          )}
        </div>
      </div>
      <span
        className="-mt-0.5 h-2 w-2 rotate-45"
        style={{ backgroundColor: "white" }}
      />
    </div>
  );
}

// Function to get current location using Geolocation API
const getCurrentLocation = () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation is not supported by this browser"));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => {
        reject(error);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  });
};

// Function to get city and state from coordinates using reverse geocoding
const getLocationDetails = async (lat, lng) => {
  try {
    // Using OpenStreetMap Nominatim API (free, no API key required)
    const response = await axios.get(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=10&addressdetails=1`
    );

    if (response.data && response.data.address) {
      const address = response.data.address;
      const city = address.city || address.town || address.village || address.municipality || "";
      const state = address.state || address.region || "";
      const country = address.country || "";
      
      return { city, state, country };
    }
    throw new Error("Unable to get location details");
  } catch (error) {
    console.error("Error getting location details:", error);
    // Fallback: Try Google Maps Geocoding API if Nominatim fails
    // You can add your Google Maps API key here
    throw error;
  }
};

export default function ExplorePage() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [shops, setShops] = useState([]);
  const [userCity, setUserCity] = useState("");
  const [userState, setUserState] = useState("");
  const [userName, setUserName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pins, setPins] = useState([]);
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const navigate = useNavigate();

  // Get user details from session
  const user = getUser();
  const loggedIn = isLoggedIn();

  // Get user's current location and fetch shops
  const getUserLocationAndFetchShops = async (category) => {
    setIsGettingLocation(true);
    setError(null);

    try {
      // Get current location
      const location = await getCurrentLocation();
      console.log("Current location:", location);

      // Get city and state from coordinates
      const locationDetails = await getLocationDetails(location.lat, location.lng);
      console.log("Location details:", locationDetails);

      const city = locationDetails.city || "";
      const state = locationDetails.state || "";

      // Update user city and state
      setUserCity(city);
      setUserState(state);

      // Now fetch shops with the location
      await fetchNearbyShops(category, city, state);
      
    } catch (err) {
      console.error("Error getting location:", err);
      
      // Handle different geolocation errors
      let errorMessage = "Unable to get your location. ";
      if (err.code === 1) {
        errorMessage += "Please allow location access in your browser settings.";
      } else if (err.code === 2) {
        errorMessage += "Location unavailable. Please check your GPS.";
      } else if (err.code === 3) {
        errorMessage += "Location request timed out. Please try again.";
      } else {
        errorMessage += "Please try again or enter your location manually.";
      }
      
      setError(errorMessage);
      setIsGettingLocation(false);
      setIsLoading(false);
      
      // Try to fetch shops with default location as fallback
      // Uncomment if you want a fallback
      // await fetchNearbyShops(category, "Nashik", "Maharashtra");
    } finally {
      setIsGettingLocation(false);
    }
  };

  // API call to get nearby shops
  const fetchNearbyShops = async (category, city, state) => {
    setIsLoading(true);
    setError(null);

    // Check if user is logged in
    if (!loggedIn) {
      setError("Please login to view shops");
      setIsLoading(false);
      return;
    }

    // Get fresh token
    const currentToken = getToken();
    if (!currentToken) {
      setError("Session expired. Please login again.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.get(`${API_BASE_URL}/api/auth/nearby`, {
        headers: {
          Authorization: `Bearer ${currentToken}`,
          "Content-Type": "application/json",
        },
        params: {
          category: category,
          city: city || userCity,
          state: state || userState,
        },
      });

      if (response.data.success) {
        const shopData = response.data.data.shops || [];
        setShops(shopData);

        // Update user city from API response
        const responseCity = response.data.data.user?.city || city || userCity;
        const responseState = response.data.data.user?.state || state || userState;
        setUserCity(responseCity);
        setUserState(responseState);
        setUserName(response.data.data.user?.name || user?.name || "");

        // Generate pins for map
        setPins(generatePins(shopData));
        setError(null);
      } else {
        setError(response.data.message || "Failed to load shops");
        setShops([]);
      }
    } catch (err) {
      console.error("Error fetching shops:", err);

      if (err.response?.status === 401) {
        setError("Session expired. Please login again.");
        logoutUser();
        navigate("/login");
      } else if (err.response?.status === 403) {
        setError("You don't have permission to view shops");
      } else if (err.response?.status === 404) {
        setError("No shops found in your area");
        setShops([]);
      } else {
        setError(
          err.response?.data?.message ||
            "Unable to load shops. Please try again."
        );
      }
      setShops([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch shops on component mount and when filter changes
  useEffect(() => {
    // Get location and fetch shops on mount
    if (!userCity) {
      getUserLocationAndFetchShops(activeFilter);
    } else {
      fetchNearbyShops(activeFilter, userCity, userState);
    }
  }, [activeFilter]);

  // --- SKELETON VIEW ---
  if (isLoading || isGettingLocation) {
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
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="flex gap-3 rounded-2xl bg-white p-3 shadow-sm shadow-slate-200/70"
                >
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
              ))}
            </div>
          </section>
        </div>
      </div>
    );
  }

  // Get user profile image from session or use default
  const userProfileImage =
    user?.profileImage ||
    "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&q=80";

  return (
    <div className="min-h-screen bg-[#F6F5F1] pb-24">
      <div className="mx-auto max-w-md">
        {/* Header */}
        <header className="px-5 pt-6">
          <div className="flex items-start justify-between">
            <button className="flex items-center gap-1">
              <MapPin size={16} style={{ color: THEME.gold }} />
              <span className="text-[15px] font-bold text-[#0F1638]">
                {userCity || "Detecting location..."}
                {userState ? `, ${userState}` : ""}
              </span>
              <ChevronDown size={15} className="text-slate-400" />
            </button>
            <div className="flex items-center gap-3">
              <img
                src={userProfileImage}
                alt="Profile"
                className="h-10 w-10 rounded-full object-cover ring-2 ring-white"
              />
            </div>
          </div>

          {/* Search */}
          <div className="mt-4 flex items-center gap-3">
            <div className="flex flex-1 items-center gap-2 rounded-2xl bg-white px-4 py-3.5 shadow-sm shadow-slate-200/70">
              <Search size={18} className="text-slate-400" />
              <input
                type="text"
                placeholder="Search for shops, products & auctions..."
                className="flex-1 bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
              />
            </div>
          </div>
        </header>

        {/* Error Message */}
        {error && (
          <div className="mx-5 mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600 border border-red-200 flex items-center justify-between">
            <span>{error}</span>
            {error.includes("login") && (
              <button
                onClick={() => navigate("/login")}
                className="px-3 py-1 bg-red-600 text-white rounded-lg text-xs font-semibold"
              >
                Login
              </button>
            )}
            {error.includes("location") && (
              <button
                onClick={() => getUserLocationAndFetchShops(activeFilter)}
                className="px-3 py-1 bg-blue-600 text-white rounded-lg text-xs font-semibold"
              >
                Retry
              </button>
            )}
          </div>
        )}

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

          {pins.map((pin) => (
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
            <button
              onClick={() => getUserLocationAndFetchShops(activeFilter)}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md hover:shadow-lg transition-shadow"
            >
              <LocateFixed size={17} className="text-[#0F1638]" />
            </button>
            <button className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md hover:shadow-lg transition-shadow">
              <SlidersHorizontal size={16} className="text-[#0F1638]" />
            </button>
          </div>
        </div>

        {/* Shops near you */}
        <section className="mt-6 px-5">
          <div className="flex items-center justify-between">
            <h3 className="text-[17px] font-extrabold text-[#0F1638]">
              Shops Near You {shops.length > 0 && `(${shops.length})`}
            </h3>

          </div>

         <div className="mt-4 flex flex-col gap-4">
  {shops.length === 0 ? (
    <div className="text-center py-12 bg-white rounded-2xl shadow-sm">
      <Store size={56} className="mx-auto mb-4 text-slate-300" />
      <p className="text-base font-semibold text-slate-600">No shops found</p>
      <p className="text-sm text-slate-400 mt-1">
        Try changing your filter or location
      </p>
    </div>
  ) : (
    shops.map((shop) => (
      <div
        key={shop.business_id || shop.id}
        className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
      >
        <div className="flex p-4 gap-4">
          {/* Image Section */}
          <div className="relative flex-shrink-0">
            <div className="h-28 w-28 rounded-xl overflow-hidden bg-slate-100">
              <img
                src={
                  shop.logo ||
                  shop.cover_image ||
                  "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=400&q=80"
                }
                alt={shop.business_name || shop.name}
                className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  e.target.src =
                    "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=400&q=80";
                }}
              />
              {/* Distance Badge */}
              <span className="absolute bottom-2 left-2 bg-white/95 backdrop-blur-sm rounded-full px-2.5 py-1 text-[10px] font-bold text-[#0F1638] shadow-sm">
                <MapPin size={10} className="inline mr-1" />
                {shop.distance || `${(Math.random() * 2 + 0.5).toFixed(1)} km`}
              </span>
              {/* Open/Closed Status Badge */}
              <span
                className={`absolute top-2 right-2 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${
                  shop.is_open !== false
                    ? "bg-emerald-500 text-white"
                    : "bg-red-500 text-white"
                }`}
              >
                {shop.is_open !== false ? "Open" : "Closed"}
              </span>
            </div>
          </div>

          {/* Content Section */}
          <div className="flex-1 min-w-0">
            {/* Header */}
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <h3 className="text-[15px] font-bold text-[#0F1638] truncate">
                    {shop.business_name || shop.name}
                  </h3>
                  {shop.is_verified && (
                    <CheckCircle2
                      size={15}
                      className="fill-[#0F1638] text-white flex-shrink-0"
                    />
                  )}
                </div>
                <p className="text-[11px] text-slate-400 truncate flex items-center gap-1 mt-0.5">
                  <MapPin size={12} className="flex-shrink-0" />
                  {shop.business_address || shop.address || "Local shop"}
                </p>
              </div>
              <button
                aria-label="Save shop"
                className="flex-shrink-0 p-1.5 rounded-full hover:bg-red-50 transition-colors group/heart"
              >
                <Heart
                  size={18}
                  className="text-slate-300 group-hover/heart:text-red-500 transition-colors"
                />
              </button>
            </div>

            {/* Category & Rating */}
            <div className="flex items-center gap-2 mt-2">
              <span
                className="rounded-full px-2.5 py-0.5 text-[10px] font-semibold"
                style={{
                  backgroundColor: THEME.goldSoft,
                  color: THEME.ink,
                }}
              >
                {shop.category || "General Store"}
              </span>
              <div className="flex items-center gap-1 text-[11px] text-slate-600">
                <StarIcon
                  size={13}
                  className="fill-[#D9A441] text-[#D9A441]"
                />
                <span className="font-bold text-[#0F1638]">
                  {shop.rating || "4.5"}
                </span>
                <span className="text-slate-400">
                  ({shop.total_reviews || 0})
                </span>
              </div>
            </div>

            {/* Timing & Action */}
            <div className="flex items-center justify-between mt-3 pt-2 border-t border-slate-100">
              <div className="flex items-center gap-2 text-[10px] text-slate-400">
                <span className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  Open Now
                </span>
                {shop.close_time && (
                  <>
                    <span className="text-slate-300">|</span>
                    <span>Closes {shop.close_time}</span>
                  </>
                )}
              </div>
              <button
                onClick={() =>
                  navigate(`/shop/${shop.business_id || shop.id}`)
                }
                className="px-4 py-1.5 rounded-lg text-[11px] font-semibold text-white transition-all duration-300 hover:shadow-lg hover:scale-105"
                style={{ backgroundColor: THEME.ink }}
              >
                View Details
              </button>
            </div>
          </div>
        </div>
      </div>
    ))
  )}
</div>
        </section>
      </div>
    </div>
  );
}