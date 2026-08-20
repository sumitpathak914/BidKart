import React from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import HomePage from "./component/Homepage";
import ExplorePage from "./component/Explorepage";
import BottomNav from "./component/BottomNav";
import SellPage from "./component/SellPage";
import CommunityPage from "./component/CommunityPage";
import ProfilePage from "./component/ProfilePage";
import QRScannerPage from "./component/QRScannerPage";
import ShopDetailsPage from "./component/ShopDetailsPage";
import AuctionDetailsPage from "./component/AuctionDetailsPage";

// Helper component to conditionally show the BottomNav
function LayoutWithBottomNav() {
  const location = useLocation();

  // List of paths where you DO NOT want the Bottom Navigation to show
  const hideBottomNavPaths = [
    "/scan-qr", 
    "/shop", // Hides on /shop/1, /shop/2, etc.
    "/auction" // Hides on /auction/1, /auction/2, etc.
  ];

  // Check if the current pathname starts with any of the paths in the list
  const shouldShowBottomNav = !hideBottomNavPaths.some(path => 
    location.pathname.startsWith(path)
  );

  return (
    <div className="min-h-screen bg-[#F6F5F1] pb-24"> 
      {/* Added pb-24 (padding-bottom) to give space for the nav on main pages */}
      
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/explore" element={<ExplorePage />} />
        <Route path="/sell" element={<SellPage />} />
        <Route path="/community" element={<CommunityPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/scan-qr" element={<QRScannerPage />} />
        <Route path="/shop/:shopId" element={<ShopDetailsPage />} />
        <Route path="/auction/:auctionId" element={<AuctionDetailsPage />} />
      </Routes>

      {/* Conditionally render BottomNav */}
      {shouldShowBottomNav && <BottomNav />}
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <LayoutWithBottomNav />
    </BrowserRouter>
  );
}