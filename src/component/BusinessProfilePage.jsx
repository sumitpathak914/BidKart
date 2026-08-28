// BusinessProfilePage.jsx - with Category Dropdown for Business Type
import {
  AlertCircle,
  Building2,
  Calendar,
  CheckCircle,
  Clock,
  Edit2,
  Globe,
  Image,
  Mail,
  MapPin,
  Phone,
  Save,
  Share2,
  ShieldCheck,
  Store,
  X
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getToken, isLoggedIn } from "./userSession";

const API_URL = "https://test.aakarcanvassing.com/api";

export default function BusinessProfilePage() {
  const navigate = useNavigate();
  const { shopId } = useParams();

  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [businessDetails, setBusinessDetails] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedTab, setSelectedTab] = useState("about");
  const [isOwner, setIsOwner] = useState(false);
  const [error, setError] = useState(null);

  // Categories for business type dropdown
  const [categories, setCategories] = useState([]);
  const [categoriesLoading, setCategoriesLoading] = useState(false);

  // File upload refs
  const logoInputRef = useRef(null);
  const coverInputRef = useRef(null);

  // Form states
  const [formData, setFormData] = useState({
    businessName: "",
    businessType: "",
    about: "",
    city: "",
    state: "",
    pincode: "",
    address: "",
    phone: "",
    email: "",
    website: "",
    openingTime: "09:00",
    closingTime: "18:00",
    establishedYear: "",
    logo: null,
    coverImage: null,
    panNumber: "",
    gstNumber: "",
    kycStatus: "pending",
    businessPhone: "",
  });

  // File states
  const [logoFile, setLogoFile] = useState(null);
  const [coverFile, setCoverFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);
  const [coverPreview, setCoverPreview] = useState(null);

  // Helper function to get image URL
  const getImageUrl = (imagePath) => {
    if (!imagePath) return null;
    if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
      return imagePath;
    }
    const cleanPath = imagePath.replace(/\\/g, "/");
    return `${API_URL}/${cleanPath}`;
  };

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setCategoriesLoading(true);
        const token = getToken();
        const res = await fetch("https://test.aakarcanvassing.com/api/categories/active", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        if (data.success && Array.isArray(data.data)) {
          setCategories(data.data);
        } else {
          console.warn("Failed to load categories:", data);
        }
      } catch (err) {
        console.error("Error fetching categories:", err);
      } finally {
        setCategoriesLoading(false);
      }
    };
    fetchCategories();
  }, []);

  // Fetch business profile
  useEffect(() => {
    const fetchBusinessProfile = async () => {
      if (!isLoggedIn()) {
        navigate("/");
        return;
      }

      const token = getToken();
      if (!token) {
        navigate("/");
        return;
      }

      try {
        setLoading(true);
        setError(null);

        let url = `${API_URL}/auth/profile`;
        if (shopId) {
          url += `?shopId=${shopId}`;
        }

        console.log("Fetching from:", url);
        console.log("Shop ID from params:", shopId);

        const response = await fetch(url, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();
        console.log("API Response:", data);

        if (data.success) {
          const user = data.data;
          setUserData(user);

          if (shopId) {
            setIsOwner(user.id === parseInt(shopId));
          } else {
            setIsOwner(true);
          }

          if (user.businessDetails) {
            const biz = user.businessDetails;
            setBusinessDetails(biz);

            setFormData({
              businessName: biz.business_name || "",
              businessType: biz.business_type || "",
              about: biz.about || "",
              city: biz.city || "",
              state: biz.state || "",
              pincode: biz.pincode || "",
              address: biz.business_address || "",
              phone: biz.business_phone || user.mobile || "",
              email: user.email || "",
              website: biz.website || "",
              openingTime: biz.opening_time || "09:00",
              closingTime: biz.closing_time || "18:00",
              establishedYear: biz.established_year || "",
              logo: biz.logo || null,
              coverImage: biz.cover_image || null,
              panNumber: biz.pan_number || "",
              gstNumber: biz.gst_number || "",
              kycStatus: biz.kyc_status || "pending",
              businessPhone: biz.business_phone || user.mobile || "",
            });

            setLogoPreview(getImageUrl(biz.logo));
            setCoverPreview(getImageUrl(biz.cover_image));
          }
        } else {
          setError(data.message || "Failed to fetch business profile");
          alert(data.message || "Failed to fetch business profile");
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
        setError("Unable to connect to server");
        alert("Unable to connect to server");
      } finally {
        setLoading(false);
      }
    };

    fetchBusinessProfile();
  }, [navigate, shopId]);

  // Handle image upload
  const handleImageUpload = (type, e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert("File size should be less than 5MB");
      return;
    }

    if (!file.type.startsWith("image/")) {
      alert("Please upload an image file");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      if (type === "logo") {
        setLogoPreview(reader.result);
        setLogoFile(file);
        setFormData((prev) => ({ ...prev, logo: reader.result }));
      } else if (type === "coverImage") {
        setCoverPreview(reader.result);
        setCoverFile(file);
        setFormData((prev) => ({ ...prev, coverImage: reader.result }));
      }
    };
    reader.readAsDataURL(file);
  };

  // Save profile
  const handleSaveProfile = async () => {
    try {
      const token = getToken();

      const formDataToSend = new FormData();

      formDataToSend.append("business_name", formData.businessName || "");
      formDataToSend.append("business_type", formData.businessType || "");
      formDataToSend.append("about", formData.about || "");
      formDataToSend.append("city", formData.city || "");
      formDataToSend.append("state", formData.state || "");
      formDataToSend.append("pincode", formData.pincode || "");
      formDataToSend.append("business_address", formData.address || "");
      formDataToSend.append("business_phone", formData.phone || "");
      formDataToSend.append("website", formData.website || "");
      formDataToSend.append("pan_number", formData.panNumber || "");
      formDataToSend.append("gst_number", formData.gstNumber || "");
      formDataToSend.append("opening_time", formData.openingTime || "09:00");
      formDataToSend.append("closing_time", formData.closingTime || "18:00");
      formDataToSend.append("established_year", formData.establishedYear || "");
      formDataToSend.append("email", formData.email || "");

      if (logoFile) {
        formDataToSend.append("logo", logoFile);
      }
      if (coverFile) {
        formDataToSend.append("cover_image", coverFile);
      }

      const targetId = shopId || userData?.id;

      if (!targetId) {
        alert("Shop ID not found");
        return;
      }

      console.log("Updating business with ID:", targetId);
      console.log("Form data being sent:", Object.fromEntries(formDataToSend));

      const response = await fetch(
        `https://test.aakarcanvassing.com/api/business/business-details/${targetId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formDataToSend,
        }
      );

      const data = await response.json();
      console.log("Update Response:", data);

      if (data.success) {
        const updatedBiz = data.data || formData;
        setBusinessDetails(updatedBiz);
        setIsEditing(false);
        setLogoFile(null);
        setCoverFile(null);
        alert("Profile updated successfully!");
        window.location.reload();
      } else {
        alert(data.message || "Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile. Please try again.");
    }
  };

  // Cancel editing
  const handleCancelEdit = () => {
    if (businessDetails) {
      const biz = businessDetails;
      setFormData({
        businessName: biz.business_name || "",
        businessType: biz.business_type || "",
        about: biz.about || "",
        city: biz.city || "",
        state: biz.state || "",
        pincode: biz.pincode || "",
        address: biz.business_address || "",
        phone: biz.business_phone || userData?.mobile || "",
        email: userData?.email || "",
        website: biz.website || "",
        openingTime: biz.opening_time || "09:00",
        closingTime: biz.closing_time || "18:00",
        establishedYear: biz.established_year || "",
        logo: biz.logo || null,
        coverImage: biz.cover_image || null,
        panNumber: biz.pan_number || "",
        gstNumber: biz.gst_number || "",
        kycStatus: biz.kyc_status || "pending",
        businessPhone: biz.business_phone || userData?.mobile || "",
      });

      setLogoPreview(getImageUrl(biz.logo));
      setCoverPreview(getImageUrl(biz.cover_image));
    }
    setLogoFile(null);
    setCoverFile(null);
    setIsEditing(false);
  };

  // Get KYC status color
  const getKycStatusColor = (status) => {
    switch (status) {
      case "verified":
        return "bg-green-100 text-green-700";
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "rejected":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  // Get KYC status icon
  const getKycStatusIcon = (status) => {
    switch (status) {
      case "verified":
        return <CheckCircle size={16} className="text-green-600" />;
      case "pending":
        return <AlertCircle size={16} className="text-yellow-600" />;
      case "rejected":
        return <X size={16} className="text-red-600" />;
      default:
        return <ShieldCheck size={16} className="text-gray-600" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F6F5F1] flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#D9A441] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-500">Loading business profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#F6F5F1] flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl p-6 max-w-md w-full text-center">
          <div className="text-red-600 mb-4">
            <AlertCircle size={48} className="mx-auto" />
          </div>
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-[#0F1638] text-white rounded-xl"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F6F5F1] pb-24">
      {/* Header */}
      <header className="bg-white border-b border-slate-100 px-5 py-4 sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-[#0F1638]">
              {shopId ? "Business Profile" : "My Business"}
            </h1>
            <p className="text-xs text-slate-500">
              {shopId ? `Shop #${shopId}` : "Manage your business"}
            </p>
          </div>
          <div className="flex items-center gap-2">
            {isOwner &&
              (!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 bg-[#D9A441] text-white rounded-xl text-sm font-semibold flex items-center gap-2 hover:bg-[#c4923a] transition-colors"
                >
                  <Edit2 size={16} /> Edit
                </button>
              ) : (
                <>
                  <button
                    onClick={handleCancelEdit}
                    className="px-4 py-2 bg-slate-200 text-slate-700 rounded-xl text-sm font-semibold hover:bg-slate-300 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveProfile}
                    className="px-4 py-2 bg-[#0F1638] text-white rounded-xl text-sm font-semibold flex items-center gap-2 hover:bg-[#1a2245] transition-colors"
                  >
                    <Save size={16} /> Save
                  </button>
                </>
              ))}
            <button
              onClick={() => navigate("/profile")}
              className="p-2 hover:bg-slate-100 rounded-full transition-colors"
            >
              <X size={20} className="text-slate-500" />
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-md mx-auto p-5 space-y-5">
        {/* Cover Image & Logo */}
        <div className="relative bg-white rounded-2xl overflow-hidden border border-slate-100">
          {/* Cover Image */}
          <div className="relative h-48 bg-gradient-to-r from-[#0F1638] to-[#1f2d5e]">
            {coverPreview && (
              <img
                src={coverPreview}
                alt="Cover"
                className="w-full h-full object-cover"
                onError={(e) => {
                  console.error("Cover image failed to load:", coverPreview);
                  e.target.style.display = "none";
                  const parent = e.target.parentElement;
                  const fallback = document.createElement('div');
                  fallback.className = "w-full h-full bg-gradient-to-r from-[#0F1638] to-[#1f2d5e] flex items-center justify-center";
                  fallback.innerHTML = `
                    <div class="text-white/50 text-center">
                      <Building2 size={48} class="mx-auto mb-2" />
                      <p class="text-sm">No Cover Image</p>
                    </div>
                  `;
                  parent.appendChild(fallback);
                }}
              />
            )}
            {isOwner && isEditing && (
              <>
                <button
                  onClick={() => coverInputRef.current?.click()}
                  className="absolute bottom-2 right-2 p-2 bg-black/50 rounded-full cursor-pointer hover:bg-black/70 transition-colors z-10"
                >
                  <Image size={18} className="text-white" />
                </button>
                <input
                  ref={coverInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleImageUpload("coverImage", e)}
                />
              </>
            )}
          </div>

          {/* Logo */}
          <div className="relative w-24 h-24 -mt-12 ml-5">
            <div className="w-full h-full rounded-xl bg-white border-4 border-white shadow-lg overflow-hidden">
              {logoPreview ? (
                <img
                  src={logoPreview}
                  alt="Logo"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    console.error("Logo image failed to load:", logoPreview);
                    e.target.style.display = "none";
                    const parent = e.target.parentElement;
                    parent.innerHTML = `
                      <div class="w-full h-full bg-[#FDF3E1] flex items-center justify-center">
                        <Store size={36} class="text-[#D9A441]" />
                      </div>
                    `;
                  }}
                />
              ) : (
                <div className="w-full h-full bg-[#FDF3E1] flex items-center justify-center">
                  <Store size={36} className="text-[#D9A441]" />
                </div>
              )}
            </div>

            {isOwner && isEditing && (
              <>
                <button
                  onClick={() => logoInputRef.current?.click()}
                  className="absolute -bottom-1 -right-1 p-2 bg-[#D9A441] rounded-full border-2 border-white shadow-md hover:bg-[#c4923a]"
                >
                  <Edit2 size={12} className="text-white" />
                </button>
                <input
                  ref={logoInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleImageUpload("logo", e)}
                />
              </>
            )}
          </div>

          {/* Business Name */}
          <div className="px-5 pb-4 pt-2">
            {isOwner && isEditing ? (
              <input
                type="text"
                value={formData.businessName}
                onChange={(e) =>
                  setFormData({ ...formData, businessName: e.target.value })
                }
                className="text-xl font-bold text-[#0F1638] w-full border-b-2 border-[#D9A441] outline-none bg-transparent pb-1"
                placeholder="Business Name"
              />
            ) : (
              <h2 className="text-xl font-bold text-[#0F1638]">
                {formData.businessName || "My Business"}
              </h2>
            )}
            <div className="flex items-center gap-3 mt-1 flex-wrap">
              <span className="text-xs text-slate-500 flex items-center gap-1">
                <Building2 size={12} />
                {formData.businessType || "Business"}
              </span>
              <span className="text-xs text-slate-500 flex items-center gap-1">
                <Calendar size={12} />
                Est. {formData.establishedYear || "2024"}
              </span>
              {!isOwner && (
                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                  Viewing
                </span>
              )}
              {/* KYC Status Badge */}
              {formData.kycStatus && (
                <span
                  className={`text-xs px-2 py-0.5 rounded-full flex items-center gap-1 ${getKycStatusColor(formData.kycStatus)}`}
                >
                  {getKycStatusIcon(formData.kycStatus)}
                  KYC:{" "}
                  {formData.kycStatus.charAt(0).toUpperCase() +
                    formData.kycStatus.slice(1)}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
          <div className="flex border-b border-slate-100">
            {["about", "location", "timing", "contact"].map((tab) => (
              <button
                key={tab}
                onClick={() => setSelectedTab(tab)}
                className={`flex-1 py-3 text-sm font-medium capitalize transition-colors relative ${
                  selectedTab === tab
                    ? "text-[#D9A441]"
                    : "text-slate-500 hover:text-[#0F1638]"
                }`}
              >
                {tab}
                {selectedTab === tab && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#D9A441]"></div>
                )}
              </button>
            ))}
          </div>

          <div className="p-4">
            {/* About Tab */}
            {selectedTab === "about" && (
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-slate-600">
                    About Us
                  </label>
                  {isOwner && isEditing ? (
                    <textarea
                      value={formData.about}
                      onChange={(e) =>
                        setFormData({ ...formData, about: e.target.value })
                      }
                      className="w-full mt-1 p-3 border border-slate-200 rounded-xl text-sm outline-none focus:border-[#D9A441] transition-colors min-h-[100px] resize-none"
                      placeholder="Tell customers about your business..."
                    />
                  ) : (
                    <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                      {formData.about || "No description provided yet."}
                    </p>
                  )}
                </div>

                {isOwner && isEditing && (
                  <>
                    {/* BUSINESS TYPE - NOW A DROPDOWN */}
                    <div>
                      <label className="text-xs font-semibold text-slate-600">
                        Business Type
                      </label>
                      <select
                        value={formData.businessType}
                        onChange={(e) =>
                          setFormData({ ...formData, businessType: e.target.value })
                        }
                        className="w-full mt-1 p-3 border border-slate-200 rounded-xl text-sm outline-none focus:border-[#D9A441] transition-colors bg-white"
                        disabled={categoriesLoading}
                      >
                        <option value="">Select a category</option>
                        {categories.map((cat) => (
                          <option key={cat.id} value={cat.name}>
                            {cat.name}
                          </option>
                        ))}
                      </select>
                      {categoriesLoading && (
                        <p className="text-xs text-slate-400 mt-1">Loading categories…</p>
                      )}
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-slate-600">
                        PAN Number
                      </label>
                      <input
                        type="text"
                        value={formData.panNumber}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            panNumber: e.target.value,
                          })
                        }
                        className="w-full mt-1 p-3 border border-slate-200 rounded-xl text-sm outline-none focus:border-[#D9A441] transition-colors"
                        placeholder="Enter PAN number"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-slate-600">
                        GST Number
                      </label>
                      <input
                        type="text"
                        value={formData.gstNumber}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            gstNumber: e.target.value,
                          })
                        }
                        className="w-full mt-1 p-3 border border-slate-200 rounded-xl text-sm outline-none focus:border-[#D9A441] transition-colors"
                        placeholder="Enter GST number"
                      />
                    </div>
                  </>
                )}

                {!isOwner && formData.panNumber && (
                  <div>
                    <label className="text-xs font-semibold text-slate-600">
                      PAN
                    </label>
                    <p className="text-sm text-slate-600 mt-1">
                      ••••••••{formData.panNumber.slice(-4)}
                    </p>
                  </div>
                )}

                <div>
                  <label className="text-xs font-semibold text-slate-600">
                    Established Year
                  </label>
                  {isOwner && isEditing ? (
                    <input
                      type="number"
                      value={formData.establishedYear}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          establishedYear: e.target.value,
                        })
                      }
                      className="w-full mt-1 p-3 border border-slate-200 rounded-xl text-sm outline-none focus:border-[#D9A441] transition-colors"
                      placeholder="2024"
                      min="1900"
                      max={new Date().getFullYear()}
                    />
                  ) : (
                    <p className="text-sm text-slate-600 mt-1">
                      {formData.establishedYear || "Not specified"}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Location Tab */}
            {selectedTab === "location" && (
              <div className="space-y-4">
                <div className="bg-[#FDF3E1] rounded-xl p-3">
                  <div className="flex items-center gap-3">
                    <MapPin size={20} className="text-[#D9A441]" />
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-[#0F1638]">
                        {formData.city || "City"}
                        {formData.state && `, ${formData.state}`}
                      </p>
                      <p className="text-xs text-slate-500">
                        {formData.address || "No address set"}
                      </p>
                      {formData.pincode && (
                        <p className="text-xs text-slate-500">
                          Pincode: {formData.pincode}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {isOwner && isEditing && (
                  <>
                    <div>
                      <label className="text-xs font-semibold text-slate-600">
                        City
                      </label>
                      <input
                        type="text"
                        value={formData.city}
                        onChange={(e) =>
                          setFormData({ ...formData, city: e.target.value })
                        }
                        className="w-full mt-1 p-3 border border-slate-200 rounded-xl text-sm outline-none focus:border-[#D9A441] transition-colors"
                        placeholder="Enter city"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-slate-600">
                        State
                      </label>
                      <input
                        type="text"
                        value={formData.state}
                        onChange={(e) =>
                          setFormData({ ...formData, state: e.target.value })
                        }
                        className="w-full mt-1 p-3 border border-slate-200 rounded-xl text-sm outline-none focus:border-[#D9A441] transition-colors"
                        placeholder="Enter state"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-slate-600">
                        Pincode
                      </label>
                      <input
                        type="text"
                        value={formData.pincode}
                        onChange={(e) =>
                          setFormData({ ...formData, pincode: e.target.value })
                        }
                        className="w-full mt-1 p-3 border border-slate-200 rounded-xl text-sm outline-none focus:border-[#D9A441] transition-colors"
                        placeholder="Enter pincode"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-slate-600">
                        Full Address
                      </label>
                      <textarea
                        value={formData.address}
                        onChange={(e) =>
                          setFormData({ ...formData, address: e.target.value })
                        }
                        className="w-full mt-1 p-3 border border-slate-200 rounded-xl text-sm outline-none focus:border-[#D9A441] transition-colors min-h-[80px] resize-none"
                        placeholder="Enter full address"
                      />
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Timing Tab */}
            {selectedTab === "timing" && (
              <div className="space-y-4">
                <div className="bg-[#FDF3E1] rounded-xl p-3">
                  <div className="flex items-center gap-3 mb-2">
                    <Clock size={20} className="text-[#D9A441]" />
                    <span className="text-sm font-semibold text-[#0F1638]">
                      Shop Hours
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-600">
                        {formData.openingTime || "09:00"} -{" "}
                        {formData.closingTime || "18:00"}
                      </p>
                      <p className="text-xs text-slate-400">
                        Monday - Saturday
                      </p>
                    </div>
                  </div>
                </div>

                {isOwner && isEditing && (
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-semibold text-slate-600">
                        Opening Time
                      </label>
                      <input
                        type="time"
                        value={formData.openingTime}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            openingTime: e.target.value,
                          })
                        }
                        className="w-full mt-1 p-3 border border-slate-200 rounded-xl text-sm outline-none focus:border-[#D9A441] transition-colors"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-slate-600">
                        Closing Time
                      </label>
                      <input
                        type="time"
                        value={formData.closingTime}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            closingTime: e.target.value,
                          })
                        }
                        className="w-full mt-1 p-3 border border-slate-200 rounded-xl text-sm outline-none focus:border-[#D9A441] transition-colors"
                      />
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Contact Tab */}
            {selectedTab === "contact" && (
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-slate-600 flex items-center gap-2">
                    <Phone size={14} /> Phone
                  </label>
                  {isOwner && isEditing ? (
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="w-full mt-1 p-3 border border-slate-200 rounded-xl text-sm outline-none focus:border-[#D9A441] transition-colors"
                      placeholder="Enter phone number"
                    />
                  ) : (
                    <p className="text-sm text-slate-600 mt-1">
                      {formData.phone || "Not set"}
                    </p>
                  )}
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-600 flex items-center gap-2">
                    <Mail size={14} /> Email
                  </label>
                  {isOwner && isEditing ? (
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full mt-1 p-3 border border-slate-200 rounded-xl text-sm outline-none focus:border-[#D9A441] transition-colors"
                      placeholder="Enter email"
                    />
                  ) : (
                    <p className="text-sm text-slate-600 mt-1">
                      {formData.email || "Not set"}
                    </p>
                  )}
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-600 flex items-center gap-2">
                    <Globe size={14} /> Website
                  </label>
                  {isOwner && isEditing ? (
                    <input
                      type="url"
                      value={formData.website}
                      onChange={(e) =>
                        setFormData({ ...formData, website: e.target.value })
                      }
                      className="w-full mt-1 p-3 border border-slate-200 rounded-xl text-sm outline-none focus:border-[#D9A441] transition-colors"
                      placeholder="https://your-website.com"
                    />
                  ) : (
                    <p className="text-sm text-slate-600 mt-1">
                      {formData.website ? (
                        <a
                          href={formData.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#D9A441] hover:underline"
                        >
                          {formData.website}
                        </a>
                      ) : (
                        "Not set"
                      )}
                    </p>
                  )}
                </div>

                {/* PAN and GST display for non-owners */}
                {!isOwner && (
                  <>
                    {formData.panNumber && (
                      <div>
                        <label className="text-xs font-semibold text-slate-600">
                          PAN
                        </label>
                        <p className="text-sm text-slate-600 mt-1">
                          ••••••••{formData.panNumber.slice(-4)}
                        </p>
                      </div>
                    )}
                    {formData.gstNumber && (
                      <div>
                        <label className="text-xs font-semibold text-slate-600">
                          GST
                        </label>
                        <p className="text-sm text-slate-600 mt-1">
                          ••••••••{formData.gstNumber.slice(-4)}
                        </p>
                      </div>
                    )}
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="bg-white rounded-2xl border border-slate-100 p-4">
          <h3 className="text-sm font-semibold text-[#0F1638] mb-3">
            Business Information
          </h3>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Business Name</span>
              <span className="font-medium text-[#0F1638]">
                {formData.businessName || "N/A"}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Phone</span>
              <span className="font-medium text-[#0F1638]">
                {formData.businessPhone || formData.phone || "N/A"}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Email</span>
              <span className="font-medium text-[#0F1638]">
                {formData.email || "N/A"}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Location</span>
              <span className="font-medium text-[#0F1638] text-right">
                {formData.city || "N/A"}
                {formData.state && `, ${formData.state}`}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">KYC Status</span>
              <span
                className={`font-medium px-2 py-0.5 rounded-full text-xs ${getKycStatusColor(formData.kycStatus)}`}
              >
                {formData.kycStatus
                  ? formData.kycStatus.charAt(0).toUpperCase() +
                    formData.kycStatus.slice(1)
                  : "Pending"}
              </span>
            </div>
          </div>
        </div>

        {/* Share Business */}
        {isOwner && (
          <button
            onClick={() => {
              const url = `https://bidkart.com/shop/${userData?.id || 1}`;
              if (navigator.share) {
                navigator.share({
                  title: formData.businessName || "My Business",
                  text: `Check out ${formData.businessName || "my business"} on BidKart!`,
                  url: url,
                });
              } else {
                navigator.clipboard.writeText(url);
                alert("Link copied to clipboard!");
              }
            }}
            className="w-full py-3.5 bg-[#D9A441] text-white rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-[#c4923a] transition-colors shadow-lg"
          >
            <Share2 size={18} /> Share Business Profile
          </button>
        )}
      </div>
    </div>
  );
}