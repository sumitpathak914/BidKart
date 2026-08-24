import {
  Bell,
  Bookmark,
  Building2,
  Check,
  ChevronRight,
  Clock,
  Coffee,
  Droplet,
  Gem,
  Gift,
  Heart,
  Home,
  Image as ImageIcon,
  Loader2,
  MapPin,
  MessageCircle,
  Music,
  Package,
  Scissors,
  Search,
  Send,
  Share2,
  Shirt,
  ShoppingBag,
  Smartphone,
  Sparkles,
  Store,
  Tag,
  TrendingUp,
  Users,
  Wifi,
  X,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

import axios from "axios";
import { useNavigate } from "react-router-dom";
// Import LocationHeader component
import LocationHeader from "./LocationHeader";
// Import location store
import { setLocation } from "./locationStore";
// Import userSession functions
import { getToken, isLoggedIn, logoutUser } from "./userSession";

const THEME = {
  ink: "#0F1638",
  gold: "#D9A441",
  goldSoft: "#FDF3E1",
  mapBg: "#E7ECFA",
};

const API_BASE_URL = "https://test.aakarcanvassing.com";

// --- SKELETON LOADER ---
const Shimmer = () => (
  <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
);

const SkeletonBox = ({ className }) => (
  <div
    className={`relative overflow-hidden bg-slate-200 rounded-xl ${className}`}
  >
    <Shimmer />
  </div>
);

const SkeletonText = ({ className }) => (
  <div
    className={`relative overflow-hidden bg-slate-200 rounded-full ${className}`}
  >
    <Shimmer />
  </div>
);

// Skeleton loader for posts
const PostSkeleton = () => (
  <div className="bg-white rounded-xl overflow-hidden border border-slate-100 shadow-sm mb-3">
    <div className="p-3 bg-slate-50 border-b border-slate-100 flex items-center gap-2">
      <SkeletonBox className="w-10 h-10 rounded-lg flex-shrink-0" />
      <div className="flex-1">
        <SkeletonText className="w-32 h-4" />
        <SkeletonText className="w-24 h-3 mt-1" />
      </div>
    </div>
    <div className="p-3">
      <div className="flex items-center gap-2">
        <SkeletonBox className="w-6 h-6 rounded-full" />
        <div>
          <SkeletonText className="w-20 h-3" />
          <SkeletonText className="w-16 h-2 mt-1" />
        </div>
      </div>
      <SkeletonText className="w-full h-4 mt-3" />
      <SkeletonText className="w-3/4 h-4 mt-1" />
      <SkeletonBox className="w-full h-32 mt-2 rounded-lg" />
      <div className="flex items-center gap-4 mt-2 pt-1.5 border-t border-slate-50">
        <SkeletonText className="w-12 h-3" />
        <SkeletonText className="w-12 h-3" />
        <SkeletonText className="w-12 h-3 ml-auto" />
      </div>
    </div>
  </div>
);

export default function CommunityPage({ onModalOpenChange }) {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("following");
  const [showCityDropdown, setShowCityDropdown] = useState(false);

  // Location states for LocationHeader
  const [userCity, setUserCity] = useState("");
  const [userState, setUserState] = useState("");

  // --- Categories from API ---
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isCategoriesLoading, setIsCategoriesLoading] = useState(true);

  // --- Community Posts State with Pagination ---
  const [communityPosts, setCommunityPosts] = useState([]);
  const [isPostsLoading, setIsPostsLoading] = useState(false);
  const [postsError, setPostsError] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
    hasMore: true,
  });
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  // --- Comments State ---
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [comments, setComments] = useState([]);
  const [isCommentsLoading, setIsCommentsLoading] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [showCommentsModal, setShowCommentsModal] = useState(false);

  // --- Like State ---
  const [likingPostId, setLikingPostId] = useState(null);

  // --- Intersection Observer Ref ---
  const observerRef = useRef(null);
  const lastPostRef = useRef(null);

  // --- Fetch Categories from API ---
  const fetchCategories = async () => {
    setIsCategoriesLoading(true);
    try {
      const response = await axios.get(
        "https://test.aakarcanvassing.com/api/categories/active",
      );

      if (response.data.success && response.data.data) {
        const allCategories = [
          { id: "all", name: "All", categoryId: null },
          ...response.data.data.map((cat) => ({
            id: cat.id.toString(),
            name: cat.name,
            categoryId: cat.id,
          })),
        ];
        setCategories(allCategories);
      }
    } catch (err) {
      console.error("Error fetching categories:", err);
      setCategories([
        { id: "all", name: "All", categoryId: null },
        { id: "1", name: "Clothing", categoryId: 1 },
        { id: "2", name: "Beauty", categoryId: 2 },
        { id: "3", name: "Jewelry", categoryId: 3 },
      ]);
    } finally {
      setIsCategoriesLoading(false);
    }
  };

  // --- Get Current Location ---
  const getCurrentLocation = () => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error("Geolocation not supported"));
        return;
      }
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => reject(error),
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 },
      );
    });
  };

  // --- Get City and State from Coordinates ---
  const getLocationDetails = async (lat, lng) => {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=10&addressdetails=1`,
      );
      if (response.data && response.data.address) {
        const address = response.data.address;
        const city =
          address.city ||
          address.town ||
          address.village ||
          address.municipality ||
          "";
        const state = address.state || address.region || "";
        return { city, state };
      }
      return { city: "", state: "" };
    } catch (error) {
      console.error("Error getting location details:", error);
      return { city: "", state: "" };
    }
  };

  // ==================== API: FETCH POSTS WITH PAGINATION ====================
  const fetchPosts = async (
    type,
    categoryId = "all",
    page = 1,
    append = false,
  ) => {
    if (append) {
      setIsLoadingMore(true);
    } else {
      setIsPostsLoading(true);
    }
    setPostsError(null);

    try {
      const token = getToken();
      if (!token) {
        setPostsError("Please login to view posts");
        setIsPostsLoading(false);
        setIsLoadingMore(false);
        return;
      }

      if (!isLoggedIn()) {
        setPostsError("Session expired. Please login again.");
        setIsPostsLoading(false);
        setIsLoadingMore(false);
        return;
      }

      let url = `${API_BASE_URL}/api/communities/posts?type=${type}&page=${page}&limit=10`;

      if (categoryId && categoryId !== "all") {
        url += `&category=${categoryId}`;
      }

      if (type === "city") {
        url += `&city=${encodeURIComponent(userCity)}`;
        if (userState) {
          url += `&state=${encodeURIComponent(userState)}`;
        }
      }

      console.log("Fetching posts from:", url);

      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      console.log("Posts response:", response.data);

      if (response.data.success) {
        const newPosts = response.data.data || [];
        const paginationData = response.data.pagination || {};

        if (append) {
          setCommunityPosts((prev) => [...prev, ...newPosts]);
        } else {
          setCommunityPosts(newPosts);
        }

        setPagination({
          page: paginationData.page || page,
          limit: paginationData.limit || 10,
          total: paginationData.total || 0,
          totalPages: paginationData.totalPages || 0,
          hasMore: paginationData.page < paginationData.totalPages,
        });

        setPostsError(null);
      } else {
        setPostsError(response.data.message || "Failed to load posts");
        if (!append) {
          setCommunityPosts([]);
        }
      }
    } catch (err) {
      console.error("Error fetching posts:", err);
      if (err.response?.status === 401) {
        setPostsError("Session expired. Please login again.");
        logoutUser();
        navigate("/login");
      } else {
        setPostsError(err.response?.data?.message || "Failed to load posts");
      }
      if (!append) {
        setCommunityPosts([]);
      }
    } finally {
      setIsPostsLoading(false);
      setIsLoadingMore(false);
    }
  };

  // ==================== LOAD MORE POSTS ====================
  const loadMorePosts = useCallback(() => {
    if (!pagination.hasMore || isLoadingMore || isPostsLoading) {
      return;
    }
    const nextPage = pagination.page + 1;
    fetchPosts(activeTab, selectedCategory, nextPage, true);
  }, [pagination, isLoadingMore, isPostsLoading, activeTab, selectedCategory]);

  // ==================== SETUP INTERSECTION OBSERVER ====================
  useEffect(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMorePosts();
        }
      },
      { threshold: 0.1 },
    );

    if (lastPostRef.current) {
      observerRef.current.observe(lastPostRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [communityPosts, loadMorePosts]);

  // ==================== API: FETCH COMMENTS ====================
  const fetchComments = async (postId) => {
    setIsCommentsLoading(true);
    try {
      const token = getToken();
      if (!token) {
        return;
      }

      const response = await axios.get(
        `${API_BASE_URL}/api/communities/posts/${postId}/comments`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );

      if (response.data.success) {
        setComments(response.data.data || []);
      } else {
        setComments([]);
      }
    } catch (err) {
      console.error("Error fetching comments:", err);
      setComments([]);
    } finally {
      setIsCommentsLoading(false);
    }
  };

  // ==================== API: ADD COMMENT ====================
  const addComment = async (postId) => {
    if (!commentText.trim()) return;

    try {
      const token = getToken();
      if (!token) {
        alert("Please login to comment");
        return;
      }

      const response = await axios.post(
        `${API_BASE_URL}/api/communities/posts/${postId}/comments`,
        { content: commentText.trim() },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );

      if (response.data.success) {
        setCommentText("");
        await fetchComments(postId);
        // Update post comment count
        setCommunityPosts((prev) =>
          prev.map((post) =>
            post.id === postId
              ? { ...post, comments_count: (post.comments_count || 0) + 1 }
              : post,
          ),
        );
      }
    } catch (err) {
      console.error("Error adding comment:", err);
      alert(err.response?.data?.message || "Failed to add comment");
    }
  };

  // ==================== API: LIKE POST ====================
  const handleLike = async (postId) => {
    setLikingPostId(postId);
    try {
      const token = getToken();
      if (!token) {
        alert("Please login to like");
        setLikingPostId(null);
        return;
      }

      const response = await axios.post(
        `${API_BASE_URL}/api/communities/posts/${postId}/like`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );

      if (response.data.success) {
        setCommunityPosts((prev) =>
          prev.map((post) =>
            post.id === postId
              ? {
                  ...post,
                  likes_count: response.data.liked
                    ? (post.likes_count || 0) + 1
                    : (post.likes_count || 0) - 1,
                  is_liked: response.data.liked,
                }
              : post,
          ),
        );
      }
    } catch (err) {
      console.error("Error liking post:", err);
    } finally {
      setLikingPostId(null);
    }
  };

  // ==================== HANDLE TAB CHANGE ====================
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setCommunityPosts([]);
    setPagination({
      page: 1,
      limit: 10,
      total: 0,
      totalPages: 0,
      hasMore: true,
    });
    fetchPosts(tab, selectedCategory, 1, false);
  };

  // ==================== HANDLE CATEGORY CHANGE ====================
  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    setCommunityPosts([]);
    setPagination({
      page: 1,
      limit: 10,
      total: 0,
      totalPages: 0,
      hasMore: true,
    });
    fetchPosts(activeTab, categoryId, 1, false);
  };

  // ==================== OPEN COMMENTS MODAL ====================
  const openCommentsModal = (postId) => {
    setSelectedPostId(postId);
    setShowCommentsModal(true);
    fetchComments(postId);
    // Notify parent that modal is open to hide BottomNav
    if (onModalOpenChange) {
      onModalOpenChange(true);
    }
  };

  // ==================== CLOSE COMMENTS MODAL ====================
  const closeCommentsModal = () => {
    setShowCommentsModal(false);
    setSelectedPostId(null);
    setComments([]);
    setCommentText("");
    // Notify parent that modal is closed to show BottomNav
    if (onModalOpenChange) {
      onModalOpenChange(false);
    }
  };

  // ==================== HANDLE LOCATION UPDATE ====================
  const handleLocationUpdate = async (city, state) => {
    if (city && state) {
      setUserCity(city);
      setUserState(state);
      setLocation({ city, state });

      setCommunityPosts([]);
      setPagination({
        page: 1,
        limit: 10,
        total: 0,
        totalPages: 0,
        hasMore: true,
      });
      setTimeout(() => {
        fetchPosts(activeTab, selectedCategory, 1, false);
      }, 300);
    }
  };

  // ==================== INITIALIZE ====================
  useEffect(() => {
    const initialize = async () => {
      await fetchCategories();

      try {
        const location = await getCurrentLocation();
        const details = await getLocationDetails(location.lat, location.lng);
        if (details.city && details.state) {
          setUserCity(details.city);
          setUserState(details.state);
          setLocation({ city: details.city, state: details.state });
        }
      } catch (error) {
        console.error("Location detection failed:", error);
        setUserCity("Nashik");
        setUserState("Maharashtra");
        setLocation({ city: "Nashik", state: "Maharashtra" });
      }

      fetchPosts("following", "all", 1, false);
      setIsLoading(false);
    };

    initialize();

    // Cleanup: Ensure modal state is reset if component unmounts
    return () => {
      if (showCommentsModal && onModalOpenChange) {
        onModalOpenChange(false);
      }
    };
  }, []);

  // --- Get category icon ---
  const getCategoryIcon = (categoryName) => {
    const iconMap = {
      All: Store,
      Clothing: Shirt,
      Beauty: Sparkles,
      Jewelry: Gem,
      Salon: Scissors,
      "Skin Care": Droplet,
      Fashion: Tag,
      Lifestyle: Coffee,
      "Agriculture Products": Package,
      "Art & Handicrafts": Building2,
      "Automobile Accessories": Wifi,
      "Books & Stationery": Bookmark,
      "Cameras & Photography": ImageIcon,
      "Collectibles & Antiques": Clock,
      "Computer & Laptop Accessories": Package,
      "Construction Materials": Building2,
      "Cycles & Bikes": MapPin,
      "Footwear & Bags": ShoppingBag,
      "Furniture & Home Decor": Home,
      "Gaming & Gadgets": TrendingUp,
      "Gift Items": Gift,
      "Health & Wellness": Heart,
      "Home Appliances": Package,
      "Industrial Equipment": Building2,
      Jewellery: Gem,
      "Kitchen & Dining": Coffee,
      "Mobile Accessories": Smartphone,
      "Mobiles & Electronics": Package,
      "Musical Instruments": Music,
      "Office Supplies": Package,
      Other: Store,
      "Pet Supplies": Users,
      "Sports & Fitness": TrendingUp,
      "Tools & Equipment": Package,
      "Toys & Kids Products": Users,
      "Watches & Accessories": Clock,
    };
    return iconMap[categoryName] || Store;
  };

  // --- Format time ---
  const formatTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  // ==================== RENDER POSTS ====================
  const renderPosts = () => {
    if (isPostsLoading && communityPosts.length === 0) {
      return (
        <div className="space-y-3">
          <PostSkeleton />
          <PostSkeleton />
          <PostSkeleton />
        </div>
      );
    }

    if (postsError && communityPosts.length === 0) {
      return (
        <div className="text-center py-8">
          <Store size={48} className="text-slate-300 mx-auto mb-3" />
          <h3 className="text-sm font-bold text-[#0F1638]">No Posts Found</h3>
          <p className="text-xs text-slate-500 mt-1">{postsError}</p>
          <button
            onClick={() => fetchPosts(activeTab, selectedCategory, 1, false)}
            className="mt-3 px-4 py-2 bg-[#D9A441] text-white rounded-lg text-xs font-semibold"
          >
            Retry
          </button>
        </div>
      );
    }

    if (communityPosts.length === 0) {
      return (
        <div className="text-center py-8">
          <Store size={48} className="text-slate-300 mx-auto mb-3" />
          <h3 className="text-sm font-bold text-[#0F1638]">No Posts Yet</h3>
          <p className="text-xs text-slate-500 mt-1">
            {activeTab === "following"
              ? "Follow communities to see their posts here"
              : `No posts found in ${userCity || "your area"}`}
          </p>
        </div>
      );
    }

    return (
      <>
        {communityPosts.map((post, index) => {
          const isLast = index === communityPosts.length - 1;
          return (
            <div
              key={post.id}
              ref={isLast ? lastPostRef : null}
              className="bg-white rounded-xl overflow-hidden border border-slate-100 shadow-sm mb-3"
            >
              {/* Community/Shop Info */}
              <div
                className="p-3 bg-slate-50 border-b border-slate-100 flex items-center gap-2 cursor-pointer hover:bg-slate-100 transition-colors"
                onClick={() => navigate(`/shop/${post.business_id}`)}
              >
                <div className="w-10 h-10 rounded-lg overflow-hidden bg-slate-200 flex-shrink-0">
                  <img
                    src={
                      post.community_logo ||
                      "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=100&q=80"
                    }
                    alt={post.community_name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-1.5">
                    <p className="text-sm font-bold text-[#0F1638]">
                      {post.community_name}
                    </p>
                    {post.is_verified && (
                      <Check size={12} className="text-blue-500" />
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-[10px] text-slate-500">
                    <span>{post.community_category}</span>
                    <span>•</span>
                    <span className="flex items-center gap-0.5">
                      <MapPin size={10} /> {post.community_location || "Local"}
                    </span>
                  </div>
                </div>
                <ChevronRight size={14} className="text-slate-400" />
              </div>

              {/* Post Content */}
              <div className="p-3">
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="w-6 h-6 rounded-full overflow-hidden bg-slate-200 flex-shrink-0">
                    <img
                      src={
                        post.author_image ||
                        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80"
                      }
                      alt={post.author_name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-[#0F1638]">
                      {post.author_name}
                    </p>
                    <p className="text-[9px] text-slate-400">
                      {formatTime(post.created_at)}
                    </p>
                  </div>
                  {post.is_announcement && (
                    <span className="ml-auto text-[8px] bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded-full">
                      Announcement
                    </span>
                  )}
                  {post.is_pinned && (
                    <span className="ml-auto text-[8px] bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded-full">
                      Pinned
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-700 whitespace-pre-wrap">
                  {post.content}
                </p>

                {/* Post Images */}
                {post.media_urls && post.media_urls.length > 0 && (
                  <div
                    className={`mt-2 grid ${post.media_urls.length === 1 ? "grid-cols-1" : "grid-cols-2"} gap-1.5`}
                  >
                    {post.media_urls.slice(0, 2).map((media, idx) => (
                      <div
                        key={idx}
                        className="rounded-lg overflow-hidden bg-slate-100 h-32 cursor-pointer"
                        onClick={() => window.open(media.url, "_blank")}
                      >
                        {media.type === "video" ? (
                          <video
                            src={media.url}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <img
                            src={media.url}
                            alt="Post"
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>
                    ))}
                    {post.media_urls.length > 2 && (
                      <div className="col-span-full text-center text-xs text-slate-400 mt-1">
                        +{post.media_urls.length - 2} more
                      </div>
                    )}
                  </div>
                )}

                {/* Post Actions */}
                <div className="flex items-center gap-4 mt-2 pt-1.5 border-t border-slate-50">
                  <button
                    onClick={() => handleLike(post.id)}
                    disabled={likingPostId === post.id}
                    className="flex items-center gap-1 text-[10px] text-slate-400 hover:text-red-500 transition-colors"
                  >
                    {likingPostId === post.id ? (
                      <Loader2 size={13} className="animate-spin" />
                    ) : (
                      <Heart
                        size={13}
                        className={
                          post.is_liked ? "fill-red-500 text-red-500" : ""
                        }
                      />
                    )}
                    {post.likes_count || 0}
                  </button>
                  <button
                    onClick={() => openCommentsModal(post.id)}
                    className="flex items-center gap-1 text-[10px] text-slate-400 hover:text-[#D9A441] transition-colors"
                  >
                    <MessageCircle size={13} /> {post.comments_count || 0}
                  </button>
                  <button className="flex items-center gap-1 text-[10px] text-slate-400 hover:text-[#D9A441] transition-colors ml-auto">
                    <Share2 size={13} /> Share
                  </button>
                </div>
              </div>
            </div>
          );
        })}

        {/* Loading More Indicator */}
        {isLoadingMore && (
          <div className="flex justify-center py-4">
            <Loader2 size={24} className="animate-spin text-[#D9A441]" />
          </div>
        )}

        {/* No More Posts */}
        {!pagination.hasMore && communityPosts.length > 0 && (
          <div className="text-center py-4">
            <p className="text-xs text-slate-400">No more posts to load</p>
          </div>
        )}
      </>
    );
  };

  // ==================== COMMENTS MODAL ====================
  const renderCommentsModal = () => {
    if (!showCommentsModal) return null;

    return (
      <div className="fixed inset-0 z-50 bg-black/50 flex items-end justify-center">
        <div className="bg-white w-full max-w-md rounded-t-3xl max-h-[90vh] flex flex-col animate-slide-up">
          {/* Modal Header */}
          <div className="flex items-center justify-between p-4 border-b border-slate-100 flex-shrink-0">
            <h3 className="text-lg font-bold text-[#0F1638]">Comments</h3>
            <button
              onClick={closeCommentsModal}
              className="p-1 hover:bg-slate-100 rounded-full transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Comments List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {isCommentsLoading ? (
              <div className="flex justify-center py-8">
                <Loader2 size={24} className="animate-spin text-[#D9A441]" />
              </div>
            ) : comments.length === 0 ? (
              <div className="text-center py-8">
                <MessageCircle
                  size={40}
                  className="text-slate-300 mx-auto mb-2"
                />
                <p className="text-sm text-slate-500">No comments yet</p>
                <p className="text-xs text-slate-400">
                  Be the first to comment
                </p>
              </div>
            ) : (
              comments.map((comment) => (
                <div key={comment.id} className="flex gap-3">
                  <div className="w-8 h-8 rounded-full overflow-hidden bg-slate-200 flex-shrink-0">
                    <img
                      src={
                        comment.user_image ||
                        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80"
                      }
                      alt={comment.user_name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="bg-slate-50 rounded-xl p-3">
                      <p className="text-xs font-semibold text-[#0F1638]">
                        {comment.user_name}
                      </p>
                      <p className="text-xs text-slate-700 mt-0.5">
                        {comment.content}
                      </p>
                    </div>
                    <p className="text-[9px] text-slate-400 mt-1">
                      {formatTime(comment.created_at)}
                    </p>

                    {/* Replies */}
                    {comment.replies && comment.replies.length > 0 && (
                      <div className="mt-2 ml-4 space-y-2">
                        {comment.replies.map((reply) => (
                          <div key={reply.id} className="flex gap-2">
                            <div className="w-6 h-6 rounded-full overflow-hidden bg-slate-200 flex-shrink-0">
                              <img
                                src={
                                  reply.user_image ||
                                  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80"
                                }
                                alt={reply.user_name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1">
                              <div className="bg-slate-50 rounded-xl p-2">
                                <p className="text-[10px] font-semibold text-[#0F1638]">
                                  {reply.user_name}
                                </p>
                                <p className="text-[10px] text-slate-700 mt-0.5">
                                  {reply.content}
                                </p>
                              </div>
                              <p className="text-[8px] text-slate-400 mt-0.5">
                                {formatTime(reply.created_at)}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Comment Input */}
          <div className="p-4 border-t border-slate-100 flex-shrink-0">
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Write a comment..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    addComment(selectedPostId);
                  }
                }}
                className="flex-1 px-4 py-2 rounded-xl border border-slate-200 focus:border-[#D9A441] focus:outline-none text-sm"
              />
              <button
                onClick={() => addComment(selectedPostId)}
                disabled={!commentText.trim()}
                className="p-2 rounded-full bg-[#D9A441] text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#c8943a] transition-colors"
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ==================== SKELETON VIEW ====================
  if (isLoading || isCategoriesLoading) {
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
            <div className="flex gap-2 overflow-x-auto pb-3">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <SkeletonBox
                  key={i}
                  className="w-20 h-8 rounded-full flex-shrink-0"
                />
              ))}
            </div>
            <div className="flex bg-slate-100 p-1 rounded-xl mb-4">
              <SkeletonBox className="flex-1 h-9 rounded-lg" />
              <SkeletonBox className="flex-1 h-9 rounded-lg" />
            </div>
            <PostSkeleton />
            <PostSkeleton />
            <PostSkeleton />
          </div>
        </div>
      </div>
    );
  }

  // ==================== MAIN RENDER ====================
  return (
    <div className="min-h-screen bg-[#F6F5F1] pb-24">
      <div className="mx-auto max-w-md">
        {/* Location Header Component */}
        <LocationHeader
          userCity={userCity}
          setUserCity={setUserCity}
          userState={userState}
          setUserState={setUserState}
          onLocationUpdate={handleLocationUpdate}
          rightComponent={
            <button className="relative flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm">
              <Bell size={17} style={{ color: THEME.ink }} />
              <span
                className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full text-[10px] font-bold text-white"
                style={{ backgroundColor: THEME.gold }}
              >
                5
              </span>
            </button>
          }
        />

        {/* Community Title */}
        <div className="px-5 mt-2">
          <h1 className="text-xl font-bold text-[#0F1638]">Community</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Connect with local shops and businesses in your area
          </p>
        </div>

        {/* Search Bar */}
        <div className="px-5 mt-3">
          <div className="relative">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="text"
              placeholder={`Search in ${userCity || "your area"}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 focus:border-[#D9A441] focus:outline-none transition-colors bg-white"
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="p-5">
          {/* Categories from API */}
          <div className="flex gap-2 overflow-x-auto pb-3 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {categories.map((category) => {
              const Icon = getCategoryIcon(category.name);
              const isActive = selectedCategory === category.id;
              return (
                <button
                  key={category.id}
                  onClick={() => handleCategoryChange(category.id)}
                  className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                    isActive
                      ? "bg-[#0F1638] text-white"
                      : "bg-white text-slate-600 border border-slate-200"
                  }`}
                >
                  <Icon size={14} />
                  {category.name}
                </button>
              );
            })}
          </div>

          {/* Tabs - Following / City Posts */}
          <div className="flex bg-slate-100 p-1 rounded-xl mb-4">
            <button
              onClick={() => handleTabChange("following")}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === "following"
                  ? "bg-white text-[#0F1638] shadow-sm"
                  : "text-slate-500"
              }`}
            >
              <div className="flex items-center justify-center gap-1.5">
                <Bookmark size={15} /> Following
              </div>
            </button>
            <button
              onClick={() => handleTabChange("city")}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === "city"
                  ? "bg-white text-[#0F1638] shadow-sm"
                  : "text-slate-500"
              }`}
            >
              <div className="flex items-center justify-center gap-1.5">
                <TrendingUp size={15} /> {userCity || "City"} Posts
              </div>
            </button>
          </div>

          {/* Posts with Infinite Scroll */}
          {renderPosts()}
        </div>
      </div>

      {/* Comments Modal */}
      {renderCommentsModal()}
    </div>
  );
}