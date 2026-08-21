import {
  ArrowRight,
  BadgeCheck,
  Boxes,
  CheckCircle,
  Check as CheckIcon,
  ChevronRight,
  Copy,
  Download,
  Edit2,
  Gavel,
  HelpCircle,
  IdCard,
  List,
  LogOut,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  QrCode,
  Settings,
  Share2, // Added for KYC
  ShieldAlert,
  ShoppingBag,
  Star,
  Store,
  TrendingUp, // Added for KYC
  Upload,
  User,
  UserCircle,
  Users,
  Users2,
  X,
  Zap,
} from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const THEME = {
  ink: "#0F1638",
  gold: "#D9A441",
  goldSoft: "#FDF3E1",
  mapBg: "#E7ECFA",
};

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("business");
  const [userType, setUserType] = useState("business"); // "business" or "customer"


  const handleLogout = () => {
   
    window.location.href = "/login"; // Redirect to homepage after logout
  };


  // --- NEW: State for Switch Business Modal ---
  const [showSwitchModal, setShowSwitchModal] = useState(false);
  const [switchForm, setSwitchForm] = useState({
    businessName: "",
    email: "",
    pan: "",
  });

  // --- NEW: State for QR Code Modal ---
  const [showQrModal, setShowQrModal] = useState(false);
  const [copied, setCopied] = useState(false);
  const qrRef = useRef(null);
  const navigate = useNavigate();

  // --- NEW: State for KYC Modal ---
  const [showKycModal, setShowKycModal] = useState(false);
  const [isKycVerified, setIsKycVerified] = useState(false); // false = Pending, true = Verified
  const [kycForm, setKycForm] = useState({
    aadhaar: "",
    pan: "",
    accountNumber: "",
    passbookImage: "",
  });

  const businessProfile = {
    id: 1,
    name: "Cycle World Nashik",
    type: "Business Account",
    email: "cyclesworld@gmail.com",
    phone: "+91 98765 43210",
    location: "Nashik, Maharashtra",
    listings: 78,
    bids: 24,
    rating: 4.8,
    joinDate: "Jan 2024",
    verified: true,
    shopUrl: "https://bidkart.com/shop/1",
  };

  const customerProfile = {
    name: "Rahul Patil",
    type: "Customer Account",
    email: "rahulpatil@gmail.com",
    phone: "+91 98765 43210",
    location: "Nashik, Maharashtra",
    wonAuctions: 12,
    bidsPlaced: 3,
    rating: 4.6,
    joinDate: "Mar 2024",
    verified: false,
  };

  const businessTools = [
    {
      id: "listings",
      label: "My Auction Listings",
      icon: List,
      desc: "Manage and track your listed items",
      count: 78,
    },
    // --- NEW: Shop QR Code Tool ---
    {
      id: "qrcode",
      label: "Shop QR Code",
      icon: QrCode,
      desc: "Generate & download QR code for your shop",
      count: null,
    },
    // --- NEW: KYC VERIFICATION TOOL ---
    {
      id: "kyc",
      label: "KYC Verification",
      icon: ShieldAlert,
      desc: "Verify your identity to sell products",
      count: null,
    },
    {
      id: "community",
      label: "My Community",
      icon: MessageCircle,
      desc: "Join & manage local communities",
      count: 3,
    },
    {
      id: "customers",
      label: "My Customers",
      icon: Users2,
      desc: "View & connect with your customer base",
      count: 158,
    },
    {
      id: "stock",
      label: "My Stock",
      icon: Boxes,
      desc: "Manage inventory and stock levels",
      count: 210,
    },
  ];

  const accountOptions = [
    {
      id: "profile",
      label: "My Profile",
      icon: User,
      desc: "View and edit your profile",
    },
    {
      id: "bids",
      label: "Biddings & Purchases",
      icon: Gavel,
      desc: "My Bids - Items you have placed bids on",
      count: 24,
    },
    {
      id: "settings",
      label: "Settings",
      icon: Settings,
      desc: "Notification, privacy & more",
    },
    {
      id: "help",
      label: "Help & Support",
      icon: HelpCircle,
      desc: "Get help and contact support",
    },
  ];

  // --- KYC Form Handlers ---
  const handleKycImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setKycForm({ ...kycForm, passbookImage: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleKycSubmit = (e) => {
    e.preventDefault();
    if (
      !kycForm.aadhaar ||
      !kycForm.pan ||
      !kycForm.accountNumber ||
      !kycForm.passbookImage
    ) {
      alert("Please fill all KYC details and upload passbook image.");
      return;
    }
    alert("KYC documents submitted successfully! Verification is pending.");
    setIsKycVerified(false); // Pending
    setShowKycModal(false);
    setKycForm({ aadhaar: "", pan: "", accountNumber: "", passbookImage: "" });
  };

  // --- Render KYC Modal ---
  const renderKycModal = () => (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white w-full max-w-md rounded-3xl overflow-hidden shadow-2xl animate-slide-up relative p-6">
        {/* Close Button */}
        <button
          onClick={() => setShowKycModal(false)}
          className="absolute top-4 right-4 p-1 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors"
        >
          <X size={20} className="text-slate-500" />
        </button>

        <div className="flex items-center gap-3 mb-4 pt-2">
          <div className="p-2 bg-[#FDF3E1] rounded-lg">
            <IdCard size={24} className="text-[#D9A441]" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-[#0F1638]">
              {isKycVerified ? "KYC Verified" : "KYC Verification"}
            </h2>
            <p className="text-xs text-slate-500">
              {isKycVerified
                ? "Your account is fully verified"
                : "Complete your KYC to unlock selling features"}
            </p>
          </div>
        </div>

        {/* Status Badge */}
        {isKycVerified ? (
          <div className="bg-green-50 border border-green-200 rounded-xl p-3 mb-4 flex items-center gap-2">
            <CheckCircle size={18} className="text-green-600" />
            <p className="text-sm font-bold text-green-700">
              Verified! You can now sell products.
            </p>
          </div>
        ) : (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 mb-4 flex items-center gap-2">
            <Clock size={18} className="text-amber-600" />
            <p className="text-sm font-bold text-amber-700">
              Pending Verification. Please submit documents.
            </p>
          </div>
        )}

        {!isKycVerified && (
          <form onSubmit={handleKycSubmit} className="space-y-3">
            <div>
              <label className="text-[11px] font-semibold text-slate-600">
                Aadhaar Card Number
              </label>
              <input
                type="text"
                placeholder="XXXX XXXX XXXX"
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm outline-none focus:border-[#D9A441] transition-colors bg-slate-50"
                value={kycForm.aadhaar}
                onChange={(e) =>
                  setKycForm({ ...kycForm, aadhaar: e.target.value })
                }
              />
            </div>

            <div>
              <label className="text-[11px] font-semibold text-slate-600">
                PAN Card Number
              </label>
              <input
                type="text"
                placeholder="ABCDE1234F"
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm outline-none focus:border-[#D9A441] transition-colors bg-slate-50"
                value={kycForm.pan}
                onChange={(e) =>
                  setKycForm({ ...kycForm, pan: e.target.value })
                }
              />
            </div>

            <div>
              <label className="text-[11px] font-semibold text-slate-600">
                Bank Account Number
              </label>
              <input
                type="text"
                placeholder="1234567890"
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm outline-none focus:border-[#D9A441] transition-colors bg-slate-50"
                value={kycForm.accountNumber}
                onChange={(e) =>
                  setKycForm({ ...kycForm, accountNumber: e.target.value })
                }
              />
            </div>

            <div>
              <label className="text-[11px] font-semibold text-slate-600">
                Upload Passbook Image
              </label>
              <div className="flex items-center gap-3">
                <label className="flex-1 cursor-pointer">
                  <div className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-600 hover:bg-slate-50 transition-colors">
                    <Upload size={16} />
                    <span>Choose Image</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleKycImageSelect}
                    />
                  </div>
                </label>
                {kycForm.passbookImage && (
                  <div className="w-12 h-12 flex-shrink-0 rounded-lg overflow-hidden border border-slate-200">
                    <img
                      src={kycForm.passbookImage}
                      alt="Passbook"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl text-white font-bold shadow-lg flex items-center justify-center gap-2 transition-transform hover:scale-[1.01] active:scale-95"
              style={{ backgroundColor: THEME.ink }}
            >
              Submit for Verification <ArrowRight size={18} />
            </button>
          </form>
        )}
      </div>
    </div>
  );

  const handleSwitchSubmit = (e) => {
    e.preventDefault();
    alert(
      `Request submitted for ${switchForm.businessName}! We will review your application shortly.`,
    );
    setShowSwitchModal(false);
    setSwitchForm({ businessName: "", email: "", pan: "" });
  };

  // --- NEW: Download QR Code ---
  const downloadQRCode = () => {
    const canvas = document.getElementById("qr-gen");
    if (canvas) {
      const pngUrl = canvas
        .toDataURL("image/png")
        .replace("image/png", "image/octet-stream");
      const downloadLink = document.createElement("a");
      downloadLink.href = pngUrl;
      downloadLink.download = `${businessProfile.name}-qr-code.png`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    }
  };

  // --- NEW: Copy Shop Link ---
  const copyShopLink = () => {
    navigator.clipboard.writeText(businessProfile.shopUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // --- NEW: Render QR Code Modal ---
  const renderQrModal = () => (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white w-full max-w-sm rounded-3xl overflow-hidden shadow-2xl animate-slide-up relative p-6">
        {/* Close Button */}
        <button
          onClick={() => setShowQrModal(false)}
          className="absolute top-4 right-4 p-1 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors"
        >
          <X size={20} className="text-slate-500" />
        </button>

        <div className="flex items-center gap-3 mb-4 pt-2">
          <div className="p-2 bg-[#FDF3E1] rounded-lg">
            <QrCode size={24} className="text-[#D9A441]" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-[#0F1638]">Shop QR Code</h2>
            <p className="text-xs text-slate-500">
              Scan to visit {businessProfile.name}
            </p>
          </div>
        </div>

        {/* QR Code Display */}
        <div className="flex justify-center py-6 bg-slate-50 rounded-xl border border-slate-200">
          <div className="p-4 bg-white rounded-xl shadow-md">
            <QRCodeSVG
              id="qr-gen"
              value={businessProfile.shopUrl}
              size={200}
              bgColor={"#ffffff"}
              fgColor={"#0F1638"}
              level={"H"}
              includeMargin={true}
            />
          </div>
        </div>

        {/* Shop Link */}
        <div className="mt-4 flex items-center gap-2 bg-slate-50 p-2 rounded-xl border border-slate-200">
          <p className="flex-1 text-xs text-slate-600 truncate px-2">
            {businessProfile.shopUrl}
          </p>
          <button
            onClick={copyShopLink}
            className="flex-shrink-0 px-3 py-1.5 bg-[#0F1638] text-white text-xs font-semibold rounded-lg flex items-center gap-1 transition-colors"
          >
            {copied ? <CheckIcon size={14} /> : <Copy size={14} />}
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mt-4">
          <button
            onClick={downloadQRCode}
            className="flex-1 py-2.5 bg-[#0F1638] text-white rounded-xl text-sm font-bold flex items-center justify-center gap-2 shadow-lg transition-transform hover:scale-105 active:scale-95"
          >
            <Download size={16} /> Download
          </button>
          <button
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: `${businessProfile.name} Shop`,
                  text: `Visit my shop at ${businessProfile.shopUrl}`,
                  url: businessProfile.shopUrl,
                });
              } else {
                copyShopLink();
              }
            }}
            className="flex-1 py-2.5 border-2 border-[#0F1638] text-[#0F1638] rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-colors hover:bg-slate-50"
          >
            <Share2 size={16} /> Share
          </button>
        </div>
      </div>
    </div>
  );

  const renderSwitchModal = () => (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white w-full max-w-md rounded-3xl overflow-hidden shadow-2xl animate-slide-up">
        {/* Modal Header with gradient */}
        <div
          className="relative p-6 text-white"
          style={{
            background: `linear-gradient(135deg, ${THEME.ink}, #2a3b7a)`,
          }}
        >
          <button
            onClick={() => setShowSwitchModal(false)}
            className="absolute top-4 right-4 p-1 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
          >
            <X size={20} className="text-white" />
          </button>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-xl">
              <Store size={24} className="text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Grow with Business Account</h2>
              <p className="text-sm text-white/80">
                Switch & unlock premium selling tools
              </p>
            </div>
          </div>
        </div>

        {/* Modal Benefits */}
        <div className="p-6 space-y-5">
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-blue-50 p-3 rounded-xl border border-blue-100">
              <div className="flex items-center gap-2 mb-1">
                <ShoppingBag size={16} className="text-[#0F1638]" />
                <p className="text-xs font-bold text-[#0F1638]">
                  Sell Products
                </p>
              </div>
              <p className="text-[10px] text-slate-500">
                List & auction your items
              </p>
            </div>
            <div className="bg-green-50 p-3 rounded-xl border border-green-100">
              <div className="flex items-center gap-2 mb-1">
                <Users size={16} className="text-green-600" />
                <p className="text-xs font-bold text-[#0F1638]">Community</p>
              </div>
              <p className="text-[10px] text-slate-500">
                Connect with local buyers
              </p>
            </div>
            <div className="bg-purple-50 p-3 rounded-xl border border-purple-100">
              <div className="flex items-center gap-2 mb-1">
                <Zap size={16} className="text-purple-600" />
                <p className="text-xs font-bold text-[#0F1638]">
                  Direct Selling
                </p>
              </div>
              <p className="text-[10px] text-slate-500">
                Sell directly without auctions
              </p>
            </div>
            <div className="bg-amber-50 p-3 rounded-xl border border-amber-100">
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp size={16} className="text-amber-600" />
                <p className="text-xs font-bold text-[#0F1638]">
                  Brand Promotion
                </p>
              </div>
              <p className="text-[10px] text-slate-500">
                Boost your brand visibility
              </p>
            </div>
          </div>

          <div className="bg-[#FDF3E1] p-3 rounded-xl border border-[#D9A441]/30 flex items-center gap-3">
            <BadgeCheck size={18} className="text-[#D9A441]" />
            <p className="text-[11px] text-slate-600 font-medium">
              Unlock auction hosting & dedicated seller dashboard instantly!
            </p>
          </div>
        </div>

        {/* Modal Form */}
        <div className="px-6 pb-6 border-t border-slate-100 pt-4">
          <form onSubmit={handleSwitchSubmit} className="space-y-3">
            <input
              type="text"
              placeholder="Business / Shop Name"
              required
              className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm outline-none focus:border-[#D9A441] transition-colors bg-slate-50"
              value={switchForm.businessName}
              onChange={(e) =>
                setSwitchForm({ ...switchForm, businessName: e.target.value })
              }
            />
            <input
              type="email"
              placeholder="Business Email"
              required
              className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm outline-none focus:border-[#D9A441] transition-colors bg-slate-50"
              value={switchForm.email}
              onChange={(e) =>
                setSwitchForm({ ...switchForm, email: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="PAN / GST Number (Optional)"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm outline-none focus:border-[#D9A441] transition-colors bg-slate-50"
              value={switchForm.pan}
              onChange={(e) =>
                setSwitchForm({ ...switchForm, pan: e.target.value })
              }
            />
            <button
              type="submit"
              className="w-full py-3.5 rounded-xl text-white font-bold shadow-lg flex items-center justify-center gap-2 transition-transform hover:scale-[1.01] active:scale-95"
              style={{ backgroundColor: THEME.ink }}
            >
              Send Request <ArrowRight size={18} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );

  const renderBusinessTools = () => (
    <div className="space-y-3">
      {businessTools.map((tool) => {
        const Icon = tool.icon;
        return (
          <button
            key={tool.id}
            onClick={() => {
              // --- UPDATED NAVIGATION LOGIC ---
              if (tool.id === "qrcode") {
                setShowQrModal(true);
              } else if (tool.id === "listings") {
                navigate("/my-listings"); // Opens MyListingsPage
              } else if (tool.id === "community") {
                navigate("/my-community"); // Opens MyCommunityPage (NEW)
              } else if (tool.id === "bids") {
                navigate("/my-bids"); // Opens MyBidsPage
              } else if (tool.id === "customers") {
                navigate("/my-customers"); // <-- Add this line
              } else if (tool.id === "won") {
                navigate("/my-bids?filter=won"); // Opens MyBidsPage pre-filtered to 'Won'
              } else if (tool.id === "kyc") {
                navigate("/kyc"); // Opens KycPage
              } else if (tool.id === "stock") {
                navigate("/my-stock"); // <-- Add this line
              } else if (tool.id === "settings") {
                navigate("/settings"); // <-- Add this line
              }
              // ------------------------------------
            }}
            className="w-full bg-white rounded-xl p-4 border border-slate-100 text-left hover:shadow-md transition-shadow flex items-center justify-between group"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[#FDF3E1] rounded-lg group-hover:bg-[#D9A441]/20 transition-colors">
                <Icon size={20} className="text-[#D9A441]" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-[#0F1638]">{tool.label}</p>
                <p className="text-xs text-slate-500">{tool.desc}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {tool.count !== null && (
                <span className="px-2 py-1 bg-slate-50 rounded-full text-[10px] font-bold text-[#0F1638] border border-slate-200">
                  {tool.count}
                </span>
              )}
              <ChevronRight
                size={18}
                className="text-slate-300 group-hover:text-[#D9A441] transition-colors"
              />
            </div>
          </button>
        );
      })}
    </div>
  );

  const renderAccountOptions = () => (
    <div className="space-y-3">
      {accountOptions.map((option) => {
        const Icon = option.icon;
        return (
          <button
            key={option.id}
            onClick={() => {
              // --- ADDED NAVIGATION LOGIC FOR PROFILE ---
              if (option.id === "profile") {
                navigate("/shop/1"); // Navigate to your Shop Details Page (ID: 1)
              } else if (option.id === "bids") {
                navigate("/bidding-dashboard"); // <-- Add this line
              } else if (option.id === "settings") {
                navigate("/settings"); // <-- Add this line
              } else if (option.id === "help") {
                navigate("/help"); // <-- Add this line
              }
              // ------------------------------------
            }}
            className="w-full bg-white rounded-xl p-4 border border-slate-100 text-left hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-slate-50 rounded-lg">
                <Icon size={20} className="text-[#0F1638]" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-[#0F1638]">{option.label}</p>
                <p className="text-xs text-slate-500">{option.desc}</p>
              </div>
              <ChevronRight size={18} className="text-slate-400" />
            </div>
          </button>
        );
      })}
    </div>
  );

  const renderBusinessFeatures = () => (
    <div className="bg-[#FDF3E1] rounded-xl p-4 border border-[#D9A441]/30">
      <div className="flex items-start gap-3">
        <div className="p-2 bg-[#D9A441] rounded-lg">
          <Store size={20} className="text-white" />
        </div>
        <div className="flex-1">
          <p className="font-semibold text-[#0F1638]">Business Account</p>
          <ul className="mt-2 space-y-1">
            <li className="flex items-center gap-2 text-xs text-slate-600">
              <CheckCircle size={12} className="text-[#D9A441]" />
              Can list items for auction
            </li>
            <li className="flex items-center gap-2 text-xs text-slate-600">
              <CheckCircle size={12} className="text-[#D9A441]" />
              Can manage their auction listings
            </li>
            <li className="flex items-center gap-2 text-xs text-slate-600">
              <CheckCircle size={12} className="text-[#D9A441]" />
              Can place bids on other items
            </li>
            <li className="flex items-center gap-2 text-xs text-slate-600">
              <CheckCircle size={12} className="text-[#D9A441]" />
              Full access to bidding and selling features
            </li>
          </ul>
        </div>
      </div>
    </div>
  );

  const renderProfileCard = (profile, isBusiness) => (
    <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
      <div className="flex items-start gap-4">
        <div className="relative">
          <div className="w-16 h-16 rounded-full bg-[#FDF3E1] flex items-center justify-center">
            <UserCircle size={40} className="text-[#D9A441]" />
          </div>
          {profile.verified && (
            <div className="absolute -bottom-1 -right-1 bg-blue-500 rounded-full p-0.5">
              <CheckCircle size={14} className="text-white fill-blue-500" />
            </div>
          )}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-[#0F1638]">{profile.name}</h2>
            <span className="text-xs bg-[#FDF3E1] text-[#D9A441] px-2 py-0.5 rounded-full font-medium">
              {isBusiness ? "Business" : "Customer"}
            </span>
          </div>
          <p className="text-sm text-slate-500">{profile.type}</p>
          <div className="flex flex-col gap-0.5 mt-1">
            <p className="text-xs text-slate-600 flex items-center gap-1">
              <Mail size={12} className="text-slate-400" /> {profile.email}
            </p>
            <p className="text-xs text-slate-600 flex items-center gap-1">
              <Phone size={12} className="text-slate-400" /> {profile.phone}
            </p>
          </div>
          <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
            <MapPin size={12} className="text-[#D9A441]" /> {profile.location}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 mt-4 pt-4 border-t border-slate-100">
        {isBusiness ? (
          <>
            <div className="text-center">
              <p className="text-xl font-bold text-[#0F1638]">
                {profile.listings}
              </p>
              <p className="text-xs text-slate-500">Active Listings</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-bold text-[#0F1638]">{profile.bids}</p>
              <p className="text-xs text-slate-500">Bids Placed</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-0.5">
                <p className="text-xl font-bold text-[#0F1638]">
                  {profile.rating}
                </p>
                <Star size={16} className="fill-[#D9A441] text-[#D9A441]" />
              </div>
              <p className="text-xs text-slate-500">Ratings</p>
            </div>
          </>
        ) : (
          <>
            <div className="text-center">
              <p className="text-xl font-bold text-[#0F1638]">
                {profile.wonAuctions}
              </p>
              <p className="text-xs text-slate-500">Won Auctions</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-bold text-[#0F1638]">
                {profile.bidsPlaced}
              </p>
              <p className="text-xs text-slate-500">Bids Placed</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-0.5">
                <p className="text-xl font-bold text-[#0F1638]">
                  {profile.rating}
                </p>
                <Star size={16} className="fill-[#D9A441] text-[#D9A441]" />
              </div>
              <p className="text-xs text-slate-500">Rating</p>
            </div>
          </>
        )}
      </div>

      <button className="w-full mt-4 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-[#0F1638] hover:bg-slate-50 transition-colors flex items-center justify-center gap-2">
        <Edit2 size={16} />
        Edit Profile
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F6F5F1] pb-24">
      {/* Render Modals if visible */}
      {showSwitchModal && renderSwitchModal()}
      {showQrModal && renderQrModal()}
      {showKycModal && renderKycModal()}

      <div className="mx-auto max-w-md">
        <header className="bg-white border-b border-slate-100 px-5 py-4 sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-[#0F1638]">Profile</h1>
              <p className="text-xs text-slate-500">Manage your account</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={handleLogout}
                className="p-2 hover:bg-slate-100 rounded-full transition-colors"
              >
                <LogOut size={20} className="text-slate-500" />
              </button>
            </div>
          </div>

          {/* <div className="flex gap-2 mt-4 bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => setUserType("business")}
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${userType === "business" ? "bg-white text-[#0F1638] shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
            >
              <div className="flex items-center justify-center gap-2">
                <Store size={16} />
                Business
              </div>
            </button>
            <button
              onClick={() => setUserType("customer")}
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${userType === "customer" ? "bg-white text-[#0F1638] shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
            >
              <div className="flex items-center justify-center gap-2">
                <User size={16} />
                Customer
              </div>
            </button>
          </div> */}
        </header>

        <div className="p-5 space-y-6">
          {/* Profile Card */}
          {userType === "business"
            ? renderProfileCard(businessProfile, true)
            : renderProfileCard(customerProfile, false)}

          {/* Account Type Label */}
          <div className="flex items-center gap-2">
            <div className="flex-1 h-px bg-slate-200"></div>
            <span className="text-xs font-medium text-slate-400">
              {userType === "business"
                ? "Business Account"
                : "Customer Account"}
            </span>
            <div className="flex-1 h-px bg-slate-200"></div>
          </div>

          {/* Business Tools (only for business account) */}
          {userType === "business" && (
            <>
              <div>
                <h3 className="text-sm font-semibold text-[#0F1638] mb-3">
                  Business Tools
                </h3>
                {renderBusinessTools()}
              </div>

              {renderBusinessFeatures()}
            </>
          )}

          {/* --- NEW: Customer Switch to Business Option --- */}
          {userType === "customer" && (
            <div className="bg-gradient-to-r from-[#0F1638] to-[#1f2d5e] rounded-2xl p-5 text-white shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full -mr-12 -mt-12"></div>
              <div className="absolute bottom-0 left-0 w-20 h-20 bg-[#D9A441]/10 rounded-full -ml-10 -mb-10"></div>

              <div className="relative z-10">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <Store size={20} className="text-[#D9A441]" />
                      <h3 className="text-[16px] font-extrabold">
                        Switch to Business
                      </h3>
                    </div>
                    <p className="text-[12px] text-white/70 mt-1 leading-relaxed max-w-[200px]">
                      Sell products, grow your community & promote your brand!
                    </p>
                  </div>
                  <button
                    onClick={() => setShowSwitchModal(true)}
                    className="px-4 py-1.5 bg-[#D9A441] rounded-full text-[#0F1638] text-xs font-bold hover:scale-105 transition-transform"
                  >
                    Upgrade
                  </button>
                </div>

                <div className="flex items-center gap-3 mt-4 pt-3 border-t border-white/10">
                  <div className="flex items-center gap-1 text-[10px] text-white/80">
                    <CheckCircle size={12} className="text-[#D9A441]" /> Sell
                    Products
                  </div>
                  <div className="flex items-center gap-1 text-[10px] text-white/80">
                    <CheckCircle size={12} className="text-[#D9A441]" /> Host
                    Auctions
                  </div>
                  <div className="flex items-center gap-1 text-[10px] text-white/80">
                    <CheckCircle size={12} className="text-[#D9A441]" /> Brand
                    Promo
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Account Options */}
          <div>
            <h3 className="text-sm font-semibold text-[#0F1638] mb-3">
              Account
            </h3>
            {renderAccountOptions()}
          </div>

          <button className="w-full py-3.5 rounded-xl border-2 border-red-200 text-red-600 font-semibold hover:bg-red-50 transition-colors flex items-center justify-center gap-2">
            <LogOut size={18} />
            Log Out
          </button>

          <p className="text-center text-xs text-slate-400">Version 1.0.0</p>
        </div>
      </div>
    </div>
  );
}
