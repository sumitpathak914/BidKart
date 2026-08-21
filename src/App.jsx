import { useEffect } from "react";
import {
  BrowserRouter,
  Route,
  Routes,
  useLocation,
  Navigate
} from "react-router-dom";
import AllAuctionsPage from "./component/AllAuctionsPage";
import AuctionDetailsPage from "./component/AuctionDetailsPage";
import LoginPage from "./component/AuthModal";
import BiddingDashboardPage from "./component/BiddingDashboardPage";
import BiddingDetailsPage from "./component/BiddingDetailsPage";
import BottomNav from "./component/BottomNav";
import CommunityChatPage from "./component/CommunityChatPage";
import CommunityPage from "./component/CommunityPage";
import ExplorePage from "./component/Explorepage";
import HelpAndSupportPage from "./component/HelpAndSupportPage";
import HomePage from "./component/Homepage";
import KycPage from "./component/KycPage";
import MyCommunityPage from "./component/MyCommunityPage";
import MyCustomersPage from "./component/MyCustomersPage";
import MyListingDetailsPage from "./component/MyListingDetailsPage";
import MyListingsPage from "./component/MyListingsPage";
import MyStockPage from "./component/MyStockPage";
import ProfilePage from "./component/ProfilePage";
import QRScannerPage from "./component/QRScannerPage";
import SellPage from "./component/SellPage";
import SettingsPage from "./component/SettingsPage";
import ShopDetailsPage from "./component/ShopDetailsPage";

function LayoutWithBottomNav() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Simple check - show BottomNav on all pages EXCEPT "/"
  const showBottomNav = location.pathname !== "/";

  console.log("Path:", location.pathname);
  console.log("Show BottomNav:", showBottomNav);

  return (
    <div className="min-h-screen bg-[#F6F5F1]">
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/explore" element={<ExplorePage />} />
        <Route path="/sell" element={<SellPage />} />
        <Route path="/community" element={<CommunityPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/scan-qr" element={<QRScannerPage />} />
        <Route path="/shop/:shopId" element={<ShopDetailsPage />} />
        <Route path="/auction/:auctionId" element={<AuctionDetailsPage />} />
        <Route path="/all-auctions" element={<AllAuctionsPage />} />
        <Route path="/community-chat/:communityId" element={<CommunityChatPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/my-listings" element={<MyListingsPage />} />
        <Route path="/help" element={<HelpAndSupportPage />} />
        <Route path="/my-listing-details/:listingId" element={<MyListingDetailsPage />} />
        <Route path="/kyc" element={<KycPage />} />
        <Route path="/my-community" element={<MyCommunityPage />} />
        <Route path="/my-customers" element={<MyCustomersPage />} />
        <Route path="/my-stock" element={<MyStockPage />} />
        <Route path="/bidding-dashboard" element={<BiddingDashboardPage />} />
        <Route path="/bidding-details/:auctionId" element={<BiddingDetailsPage />} />
      </Routes>
      
      {/* BottomNav - Only show when NOT on login page */}
      {showBottomNav && <BottomNav />}
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