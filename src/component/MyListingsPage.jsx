import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Plus,
  Eye,
  Edit2,
  Trash2,
  Clock,
  MapPin,
  Gavel,
  Users,
  TrendingUp,
  MoreVertical,
  CheckCircle,
  AlertCircle,
  Timer,
  Tag
} from "lucide-react";

const THEME = {
  ink: "#0F1638",
  gold: "#D9A441",
  goldSoft: "#FDF3E1",
  mapBg: "#E7ECFA",
};

// Mock Data for My Listings (Auctions listed by the user)
const MY_LISTINGS = [
  {
    id: 1,
    title: "Hero Sprint 27.5T Cycle",
    image: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=400&q=80",
    status: "active", // active, sold, draft
    currentBid: "₹ 4,600",
    startingPrice: "₹ 3,200",
    bidsCount: 12,
    views: 324,
    timeLeft: "02h 15m",
    location: "Nashik, Maharashtra",
    endDate: "20 Aug 2025, 10:30 AM",
    category: "Cycles"
  },
  {
    id: 2,
    title: "Dell Inspiron 15 3520 Laptop",
    image: "https://images.unsplash.com/photo-1593642702821-c8da6771f3c6?w=400&q=80",
    status: "active",
    currentBid: "₹ 28,500",
    startingPrice: "₹ 20,000",
    bidsCount: 18,
    views: 512,
    timeLeft: "0h 20m",
    location: "Pune, Maharashtra",
    endDate: "18 Aug 2025, 09:15 PM",
    category: "Electronics"
  },
  {
    id: 3,
    title: "iPhone 13 (128GB) - Mint Condition",
    image: "https://images.unsplash.com/photo-1632661674596-df8be070a5c5?w=400&q=80",
    status: "sold",
    currentBid: "₹ 32,500",
    startingPrice: "₹ 22,000",
    bidsCount: 26,
    views: 890,
    timeLeft: "Ended",
    location: "Mumbai, Maharashtra",
    endDate: "16 Aug 2025",
    category: "Electronics"
  },
  {
    id: 4,
    title: "boAt Wave Style Smartwatch",
    image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=400&q=80",
    status: "sold",
    currentBid: "₹ 2,050",
    startingPrice: "₹ 1,000",
    bidsCount: 9,
    views: 156,
    timeLeft: "Ended",
    location: "Nashik, Maharashtra",
    endDate: "15 Aug 2025",
    category: "Wearables"
  },
  {
    id: 5,
    title: "Modern Wooden Center Table",
    image: "https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=400&q=80",
    status: "draft",
    currentBid: "-",
    startingPrice: "₹ 1,500",
    bidsCount: 0,
    views: 0,
    timeLeft: "Not Published",
    location: "Nashik, Maharashtra",
    endDate: "-",
    category: "Furniture"
  }
];

