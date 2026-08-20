import React, { useState } from "react";
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
  Truck,
  Phone,
  CreditCard,
  MapPin,
  Banknote,
  Check,
  XCircle,
  Trophy,
  Package
} from "lucide-react";

const THEME = {
  ink: "#0F1638",
  gold: "#D9A441",
  goldSoft: "#FDF3E1",
  primaryBlue: "#195DFF",
};

// MOCK DATA for Bidding Details (Same ID structure for Live, Won, Lost)
const BIDDING_DB = {
  1: { // LIVE ITEM
    id: 1,
    title: "Hero Sprint Cycle 27.5T",
    category: "Cycles",
    description: "Durable and stylish gear cycle with high performance and smooth ride. Perfect for daily use and fitness.",
    image: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=800&q=80",
    status: "live", // live, won, lost
    // Live Fields
    timeLeft: "1h 45m left",
    currentBid: 4200,
    totalBids: 18,
    minNextBid: 4500,
    bidIncrement: 300,
    // Seller Info (for Won/Lost)
    seller: {
      id: 1,
      name: "Cycle World Nashik",
      contact: "+91 98765 43210",
      location: "Shop No. 5, College Road, Nashik, Maharashtra",
      rating: 4.8,
      verified: true
    },
    // Order Fields (for Won)
    wonAmount: "₹ 4,200",
    wonDate: "20 Aug 2025",
    deliveryAvailable: true,
    pickupAvailable: true,
    pickupLocation: "Cycle World Nashik, College Road, Nashik",
    estimatedDelivery: "2-3 Business Days",
    // Bid History
    bidHistory: [
      { id: 1, name: "Rahul Patil", amount: 4200, time: "Just now", isHighest: true },
      { id: 2, name: "Sagar Deshmukh", amount: 3900, time: "2m ago", isHighest: false },
      { id: 3, name: "Amit Jadhav", amount: 3600, time: "5m ago", isHighest: false },
      { id: 4, name: "Vikram Mane", amount: 3300, time: "8m ago", isHighest: false },
      { id: 5, name: "Pratik More", amount: 3000, time: "12m ago", isHighest: false },
    ]
  },
  2: { // WON ITEM
    id: 2,
    title: "Nike Air Max Premium",
    category: "Shoes",
    description: "Comfortable and stylish running shoes with premium air cushion technology.",
    image: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=800&q=80",
    status: "won",
    timeLeft: "Ended",
    currentBid: 1450,
    totalBids: 31,
    minNextBid: null,
    bidIncrement: null,
    seller: {
      id: 2,
      name: "Sport Zone Nashik",
      contact: "+91 98765 43211",
      location: "MG Road, Nashik, Maharashtra",
      rating: 4.6,
      verified: true
    },
    wonAmount: "₹ 1,450",
    wonDate: "15 Aug 2025",
    deliveryAvailable: false,
    pickupAvailable: true,
    pickupLocation: "Sport Zone Nashik, MG Road, Nashik",
    estimatedDelivery: "Pickup Only",
    bidHistory: [
      { id: 1, name: "You", amount: 1450, time: "Final Bid", isHighest: true },
      { id: 2, name: "Amit J.", amount: 1300, time: "1d ago", isHighest: false }
    ]
  },
  3: { // LOST ITEM
    id: 3,
    title: "Canon EOS 200D DSLR",
    category: "Cameras",
    description: "Professional entry-level DSLR with 24MP sensor and 1080p video recording.",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&q=80",
    status: "lost",
    timeLeft: "Ended",
    currentBid: 8500,
    totalBids: 22,
    minNextBid: null,
    bidIncrement: null,
    seller: {
      id: 3,
      name: "Electro World",
      contact: "+91 98765 43212",
      location: "College Road, Nashik, Maharashtra",
      rating: 4.7,
      verified: true
    },
    wonAmount: null,
    wonDate: null,
    deliveryAvailable: false,
    pickupAvailable: false,
    pickupLocation: null,
    estimatedDelivery: null,
    bidHistory: [
      { id: 1, name: "Rahul K.", amount: 8500, time: "Final Bid", isHighest: true },
      { id: 2, name: "You", amount: 8200, time: "1d ago", isHighest: false }
    ]
  }
};

