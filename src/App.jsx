import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./component/Homepage";
import ExplorePage from "./component/Explorepage";
import BottomNav from "./component/BottomNav";
import SellPage from "./component/SellPage";
import CommunityPage from "./component/CommunityPage";



function AppContent() {
  return (
    <div className="min-h-screen bg-[#F6F5F1]">
      <Routes>
        {/* <Route path="/" element={<Navigate to="/home" replace />} /> */}
        <Route path="/" element={<HomePage />} />
        <Route path="/explore" element={<ExplorePage />} />
        <Route path="/sell" element={<SellPage />} />
        <Route path="/community" element={<CommunityPage />} />
        {/* Add other routes */}
        {/* <Route path="/sell" element={<SellPage />} /> */}
        {/* <Route path="/chat" element={<ChatPage />} /> */}
        {/* <Route path="/profile" element={<ProfilePage />} /> */}
      </Routes>
      <BottomNav />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}