import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  Heart,
  Share2,
  Clock,
  Store,
  CheckCircle,
  ChevronRight,
  Gavel,
  ShieldCheck,
  Plus,
  Minus,
} from "lucide-react";

const THEME = {
  ink: "#0F1638",
  gold: "#D9A441",
  goldSoft: "#FDF3E1",
  primaryBlue: "#195DFF",
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

// MOCK DATA - I added 'sellerId: 1' so it points to WoodNest Furniture
const AUCTION_DB = {
  1: {
    id: 1,
    title: "Hero Sprint Cycle 27.5T",
    category: "Cycles",
    description: "Durable and stylish gear cycle with high performance and smooth ride. Perfect for daily use and fitness.",
    image: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=800&q=80",
    isLive: true,
    timeLeft: "1h 45m left",
    currentBid: 4200,
    totalBids: 18,
    minNextBid: 4500,
    bidIncrement: 300,
    seller: {
      id: 1, // <--- IMPORTANT: This matches your ShopDetailsPage ID for WoodNest Furniture
      name: "Cycle World Nashik",
      logo: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=100&q=80",
      feedback: "98% Positive Feedback",
      verified: true,
    },
    bidHistory: [
      { id: 1, name: "Rahul Patil", amount: 4200, time: "Just now", isHighest: true },
      { id: 2, name: "Sagar Deshmukh", amount: 3900, time: "2m ago", isHighest: false },
      { id: 3, name: "Amit Jadhav", amount: 3600, time: "5m ago", isHighest: false },
      { id: 4, name: "Vikram Mane", amount: 3300, time: "8m ago", isHighest: false },
      { id: 5, name: "Pratik More", amount: 3000, time: "12m ago", isHighest: false },
    ]
  }
};

export default function AuctionDetailsPage() {
  const navigate = useNavigate();
  const { auctionId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  
  // Fetch data based on ID
  const auction = AUCTION_DB[auctionId] || AUCTION_DB[1];
  
  const [bidAmount, setBidAmount] = useState(auction.minNextBid);
  const [isLiked, setIsLiked] = useState(false);

  // Loading Simulation
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleIncrement = () => {
    setBidAmount(prev => prev + auction.bidIncrement);
  };

  const handleDecrement = () => {
    if (bidAmount > auction.minNextBid) {
      setBidAmount(prev => prev - auction.bidIncrement);
    }
  };

  const handlePlaceBid = () => {
    alert(`Bid of ₹${bidAmount.toLocaleString()} placed successfully!`);
  };

  // --- Skeleton Render ---
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F6F5F1] pb-32">
        <div className="mx-auto max-w-md relative">
          {/* Header Skeleton */}
          <header className="sticky top-0 z-10 bg-white px-4 py-3 flex items-center justify-between border-b border-slate-100">
            <div className="flex items-center gap-2">
              <SkeletonBox className="w-8 h-8 rounded-full" />
              <SkeletonText className="w-32 h-5" />
            </div>
            <div className="flex items-center gap-3">
              <SkeletonBox className="w-8 h-8 rounded-full" />
              <SkeletonBox className="w-8 h-8 rounded-full" />
            </div>
          </header>

          <div className="px-4 pt-4 pb-6 space-y-4">
            {/* Status & Title Skeleton */}
            <div className="flex items-center gap-2 mb-1">
              <SkeletonBox className="w-12 h-5 rounded" />
              <SkeletonText className="w-24 h-4" />
            </div>
            <SkeletonText className="w-3/4 h-7" />
            <SkeletonText className="w-1/3 h-4 mt-2" />

            {/* Product Image Skeleton */}
            <SkeletonBox className="w-full h-48 rounded-2xl" />

            {/* Stats Grid Skeleton */}
            <div className="grid grid-cols-4 gap-2 bg-white p-3 rounded-2xl shadow-sm shadow-slate-200/70">
              <div className="text-center"><SkeletonText className="w-12 h-3 mx-auto" /><SkeletonText className="w-12 h-5 mx-auto mt-1" /></div>
              <div className="text-center"><SkeletonText className="w-12 h-3 mx-auto" /><SkeletonText className="w-12 h-5 mx-auto mt-1" /></div>
              <div className="text-center"><SkeletonText className="w-12 h-3 mx-auto" /><SkeletonText className="w-12 h-5 mx-auto mt-1" /></div>
              <div className="text-center"><SkeletonText className="w-12 h-3 mx-auto" /><SkeletonText className="w-12 h-5 mx-auto mt-1" /></div>
            </div>

            {/* Seller Card Skeleton */}
            <div className="bg-white p-4 rounded-2xl flex items-center justify-between shadow-sm shadow-slate-200/70">
              <div className="flex items-center gap-3">
                <SkeletonBox className="w-12 h-12 rounded-full" />
                <div>
                  <SkeletonText className="w-28 h-4" />
                  <SkeletonText className="w-20 h-3 mt-1" />
                </div>
              </div>
              <SkeletonBox className="w-20 h-8 rounded-lg" />
            </div>

            {/* Bid History Skeleton */}
            <SkeletonBox className="w-full h-40 rounded-2xl" />
          </div>

          {/* Bottom Bid Section Skeleton */}
          <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white p-4 shadow-[0_-4px_10px_rgba(0,0,0,0.05)] rounded-t-3xl border-t border-slate-100 z-20">
            <div className="flex flex-col gap-3">
              <div className="flex items-start justify-between">
                <div>
                  <SkeletonText className="w-24 h-3" />
                  <SkeletonText className="w-24 h-7 mt-1" />
                </div>
                <div className="flex items-center bg-slate-50 rounded-xl border border-slate-200">
                  <SkeletonBox className="w-10 h-10 rounded-l-xl" />
                  <SkeletonText className="w-16 h-5" />
                  <SkeletonBox className="w-10 h-10 rounded-r-xl" />
                </div>
              </div>
              <SkeletonBox className="w-full h-12 rounded-xl" />
              <SkeletonText className="w-48 h-3 mx-auto" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F6F5F1] pb-32">
      <div className="mx-auto max-w-md relative">
        
        {/* Header */}
        <header className="sticky top-0 z-10 bg-white px-4 py-3 flex items-center justify-between border-b border-slate-100">
          <button onClick={() => navigate(-1)} className="p-1 hover:bg-slate-50 rounded-full transition-colors">
            <ArrowLeft size={22} className="text-[#0F1638]" />
          </button>
          <h1 className="text-[16px] font-bold text-[#0F1638]">Auction Details</h1>
          <div className="flex items-center gap-3">
            <button className="p-1 hover:bg-slate-50 rounded-full transition-colors">
              <Share2 size={18} className="text-slate-600" />
            </button>
            <button onClick={() => setIsLiked(!isLiked)} className="p-1 hover:bg-slate-50 rounded-full transition-colors">
              <Heart size={18} className={isLiked ? "fill-red-500 text-red-500" : "text-slate-600"} />
            </button>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="px-4 pt-4 pb-6">
          
          {/* Status & Title */}
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded">LIVE</span>
            <span className="flex items-center gap-1 text-[11px] text-red-500 font-medium">
              <Clock size={12} /> {auction.timeLeft}
            </span>
          </div>
          <h2 className="text-xl font-extrabold text-[#0F1638] leading-tight">{auction.title}</h2>
          <span className="inline-block mt-1.5 bg-slate-100 text-slate-500 text-[11px] font-medium px-3 py-0.5 rounded-full">
            {auction.category}
          </span>

          {/* Product Image & Description */}
          <div className="mt-4 bg-white rounded-2xl p-4 shadow-sm shadow-slate-200/70">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 flex items-center justify-center">
                <img src={auction.image} alt={auction.title} className="h-48 object-contain w-full" />
              </div>
              <div className="flex-1 flex flex-col justify-center">
                <p className="text-[13px] text-slate-600 leading-relaxed">
                  {auction.description}
                </p>
                <button className="text-[12px] font-semibold text-[#195DFF] mt-1 text-left hover:underline">
                  Read more
                </button>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="mt-4 grid grid-cols-4 gap-2 bg-white p-3 rounded-2xl shadow-sm shadow-slate-200/70">
            <div className="text-center border-r border-slate-100 last:border-r-0">
              <p className="text-[9px] text-slate-400 font-medium">Current Bid</p>
              <p className="text-[15px] font-bold text-[#195DFF]">₹{auction.currentBid.toLocaleString()}</p>
            </div>
            <div className="text-center border-r border-slate-100 last:border-r-0">
              <p className="text-[9px] text-slate-400 font-medium">Total Bids</p>
              <p className="text-[15px] font-bold text-[#0F1638]">{auction.totalBids}</p>
            </div>
            <div className="text-center border-r border-slate-100 last:border-r-0">
              <p className="text-[9px] text-slate-400 font-medium">Min Next Bid</p>
              <p className="text-[15px] font-bold text-[#0F1638]">₹{auction.minNextBid.toLocaleString()}</p>
            </div>
            <div className="text-center">
              <p className="text-[9px] text-slate-400 font-medium">Bid Increment</p>
              <p className="text-[15px] font-bold text-[#0F1638]">₹{auction.bidIncrement.toLocaleString()}</p>
            </div>
          </div>

          {/* Seller Card - NOW CLICKABLE! */}
          <div className="mt-4 bg-white p-4 rounded-2xl flex items-center justify-between shadow-sm shadow-slate-200/70">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-[#0F1638] flex items-center justify-center overflow-hidden">
                <Store size={20} className="text-white" />
              </div>
              <div>
                <div className="flex items-center gap-1">
                  <p className="text-sm font-bold text-[#0F1638]">{auction.seller.name}</p>
                  {auction.seller.verified && <CheckCircle size={14} className="text-[#195DFF] fill-[#195DFF]" />}
                </div>
                <p className="text-[11px] text-slate-500">{auction.seller.feedback}</p>
              </div>
            </div>
            
            <Link 
              to={`/shop/${auction.seller.id}`}
              className="px-4 py-1.5 rounded-lg border border-[#195DFF] text-[#195DFF] text-[12px] font-semibold hover:bg-blue-50 transition-colors"
            >
              View Seller
            </Link>
          </div>

          {/* Bid History */}
          <div className="mt-4 bg-white rounded-2xl shadow-sm shadow-slate-200/70 overflow-hidden">
            <div className="p-4 flex items-center justify-between border-b border-slate-50">
              <h4 className="text-[15px] font-bold text-[#0F1638]">Bid History</h4>
              <button className="flex items-center gap-0.5 text-[12px] font-semibold text-[#195DFF]">
                View All Bids <ChevronRight size={14} />
              </button>
            </div>
            
            <div className="divide-y divide-slate-50">
              {auction.bidHistory.map((bid) => (
                <div key={bid.id} className="flex items-center justify-between p-4 bg-white">
                  <div className="flex items-center gap-3">
                    <div className={`w-1 h-8 rounded-full ${bid.isHighest ? "bg-[#195DFF]" : "bg-transparent"}`}></div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className={`text-[13px] font-semibold ${bid.isHighest ? "text-[#0F1638]" : "text-slate-700"}`}>
                          {bid.name}
                        </p>
                        {bid.isHighest && (
                          <span className="bg-blue-50 text-[#195DFF] text-[9px] font-bold px-2 py-0.5 rounded-full">
                            Highest Bid
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[13px] font-bold text-[#0F1638]">₹ {bid.amount.toLocaleString()}</p>
                    <p className="text-[10px] text-slate-400">{bid.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Fixed Bottom Bid Section */}
        <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white p-4 shadow-[0_-4px_10px_rgba(0,0,0,0.05)] rounded-t-3xl border-t border-slate-100 z-20">
          <div className="flex flex-col gap-3">
            
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[12px] font-medium text-slate-500">Your Next Bid</p>
                <p className="text-2xl font-bold text-[#0F1638]">₹ {bidAmount.toLocaleString()}</p>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  You need to bid at least ₹ {auction.minNextBid.toLocaleString()}
                </p>
              </div>
              
              <div className="flex items-center bg-slate-50 rounded-xl border border-slate-200">
                <button 
                  onClick={handleDecrement}
                  className="w-10 h-10 flex items-center justify-center text-slate-600 hover:bg-slate-100 rounded-l-xl transition-colors"
                >
                  <Minus size={16} />
                </button>
                <span className="w-16 text-center font-bold text-[#0F1638] text-sm">{bidAmount.toLocaleString()}</span>
                <button 
                  onClick={handleIncrement}
                  className="w-10 h-10 flex items-center justify-center text-slate-600 hover:bg-slate-100 rounded-r-xl transition-colors"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            <button 
              onClick={handlePlaceBid}
              className="w-full py-3.5 rounded-xl text-white font-bold text-[15px] flex items-center justify-center gap-2 shadow-md transition-transform active:scale-[0.98]"
              style={{ backgroundColor: "#195DFF" }}
            >
              <Gavel size={18} /> Place Bid ₹ {bidAmount.toLocaleString()}
            </button>

            <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-400">
              <ShieldCheck size={14} className="text-slate-400" />
              <span>Secure Bidding • Your payment is safe with us</span>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}