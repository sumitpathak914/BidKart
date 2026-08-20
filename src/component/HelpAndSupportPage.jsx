import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  HelpCircle,
  Mail,
  Phone,
  MessageCircle,
  FileText,
  AlertCircle,
  ChevronDown,
  ChevronUp,
    ExternalLink,
  ChevronRight ,
  Shield,
  BookOpen,
  LifeBuoy
} from "lucide-react";

const THEME = {
  ink: "#0F1638",
  gold: "#D9A441",
  goldSoft: "#FDF3E1",
  mapBg: "#E7ECFA",
};

// --- FAQ Data ---
const FAQS = [
  {
    id: 1,
    question: "How do I place a bid on an auction?",
    answer: "Simply navigate to the auction you're interested in, enter your bid amount using the +/- buttons, and click 'Place Bid'. Make sure your bid meets the minimum next bid requirement."
  },
  {
    id: 2,
    question: "What happens if I win an auction?",
    answer: "Congratulations! You will receive a notification. You must complete the payment within 24 hours. After payment, the seller will arrange delivery or pickup based on the item's shipping details."
  },
  {
    id: 3,
    question: "How do I list a product for auction?",
    answer: "Switch to a Business account, complete your KYC verification, and then go to 'My Listings' in your profile. Click 'Add New' to start listing your product."
  },
  {
    id: 4,
    question: "Is my payment secure?",
    answer: "Yes! We use industry-standard SSL encryption to protect all transactions. Your payment information is never shared with sellers directly."
  },
  {
    id: 5,
    question: "Can I cancel a bid I placed?",
    answer: "Bids are binding commitments. However, you can retract a bid only if there are more than 24 hours left in the auction. Please contact support for immediate assistance."
  }
];

