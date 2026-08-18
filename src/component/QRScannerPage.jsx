import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  X,
  Camera,
  Image as ImageIcon,
  Scan,
  Flashlight,
  FlashlightOff,
  AlertCircle,
  CheckCircle,
  Store,
  MapPin,
  Star,
  Clock,
  Users,
  ShoppingBag,
  ArrowLeft,
  Zap,
  Info,
  Shield,
} from "lucide-react";

const THEME = {
  ink: "#0F1638",
  gold: "#D9A441",
  goldSoft: "#FDF3E1",
  mapBg: "#E7ECFA",
};

export default function QRScannerPage() {
  const navigate = useNavigate();
  const [scanning, setScanning] = useState(true);
  const [flashlight, setFlashlight] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [scannedData, setScannedData] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  // Mock shop data - in real app, this would come from the QR code
  const mockShopData = {
    id: 1,
    name: "Cycle World Nashik",
    owner: "Sumit Patil",
    category: "Bicycle Store",
    rating: 4.8,
    reviews: 256,
    location: "Nashik, Maharashtra",
    distance: "0.8 km",
    open: true,
    closes: "9:00 PM",
    verified: true,
    description: "Premium bicycle store offering a wide range of cycles, accessories, and repair services. Trusted by cycling enthusiasts since 2015.",
    image: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=400&q=80",
    followers: 1234,
    products: 89,
    deals: 12,
    joinedDate: "Jan 2020",
    features: [
      "🚴 Wide Range of Cycles",
      "🔧 Repair Services",
      "✨ Premium Accessories",
      "🏆 Authorized Dealer"
    ],
    recentAuctions: [
      { id: 1, title: "Hero Sprint Cycle 27.5T", price: "₹3,200", time: "18m left", image: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=400&q=80" },
      { id: 2, title: "Mountain Bike Pro", price: "₹5,500", time: "45m left", image: "https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?w=400&q=80" },
    ]
  };

  // Simulate QR code scanning
  useEffect(() => {
    if (scanning) {
      // In real app, this would be the actual QR code scanning logic
      const timer = setTimeout(() => {
        // Simulate successful scan after 3 seconds
        handleScanSuccess();
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [scanning]);

  const handleScanSuccess = () => {
    setIsLoading(true);
    setScanning(false);
    
    // Simulate processing
    setTimeout(() => {
      setScannedData(mockShopData);
      setShowResult(true);
      setIsLoading(false);
    }, 1500);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      // Simulate scanning from image
      setTimeout(() => {
        handleScanSuccess();
      }, 2000);
    }
  };

  const toggleFlashlight = () => {
    setFlashlight(!flashlight);
    // In real app, this would control device flashlight
  };

  const resetScanner = () => {
    setShowResult(false);
    setScannedData(null);
    setSelectedImage(null);
    setScanning(true);
  };

  const renderScanner = () => (
    <div className="relative h-full bg-black">
      {/* Camera View */}
      <div className="relative h-full w-full flex items-center justify-center">
        <div className="relative w-full h-full">
          {/* Simulated Camera View */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/50">
            <div className="w-full h-full flex items-center justify-center">
              {/* Scanner Frame */}
              <div className="relative w-64 h-64">
                <div className="absolute top-0 left-0 w-12 h-12 border-t-4 border-l-4 border-[#D9A441]"></div>
                <div className="absolute top-0 right-0 w-12 h-12 border-t-4 border-r-4 border-[#D9A441]"></div>
                <div className="absolute bottom-0 left-0 w-12 h-12 border-b-4 border-l-4 border-[#D9A441]"></div>
                <div className="absolute bottom-0 right-0 w-12 h-12 border-b-4 border-r-4 border-[#D9A441]"></div>
                
                {/* Scanning Line Animation */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-full h-0.5 bg-[#D9A441] animate-pulse opacity-75"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Status Text */}
          <div className="absolute bottom-20 left-0 right-0 text-center">
            <p className="text-white text-sm font-medium">
              {isLoading ? "Processing QR Code..." : "Scanning QR Code..."}
            </p>
            <p className="text-white/60 text-xs mt-1">
              {isLoading ? "Please wait..." : "Hold camera steady"}
            </p>
          </div>
        </div>
      </div>

      {/* Controls Overlay */}
      <div className="absolute top-0 left-0 right-0 p-5 flex justify-between items-start">
        <button 
          onClick={() => navigate(-1)}
          className="p-2 bg-black/40 rounded-full hover:bg-black/60 transition-colors"
        >
          <ArrowLeft size={24} className="text-white" />
        </button>
        <h2 className="text-white font-semibold text-sm bg-black/40 px-4 py-2 rounded-full">
          Scan QR Code
        </h2>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-8">
        <div className="flex justify-center gap-4">
          <button 
            onClick={toggleFlashlight}
            className="p-3 bg-white/20 backdrop-blur-md rounded-full hover:bg-white/30 transition-colors"
          >
            {flashlight ? (
              <Flashlight size={24} className="text-white" />
            ) : (
              <FlashlightOff size={24} className="text-white" />
            )}
          </button>
          
          <label className="p-3 bg-white/20 backdrop-blur-md rounded-full hover:bg-white/30 transition-colors cursor-pointer">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
            <ImageIcon size={24} className="text-white" />
          </label>
        </div>

        <div className="mt-6 text-center">
          <p className="text-white/60 text-xs">
            Or upload a QR code from your gallery
          </p>
        </div>
      </div>
    </div>
  );

  const renderShopDetails = () => {
    if (!scannedData) return null;

    return (
      <div className="h-full bg-[#F6F5F1] overflow-y-auto">
        {/* Shop Header */}
        <div className="relative">
          <div className="h-56 w-full">
            <img 
              src={scannedData.image} 
              alt={scannedData.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
            
            {/* Back Button */}
            <button 
              onClick={resetScanner}
              className="absolute top-4 left-4 p-2 bg-black/40 rounded-full hover:bg-black/60 transition-colors"
            >
              <ArrowLeft size={22} className="text-white" />
            </button>

            {/* Verified Badge */}
            {scannedData.verified && (
              <div className="absolute top-4 right-4 bg-green-500 text-white text-xs px-3 py-1.5 rounded-full flex items-center gap-1">
                <CheckCircle size={14} /> Verified
              </div>
            )}
          </div>

          {/* Shop Info */}
          <div className="relative -mt-12 px-5">
            <div className="bg-white rounded-2xl p-5 shadow-lg">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-xl bg-[#FDF3E1] flex items-center justify-center flex-shrink-0 border-4 border-white">
                  <Store size={32} className="text-[#D9A441]" />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-[#0F1638]">{scannedData.name}</h2>
                  <p className="text-sm text-slate-500">{scannedData.category}</p>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="flex items-center gap-0.5 text-sm">
                      <Star size={14} className="fill-[#D9A441] text-[#D9A441]" />
                      <span className="font-semibold text-[#0F1638]">{scannedData.rating}</span>
                      <span className="text-slate-400">({scannedData.reviews} reviews)</span>
                    </span>
                    <span className="h-1 w-1 rounded-full bg-slate-300"></span>
                    <span className="flex items-center gap-1 text-sm text-slate-500">
                      <MapPin size={14} className="text-[#D9A441]" /> {scannedData.distance}
                    </span>
                  </div>
                </div>
              </div>

              {/* Status */}
              <div className="flex items-center gap-4 mt-3 pt-3 border-t border-slate-100">
                <span className="flex items-center gap-1.5 text-sm">
                  <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
                  <span className="font-medium text-emerald-600">Open</span>
                  <span className="text-slate-400">• Closes {scannedData.closes}</span>
                </span>
                <span className="flex items-center gap-1 text-sm text-slate-500">
                  <Users size={14} /> {scannedData.followers.toLocaleString()} followers
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Shop Details */}
        <div className="px-5 mt-4 space-y-4">
          {/* Description */}
          <div className="bg-white rounded-2xl p-5">
            <h4 className="font-semibold text-[#0F1638] mb-2">About</h4>
            <p className="text-sm text-slate-600">{scannedData.description}</p>
            <div className="flex items-center gap-2 mt-3">
              <span className="text-xs text-slate-500">Joined {scannedData.joinedDate}</span>
            </div>
          </div>

          {/* Features */}
          <div className="bg-white rounded-2xl p-5">
            <h4 className="font-semibold text-[#0F1638] mb-3">Features</h4>
            <div className="grid grid-cols-2 gap-2">
              {scannedData.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2 text-sm text-slate-600">
                  <span className="text-[#D9A441]">•</span>
                  {feature}
                </div>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-white rounded-2xl p-4 text-center">
              <p className="text-xl font-bold text-[#0F1638]">{scannedData.products}</p>
              <p className="text-xs text-slate-500">Products</p>
            </div>
            <div className="bg-white rounded-2xl p-4 text-center">
              <p className="text-xl font-bold text-[#0F1638]">{scannedData.deals}</p>
              <p className="text-xs text-slate-500">Active Deals</p>
            </div>
            <div className="bg-white rounded-2xl p-4 text-center">
              <p className="text-xl font-bold text-[#0F1638]">{scannedData.followers}</p>
              <p className="text-xs text-slate-500">Followers</p>
            </div>
          </div>

          {/* Recent Auctions */}
          <div className="bg-white rounded-2xl p-5">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold text-[#0F1638]">Recent Auctions</h4>
              <button className="text-sm font-medium text-[#D9A441]">See All</button>
            </div>
            <div className="space-y-3">
              {scannedData.recentAuctions.map((auction) => (
                <div key={auction.id} className="flex items-center gap-3">
                  <img 
                    src={auction.image} 
                    alt={auction.title}
                    className="w-14 h-14 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-[#0F1638]">{auction.title}</p>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-[#D9A441]">{auction.price}</span>
                      <span className="text-xs text-slate-400 flex items-center gap-0.5">
                        <Clock size={12} /> {auction.time}
                      </span>
                    </div>
                  </div>
                  <button 
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold text-white"
                    style={{ backgroundColor: THEME.ink }}
                  >
                    Bid Now
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pb-6">
            <button 
              className="flex-1 py-3.5 rounded-xl text-white font-semibold"
              style={{ backgroundColor: THEME.gold }}
            >
              <ShoppingBag size={18} className="inline mr-2" />
              Visit Store
            </button>
            <button 
              className="flex-1 py-3.5 rounded-xl font-semibold border-2 border-slate-200 text-[#0F1638]"
            >
              <Users size={18} className="inline mr-2" />
              Follow
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="h-screen bg-black">
      <div className="mx-auto max-w-md h-full relative">
        {showResult && scannedData ? (
          renderShopDetails()
        ) : (
          renderScanner()
        )}
      </div>
    </div>
  );
}