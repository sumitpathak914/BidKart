import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Store,
  MapPin,
  Star,
  Users,
  Clock,
  CheckCircle,
  ShoppingBag,
  Heart,
  Share2,
  MessageCircle,
  Phone,
  Mail,
  Globe,
  Calendar,
  Award,
  Shield,
  Truck,
  Wifi,
  Package,
  Gavel,
  Tag,
  Box,
  BadgeCheck // Replaced 'CheckBadge' with 'BadgeCheck' (correct Lucide name)
} from "lucide-react";

const THEME = {
  ink: "#0F1638",
  gold: "#D9A441",
  goldSoft: "#FDF3E1",
  mapBg: "#E7ECFA",
  primary: "#5B4DFF", 
};

// Mock database - Use this to fetch by ID
const SHOPS_DB = {
  1: {
    id: 1,
    name: "WoodNest Furniture",
    owner: "Sumit Patil",
    category: "Furniture Store",
    rating: 4.8,
    reviewsCount: 128,
    location: "Nashik, Maharashtra",
    fullAddress: "Shop No. 5, College Road, Nashik, Maharashtra 422001",
    open: true,
    closes: "9:00 PM",
    verified: true,
    shopIdDisplay: "WN2022",
    description: "Premium furniture store offering modern, stylish and durable furniture for your home and office. We specialize in wooden dining sets, comfortable sofas, and ergonomic office chairs.",
    coverImage: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=800&q=80",
    logoImage: "https://images.unsplash.com/photo-1567016432779-094069958ea5?w=200&q=80",
    followers: 2345,
    productCount: 156,
    liveBids: 23,
    soldItems: 312,
    positiveRating: 98,
    joinedDate: "Since 2022",
    
    aboutStats: [
      { icon: Shield, label: "Quality Products", desc: "Premium & durable" },
      { icon: Tag, label: "Best Prices", desc: "Value for money" },
      { icon: BadgeCheck, label: "Secure Payments", desc: "100% safe" }, // Fixed icon here
      { icon: Truck, label: "Fast Delivery", desc: "On time delivery" },
    ],

    products: [
      { id: 1, name: "Modern Office Chair", price: "₹ 6,500", image: "https://images.unsplash.com/photo-1505797055758-07d757a8f6db?w=400&q=80" },
      { id: 2, name: "Wooden Center Table", price: "₹ 3,200", image: "https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=400&q=80" },
      { id: 3, name: "King Size Bed", price: "₹ 18,500", image: "https://images.unsplash.com/photo-1505693416388-b5d0685c4202?w=400&q=80" },
      { id: 4, name: "Bedside Table", price: "₹ 2,100", image: "https://images.unsplash.com/photo-1532372320572-cda25653a26d?w=400&q=80" },
    ],

    recentAuctions: [
      { id: 1, title: "6 Seater Wooden Dining Table", price: "₹ 12,500", time: "02h 15m", image: "https://images.unsplash.com/photo-1615061687972-4fbae27c3c89?w=400&q=80", bids: 18 },
      { id: 2, title: "Premium Fabric 3 Seater Sofa", price: "₹ 8,200", time: "0h 45m", image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80", bids: 12 },
      { id: 3, title: "Wooden Rocking Chair", price: "₹ 4,750", time: "03h 30m", image: "https://images.unsplash.com/photo-1503602642458-2321114451cf?w=400&q=80", bids: 9 },
    ],
    reviews: [
      { id: 1, name: "Rahul Sharma", rating: 5, date: "2 days ago", comment: "Amazing store! Great collection of furniture. The staff is very knowledgeable and helpful." },
      { id: 2, name: "Priya Patel", rating: 4, date: "1 week ago", comment: "Good quality products. The delivery service is excellent. Would definitely recommend." },
      { id: 3, name: "Amit Singh", rating: 5, date: "2 weeks ago", comment: "Best furniture shop in Nashik! Got my dream dining set here. Very reasonable prices." },
    ],
  },
  2: { id: 2, name: "Cycle World Nashik", description: "Premium bicycle store...", coverImage: "https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?w=800&q=80", reviews: [{ id: 1, name: "User", rating: 5, date: "today", comment: "Great" }]}
};

export default function ShopDetailsPage() {
  const navigate = useNavigate();
  const { shopId } = useParams();
  const [activeTab, setActiveTab] = useState("portfolio");
  const [isFollowing, setIsFollowing] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [shop, setShop] = useState(null);

  // Load data based on URL ID
  useEffect(() => {
    const foundShop = SHOPS_DB[shopId] || SHOPS_DB[1]; // Fallback to ID 1
    setShop(foundShop);
  }, [shopId]);

  if (!shop) return <div className="h-screen flex items-center justify-center">Loading...</div>;

  const renderPortfolio = () => (
    <div className="space-y-6">
      
      {/* About Info */}
      <div className="bg-white rounded-2xl p-5 flex flex-col md:flex-row justify-between gap-4">
        <div className="flex-1">
          <p className="text-sm text-slate-600 leading-relaxed">
            {shop.description}
          </p>
          <button className="text-xs font-semibold text-[#5B4DFF] mt-2 hover:underline">
            Read more
          </button>
        </div>
        <div className="flex flex-col gap-2 text-xs text-slate-500 border-t md:border-t-0 md:border-l pt-3 md:pt-0 md:pl-4 border-slate-200 min-w-[140px]">
          <span className="flex items-center gap-2"><MapPin size={14} className="text-[#5B4DFF]"/> {shop.location}</span>
          <span className="flex items-center gap-2"><Box size={14} className="text-[#5B4DFF]"/> Open • Closes {shop.closes}</span>
          <span className="flex items-center gap-2"><Tag size={14} className="text-[#5B4DFF]"/> Shop ID: {shop.shopIdDisplay}</span>
        </div>
      </div>

      {/* Live Bids */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-bold text-[#0F1638]">Live Bids <span className="text-[10px] text-red-500 font-medium ml-1">•LIVE</span></h4>
          <button className="text-sm font-semibold text-[#5B4DFF]">View All</button>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {shop.recentAuctions.map((auction) => (
            <div key={auction.id} className="bg-white rounded-2xl overflow-hidden p-3 shadow-sm border border-slate-100">
              <div className="relative h-32 rounded-xl overflow-hidden mb-2">
                <img src={auction.image} alt={auction.title} className="w-full h-full object-cover" />
                <div className="absolute top-1 left-1 bg-red-500 text-white text-[8px] px-1.5 py-0.5 rounded-full font-bold">LIVE</div>
                <div className="absolute bottom-1 right-1 bg-black/50 backdrop-blur-sm px-2 py-0.5 rounded text-[9px] text-white flex items-center gap-1">
                  <Clock size={10} /> {auction.time}
                </div>
              </div>
              <p className="text-[11px] font-medium text-slate-800 truncate mb-1.5">{auction.title}</p>
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="text-[9px] text-slate-400">Current Bid</p>
                  <p className="text-xs font-bold text-[#0F1638]">{auction.price}</p>
                </div>
                <div className="text-right">
                  <p className="text-[9px] text-slate-400">Bids</p>
                  <p className="text-xs font-bold text-[#0F1638]">{auction.bids}</p>
                </div>
              </div>
              <button className="w-full py-1.5 rounded-lg text-[11px] font-semibold text-white" style={{ backgroundColor: "#5B4DFF" }}>
                Place Bid
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* All Products */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-bold text-[#0F1638]">All Products</h4>
          <button className="text-sm font-semibold text-[#5B4DFF]">View All</button>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {shop.products.map((product) => (
            <div key={product.id} className="bg-white rounded-2xl overflow-hidden p-3 shadow-sm border border-slate-100 relative">
              <button className="absolute top-4 right-4 z-10">
                <Heart size={14} className="text-slate-300" />
              </button>
              <div className="h-28 rounded-xl overflow-hidden mb-2">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
              </div>
              <p className="text-[11px] font-medium text-slate-800 truncate">{product.name}</p>
              <p className="text-xs font-bold text-[#0F1638] mt-0.5">{product.price}</p>
            </div>
          ))}
        </div>
      </div>

      {/* About the Shop (Stats Section) */}
      <div>
        <h4 className="font-bold text-[#0F1638] mb-3">About the Shop</h4>
        <div className="grid grid-cols-2 gap-2">
          {shop.aboutStats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div key={idx} className="bg-white p-3 rounded-xl shadow-sm border border-slate-100 flex items-center gap-3">
                <div className="p-2 bg-blue-50 rounded-full">
                  <Icon size={16} className="text-[#5B4DFF]" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-[#0F1638]">{stat.label}</p>
                  <p className="text-[9px] text-slate-500">{stat.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );

  const renderAuctions = () => (
    <div className="space-y-3">
      {shop.recentAuctions.map((auction) => (
        <div key={auction.id} className="bg-white rounded-2xl overflow-hidden p-4 shadow-sm border border-slate-100">
          <div className="flex gap-4">
            <div className="relative w-24 h-24 flex-shrink-0 rounded-xl overflow-hidden">
              <img src={auction.image} alt={auction.title} className="w-full h-full object-cover" />
              <span className="absolute top-1 left-1 bg-red-500 text-white text-[8px] px-1.5 py-0.5 rounded-full font-bold">LIVE</span>
            </div>
            <div className="flex-1">
              <h5 className="font-semibold text-[#0F1638] text-sm">{auction.title}</h5>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-sm font-bold text-[#5B4DFF]">{auction.price}</span>
                <span className="text-xs text-slate-400 flex items-center gap-0.5">
                  <Clock size={12} /> {auction.time}
                </span>
              </div>
              <div className="flex items-center gap-3 mt-1.5">
                <span className="text-xs text-slate-500">{auction.bids} bids</span>
                <button className="px-4 py-1 rounded-lg text-xs font-semibold text-white" style={{ backgroundColor: "#5B4DFF" }}>
                  Place Bid
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderReviews = () => (
    <div className="space-y-4">
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
        <p className="text-sm text-slate-600">{shop.reviews.length} Reviews</p>
      </div>
      {shop.reviews.map((review) => (
        <div key={review.id} className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-[#0F1638] font-bold">
              {review.name.charAt(0)}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h5 className="font-semibold text-[#0F1638] text-sm">{review.name}</h5>
                <span className="text-xs text-slate-400">{review.date}</span>
              </div>
              <div className="flex items-center gap-0.5 mt-0.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} size={12} className={`${star <= review.rating ? "fill-[#D9A441] text-[#D9A441]" : "text-slate-300"}`} />
                ))}
              </div>
              <p className="text-sm text-slate-600 mt-1.5">{review.comment}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F6F5F1] pb-24">
      <div className="mx-auto max-w-md">
        
        {/* Header / Cover Image */}
        <div className="relative h-48 w-full bg-slate-300">
          <img src={shop.coverImage} alt={shop.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
          
          <button onClick={() => navigate(-1)} className="absolute top-4 left-4 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-md hover:bg-white transition-colors">
            <ArrowLeft size={20} className="text-[#0F1638]" />
          </button>
          <div className="absolute top-4 right-4 flex gap-2">
            <button className="p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-md hover:bg-white">
              <Share2 size={18} className="text-[#0F1638]" />
            </button>
            <button onClick={() => setIsLiked(!isLiked)} className="p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-md hover:bg-white">
              <Heart size={18} className={isLiked ? "fill-red-500 text-red-500" : "text-[#0F1638]"} />
            </button>
          </div>

          {/* Logo Overlay */}
          <div className="absolute -bottom-10 left-5">
            <div className="w-20 h-20 rounded-full border-4 border-white bg-slate-200 overflow-hidden shadow-lg flex items-center justify-center">
               <img src={shop.logoImage} alt="Logo" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>

        {/* Shop Info Section */}
        <div className="px-5 pt-12 pb-2">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-[#0F1638]">{shop.name}</h1>
                {shop.verified && <CheckCircle size={16} className="text-emerald-500 fill-emerald-500" />}
              </div>
              
              <div className="flex items-center gap-1 mt-1">
                 <span className="text-[10px] text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">Verified Shop</span>
              </div>

              <div className="flex items-center gap-3 mt-2">
                 <div className="flex items-center gap-1">
                   <span className="text-lg font-bold text-[#0F1638]">{shop.rating}</span>
                   <Star size={14} className="fill-[#D9A441] text-[#D9A441]" />
                 </div>
                 <span className="text-xs text-slate-500">({shop.reviewsCount} Reviews)</span>
                 <span className="text-xs text-slate-300">•</span>
                 <span className="text-xs text-slate-500">{shop.joinedDate}</span>
              </div>
            </div>

            <button onClick={() => setIsFollowing(!isFollowing)} className={`px-5 py-2 rounded-lg border text-sm font-medium transition-colors ${isFollowing ? 'border-slate-300 text-slate-600 bg-slate-50' : 'border-[#5B4DFF] text-[#5B4DFF] bg-white'}`}>
              {isFollowing ? "Following" : "Follow"}
            </button>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-4 gap-2 mt-4 bg-white p-3 rounded-xl shadow-sm border border-slate-100">
             <div className="text-center border-r border-slate-100 last:border-r-0">
               <div className="flex items-center justify-center gap-1 text-[#0F1638] mb-0.5"><Package size={12} /> <span className="font-bold text-sm">{shop.productCount}</span></div>
               <p className="text-[10px] text-slate-500">Products</p>
             </div>
             <div className="text-center border-r border-slate-100 last:border-r-0">
               <div className="flex items-center justify-center gap-1 text-[#0F1638] mb-0.5"><Gavel size={12} /> <span className="font-bold text-sm">{shop.liveBids}</span></div>
               <p className="text-[10px] text-slate-500">Live Bids</p>
             </div>
             <div className="text-center border-r border-slate-100 last:border-r-0">
               <div className="flex items-center justify-center gap-1 text-[#0F1638] mb-0.5"><ShoppingBag size={12} /> <span className="font-bold text-sm">{shop.soldItems}</span></div>
               <p className="text-[10px] text-slate-500">Sold Items</p>
             </div>
             <div className="text-center">
               <div className="flex items-center justify-center gap-1 text-emerald-600 mb-0.5"><Shield size={12} /> <span className="font-bold text-sm">{shop.positiveRating}%</span></div>
               <p className="text-[10px] text-slate-500">Positive Rating</p>
             </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="px-5 mt-4 border-b border-slate-200 bg-white shadow-sm">
          <div className="flex gap-6 overflow-x-auto">
            {["portfolio", "livebids", "about", "reviews"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-3 text-sm font-medium border-b-2 transition-all whitespace-nowrap ${activeTab === tab ? "border-[#5B4DFF] text-[#5B4DFF]" : "border-transparent text-slate-500"}`}
              >
                {tab === "portfolio" ? "Portfolio" : tab === "livebids" ? `Live Bids (${shop.liveBids})` : tab === "about" ? "About Shop" : `Reviews (${shop.reviewsCount})`}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="px-5 pt-4 pb-6">
          {activeTab === "portfolio" && renderPortfolio()}
          {activeTab === "livebids" && renderAuctions()}
          {activeTab === "about" && renderPortfolio()} 
          {activeTab === "reviews" && renderReviews()}
        </div>

        {/* Bottom Fixed Buttons */}
        <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto p-4 bg-white border-t border-slate-200 shadow-lg">
          <div className="flex gap-2">
             <button className="flex-1 p-2 rounded-xl border-2 border-[#5B4DFF] text-[#5B4DFF] font-semibold flex items-center justify-center gap-2 bg-white">
               <MessageCircle size={18} /> Message 
             </button>
             <button className="flex-1 p-2 rounded-xl border-2 border-[#5B4DFF] text-[#5B4DFF] font-semibold flex items-center justify-center gap-2 bg-white">
               <Phone size={18} /> Call Shop
             </button>
             <button className="flex-[1.5] p-2 rounded-xl text-white font-semibold flex items-center justify-center gap-2 shadow-md" style={{ backgroundColor: "#5B4DFF" }}>
               <Store size={18} /> Visit Shop
             </button>
          </div>
        </div>

      </div>
    </div>
  );
}


