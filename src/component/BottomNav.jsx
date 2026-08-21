import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Compass, Plus, MessageCircle, User } from "lucide-react";

const NAV_ITEMS = [
  { id: "home", label: "Home", icon: Home, path: "/home" },
  { id: "explore", label: "Explore", icon: Compass, path: "/explore" },
  { id: "sell", label: "Sell", icon: Plus, isCenter: true, path: "/sell" },
  { id: "Community", label: "Community", icon: MessageCircle, showBadge: true, path: "/community" },
  { id: "profile", label: "Profile", icon: User, path: "/profile" },
];

const THEME = {
  ink: "#0F1638",
  gold: "#D9A441",
};

export default function BottomNav({ chatBadgeCount = 6 }) {
  const location = useLocation();
  const activePath = location.pathname;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-slate-100 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-md items-center justify-between px-4 py-2">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activePath === item.path;
          
          if (item.isCenter) {
            return (
              <Link
                key={item.id}
                to={item.path}
                className="-mt-6 flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full text-white shadow-lg shadow-blue-900/30 transition-transform active:scale-95"
                style={{ backgroundColor: THEME.ink }}
              >
                <Icon size={26} strokeWidth={2.5} />
              </Link>
            );
          }
          
          return (
            <Link
              key={item.id}
              to={item.path}
              className="relative flex flex-1 flex-col items-center gap-1 py-1 text-[11px] font-medium"
            >
              <span className="relative">
                <Icon
                  size={22}
                  strokeWidth={2}
                  className={isActive ? "text-[#0F1638]" : "text-slate-400"}
                />
                {item.showBadge && chatBadgeCount > 0 && (
                  <span
                    className="absolute -right-2 -top-1.5 flex h-4 min-w-[16px] items-center justify-center rounded-full px-1 text-[9px] font-semibold text-white"
                    style={{ backgroundColor: THEME.gold }}
                  >
                    {chatBadgeCount > 9 ? "9+" : chatBadgeCount}
                  </span>
                )}
              </span>
              <span className={isActive ? "text-[#0F1638]" : "text-slate-400"}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}