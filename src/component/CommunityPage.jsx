import React, { useState, useEffect } from "react";
import {
  MapPin,
  ChevronDown,
  Bell,
  Search,
  Users,
  MessageCircle,
  Heart,
  Share2,
  Building2,
  Star,
  Clock,
  ChevronRight,
  Check,
  Plus,
  Users as UsersIcon,
  Filter,
  Grid,
  List,
} from "lucide-react";
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
  <div className={`relative overflow-hidden bg-slate-200 rounded-xl ${className}`}>
    <Shimmer />
  </div>
);

const SkeletonText = ({ className }) => (
  <div className={`relative overflow-hidden bg-slate-200 rounded-full ${className}`}>
    <Shimmer />
  </div>
);

export default function CommunityPage() {
  const navigate = useNavigate();
  const [selectedCity, setSelectedCity] = useState({ id: 6, name: "Nashik", state: "Maharashtra", communities: 27 });
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("grid");
  const [isLoading, setIsLoading] = useState(true);

  // --- Loading Simulation ---
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  // --- Already Joined Communities ---
  const [joinedCommunities, setJoinedCommunities] = useState([
    {
      id: 99,
      name: "Pune Cycle Club",
      category: "Sports",
      members: 1634,
      image: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=400&q=80",
      rating: 4.7,
      location: "Pune",
      isVerified: true,
    },
    {
      id: 98,
      name: "Nashik Tech Enthusiasts",
      category: "Technology",
      members: 1247,
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&q=80",
      rating: 4.8,
      location: "Nashik",
      isVerified: true,
    },
    {
      id: 97,
      name: "Nashik Foodies",
      category: "Food & Dining",
      members: 789,
      image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=80",
      rating: 4.9,
      location: "Nashik",
      isVerified: true,
    },
  ]);

  const popularCities = [
    { id: 1, name: "Mumbai", state: "Maharashtra", communities: 45 },
    { id: 2, name: "Pune", state: "Maharashtra", communities: 38 },
    { id: 3, name: "Aurangabad", state: "Maharashtra", communities: 27 },
    { id: 4, name: "Nagpur", state: "Maharashtra", communities: 31 },
    { id: 5, name: "Solapur", state: "Maharashtra", communities: 18 },
    { id: 6, name: "Nashik", state: "Maharashtra", communities: 27 },
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

  // --- Render Already Joined Communities ---
  const renderJoinedCommunities = () => {
    if (!selectedCity) return null;

    const filteredJoined = joinedCommunities.filter(
      (community) => community.location === selectedCity.name
    );

    if (filteredJoined.length === 0) return null;

    return (
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="flex items-center gap-2 font-bold text-[#0F1638] text-[15px]">
            <Check size={18} className="text-green-500" /> My Communities
          </h3>
          <button className="text-xs font-medium text-[#D9A441]">View All</button>
        </div>
        
        <div className="flex gap-3 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {filteredJoined.map((community) => (
            <div
              key={community.id}
              className="w-40 flex-shrink-0 bg-white rounded-xl overflow-hidden border border-slate-100 shadow-sm cursor-pointer transition-transform hover:scale-105"
              onClick={() => navigate(`/community-chat/${community.id}`)} // Navigate Directly
            >
              <div className="relative h-20 w-full">
                <img src={community.image} alt={community.name} className="w-full h-full object-cover" />
                {community.isVerified && (
                  <div className="absolute top-1 right-1 bg-blue-500 text-white p-0.5 rounded-full">
                    <Check size={10} />
                  </div>
                )}
              </div>
              <div className="p-2">
                <p className="text-[12px] font-bold text-[#0F1638] truncate">{community.name}</p>
                <p className="text-[9px] text-slate-400 truncate">{community.category}</p>
                <div className="flex items-center gap-1 mt-0.5">
                  <Users size={9} className="text-slate-400" />
                  <span className="text-[9px] text-slate-400">{community.members.toLocaleString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

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
              onClick={() => {
                const nextCity = selectedCity.name === "Nashik" ? popularCities.find(c => c.name === "Pune") : popularCities.find(c => c.name === "Nashik");
                setSelectedCity(nextCity);
              }}
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

        {/* Discover Grid */}
        <div className={viewMode === "grid" ? "grid grid-cols-2 gap-2" : "space-y-2"}>
          {communities.map((community) => (
            <div
              key={community.id}
              className="bg-white rounded-lg overflow-hidden border border-slate-100 hover:shadow-md transition-shadow"
            >
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

                {/* JOIN BUTTON WITH CORRECT NAVIGATE */}
                <button 
                  onClick={() => navigate(`/community-chat/1`)}
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

  // --- SKELETON VIEW ---
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F6F5F1] pb-24">
        <div className="mx-auto max-w-md">
          <header className="bg-white border-b border-slate-100 px-5 py-4 sticky top-0 z-10">
            <div className="flex items-center justify-between">
              <div>
                <SkeletonText className="w-32 h-6" />
                <div className="flex items-center gap-1 mt-0.5">
                  <SkeletonBox className="w-3 h-3 rounded-full" />
                  <SkeletonText className="w-24 h-3" />
                  <SkeletonBox className="w-3 h-3 rounded-full" />
                </div>
              </div>
              <div className="flex items-center gap-3">
                <SkeletonBox className="w-10 h-10 rounded-full" />
                <SkeletonBox className="w-10 h-10 rounded-full" />
              </div>
            </div>
            <div className="mt-4 relative">
              <SkeletonBox className="w-4 h-4 rounded-full absolute left-4 top-1/2 -translate-y-1/2" />
              <SkeletonBox className="w-full h-11 rounded-xl" />
            </div>
          </header>
          <div className="p-5">
            {/* My Communities Skeleton */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <SkeletonText className="w-32 h-5" />
                <SkeletonText className="w-12 h-3" />
              </div>
              <div className="flex gap-3 overflow-x-auto pb-2">
                <SkeletonBox className="w-40 h-32 rounded-xl flex-shrink-0" />
                <SkeletonBox className="w-40 h-32 rounded-xl flex-shrink-0" />
                <SkeletonBox className="w-40 h-32 rounded-xl flex-shrink-0" />
              </div>
            </div>
            {/* City Header Skeleton */}
            <div className="bg-white rounded-xl p-4 border border-slate-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <SkeletonBox className="w-10 h-10 rounded-lg" />
                  <div>
                    <SkeletonText className="w-24 h-3" />
                    <SkeletonText className="w-32 h-5" />
                  </div>
                </div>
                <SkeletonText className="w-16 h-3" />
              </div>
              <div className="flex items-center gap-4 mt-3 pt-3 border-t border-slate-100">
                <SkeletonText className="w-24 h-3" />
                <SkeletonText className="w-20 h-3" />
              </div>
            </div>
            {/* Filter Skeleton */}
            <div className="flex items-center justify-between mt-4">
              <div className="flex gap-2">
                <SkeletonBox className="w-20 h-8 rounded-full" />
                <SkeletonBox className="w-20 h-8 rounded-full" />
              </div>
              <div className="flex gap-1">
                <SkeletonBox className="w-8 h-8 rounded-lg" />
                <SkeletonBox className="w-8 h-8 rounded-lg" />
              </div>
            </div>
            {/* Grid Skeleton */}
            <div className="grid grid-cols-2 gap-2 mt-4">
              <SkeletonBox className="h-48 rounded-lg" />
              <SkeletonBox className="h-48 rounded-lg" />
              <SkeletonBox className="h-48 rounded-lg" />
              <SkeletonBox className="h-48 rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    );
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
                onClick={() => {
                  const nextCity = selectedCity.name === "Nashik" ? popularCities.find(c => c.name === "Pune") : popularCities.find(c => c.name === "Nashik");
                  setSelectedCity(nextCity);
                }}
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

        {/* Main Content */}
        <div className="p-5">
          {renderJoinedCommunities()}
          {renderCommunityFeed()}
        </div>
      </div>
    </div>
  );
}