export default function BiddingDetailsPage() {
  const navigate = useNavigate();
  const { auctionId } = useParams();
  const [paymentMethod, setPaymentMethod] = useState("online");
  
  // Fetch data based on ID
  const item = BIDDING_DB[auctionId] || BIDDING_DB[1];
  
  const [bidAmount, setBidAmount] = useState(item.minNextBid || 0);
  const [isLiked, setIsLiked] = useState(false);

  const handleIncrement = () => {
    setBidAmount(prev => prev + item.bidIncrement);
  };

  const handleDecrement = () => {
    if (bidAmount > item.minNextBid) {
      setBidAmount(prev => prev - item.bidIncrement);
    }
  };

  const handlePlaceBid = () => {
    alert(`Bid of ₹${bidAmount.toLocaleString()} placed successfully!`);
  };

  const handlePayNow = () => {
    if (paymentMethod === "online") {
      alert("Redirecting to secure payment gateway...");
    } else {
      alert("Order confirmed! You will pay upon delivery/pickup.");
    }
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case 'live': return <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded">LIVE</span>;
      case 'won': return <span className="bg-green-500 text-white text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1"><Trophy size={12} /> WON</span>;
      case 'lost': return <span className="bg-slate-400 text-white text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1"><XCircle size={12} /> LOST</span>;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#F6F5F1] pb-32">
      <div className="mx-auto max-w-md relative">
        
        {/* Header */}
        <header className="sticky top-0 z-10 bg-white px-4 py-3 flex items-center justify-between border-b border-slate-100">
          <button onClick={() => navigate(-1)} className="p-1 hover:bg-slate-50 rounded-full transition-colors">
            <ArrowLeft size={22} className="text-[#0F1638]" />
          </button>
          <h1 className="text-[16px] font-bold text-[#0F1638]">
            {item.status === 'won' ? 'Order Details' : item.status === 'lost' ? 'Bid Details' : 'Auction Details'}
          </h1>
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
            {getStatusBadge(item.status)}
            {item.status === 'live' && (
              <span className="flex items-center gap-1 text-[11px] text-red-500 font-medium">
                <Clock size={12} /> {item.timeLeft}
              </span>
            )}
            {item.status !== 'live' && (
              <span className="text-[11px] text-slate-400 flex items-center gap-1">
                <Clock size={12} /> Ended
              </span>
            )}
          </div>
          <h2 className="text-xl font-extrabold text-[#0F1638] leading-tight">{item.title}</h2>
          <span className="inline-block mt-1.5 bg-slate-100 text-slate-500 text-[11px] font-medium px-3 py-0.5 rounded-full">
            {item.category}
          </span>

          {/* Product Image & Description */}
          <div className="mt-4 bg-white rounded-2xl p-4 shadow-sm shadow-slate-200/70">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 flex items-center justify-center">
                <img src={item.image} alt={item.title} className="h-48 object-contain w-full" />
              </div>
              <div className="flex-1 flex flex-col justify-center">
                <p className="text-[13px] text-slate-600 leading-relaxed">
                  {item.description}
                </p>
                <button className="text-[12px] font-semibold text-[#195DFF] mt-1 text-left hover:underline">
                  Read more
                </button>
              </div>
            </div>
          </div>

          {/* Stats Grid (Dynamic based on status) */}
          <div className="mt-4 grid grid-cols-4 gap-2 bg-white p-3 rounded-2xl shadow-sm shadow-slate-200/70">
            <div className="text-center border-r border-slate-100 last:border-r-0">
              <p className="text-[9px] text-slate-400 font-medium">
                {item.status === 'won' ? 'Winning Bid' : item.status === 'lost' ? 'Final Bid' : 'Current Bid'}
              </p>
              <p className="text-[15px] font-bold text-[#195DFF]">₹{item.currentBid.toLocaleString()}</p>
            </div>
            <div className="text-center border-r border-slate-100 last:border-r-0">
              <p className="text-[9px] text-slate-400 font-medium">Total Bids</p>
              <p className="text-[15px] font-bold text-[#0F1638]">{item.totalBids}</p>
            </div>
            {item.status === 'live' ? (
              <>
                <div className="text-center border-r border-slate-100 last:border-r-0">
                  <p className="text-[9px] text-slate-400 font-medium">Min Next Bid</p>
                  <p className="text-[15px] font-bold text-[#0F1638]">₹{item.minNextBid.toLocaleString()}</p>
                </div>
                <div className="text-center">
                  <p className="text-[9px] text-slate-400 font-medium">Bid Increment</p>
                  <p className="text-[15px] font-bold text-[#0F1638]">₹{item.bidIncrement.toLocaleString()}</p>
                </div>
              </>
            ) : (
              <>
                <div className="text-center border-r border-slate-100 last:border-r-0">
                  <p className="text-[9px] text-slate-400 font-medium">Won Date</p>
                  <p className="text-[15px] font-bold text-[#0F1638]">{item.wonDate || 'N/A'}</p>
                </div>
                <div className="text-center">
                  <p className="text-[9px] text-slate-400 font-medium">Status</p>
                  <p className="text-[15px] font-bold text-[#0F1638] capitalize">{item.status}</p>
                </div>
              </>
            )}
          </div>

          {/* Seller Card - Always Visible */}
          <div className="mt-4 bg-white p-4 rounded-2xl flex items-center justify-between shadow-sm shadow-slate-200/70">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-[#0F1638] flex items-center justify-center overflow-hidden">
                <Store size={20} className="text-white" />
              </div>
              <div>
                <div className="flex items-center gap-1">
                  <p className="text-sm font-bold text-[#0F1638]">{item.seller.name}</p>
                  {item.seller.verified && <CheckCircle size={14} className="text-[#195DFF] fill-[#195DFF]" />}
                </div>
                <p className="text-[11px] text-slate-500">{item.seller.rating} ⭐ • {item.seller.location}</p>
              </div>
            </div>
            {item.status === 'won' ? (
              <button className="px-4 py-1.5 rounded-lg bg-[#195DFF] text-white text-[12px] font-semibold hover:opacity-90 flex items-center gap-1">
                <Phone size={14} /> Call
              </button>
            ) : (
              <Link 
                to={`/shop/${item.seller.id}`}
                className="px-4 py-1.5 rounded-lg border border-[#195DFF] text-[#195DFF] text-[12px] font-semibold hover:bg-blue-50 transition-colors"
              >
                View Seller
              </Link>
            )}
          </div>

          {/* Bid History - Always Visible */}
          <div className="mt-4 bg-white rounded-2xl shadow-sm shadow-slate-200/70 overflow-hidden">
            <div className="p-4 flex items-center justify-between border-b border-slate-50">
              <h4 className="text-[15px] font-bold text-[#0F1638]">Bid History</h4>
              <button className="flex items-center gap-0.5 text-[12px] font-semibold text-[#195DFF]">
                View All Bids <ChevronRight size={14} />
              </button>
            </div>
            <div className="divide-y divide-slate-50">
              {item.bidHistory.map((bid) => (
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
                            {item.status === 'lost' && bid.name !== 'You' ? 'Won' : 'Highest Bid'}
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

          {/* === DYNAMIC SECTIONS BASED ON STATUS === */}

          {/* 1. If LIVE - Show Bidding Controls */}
          {item.status === 'live' && (
            <div className="mt-4 bg-white p-4 rounded-2xl shadow-sm shadow-slate-200/70">
              <p className="text-sm font-bold text-[#0F1638] mb-2">Place Your Bid</p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] text-slate-400">Your Bid Amount</p>
                  <p className="text-2xl font-bold text-[#195DFF]">₹ {bidAmount.toLocaleString()}</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">Min Bid: ₹ {item.minNextBid.toLocaleString()}</p>
                </div>
                <div className="flex items-center bg-slate-50 rounded-xl border border-slate-200">
                  <button onClick={handleDecrement} className="w-10 h-10 flex items-center justify-center text-slate-600 hover:bg-slate-100 rounded-l-xl"><Minus size={16} /></button>
                  <span className="w-16 text-center font-bold text-[#0F1638] text-sm">{bidAmount.toLocaleString()}</span>
                  <button onClick={handleIncrement} className="w-10 h-10 flex items-center justify-center text-slate-600 hover:bg-slate-100 rounded-r-xl"><Plus size={16} /></button>
                </div>
              </div>
              <button onClick={handlePlaceBid} className="w-full mt-3 py-3 rounded-xl text-white font-bold bg-[#195DFF] shadow-lg">
                Place Bid
              </button>
            </div>
          )}

          {/* 2. If LOST - Show "Bid Again" Option */}
          {item.status === 'lost' && (
            <div className="mt-4 bg-red-50 border border-red-200 rounded-2xl p-4 text-center">
              <XCircle size={32} className="mx-auto text-red-400 mb-2" />
              <h4 className="text-[16px] font-bold text-[#0F1638]">You Lost This Auction</h4>
              <p className="text-sm text-slate-600 mt-1">Don't worry, there are plenty of other amazing items!</p>
              <button onClick={() => navigate('/explore')} className="mt-3 px-6 py-2.5 bg-[#195DFF] text-white font-bold rounded-full shadow-md">
                Browse More Items
              </button>
            </div>
          )}

          {/* 3. If WON - Show Order, Payment & Delivery Details */}
          {item.status === 'won' && (
            <div className="space-y-4 mt-4">
              
              {/* Payment Options */}
              <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm">
                <h4 className="font-bold text-[#0F1638] text-sm mb-3">Payment Method</h4>
                <div className="flex gap-3">
                  <button 
                    onClick={() => setPaymentMethod("online")}
                    className={`flex-1 py-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-colors ${paymentMethod === "online" ? "bg-[#195DFF] text-white border-[#195DFF]" : "bg-white text-slate-600 border-slate-200"}`}
                  >
                    <CreditCard size={16} /> Pay Online
                  </button>
                  <button 
                    onClick={() => setPaymentMethod("cod")}
                    className={`flex-1 py-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-colors ${paymentMethod === "cod" ? "bg-[#195DFF] text-white border-[#195DFF]" : "bg-white text-slate-600 border-slate-200"}`}
                  >
                    <Banknote size={16} /> Pay on Delivery
                  </button>
                </div>
              </div>

              {/* Delivery & Pickup */}
              <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm">
                <h4 className="font-bold text-[#0F1638] text-sm mb-3">Delivery & Pickup</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Truck size={16} className="text-[#195DFF]" />
                      <span className="text-sm font-medium text-slate-700">Home Delivery</span>
                    </div>
                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${item.deliveryAvailable ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                      {item.deliveryAvailable ? "Available" : "Not Available"}
                    </span>
                  </div>
                  {item.deliveryAvailable && (
                    <p className="text-xs text-slate-500 pl-8">Est. Delivery: {item.estimatedDelivery}</p>
                  )}
                  
                  <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                    <div className="flex items-center gap-2">
                      <Package size={16} className="text-[#195DFF]" />
                      <span className="text-sm font-medium text-slate-700">Store Pickup</span>
                    </div>
                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${item.pickupAvailable ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                      {item.pickupAvailable ? "Available" : "Not Available"}
                    </span>
                  </div>
                  {item.pickupAvailable && (
                    <p className="text-xs text-slate-500 pl-8 flex items-center gap-1">
                      <MapPin size={12} className="text-[#195DFF]" /> {item.pickupLocation}
                    </p>
                  )}
                </div>
              </div>

              {/* Order Summary & Pay Button */}
              <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-3">
                  <p className="text-sm font-bold text-[#0F1638]">Order Summary</p>
                  <span className="text-xs text-slate-400">{item.wonDate}</span>
                </div>
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm text-slate-600">{item.title}</p>
                  <p className="text-sm font-bold text-[#0F1638]">{item.wonAmount}</p>
                </div>
                <button onClick={handlePayNow} className="w-full py-3 rounded-xl text-white font-bold bg-[#195DFF] shadow-lg flex items-center justify-center gap-2">
                  <CreditCard size={18} /> {paymentMethod === "online" ? "Pay Now" : "Confirm Order"}
                </button>
                <p className="text-[10px] text-slate-400 text-center mt-2 flex items-center justify-center gap-1">
                  <ShieldCheck size={12} /> 100% Secure Transaction
                </p>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
}