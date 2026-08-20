import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Search,
  MapPin,
  Clock,
  Heart,
  Users,
  Filter,
  ChevronDown,
  Loader2,
  Gavel
} from "lucide-react";

const THEME = {
  ink: "#0F1638",
  gold: "#D9A441",
  goldSoft: "#FDF3E1",
};

// This is the expanded mock data for "All Auctions"
// In a real app, you would fetch this from an API
const ALL_AUCTIONS = [
  { id: 1, title: "Hero Sprint 27.5T Cycle", city: "Nashik", location: "College Road", distance: "4.8 km", image: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=400&q=80", bid: "3,200", bids: 47, watching: 152, timeLeft: "18m" },
  { id: 2, title: "Nike Air Max Premium", city: "Nashik", location: "MG Road", distance: "5.2 km", image: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=400&q=80", bid: "1,450", bids: 31, watching: 98, timeLeft: "32m" },
  { id: 3, title: "Canon EOS 200D DSLR", city: "Pune", location: "FC Road", distance: "6.1 km", image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&q=80", bid: "8,500", bids: 22, watching: 64, timeLeft: "1h 12m" },
  { id: 4, title: "iPhone 13 Pro Max", city: "Mumbai", location: "Andheri", distance: "7.3 km", image: "https://images.unsplash.com/photo-1632661674596-df8be070a5c5?w=400&q=80", bid: "32,000", bids: 18, watching: 52, timeLeft: "45m" },
  { id: 5, title: "Wooden Center Table", city: "Nashik", location: "Gangapur Road", distance: "2.1 km", image: "https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=400&q=80", bid: "1,200", bids: 12, watching: 35, timeLeft: "2h 10m" },
  { id: 6, title: "Sony WH-1000XM4 Headphones", city: "Nashik", location: "Trimbak Road", distance: "3.5 km", image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=400&q=80", bid: "6,500", bids: 28, watching: 81, timeLeft: "55m" },
  { id: 7, title: "Gaming Chair RGB", city: "Pune", location: "Koregaon Park", distance: "8.0 km", image: "https://images.unsplash.com/photo-1598550476439-6845805ce5ed?w=400&q=80", bid: "9,999", bids: 45, watching: 120, timeLeft: "25m" },
  { id: 8, title: "Vintage Vinyl Record Player", city: "Mumbai", location: "Colaba", distance: "9.2 km", image: "https://images.unsplash.com/photo-1526495741809-12094a6bb3e6?w=400&q=80", bid: "4,200", bids: 9, watching: 33, timeLeft: "1h 05m" },
];

export default function AllAuctionsPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCity, setFilterCity] = useState("All Cities");
  const [locationText, setLocationText] = useState("Getting location...");
  const [isLocationLoading, setIsLocationLoading] = useState(true);

  // Get user location (same logic as HomePage)
  useEffect(() => {
    if (!navigator.geolocation) {
      setLocationText("Location off");
      setIsLocationLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10&accept-language=en`
          );
          const data = await response.json();
          if (data && data.display_name) {
            const addressParts = data.display_name.split(',');
            const shortAddress = addressParts.slice(-3, -1).join(', ').trim() || "Nashik, India";
            setLocationText(shortAddress);
          } else {
            setLocationText("Nashik, India");
          }
        } catch (error) {
          setLocationText("Nashik, India");
        } finally {
          setIsLocationLoading(false);
        }
      },
      (error) => {
        setLocationText("Nashik, India");
        setIsLocationLoading(false);
      },
      { enableHighAccuracy: true }
    );
  }, []);

  // Filtering logic
  const filteredAuctions = ALL_AUCTIONS.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCity = filterCity === "All Cities" ? true : item.city === filterCity;
    return matchesSearch && matchesCity;
  });

  // Get unique cities for the filter dropdown
  const uniqueCities = ["All Cities", ...new Set(ALL_AUCTIONS.map(item => item.city))];

  return (
    <div className="min-h-screen bg-[#F8F7F4] pb-24">
      <div className="mx-auto max-w-md">
        
        {/* Header */}
        <header className="sticky top-0 z-10 bg-[#F8F7F4] px-5 pt-4 pb-3 border-b border-slate-200/50">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate(-1)} className="p-1 hover:bg-slate-200 rounded-full transition-colors">
              <ArrowLeft size={22} className="text-[#0F1638]" />
            </button>
            <div>
              <h1 className="text-[18px] font-extrabold text-[#0F1638]">All Live Auctions</h1>
              <div className="flex items-center gap-1 text-[11px] text-slate-500">
                <MapPin size={12} className="text-[#D9A441]" />
                {isLocationLoading ? (
                  <span className="flex items-center gap-1"><Loader2 size={10} className="animate-spin" /> Loading...</span>
                ) : (
                  <span>{locationText}</span>
                )}
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="mt-3 flex items-center gap-2 rounded-2xl bg-white px-4 py-2.5 shadow-md shadow-slate-200/60 ring-1 ring-slate-100">
            <Search size={16} className="text-slate-400" />
            <input
              type="text"
              placeholder="Search auctions..."
              className="flex-1 bg-transparent text-[13px] text-slate-700 outline-none placeholder:text-slate-400"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="flex items-center gap-1 border-l border-slate-200 pl-2">
              <Filter size={14} className="text-slate-400" />
              <select 
                value={filterCity}
                onChange={(e) => setFilterCity(e.target.value)}
                className="bg-transparent text-[12px] font-medium text-slate-600 outline-none cursor-pointer"
              >
                {uniqueCities.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>
          </div>
        </header>

        {/* Content / List */}
        <div className="px-5 pt-4 pb-6 space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-[13px] font-medium text-slate-500">{filteredAuctions.length} auctions found</p>
          </div>

          {filteredAuctions.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <Gavel size={48} className="text-slate-300 mb-3" />
              <h3 className="text-[16px] font-bold text-[#0F1638]">No auctions found</h3>
              <p className="text-[13px] text-slate-400 mt-1">Try adjusting your search or filter.</p>
            </div>
          ) : (
            filteredAuctions.map((item) => (
              <div 
                key={item.id}
                className="flex gap-4 rounded-2xl bg-white p-3 shadow-md shadow-slate-200/60 ring-1 ring-slate-100/50"
              >
                {/* Image Section */}
                <div className="relative h-28 w-28 flex-shrink-0 overflow-hidden rounded-xl bg-slate-100">
                  <img src={item.image} alt={item.title} className="h-full w-full object-cover" />
                  <div className="absolute top-1 left-1 bg-red-500 text-white text-[8px] px-1.5 py-0.5 rounded-full font-bold">
                    LIVE
                  </div>
                  <div className="absolute bottom-1 right-1 bg-black/60 backdrop-blur-sm px-2 py-0.5 rounded text-[9px] text-white flex items-center gap-1">
                    <Clock size={10} /> {item.timeLeft}
                  </div>
                </div>

                {/* Content Section */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-[14px] font-bold text-[#0F1638] line-clamp-2">{item.title}</h3>
                      <button className="flex-shrink-0 p-1 hover:bg-slate-100 rounded-full transition-colors">
                        <Heart size={15} className="text-slate-400" />
                      </button>
                    </div>
                    <p className="flex items-center gap-1 text-[11px] text-slate-400 mt-0.5">
                      <MapPin size={11} /> {item.location} • {item.distance}
                    </p>
                  </div>

                  <div className="flex items-end justify-between border-t border-slate-100 pt-2 mt-1">
                    <div>
                      <p className="text-[10px] text-slate-400 font-medium">Current Bid</p>
                      <p className="text-[16px] font-extrabold" style={{ color: THEME.ink }}>₹{item.bid}</p>
                      <div className="flex items-center gap-1.5 text-[10px] text-slate-400 mt-0.5">
                        <Users size={11} /> {item.watching} watching
                      </div>
                    </div>
                    <Link
                      to={`/auction/${item.id}`}
                      className="rounded-xl px-3.5 py-1.5 text-[12px] font-bold text-white shadow-md transition-transform hover:scale-105 active:scale-95"
                      style={{ backgroundColor: THEME.ink }}
                    >
                      Place Bid
                    </Link>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}