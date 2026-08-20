import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Gavel,
  Trophy,
  Clock,
  XCircle,
  TrendingUp,
  ChevronRight,
  Search,
  Filter,
  Calendar
} from "lucide-react";

const THEME = {
  ink: "#0F1638",
  gold: "#D9A441",
  goldSoft: "#FDF3E1",
  mapBg: "#E7ECFA",
};

// Mock Bidding Summary Data
const BIDDING_SUMMARY = {
  totalBids: 24,
  won: 12,
  lost: 7,
  live: 5
};

// Mock Recent Bids
const RECENT_BIDS = [
  {
    id: 1,
    title: "Hero Sprint 27.5T Cycle",
    amount: "₹ 4,600",
    status: "live",
    time: "2h ago",
    image: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=200&q=80"
  },
  {
    id: 2,
    title: "Nike Air Max Premium",
    amount: "₹ 1,450",
    status: "live",
    time: "1d ago",
    image: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=200&q=80"
  },
  {
    id: 3,
    title: "Canon EOS 200D DSLR",
    amount: "₹ 8,500",
    status: "won",
    time: "3d ago",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=200&q=80"
  },
  {
    id: 4,
    title: "iPhone 13 Pro Max",
    amount: "₹ 32,000",
    status: "lost",
    time: "5d ago",
    image: "https://images.unsplash.com/photo-1632661674596-df8be070a5c5?w=200&q=80"
  }
];

export default function BiddingDashboardPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("all"); // all, live, won, lost

  const filteredBids = activeTab === "all" 
    ? RECENT_BIDS 
    : RECENT_BIDS.filter(bid => bid.status === activeTab);

  // --- Function to handle navigation to BiddingDetailsPage ---
  const handleCardClick = (bid) => {
    navigate(`/bidding-details/${bid.id}`);
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
            <div>
              <h1 className="text-[17px] font-bold text-[#0F1638]">Bidding Dashboard</h1>
              <p className="text-[11px] text-slate-500">Track your bidding performance</p>
            </div>
          </div>
        </header>

        <div className="px-4 pt-4 pb-6 space-y-6">
          
          {/* Top Stats Cards */}
          <div className="grid grid-cols-4 gap-2">
            <div className="bg-white rounded-xl p-3 border border-slate-100 shadow-sm text-center">
              <div className="flex items-center justify-center gap-1 text-[#0F1638] mb-0.5">
                <Gavel size={14} />
                <p className="text-lg font-bold">{BIDDING_SUMMARY.totalBids}</p>
              </div>
              <p className="text-[9px] text-slate-500">Total Bids</p>
            </div>
            
            <div className="bg-white rounded-xl p-3 border border-slate-100 shadow-sm text-center">
              <div className="flex items-center justify-center gap-1 text-green-600 mb-0.5">
                <Trophy size={14} />
                <p className="text-lg font-bold">{BIDDING_SUMMARY.won}</p>
              </div>
              <p className="text-[9px] text-slate-500">Won</p>
            </div>
            
            <div className="bg-white rounded-xl p-3 border border-slate-100 shadow-sm text-center">
              <div className="flex items-center justify-center gap-1 text-red-500 mb-0.5">
                <XCircle size={14} />
                <p className="text-lg font-bold">{BIDDING_SUMMARY.lost}</p>
              </div>
              <p className="text-[9px] text-slate-500">Lost</p>
            </div>
            
            <div className="bg-white rounded-xl p-3 border border-slate-100 shadow-sm text-center">
              <div className="flex items-center justify-center gap-1 text-blue-500 mb-0.5">
                <Clock size={14} />
                <p className="text-lg font-bold">{BIDDING_SUMMARY.live}</p>
              </div>
              <p className="text-[9px] text-slate-500">Live</p>
            </div>
          </div>

          {/* Status Filter Tabs */}
          <div className="flex gap-2 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {[
              { id: "all", label: "All", count: RECENT_BIDS.length },
              { id: "live", label: "Live", count: RECENT_BIDS.filter(b => b.status === "live").length },
              { id: "won", label: "Won", count: RECENT_BIDS.filter(b => b.status === "won").length },
              { id: "lost", label: "Lost", count: RECENT_BIDS.filter(b => b.status === "lost").length }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                  activeTab === tab.id
                    ? "bg-[#0F1638] text-white shadow-md"
                    : "bg-white text-slate-600 border border-slate-200"
                }`}
              >
                {tab.label} ({tab.count})
              </button>
            ))}
          </div>

          {/* Recent Activity List */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-[#0F1638]">Recent Activity</h3>
              <button className="text-xs text-[#D9A441] font-medium hover:underline">View All</button>
            </div>

            {filteredBids.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-2xl border border-slate-100">
                <TrendingUp size={48} className="mx-auto text-slate-300 mb-3" />
                <h3 className="font-bold text-[#0F1638]">No bids found</h3>
                <p className="text-xs text-slate-500 mt-1">Start bidding on amazing products!</p>
              </div>
            ) : (
              filteredBids.map((bid) => (
                <div 
                  key={bid.id} 
                  onClick={() => handleCardClick(bid)} // <--- NAVIGATION ADDED HERE
                  className="bg-white rounded-2xl p-3 border border-slate-100 shadow-sm flex items-center gap-3 cursor-pointer hover:shadow-md transition-shadow"
                >
                  <div className="w-14 h-14 rounded-lg overflow-hidden bg-slate-100 flex-shrink-0">
                    <img src={bid.image} alt={bid.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-[13px] font-bold text-[#0F1638]">{bid.title}</p>
                        <p className="text-[11px] text-slate-500">{bid.amount}</p>
                      </div>
                      <div className="flex flex-col items-end gap-0.5">
                        {bid.status === 'live' ? (
                          <span className="text-[9px] text-green-600 font-bold bg-green-100 px-2 py-0.5 rounded-full">LIVE</span>
                        ) : bid.status === 'won' ? (
                          <span className="text-[9px] text-[#D9A441] font-bold bg-[#FDF3E1] px-2 py-0.5 rounded-full">WON</span>
                        ) : (
                          <span className="text-[9px] text-red-500 font-bold bg-red-100 px-2 py-0.5 rounded-full">LOST</span>
                        )}
                        <p className="text-[9px] text-slate-400">{bid.time}</p>
                      </div>
                    </div>
                  </div>
                  <ChevronRight size={16} className="text-slate-300" />
                </div>
              ))
            )}
          </div>

        </div>
      </div>
    </div>
  );
}