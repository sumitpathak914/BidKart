import { useEffect } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
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
import SplashScreen from "./component/SplashScreen"; // <--- NEW IMPORT

// Helper component to conditionally show the BottomNav
function LayoutWithBottomNav() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const hideBottomNavPaths = [
    "/scan-qr",
    "/",
    "/shop",
    "/auction",
    "/community-chat",
    "/my-listings",
    "/my-listing-details",
    "/my-community",
    "/my-customers",
    "/my-stock",
  ];

  const shouldShowBottomNav = !hideBottomNavPaths.some((path) =>
    location.pathname.startsWith(path),
  );

  return (
    <div className="min-h-screen bg-[#F6F5F1] pb-24">
      <Routes>
        {/* Splash Screen is now the default route (/) */}
        <Route path="/" element={<SplashScreen />} />

        {/* Home Page moved to /home */}
        <Route path="/home" element={<HomePage />} />

        <Route path="/explore" element={<ExplorePage />} />
        <Route path="/sell" element={<SellPage />} />
        <Route path="/community" element={<CommunityPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/scan-qr" element={<QRScannerPage />} />
        <Route path="/shop/:shopId" element={<ShopDetailsPage />} />
        <Route path="/auction/:auctionId" element={<AuctionDetailsPage />} />
        <Route path="/all-auctions" element={<AllAuctionsPage />} />
        <Route
          path="/community-chat/:communityId"
          element={<CommunityChatPage />}
        />
        <Route path="/my-listings" element={<MyListingsPage />} />
        <Route
          path="/my-listing-details/:listingId"
          element={<MyListingDetailsPage />}
        />
        <Route path="/my-community" element={<MyCommunityPage />} />
        <Route path="/my-customers" element={<MyCustomersPage />} />
        <Route path="/my-stock" element={<MyStockPage />} />
        <Route path="/bidding-dashboard" element={<BiddingDashboardPage />} />
        <Route
          path="/bidding-details/:auctionId"
          element={<BiddingDetailsPage />}
        />
      </Routes>

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
