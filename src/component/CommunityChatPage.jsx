import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Send,
  Users,
  MapPin,
  Star,
  Crown,
  ShieldCheck,
  MessageCircle,
  Pin,
  AlertCircle,
  Loader2,
  X,
  User,
  Eye,
  EyeOff,
  ChevronLeft,
  ChevronRight,
  Trash2,
  UserMinus,
  CheckCircle,
  Clock,
  Search,
  Image as ImageIcon,
  Video,
  Play,
  File
} from "lucide-react";
import { getToken, isLoggedIn } from "./userSession";

const THEME = {
  ink: "#0F1638",
  gold: "#D9A441",
  goldSoft: "#FDF3E1",
  mapBg: "#E7ECFA",
};

const API_URL = "https://test.aakarcanvassing.com/api/communities";
const BASE_URL = "https://test.aakarcanvassing.com";

export default function CommunityChatPage() {
  const navigate = useNavigate();
  const { communityId } = useParams();
  
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [communityData, setCommunityData] = useState(null);
  const [posts, setPosts] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, limit: 20, total: 0, totalPages: 1 });
  const [newPost, setNewPost] = useState("");
  const [showPostModal, setShowPostModal] = useState(false);
  const [postType, setPostType] = useState("general");
  const [isPinned, setIsPinned] = useState(false);
  const [isAnnouncement, setIsAnnouncement] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [filePreviews, setFilePreviews] = useState([]);
  const [memberCount, setMemberCount] = useState(0);
  const [isOwner, setIsOwner] = useState(false);
  const [showMembers, setShowMembers] = useState(false);
  const [members, setMembers] = useState([]);
  const [membersPagination, setMembersPagination] = useState({ page: 1, limit: 20, total: 0, totalPages: 1 });
  const [currentPage, setCurrentPage] = useState(1);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [loadingMembers, setLoadingMembers] = useState(false);
  const [searchMember, setSearchMember] = useState("");
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  
  // Comment states
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);
  const [loadingComments, setLoadingComments] = useState(false);
  const [showComments, setShowComments] = useState({});
  
  // File input ref
  const fileInputRef = useRef(null);
  const messagesEndRef = useRef(null);

  // Get current user ID from localStorage
  useEffect(() => {
    const user = localStorage.getItem("bidkart_user");
    if (user) {
      try {
        const parsedUser = JSON.parse(user);
        setCurrentUserId(parsedUser.id || parsedUser.userId);
      } catch (e) {
        console.error("Error parsing user:", e);
      }
    }
  }, []);

  // Fetch community details and posts
  useEffect(() => {
    if (!isLoggedIn()) {
      navigate("/");
      return;
    }
    fetchCommunityDetails();
    fetchCommunityPosts(1);
    fetchCommunityMembers(1);
  }, [communityId]);

  // Filter members on search
  useEffect(() => {
    if (searchMember.trim()) {
      const filtered = members.filter(member => 
        member.name?.toLowerCase().includes(searchMember.toLowerCase()) ||
        member.email?.toLowerCase().includes(searchMember.toLowerCase())
      );
      setFilteredMembers(filtered);
    } else {
      setFilteredMembers(members);
    }
  }, [searchMember, members]);

  // Handle file selection
  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    const validFiles = files.filter(file => {
      const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'video/mp4', 'video/webm', 'video/ogg', 'video/quicktime'];
      return validTypes.includes(file.type) && file.size <= 50 * 1024 * 1024;
    });

    if (validFiles.length !== files.length) {
      alert('Some files were skipped. Only images and videos up to 50MB are allowed.');
    }

    setSelectedFiles([...selectedFiles, ...validFiles]);
    
    const newPreviews = validFiles.map(file => ({
      file: file,
      preview: URL.createObjectURL(file),
      type: file.type.startsWith('video/') ? 'video' : 'image'
    }));
    
    setFilePreviews([...filePreviews, ...newPreviews]);
  };

  // Remove selected file
  const removeFile = (index) => {
    const newFiles = [...selectedFiles];
    const newPreviews = [...filePreviews];
    
    if (newPreviews[index]?.preview) {
      URL.revokeObjectURL(newPreviews[index].preview);
    }
    
    newFiles.splice(index, 1);
    newPreviews.splice(index, 1);
    
    setSelectedFiles(newFiles);
    setFilePreviews(newPreviews);
  };

  // Fetch Community Details
  const fetchCommunityDetails = async () => {
    try {
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

      if (data.success && data.data && data.data.community) {
        setCommunityData(data.data.community);
        setMemberCount(data.data.stats?.memberCount || 0);
        
        if (data.data.recentMembers && Array.isArray(data.data.recentMembers)) {
          const owner = data.data.recentMembers.find(m => m.role === "owner");
          if (owner) {
            setIsOwner(true);
          }
        }
      } else {
        setError("Failed to load community");
      }
    } catch (err) {
      console.error("Error fetching community:", err);
      setError("Unable to connect to server");
    }
  };

  // Fetch Community Members
  const fetchCommunityMembers = async (page = 1, limit = 20) => {
    try {
      setLoadingMembers(true);
      const token = getToken();
      if (!token) {
        navigate("/");
        return;
      }

      const response = await fetch(`${API_URL}/${communityId}/members?page=${page}&limit=${limit}`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (data.success) {
        let membersData = [];
        let paginationData = { page: 1, limit: 20, total: 0, totalPages: 1 };
        
        if (data.data) {
          if (Array.isArray(data.data)) {
            membersData = data.data;
          } else if (data.data.members && Array.isArray(data.data.members)) {
            membersData = data.data.members;
            paginationData = data.data.pagination || data.pagination || paginationData;
          }
        }
        
        setMembers(membersData);
        setFilteredMembers(membersData);
        setMembersPagination(paginationData);
        setMemberCount(membersData.length);
      }
    } catch (err) {
      console.error("Error fetching members:", err);
    } finally {
      setLoadingMembers(false);
    }
  };

  // Remove Member
  const handleRemoveMember = async (memberId, memberName) => {
    if (!window.confirm(`Are you sure you want to remove "${memberName}" from this community?`)) {
      return;
    }

    try {
      setLoading(true);
      const token = getToken();
      if (!token) {
        navigate("/");
        return;
      }

      const response = await fetch(`${API_URL}/${communityId}/members/${memberId}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (data.success) {
        alert(`✅ "${memberName}" removed successfully!`);
        await fetchCommunityMembers(1);
        setMemberCount(prev => prev - 1);
      } else {
        alert(data.message || "Failed to remove member");
      }
    } catch (err) {
      console.error("Error removing member:", err);
      alert("❌ Unable to connect to server");
    } finally {
      setLoading(false);
    }
  };

  // Fetch Community Posts
  const fetchCommunityPosts = async (page = 1, limit = 20) => {
    try {
      setLoading(true);
      const token = getToken();
      if (!token) {
        navigate("/");
        return;
      }

      const response = await fetch(`${API_URL}/${communityId}/posts?page=${page}&limit=${limit}`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (data.success) {
        let postsData = [];
        let paginationData = { page: 1, limit: 20, total: 0, totalPages: 1 };
        
        if (data.data) {
          if (Array.isArray(data.data)) {
            postsData = data.data;
          } else if (data.data.posts && Array.isArray(data.data.posts)) {
            postsData = data.data.posts;
            paginationData = data.data.pagination || data.pagination || paginationData;
          }
        }
        
        const processedPosts = postsData.map(post => ({
          ...post,
          comments_count: post.comments_count || 0,
          media_urls: typeof post.media_urls === 'string' 
            ? JSON.parse(post.media_urls || '[]') 
            : (post.media_urls || [])
        }));
        
        setPosts(processedPosts);
        setPagination(paginationData);
        setCurrentPage(page);
      } else {
        setError(data.message || "Failed to load posts");
        setPosts([]);
      }
    } catch (err) {
      console.error("Error fetching posts:", err);
      setError("Unable to connect to server");
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  // Delete Post
  const handleDeletePost = async (postId) => {
    if (!window.confirm("Are you sure you want to delete this post?")) {
      return;
    }

    try {
      const token = getToken();
      if (!token) {
        navigate("/");
        return;
      }

      const response = await fetch(`${API_URL}/posts/${postId}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (data.success) {
        alert("Post deleted successfully!");
        setPosts(posts.filter(post => post.id !== postId));
      } else {
        alert(data.message || "Failed to delete post");
      }
    } catch (err) {
      console.error("Error deleting post:", err);
      alert("Unable to connect to server");
    }
  };

  // Fetch Comments
  const fetchComments = async (postId) => {
    try {
      setLoadingComments(true);
      const token = getToken();
      if (!token) {
        navigate("/");
        return;
      }

      const response = await fetch(`${API_URL}/posts/${postId}/comments`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (data.success) {
        const commentsData = Array.isArray(data.data) ? data.data : [];
        setComments(commentsData);
        setShowComments({ ...showComments, [postId]: true });
      } else {
        alert(data.message || "Failed to load comments");
      }
    } catch (err) {
      console.error("Error fetching comments:", err);
      alert("Unable to connect to server");
    } finally {
      setLoadingComments(false);
    }
  };

  // Add Comment
  const handleAddComment = async (e) => {
    e.preventDefault();
    
    if (!commentText.trim()) {
      alert("Please write a comment");
      return;
    }

    setSubmitting(true);

    try {
      const token = getToken();
      if (!token) {
        navigate("/");
        return;
      }

      const payload = {
        content: commentText,
        parent_comment_id: null
      };

      const response = await fetch(`${API_URL}/posts/${selectedPostId}/comments`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (data.success) {
        alert("Comment added successfully!");
        setCommentText("");
        setShowCommentModal(false);
        await fetchComments(selectedPostId);
        setPosts(posts.map(post => {
          if (post.id === selectedPostId) {
            return {
              ...post,
              comments_count: (post.comments_count || 0) + 1
            };
          }
          return post;
        }));
      } else {
        alert(data.message || "Failed to add comment");
      }
    } catch (err) {
      console.error("Error adding comment:", err);
      alert("Unable to connect to server");
    } finally {
      setSubmitting(false);
    }
  };

  // Create New Post with File Upload
  const handleCreatePost = async (e) => {
    e.preventDefault();
    
    if (!newPost.trim() && selectedFiles.length === 0) {
      alert("Please write something or add media to post");
      return;
    }

    setSubmitting(true);
    setError("");
    setUploadProgress(0);

    try {
      const token = getToken();
      if (!token) {
        navigate("/");
        return;
      }

      // Create FormData for file upload
      const formData = new FormData();
      formData.append('content', newPost || '');
      formData.append('post_type', postType);
      formData.append('is_pinned', isPinned ? 'true' : 'false');
      formData.append('is_announcement', isAnnouncement ? 'true' : 'false');

      // Append files
      selectedFiles.forEach((file) => {
        formData.append('media', file);
      });

      // Send as FormData with file upload
      const response = await fetch(`${API_URL}/${communityId}/posts`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        alert("Post created successfully!");
        setNewPost("");
        setSelectedFiles([]);
        setFilePreviews([]);
        setShowPostModal(false);
        setPostType("general");
        setIsPinned(false);
        setIsAnnouncement(false);
        setUploadProgress(0);
        await fetchCommunityPosts(1);
      } else {
        setError(data.message || "Failed to create post");
        alert(data.message || "Failed to create post");
      }
    } catch (err) {
      console.error("Error creating post:", err);
      setError("Unable to connect to server");
      alert("Unable to connect to server");
    } finally {
      setSubmitting(false);
    }
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return "Just now";
    try {
      const date = new Date(dateString);
      const now = new Date();
      const diff = Math.floor((now - date) / 1000);
      
      if (diff < 60) return `${diff}s ago`;
      if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
      if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
      if (diff < 604800) return `${Math.floor(diff / 86400)}d ago`;
      
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric',
        year: 'numeric'
      });
    } catch (e) {
      return "Invalid date";
    }
  };

  // Get post type badge
  const getPostTypeBadge = (type) => {
    switch(type) {
      case "announcement":
        return <span className="text-[10px] bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">Announcement</span>;
      case "event":
        return <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Event</span>;
      case "general":
        return <span className="text-[10px] bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">General</span>;
      default:
        return null;
    }
  };

  // Get member status badge
  const getMemberStatusBadge = (status) => {
    switch(status) {
      case "active":
        return <span className="text-[9px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full flex items-center gap-1"><CheckCircle size={10} /> Active</span>;
      case "pending":
        return <span className="text-[9px] bg-yellow-100 text-yellow-700 px-1.5 py-0.5 rounded-full flex items-center gap-1"><Clock size={10} /> Pending</span>;
      case "banned":
        return <span className="text-[9px] bg-red-100 text-red-700 px-1.5 py-0.5 rounded-full">Banned</span>;
      default:
        return null;
    }
  };

  // Render Media (Images and Videos)
  const renderMedia = (mediaItems) => {
    if (!mediaItems || !Array.isArray(mediaItems) || mediaItems.length === 0) return null;

    const displayCount = Math.min(mediaItems.length, 4);
    const remaining = mediaItems.length - 4;

    return (
      <div className={`grid gap-2 mt-2 ${mediaItems.length > 1 ? 'grid-cols-2' : 'grid-cols-1'}`}>
        {mediaItems.slice(0, displayCount).map((item, idx) => {
          // Handle both string URLs and object media
          const url = typeof item === 'string' ? item : item.url;
          const type = typeof item === 'string' 
            ? (url?.match(/\.(mp4|webm|ogg|mov|avi)$/i) ? 'video' : 'image')
            : (item.type || 'image');
          
          return (
            <div 
              key={idx} 
              className="rounded-lg overflow-hidden bg-slate-100 relative" 
              style={{ height: mediaItems.length === 1 ? '200px' : '150px' }}
            >
              {type === 'video' ? (
                <div className="relative w-full h-full">
                  <video 
                    src={url} 
                    className="w-full h-full object-cover"
                    controls
                    poster={url + '?poster=1'}
                  >
                    <source src={url} />
                  </video>
                  <div className="absolute inset-0 flex items-center justify-center bg-black/10 pointer-events-none">
                    <Play size={32} className="text-white/70" />
                  </div>
                </div>
              ) : (
                <img 
                  src={url} 
                  alt="Media" 
                  className="w-full h-full object-cover" 
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }} 
                />
              )}
            </div>
          );
        })}
        {remaining > 0 && (
          <div className="rounded-lg bg-slate-100 h-[150px] flex items-center justify-center text-xs text-slate-500">
            +{remaining} more
          </div>
        )}
      </div>
    );
  };

  // Handle page change
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      fetchCommunityPosts(newPage);
    }
  };

  // Handle members page change
  const handleMembersPageChange = (newPage) => {
    if (newPage >= 1 && newPage <= membersPagination.totalPages) {
      fetchCommunityMembers(newPage);
    }
  };

  // Open comment modal
  const openCommentModal = (postId) => {
    setSelectedPostId(postId);
    setShowCommentModal(true);
    fetchComments(postId);
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
        <header className="bg-white px-4 py-3 sticky top-0 z-10 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2 flex-1">
            <button onClick={() => navigate(-1)} className="p-1 hover:bg-slate-100 rounded-full transition-colors">
              <ArrowLeft size={22} className="text-[#0F1638]" />
            </button>
            <div className="flex-1">
              <h1 className="text-[16px] font-bold text-[#0F1638] truncate">
                {communityData?.name || "Community"}
              </h1>
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-slate-500 flex items-center gap-1">
                  <Users size={12} /> {memberCount} members
                </span>
                {communityData?.visibility === "public" ? (
                  <Eye size={12} className="text-slate-400" />
                ) : (
                  <EyeOff size={12} className="text-slate-400" />
                )}
              </div>
            </div>
          </div>
          <button
            onClick={() => setShowMembers(!showMembers)}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors"
          >
            <Users size={20} className="text-slate-500" />
          </button>
        </header>

        {/* Members Sidebar */}
        {showMembers && (
          <div className="bg-white border-b border-slate-100 p-4 max-h-80 overflow-y-auto">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-[#0F1638]">
                Members ({memberCount})
              </h3>
              <button onClick={() => setShowMembers(false)}>
                <X size={18} className="text-slate-400" />
              </button>
            </div>

            {/* Search Members */}
            <div className="relative mb-3">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search members..."
                value={searchMember}
                onChange={(e) => setSearchMember(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 rounded-lg border border-slate-200 text-xs outline-none focus:border-[#D9A441] transition-colors bg-slate-50"
              />
            </div>
            
            {loadingMembers ? (
              <div className="flex justify-center py-4">
                <Loader2 size={24} className="animate-spin text-[#D9A441]" />
              </div>
            ) : filteredMembers && filteredMembers.length > 0 ? (
              <>
                <div className="space-y-2">
                  {filteredMembers.map((member) => (
                    <div key={member.id || member.user_id} className="flex items-center justify-between gap-3 bg-slate-50 rounded-xl p-2">
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <div className="w-8 h-8 rounded-full bg-[#FDF3E1] flex items-center justify-center flex-shrink-0">
                          <User size={14} className="text-[#D9A441]" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium text-[#0F1638] truncate">
                            {member.name || "Unknown"}
                          </p>
                          <div className="flex items-center gap-2 flex-wrap">
                            <p className="text-[9px] text-slate-500 capitalize">{member.role || "Member"}</p>
                            {getMemberStatusBadge(member.status)}
                          </div>
                        </div>
                      </div>
                      {isOwner && member.role !== "owner" && member.user_id !== currentUserId && (
                        <button
                          onClick={() => handleRemoveMember(member.user_id, member.name)}
                          className="p-1.5 hover:bg-red-50 rounded-full transition-colors text-red-400 hover:text-red-600 flex-shrink-0"
                          title="Remove member"
                        >
                          <UserMinus size={14} />
                        </button>
                      )}
                      {member.role === "owner" && (
                        <Crown size={14} className="text-[#D9A441] flex-shrink-0" />
                      )}
                    </div>
                  ))}
                </div>

                {/* Members Pagination */}
                {membersPagination.totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2 mt-3 pt-2 border-t border-slate-100">
                    <button
                      onClick={() => handleMembersPageChange(membersPagination.page - 1)}
                      disabled={membersPagination.page === 1}
                      className="p-1 rounded-lg border border-slate-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors"
                    >
                      <ChevronLeft size={14} />
                    </button>
                    <span className="text-[10px] text-slate-600">
                      {membersPagination.page} of {membersPagination.totalPages}
                    </span>
                    <button
                      onClick={() => handleMembersPageChange(membersPagination.page + 1)}
                      disabled={membersPagination.page === membersPagination.totalPages}
                      className="p-1 rounded-lg border border-slate-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors"
                    >
                      <ChevronRight size={14} />
                    </button>
                  </div>
                )}
              </>
            ) : (
              <p className="text-xs text-slate-500 text-center py-4">No members found</p>
            )}
          </div>
        )}

        {/* Posts Feed */}
        <div className="px-4 pt-4 pb-20 space-y-4">
          
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-3 flex items-start gap-2">
              <AlertCircle size={16} className="text-red-500 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {/* Community Info */}
          {communityData && (
            <div className="bg-white rounded-xl p-3 border border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0">
                  {communityData.logo_url ? (
                    <img src={communityData.logo_url} alt={communityData.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-[#FDF3E1] flex items-center justify-center">
                      <Users size={24} className="text-[#D9A441]" />
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-sm font-bold text-[#0F1638]">{communityData.name}</h3>
                    {communityData.is_verified === 1 && <ShieldCheck size={14} className="text-blue-500 fill-blue-500" />}
                  </div>
                  <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                    <span className="text-[10px] text-slate-500 flex items-center gap-1">
                      <MapPin size={12} /> {communityData.location}
                    </span>
                    <span className="text-[10px] text-slate-500 flex items-center gap-1">
                      <Star size={12} className="fill-[#D9A441] text-[#D9A441]" /> {communityData.rating || 0}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Posts */}
          <div className="space-y-3">
            {!posts || posts.length === 0 ? (
              <div className="bg-white rounded-xl p-8 text-center border border-slate-100">
                <MessageCircle size={32} className="text-slate-300 mx-auto mb-3" />
                <h4 className="text-sm font-semibold text-[#0F1638]">No Posts Yet</h4>
                <p className="text-xs text-slate-500 mt-1">Be the first to post in this community!</p>
                {isOwner && (
                  <button
                    onClick={() => setShowPostModal(true)}
                    className="mt-3 px-4 py-2 bg-[#0F1638] text-white text-xs font-bold rounded-xl"
                  >
                    Create First Post
                  </button>
                )}
              </div>
            ) : (
              <>
                {posts.map((post) => (
                  <div key={post.id} className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-[#FDF3E1] flex items-center justify-center">
                          <User size={14} className="text-[#D9A441]" />
                        </div>
                        <div>
                          <p className="text-xs font-medium text-[#0F1638]">
                            {post.author_name || post.user_name || "Unknown User"}
                            {post.is_announcement === 1 && (
                              <span className="ml-1 text-[8px] bg-purple-100 text-purple-700 px-1.5 py-0.5 rounded-full">Announcement</span>
                            )}
                            {post.is_pinned === 1 && (
                              <Pin size={10} className="inline ml-1 text-[#D9A441]" />
                            )}
                          </p>
                          <p className="text-[9px] text-slate-400">{formatDate(post.created_at)}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {getPostTypeBadge(post.post_type)}
                        {(isOwner || post.user_id === currentUserId) && (
                          <button
                            onClick={() => handleDeletePost(post.id)}
                            className="p-1 hover:bg-red-50 rounded-full transition-colors text-red-400 hover:text-red-600"
                          >
                            <Trash2 size={14} />
                          </button>
                        )}
                      </div>
                    </div>
                    <p className="text-sm text-slate-700 mt-2">{post.content}</p>
                    
                    {/* Render Media */}
                    {renderMedia(post.media_urls)}
                    
                    {/* Comments Button */}
                    <div className="flex items-center gap-4 mt-3 pt-2 border-t border-slate-100">
                      <button 
                        onClick={() => openCommentModal(post.id)}
                        className="flex items-center gap-1 text-xs text-slate-400 hover:text-[#D9A441] transition-colors"
                      >
                        <MessageCircle size={14} /> 
                        <span>{post.comments_count || 0}</span>
                      </button>
                    </div>
                  </div>
                ))}

                {pagination.totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2 mt-4">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="p-2 rounded-lg border border-slate-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors"
                    >
                      <ChevronLeft size={16} />
                    </button>
                    <span className="text-xs text-slate-600">
                      Page {currentPage} of {pagination.totalPages}
                    </span>
                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === pagination.totalPages}
                      className="p-2 rounded-lg border border-slate-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors"
                    >
                      <ChevronRight size={16} />
                    </button>
                  </div>
                )}
              </>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Floating Create Post Button */}
        {isOwner && (
          <button
            onClick={() => setShowPostModal(true)}
            className="fixed bottom-28 right-6 z-20 w-14 h-14 bg-[#0F1638] text-white rounded-full shadow-lg flex items-center justify-center hover:scale-105 transition-transform active:scale-95"
          >
            <MessageCircle size={24} />
          </button>
        )}

        {/* Create Post Modal with File Upload */}
        {showPostModal && (
          <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
            <div className="bg-white w-full max-w-md rounded-3xl overflow-hidden shadow-2xl relative p-6 max-h-[90vh] overflow-y-auto">
              <button 
                onClick={() => setShowPostModal(false)}
                className="absolute top-4 right-4 p-1 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors z-10"
              >
                <X size={20} className="text-slate-500" />
              </button>

              <div className="flex items-center gap-3 mb-4 pt-2">
                <div className="p-2 bg-[#FDF3E1] rounded-lg">
                  <MessageCircle size={24} className="text-[#D9A441]" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-[#0F1638]">Create Post</h2>
                  <p className="text-xs text-slate-500">Share with your community</p>
                </div>
              </div>

              <form onSubmit={handleCreatePost} className="space-y-3">
                <div>
                  <label className="text-[11px] font-semibold text-slate-600">Post Type</label>
                  <select
                    value={postType}
                    onChange={(e) => setPostType(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm outline-none focus:border-[#D9A441] transition-colors bg-slate-50"
                  >
                    <option value="general">General</option>
                    <option value="announcement">Announcement</option>
                    <option value="event">Event</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-slate-600">Content</label>
                  <textarea
                    placeholder="What's on your mind?"
                    rows={4}
                    value={newPost}
                    onChange={(e) => setNewPost(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm outline-none focus:border-[#D9A441] transition-colors bg-slate-50 resize-none"
                  />
                </div>

                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2 text-xs text-slate-600">
                    <input
                      type="checkbox"
                      checked={isPinned}
                      onChange={(e) => setIsPinned(e.target.checked)}
                      className="w-4 h-4 accent-[#D9A441]"
                    />
                    Pin Post
                  </label>
                  <label className="flex items-center gap-2 text-xs text-slate-600">
                    <input
                      type="checkbox"
                      checked={isAnnouncement}
                      onChange={(e) => setIsAnnouncement(e.target.checked)}
                      className="w-4 h-4 accent-[#D9A441]"
                    />
                    Announcement
                  </label>
                </div>

                {/* File Upload Section */}
                <div>
                  <label className="text-[11px] font-semibold text-slate-600">Media (Images & Videos)</label>
                  <div className="mt-1">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full py-3 border-2 border-dashed border-slate-300 rounded-xl text-sm text-slate-500 hover:border-[#D9A441] hover:text-[#D9A441] transition-colors flex items-center justify-center gap-2"
                    >
                      <ImageIcon size={18} />
                      <Video size={18} />
                      <span>Click to upload images or videos</span>
                    </button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*,video/*"
                      multiple
                      className="hidden"
                      onChange={handleFileSelect}
                    />
                    <p className="text-[10px] text-slate-400 mt-1">Max 10 files, up to 50MB each</p>
                  </div>

                  {/* File Previews */}
                  {filePreviews.length > 0 && (
                    <div className="mt-3 grid grid-cols-3 gap-2">
                      {filePreviews.map((file, index) => (
                        <div key={index} className="relative rounded-lg overflow-hidden bg-slate-100 h-20">
                          {file.type === 'video' ? (
                            <div className="w-full h-full bg-slate-800 flex items-center justify-center">
                              <Video size={24} className="text-white/50" />
                              <Play size={16} className="text-white/70 absolute" />
                            </div>
                          ) : (
                            <img 
                              src={file.preview} 
                              alt="Preview" 
                              className="w-full h-full object-cover"
                            />
                          )}
                          <button
                            type="button"
                            onClick={() => removeFile(index)}
                            className="absolute top-1 right-1 p-1 bg-black/60 rounded-full hover:bg-black/80 transition-colors"
                          >
                            <X size={12} className="text-white" />
                          </button>
                          {file.type === 'video' && (
                            <div className="absolute bottom-1 left-1 bg-black/60 px-1.5 py-0.5 rounded text-[8px] text-white">
                              Video
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
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
                      <Send size={18} /> Create Post
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Comment Modal */}
        {showCommentModal && (
          <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
            <div className="bg-white w-full max-w-md rounded-3xl overflow-hidden shadow-2xl relative p-6 max-h-[90vh] overflow-y-auto">
              <button 
                onClick={() => setShowCommentModal(false)}
                className="absolute top-4 right-4 p-1 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors z-10"
              >
                <X size={20} className="text-slate-500" />
              </button>

              <div className="flex items-center gap-3 mb-4 pt-2">
                <div className="p-2 bg-[#FDF3E1] rounded-lg">
                  <MessageCircle size={24} className="text-[#D9A441]" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-[#0F1638]">Comments</h2>
                  <p className="text-xs text-slate-500">Share your thoughts</p>
                </div>
              </div>

              <div className="max-h-60 overflow-y-auto mb-4 space-y-2">
                {loadingComments ? (
                  <div className="flex justify-center py-4">
                    <Loader2 size={24} className="animate-spin text-[#D9A441]" />
                  </div>
                ) : comments.length > 0 ? (
                  comments.map((comment) => (
                    <div key={comment.id} className="flex items-start gap-2 bg-slate-50 rounded-xl p-3">
                      <div className="w-8 h-8 rounded-full bg-[#FDF3E1] flex items-center justify-center flex-shrink-0">
                        <User size={14} className="text-[#D9A441]" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-medium text-[#0F1638]">
                          {comment.author_name || comment.user_name || "Unknown"}
                        </p>
                        <p className="text-sm text-slate-700">{comment.content}</p>
                        <p className="text-[9px] text-slate-400 mt-0.5">
                          {formatDate(comment.created_at)}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-slate-400 text-center py-4">No comments yet. Be the first!</p>
                )}
              </div>

              <form onSubmit={handleAddComment} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Write a comment..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  className="flex-1 px-4 py-2 rounded-xl border border-slate-200 text-sm outline-none focus:border-[#D9A441] transition-colors bg-slate-50"
                  required
                />
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-4 py-2 bg-[#0F1638] text-white text-sm rounded-xl flex items-center gap-1 disabled:opacity-50"
                >
                  {submitting ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : (
                    <Send size={16} />
                  )}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}