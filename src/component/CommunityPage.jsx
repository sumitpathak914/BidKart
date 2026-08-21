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
  Home,
  Bookmark,
  TrendingUp,
  User,
  Image as ImageIcon,
  Calendar,
  Eye,
  ShoppingBag,
  Store,
  Package,
  Tag,
  Sparkles,
  Scissors,
  Droplet,
  Shirt,
  Gem,
  Wifi,
  Coffee
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const THEME = {
  ink: "#0F1638",
  gold: "#D9A441",
  goldSoft: "#FDF3E1",
  mapBg: "#E7ECFA",
};

// --- SKELETON LOADER ---
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
  const [activeTab, setActiveTab] = useState("following");
  const [showCityDropdown, setShowCityDropdown] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  // --- Shop/Business Categories ---
  const categories = [
    { id: 1, name: "All", icon: Store },
    { id: 2, name: "Clothing", icon: Shirt },
    { id: 3, name: "Beauty", icon: Sparkles },
    { id: 4, name: "Jewelry", icon: Gem },
    { id: 5, name: "Salon", icon: Scissors },
    { id: 6, name: "Skin Care", icon: Droplet },
    { id: 7, name: "Fashion", icon: Tag },
    { id: 8, name: "Lifestyle", icon: Coffee },
  ];

  const [selectedCategory, setSelectedCategory] = useState("All");

  // --- Mock Data: Followed Shops/Communities ---
  const [followedShops, setFollowedShops] = useState([
    {
      id: 1,
      name: "Trendy Threads",
      shopType: "Clothing Store",
      category: "Clothing",
      members: 1634,
      image: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=400&q=80",
      rating: 4.7,
      location: "Nashik",
      isVerified: true,
      owner: "Priya Sharma",
      posts: [
        {
          id: 1,
          author: "Priya Sharma",
          authorImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80",
          content: "🛍️ New Summer Collection Arrived! 20% off on all ethnic wear. Visit our store at College Road.",
          time: "2 hours ago",
          likes: 45,
          comments: 12,
          images: ["https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=400&q=80"],
          pinned: true
        },
        {
          id: 2,
          author: "Priya Sharma",
          authorImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80",
          content: "👗 Exclusive Designer Sarees just arrived! Limited pieces available. DM for bookings.",
          time: "5 hours ago",
          likes: 23,
          comments: 8,
          images: ["https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=400&q=80"],
          pinned: false
        }
      ]
    },
    {
      id: 2,
      name: "Glow Beauty Salon",
      shopType: "Beauty & Salon",
      category: "Beauty",
      members: 1247,
      image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&q=80",
      rating: 4.8,
      location: "Nashik",
      isVerified: true,
      owner: "Sneha Patel",
      posts: [
        {
          id: 3,
          author: "Sneha Patel",
          authorImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80",
          content: "💄 Bridal Makeup Offers! Book your appointment now for wedding season. Free trial session.",
          time: "1 day ago",
          likes: 67,
          comments: 24,
          images: ["https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&q=80"],
          pinned: false
        }
      ]
    },
    {
      id: 3,
      name: "Royal Jewelers",
      shopType: "Jewelry Store",
      category: "Jewelry",
      members: 789,
      image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&q=80",
      rating: 4.9,
      location: "Nashik",
      isVerified: true,
      owner: "Amit Gupta",
      posts: [
        {
          id: 4,
          author: "Amit Gupta",
          authorImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80",
          content: "💎 Gold Rate Update! Special discounts on gold jewelry this week. Visit our showroom.",
          time: "3 hours ago",
          likes: 34,
          comments: 15,
          images: ["https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&q=80"],
          pinned: false
        }
      ]
    },
    {
      id: 4,
      name: "Nature's Touch Skincare",
      shopType: "Skin Care Products",
      category: "Skin Care",
      members: 456,
      image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&q=80",
      rating: 4.6,
      location: "Nashik",
      isVerified: false,
      owner: "Meera Joshi",
      posts: [
        {
          id: 5,
          author: "Meera Joshi",
          authorImage: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=100&q=80",
          content: "🌿 New Organic Skincare Range! Pure, natural, and chemical-free products. Free samples available.",
          time: "6 hours ago",
          likes: 28,
          comments: 9,
          images: ["https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&q=80"],
          pinned: false
        }
      ]
    }
  ]);

  // --- Mock Data: City Shop Posts ---
  const [cityShopPosts, setCityShopPosts] = useState([
    {
      id: 101,
      shopName: "Trendy Threads",
      shopImage: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=100&q=80",
      shopType: "Clothing Store",
      author: "Priya Sharma",
      authorImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80",
      content: "🛍️ New Summer Collection Arrived! 20% off on all ethnic wear. Visit our store at College Road.",
      time: "2 hours ago",
      likes: 89,
      comments: 34,
      members: 1634,
      images: ["https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=400&q=80"],
      pinned: true,
      isVerified: true,
      category: "Clothing"
    },
    {
      id: 102,
      shopName: "Glow Beauty Salon",
      shopImage: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=100&q=80",
      shopType: "Beauty & Salon",
      author: "Sneha Patel",
      authorImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80",
      content: "💄 Bridal Makeup Offers! Book your appointment now for wedding season. Free trial session.",
      time: "1 day ago",
      likes: 67,
      comments: 24,
      members: 1247,
      images: ["https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&q=80"],
      pinned: false,
      isVerified: true,
      category: "Beauty"
    },
    {
      id: 103,
      shopName: "Royal Jewelers",
      shopImage: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=100&q=80",
      shopType: "Jewelry Store",
      author: "Amit Gupta",
      authorImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80",
      content: "💎 Gold Rate Update! Special discounts on gold jewelry this week. Visit our showroom.",
      time: "3 hours ago",
      likes: 45,
      comments: 18,
      members: 789,
      images: ["https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&q=80"],
      pinned: false,
      isVerified: true,
      category: "Jewelry"
    },
    {
      id: 104,
      shopName: "Nature's Touch Skincare",
      shopImage: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=100&q=80",
      shopType: "Skin Care Products",
      author: "Meera Joshi",
      authorImage: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=100&q=80",
      content: "🌿 New Organic Skincare Range! Pure, natural, and chemical-free products. Free samples available.",
      time: "6 hours ago",
      likes: 28,
      comments: 9,
      members: 456,
      images: ["https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&q=80"],
      pinned: false,
      isVerified: false,
      category: "Skin Care"
    }
  ]);

  const popularCities = [
    { id: 1, name: "Mumbai", state: "Maharashtra", shops: 45 },
    { id: 2, name: "Pune", state: "Maharashtra", shops: 38 },
    { id: 3, name: "Aurangabad", state: "Maharashtra", shops: 27 },
    { id: 4, name: "Nagpur", state: "Maharashtra", shops: 31 },
    { id: 5, name: "Solapur", state: "Maharashtra", shops: 18 },
    { id: 6, name: "Nashik", state: "Maharashtra", shops: 27 },
    { id: 7, name: "Kolhapur", state: "Maharashtra", shops: 22 },
    { id: 8, name: "Satara", state: "Maharashtra", shops: 14 },
  ];

  // Get category icon
  const getCategoryIcon = (categoryName) => {
    const category = categories.find(c => c.name === categoryName);
    return category ? category.icon : Store;
  };

  // Format number
  const formatNumber = (num) => {
    if (num > 999) return `${(num/1000).toFixed(1)}k`;
    return num;
  };

  // Filter shops by category
  const getFilteredShops = () => {
    if (selectedCategory === "All") return followedShops;
    return followedShops.filter(shop => shop.category === selectedCategory);
  };

  const getFilteredCityPosts = () => {
    if (selectedCategory === "All") return cityShopPosts;
    return cityShopPosts.filter(post => post.category === selectedCategory);
  };

  // --- Render Followed Shops Posts ---
  const renderFollowedPosts = () => {
    const filteredShops = getFilteredShops();
    
    if (filteredShops.length === 0) {
      return (
        <div className="text-center py-8">
          <Store size={48} className="text-slate-300 mx-auto mb-3" />
          <h3 className="text-sm font-bold text-[#0F1638]">No Shops Followed</h3>
          <p className="text-xs text-slate-500 mt-1">Follow shops to see their posts here</p>
        </div>
      );
    }

    return filteredShops.map((shop) => (
      <div key={shop.id} className="bg-white rounded-xl overflow-hidden border border-slate-100 shadow-sm mb-4">
        {/* Shop Header */}
        <div 
          className="p-3 bg-slate-50 border-b border-slate-100 flex items-center justify-between cursor-pointer hover:bg-slate-100 transition-colors"
          onClick={() => navigate(`/shop/${shop.id}`)}
        >
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg overflow-hidden bg-slate-200 flex-shrink-0">
              <img src={shop.image} alt={shop.name} className="w-full h-full object-cover" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <p className="text-sm font-bold text-[#0F1638]">{shop.name}</p>
                {shop.isVerified && <Check size={12} className="text-blue-500" />}
              </div>
              <div className="flex items-center gap-2 text-[10px] text-slate-500">
                <span>{shop.shopType}</span>
                <span>•</span>
                <span className="flex items-center gap-0.5">
                  <Users size={10} /> {formatNumber(shop.members)}
                </span>
                <span>•</span>
                <span className="flex items-center gap-0.5">
                  <Star size={10} className="fill-[#D9A441] text-[#D9A441]" /> {shop.rating}
                </span>
              </div>
            </div>
          </div>
          <ChevronRight size={16} className="text-slate-400" />
        </div>

        {/* Shop Posts */}
        <div className="p-3 space-y-3">
          {shop.posts.map((post) => (
            <div key={post.id} className="border-b border-slate-50 last:border-0 pb-3 last:pb-0">
              {/* Post Author */}
              <div className="flex items-center gap-2 mb-1.5">
                <div className="w-6 h-6 rounded-full overflow-hidden bg-slate-200 flex-shrink-0">
                  <img src={post.authorImage} alt={post.author} className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="text-xs font-medium text-[#0F1638]">{post.author}</p>
                  <p className="text-[9px] text-slate-400">{post.time}</p>
                </div>
                {post.pinned && (
                  <span className="ml-auto text-[8px] bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded-full">Pinned</span>
                )}
              </div>

              {/* Post Content */}
              <p className="text-xs text-slate-700">{post.content}</p>

              {/* Post Images */}
              {post.images && post.images.length > 0 && (
                <div className="mt-2 grid grid-cols-2 gap-1.5">
                  {post.images.slice(0, 2).map((img, idx) => (
                    <div key={idx} className="rounded-lg overflow-hidden bg-slate-100 h-24">
                      <img src={img} alt="Post" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              )}

              {/* Post Actions */}
              <div className="flex items-center gap-4 mt-2 pt-1.5">
                <button className="flex items-center gap-1 text-[10px] text-slate-400 hover:text-red-500 transition-colors">
                  <Heart size={13} /> {post.likes}
                </button>
                <button 
                  onClick={() => navigate(`/community-chat/${shop.id}`)}
                  className="flex items-center gap-1 text-[10px] text-slate-400 hover:text-[#D9A441] transition-colors"
                >
                  <MessageCircle size={13} /> {post.comments}
                </button>
                <button className="flex items-center gap-1 text-[10px] text-slate-400 hover:text-[#D9A441] transition-colors ml-auto">
                  <Share2 size={13} /> Share
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* View All Posts */}
        <button 
          onClick={() => navigate(`/shop/${shop.id}`)}
          className="w-full py-2 text-center text-xs font-medium text-[#D9A441] bg-slate-50 hover:bg-slate-100 transition-colors border-t border-slate-100"
        >
          View All Posts
        </button>
      </div>
    ));
  };

  // --- Render City Shop Posts ---
  const renderCityPosts = () => {
    const filteredPosts = getFilteredCityPosts();

    if (filteredPosts.length === 0) {
      return (
        <div className="text-center py-8">
          <Store size={48} className="text-slate-300 mx-auto mb-3" />
          <h3 className="text-sm font-bold text-[#0F1638]">No Shop Posts</h3>
          <p className="text-xs text-slate-500 mt-1">No shops have posted in {selectedCity.name} yet</p>
        </div>
      );
    }

    return filteredPosts.map((post) => (
      <div key={post.id} className="bg-white rounded-xl overflow-hidden border border-slate-100 shadow-sm mb-3">
        {/* Shop Info */}
        <div 
          className="p-3 bg-slate-50 border-b border-slate-100 flex items-center gap-2 cursor-pointer hover:bg-slate-100 transition-colors"
          onClick={() => navigate(`/shop/${post.id}`)}
        >
          <div className="w-8 h-8 rounded-lg overflow-hidden bg-slate-200 flex-shrink-0">
            <img src={post.shopImage} alt={post.shopName} className="w-full h-full object-cover" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-1.5">
              <p className="text-sm font-bold text-[#0F1638]">{post.shopName}</p>
              {post.isVerified && <Check size={12} className="text-blue-500" />}
            </div>
            <div className="flex items-center gap-2 text-[10px] text-slate-500">
              <span>{post.shopType}</span>
              <span>•</span>
              <span className="flex items-center gap-0.5">
                <Users size={10} /> {formatNumber(post.members)}
              </span>
            </div>
          </div>
          <ChevronRight size={14} className="text-slate-400" />
        </div>

        {/* Post Content */}
        <div className="p-3">
          <div className="flex items-center gap-2 mb-1.5">
            <div className="w-6 h-6 rounded-full overflow-hidden bg-slate-200 flex-shrink-0">
              <img src={post.authorImage} alt={post.author} className="w-full h-full object-cover" />
            </div>
            <div>
              <p className="text-xs font-medium text-[#0F1638]">{post.author}</p>
              <p className="text-[9px] text-slate-400">{post.time}</p>
            </div>
            {post.pinned && (
              <span className="ml-auto text-[8px] bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded-full">Pinned</span>
            )}
          </div>

          <p className="text-xs text-slate-700">{post.content}</p>

          {post.images && post.images.length > 0 && (
            <div className="mt-2 grid grid-cols-2 gap-1.5">
              {post.images.slice(0, 2).map((img, idx) => (
                <div key={idx} className="rounded-lg overflow-hidden bg-slate-100 h-24">
                  <img src={img} alt="Post" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          )}

          <div className="flex items-center gap-4 mt-2 pt-1.5 border-t border-slate-50">
            <button className="flex items-center gap-1 text-[10px] text-slate-400 hover:text-red-500 transition-colors">
              <Heart size={13} /> {post.likes}
            </button>
            <button className="flex items-center gap-1 text-[10px] text-slate-400 hover:text-[#D9A441] transition-colors">
              <MessageCircle size={13} /> {post.comments}
            </button>
            <button className="flex items-center gap-1 text-[10px] text-slate-400 hover:text-[#D9A441] transition-colors ml-auto">
              <Share2 size={13} /> Share
            </button>
          </div>
        </div>
      </div>
    ));
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
            {/* Categories Skeleton */}
            <div className="flex gap-2 overflow-x-auto pb-3">
              {[1,2,3,4,5,6].map(i => (
                <SkeletonBox key={i} className="w-20 h-8 rounded-full flex-shrink-0" />
              ))}
            </div>
            {/* Tabs Skeleton */}
            <div className="flex bg-slate-100 p-1 rounded-xl mb-4">
              <SkeletonBox className="flex-1 h-9 rounded-lg" />
              <SkeletonBox className="flex-1 h-9 rounded-lg" />
            </div>
            {/* Posts Skeleton */}
            {[1,2].map(i => (
              <div key={i} className="bg-white rounded-xl p-4 border border-slate-100 mb-3">
                <div className="flex items-center gap-3">
                  <SkeletonBox className="w-12 h-12 rounded-lg" />
                  <div>
                    <SkeletonText className="w-32 h-4" />
                    <SkeletonText className="w-24 h-3" />
                  </div>
                </div>
                <SkeletonText className="w-full h-4 mt-3" />
                <SkeletonText className="w-3/4 h-4 mt-1" />
                <SkeletonBox className="w-full h-24 mt-2 rounded-lg" />
              </div>
            ))}
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
              <h1 className="text-xl font-bold text-[#0F1638]">Community</h1>
              <button 
                onClick={() => setShowCityDropdown(!showCityDropdown)}
                className="text-xs text-slate-500 flex items-center gap-1 mt-0.5"
              >
                <MapPin size={12} className="text-[#D9A441]" />
                {selectedCity?.name}, {selectedCity?.state}
                <ChevronDown size={12} />
              </button>
            </div>
            <div className="flex items-center gap-3">
              <button className="relative flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm">
                <Bell size={17} style={{ color: THEME.ink }} />
                <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full text-[10px] font-bold text-white" style={{ backgroundColor: THEME.gold }}>
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

          {/* City Dropdown */}
          {showCityDropdown && (
            <div className="absolute left-5 right-5 mt-2 bg-white rounded-xl shadow-lg border border-slate-100 p-2 z-20 max-h-60 overflow-y-auto">
              {popularCities.map((city) => (
                <button
                  key={city.id}
                  onClick={() => {
                    setSelectedCity(city);
                    setShowCityDropdown(false);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center justify-between ${
                    selectedCity.id === city.id ? 'bg-[#FDF3E1] text-[#0F1638]' : 'hover:bg-slate-50'
                  }`}
                >
                  <div>
                    <span className="font-medium">{city.name}</span>
                    <span className="text-xs text-slate-400 ml-2">{city.state}</span>
                  </div>
                  <span className="text-xs text-slate-400">{city.shops} shops</span>
                </button>
              ))}
            </div>
          )}

          {/* Search Bar */}
          <div className="mt-4 relative">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder={`Search shops in ${selectedCity?.name}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 focus:border-[#D9A441] focus:outline-none transition-colors bg-slate-50"
            />
          </div>
        </header>

        {/* Main Content */}
        <div className="p-5">
          
          {/* Categories */}
          <div className="flex gap-2 overflow-x-auto pb-3 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.name)}
                  className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                    selectedCategory === category.name 
                      ? 'bg-[#0F1638] text-white' 
                      : 'bg-white text-slate-600 border border-slate-200'
                  }`}
                >
                  <Icon size={14} />
                  {category.name}
                </button>
              );
            })}
          </div>

          {/* Tabs */}
          <div className="flex bg-slate-100 p-1 rounded-xl mb-4">
            <button
              onClick={() => setActiveTab("following")}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === "following" ? "bg-white text-[#0F1638] shadow-sm" : "text-slate-500"
              }`}
            >
              <div className="flex items-center justify-center gap-1.5">
                <Bookmark size={15} /> Following
              </div>
            </button>
            <button
              onClick={() => setActiveTab("city")}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === "city" ? "bg-white text-[#0F1638] shadow-sm" : "text-slate-500"
              }`}
            >
              <div className="flex items-center justify-center gap-1.5">
                <TrendingUp size={15} /> City Posts
              </div>
            </button>
          </div>

          {/* Posts */}
          {activeTab === "following" ? renderFollowedPosts() : renderCityPosts()}
          
        </div>
      </div>
    </div>
  );
}