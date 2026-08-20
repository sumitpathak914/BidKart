import React, { useState } from "react";
import {
  MapPin,
  ChevronDown,
  Bell,
  Search,
  Users,
  UserPlus,
  MessageCircle,
  Heart,
  Share2,
  MoreVertical,
  Building2,
  Globe,
  Star,
  Clock,
  ChevronRight,
  X,
  Check,
  Home,
  Compass,
  Plus,
  User,
  AtSign,
  Hash,
  Calendar,
  TrendingUp,
  Sparkles,
  Award,
  Crown,
  Users as UsersIcon,
  Filter,
  Grid,
  List,
  AlertCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const THEME = {
  ink: "#0F1638",
  gold: "#D9A441",
  goldSoft: "#FDF3E1",
  mapBg: "#E7ECFA",
};

export default function CommunityPage() {
  const [selectedCity, setSelectedCity] = useState(null);
  const [showCitySelector, setShowCitySelector] = useState(true);
  const [activeTab, setActiveTab] = useState("communities");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCommunity, setSelectedCommunity] = useState(null);
  const [viewMode, setViewMode] = useState("grid");
const navigate = useNavigate();
  const popularCities = [
    { id: 1, name: "Mumbai", state: "Maharashtra", communities: 45 },
    { id: 2, name: "Pune", state: "Maharashtra", communities: 38 },
    { id: 3, name: "Aurangabad", state: "Maharashtra", communities: 27 },
    { id: 4, name: "Nagpur", state: "Maharashtra", communities: 31 },
    { id: 5, name: "Solapur", state: "Maharashtra", communities: 18 },
    { id: 6, name: "Sangli", state: "Maharashtra", communities: 15 },
    { id: 7, name: "Kolhapur", state: "Maharashtra", communities: 22 },
    { id: 8, name: "Satara", state: "Maharashtra", communities: 14 },
    { id: 9, name: "Nanded", state: "Maharashtra", communities: 12 },
    { id: 10, name: "Amravati", state: "Maharashtra", communities: 16 },
  ];

  // Communities data organized by city
  const communitiesByCity = {
    "Mumbai": [
      {
        id: 1,
        name: "Mumbai Tech Hub",
        category: "Technology",
        members: 3247,
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&q=80",
        rating: 4.9,
        posts: 567,
        active: true,
        description: "The largest tech community in Mumbai. Connect with developers, designers, and tech entrepreneurs.",
        isVerified: true,
        location: "Mumbai",
      },
      {
        id: 2,
        name: "Mumbai Foodies",
        category: "Food & Dining",
        members: 2892,
        image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=80",
        rating: 4.8,
        posts: 456,
        active: true,
        description: "Discover the best street food, fine dining, and hidden gems in Mumbai.",
        isVerified: true,
        location: "Mumbai",
      },
      {
        id: 3,
        name: "Mumbai Fashion Collective",
        category: "Fashion",
        members: 1894,
        image: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=400&q=80",
        rating: 4.6,
        posts: 234,
        active: true,
        description: "Fashion enthusiasts sharing trends, styling tips, and exclusive deals.",
        isVerified: false,
        location: "Mumbai",
      },
    ],
    "Pune": [
      {
        id: 4,
        name: "Pune Cycle Club",
        category: "Sports",
        members: 1634,
        image: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=400&q=80",
        rating: 4.7,
        posts: 289,
        active: true,
        description: "Weekly rides, cycle maintenance workshops, and cycling events in Pune.",
        isVerified: true,
        location: "Pune",
      },
      {
        id: 5,
        name: "Pune Photography Club",
        category: "Arts & Photography",
        members: 1456,
        image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&q=80",
        rating: 4.5,
        posts: 198,
        active: true,
        description: "Photography walks, workshops, and sharing beautiful captures of Pune.",
        isVerified: true,
        location: "Pune",
      },
    ],
    "Nashik": [
      {
        id: 6,
        name: "Nashik Tech Enthusiasts",
        category: "Technology",
        members: 1247,
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&q=80",
        rating: 4.8,
        posts: 234,
        active: true,
        description: "Connect with tech lovers in Nashik. Share knowledge and stay updated.",
        isVerified: true,
        location: "Nashik",
      },
      {
        id: 7,
        name: "Nashik Home Decor",
        category: "Home & Living",
        members: 856,
        image: "https://images.unsplash.com/photo-1567016432779-094069958ea5?w=400&q=80",
        rating: 4.4,
        posts: 156,
        active: true,
        description: "Share home decor ideas, renovation tips, and find unique furniture in Nashik.",
        isVerified: false,
        location: "Nashik",
      },
      {
        id: 8,
        name: "Nashik Foodies",
        category: "Food & Dining",
        members: 789,
        image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=80",
        rating: 4.9,
        posts: 312,
        active: true,
        description: "Discover the best food spots in Nashik. Share recipes and food experiences.",
        isVerified: true,
        location: "Nashik",
      },
    ],
    "Nagpur": [
      {
        id: 9,
        name: "Nagpur Business Network",
        category: "Business",
        members: 956,
        image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&q=80",
        rating: 4.6,
        posts: 178,
        active: true,
        description: "Connect with entrepreneurs, business owners, and professionals in Nagpur.",
        isVerified: true,
        location: "Nagpur",
      },
    ],
  };

  // Get communities for selected city
  const getCityCommunities = () => {
    if (!selectedCity) return [];
    return communitiesByCity[selectedCity.name] || [];
  };

  const CitySelector = () => (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center">
      <div className="bg-white w-full max-w-md rounded-t-3xl max-h-[90vh] overflow-hidden animate-slide-up">
        <div className="p-5 border-b border-slate-100">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-[#0F1638]">Select Your City</h2>
          </div>
          
          {/* Search */}
          <div className="mt-4 relative">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search city..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 focus:border-[#D9A441] focus:outline-none transition-colors bg-slate-50"
            />
          </div>

          {/* Current Location */}
          <div className="mt-4 p-4 bg-blue-50 rounded-xl border border-blue-100">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <MapPin size={20} className="text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-[#0F1638]">Current Location</p>
                <p className="text-sm text-slate-600">Nashik, Maharashtra</p>
                <p className="text-xs text-blue-600 flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-500 inline-block"></span>
                  Using GPS location
                </p>
              </div>
              <button 
                onClick={() => {
                  const city = popularCities.find(c => c.name === "Nashik");
                  setSelectedCity(city);
                  setShowCitySelector(false);
                }}
                className="text-[#D9A441] text-sm font-medium"
              >
                Select
              </button>
            </div>
          </div>
        </div>

        {/* Cities List */}
        <div className="p-5 overflow-y-auto max-h-[55vh]">
          <h3 className="text-sm font-semibold text-[#0F1638] mb-3">Popular Cities</h3>
          <div className="grid grid-cols-2 gap-3">
            {popularCities
              .filter(city => 
                city.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                city.state.toLowerCase().includes(searchQuery.toLowerCase())
              )
              .map((city) => (
                <button
                  key={city.id}
                  onClick={() => {
                    setSelectedCity(city);
                    setShowCitySelector(false);
                  }}
                  className="p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors text-left relative"
                >
                  <p className="font-semibold text-[#0F1638]">{city.name}</p>
                  <p className="text-xs text-slate-500">{city.state}</p>
                  <p className="text-xs text-[#D9A441] mt-1">{city.communities} communities</p>
                  <ChevronRight size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-300" />
                </button>
              ))}
          </div>

          <button className="mt-4 w-full flex items-center justify-center gap-2 py-3 text-[#D9A441] font-semibold">
            <span>Other Cities</span>
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );

  const renderCommunityFeed = () => {
    const communities = getCityCommunities();
    
    if (communities.length === 0) {
      return (
        <div className="text-center py-12">
          <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <UsersIcon size={36} className="text-slate-400" />
          </div>
          <h3 className="text-lg font-bold text-[#0F1638]">No Communities Yet</h3>
          <p className="text-sm text-slate-500 mt-2">
            Be the first to create a community in {selectedCity?.name}
          </p>
          <button className="mt-4 px-6 py-3 rounded-xl text-white font-semibold"
            style={{ backgroundColor: THEME.gold }}
          >
            <Plus size={18} className="inline mr-2" />
            Create Community
          </button>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        {/* City Header */}
        <div className="bg-white rounded-xl p-4 border border-slate-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[#FDF3E1] rounded-lg">
                <Building2 size={20} className="text-[#D9A441]" />
              </div>
              <div>
                <p className="text-sm text-slate-500">Communities in</p>
                <p className="font-bold text-[#0F1638] text-lg">{selectedCity?.name}, {selectedCity?.state}</p>
              </div>
            </div>
            <button 
              onClick={() => setShowCitySelector(true)}
              className="text-sm font-medium text-[#D9A441] flex items-center gap-1"
            >
              <MapPin size={16} /> Change
            </button>
          </div>
          <div className="flex items-center gap-4 mt-3 pt-3 border-t border-slate-100">
            <span className="flex items-center gap-1 text-sm text-slate-500">
              <Users size={16} /> {communities.reduce((acc, c) => acc + c.members, 0).toLocaleString()} total members
            </span>
            <span className="flex items-center gap-1 text-sm text-slate-500">
              <MessageCircle size={16} /> {communities.reduce((acc, c) => acc + c.posts, 0)} posts
            </span>
          </div>
        </div>

        {/* Filter & View Controls */}
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <button className="px-4 py-2 rounded-full bg-white border border-slate-200 text-sm font-medium text-slate-600 flex items-center gap-2">
              <Filter size={16} /> Filter
            </button>
            <button className="px-4 py-2 rounded-full bg-white border border-slate-200 text-sm font-medium text-slate-600 flex items-center gap-2">
              <Star size={16} /> Top Rated
            </button>
          </div>
          <div className="flex gap-1">
            <button 
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-lg transition-colors ${viewMode === "grid" ? "bg-[#FDF3E1] text-[#D9A441]" : "text-slate-400"}`}
            >
              <Grid size={18} />
            </button>
            <button 
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-lg transition-colors ${viewMode === "list" ? "bg-[#FDF3E1] text-[#D9A441]" : "text-slate-400"}`}
            >
              <List size={18} />
            </button>
          </div>
        </div>

        {/* --- UPDATED 2-COLUMN CLOSE GRID --- */}
        <div className={viewMode === "grid" ? "grid grid-cols-2 gap-2" : "space-y-2"}>
          {communities.map((community) => (
            <div
              key={community.id}
              className="bg-white rounded-lg overflow-hidden border border-slate-100 hover:shadow-md transition-shadow"
            >
              {/* Compact Image */}
              <div className="relative h-24 w-full">
                <img
                  src={community.image}
                  alt={community.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-1.5 right-1.5 flex flex-col gap-1">
                  {community.isVerified && (
                    <span className="bg-blue-500 text-white text-[8px] px-1.5 py-0.5 rounded-full flex items-center gap-0.5">
                      <Check size={9} />
                    </span>
                  )}
                  {community.active && (
                    <span className="bg-green-500 text-white text-[8px] px-1.5 py-0.5 rounded-full">
                      Live
                    </span>
                  )}
                </div>
                <div className="absolute bottom-1.5 left-1.5 bg-black/60 backdrop-blur-sm text-white text-[8px] px-1.5 py-0.5 rounded-full flex items-center gap-0.5">
                  <MapPin size={9} /> {community.location}
                </div>
              </div>

              {/* Compact Content */}
              <div className="p-2.5">
                <div className="flex items-start justify-between gap-1">
                  <div className="flex-1">
                    <h4 className="font-bold text-[#0F1638] text-[13px] truncate">{community.name}</h4>
                    <p className="text-[10px] text-slate-500 truncate">{community.category}</p>
                  </div>
                  <div className="flex items-center gap-0.5 flex-shrink-0">
                    <Star size={11} className="fill-[#D9A441] text-[#D9A441]" />
                    <span className="text-[11px] font-semibold text-[#0F1638]">{community.rating}</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 mt-1.5 text-[9px] text-slate-500">
                  <span className="flex items-center gap-0.5">
                    <Users size={10} /> {community.members > 999 ? `${(community.members/1000).toFixed(1)}k` : community.members}
                  </span>
                  <span className="flex items-center gap-0.5">
                    <MessageCircle size={10} /> {community.posts}
                  </span>
                </div>

               <button 
  onClick={() => navigate(`/community-chat/${community.id}`)}
  className="w-full mt-2 py-1.5 rounded-lg text-[10px] font-semibold text-white transition-colors hover:opacity-90"
  style={{ backgroundColor: THEME.ink }}
>
  Join
</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // If city not selected, show only city selector
  if (showCitySelector) {
    return <CitySelector />;
  }

  return (
    <div className="min-h-screen bg-[#F6F5F1] pb-24">
      <div className="mx-auto max-w-md">
        {/* Header */}
        <header className="bg-white border-b border-slate-100 px-5 py-4 sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-[#0F1638]">Communities</h1>
              <button 
                onClick={() => setShowCitySelector(true)}
                className="text-xs text-slate-500 flex items-center gap-1 mt-0.5"
              >
                <MapPin size={12} className="text-[#D9A441]" />
                {selectedCity?.name}, {selectedCity?.state}
                <ChevronDown size={12} />
              </button>
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
                  5
                </span>
              </button>
              <img
                src="https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=100&q=80"
                alt="Profile"
                className="h-10 w-10 rounded-full object-cover ring-2 ring-white"
              />
            </div>
          </div>

          {/* Search Bar */}
          <div className="mt-4 relative">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder={`Search communities in ${selectedCity?.name}...`}
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 focus:border-[#D9A441] focus:outline-none transition-colors bg-slate-50"
            />
          </div>
        </header>

        {/* Community Feed */}
        <div className="p-5">
          {renderCommunityFeed()}
        </div>
      </div>
    </div>
  );
}