export default function MyListingsPage() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState("active"); // active, sold, draft

  // Filter Listings
  const filteredListings = MY_LISTINGS.filter(listing => listing.status === filter);

  // Status Badge Renderer
  const getStatusBadge = (status) => {
    switch(status) {
      case 'active': return <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> Live</span>;
      case 'sold': return <span className="bg-[#FDF3E1] text-[#D9A441] text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1"><CheckCircle size={12} /> Sold</span>;
      case 'draft': return <span className="bg-slate-100 text-slate-500 text-[10px] font-bold px-2 py-1 rounded-full">Draft</span>;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#F6F5F1] pb-24">
      <div className="mx-auto max-w-md">
        
        {/* Header */}
        <header className="bg-white px-5 py-4 sticky top-0 z-10 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button onClick={() => navigate(-1)} className="p-1 hover:bg-slate-100 rounded-full transition-colors">
              <ArrowLeft size={22} className="text-[#0F1638]" />
            </button>
            <h1 className="text-[17px] font-bold text-[#0F1638]">My Listings</h1>
          </div>
          <Link 
            to="/sell"
            className="flex items-center gap-1 px-3 py-1.5 bg-[#0F1638] text-white text-xs font-bold rounded-full hover:opacity-90 transition-colors"
          >
            <Plus size={14} /> New
          </Link>
        </header>

        <div className="px-4 pt-4 pb-6 space-y-4">
          
          {/* Tabs */}
          <div className="bg-white rounded-xl p-1 shadow-sm border border-slate-100 flex">
            {[
              { id: "active", label: "Active", icon: <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> },
              { id: "sold", label: "Sold", icon: <CheckCircle size={12} className="text-[#D9A441]" /> },
              { id: "draft", label: "Drafts", icon: <Tag size={12} className="text-slate-500" /> },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id)}
                className={`flex-1 py-2 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1.5 ${
                  filter === tab.id 
                    ? "bg-[#0F1638] text-white shadow-md" 
                    : "text-slate-600 hover:text-slate-800"
                }`}
              >
                {tab.icon && tab.icon} {tab.label}
              </button>
            ))}
          </div>

          {/* Listings Grid */}
          <div className="space-y-3">
            {filteredListings.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-2xl border border-slate-100">
                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Tag size={28} className="text-slate-400" />
                </div>
                <h3 className="font-bold text-[#0F1638]">No {filter} listings</h3>
                <p className="text-xs text-slate-500 mt-1">Start selling by creating a new listing!</p>
              </div>
            ) : (
              filteredListings.map((item) => (
                <div key={item.id} className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm relative">
                  <div className="flex gap-4">
                    
                    {/* Product Image */}
                    <div className="w-24 h-24 flex-shrink-0 rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h3 className="text-[14px] font-bold text-[#0F1638] leading-tight line-clamp-2">{item.title}</h3>
                          <p className="text-[11px] text-slate-500 mt-0.5">{item.category}</p>
                        </div>
                        <div className="flex-shrink-0">
                          {getStatusBadge(item.status)}
                        </div>
                      </div>

                      {/* Price & Stats */}
                      <div className="mt-2 grid grid-cols-2 gap-1">
                        <div>
                          <p className="text-[10px] text-slate-500">{item.status === 'active' ? 'Current Bid' : 'Final Bid'}</p>
                          <p className="text-[14px] font-extrabold text-[#195DFF]">{item.currentBid}</p>
                        </div>
                        <div>
                          <p className="text-[10px] text-slate-500">Starting Price</p>
                          <p className="text-[13px] font-bold text-[#0F1638]">{item.startingPrice}</p>
                        </div>
                      </div>

                      {/* Meta Info */}
                      <div className="flex items-center gap-3 mt-2.5 flex-wrap">
                        <p className="flex items-center gap-1 text-[10px] text-slate-500">
                          <MapPin size={12} /> {item.location}
                        </p>
                        <p className="flex items-center gap-1 text-[10px] text-slate-500">
                          <Gavel size={12} /> {item.bidsCount} Bids
                        </p>
                        <p className="flex items-center gap-1 text-[10px] text-slate-500">
                          <Eye size={12} /> {item.views} Views
                        </p>
                      </div>
                      
                      {/* Timer / Status */}
                      <div className="flex items-center gap-2 mt-2">
                        {item.status === 'active' ? (
                          <span className="flex items-center gap-1 text-[10px] text-red-500 font-medium bg-red-50 px-2 py-0.5 rounded-full">
                            <Timer size={12} /> {item.timeLeft}
                          </span>
                        ) : item.status === 'sold' ? (
                          <span className="text-[10px] text-slate-500">Ended on {item.endDate}</span>
                        ) : (
                          <span className="text-[10px] text-slate-500">Not published yet</span>
                        )}
                      </div>

                    </div>
                  </div>

                  {/* Action Buttons */}
                                   {/* Action Buttons */}
                  <div className="mt-3 pt-3 border-t border-slate-100 flex justify-end gap-2">
                    {item.status === 'active' && (
                      <>
                        <button 
                          onClick={() => navigate(`/my-listing-details/${item.id}`)}
                          className="px-3 py-1.5 border border-[#0F1638] text-[#0F1638] text-[10px] font-bold rounded-lg flex items-center gap-1 hover:bg-slate-50 transition-colors"
                        >
                          <Eye size={12} /> View
                        </button>
                        {/* REMOVED EDIT OPTION */}
                      </>
                    )}
                    {item.status === 'sold' && (
                      <button 
                        onClick={() => navigate(`/my-listing-details/${item.id}`)}
                        className="px-3 py-1.5 border border-[#0F1638] text-[#0F1638] text-[10px] font-bold rounded-lg flex items-center gap-1 hover:bg-slate-50 transition-colors"
                      >
                        <Eye size={12} /> Details
                      </button>
                    )}
                    {item.status === 'draft' && (
                      <>
                        <button className="px-3 py-1.5 bg-[#0F1638] text-white text-[10px] font-bold rounded-lg flex items-center gap-1 hover:opacity-90 transition-colors">
                          <CheckCircle size={12} /> Publish
                        </button>
                        <button className="px-3 py-1.5 border border-red-200 text-red-500 text-[10px] font-bold rounded-lg flex items-center gap-1 hover:bg-red-50 transition-colors">
                          <Trash2 size={12} /> Delete
                        </button>
                      </>
                    )}
                  </div>

                </div>
              ))
            )}
          </div>

          {/* Info Banner */}
          <div className="bg-[#FDF3E1]/50 border border-[#D9A441]/20 rounded-xl p-3 flex items-start gap-3 mt-4">
            <AlertCircle size={16} className="text-[#D9A441] mt-0.5 flex-shrink-0" />
            <div className="text-xs text-slate-600 flex-1">
              <strong className="text-[#0F1638]">Manage your listings</strong><br />
              You can edit, pause, or delete your active listings. Sold items will be archived automatically.
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}