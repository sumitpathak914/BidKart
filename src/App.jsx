import { useEffect } from "react";
import { BrowserRouter, Route, Routes, useLocation, Navigate } from "react-router-dom";
import AllAuctionsPage from "./component/AllAuctionsPage";
import AuctionDetailsPage from "./component/AuctionDetailsPage";
import BiddingDashboardPage from "./component/BiddingDashboardPage";
import BiddingDetailsPage from "./component/BiddingDetailsPage";
import BottomNav from "./component/BottomNav";
import CommunityChatPage from "./component/CommunityChatPage";
import CommunityPage from "./component/CommunityPage";
import ExplorePage from "./component/Explorepage";
import HomePage from "./component/Homepage";
import MyCommunityPage from "./component/MyCommunityPage";
import MyCustomersPage from "./component/MyCustomersPage";
import MyListingDetailsPage from "./component/MyListingDetailsPage";
import MyListingsPage from "./component/MyListingsPage";
import MyStockPage from "./component/MyStockPage";
import ProfilePage from "./component/ProfilePage";
import QRScannerPage from "./component/QRScannerPage";
import SellPage from "./component/SellPage";
import ShopDetailsPage from "./component/ShopDetailsPage";
import KycPage from "./component/KycPage";
import SettingsPage from "./component/SettingsPage";
import HelpAndSupportPage from "./component/HelpAndSupportPage";
import LoginPage from "./component/AuthModal";
import { AppProvider, useApp } from "./context/AppContext";

// Protected Route Component using AppContext
function ProtectedRoute({ children }) {
  const { user } = useApp(); // Use AppContext instead of AuthContext
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

// Helper component to conditionally show the BottomNav
function LayoutWithBottomNav() {
  const location = useLocation();
  const { user } = useApp(); // Use AppContext

  // Automatically Scroll to Top on every page change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // List of paths where you DO NOT want the Bottom Navigation to show
  const hideBottomNavPaths = [
    "/login",
    "/scan-qr",
    "/shop",
    "/auction",
    "/community-chat",
    "/my-listings",
    "/my-listing-details",
    "/my-community",
    "/my-customers",
    "/my-stock",
  ];

  // Check if the current pathname starts with any of the paths in the list
  const shouldShowBottomNav = !hideBottomNavPaths.some((path) =>
    location.pathname.startsWith(path)
  );

  // Don't show BottomNav on login page
  const isLoginPage = location.pathname === "/login";

  return (
    <div className="min-h-screen bg-[#F6F5F1] pb-24">
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<LoginPage />} />
        
        {/* Protected Routes */}
        <Route path="/" element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        } />
        <Route path="/explore" element={
          <ProtectedRoute>
            <ExplorePage />
          </ProtectedRoute>
        } />
        <Route path="/sell" element={
          <ProtectedRoute>
            <SellPage />
          </ProtectedRoute>
        } />
        <Route path="/community" element={
          <ProtectedRoute>
            <CommunityPage />
          </ProtectedRoute>
        } />
        <Route path="/profile" element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        } />
        <Route path="/scan-qr" element={
          <ProtectedRoute>
            <QRScannerPage />
          </ProtectedRoute>
        } />
        <Route path="/shop/:shopId" element={
          <ProtectedRoute>
            <ShopDetailsPage />
          </ProtectedRoute>
        } />
        <Route path="/auction/:auctionId" element={
          <ProtectedRoute>
            <AuctionDetailsPage />
          </ProtectedRoute>
        } />
        <Route path="/all-auctions" element={
          <ProtectedRoute>
            <AllAuctionsPage />
          </ProtectedRoute>
        } />
        <Route path="/community-chat/:communityId" element={
          <ProtectedRoute>
            <CommunityChatPage />
          </ProtectedRoute>
        } />
        <Route path="/settings" element={
          <ProtectedRoute>
            <SettingsPage />
          </ProtectedRoute>
        } />
        <Route path="/my-listings" element={
          <ProtectedRoute>
            <MyListingsPage />
          </ProtectedRoute>
        } />
        <Route path="/help" element={
          <ProtectedRoute>
            <HelpAndSupportPage />
          </ProtectedRoute>
        } />
        <Route path="/my-listing-details/:listingId" element={
          <ProtectedRoute>
            <MyListingDetailsPage />
          </ProtectedRoute>
        } />
        <Route path="/kyc" element={
          <ProtectedRoute>
            <KycPage />
          </ProtectedRoute>
        } />
        <Route path="/my-community" element={
          <ProtectedRoute>
            <MyCommunityPage />
          </ProtectedRoute>
        } />
        <Route path="/my-customers" element={
          <ProtectedRoute>
            <MyCustomersPage />
          </ProtectedRoute>
        } />
        <Route path="/my-stock" element={
          <ProtectedRoute>
            <MyStockPage />
          </ProtectedRoute>
        } />
        <Route path="/bidding-dashboard" element={
          <ProtectedRoute>
            <BiddingDashboardPage />
          </ProtectedRoute>
        } />
        <Route path="/bidding-details/:auctionId" element={
          <ProtectedRoute>
            <BiddingDetailsPage />
          </ProtectedRoute>
        } />
      </Routes>
      {!isLoginPage && shouldShowBottomNav && user && <BottomNav />}
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <LayoutWithBottomNav />
      </AppProvider>
    </BrowserRouter>
  );
}