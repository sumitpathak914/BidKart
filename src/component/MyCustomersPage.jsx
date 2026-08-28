import {
  ArrowLeft,
  Calendar,
  CheckCircle,
  Clock,
  Loader2,
  MoreVertical,
  Phone,
  Search,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getToken } from "../component/userSession"; // Assuming you have this utility

const THEME = {
  ink: "#0F1638",
  gold: "#D9A441",
  goldSoft: "#FDF3E1",
  mapBg: "#E7ECFA",
};

// Base URL for API
const BASE_URL = "https://test.aakarcanvassing.com";

// Function to mask phone number
const maskPhoneNumber = (phone) => {
  if (!phone) return "";
  const phoneStr = String(phone);
  if (phoneStr.length <= 5) return phoneStr;
  const firstThree = phoneStr.slice(0, 3);
  const lastTwo = phoneStr.slice(-2);
  const middleLength = phoneStr.length - 5;
  const masked = "*".repeat(middleLength);
  return `${firstThree}${masked}${lastTwo}`;
};

// Format date
const formatDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-IN", {
    month: "short",
    year: "numeric",
  });
};

export default function MyCustomersPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all"); // all, active, inactive
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [business, setBusiness] = useState(null);

  // Fetch customers from API
  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      setError(null);

      const token = getToken();

      if (!token) {
        setError("Please login to view customers");
        setLoading(false);
        return;
      }

      const response = await fetch(
        `${BASE_URL}/api/business/business-customers`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );

      const data = await response.json();

      if (data.success) {
        setCustomers(data.data || []);
        setBusiness(data.business);
      } else {
        setError(data.message || "Failed to fetch customers");
      }
    } catch (err) {
      console.error("Error fetching customers:", err);
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Filter Logic
  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch = customer.name
      ?.toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesStatus =
      filterStatus === "all" || customer.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  // Count statuses
  const activeCount = customers.filter((c) => c.status === "active").length;
  const inactiveCount = customers.filter((c) => c.status === "inactive").length;

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F6F5F1] flex items-center justify-center">
        <div className="text-center">
          <Loader2
            size={48}
            className="animate-spin mx-auto text-[#D9A441] mb-4"
          />
          <p className="text-[#0F1638] font-semibold">Loading customers...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#F6F5F1] flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-2xl shadow-lg max-w-sm">
          <Users size={48} className="mx-auto text-red-500 mb-4" />
          <h3 className="font-bold text-[#0F1638] mb-2">Error</h3>
          <p className="text-sm text-slate-500 mb-4">{error}</p>
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-2.5 bg-[#0F1638] text-white rounded-xl text-sm font-semibold hover:bg-opacity-90 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F6F5F1] pb-24">
      <div className="mx-auto max-w-md">
        {/* Header */}
        <header className="bg-white px-5 py-4 sticky top-0 z-10 border-b border-slate-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                onClick={() => navigate(-1)}
                className="p-1 hover:bg-slate-100 rounded-full transition-colors"
              >
                <ArrowLeft size={22} className="text-[#0F1638]" />
              </button>
              <div>
                <h1 className="text-[17px] font-bold text-[#0F1638]">
                  My Customers
                </h1>
                <p className="text-[11px] text-slate-500">
                  {customers.length} Total Customers
                </p>
              </div>
            </div>
            {business && (
              <div className="text-right">
                <p className="text-[10px] text-slate-400">
                  {business.business_name}
                </p>
              </div>
            )}
          </div>

          {/* Search Bar */}
          <div className="mt-3 relative">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
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
              { id: "all", label: "All Customers", count: customers.length },
              { id: "active", label: "Active", count: activeCount },
              { id: "inactive", label: "Inactive", count: inactiveCount },
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
                <p className="text-xs text-slate-500 mt-1">
                  Try adjusting your search or filter.
                </p>
              </div>
            ) : (
              filteredCustomers.map((customer) => (
                <div
                  key={customer.user_id}
                  className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3 flex-1">
                      {/* Customer Avatar */}
                      <div className="w-12 h-12 rounded-full bg-[#FDF3E1] flex items-center justify-center flex-shrink-0">
                        <span className="text-[#D9A441] font-bold text-lg">
                          {customer.name?.charAt(0) || "U"}
                        </span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-bold text-[#0F1638] text-[15px]">
                            {customer.name}
                          </h3>
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
                        <div className="flex items-center gap-3 mt-1">
                          <p className="flex items-center gap-1 text-[11px] text-slate-500">
                            <Phone size={12} />{" "}
                            {maskPhoneNumber(customer.phone)}
                          </p>
                          <span className="w-px h-3 bg-slate-200"></span>
                          <p className="flex items-center gap-1 text-[11px] text-slate-500">
                            <Calendar size={12} />{" "}
                            {formatDate(
                              customer.joined_at || customer.joined_date,
                            )}
                          </p>
                        </div>
                        {customer.community_name && (
                          <p className="text-[10px] text-slate-400 mt-1">
                            Member of: {customer.community_name}
                          </p>
                        )}
                      </div>
                    </div>
                    <button className="p-1 hover:bg-slate-100 rounded-full transition-colors flex-shrink-0">
                      <MoreVertical size={16} className="text-slate-400" />
                    </button>
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
