import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Search,
  Users,
  Phone,
  Calendar,
  ShoppingBag,
  Star,
  MoreVertical,
  ChevronDown,
  CheckCircle,
  Clock,
  Filter,
  UserCheck
} from "lucide-react";

const THEME = {
  ink: "#0F1638",
  gold: "#D9A441",
  goldSoft: "#FDF3E1",
  mapBg: "#E7ECFA",
};

// Mock Customer Data
const CUSTOMERS = [
  {
    id: 1,
    name: "Rahul Patil",
    phone: "+91 98765 43210",
    lastPurchase: "20 Aug 2025",
    totalOrders: 12,
    totalSpent: "₹ 45,200",
    status: "active",
    joinedDate: "Jan 2024"
  },
  {
    id: 2,
    name: "Priya Sharma",
    phone: "+91 98765 43211",
    lastPurchase: "18 Aug 2025",
    totalOrders: 8,
    totalSpent: "₹ 28,500",
    status: "active",
    joinedDate: "Mar 2024"
  },
  {
    id: 3,
    name: "Amit Jadhav",
    phone: "+91 98765 43212",
    lastPurchase: "15 Aug 2025",
    totalOrders: 5,
    totalSpent: "₹ 15,300",
    status: "active",
    joinedDate: "Jun 2024"
  },
  {
    id: 4,
    name: "Sagar Deshmukh",
    phone: "+91 98765 43213",
    lastPurchase: "10 Aug 2025",
    totalOrders: 3,
    totalSpent: "₹ 8,700",
    status: "inactive",
    joinedDate: "Aug 2024"
  },
  {
    id: 5,
    name: "Vikram Mane",
    phone: "+91 98765 43214",
    lastPurchase: "05 Aug 2025",
    totalOrders: 7,
    totalSpent: "₹ 22,400",
    status: "active",
    joinedDate: "Feb 2024"
  }
];

export default function MyCustomersPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all"); // all, active, inactive

  // Filter Logic
  const filteredCustomers = CUSTOMERS.filter((customer) => {
    const matchesSearch = customer.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === "all" || customer.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-[#F6F5F1] pb-24">
      <div className="mx-auto max-w-md">
        
        {/* Header */}
        <header className="bg-white px-5 py-4 sticky top-0 z-10 border-b border-slate-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button onClick={() => navigate(-1)} className="p-1 hover:bg-slate-100 rounded-full transition-colors">
                <ArrowLeft size={22} className="text-[#0F1638]" />
              </button>
              <div>
                <h1 className="text-[17px] font-bold text-[#0F1638]">My Customers</h1>
                <p className="text-[11px] text-slate-500">{CUSTOMERS.length} Total Customers</p>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="mt-3 relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search customers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm outline-none focus:border-[#D9A441] transition-colors bg-slate-50"
            />
          </div>
        </header>

        {/* Content */}
        <div className="px-4 pt-4 pb-6 space-y-4">
          
          {/* Filter Tabs */}
          <div className="flex gap-2 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {[
              { id: "all", label: "All Customers", count: CUSTOMERS.length },
              { id: "active", label: "Active", count: CUSTOMERS.filter(c => c.status === "active").length },
              { id: "inactive", label: "Inactive", count: CUSTOMERS.filter(c => c.status === "inactive").length }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilterStatus(tab.id)}
                className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                  filterStatus === tab.id
                    ? "bg-[#0F1638] text-white shadow-md"
                    : "bg-white text-slate-600 border border-slate-200"
                }`}
              >
                {tab.label} ({tab.count})
              </button>
            ))}
          </div>

          {/* Customers List */}
          <div className="space-y-3">
            {filteredCustomers.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-2xl border border-slate-100">
                <Users size={48} className="mx-auto text-slate-300 mb-3" />
                <h3 className="font-bold text-[#0F1638]">No customers found</h3>
                <p className="text-xs text-slate-500 mt-1">Try adjusting your search or filter.</p>
              </div>
            ) : (
              filteredCustomers.map((customer) => (
                <div key={customer.id} className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      {/* Customer Avatar */}
                      <div className="w-12 h-12 rounded-full bg-[#FDF3E1] flex items-center justify-center flex-shrink-0">
                        <span className="text-[#D9A441] font-bold text-lg">
                          {customer.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-[#0F1638] text-[15px]">{customer.name}</h3>
                          {customer.status === "active" ? (
                            <span className="flex items-center gap-1 bg-green-100 text-green-700 text-[9px] font-bold px-2 py-0.5 rounded-full">
                              <CheckCircle size={10} /> Active
                            </span>
                          ) : (
                            <span className="flex items-center gap-1 bg-slate-100 text-slate-500 text-[9px] font-bold px-2 py-0.5 rounded-full">
                              <Clock size={10} /> Inactive
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-3 mt-0.5">
                          <p className="flex items-center gap-1 text-[11px] text-slate-500">
                            <Phone size={12} /> {customer.phone}
                          </p>
                          <span className="w-px h-3 bg-slate-200"></span>
                          <p className="text-[11px] text-slate-500">
                            Joined {customer.joinedDate}
                          </p>
                        </div>
                      </div>
                    </div>
                    <button className="p-1 hover:bg-slate-100 rounded-full transition-colors">
                      <MoreVertical size={16} className="text-slate-400" />
                    </button>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-3 gap-3 mt-4 pt-3 border-t border-slate-100">
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1 text-[#0F1638]">
                        <ShoppingBag size={14} />
                        <p className="font-bold text-sm">{customer.totalOrders}</p>
                      </div>
                      <p className="text-[10px] text-slate-500">Total Orders</p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1 text-[#0F1638]">
                        <Calendar size={14} />
                        <p className="font-bold text-sm">{customer.lastPurchase}</p>
                      </div>
                      <p className="text-[10px] text-slate-500">Last Purchase</p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1 text-[#D9A441]">
                        <Star size={14} className="fill-[#D9A441]" />
                        <p className="font-bold text-sm">{customer.totalSpent}</p>
                      </div>
                      <p className="text-[10px] text-slate-500">Total Spent</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

        </div>
      </div>
    </div>
  );
}