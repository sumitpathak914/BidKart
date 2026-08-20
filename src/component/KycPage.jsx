import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  IdCard,
  ShieldAlert,
  CheckCircle,
  Upload,
  Clock,
  ArrowRight,
  X
} from "lucide-react";

const THEME = {
  ink: "#0F1638",
  gold: "#D9A441",
  goldSoft: "#FDF3E1",
  mapBg: "#E7ECFA",
};

export default function KycPage() {
  const navigate = useNavigate();
  const [isKycVerified, setIsKycVerified] = useState(false); // Pending = false, Verified = true
  const [kycForm, setKycForm] = useState({
    aadhaar: "",
    pan: "",
    accountNumber: "",
    passbookImage: ""
  });

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
    if (!kycForm.aadhaar || !kycForm.pan || !kycForm.accountNumber || !kycForm.passbookImage) {
      alert("Please fill all KYC details and upload passbook image.");
      return;
    }
    alert("KYC documents submitted successfully! Verification is pending.");
    setIsKycVerified(false);
    // In a real app, you would send this data to your backend API here
    // After verification from admin, the status would turn to true.
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
            <h1 className="text-[17px] font-bold text-[#0F1638]">KYC Verification</h1>
          </div>
          <div className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 ${
            isKycVerified ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"
          }`}>
            {isKycVerified ? <CheckCircle size={14} /> : <Clock size={14} />}
            {isKycVerified ? "Verified" : "Pending"}
          </div>
        </header>

        <div className="px-4 pt-4 pb-6 space-y-4">
          
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
            </div>
          ) : (
            /* Form State */
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
                      <img src={kycForm.passbookImage} alt="Passbook" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-2 py-3.5 rounded-xl text-white font-bold shadow-lg flex items-center justify-center gap-2 transition-transform hover:scale-[1.01] active:scale-95"
                style={{ backgroundColor: THEME.ink }}
              >
                Submit for Verification <ArrowRight size={18} />
              </button>
            </form>
          )}

        </div>
      </div>
    </div>
  );
}