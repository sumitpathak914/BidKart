// locationStore.js
let locationData = {
  city: "Nashik",
  state: "Maharashtra",
  lat: null,
  lng: null,
  fullAddress: "Nashik, Maharashtra, India"
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
      const city = addr.city || addr.town || addr.village || addr.municipality || "Nashik";
      const state = addr.state || addr.region || "Maharashtra";
      
      locationData = {
        city,
        state,
        lat,
        lng,
        fullAddress: `${city}, ${state}, India`
      };
      
      return locationData;
    }
    return locationData;
  } catch (error) {
    console.error("Error getting location details:", error);
    return locationData;
  }
};