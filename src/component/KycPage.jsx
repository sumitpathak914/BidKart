import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  ArrowLeft,
  IdCard,
  ShieldAlert,
  CheckCircle,
  Upload,
  Clock,
  ArrowRight,
  X,
  Loader2
} from "lucide-react";
import { getToken, getUser, isLoggedIn } from "./userSession";

const THEME = {
  ink: "#0F1638",
  gold: "#D9A441",
  goldSoft: "#FDF3E1",
  mapBg: "#E7ECFA",
};

const API_URL = "http://test.aakarcanvassing.com/api/auth";

export default function KycPage() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [isKycVerified, setIsKycVerified] = useState(false);
  const [kycStatus, setKycStatus] = useState("pending");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [shopId, setShopId] = useState(null);
  const [kycData, setKycData] = useState(null);
  
  const [kycForm, setKycForm] = useState({
    aadhaar: "",
    pan: "",
    accountNumber: "",
    passbookImage: ""
  });

  // Get shopId from URL
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('shopId');
    if (id) {
      setShopId(id);
    }
  }, [location]);

  // Check if user is logged in
  useEffect(() => {
    if (!isLoggedIn()) {
      navigate("/");
      return;
    }
    fetchKycStatus();
  }, []);

  // Fetch KYC Status
  const fetchKycStatus = async () => {
    try {
      setLoading(true);
      const token = getToken();
      
      if (!token) {
        navigate("/");
        return;
      }

      const response = await fetch(`${API_URL}/kyc/status`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (data.success) {
        setKycData(data.data);
        const status = data.data.status || "pending";
        setKycStatus(status);
        
        if (status === "verified" || status === "approved") {
          setIsKycVerified(true);
        } else {
          setIsKycVerified(false);
        }

        // If already submitted, populate form with existing data
        if (data.data.aadhaar_number) {
          setKycForm({
            aadhaar: data.data.aadhaar_number || "",
            pan: data.data.pan_number || "",
            accountNumber: data.data.account_number || "",
            passbookImage: data.data.passbook_image || ""
          });
        }
      } else {
        setError(data.message || "Failed to fetch KYC status");
      }
    } catch (err) {
      console.error("Error fetching KYC status:", err);
      setError("Unable to connect to server. Please try again.");
    } finally {
      setLoading(false);
    }
  };

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

  const handleKycSubmit = async (e) => {
    e.preventDefault();
    
    if (!kycForm.aadhaar || !kycForm.pan || !kycForm.accountNumber || !kycForm.passbookImage) {
      alert("Please fill all KYC details and upload passbook image.");
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
        aadhaar: kycForm.aadhaar,
        pan: kycForm.pan,
        accountNumber: kycForm.accountNumber,
        passbookImage: kycForm.passbookImage,
        kycStatus: "pending"
      };

      const response = await fetch(`${API_URL}/kyc`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (data.success) {
        alert("KYC documents submitted successfully! Verification is pending.");
        setIsKycVerified(false);
        setKycStatus("pending");
        // Refresh KYC status
        await fetchKycStatus();
      } else {
        setError(data.message || "Failed to submit KYC. Please try again.");
        alert(data.message || "Failed to submit KYC. Please try again.");
      }
    } catch (err) {
      console.error("KYC submission error:", err);
      setError("Unable to connect to server. Please try again.");
      alert("Unable to connect to server. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  // Get status badge color
  const getStatusBadge = () => {
    switch(kycStatus) {
      case "verified":
      case "approved":
        return "bg-green-100 text-green-700";
      case "pending":
        return "bg-amber-100 text-amber-700";
      case "rejected":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  // Get status icon
  const getStatusIcon = () => {
    switch(kycStatus) {
      case "verified":
      case "approved":
        return <CheckCircle size={14} />;
      case "pending":
        return <Clock size={14} />;
      case "rejected":
        return <X size={14} />;
      default:
        return <Clock size={14} />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F6F5F1] flex items-center justify-center">
        <div className="text-center">
          <Loader2 size={40} className="text-[#D9A441] animate-spin mx-auto mb-4" />
          <p className="text-slate-500">Loading KYC details...</p>
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
            <button 
              onClick={() => navigate(-1)} 
              className="p-1 hover:bg-slate-100 rounded-full transition-colors"
            >
              <ArrowLeft size={22} className="text-[#0F1638]" />
            </button>
            <h1 className="text-[17px] font-bold text-[#0F1638]">KYC Verification</h1>
          </div>
          <div className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 ${getStatusBadge()}`}>
            {getStatusIcon()}
            {kycStatus.charAt(0).toUpperCase() + kycStatus.slice(1)}
          </div>
        </header>

        <div className="px-4 pt-4 pb-6 space-y-4">
          
          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-sm text-red-600">
              {error}
            </div>
          )}

          {/* Shop ID Info */}
          {shopId && (
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 text-xs text-blue-700">
              <strong>Shop ID:</strong> {shopId}
            </div>
          )}

          {/* Info Banner */}
          <div className="bg-[#FDF3E1] border border-[#D9A441]/30 rounded-xl p-3 flex items-start gap-3">
            <IdCard size={18} className="text-[#D9A441] mt-0.5 flex-shrink-0" />
            <div className="text-xs text-slate-600 flex-1">
              <strong className="text-[#0F1638]">Why KYC?</strong><br />
              Verify your identity to unlock selling features, list products for auction, and build trust with your customers.
            </div>
          </div>

          {isKycVerified ? (
            /* Verified State */
            <div className="bg-white rounded-2xl p-6 border border-green-200 shadow-sm text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <CheckCircle size={32} className="text-green-600" />
              </div>
              <h2 className="text-lg font-bold text-[#0F1638]">KYC Verified!</h2>
              <p className="text-sm text-slate-500 mt-1">You are now eligible to list products and sell on the platform.</p>
              {kycData && (
                <div className="mt-4 text-left bg-slate-50 rounded-xl p-3 text-xs">
                  <p><strong>Submitted:</strong> {new Date(kycData.submitted_at).toLocaleDateString()}</p>
                  <p><strong>Updated:</strong> {new Date(kycData.updated_at).toLocaleDateString()}</p>
                </div>
              )}
            </div>
          ) : kycStatus === "pending" && kycData ? (
            /* Pending State */
            <div className="bg-white rounded-2xl p-6 border border-amber-200 shadow-sm text-center">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Clock size={32} className="text-amber-600" />
              </div>
              <h2 className="text-lg font-bold text-[#0F1638]">KYC Pending</h2>
              <p className="text-sm text-slate-500 mt-1">Your KYC documents are under review. We'll notify you once verified.</p>
              <div className="mt-4 text-left bg-slate-50 rounded-xl p-3 text-xs">
                <p><strong>Submitted:</strong> {new Date(kycData.submitted_at).toLocaleDateString()}</p>
                <p><strong>Status:</strong> {kycStatus.charAt(0).toUpperCase() + kycStatus.slice(1)}</p>
              </div>
            </div>
          ) : kycStatus === "rejected" ? (
            /* Rejected State */
            <div className="bg-white rounded-2xl p-6 border border-red-200 shadow-sm text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <X size={32} className="text-red-600" />
              </div>
              <h2 className="text-lg font-bold text-[#0F1638]">KYC Rejected</h2>
              <p className="text-sm text-slate-500 mt-1">Your KYC documents were rejected. Please submit again with correct documents.</p>
            </div>
          ) : (
            /* Form State - No KYC submitted yet */
            <form onSubmit={handleKycSubmit} className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm space-y-3">
              
              <div>
                <label className="text-[11px] font-semibold text-slate-600">Aadhaar Card Number</label>
                <input
                  type="text"
                  placeholder="XXXX XXXX XXXX"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm outline-none focus:border-[#D9A441] transition-colors bg-slate-50"
                  value={kycForm.aadhaar}
                  onChange={(e) => setKycForm({ ...kycForm, aadhaar: e.target.value })}
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-600">PAN Card Number</label>
                <input
                  type="text"
                  placeholder="ABCDE1234F"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm outline-none focus:border-[#D9A441] transition-colors bg-slate-50"
                  value={kycForm.pan}
                  onChange={(e) => setKycForm({ ...kycForm, pan: e.target.value })}
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-600">Bank Account Number</label>
                <input
                  type="text"
                  placeholder="1234567890"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm outline-none focus:border-[#D9A441] transition-colors bg-slate-50"
                  value={kycForm.accountNumber}
                  onChange={(e) => setKycForm({ ...kycForm, accountNumber: e.target.value })}
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-600">Upload Passbook Image</label>
                <div className="flex items-center gap-3">
                  <label className="flex-1 cursor-pointer">
                    <div className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-600 hover:bg-slate-50 transition-colors">
                      <Upload size={16} />
                      <span>{kycForm.passbookImage ? "Change Image" : "Choose Image"}</span>
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
                      <img src={kycForm.passbookImage} alt="Passbook" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full mt-2 py-3.5 rounded-xl text-white font-bold shadow-lg flex items-center justify-center gap-2 transition-transform hover:scale-[1.01] active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
                style={{ backgroundColor: THEME.ink }}
              >
                {submitting ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    Submit for Verification <ArrowRight size={18} />
                  </>
                )}
              </button>
            </form>
          )}

          {/* Resubmit button if rejected or pending */}
          {(kycStatus === "rejected") && (
            <button
              onClick={() => {
                setKycStatus("");
                setIsKycVerified(false);
                setKycForm({
                  aadhaar: "",
                  pan: "",
                  accountNumber: "",
                  passbookImage: ""
                });
              }}
              className="w-full py-3 rounded-xl border-2 border-[#D9A441] text-[#D9A441] font-semibold hover:bg-[#FDF3E1] transition-colors"
            >
              Submit New KYC
            </button>
          )}
        </div>
      </div>
    </div>
  );
}