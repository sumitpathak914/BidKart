// locationStore.js
let locationData = {
  city: "",
  state: "",
  lat: null,
  lng: null,
  fullAddress: ""
};

export const getLocation = () => locationData;

export const setLocation = (data) => {
  locationData = {
    ...locationData,
    ...data
  };
};

export const updateLocationFromCoords = async (lat, lng) => {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=10&addressdetails=1`
    );
    const data = await response.json();

    if (data && data.address) {
      const addr = data.address;
      const city = addr.city || addr.town || addr.village || addr.municipality || "";
      const state = addr.state || addr.region || "";
      const country = addr.country || "";
      
      // If city or state is empty, try to get from other fields
      const finalCity = city || addr.county || addr.district || "";
      const finalState = state || addr.region || addr.county || "";
      
      locationData = {
        city: finalCity,
        state: finalState,
        lat,
        lng,
        fullAddress: finalCity && finalState ? `${finalCity}, ${finalState}, ${country}` : `${lat}, ${lng}`
      };
      
      return locationData;
    }
    
    // If no address found, return coordinates as fallback
    locationData = {
      city: `${lat.toFixed(4)}`,
      state: `${lng.toFixed(4)}`,
      lat,
      lng,
      fullAddress: `Location: ${lat.toFixed(4)}, ${lng.toFixed(4)}`
    };
    return locationData;
    
  } catch (error) {
    console.error("Error getting location details:", error);
    // Return coordinates as fallback
    locationData = {
      city: `${lat.toFixed(4)}`,
      state: `${lng.toFixed(4)}`,
      lat,
      lng,
      fullAddress: `Location: ${lat.toFixed(4)}, ${lng.toFixed(4)}`
    };
    return locationData;
  }
};

// Check if location is valid (has city and state)
export const isValidLocation = () => {
  return locationData.city && locationData.state && locationData.city !== "" && locationData.state !== "";
};

// Clear location data
export const clearLocation = () => {
  locationData = {
    city: "",
    state: "",
    lat: null,
    lng: null,
    fullAddress: ""
  };
};