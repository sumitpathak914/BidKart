import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  ArrowLeft,
  Plus,
  Users,
  MapPin,
  Star,
  ChevronRight,
  MessageCircle,
  Crown,
  ShieldCheck,
  X,
  Loader2,
  AlertCircle,
  Eye,
  EyeOff,
  Calendar,
  User,
  Mail,
  Phone,
  Award
} from "lucide-react";
import { getToken, isLoggedIn } from "./userSession";

const THEME = {
  ink: "#0F1638",
  gold: "#D9A441",
  goldSoft: "#FDF3E1",
  mapBg: "#E7ECFA",
};

const API_URL = "http://test.aakarcanvassing.com/api/communities";

export default function MyCommunityPage() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [shopId, setShopId] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [communityData, setCommunityData] = useState(null);
  const [hasCommunity, setHasCommunity] = useState(false);
  const [memberCount, setMemberCount] = useState(0);
  const [postCount, setPostCount] = useState(0);
  const [eventCount, setEventCount] = useState(0);
  const [recentMembers, setRecentMembers] = useState([]);
  const [ownerName, setOwnerName] = useState("");
  const [createdDate, setCreatedDate] = useState("");
  
  const [formData, setFormData] = useState({ 
    name: "", 
    category: "", 
    location: "", 
    description: "",
    visibility: "public",
    join_approval: false,
    logo_url: "",
    cover_image_url: ""
  });

  // Get shopId from URL
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('shopId');
    if (id) {
      setShopId(id);
    }
  }, [location]);

  // Check if user is logged in and fetch community
  useEffect(() => {
    if (!isLoggedIn()) {
      navigate("/");
      return;
    }
    fetchMyCommunity();
  }, []);

  // Fetch My Community
  const fetchMyCommunity = async () => {
    try {
      setLoading(true);
      setError("");
      
      const token = getToken();
      if (!token) {
        navigate("/");
        return;
      }

      const response = await fetch(`${API_URL}/my-community`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (data.success) {
        if (data.data && data.data.community) {
          const community = data.data.community;
          setCommunityData(community);
          setHasCommunity(true);
          
          // Set counts from stats
          if (data.data.stats) {
            setMemberCount(data.data.stats.memberCount || 0);
            setPostCount(data.data.stats.postCount || 0);
            setEventCount(data.data.stats.eventCount || 0);
          }
          
          // Set recent members
          if (data.data.recentMembers && data.data.recentMembers.length > 0) {
            setRecentMembers(data.data.recentMembers);
            // Find owner
            const owner = data.data.recentMembers.find(m => m.role === "owner");
            if (owner) {
              setOwnerName(owner.name || "Unknown");
            }
          }
          
          // Set created date
          if (community.created_at) {
            const date = new Date(community.created_at);
            setCreatedDate(date.toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            }));
          }
        } else {
          setHasCommunity(false);
          setCommunityData(null);
        }
      } else {
        setError(data.message || "Failed to fetch community");
        setHasCommunity(false);
      }
    } catch (err) {
      console.error("Error fetching community:", err);
      setError("Unable to connect to server. Please try again.");
      setHasCommunity(false);
    } finally {
      setLoading(false);
    }
  };

  // Create Community
  const handleCreateCommunity = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.category || !formData.location || !formData.description) {
      alert("Please fill all required fields");
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      const token = getToken();
      if (!token) {
        navigate("/");
        return;
      }

      const payload = {
        name: formData.name,
        description: formData.description,
        category: formData.category,
        location: formData.location,
        visibility: formData.visibility || "public",
        join_approval: formData.join_approval || false,
        logo_url: formData.logo_url || "",
        cover_image_url: formData.cover_image_url || ""
      };

      const response = await fetch(`${API_URL}/create`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (data.success) {
        alert("Community created successfully!");
        setShowCreateModal(false);
        setFormData({ 
          name: "", 
          category: "", 
          location: "", 
          description: "",
          visibility: "public",
          join_approval: false,
          logo_url: "",
          cover_image_url: ""
        });
        await fetchMyCommunity();
      } else {
        setError(data.message || "Failed to create community");
        alert(data.message || "Failed to create community");
      }
    } catch (err) {
      console.error("Error creating community:", err);
      setError("Unable to connect to server. Please try again.");
      alert("Unable to connect to server. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  // Get visibility badge
  const getVisibilityBadge = (visibility) => {
    switch(visibility) {
      case "public":
        return <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Public</span>;
      case "private":
        return <span className="text-[10px] bg-red-100 text-red-700 px-2 py-0.5 rounded-full">Private</span>;
      default:
        return null;
    }
  };

  // Get status badge
  const getStatusBadge = (isVerified) => {
    if (isVerified) {
      return <span className="text-[10px] bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">Verified</span>;
    }
    return <span className="text-[10px] bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full">Pending</span>;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F6F5F1] flex items-center justify-center">
        <div className="text-center">
          <Loader2 size={40} className="text-[#D9A441] animate-spin mx-auto mb-4" />
          <p className="text-slate-500">Loading community...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F6F5F1] pb-24">
      <div className="mx-auto max-w-md">
        
        {/* Header */}
        <header className="bg-white px-5 py-4 sticky top-0 z-10 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button onClick={() => navigate(-1)} className="p-1 hover:bg-slate-100 rounded-full transition-colors">
              <ArrowLeft size={22} className="text-[#0F1638]" />
            </button>
            <h1 className="text-[17px] font-bold text-[#0F1638]">My Community</h1>
          </div>
          {hasCommunity && (
            <button 
              onClick={() => navigate(`/community-chat/${communityData.id}`)}
              className="flex items-center gap-1 px-3 py-1.5 bg-[#0F1638] text-white text-xs font-bold rounded-full hover:opacity-90 transition-colors"
            >
              <MessageCircle size={14} /> Chat
            </button>
          )}
        </header>

        {/* Main Content */}
        <div className="px-4 pt-4 pb-6 space-y-4">
          
          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-3 flex items-start gap-2">
              <AlertCircle size={16} className="text-red-500 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {/* Shop ID Info */}
          {shopId && (
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-2 text-xs text-blue-700 text-center">
              Shop ID: #{shopId}
            </div>
          )}

          {/* If No Community Exists (Create Option) */}
          {!hasCommunity ? (
            <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm text-center">
              <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users size={32} className="text-slate-400" />
              </div>
              <h3 className="text-[16px] font-bold text-[#0F1638]">No Community Created</h3>
              <p className="text-xs text-slate-500 mt-1 max-w-[200px] mx-auto">
                You haven't created any community yet. Create your first community to connect with local people!
              </p>
              <button 
                onClick={() => setShowCreateModal(true)}
                className="mt-4 px-6 py-2.5 bg-[#0F1638] text-white text-sm font-bold rounded-xl flex items-center gap-2 mx-auto shadow-lg transition-transform hover:scale-105 active:scale-95"
              >
                <Plus size={16} /> Create Community
              </button>
              <p className="text-[10px] text-slate-400 mt-3">*Limit: You can create only 1 community.</p>
            </div>
          ) : (
            /* If Community Exists (View Mode) */
            <div className="space-y-4">
              {/* Main Community Card */}
              <div 
                className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => navigate(`/community-chat/${communityData.id}`)}
              >
                <div className="flex gap-4">
                  <div className="w-20 h-20 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0">
                    {communityData.logo_url ? (
                      <img src={communityData.logo_url} alt={communityData.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-[#FDF3E1] flex items-center justify-center">
                        <Users size={30} className="text-[#D9A441]" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <h3 className="text-[15px] font-bold text-[#0F1638]">{communityData.name}</h3>
                          {communityData.is_verified === 1 && <ShieldCheck size={14} className="text-blue-500 fill-blue-500" />}
                        </div>
                        <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                          <p className="text-[11px] text-slate-500">{communityData.category}</p>
                          {getVisibilityBadge(communityData.visibility)}
                          {getStatusBadge(communityData.is_verified === 1)}
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star size={14} className="fill-[#D9A441] text-[#D9A441]" />
                        <span className="text-[13px] font-bold text-[#0F1638]">{communityData.rating || 0}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 mt-2 flex-wrap">
                      <span className="flex items-center gap-1 text-[10px] text-slate-500">
                        <MapPin size={12} /> {communityData.location}
                      </span>
                      <span className="flex items-center gap-1 text-[10px] text-slate-500 bg-slate-50 px-2 py-0.5 rounded-full">
                        <Users size={12} /> {memberCount} Members
                      </span>
                      {postCount > 0 && (
                        <span className="flex items-center gap-1 text-[10px] text-slate-500 bg-slate-50 px-2 py-0.5 rounded-full">
                          <MessageCircle size={12} /> {postCount} Posts
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-600 mt-1.5 line-clamp-2">{communityData.description}</p>
                    
                    <div className="flex items-center gap-2 mt-3 pt-2 border-t border-slate-100">
                     <button 
  onClick={() => navigate(`/community-chat/${communityData.id}`)}
  className="flex items-center gap-1 text-[10px] font-medium text-[#D9A441] hover:underline"
>
  View Details <ChevronRight size={12} />
</button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-3 gap-2">
                <div className="bg-white rounded-xl p-3 border border-slate-100 text-center">
                  <p className="text-xl font-bold text-[#0F1638]">{memberCount}</p>
                  <p className="text-[9px] text-slate-500">Members</p>
                </div>
                <div className="bg-white rounded-xl p-3 border border-slate-100 text-center">
                  <p className="text-xl font-bold text-[#0F1638]">{postCount}</p>
                  <p className="text-[9px] text-slate-500">Posts</p>
                </div>
                <div className="bg-white rounded-xl p-3 border border-slate-100 text-center">
                  <p className="text-xl font-bold text-[#0F1638]">{eventCount}</p>
                  <p className="text-[9px] text-slate-500">Events</p>
                </div>
              </div>

              {/* Community Info */}
              <div className="bg-white rounded-xl p-4 border border-slate-100 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500">Created:</span>
                  <span className="font-medium text-[#0F1638]">{createdDate || "N/A"}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500">Owner:</span>
                  <span className="font-medium text-[#0F1638]">{ownerName || "You"}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500">Join Approval:</span>
                  <span className="font-medium text-[#0F1638]">
                    {communityData.join_approval === 1 ? "Required" : "Not Required"}
                  </span>
                </div>
              </div>

              {/* Recent Members */}
              {recentMembers.length > 0 && (
                <div className="bg-white rounded-xl p-4 border border-slate-100">
                  <h4 className="text-xs font-semibold text-[#0F1638] mb-3">Recent Members</h4>
                  <div className="space-y-2">
                    {recentMembers.slice(0, 3).map((member, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#FDF3E1] flex items-center justify-center">
                          <User size={14} className="text-[#D9A441]" />
                        </div>
                        <div className="flex-1">
                          <p className="text-xs font-medium text-[#0F1638]">{member.name || "Unknown"}</p>
                          <p className="text-[10px] text-slate-500">{member.role || "Member"}</p>
                        </div>
                        {member.role === "owner" && (
                          <Crown size={14} className="text-[#D9A441]" />
                        )}
                      </div>
                    ))}
                    {recentMembers.length > 3 && (
                      <p className="text-[10px] text-slate-400 text-center mt-2">
                        +{recentMembers.length - 3} more members
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Info Banner */}
              <div className="bg-[#FDF3E1]/50 border border-[#D9A441]/20 rounded-xl p-3 flex items-start gap-3">
                <Crown size={16} className="text-[#D9A441] mt-0.5 flex-shrink-0" />
                <div className="text-xs text-slate-600 flex-1">
                  <strong className="text-[#0F1638]">You are the Owner</strong><br />
                  As the community owner, you can manage members, moderate posts, and grow your community.
                </div>
              </div>
            </div>
          )}
          
        </div>
      </div>

      {/* Create Community Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white w-full max-w-md rounded-3xl overflow-hidden shadow-2xl animate-slide-up relative p-6 max-h-[90vh] overflow-y-auto">
            
            {/* Close Button */}
            <button 
              onClick={() => setShowCreateModal(false)}
              className="absolute top-4 right-4 p-1 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors z-10"
            >
              <X size={20} className="text-slate-500" />
            </button>

            <div className="flex items-center gap-3 mb-4 pt-2">
              <div className="p-2 bg-[#FDF3E1] rounded-lg">
                <Users size={24} className="text-[#D9A441]" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-[#0F1638]">Create Community</h2>
                <p className="text-xs text-slate-500">Start your own local community (Limit: 1)</p>
              </div>
            </div>

            {/* Error in modal */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-2 mb-3 text-xs text-red-600">
                {error}
              </div>
            )}

            <form onSubmit={handleCreateCommunity} className="space-y-3">
              <div>
                <label className="text-[11px] font-semibold text-slate-600">Community Name *</label>
                <input
                  type="text"
                  placeholder="e.g. Nashik Tech Enthusiasts"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm outline-none focus:border-[#D9A441] transition-colors bg-slate-50"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div>
                <label className="text-[11px] font-semibold text-slate-600">Category *</label>
                <input
                  type="text"
                  placeholder="e.g. Technology, Sports, Food..."
                  required
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm outline-none focus:border-[#D9A441] transition-colors bg-slate-50"
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                />
              </div>
              <div>
                <label className="text-[11px] font-semibold text-slate-600">Location *</label>
                <input
                  type="text"
                  placeholder="e.g. Nashik, Maharashtra"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm outline-none focus:border-[#D9A441] transition-colors bg-slate-50"
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                />
              </div>
              <div>
                <label className="text-[11px] font-semibold text-slate-600">Description *</label>
                <textarea
                  placeholder="Describe your community..."
                  rows={3}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm outline-none focus:border-[#D9A441] transition-colors bg-slate-50 resize-none"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                />
              </div>
              <div>
                <label className="text-[11px] font-semibold text-slate-600">Visibility</label>
                <div className="flex gap-3 mt-1">
                  <button
                    type="button"
                    onClick={() => setFormData({...formData, visibility: "public"})}
                    className={`flex-1 py-2 rounded-xl text-sm font-medium transition-colors ${
                      formData.visibility === "public" 
                        ? "bg-[#0F1638] text-white" 
                        : "bg-slate-50 text-slate-600"
                    }`}
                  >
                    <div className="flex items-center justify-center gap-1">
                      <Eye size={14} /> Public
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({...formData, visibility: "private"})}
                    className={`flex-1 py-2 rounded-xl text-sm font-medium transition-colors ${
                      formData.visibility === "private" 
                        ? "bg-[#0F1638] text-white" 
                        : "bg-slate-50 text-slate-600"
                    }`}
                  >
                    <div className="flex items-center justify-center gap-1">
                      <EyeOff size={14} /> Private
                    </div>
                  </button>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="join_approval"
                  checked={formData.join_approval}
                  onChange={(e) => setFormData({...formData, join_approval: e.target.checked})}
                  className="w-4 h-4 accent-[#D9A441]"
                />
                <label htmlFor="join_approval" className="text-xs text-slate-600">
                  Require approval for new members
                </label>
              </div>
              <div>
                <label className="text-[11px] font-semibold text-slate-600">Logo URL (Optional)</label>
                <input
                  type="url"
                  placeholder="https://example.com/logo.png"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm outline-none focus:border-[#D9A441] transition-colors bg-slate-50"
                  value={formData.logo_url}
                  onChange={(e) => setFormData({...formData, logo_url: e.target.value})}
                />
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3.5 rounded-xl text-white font-bold shadow-lg flex items-center justify-center gap-2 transition-transform hover:scale-[1.01] active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
                style={{ backgroundColor: THEME.ink }}
              >
                {submitting ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>
                    Create Community <Plus size={18} />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}