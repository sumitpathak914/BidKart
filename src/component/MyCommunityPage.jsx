import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
} from "lucide-react";

const THEME = {
  ink: "#0F1638",
  gold: "#D9A441",
  goldSoft: "#FDF3E1",
  mapBg: "#E7ECFA",
};

export default function MyCommunityPage() {
  const navigate = useNavigate();
  const [showCreateModal, setShowCreateModal] = useState(false);
  
  // --- Mock Data for existing community ---
  const [communityData, setCommunityData] = useState({
    id: 1,
    name: "Nashik Tech Enthusiasts",
    category: "Technology",
    members: 1247,
    location: "Nashik",
    rating: 4.8,
    description: "Connect with tech lovers in Nashik. Share knowledge and stay updated.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&q=80",
    isVerified: true,
  });

  const [formData, setFormData] = useState({ 
    name: "", 
    category: "", 
    location: "", 
    description: "" 
  });

  // Check if user already has a community (Limit: 1)
  const hasCommunity = !!communityData.name;

  const handleCreateCommunity = (e) => {
    e.preventDefault();
    if (!hasCommunity) {
      setCommunityData({
        id: Date.now(),
        name: formData.name,
        category: formData.category,
        location: formData.location,
        description: formData.description,
        members: 1,
        rating: 0,
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&q=80",
        isVerified: false,
      });
      setShowCreateModal(false);
      setFormData({ name: "", category: "", location: "", description: "" });
      alert("Community created successfully!");
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
            <div 
              className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => navigate(`/community-chat/${communityData.id}`)}
            >
              <div className="flex gap-4">
                <div className="w-20 h-20 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0">
                  <img src={communityData.image} alt={communityData.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h3 className="text-[15px] font-bold text-[#0F1638]">{communityData.name}</h3>
                        {communityData.isVerified && <ShieldCheck size={14} className="text-blue-500 fill-blue-500" />}
                      </div>
                      <p className="text-[11px] text-slate-500">{communityData.category}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star size={14} className="fill-[#D9A441] text-[#D9A441]" />
                      <span className="text-[13px] font-bold text-[#0F1638]">{communityData.rating}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 mt-2 flex-wrap">
                    <span className="flex items-center gap-1 text-[10px] text-slate-500">
                      <MapPin size={12} /> {communityData.location}
                    </span>
                    <span className="flex items-center gap-1 text-[10px] text-slate-500 bg-slate-50 px-2 py-0.5 rounded-full">
                      <Users size={12} /> {communityData.members.toLocaleString()} Members
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600 mt-1.5 line-clamp-2">{communityData.description}</p>
                  
                  <div className="flex items-center gap-2 mt-3 pt-2 border-t border-slate-100">
                    <button className="flex items-center gap-1 text-[10px] font-medium text-[#D9A441] hover:underline">
                      View Details <ChevronRight size={12} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Info Banner (If community exists) */}
          {hasCommunity && (
            <div className="bg-[#FDF3E1]/50 border border-[#D9A441]/20 rounded-xl p-3 flex items-start gap-3">
              <Crown size={16} className="text-[#D9A441] mt-0.5 flex-shrink-0" />
              <div className="text-xs text-slate-600 flex-1">
                <strong className="text-[#0F1638]">You are the Owner</strong><br />
                As the community owner, you can manage members, moderate posts, and grow your community.
              </div>
            </div>
          )}
          
        </div>
      </div>

      {/* Create Community Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white w-full max-w-md rounded-3xl overflow-hidden shadow-2xl animate-slide-up relative p-6">
            
            {/* Close Button */}
            <button 
              onClick={() => setShowCreateModal(false)}
              className="absolute top-4 right-4 p-1 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors"
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

            <form onSubmit={handleCreateCommunity} className="space-y-3">
              <div>
                <label className="text-[11px] font-semibold text-slate-600">Community Name</label>
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
                <label className="text-[11px] font-semibold text-slate-600">Category</label>
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
                <label className="text-[11px] font-semibold text-slate-600">Location</label>
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
                <label className="text-[11px] font-semibold text-slate-600">Description</label>
                <textarea
                  placeholder="Describe your community..."
                  rows={3}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm outline-none focus:border-[#D9A441] transition-colors bg-slate-50 resize-none"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                />
              </div>
              <button
                type="submit"
                className="w-full py-3.5 rounded-xl text-white font-bold shadow-lg flex items-center justify-center gap-2 transition-transform hover:scale-[1.01] active:scale-95"
                style={{ backgroundColor: THEME.ink }}
              >
                Create Community <Plus size={18} />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}