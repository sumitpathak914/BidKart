import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Clock,
  MapPin,
  Gavel,
  Eye,
  Timer,
  CheckCircle,
  Trophy,
  User,
  AlertCircle,
  ShieldCheck,
  Trash2,
} from "lucide-react";

const THEME = {
  ink: "#0F1638",
  gold: "#D9A441",
  goldSoft: "#FDF3E1",
  mapBg: "#E7ECFA",
};

// Mock Data (Same as MyListingsPage, adding bid history)
const MY_LISTING_DETAILS = {
  1: {
    id: 1,
    title: "Hero Sprint 27.5T Cycle",
    image: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=400&q=80",
    status: "active",
    currentBid: "₹ 4,600",
    startingPrice: "₹ 3,200",
    bidsCount: 12,
    views: 324,
    timeLeft: "02h 15m",
    location: "Nashik, Maharashtra",
    endDate: "20 Aug 2025, 10:30 AM",
    category: "Cycles",
    description: "Premium 27.5T mountain cycle with disc brakes and 21-speed gear system. Perfect for daily commuting and off-road trails.",
    bidHistory: [
      { id: 1, user: "Rahul Patil", amount: "₹ 4,600", time: "2m ago", isHighest: true },
      { id: 2, user: "Sagar Deshmukh", amount: "₹ 4,300", time: "5m ago", isHighest: false },
      { id: 3, user: "Amit Jadhav", amount: "₹ 4,000", time: "10m ago", isHighest: false },
      { id: 4, user: "Vikram Mane", amount: "₹ 3,700", time: "15m ago", isHighest: false },
      { id: 5, user: "Pratik More", amount: "₹ 3,400", time: "20m ago", isHighest: false },
    ]
  },
  3: {
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
    category: "Electronics",
    description: "iPhone 13 in mint condition. 128GB storage, 6.1-inch display, all accessories included. One year warranty remaining.",
    winner: "Rahul Patil",
    winningAmount: "₹ 32,500",
    bidHistory: [
      { id: 1, user: "Rahul Patil", amount: "₹ 32,500", time: "Final Bid", isHighest: true },
      { id: 2, user: "Amit J.", amount: "₹ 30,000", time: "1 day ago", isHighest: false },
      { id: 3, user: "Priya S.", amount: "₹ 28,000", time: "2 days ago", isHighest: false },
    ]
  }
};

