import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Users,
  Send,
  MoreVertical,
  Phone,
  Video,
  Image as ImageIcon,
  Smile,
  Check,
  CheckCheck,
  MapPin,
  Star,
  MessageCircle,
  UserPlus
} from "lucide-react";

const THEME = {
  ink: "#0F1638",
  gold: "#D9A441",
  goldSoft: "#FDF3E1",
};

// MOCK DATA - Same data from your community page
const COMMUNITY_DB = {
  1: {
    id: 1,
    name: "Mumbai Tech Hub",
    category: "Technology",
    members: 3247,
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&q=80",
    rating: 4.9,
    posts: 567,
    active: true,
    description: "The largest tech community in Mumbai. Connect with developers, designers, and tech entrepreneurs.",
    isVerified: true,
    location: "Mumbai",
    messages: [
      { id: 1, user: "Rahul K.", text: "Hey everyone! Check out this new React library I found.", time: "10:25 AM", isMe: false },
      { id: 2, user: "Priya S.", text: "Oh nice! Does it work with Next.js?", time: "10:27 AM", isMe: false },
      { id: 3, user: "You", text: "Yes, I used it yesterday. It's great for server components!", time: "10:28 AM", isMe: true },
      { id: 4, user: "Amit J.", text: "Can someone share the link to the documentation?", time: "10:30 AM", isMe: false },
    ]
  },
  4: {
    id: 4,
    name: "Pune Cycle Club", 
    category: "Sports",
    members: 1634,
    image: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=400&q=80",
    rating: 4.7,
    posts: 289,
    active: true,
    description: "Weekly rides, cycle maintenance workshops, and cycling events in Pune.",
    isVerified: true,
    location: "Pune",
    messages: [
      { id: 1, user: "Sagar D.", text: "Who is coming for the ride tomorrow morning?", time: "9:00 AM", isMe: false },
      { id: 2, user: "You", text: "I'm in! What time do we meet?", time: "9:05 AM", isMe: true },
    ]
  }
};

export default function CommunityChatPage() {
  const navigate = useNavigate();
  const { communityId } = useParams();
  const [community, setCommunity] = useState(null);
  const [inputMessage, setInputMessage] = useState("");
  const messagesEndRef = useRef(null);

  // Load Data
  useEffect(() => {
    const foundCommunity = COMMUNITY_DB[communityId];
    if (foundCommunity) {
      setCommunity(foundCommunity);
    } else {
      navigate("/community");
    }
  }, [communityId, navigate]);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [community?.messages]);

  if (!community) return <div className="h-screen flex items-center justify-center">Loading Chat...</div>;

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const newMessage = {
      id: Date.now(),
      user: "You",
      text: inputMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isMe: true
    };
    setCommunity(prev => ({
      ...prev,
      messages: [...prev.messages, newMessage]
    }));
    setInputMessage("");
  };

  return (
    // FIX 1: Removed "pb-24" and added "h-screen" and "overflow-hidden"
    <div className="min-h-screen bg-[#F6F5F1] h-screen flex flex-col overflow-hidden">
      <div className="mx-auto max-w-md w-full flex flex-col h-full">
        
        {/* --- HEADER --- */}
        <header className="bg-white px-4 py-3 flex items-center justify-between border-b border-slate-100 flex-shrink-0 shadow-sm z-10">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate(-1)} className="p-1 hover:bg-slate-100 rounded-full transition-colors">
              <ArrowLeft size={22} className="text-[#0F1638]" />
            </button>
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden">
                <img src={community.image} alt={community.name} className="w-full h-full object-cover" />
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-green-500 border-2 border-white"></span>
            </div>
            <div>
              <h2 className="font-bold text-[#0F1638] text-[15px]">{community.name}</h2>
              <p className="text-[11px] text-slate-400 flex items-center gap-1">
                <Users size={12} /> {community.members.toLocaleString()} members
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-slate-100 rounded-full transition-colors">
              <Phone size={18} className="text-[#0F1638]" />
            </button>
            <button className="p-2 hover:bg-slate-100 rounded-full transition-colors">
              <Video size={18} className="text-[#0F1638]" />
            </button>
            <button className="p-2 hover:bg-slate-100 rounded-full transition-colors">
              <MoreVertical size={18} className="text-[#0F1638]" />
            </button>
          </div>
        </header>

        {/* --- COMMUNITY INFO BANNER --- */}
        <div className="bg-white mx-4 mt-4 p-3 rounded-xl shadow-sm border border-slate-100 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="bg-[#FDF3E1] text-[#D9A441] text-[10px] font-medium px-2 py-0.5 rounded-full border border-[#D9A441]/20">
                {community.category}
              </span>
              <span className="flex items-center gap-0.5 text-[10px] text-slate-500">
                <MapPin size={10} /> {community.location}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Star size={12} className="fill-[#D9A441] text-[#D9A441]" />
              <span className="text-[11px] font-bold text-[#0F1638]">{community.rating}</span>
            </div>
          </div>
          <p className="text-[12px] text-slate-500 mt-1 line-clamp-1">{community.description}</p>
        </div>

        {/* --- CHAT MESSAGES AREA --- */}
        {/* FIX 2: Changed flex-1 to flex-1 with overflow-y-auto, removed extra margins/paddings */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 mt-2 pb-2">
          {community.messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.isMe ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[80%] px-3.5 py-2.5 rounded-2xl ${msg.isMe ? "bg-[#0F1638] text-white rounded-br-none" : "bg-white border border-slate-200 text-[#0F1638] rounded-bl-none shadow-sm"}`}>
                {!msg.isMe && (
                  <p className="text-[10px] font-bold text-[#D9A441] mb-0.5">{msg.user}</p>
                )}
                <p className="text-[14px] leading-snug">{msg.text}</p>
                <div className="flex items-center justify-end gap-1 mt-0.5">
                  <span className={`text-[9px] ${msg.isMe ? "text-white/60" : "text-slate-400"}`}>{msg.time}</span>
                  {msg.isMe && (
                    <CheckCheck size={12} className="text-blue-400" />
                  )}
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* --- BOTTOM INPUT AREA --- */}
        {/* FIX 3: Added flex-shrink-0 to keep it permanently stuck at the bottom */}
        <div className="bg-white border-t border-slate-200 p-3 flex-shrink-0 pb-safe">
          <form onSubmit={handleSendMessage} className="flex items-center gap-2">
            <button type="button" className="p-2 text-slate-400 hover:text-[#0F1638]">
              <ImageIcon size={20} />
            </button>
            <button type="button" className="p-2 text-slate-400 hover:text-[#0F1638]">
              <Smile size={20} />
            </button>
            <input
              type="text"
              placeholder="Type a message..."
              className="flex-1 bg-slate-50 border border-slate-200 rounded-full px-4 py-2.5 text-[14px] text-slate-700 outline-none focus:border-[#D9A441] transition-colors"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
            />
            <button 
              type="submit"
              className={`p-3 rounded-full text-white shadow-md transition-all ${inputMessage.trim() ? "opacity-100" : "opacity-50"}`}
              style={{ backgroundColor: THEME.ink }}
              disabled={!inputMessage.trim()}
            >
              <Send size={18} />
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}