import { Home, Compass, PlusCircle, Users, User } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { id: "home", label: "Home", icon: Home, path: "/home" },
    { id: "explore", label: "Explore", icon: Compass, path: "/explore" },
    { id: "Bidding", label: "Bidding", icon: PlusCircle, path: "/all-auctions" },
    { id: "community", label: "Community", icon: Users, path: "/community" },
    { id: "profile", label: "Profile", icon: User, path: "/profile" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-4 py-2 z-50 shadow-lg">
      <div className="max-w-md mx-auto flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <button
              key={item.id}
              onClick={() => navigate(item.path)}
              className="flex flex-col items-center gap-0.5 py-1 px-3"
            >
              <Icon
                size={24}
                className={`${
                  isActive ? "text-[#D9A441]" : "text-slate-400"
                } transition-colors`}
              />
              <span
                className={`text-[10px] font-medium ${
                  isActive ? "text-[#D9A441]" : "text-slate-400"
                } transition-colors`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}