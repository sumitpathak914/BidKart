// import React from "react";
// import { Home, Compass, Plus, MessageCircle, User } from "lucide-react";

// /**
//  * BottomNav
//  * A common, reusable bottom navigation bar for mobile apps.
//  *
//  * Props:
//  * - active: string  -> which tab is active ("home" | "explore" | "sell" | "chat" | "profile")
//  * - onChange: (tabId: string) => void -> called when a tab is pressed
//  * - chatBadgeCount: number -> optional unread count shown on the Chat tab
//  */
// const NAV_ITEMS = [
//   { id: "home", label: "Home", icon: Home },
//   { id: "explore", label: "Explore", icon: Compass },
//   { id: "sell", label: "Sell", icon: Plus, isCenter: true },
//   { id: "chat", label: "Chat", icon: MessageCircle, showBadge: true },
//   { id: "profile", label: "Profile", icon: User },
// ];

// export default function BottomNav({
//   active = "home",
//   onChange = () => {},
//   chatBadgeCount = 0,
// }) {
//   return (
//     <nav
//       className="fixed bottom-0 left-0 right-0 z-50 border-t border-slate-100 bg-white/95 backdrop-blur-sm"
//       style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
//     >
//       <div className="mx-auto flex max-w-md items-center justify-between px-4 py-2">
//         {NAV_ITEMS.map((item) => {
//           const Icon = item.icon;
//           const isActive = active === item.id;

//           if (item.isCenter) {
//             return (
//               <button
//                 key={item.id}
//                 onClick={() => onChange(item.id)}
//                 aria-label={item.label}
//                 className="-mt-6 flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-blue-900 text-white shadow-lg shadow-blue-900/30 transition-transform active:scale-95"
//               >
//                 <Icon size={26} strokeWidth={2.5} />
//               </button>
//             );
//           }

//           return (
//             <button
//               key={item.id}
//               onClick={() => onChange(item.id)}
//               aria-label={item.label}
//               className="relative flex flex-1 flex-col items-center gap-1 py-1 text-[11px] font-medium"
//             >
//               <span className="relative">
//                 <Icon
//                   size={22}
//                   strokeWidth={2}
//                   className={isActive ? "text-blue-900" : "text-slate-400"}
//                 />
//                 {item.showBadge && chatBadgeCount > 0 && (
//                   <span className="absolute -right-2 -top-1.5 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-blue-600 px-1 text-[9px] font-semibold text-white">
//                     {chatBadgeCount > 9 ? "9+" : chatBadgeCount}
//                   </span>
//                 )}
//               </span>
//               <span className={isActive ? "text-blue-900" : "text-slate-400"}>
//                 {item.label}
//               </span>
//             </button>
//           );
//         })}
//       </div>
//     </nav>
//   );
// }

import React from "react";
import { Home, Compass, Plus, MessageCircle, User } from "lucide-react";

const NAV_ITEMS = [
  { id: "home", label: "Home", icon: Home },
  { id: "explore", label: "Explore", icon: Compass },
  { id: "sell", label: "Sell", icon: Plus, isCenter: true },
  { id: "chat", label: "Chat", icon: MessageCircle, showBadge: true },
  { id: "profile", label: "Profile", icon: User },
];

export default function BottomNav({ 
  active = "home", 
  onChange = () => {}, 
  chatBadgeCount = 0,
  activeColorClass = "text-blue-900",
  centerBgClass = "bg-blue-900",
  badgeColorClass = "bg-blue-600"
}) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-slate-100 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-md items-center justify-between px-4 py-2">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = active === item.id;
          
          if (item.isCenter) {
            return (
              <button 
                key={item.id} 
                onClick={() => onChange(item.id)} 
                aria-label={item.label}
                className={`-mt-6 flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full text-white shadow-lg shadow-blue-900/30 transition-transform active:scale-95 ${centerBgClass}`}
              >
                <Icon size={26} strokeWidth={2.5} />
              </button>
            );
          }
          
          return (
            <button 
              key={item.id} 
              onClick={() => onChange(item.id)} 
              aria-label={item.label}
              className="relative flex flex-1 flex-col items-center gap-1 py-1 text-[11px] font-medium"
            >
              <span className="relative">
                <Icon 
                  size={22} 
                  strokeWidth={2} 
                  className={isActive ? activeColorClass : "text-slate-400"} 
                />
                {item.showBadge && chatBadgeCount > 0 && (
                  <span className={`absolute -right-2 -top-1.5 flex h-4 min-w-[16px] items-center justify-center rounded-full px-1 text-[9px] font-semibold text-white ${badgeColorClass}`}>
                    {chatBadgeCount > 9 ? "9+" : chatBadgeCount}
                  </span>
                )}
              </span>
              <span className={isActive ? activeColorClass : "text-slate-400"}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}