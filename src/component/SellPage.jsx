import React, { useState } from "react";
import {
  MapPin,
  ChevronDown,
  Bell,
  ArrowLeft,
  Camera,
  X,
  Plus,
  Clock,
  Calendar,
  Check,
  CreditCard,
  Wallet,
  Building2,
  Shield,
  Lock,
  ChevronRight,
  Image as ImageIcon,
  Trash2,
  AlertCircle,
  ChevronUp,
} from "lucide-react";

const THEME = {
  ink: "#0F1638",
  gold: "#D9A441",
  goldSoft: "#FDF3E1",
  mapBg: "#E7ECFA",
};

export default function SellPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    category: "",
    title: "",
    brand: "",
    description: "",
    startingPrice: "",
    duration: "24",
    pickupLocation: "Nashik, Maharashtra 422001",
    images: [],
    condition: "excellent",
    delivery: "pickup",
  });
  const [selectedDuration, setSelectedDuration] = useState("24");
  const [selectedPayment, setSelectedPayment] = useState("upi");
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isConditionOpen, setIsConditionOpen] = useState(false);
  const [isDeliveryOpen, setIsDeliveryOpen] = useState(false);
  const [isLocationOpen, setIsLocationOpen] = useState(false);

  const categories = [
    { id: "cycles", label: "🚴 Cycles" },
    { id: "electronics", label: "📱 Electronics" },
    { id: "fashion", label: "👕 Fashion" },
    { id: "home", label: "🏠 Home & Furniture" },
    { id: "books", label: "📚 Books" },
    { id: "automobiles", label: "🚗 Automobiles" },
    { id: "sports", label: "⚽ Sports" },
    { id: "other", label: "📦 Other" },
  ];

  const conditions = [
    { id: "new", label: "🆕 Brand New" },
    { id: "excellent", label: "⭐ Excellent" },
    { id: "good", label: "👍 Good" },
    { id: "fair", label: "📦 Fair" },
    { id: "poor", label: "🔧 Needs Repair" },
  ];

  const deliveryOptions = [
    { id: "pickup", label: "📍 Pickup Only" },
    { id: "delivery", label: "🚚 Delivery Available" },
    { id: "both", label: "🔄 Both Available" },
  ];

  const locations = [
    { id: "nashik1", label: "Nashik, Maharashtra 422001" },
    { id: "nashik2", label: "Nashik, Maharashtra 422002" },
    { id: "nashik3", label: "Nashik, Maharashtra 422003" },
    { id: "nashik4", label: "Nashik, Maharashtra 422004" },
    { id: "nashik5", label: "Nashik, Maharashtra 422005" },
  ];

  const durations = [
    { value: "12", label: "12 Hours" },
    { value: "24", label: "24 Hours" },
    { value: "48", label: "48 Hours" },
    { value: "72", label: "72 Hours" },
  ];

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + formData.images.length > 5) {
      alert("You can upload a maximum of 5 images");
      return;
    }
    const imageUrls = files.map((file) => URL.createObjectURL(file));
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...imageUrls],
    }));
  };

  const removeImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const calculateFees = () => {
    const price = parseFloat(formData.startingPrice) || 0;
    const fee = price * 0.05;
    return {
      price,
      fee: Math.round(fee),
      total: Math.round(fee),
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  // Dropdown component
  const DropdownSelect = ({ 
    label, 
    options, 
    value, 
    onChange, 
    isOpen, 
    setIsOpen,
    placeholder = "Select an option",
    required = false,
  }) => {
    const selectedOption = options.find(opt => opt.id === value);
    
    return (
      <div className="relative">
        <label className="text-sm font-semibold text-[#0F1638] block mb-2">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#D9A441] focus:outline-none transition-colors flex items-center justify-between bg-white"
        >
          <span className={selectedOption ? "text-slate-700" : "text-slate-400"}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          {isOpen ? (
            <ChevronUp size={20} className="text-slate-400" />
          ) : (
            <ChevronDown size={20} className="text-slate-400" />
          )}
        </button>
        
        {isOpen && (
          <div className="absolute z-20 w-full mt-1 bg-white border border-slate-200 rounded-xl shadow-lg max-h-60 overflow-y-auto">
            {options.map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => {
                  onChange(option.id);
                  setIsOpen(false);
                }}
                className={`w-full px-4 py-3 text-left hover:bg-slate-50 transition-colors flex items-center justify-between ${
                  value === option.id ? "bg-[#FDF3E1]" : ""
                }`}
              >
                <span className="text-slate-700">{option.label}</span>
                {value === option.id && (
                  <Check size={18} className="text-[#D9A441]" />
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      {/* Images Upload */}
      <div>
        <label className="text-sm font-semibold text-[#0F1638] block mb-2">
          Upload Images <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-3 gap-3">
          {formData.images.map((img, index) => (
            <div key={index} className="relative aspect-square rounded-xl overflow-hidden bg-slate-100">
              <img src={img} alt={`Upload ${index + 1}`} className="w-full h-full object-cover" />
              <button
                onClick={() => removeImage(index)}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
              >
                <X size={14} />
              </button>
            </div>
          ))}
          {formData.images.length < 5 && (
            <label className="aspect-square rounded-xl border-2 border-dashed border-slate-300 flex flex-col items-center justify-center cursor-pointer hover:border-[#D9A441] transition-colors bg-white">
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                className="hidden"
              />
              <Plus size={24} className="text-slate-400" />
              <span className="text-xs text-slate-500 mt-1">Add Photo</span>
            </label>
          )}
        </div>
        <p className="text-xs text-slate-500 mt-2">
          Upload up to 5 images. First image will be the cover.
        </p>
      </div>

      {/* Category Dropdown */}
      <DropdownSelect
        label="Category"
        options={categories}
        value={formData.category}
        onChange={(val) => setFormData({ ...formData, category: val })}
        isOpen={isCategoryOpen}
        setIsOpen={setIsCategoryOpen}
        placeholder="Select a category"
        required={true}
      />

      {/* Condition Dropdown */}
      <DropdownSelect
        label="Condition"
        options={conditions}
        value={formData.condition}
        onChange={(val) => setFormData({ ...formData, condition: val })}
        isOpen={isConditionOpen}
        setIsOpen={setIsConditionOpen}
        placeholder="Select condition"
        required={true}
      />

      {/* Title */}
      <div>
        <label className="text-sm font-semibold text-[#0F1638] block mb-2">
          Title <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          placeholder="Enter item title (e.g., Hero Sprint Cycle 27.5T)"
          maxLength={50}
          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#D9A441] focus:outline-none transition-colors bg-white"
        />
        <div className="flex justify-between text-xs text-slate-500 mt-1">
          <span>Add correct details to get more bids</span>
          <span>{formData.title.length}/50</span>
        </div>
      </div>

      {/* Brand */}
      <div>
        <label className="text-sm font-semibold text-[#0F1638] block mb-2">
          Brand <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={formData.brand}
          onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
          placeholder="Enter brand name (e.g., Hero, Nike, Apple)"
          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#D9A441] focus:outline-none transition-colors bg-white"
        />
      </div>

      {/* Description */}
      <div>
        <label className="text-sm font-semibold text-[#0F1638] block mb-2">
          Description <span className="text-red-500">*</span>
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Describe your item in detail. Include features, condition, and why someone should bid on it..."
          rows="4"
          maxLength={500}
          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#D9A441] focus:outline-none resize-none transition-colors bg-white"
        />
        <div className="flex justify-between text-xs text-slate-500 mt-1">
          <span>Minimum 20 characters</span>
          <span>{formData.description.length}/500</span>
        </div>
      </div>

      <button
        onClick={() => setStep(2)}
        disabled={!formData.category || !formData.title || !formData.brand || !formData.description || formData.images.length === 0}
        className="w-full py-3.5 rounded-xl text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-colors hover:opacity-90"
        style={{ backgroundColor: THEME.ink }}
      >
        Next: Auction Settings
      </button>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      {/* Starting Price */}
      <div>
        <label className="text-sm font-semibold text-[#0F1638] block mb-2">
          Starting Price <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-semibold">₹</span>
          <input
            type="number"
            value={formData.startingPrice}
            onChange={(e) => setFormData({ ...formData, startingPrice: e.target.value })}
            placeholder="Enter starting bid amount"
            className="w-full pl-8 pr-4 py-3 rounded-xl border border-slate-200 focus:border-[#D9A441] focus:outline-none transition-colors bg-white"
          />
        </div>
        <p className="text-xs text-slate-500 mt-1">
          This will be the starting bid amount
        </p>
      </div>

      {/* Auction Duration */}
      <div>
        <label className="text-sm font-semibold text-[#0F1638] block mb-2">
          Auction Duration <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-2 gap-3">
          {durations.map((dur) => (
            <button
              key={dur.value}
              onClick={() => setSelectedDuration(dur.value)}
              className={`p-3 rounded-xl border-2 text-sm font-medium transition-colors ${
                selectedDuration === dur.value
                  ? "border-[#D9A441] bg-[#FDF3E1] text-[#0F1638]"
                  : "border-slate-200 hover:border-slate-300 text-slate-600 bg-white"
              }`}
            >
              {dur.label}
            </button>
          ))}
        </div>
        <div className="mt-3 p-3 bg-white rounded-xl border border-slate-200 flex items-center gap-3">
          <Calendar size={18} className="text-[#D9A441]" />
          <div>
            <p className="text-sm text-slate-600">Auction will end on</p>
            <p className="text-sm font-semibold text-[#0F1638]">
              20 Aug 2025, 10:30 AM
            </p>
          </div>
        </div>
      </div>

      {/* Delivery Option Dropdown */}
      <DropdownSelect
        label="Delivery Option"
        options={deliveryOptions}
        value={formData.delivery}
        onChange={(val) => setFormData({ ...formData, delivery: val })}
        isOpen={isDeliveryOpen}
        setIsOpen={setIsDeliveryOpen}
        placeholder="Select delivery option"
        required={true}
      />

      {/* Pickup Location Dropdown */}
      <DropdownSelect
        label="Pickup Location"
        options={locations}
        value={formData.pickupLocation}
        onChange={(val) => setFormData({ ...formData, pickupLocation: val })}
        isOpen={isLocationOpen}
        setIsOpen={setIsLocationOpen}
        placeholder="Select pickup location"
        required={true}
      />

      <div className="flex gap-3">
        <button
          onClick={() => setStep(1)}
          className="flex-1 py-3.5 rounded-xl border-2 border-slate-200 text-slate-600 font-semibold hover:border-slate-300 transition-colors bg-white"
        >
          Back
        </button>
        <button
          onClick={() => setStep(3)}
          disabled={!formData.startingPrice || !formData.pickupLocation}
          className="flex-1 py-3.5 rounded-xl text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-colors hover:opacity-90"
          style={{ backgroundColor: THEME.ink }}
        >
          Next: Payment
        </button>
      </div>
    </div>
  );

  const renderStep3 = () => {
    const fees = calculateFees();
    return (
      <div className="space-y-6">
        {/* Fee Breakdown */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-slate-600">Starting Price</span>
            <span className="font-semibold text-[#0F1638]">₹{fees.price.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-600">Listing Fee (5%)</span>
            <span className="font-semibold text-[#D9A441]">₹{fees.fee.toLocaleString()}</span>
          </div>
          <div className="border-t border-slate-200 pt-3">
            <div className="flex justify-between">
              <span className="font-semibold text-[#0F1638]">Total Payable</span>
              <span className="font-bold text-[#0F1638]">₹{fees.total.toLocaleString()}</span>
            </div>
          </div>
        </div>

        <p className="text-sm text-slate-500 text-center">
          Secure payment. Your item will go live after successful payment.
        </p>

        {/* Payment Methods */}
        <div>
          <label className="text-sm font-semibold text-[#0F1638] block mb-3">
            Payment Method <span className="text-red-500">*</span>
          </label>
          <div className="space-y-3">
            {[
              { id: "upi", label: "UPI", icon: CreditCard, desc: "Pay using any UPI app" },
              { id: "card", label: "Debit / Credit Card", icon: CreditCard, desc: "Visa, Mastercard, Rupay" },
              { id: "netbanking", label: "Net Banking", icon: Building2, desc: "All major banks supported" },
              { id: "wallet", label: "Wallet", icon: Wallet, desc: "Pay using your wallet balance" },
            ].map((method) => (
              <button
                key={method.id}
                onClick={() => setSelectedPayment(method.id)}
                className={`w-full p-4 rounded-xl border-2 text-left transition-colors bg-white ${
                  selectedPayment === method.id
                    ? "border-[#D9A441] bg-[#FDF3E1]"
                    : "border-slate-200 hover:border-slate-300"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="p-2 rounded-lg"
                    style={{
                      backgroundColor: selectedPayment === method.id ? THEME.goldSoft : "#F1F5F9",
                    }}
                  >
                    <method.icon
                      size={20}
                      className={selectedPayment === method.id ? "text-[#D9A441]" : "text-slate-500"}
                    />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-[#0F1638]">{method.label}</p>
                    <p className="text-xs text-slate-500">{method.desc}</p>
                  </div>
                  {selectedPayment === method.id && (
                    <Check size={20} className="text-[#D9A441]" />
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Security Badges */}
        <div className="bg-green-50 rounded-xl p-4 space-y-2">
          <div className="flex items-center gap-2">
            <Lock size={16} className="text-green-600" />
            <span className="text-sm font-medium text-green-700">Secure & Safe</span>
          </div>
          <p className="text-xs text-green-600">
            Your payment is secured with 256-bit encryption
          </p>
          <div className="flex items-center gap-2">
            <Shield size={16} className="text-green-600" />
            <span className="text-sm font-medium text-green-700">100% Safe Payments</span>
          </div>
          <p className="text-xs text-green-600">
            Your item will go live after payment
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => setStep(2)}
            className="flex-1 py-3.5 rounded-xl border-2 border-slate-200 text-slate-600 font-semibold hover:border-slate-300 transition-colors bg-white"
          >
            Back
          </button>
          <button
            onClick={handleSubmit}
            className="flex-1 py-3.5 rounded-xl text-white font-semibold transition-colors hover:opacity-90"
            style={{ backgroundColor: THEME.gold }}
          >
            Pay Securely ₹{fees.total.toLocaleString()}
          </button>
        </div>

        <p className="text-center text-xs text-slate-500">
          By proceeding, you agree to our Terms & Conditions
        </p>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#F6F5F1] pb-24">
      <div className="mx-auto max-w-md">
        {/* Header */}
        <header className="bg-white border-b border-slate-100 px-5 py-4 sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button className="p-1 hover:bg-slate-100 rounded-lg transition-colors">
                <ArrowLeft size={22} style={{ color: THEME.ink }} />
              </button>
              <h1 className="text-lg font-bold" style={{ color: THEME.ink }}>
                Sell Your Item
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <button
                aria-label="Notifications"
                className="relative flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm"
              >
                <Bell size={17} style={{ color: THEME.ink }} />
                <span
                  className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full text-[10px] font-bold text-white"
                  style={{ backgroundColor: THEME.gold }}
                >
                  3
                </span>
              </button>
              <img
                src="https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=100&q=80"
                alt="Profile"
                className="h-10 w-10 rounded-full object-cover ring-2 ring-white"
              />
            </div>
          </div>

          {/* Progress Steps */}
          <div className="mt-4 flex items-center gap-2">
            {[1, 2, 3].map((s) => (
              <React.Fragment key={s}>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${
                        step >= s
                          ? "text-white"
                          : "bg-slate-200 text-slate-500"
                      }`}
                      style={{
                        backgroundColor: step >= s ? THEME.ink : undefined,
                      }}
                    >
                      {s}
                    </div>
                    <span
                      className={`text-xs font-medium ${
                        step >= s ? "text-[#0F1638]" : "text-slate-400"
                      }`}
                    >
                      {s === 1 ? "Details" : s === 2 ? "Auction" : "Payment"}
                    </span>
                  </div>
                </div>
                {s < 3 && (
                  <div
                    className={`flex-1 h-0.5 rounded-full ${
                      step > s ? "bg-[#0F1638]" : "bg-slate-200"
                    }`}
                    style={{ backgroundColor: step > s ? THEME.ink : undefined }}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </header>

        {/* Form Content */}
        <div className="px-5 py-6">
          <form onSubmit={handleSubmit}>
            {step === 1 && renderStep1()}
            {step === 2 && renderStep2()}
            {step === 3 && renderStep3()}
          </form>
        </div>
      </div>
    </div>
  );
}