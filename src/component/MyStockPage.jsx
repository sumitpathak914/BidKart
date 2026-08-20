import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Plus,
  Search,
  Boxes,
  Edit2,
  Trash2,
  Package,
  AlertCircle,
  CheckCircle,
  X,
  Upload,
  Image as ImageIcon,
  DollarSign,
  Tag
} from "lucide-react";

const THEME = {
  ink: "#0F1638",
  gold: "#D9A441",
  goldSoft: "#FDF3E1",
  mapBg: "#E7ECFA",
};

// Mock Stock Data
const INITIAL_STOCK = [
  {
    id: 1,
    name: "Hero Sprint 27.5T Cycle",
    description: "Premium mountain cycle with 21-speed gear system and disc brakes.",
    price: "₹ 12,500",
    quantity: 15,
    image: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=200&q=80",
    status: "in_stock"
  },
  {
    id: 2,
    name: "Nike Air Max Premium",
    description: "Comfortable running shoes with lightweight design.",
    price: "₹ 4,500",
    quantity: 3,
    image: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=200&q=80",
    status: "low_stock"
  },
  {
    id: 3,
    name: "Canon EOS 200D DSLR",
    description: "Professional camera with 24MP sensor and 1080p video recording.",
    price: "₹ 35,000",
    quantity: 0,
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=200&q=80",
    status: "out_of_stock"
  },
  {
    id: 4,
    name: "iPhone 13 Pro Max",
    description: "128GB, Graphite color, mint condition.",
    price: "₹ 62,000",
    quantity: 8,
    image: "https://images.unsplash.com/photo-1632661674596-df8be070a5c5?w=200&q=80",
    status: "in_stock"
  }
];

