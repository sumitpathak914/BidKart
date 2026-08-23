// LocationHeader.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, ChevronDown, User } from "lucide-react";
import { getUser, isLoggedIn } from "./userSession";
import { getLocation, setLocation, updateLocationFromCoords } from "./locationStore";

const THEME = {
  ink: "#0F1638",
  gold: "#D9A441",
  goldSoft: "#FDF3E1",
  mapBg: "#E7ECFA",
};

const LocationHeader = ({ 
  userCity, 
  setUserCity, 
  userState, 
  setUserState,
  onLocationUpdate,
  showBackButton = false,
  onBackClick,
  rightComponent = null 
}) => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [userProfileImage, setUserProfileImage] = useState("");
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [locationError, setLocationError] = useState(null);

  const user = getUser();
  const loggedIn = isLoggedIn();

  useEffect(() => {
    if (loggedIn && user) {
      setUserName(user.name || "");
      setUserProfileImage(
        user.profileImage || 
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&q=80"
      );
    }
  }, [loggedIn, user]);

  // Function to get current location
  const getCurrentLocation = () => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error("Geolocation is not supported"));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          reject(error);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        }
      );
    });
  };

  // Handle location update
  const handleLocationUpdate = async () => {
    if (onLocationUpdate) {
      await onLocationUpdate();
      return;
    }

    setIsGettingLocation(true);
    setLocationError(null);

    try {
      // Get current location
      const location = await getCurrentLocation();
      console.log("Current location:", location);

      // Update location in store
      const updatedLocation = await updateLocationFromCoords(location.lat, location.lng);
      
      // Update parent state via props
      if (setUserCity) setUserCity(updatedLocation.city);
      if (setUserState) setUserState(updatedLocation.state);

      console.log("Location updated:", updatedLocation);

    } catch (err) {
      console.error("Error getting location:", err);
      
      let errorMessage = "Unable to get your location. ";
      if (err.code === 1) {
        errorMessage += "Please allow location access in your browser settings.";
      } else if (err.code === 2) {
        errorMessage += "Location unavailable. Please check your GPS.";
      } else if (err.code === 3) {
        errorMessage += "Location request timed out. Please try again.";
      } else {
        errorMessage += "Please try again or enter your location manually.";
      }
      
      setLocationError(errorMessage);
    } finally {
      setIsGettingLocation(false);
    }
  };

  // Auto-detect location on mount
  useEffect(() => {
    // Get location from store
    const storedLocation = getLocation();
    
    if (storedLocation.city && storedLocation.state) {
      console.log("Using stored location:", storedLocation);
      if (setUserCity) setUserCity(storedLocation.city);
      if (setUserState) setUserState(storedLocation.state);
    } else if (!userCity && loggedIn) {
      handleLocationUpdate();
    }
  }, []);

  // Handle profile click
  const handleProfileClick = () => {
    navigate("/profile");
  };

  return (
    <header className="px-5 pt-6">
      <div className="flex items-start justify-between">
        {/* Location Section */}
        <div className="flex items-center gap-1">
          {showBackButton && (
            <button
              onClick={onBackClick || (() => navigate(-1))}
              className="mr-2 p-1 hover:bg-slate-100 rounded-full transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-[#0F1638]"
              >
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
            </button>
          )}

          <button 
            onClick={handleLocationUpdate}
            disabled={isGettingLocation}
            className="flex items-center gap-1 hover:opacity-70 transition-opacity"
          >
            <MapPin size={16} style={{ color: THEME.gold }} />
            <span className="text-[15px] font-bold text-[#0F1638]">
              {isGettingLocation ? "Detecting..." : (userCity || "Detect Location")}
              {userState && !isGettingLocation ? `, ${userState}` : ""}
            </span>
            <ChevronDown size={15} className="text-slate-400" />
          </button>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3">
          {rightComponent}

          <button
            onClick={handleProfileClick}
            className="relative group"
          >
            {userProfileImage ? (
              <img
                src={userProfileImage}
                alt="Profile"
                className="h-10 w-10 rounded-full object-cover ring-2 ring-white group-hover:ring-[#D9A441] transition-all"
                onError={(e) => {
                  e.target.src = "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&q=80";
                }}
              />
            ) : (
              <div className="h-10 w-10 rounded-full bg-slate-200 flex items-center justify-center ring-2 ring-white">
                <User size={20} className="text-slate-500" />
              </div>
            )}
          </button>
        </div>
      </div>

      {locationError && (
        <div className="mt-2 rounded-lg bg-red-50 px-3 py-2 text-xs text-red-600 border border-red-200 flex items-center justify-between">
          <span>{locationError}</span>
          <button
            onClick={handleLocationUpdate}
            className="px-2 py-1 bg-red-600 text-white rounded-md text-[10px] font-semibold hover:bg-red-700 transition-colors"
          >
            Retry
          </button>
        </div>
      )}
    </header>
  );
};

export default LocationHeader;