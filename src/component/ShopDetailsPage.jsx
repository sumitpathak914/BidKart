import axios from "axios";
import {
  ArrowLeft,
  BadgeCheck,
  Check,
  CheckCircle,
  Clock,
  Gavel,
  Heart,
  MapPin,
  Package,
  Phone,
  Share2,
  Shield,
  ShoppingBag,
  Star,
  Store,
  Tag,
  Truck,
  UserPlus,
  Users
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getToken, logoutUser } from "./userSession";

const THEME = {
  ink: "#0F1638",
  gold: "#D9A441",
  goldSoft: "#FDF3E1",
  mapBg: "#E7ECFA",
  primary: "#5B4DFF",
};

const API_BASE_URL = "https://test.aakarcanvassing.com";

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

export default function ShopDetailsPage() {
  const navigate = useNavigate();
  const { shopId } = useParams();
  const [activeTab, setActiveTab] = useState("portfolio");
  const [isFollowing, setIsFollowing] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  // State for Community Status
  const [isCommunityJoined, setIsCommunityJoined] = useState(false);
  const [communityRole, setCommunityRole] = useState(null); // 'owner', 'member', or null
  const [communityName, setCommunityName] = useState("Community");
  const [hasCommunity, setHasCommunity] = useState(false);
  const [communityId, setCommunityId] = useState(null);
  const [isJoiningCommunity, setIsJoiningCommunity] = useState(false);

  const [shop, setShop] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get auth token
  const getAuthToken = () => {
    return getToken();
  };

  // Follow/Join Community API
  const followCommunity = async (communityId) => {
    try {
      setIsJoiningCommunity(true);
      const token = getAuthToken();
      
      if (!token) {
        setError("Please login to join community");
        return;
      }

      const response = await axios.post(
        `${API_BASE_URL}/api/communities/${communityId}/follow`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        setIsCommunityJoined(true);
        setCommunityRole("member");
        // Show success message (optional)
        console.log("Successfully joined community");
      } else {
        setError(response.data.message || "Failed to join community");
      }
    } catch (err) {
      console.error("Error joining community:", err);
      setError(err.response?.data?.message || "Unable to join community. Please try again.");
    } finally {
      setIsJoiningCommunity(false);
    }
  };

  // Unfollow/Leave Community API
  const unfollowCommunity = async (communityId) => {
    try {
      setIsJoiningCommunity(true);
      const token = getAuthToken();
      
      if (!token) {
        setError("Please login to leave community");
        return;
      }

      const response = await axios.delete(
        `${API_BASE_URL}/api/communities/${communityId}/unfollow`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        setIsCommunityJoined(false);
        setCommunityRole(null);
        // Show success message (optional)
        console.log("Successfully left community");
      } else {
        setError(response.data.message || "Failed to leave community");
      }
    } catch (err) {
      console.error("Error leaving community:", err);
      setError(err.response?.data?.message || "Unable to leave community. Please try again.");
    } finally {
      setIsJoiningCommunity(false);
    }
  };

  // Handle Join/Leave button click
  const handleCommunityAction = () => {
    if (isCommunityJoined) {
      // If already joined, leave the community
      unfollowCommunity(communityId);
    } else {
      // If not joined, join the community
      followCommunity(communityId);
    }
  };

  // Fetch shop details from API
  const fetchShopDetails = async () => {
    setIsLoading(true);
    setError(null);

    const token = getAuthToken();
    if (!token) {
      setError("Please login to view shop details");
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.get(`${API_BASE_URL}/api/auth/ShopDetails`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        params: { shopId: shopId },
      });

      if (response.data.success) {
        const userData = response.data.data;
        const businessDetails = userData.businessDetails;

        // ✅ EXTRACT COMMUNITY DATA
        let currentCommunity = null;
        let communityExists = false;

        if (userData.communities && userData.communities.length > 0) {
          communityExists = true;
          // Find the community that matches this specific shop/business ID
          currentCommunity = userData.communities.find(
            (comm) => comm.business_id === businessDetails?.id
          ) || userData.communities[0]; // Fallback to first community if no match
        }

        // Set community state
        setHasCommunity(communityExists);

        if (currentCommunity) {
          setCommunityId(currentCommunity.id);
          setCommunityName(currentCommunity.name || "Community");

          if (currentCommunity.my_status === "owner") {
            setCommunityRole("owner");
            setIsCommunityJoined(true);
          } else if (
            currentCommunity.my_status === "member" ||
            currentCommunity.my_status === "admin"
          ) {
            setCommunityRole("member");
            setIsCommunityJoined(true);
          } else {
            setCommunityRole(null);
            setIsCommunityJoined(false);
          }
        } else {
          setCommunityId(null);
          setCommunityName("Community");
          setCommunityRole(null);
          setIsCommunityJoined(false);
        }

        // Transform API response to match shop structure
        const transformedShop = {
          id: userData.id,
          business_id: businessDetails?.id || userData.id,
          name: businessDetails?.business_name || userData.name,
          owner: userData.name,
          category: businessDetails?.business_type || "General Store",
          rating: parseFloat(businessDetails?.rating) || 4.5,
          reviewsCount: businessDetails?.total_reviews || 0,
          location: `${businessDetails?.city || ""}, ${businessDetails?.state || ""}`,
          fullAddress: businessDetails?.business_address || "Address not available",
          open: true,
          closes: businessDetails?.closing_time || "9:00 PM",
          verified: userData.is_verified === 1,
          shopIdDisplay: `SHOP${String(userData.id).padStart(4, "0")}`,
          description: businessDetails?.about || "Welcome to our shop. We provide quality products and services.",
          coverImage: businessDetails?.cover_image || "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=800&q=80",
          logoImage: businessDetails?.logo || "https://images.unsplash.com/photo-1567016432779-094069958ea5?w=200&q=80",
          followers: 0,
          productCount: 0,
          liveBids: 0,
          soldItems: 0,
          positiveRating: 98,
          joinedDate: businessDetails?.established_year ? `Since ${businessDetails.established_year}` : "Recently",
          city: businessDetails?.city || "",
          state: businessDetails?.state || "",
          pincode: businessDetails?.pincode || "",
          business_phone: businessDetails?.business_phone || "",
          opening_time: businessDetails?.opening_time || "",
          closing_time: businessDetails?.closing_time || "",
          communityData: {
            exists: communityExists,
            id: currentCommunity?.id || null,
            name: currentCommunity?.name || null,
            status: currentCommunity?.my_status || null
          },
          aboutStats: [
            { icon: Shield, label: "Quality Products", desc: "Premium & durable" },
            { icon: Tag, label: "Best Prices", desc: "Value for money" },
            { icon: BadgeCheck, label: "Secure Payments", desc: "100% safe" },
            { icon: Truck, label: "Fast Delivery", desc: "On time delivery" },
          ],
          products: [
            {
              id: 1,
              name: "Sample Product 1",
              price: "₹ 500",
              image: "https://images.unsplash.com/photo-1505797055758-07d757a8f6db?w=400&q=80",
            },
            {
              id: 2,
              name: "Sample Product 2",
              price: "₹ 750",
              image: "https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=400&q=80",
            },
          ],
          recentAuctions: [
            {
              id: 1,
              title: "Premium Product Auction",
              price: "₹ 1,200",
              time: "02h 15m",
              image: "https://images.unsplash.com/photo-1615061687972-4fbae27c3c89?w=400&q=80",
              bids: 18,
            },
            {
              id: 2,
              title: "Limited Edition Item",
              price: "₹ 800",
              time: "0h 45m",
              image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80",
              bids: 12,
            },
          ],
          reviews: [
            {
              id: 1,
              name: "Customer 1",
              rating: 5,
              date: "2 days ago",
              comment: "Great shop! Highly recommend.",
            },
            {
              id: 2,
              name: "Customer 2",
              rating: 4,
              date: "1 week ago",
              comment: "Good quality products.",
            },
          ],
        };

        setShop(transformedShop);
        setError(null);
      } else {
        setError(response.data.message || "Failed to load shop details");
      }
    } catch (err) {
      console.error("Error fetching shop details:", err);

      if (err.response?.status === 401) {
        setError("Session expired. Please login again.");
        logoutUser();
        navigate("/login");
      } else if (err.response?.status === 404) {
        setError("Shop not found");
      } else {
        setError(err.response?.data?.message || "Unable to load shop details. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Load data on component mount
  useEffect(() => {
    if (shopId) {
      fetchShopDetails();
    }
  }, [shopId]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F6F5F1] pb-24">
        <div className="mx-auto max-w-md">
          {/* Skeleton Cover Image */}
          <SkeletonBox className="relative h-48 w-full bg-slate-300 rounded-none" />

          {/* Skeleton Shop Info Section */}
          <div className="px-5 pt-12 pb-2">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mt-2">
                  <SkeletonBox className="w-20 h-20 rounded-full border-4 border-white" />
                  <div className="flex-1">
                    <SkeletonText className="w-40 h-6" />
                    <SkeletonText className="w-24 h-4 mt-2" />
                    <div className="flex items-center gap-3 mt-2">
                      <SkeletonText className="w-16 h-4" />
                      <SkeletonText className="w-16 h-4" />
                      <SkeletonText className="w-16 h-4" />
                    </div>
                  </div>
                </div>
              </div>
              <SkeletonBox className="w-20 h-8 rounded-lg" />
            </div>

            {/* Skeleton Stats Row */}
            <div className="grid grid-cols-4 gap-2 mt-4 bg-white p-3 rounded-xl shadow-sm border border-slate-100">
              <div className="text-center">
                <SkeletonText className="w-10 h-5 mx-auto" />
                <SkeletonText className="w-12 h-3 mt-1 mx-auto" />
              </div>
              <div className="text-center">
                <SkeletonText className="w-10 h-5 mx-auto" />
                <SkeletonText className="w-12 h-3 mt-1 mx-auto" />
              </div>
              <div className="text-center">
                <SkeletonText className="w-10 h-5 mx-auto" />
                <SkeletonText className="w-12 h-3 mt-1 mx-auto" />
              </div>
              <div className="text-center">
                <SkeletonText className="w-10 h-5 mx-auto" />
                <SkeletonText className="w-12 h-3 mt-1 mx-auto" />
              </div>
            </div>

            {/* Skeleton Community Card */}
            <div className="mt-3 bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <SkeletonBox className="w-12 h-12 rounded-full" />
                <div>
                  <SkeletonText className="w-32 h-4" />
                  <SkeletonText className="w-40 h-3 mt-1" />
                </div>
              </div>
              <SkeletonBox className="w-16 h-8 rounded-lg" />
            </div>
          </div>

          {/* Skeleton Tabs */}
          <div className="px-5 mt-4 border-b border-slate-200 bg-white shadow-sm">
            <div className="flex gap-6 overflow-x-auto py-3">
              <SkeletonText className="w-16 h-4" />
              <SkeletonText className="w-20 h-4" />
              <SkeletonText className="w-16 h-4" />
              <SkeletonText className="w-20 h-4" />
            </div>
          </div>

          {/* Skeleton Content Area */}
          <div className="px-5 pt-4 pb-6 space-y-4">
            <SkeletonBox className="w-full h-32 rounded-2xl" />
            <div className="flex items-center justify-between">
              <SkeletonText className="w-32 h-5" />
              <SkeletonText className="w-16 h-5" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <SkeletonBox className="w-full h-48 rounded-2xl" />
              <SkeletonBox className="w-full h-48 rounded-2xl" />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <SkeletonBox className="w-full h-28 rounded-xl" />
              <SkeletonBox className="w-full h-28 rounded-xl" />
            </div>
            <SkeletonBox className="w-full h-24 rounded-xl" />
          </div>

          {/* Skeleton Bottom Buttons */}
          <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto p-4 bg-white border-t border-slate-200 shadow-lg">
            <div className="flex gap-2">
              <SkeletonBox className="flex-1 h-12 rounded-xl" />
              <SkeletonBox className="flex-[1.5] h-12 rounded-xl" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#F6F5F1] flex items-center justify-center">
        <div className="text-center p-8 bg-white rounded-2xl shadow-sm mx-4 max-w-md">
          <Store size={64} className="mx-auto mb-4 text-slate-300" />
          <h3 className="text-lg font-bold text-[#0F1638] mb-2">Oops!</h3>
          <p className="text-sm text-slate-600">{error}</p>
          {error.includes("login") && (
            <button
              onClick={() => navigate("/login")}
              className="mt-4 px-6 py-2 bg-[#5B4DFF] text-white rounded-lg text-sm font-semibold"
            >
              Login
            </button>
          )}
          {!error.includes("login") && (
            <button
              onClick={fetchShopDetails}
              className="mt-4 px-6 py-2 bg-[#5B4DFF] text-white rounded-lg text-sm font-semibold"
            >
              Retry
            </button>
          )}
        </div>
      </div>
    );
  }

  if (!shop) return null;

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
          <span className="flex items-center gap-2">
            <MapPin size={14} className="text-[#5B4DFF]" /> {shop.location}
          </span>
          <span className="flex items-center gap-2">
            <Clock size={14} className="text-[#5B4DFF]" /> Open • Closes {shop.closes}
          </span>
          <span className="flex items-center gap-2">
            <Tag size={14} className="text-[#5B4DFF]" /> Shop ID: {shop.shopIdDisplay}
          </span>
          {shop.business_phone && (
            <span className="flex items-center gap-2">
              <Phone size={14} className="text-[#5B4DFF]" /> {shop.business_phone}
            </span>
          )}
        </div>
      </div>

      {/* Live Bids */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-bold text-[#0F1638]">
            Live Bids{" "}
            <span className="text-[10px] text-red-500 font-medium ml-1">
              •LIVE
            </span>
          </h4>
          <button className="text-sm font-semibold text-[#5B4DFF]">
            View All
          </button>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {shop.recentAuctions.map((auction) => (
            <div
              key={auction.id}
              className="bg-white rounded-2xl overflow-hidden p-3 shadow-sm border border-slate-100"
            >
              <div className="relative h-32 rounded-xl overflow-hidden mb-2">
                <img
                  src={auction.image}
                  alt={auction.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-1 left-1 bg-red-500 text-white text-[8px] px-1.5 py-0.5 rounded-full font-bold">
                  LIVE
                </div>
                <div className="absolute bottom-1 right-1 bg-black/50 backdrop-blur-sm px-2 py-0.5 rounded text-[9px] text-white flex items-center gap-1">
                  <Clock size={10} /> {auction.time}
                </div>
              </div>
              <p className="text-[11px] font-medium text-slate-800 truncate mb-1.5">
                {auction.title}
              </p>
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="text-[9px] text-slate-400">Current Bid</p>
                  <p className="text-xs font-bold text-[#0F1638]">
                    {auction.price}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[9px] text-slate-400">Bids</p>
                  <p className="text-xs font-bold text-[#0F1638]">
                    {auction.bids}
                  </p>
                </div>
              </div>
              <Link
                to={`/auction/${auction.id}`}
                className="mt-2 w-full block text-center rounded-lg py-2 text-xs font-semibold text-white"
                style={{ backgroundColor: THEME.ink }}
              >
                Place Bid
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* All Products */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-bold text-[#0F1638]">All Products</h4>
          <button className="text-sm font-semibold text-[#5B4DFF]">
            View All
          </button>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {shop.products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl overflow-hidden p-3 shadow-sm border border-slate-100 relative"
            >
              <button className="absolute top-4 right-4 z-10">
                <Heart size={14} className="text-slate-300" />
              </button>
              <div className="h-28 rounded-xl overflow-hidden mb-2">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-[11px] font-medium text-slate-800 truncate">
                {product.name}
              </p>
              <p className="text-xs font-bold text-[#0F1638] mt-0.5">
                {product.price}
              </p>
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
              <div
                key={idx}
                className="bg-white p-3 rounded-xl shadow-sm border border-slate-100 flex items-center gap-3"
              >
                <div className="p-2 bg-blue-50 rounded-full">
                  <Icon size={16} className="text-[#5B4DFF]" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-[#0F1638]">
                    {stat.label}
                  </p>
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
        <div
          key={auction.id}
          className="bg-white rounded-2xl overflow-hidden p-4 shadow-sm border border-slate-100"
        >
          <div className="flex gap-4">
            <div className="relative w-24 h-24 flex-shrink-0 rounded-xl overflow-hidden">
              <img
                src={auction.image}
                alt={auction.title}
                className="w-full h-full object-cover"
              />
              <span className="absolute top-1 left-1 bg-red-500 text-white text-[8px] px-1.5 py-0.5 rounded-full font-bold">
                LIVE
              </span>
            </div>
            <div className="flex-1">
              <h5 className="font-semibold text-[#0F1638] text-sm">
                {auction.title}
              </h5>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-sm font-bold text-[#5B4DFF]">
                  {auction.price}
                </span>
                <span className="text-xs text-slate-400 flex items-center gap-0.5">
                  <Clock size={12} /> {auction.time}
                </span>
              </div>
              <div className="flex items-center gap-3 mt-1.5">
                <span className="text-xs text-slate-500">
                  {auction.bids} bids
                </span>
                <Link
                  to={`/auction/${auction.id}`}
                  className="mt-2 w-full block text-center rounded-lg py-2 text-xs font-semibold text-white"
                  style={{ backgroundColor: THEME.ink }}
                >
                  Place Bid
                </Link>
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
        <div
          key={review.id}
          className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100"
        >
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-[#0F1638] font-bold">
              {review.name.charAt(0)}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h5 className="font-semibold text-[#0F1638] text-sm">
                  {review.name}
                </h5>
                <span className="text-xs text-slate-400">{review.date}</span>
              </div>
              <div className="flex items-center gap-0.5 mt-0.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={12}
                    className={`${star <= review.rating ? "fill-[#D9A441] text-[#D9A441]" : "text-slate-300"}`}
                  />
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
          <img
            src={shop.coverImage}
            alt={shop.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

          <button
            onClick={() => navigate(-1)}
            className="absolute top-4 left-4 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-md hover:bg-white transition-colors"
          >
            <ArrowLeft size={20} className="text-[#0F1638]" />
          </button>
          <div className="absolute top-4 right-4 flex gap-2">
            <button className="p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-md hover:bg-white">
              <Share2 size={18} className="text-[#0F1638]" />
            </button>
            <button
              onClick={() => setIsLiked(!isLiked)}
              className="p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-md hover:bg-white"
            >
              <Heart
                size={18}
                className={
                  isLiked ? "fill-red-500 text-red-500" : "text-[#0F1638]"
                }
              />
            </button>
          </div>

          {/* Logo Overlay */}
          <div className="absolute -bottom-10 left-5">
            <div className="w-20 h-20 rounded-full border-4 border-white bg-slate-200 overflow-hidden shadow-lg flex items-center justify-center">
              <img
                src={shop.logoImage}
                alt="Logo"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Shop Info Section */}
        <div className="px-5 pt-12 pb-2">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-[#0F1638]">
                  {shop.name}
                </h1>
                {shop.verified && (
                  <CheckCircle
                    size={16}
                    className="text-emerald-500 fill-emerald-500"
                  />
                )}
              </div>

              <div className="flex items-center gap-1 mt-1">
                <span className="text-[10px] text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  Verified Shop
                </span>
              </div>

              <div className="flex items-center gap-3 mt-2">
                <div className="flex items-center gap-1">
                  <span className="text-lg font-bold text-[#0F1638]">
                    {shop.rating}
                  </span>
                  <Star size={14} className="fill-[#D9A441] text-[#D9A441]" />
                </div>
                <span className="text-xs text-slate-500">
                  ({shop.reviewsCount} Reviews)
                </span>
                <span className="text-xs text-slate-300">•</span>
                <span className="text-xs text-slate-500">
                  {shop.joinedDate}
                </span>
              </div>
            </div>
          </div>

          {/* ✅ COMMUNITY CARD - With Follow/Unfollow Integration */}
          {hasCommunity && (
            <div className="mt-3 bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-[#FDF3E1] rounded-full">
                  <Users size={20} className="text-[#D9A441]" />
                </div>
                <div>
                  <p className="text-sm font-bold text-[#0F1638]">
                    {communityName}
                  </p>
                  <p className="text-[11px] text-slate-500">
                    {isCommunityJoined
                      ? communityRole === "owner"
                        ? "You are the Owner of this community"
                        : "You are a member of this community"
                      : "Join to connect with other customers"}
                  </p>
                </div>
              </div>

              {communityRole === "owner" ? (
                <span className="px-5 py-2 rounded-lg border border-[#D9A441] text-[#D9A441] bg-[#FDF3E1] text-xs font-semibold flex items-center gap-1">
                  <BadgeCheck size={14} /> Owner
                </span>
              ) : (
                <button
                  onClick={handleCommunityAction}
                  disabled={isJoiningCommunity}
                  className={`px-5 py-2 rounded-lg border text-xs font-semibold flex items-center gap-1 transition-all ${
                    isCommunityJoined
                      ? "border-red-500 text-red-600 bg-red-50 hover:bg-red-100"
                      : "border-[#5B4DFF] text-[#5B4DFF] bg-white hover:bg-blue-50"
                  } ${isJoiningCommunity ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  {isJoiningCommunity ? (
                    <>
                      <span className="inline-block w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin mr-1"></span>
                      {isCommunityJoined ? "Leaving..." : "Joining..."}
                    </>
                  ) : (
                    <>
                      {isCommunityJoined ? (
                        <>
                          <span>✕</span> Leave
                        </>
                      ) : (
                        <>
                          <UserPlus size={14} /> Join
                        </>
                      )}
                    </>
                  )}
                </button>
              )}
            </div>
          )}

          {/* Stats Row */}
          <div className="grid grid-cols-4 gap-2 mt-4 bg-white p-3 rounded-xl shadow-sm border border-slate-100">
            <div className="text-center border-r border-slate-100 last:border-r-0">
              <div className="flex items-center justify-center gap-1 text-[#0F1638] mb-0.5">
                <Package size={12} />{" "}
                <span className="font-bold text-sm">{shop.productCount}</span>
              </div>
              <p className="text-[10px] text-slate-500">Products</p>
            </div>
            <div className="text-center border-r border-slate-100 last:border-r-0">
              <div className="flex items-center justify-center gap-1 text-[#0F1638] mb-0.5">
                <Gavel size={12} />{" "}
                <span className="font-bold text-sm">{shop.liveBids}</span>
              </div>
              <p className="text-[10px] text-slate-500">Live Bids</p>
            </div>
            <div className="text-center border-r border-slate-100 last:border-r-0">
              <div className="flex items-center justify-center gap-1 text-[#0F1638] mb-0.5">
                <ShoppingBag size={12} />{" "}
                <span className="font-bold text-sm">{shop.soldItems}</span>
              </div>
              <p className="text-[10px] text-slate-500">Sold Items</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-emerald-600 mb-0.5">
                <Shield size={12} />{" "}
                <span className="font-bold text-sm">
                  {shop.positiveRating}%
                </span>
              </div>
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
                className={`py-3 text-sm font-medium border-b-2 transition-all whitespace-nowrap ${
                  activeTab === tab
                    ? "border-[#5B4DFF] text-[#5B4DFF]"
                    : "border-transparent text-slate-500"
                }`}
              >
                {tab === "portfolio"
                  ? "Portfolio"
                  : tab === "livebids"
                  ? `Live Bids (${shop.liveBids})`
                  : tab === "about"
                  ? "About Shop"
                  : `Reviews (${shop.reviewsCount})`}
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
            <button
              className="flex-1 p-2 rounded-xl border-2 border-[rgb(91,77,255)] text-[#5B4DFF] font-semibold flex items-center justify-center gap-2 bg-white"
              onClick={() => {
                if (shop.business_phone) {
                  window.location.href = `tel:${shop.business_phone}`;
                }
              }}
            >
              <Phone size={18} /> Call Shop
            </button>
            <button
              className="flex-[1.5] p-2 rounded-xl text-white font-semibold flex items-center justify-center gap-2 shadow-md"
              style={{ backgroundColor: "#5B4DFF" }}
              onClick={() => {
                if (shop.fullAddress) {
                  window.open(
                    `https://maps.google.com/?q=${encodeURIComponent(shop.fullAddress)}`
                  );
                }
              }}
            >
              <Store size={18} /> Visit Shop
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}