export default function HelpAndSupportPage() {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (id) => {
    setOpenFaq(openFaq === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-[#F6F5F1] pb-24">
      <div className="mx-auto max-w-md">
        
        {/* Header */}
        <header className="bg-white px-5 py-4 sticky top-0 z-10 border-b border-slate-100 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-2">
            <button onClick={() => navigate(-1)} className="p-1 hover:bg-slate-100 rounded-full transition-colors">
              <ArrowLeft size={22} className="text-[#0F1638]" />
            </button>
            <h1 className="text-[17px] font-bold text-[#0F1638]">Help & Support</h1>
          </div>
          <button className="p-2 bg-[#FDF3E1] rounded-full hover:bg-[#D9A441]/20 transition-colors">
            <LifeBuoy size={18} className="text-[#D9A441]" />
          </button>
        </header>

        <div className="px-4 pt-4 pb-6 space-y-6">
          
          {/* --- Quick Contact Banner --- */}
          <div 
            className="rounded-2xl p-5 text-white relative overflow-hidden shadow-md"
            style={{ background: `linear-gradient(135deg, ${THEME.ink} 0%, #1a2a5c 100%)` }}
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full -mr-12 -mt-12"></div>
            <div className="absolute bottom-0 left-0 w-16 h-16 bg-[#D9A441]/10 rounded-full -ml-8 -mb-8"></div>
            
            <div className="relative z-10 flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <HelpCircle size={20} className="text-[#D9A441]" />
                  <h2 className="text-lg font-bold">Need help?</h2>
                </div>
                <p className="text-sm text-white/80">
                  We're here to assist you 24/7. Reach out to us anytime.
                </p>
              </div>
              <button 
                onClick={() => window.location.href = 'mailto:support@bidkart.com'}
                className="px-4 py-2 bg-white rounded-full text-xs font-bold shadow-lg"
                style={{ color: THEME.ink }}
              >
                Contact Us
              </button>
            </div>
          </div>

          {/* --- FAQ Section --- */}
          <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <div className="p-2 bg-[#FDF3E1] rounded-lg">
                <MessageCircle size={18} className="text-[#D9A441]" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#0F1638]">Frequently Asked Questions</h3>
                <p className="text-xs text-slate-500">Quick answers to common queries</p>
              </div>
            </div>
            
            <div className="space-y-2 border-t border-slate-100 pt-3">
              {FAQS.map((faq) => (
                <div key={faq.id} className="border border-slate-100 rounded-xl overflow-hidden">
                  <button 
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full flex items-center justify-between p-3 bg-white hover:bg-slate-50 transition-colors"
                  >
                    <span className="text-sm font-medium text-[#0F1638] text-left">{faq.question}</span>
                    {openFaq === faq.id ? (
                      <ChevronUp size={16} className="text-[#D9A441] flex-shrink-0" />
                    ) : (
                      <ChevronDown size={16} className="text-slate-400 flex-shrink-0" />
                    )}
                  </button>
                  {openFaq === faq.id && (
                    <div className="p-3 pt-0 bg-slate-50 border-t border-slate-100">
                      <p className="text-sm text-slate-600">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* --- Contact Methods --- */}
          <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <div className="p-2 bg-[#FDF3E1] rounded-lg">
                <Phone size={18} className="text-[#D9A441]" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#0F1638]">Contact Support</h3>
                <p className="text-xs text-slate-500">Reach out to our support team directly</p>
              </div>
            </div>
            
            <div className="space-y-3 pt-2 border-t border-slate-100">
              <button className="w-full flex items-center gap-3 p-3 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                <div className="p-2 bg-blue-100 rounded-full">
                  <Mail size={16} className="text-blue-600" />
                </div>
                <div className="flex-1 text-left">
                  <p className="text-sm font-semibold text-[#0F1638]">Email Support</p>
                  <p className="text-xs text-slate-500">support@bidkart.com</p>
                </div>
                <ChevronRight size={16} className="text-slate-400" />
              </button>
              <button className="w-full flex items-center gap-3 p-3 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                <div className="p-2 bg-green-100 rounded-full">
                  <Phone size={16} className="text-green-600" />
                </div>
                <div className="flex-1 text-left">
                  <p className="text-sm font-semibold text-[#0F1638]">Call Us</p>
                  <p className="text-xs text-slate-500">+91 98765 43210</p>
                </div>
                <ChevronRight size={16} className="text-slate-400" />
              </button>
            </div>
          </div>

          {/* --- Quick Actions --- */}
          <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <div className="p-2 bg-[#FDF3E1] rounded-lg">
                <FileText size={18} className="text-[#D9A441]" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#0F1638]">Quick Actions</h3>
                <p className="text-xs text-slate-500">Explore more resources</p>
              </div>
            </div>
            
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <button className="w-full flex items-center justify-between p-2 hover:bg-slate-50 rounded-lg transition-colors">
                <div className="flex items-center gap-2">
                  <BookOpen size={16} className="text-slate-500" />
                  <span className="text-sm text-[#0F1638]">Visit Help Center</span>
                </div>
                <ChevronRight size={16} className="text-slate-400" />
              </button>
              <button className="w-full flex items-center justify-between p-2 hover:bg-slate-50 rounded-lg transition-colors">
                <div className="flex items-center gap-2">
                  <AlertCircle size={16} className="text-slate-500" />
                  <span className="text-sm text-[#0F1638]">Report an Issue</span>
                </div>
                <ChevronRight size={16} className="text-slate-400" />
              </button>
              <button className="w-full flex items-center justify-between p-2 hover:bg-slate-50 rounded-lg transition-colors">
                <div className="flex items-center gap-2">
                  <Shield size={16} className="text-slate-500" />
                  <span className="text-sm text-[#0F1638]">Terms & Privacy</span>
                </div>
                <ChevronRight size={16} className="text-slate-400" />
              </button>
            </div>
          </div>

          {/* --- Footer Info --- */}
          <div className="text-center text-xs text-slate-400 p-2">
            <p>Response time: Usually within 2-4 hours</p>
            <p className="mt-1">Available 24/7 • 365 days</p>
          </div>

        </div>
      </div>
    </div>
  );
}