export default function MyStockPage() {
  const navigate = useNavigate();
  const [stockItems, setStockItems] = useState(INITIAL_STOCK);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  
  // Form State
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    quantity: "",
    image: ""
  });

  // Filter Stock
  const filteredStock = stockItems.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Get Status Badge
  const getStatusBadge = (status) => {
    switch(status) {
      case 'in_stock':
        return <span className="flex items-center gap-1 bg-green-100 text-green-700 text-[10px] font-bold px-2 py-1 rounded-full"><CheckCircle size={12} /> In Stock</span>;
      case 'low_stock':
        return <span className="flex items-center gap-1 bg-amber-100 text-amber-700 text-[10px] font-bold px-2 py-1 rounded-full"><AlertCircle size={12} /> Low Stock</span>;
      case 'out_of_stock':
        return <span className="flex items-center gap-1 bg-red-100 text-red-700 text-[10px] font-bold px-2 py-1 rounded-full"><X size={12} /> Out of Stock</span>;
      default:
        return null;
    }
  };

  // Handle Image Selection from System
  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle Add/Edit Stock
  const handleSubmit = (e) => {
    e.preventDefault();
    const newItem = {
      id: editingItem ? editingItem.id : Date.now(),
      ...formData,
      status: parseInt(formData.quantity) === 0 ? 'out_of_stock' : parseInt(formData.quantity) < 5 ? 'low_stock' : 'in_stock',
      price: `₹ ${formData.price}`
    };

    if (editingItem) {
      // Update existing item
      setStockItems(stockItems.map(item => item.id === editingItem.id ? newItem : item));
    } else {
      // Add new item
      setStockItems([newItem, ...stockItems]);
    }

    setShowAddModal(false);
    setEditingItem(null);
    setFormData({ name: "", description: "", price: "", quantity: "", image: "" });
  };

  // Handle Delete
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this stock item?")) {
      setStockItems(stockItems.filter(item => item.id !== id));
    }
  };

  // Handle Edit
  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      description: item.description,
      price: item.price.replace('₹ ', ''),
      quantity: item.quantity.toString(),
      image: item.image
    });
    setShowAddModal(true);
  };

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
                <h1 className="text-[17px] font-bold text-[#0F1638]">My Stock</h1>
                <p className="text-[11px] text-slate-500">{stockItems.length} Items in Stock</p>
              </div>
            </div>
            <button 
              onClick={() => {
                setEditingItem(null);
                setFormData({ name: "", description: "", price: "", quantity: "", image: "" });
                setShowAddModal(true);
              }}
              className="flex items-center gap-1 px-3 py-2 bg-[#0F1638] text-white text-xs font-bold rounded-full hover:opacity-90 transition-colors"
            >
              <Plus size={16} /> Add Stock
            </button>
          </div>
        </header>

        {/* Content */}
        <div className="px-4 pt-4 pb-6 space-y-4">
          
          {/* Search Bar */}
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search stock items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-sm outline-none focus:border-[#D9A441] transition-colors bg-slate-50"
            />
          </div>

          {/* Stock Items List */}
          <div className="space-y-3">
            {filteredStock.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-2xl border border-slate-100">
                <Boxes size={48} className="mx-auto text-slate-300 mb-3" />
                <h3 className="font-bold text-[#0F1638]">No stock items found</h3>
                <p className="text-xs text-slate-500 mt-1">Add your first stock item by clicking "Add Stock"</p>
              </div>
            ) : (
              filteredStock.map((item) => (
                <div key={item.id} className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex gap-4">
                    {/* Product Image */}
                    <div className="w-20 h-20 flex-shrink-0 rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h3 className="font-bold text-[#0F1638] text-[14px]">{item.name}</h3>
                          <p className="text-[11px] text-slate-500 line-clamp-2 mt-0.5">{item.description}</p>
                        </div>
                        <div className="flex-shrink-0 text-right">
                          <p className="text-[14px] font-extrabold text-[#D9A441]">{item.price}</p>
                          <p className="text-[10px] text-slate-500">Qty: {item.quantity}</p>
                          <div className="mt-1">
                            {getStatusBadge(item.status)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-3 pt-3 border-t border-slate-100 flex justify-end gap-2">
                    <button 
                      onClick={() => handleEdit(item)}
                      className="px-3 py-1.5 border border-[#0F1638] text-[#0F1638] text-[10px] font-bold rounded-lg flex items-center gap-1 hover:bg-slate-50 transition-colors"
                    >
                      <Edit2 size={12} /> Edit
                    </button>
                    <button 
                      onClick={() => handleDelete(item.id)}
                      className="px-3 py-1.5 border border-red-200 text-red-500 text-[10px] font-bold rounded-lg flex items-center gap-1 hover:bg-red-50 transition-colors"
                    >
                      <Trash2 size={12} /> Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

        </div>
      </div>

      {/* Add/Edit Stock Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white w-full max-w-md rounded-3xl overflow-hidden shadow-2xl animate-slide-up relative p-6">
            {/* Close Button */}
            <button 
              onClick={() => {
                setShowAddModal(false);
                setEditingItem(null);
              }}
              className="absolute top-4 right-4 p-1 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors"
            >
              <X size={20} className="text-slate-500" />
            </button>

            <div className="flex items-center gap-3 mb-4 pt-2">
              <div className="p-2 bg-[#FDF3E1] rounded-lg">
                <Boxes size={24} className="text-[#D9A441]" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-[#0F1638]">
                  {editingItem ? "Edit Stock Item" : "Add Stock Item"}
                </h2>
                <p className="text-xs text-slate-500">Add or update product information</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              
              {/* --- NEW: File Upload from System --- */}
              <div>
                <label className="text-[11px] font-semibold text-slate-600">Product Image</label>
                <div className="flex items-center gap-3">
                  <label className="flex-1 cursor-pointer">
                    <div className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-600 hover:bg-slate-50 transition-colors">
                      <Upload size={16} />
                      <span>Choose from System</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageSelect}
                      />
                    </div>
                  </label>
                  {formData.image && (
                    <div className="w-12 h-12 flex-shrink-0 rounded-lg overflow-hidden border border-slate-200">
                      <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>
              </div>
              {/* ------------------------------------ */}

              {/* Product Name */}
              <div>
                <label className="text-[11px] font-semibold text-slate-600">Product Name</label>
                <input
                  type="text"
                  placeholder="Enter product name"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm outline-none focus:border-[#D9A441] transition-colors bg-slate-50"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>

              {/* Description */}
              <div>
                <label className="text-[11px] font-semibold text-slate-600">Description</label>
                <textarea
                  placeholder="Enter product description"
                  rows={3}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm outline-none focus:border-[#D9A441] transition-colors bg-slate-50 resize-none"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                />
              </div>

              {/* Price & Quantity */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-semibold text-slate-600">Price (₹)</label>
                  <input
                    type="number"
                    placeholder="0"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm outline-none focus:border-[#D9A441] transition-colors bg-slate-50"
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-slate-600">Quantity</label>
                  <input
                    type="number"
                    placeholder="0"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm outline-none focus:border-[#D9A441] transition-colors bg-slate-50"
                    value={formData.quantity}
                    onChange={(e) => setFormData({...formData, quantity: e.target.value})}
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3.5 rounded-xl text-white font-bold shadow-lg flex items-center justify-center gap-2 transition-transform hover:scale-[1.01] active:scale-95"
                style={{ backgroundColor: THEME.ink }}
              >
                {editingItem ? "Update Stock" : "Add to Stock"} <Plus size={18} />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}