export default function MyListingDetailsPage() {
  const navigate = useNavigate();
  const { listingId } = useParams();
  const [listing, setListing] = useState(MY_LISTING_DETAILS[listingId] || MY_LISTING_DETAILS[1]);

  const handleCloseAuction = () => {
    if (listing.bidHistory.length > 0) {
      // Find the highest bidder
      const winner = listing.bidHistory.reduce((max, bid) => 
        parseInt(bid.amount.replace(/[₹,]/g, '')) > parseInt(max.amount.replace(/[₹,]/g, '')) ? bid : max
      );
      setListing({
        ...listing,
        status: "sold",
        winner: winner.user,
        winningAmount: winner.amount,
        timeLeft: "Ended",
        endDate: new Date().toLocaleDateString()
      });
      alert(`Auction Closed! Winner is ${winner.user} with bid ${winner.amount}`);
    } else {
      alert("No bids placed yet. Cannot close auction.");
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
            <h1 className="text-[17px] font-bold text-[#0F1638]">Listing Details</h1>
          </div>
          <button 
            onClick={() => navigate(-1)}
            className="px-3 py-1.5 border border-slate-200 text-slate-600 text-xs font-bold rounded-lg hover:bg-slate-50 transition-colors"
          >
            Close
          </button>
        </header>

        <div className="px-4 pt-4 pb-6 space-y-4">
          
          {/* Image Banner */}
          <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100">
            <div className="relative h-56 w-full bg-slate-100">
              <img src={listing.image} alt={listing.title} className="w-full h-full object-cover" />
              <div className="absolute top-3 left-3">
                <span className={`px-2 py-1 rounded-lg text-[10px] font-bold text-white shadow-md ${
                  listing.status === 'active' ? 'bg-green-500' : 'bg-[#D9A441]'
                }`}>
                  {listing.status === 'active' ? 'LIVE' : 'SOLD'}
                </span>
              </div>
              {listing.status === 'active' && (
                <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm text-white text-[10px] px-2 py-1 rounded-full flex items-center gap-1">
                  <Timer size={12} /> {listing.timeLeft}
                </div>
              )}
            </div>
          </div>

          {/* Title & Stats */}
          <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h2 className="text-[18px] font-extrabold text-[#0F1638] leading-tight">{listing.title}</h2>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[11px] text-slate-500">{listing.category}</span>
                  <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                  <span className="text-[11px] text-slate-500 flex items-center gap-1">
                    <MapPin size={12} /> {listing.location}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1 bg-slate-50 px-2 py-1 rounded-full">
                <Eye size={14} className="text-slate-400" />
                <span className="text-[11px] font-bold text-slate-600">{listing.views}</span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-slate-100 grid grid-cols-2 gap-4">
              <div>
                <p className="text-[10px] text-slate-500">{listing.status === 'active' ? 'Current Bid' : 'Final Bid'}</p>
                <p className="text-[20px] font-extrabold text-[#195DFF]">{listing.currentBid}</p>
              </div>
              <div>
                <p className="text-[10px] text-slate-500">Starting Price</p>
                <p className="text-[16px] font-bold text-[#0F1638]">{listing.startingPrice}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 mt-3 pt-3 border-t border-slate-100">
              <span className="flex items-center gap-1 text-[11px] text-slate-500">
                <Gavel size={14} /> {listing.bidsCount} Bids
              </span>
              {listing.status === 'active' && (
                <span className="flex items-center gap-1 text-[11px] text-red-500 font-medium">
                  <Clock size={14} /> Ends {listing.endDate}
                </span>
              )}
              {listing.status === 'sold' && (
                <span className="flex items-center gap-1 text-[11px] text-[#D9A441] font-medium">
                  <CheckCircle size={14} /> Ended on {listing.endDate}
                </span>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm">
            <h4 className="text-sm font-bold text-[#0F1638] mb-2">Description</h4>
            <p className="text-sm text-slate-600 leading-relaxed">{listing.description}</p>
          </div>

          {/* Winner Section (if sold) */}
          {listing.status === 'sold' && listing.winner && (
            <div className="bg-[#FDF3E1]/50 border-2 border-[#D9A441]/30 rounded-2xl p-4 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#D9A441] rounded-full">
                  <Trophy size={20} className="text-white" />
                </div>
                <div>
                  <p className="text-xs text-slate-500">Auction Winner</p>
                  <div className="flex items-center gap-2">
                    <p className="text-[16px] font-extrabold text-[#0F1638]">{listing.winner}</p>
                    <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded-full">Won</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">Winning Bid: <span className="font-bold text-[#195DFF]">{listing.winningAmount}</span></p>
                </div>
              </div>
            </div>
          )}

          {/* Bid History */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-slate-50 flex items-center justify-between">
              <h4 className="text-[15px] font-bold text-[#0F1638]">Bid History ({listing.bidsCount} Bids)</h4>
            </div>
            
            <div className="divide-y divide-slate-50">
              {listing.bidHistory.map((bid, index) => (
                <div key={bid.id} className="flex items-center justify-between p-4 bg-white">
                  <div className="flex items-center gap-3">
                    <div className={`w-1 h-8 rounded-full ${bid.isHighest ? "bg-[#195DFF]" : "bg-transparent"}`}></div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className={`text-[13px] font-semibold ${bid.isHighest ? "text-[#0F1638]" : "text-slate-700"}`}>
                          {bid.user}
                        </p>
                        {bid.isHighest && (
                          <span className="bg-blue-50 text-[#195DFF] text-[9px] font-bold px-2 py-0.5 rounded-full">
                            Highest Bid
                          </span>
                        )}
                      </div>
                      <p className="text-[10px] text-slate-400">{bid.time}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-[13px] font-bold text-[#0F1638]">{bid.amount}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            {listing.status === 'active' ? (
              <>
                <button 
                  onClick={handleCloseAuction}
                  className="w-full py-3.5 rounded-xl bg-red-500 text-white font-bold shadow-lg flex items-center justify-center gap-2 transition-transform hover:scale-[1.01] active:scale-95"
                >
                  <Trash2 size={18} /> Close Auction
                </button>
                <button 
                  onClick={() => navigate(-1)}
                  className="w-full py-3.5 rounded-xl border border-slate-200 text-slate-600 font-semibold flex items-center justify-center gap-2 hover:bg-slate-50 transition-colors"
                >
                  Back to Listings
                </button>
              </>
            ) : (
              <>
                <div className="bg-[#FDF3E1]/50 border border-[#D9A441]/20 rounded-xl p-3 flex items-start gap-3">
                  <AlertCircle size={16} className="text-[#D9A441] mt-0.5 flex-shrink-0" />
                  <div className="text-xs text-slate-600 flex-1">
                    <strong className="text-[#0F1638]">Auction Closed</strong><br />
                    This auction has ended. The winner has been notified.
                  </div>
                </div>
                <button 
                  onClick={() => navigate(-1)}
                  className="w-full py-3.5 rounded-xl bg-[#0F1638] text-white font-bold shadow-lg flex items-center justify-center gap-2 transition-transform hover:scale-[1.01] active:scale-95"
                >
                  Back to Listings
                </button>
              </>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}