// import React, { useState } from "react";
// import { FaLocationArrow, FaTimes } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const PostActivity = () => {
//   const [activityTitle, setActivityTitle] = useState("");
//   const [activityDescription, setActivityDescription] = useState("");
//   const [activityType, setActivityType] = useState("");
//   const [location, setLocation] = useState("");
//   const [useCurrentLocation, setUseCurrentLocation] = useState(false);
//   const [coordinates, setCoordinates] = useState({ lat: null, lng: null });
//   const [locationError, setLocationError] = useState(null);
//   const navigate = useNavigate();

//   const activityTypes = [
//     "Tech and Gaming",
//     "Volunteer Opportunities",
//     "Cultural Exchanges",
//     "Intellectual Pursuits",
//     "Sports and Recreation",
//     "Arts and Crafts",
//     "Social Gatherings",
//     "Educational Workshops",
//     "Music and Entertainment",
//     "Others",
//   ];

//   const handleLocationToggle = () => {
//     const newUseCurrentLocation = !useCurrentLocation;
//     setUseCurrentLocation(newUseCurrentLocation);
//     if (newUseCurrentLocation) {
//       fetchCurrentLocation();
//     } else {
//       setCoordinates({ lat: null, lng: null });
//       setLocationError(null);
//       setLocation("");
//     }
//   };

//   const fetchCurrentLocation = () => {
//     if (!navigator.geolocation) {
//       setLocationError("Geolocation is not supported by your browser");
//       toast.error("Geolocation is not supported by your browser");
//       setUseCurrentLocation(false);
//       return;
//     }
//     toast.info("Fetching your location...");
//     navigator.geolocation.getCurrentPosition(
//       (position) => {
//         const { latitude, longitude } = position.coords;
//         setCoordinates({ lat: latitude, lng: longitude });
//         setLocation(
//           `Lat: ${latitude.toFixed(4)}, Lng: ${longitude.toFixed(4)}`
//         );
//         toast.success("Location fetched successfully!");
//       },
//       (error) => {
//         let errorMessage = "Unable to retrieve your location";
//         switch (error.code) {
//           case error.PERMISSION_DENIED:
//             errorMessage = "Location access was denied";
//             break;
//           case error.POSITION_UNAVAILABLE:
//             errorMessage = "Location information is unavailable";
//             break;
//           case error.TIMEOUT:
//             errorMessage = "The request to get location timed out";
//             break;
//           default:
//             errorMessage = "An unknown error occurred";
//         }
//         setLocationError(errorMessage);
//         toast.error(errorMessage);
//         setUseCurrentLocation(false);
//       }
//     );
//   };

//   const handleNext = () => {
//     if (
//       !activityTitle ||
//       !activityDescription ||
//       !activityType ||
//       (!location && !useCurrentLocation)
//     ) {
//       toast.warn("Please fill in all required fields.");
//       return;
//     }
//     if (useCurrentLocation && !coordinates.lat) {
//       toast.warn("Please wait for location or enter it manually.");
//       return;
//     }

//     const formData = {
//       title: activityTitle,
//       description: activityDescription,
//       category: activityType,
//       location: useCurrentLocation ? location : location,
//       latitude: useCurrentLocation ? coordinates.lat : "",
//       longitude: useCurrentLocation ? coordinates.lng : "",
//     };

//     localStorage.setItem("formData", JSON.stringify(formData));
//     navigate("/PostActivitiesnext");
//   };
//   const handleClose = () => {
//     navigate("/DealsPage", { replace: true });
//   };
//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-[#FE7A3A] p-6 border-2 rounded-lg">
//       <div className="relative bg-gradient-to-b from-orange-100 to-white rounded-xl p-6 shadow-md max-w-md w-full">
//         <div className="relative mb-4">
//           <button
//             onClick={handleClose}
//             className="absolute -top-6 -right-5 bg-white text-[#FE7A3A] p-1 shadow hover:bg-gray-100 rounded-full"
//             type="button"
//           >
//             <FaTimes size={16} />
//           </button>

//           <h2 className="text-xl font-semibold text-center text-white bg-[#FE7A3A] py-3 rounded-lg">
//             Post an Activity
//           </h2>
//         </div>

//         <div className="mb-6">
//           <h2 className="text-lg font-semibold text-gray-700 mb-2">
//             Activity title
//           </h2>
//           <div className="space-y-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-600 mb-1">
//                 Activity title
//               </label>
//               <input
//                 type="text"
//                 value={activityTitle}
//                 onChange={(e) => setActivityTitle(e.target.value)}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 placeholder="Enter activity title"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-600 mb-1">
//                 Activity Description
//               </label>
//               <textarea
//                 value={activityDescription}
//                 onChange={(e) => setActivityDescription(e.target.value)}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 placeholder="Enter activity description"
//                 rows={3}
//               />
//             </div>
//           </div>
//         </div>

//         <div className="mb-6">
//           <h2 className="text-lg font-semibold text-gray-700 mb-2">
//             Activity Type
//           </h2>
//           <div className="space-y-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-600 mb-1">
//                 Choose Activity type
//               </label>
//               <select
//                 value={activityType}
//                 onChange={(e) => setActivityType(e.target.value)}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               >
//                 <option value="">Select an activity type</option>
//                 {activityTypes.map((type) => (
//                   <option key={type} value={type}>
//                     {type}
//                   </option>
//                 ))}
//               </select>
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-600 mb-1">
//                 Location
//               </label>
//               <input
//                 type="text"
//                 value={location}
//                 onChange={(e) => setLocation(e.target.value)}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 placeholder="Enter location or fetch automatically"
//                 disabled={useCurrentLocation}
//               />
//               {locationError && (
//                 <p className="text-red-500 text-sm mt-1">{locationError}</p>
//               )}
//             </div>
//           </div>
//         </div>

//         <div className="border-t border-gray-200 pt-4">
//           <div className="flex items-center mb-4">
//             <input
//               type="checkbox"
//               id="useCurrentLocation"
//               checked={useCurrentLocation}
//               onChange={handleLocationToggle}
//               className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
//             />
//             <label
//               htmlFor="useCurrentLocation"
//               className="ml-2 text-sm text-gray-700 flex items-center"
//             >
//               <FaLocationArrow className="mr-1 text-blue-500" />
//               Use my current location
//             </label>
//           </div>

//           <button
//             onClick={handleNext}
//             className="w-full bg-[#FE7A3A] hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
//           >
//             Next
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PostActivity;

// import React, { useState } from "react";
// import { FaLocationArrow, FaTimes } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const PostActivity = () => {
//   const [activityTitle, setActivityTitle] = useState("");
//   const [activityDescription, setActivityDescription] = useState("");
//   const [activityType, setActivityType] = useState("");
//   const [location, setLocation] = useState("");
//   const [useCurrentLocation, setUseCurrentLocation] = useState(false);
//   const [coordinates, setCoordinates] = useState({ lat: null, lng: null });
//   const [locationError, setLocationError] = useState(null);
//   const navigate = useNavigate();

//   const activityTypes = [
//     "Tech and Gaming",
//     "Volunteer Opportunities",
//     "Cultural Exchanges",
//     "Intellectual Pursuits",
//     "Sports and Recreation",
//     "Arts and Crafts",
//     "Social Gatherings",
//     "Educational Workshops",
//     "Music and Entertainment",
//     "Others",
//   ];

//   const handleLocationToggle = () => {
//     const newUseCurrentLocation = !useCurrentLocation;
//     setUseCurrentLocation(newUseCurrentLocation);
//     if (newUseCurrentLocation) {
//       fetchCurrentLocation();
//     } else {
//       setCoordinates({ lat: null, lng: null });
//       setLocationError(null);
//       setLocation("");
//     }
//   };

//   const getAddressFromCoordinates = async (latitude, longitude) => {
//     const apiKey = 'AIzaSyCRQXge0eI79YVPiihiUrqOKv4NapMnA9I'; // Apni Google Maps API key yahan daalein
//     const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;

//     try {
//       const response = await fetch(apiUrl);
//       const data = await response.json();
//       console.log("Address data:", data); // Debugging line

//       if (data.results && data.results.length > 0) {
//         const formattedAddress = data.results[0].formatted_address;
//         setLocation(formattedAddress);
//         toast.success("Location fetched successfully!");
//       } else {
//         toast.error("Could not retrieve address for these coordinates.");
//         setLocationError("Could not retrieve address for these coordinates.");
//       }
//     } catch (error) {
//       console.error("Error fetching address:", error);
//       toast.error("Error fetching address.");
//       setLocationError("Error fetching address.");
//     }
//   };

//   const fetchCurrentLocation = () => {
//     if (!navigator.geolocation) {
//       setLocationError("Geolocation is not supported by your browser");
//       toast.error("Geolocation is not supported by your browser");
//       setUseCurrentLocation(false);
//       return;
//     }
//     toast.info("Fetching your location...");
//     navigator.geolocation.getCurrentPosition(
//       (position) => {
//         const { latitude, longitude } = position.coords;
//         setCoordinates({ lat: latitude, lng: longitude });
//         // Ab coordinates mil gaye hain, address fetch karein
//         getAddressFromCoordinates(latitude, longitude);
//       },
//       (error) => {
//         let errorMessage = "Unable to retrieve your location";
//         switch (error.code) {
//           case error.PERMISSION_DENIED:
//             errorMessage = "Location access was denied";
//             break;
//           case error.POSITION_UNAVAILABLE:
//             errorMessage = "Location information is unavailable";
//             break;
//           case error.TIMEOUT:
//             errorMessage = "The request to get location timed out";
//             break;
//           default:
//             errorMessage = "An unknown error occurred";
//         }
//         setLocationError(errorMessage);
//         toast.error(errorMessage);
//         setUseCurrentLocation(false);
//       }
//     );
//   };

//   const handleNext = () => {
//     if (
//       !activityTitle ||
//       !activityDescription ||
//       !activityType ||
//       !location
//     ) {
//       toast.warn("Please fill in all required fields.");
//       return;
//     }

//     const formData = {
//       title: activityTitle,
//       description: activityDescription,
//       category: activityType,
//       location: location,
//       latitude: coordinates.lat,
//       longitude: coordinates.lng,
//     };

//     localStorage.setItem("formData", JSON.stringify(formData));
//     navigate("/PostActivitiesnext");
//   };
//   const handleClose = () => {
//     navigate("/DealsPage", { replace: true });
//   };
//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-[#FE7A3A] p-6 border-2 rounded-lg">
//       <div className="relative bg-gradient-to-b from-orange-100 to-white rounded-xl p-6 shadow-md max-w-md w-full">
//         <div className="relative mb-4">
//           <button
//             onClick={handleClose}
//             className="absolute -top-6 -right-5 bg-white text-[#FE7A3A] p-1 shadow hover:bg-gray-100 rounded-full"
//             type="button"
//           >
//             <FaTimes size={16} />
//           </button>

//           <h2 className="text-xl font-semibold text-center text-white bg-[#FE7A3A] py-3 rounded-lg">
//             Post an Activity
//           </h2>
//         </div>

//         <div className="mb-6">
//           <h2 className="text-lg font-semibold text-gray-700 mb-2">
//             Activity title
//           </h2>
//           <div className="space-y-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-600 mb-1">
//                 Activity title
//               </label>
//               <input
//                 type="text"
//                 value={activityTitle}
//                 onChange={(e) => setActivityTitle(e.target.value)}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 placeholder="Enter activity title"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-600 mb-1">
//                 Activity Description
//               </label>
//               <textarea
//                 value={activityDescription}
//                 onChange={(e) => setActivityDescription(e.target.value)}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 placeholder="Enter activity description"
//                 rows={3}
//               />
//             </div>
//           </div>
//         </div>

//         <div className="mb-6">
//           <h2 className="text-lg font-semibold text-gray-700 mb-2">
//             Activity Type
//           </h2>
//           <div className="space-y-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-600 mb-1">
//                 Choose Activity type
//               </label>
//               <select
//                 value={activityType}
//                 onChange={(e) => setActivityType(e.target.value)}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               >
//                 <option value="">Select an activity type</option>
//                 {activityTypes.map((type) => (
//                   <option key={type} value={type}>
//                     {type}
//                   </option>
//                 ))}
//               </select>
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-600 mb-1">
//                 Location
//               </label>
//               <input
//                 type="text"
//                 value={location}
//                 onChange={(e) => setLocation(e.target.value)}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 placeholder="Enter location or fetch automatically"
//                 disabled={useCurrentLocation}
//               />
//               {locationError && (
//                 <p className="text-red-500 text-sm mt-1">{locationError}</p>
//               )}
//             </div>
//           </div>
//         </div>

//         <div className="border-t border-gray-200 pt-4">
//           <div className="flex items-center mb-4">
//             <input
//               type="checkbox"
//               id="useCurrentLocation"
//               checked={useCurrentLocation}
//               onChange={handleLocationToggle}
//               className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
//             />
//             <label
//               htmlFor="useCurrentLocation"
//               className="ml-2 text-sm text-gray-700 flex items-center"
//             >
//               <FaLocationArrow className="mr-1 text-blue-500" />
//               Use my current location
//             </label>
//           </div>

//           <button
//             onClick={handleNext}
//             className="w-full bg-[#FE7A3A] hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
//           >
//             Next
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PostActivity;

/* global google */ // Add this line at the beginning of the file

/* global google */ // Add this line at the beginning of the file
/* global google */ // Add this line at the beginning of the file
/* global google */ // Add this line at the beginning of the file

import React, { useState, useRef, useEffect } from "react";
import { FaLocationArrow, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PostActivity = () => {
  const [activityTitle, setActivityTitle] = useState("");
  const [activityDescription, setActivityDescription] = useState("");
  const [activityType, setActivityType] = useState("");
  const [location, setLocation] = useState("");
  const [useCurrentLocation, setUseCurrentLocation] = useState(false);
  const [coordinates, setCoordinates] = useState({ lat: null, lng: null });
  const [locationError, setLocationError] = useState(null);
  const locationInputRef = useRef(null);
  const [isGoogleMapsLoaded, setIsGoogleMapsLoaded] = useState(false);
  const [googleMapsPromise, setGoogleMapsPromise] = useState(null); // Track the promise
  const navigate = useNavigate();
  const apiKey = "AIzaSyCRQXge0eI79YVPiihiUrqOKv4NapMnA9I"; // Use the provided API key

  const activityTypes = [
    "Tech and Gaming",
    "Volunteer Opportunities",
    "Cultural Exchanges",
    "Intellectual Pursuits",
    "Sports and Recreation",
    "Arts and Crafts",
    "Social Gatherings",
    "Educational Workshops",
    "Music and Entertainment",
    "Others",
  ];

  // Load Google Maps API script dynamically
  useEffect(() => {
    if (!googleMapsPromise) {
      // Only load once
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
      script.async = true;
      script.defer = true;

      const promise = new Promise((resolve, reject) => {
        script.onload = () => {
          setIsGoogleMapsLoaded(true);
          resolve(); // Resolve the promise when loaded
        };
        script.onerror = () => {
          toast.error("Failed to load Google Maps API.");
          reject(new Error("Failed to load Google Maps API"));
        };
      });

      document.head.appendChild(script);
      setGoogleMapsPromise(promise); // Store the promise
    }
    return () => {
      // Cleanup:  Remove script if component unmounts *before* it loads
      if (googleMapsPromise) {
        document
          .querySelectorAll(`script[src*="maps.googleapis.com"]`)
          .forEach((script) => {
            script.remove();
          });
        setGoogleMapsPromise(null); // Reset the promise state
        setIsGoogleMapsLoaded(false);
      }
    };
  }, [googleMapsPromise, apiKey]);

  // Initialize autocomplete
  useEffect(() => {
    let autocomplete;

    const initAutocomplete = () => {
      if (
        isGoogleMapsLoaded &&
        locationInputRef.current &&
        window.google &&
        window.google.maps &&
        window.google.maps.places
      ) {
        try {
          autocomplete = new window.google.maps.places.Autocomplete(
            locationInputRef.current,
            {
              types: ["geocode"],
              componentRestrictions: { country: "in" },
            }
          );

          autocomplete.addListener("place_changed", () => {
            const place = autocomplete.getPlace();
            if (place.geometry) {
              setLocation(place.formatted_address);
              setCoordinates({
                lat: place.geometry.location.lat(),
                lng: place.geometry.location.lng(),
              });
              setUseCurrentLocation(false);
            } else {
              setLocationError(
                "No details available for input: '" + place.name + "'"
              );
            }
          });
        } catch (error) {
          console.error("Error initializing autocomplete:", error);
          toast.error("Error initializing autocomplete. Please check console.");
          setLocationError("Error initializing autocomplete.");
        }
      }
    };

    if (isGoogleMapsLoaded) {
      initAutocomplete();
    }

    return () => {
      // Cleanup
      if (autocomplete) {
        try {
          google.maps.event.clearInstanceListeners(autocomplete);
        } catch (e) {
          console.error("Error cleaning up autocomplete listeners", e);
        }
      }
    };
  }, [isGoogleMapsLoaded, apiKey]);

  const getAddressFromCoordinates = async (latitude, longitude) => {
    const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (data.results && data.results.length > 0) {
        const formattedAddress = data.results[0].formatted_address;
        setLocation(formattedAddress);
        toast.success("Location fetched successfully!");
      } else {
        const errorMessage = "Could not retrieve address from coordinates.";
        toast.error(errorMessage);
        setLocationError(errorMessage);
      }
    } catch (error) {
      console.error("Error fetching address:", error);
      const errorMessage = "Error fetching address.";
      toast.error(errorMessage);
      setLocationError(errorMessage);
    }
  };

  const fetchCurrentLocation = () => {
    if (location.trim() !== "") {
      return;
    }

    if (!navigator.geolocation) {
      const errorMessage = "Geolocation is not supported by your browser";
      setLocationError(errorMessage);
      toast.error(errorMessage);
      setUseCurrentLocation(false);
      return;
    }
    toast.info("Fetching your location...");
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCoordinates({ lat: latitude, lng: longitude });
        getAddressFromCoordinates(latitude, longitude);
        setUseCurrentLocation(true);
      },
      (error) => {
        let errorMessage = "Unable to retrieve your location";
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = "Location access was denied";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Location information is unavailable";
            break;
          case error.TIMEOUT:
            errorMessage = "The request to get location timed out";
            break;
          default:
            errorMessage = "An unknown error occurred";
        }
        setLocationError(errorMessage);
        toast.error(errorMessage);
        setUseCurrentLocation(false);
      }
    );
  };

  const handleLocationToggle = () => {
    const newUseCurrentLocation = !useCurrentLocation;
    setUseCurrentLocation(newUseCurrentLocation);
    if (newUseCurrentLocation) {
      fetchCurrentLocation();
    } else {
      setCoordinates({ lat: null, lng: null });
      setLocationError(null);
      if (!useCurrentLocation) {
        setLocation("");
      }
    }
  };

  const handleNext = () => {
    if (!activityTitle || !activityDescription || !activityType || !location) {
      toast.warn("Please fill in all required fields.");
      return;
    }

    const formData = {
      title: activityTitle,
      description: activityDescription,
      category: activityType,
      location: location,
      latitude: coordinates.lat,
      longitude: coordinates.lng,
    };

    localStorage.setItem("formData", JSON.stringify(formData));
    navigate("/PostActivitiesnext");
  };
  const handleClose = () => {
    navigate("/DealsPage", { replace: true });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#FE7A3A] p-6 border-2 rounded-lg">
      <div className="relative bg-gradient-to-b from-orange-100 to-white rounded-xl p-6 shadow-md max-w-md w-full">
        <div className="relative mb-4">
          <button
            onClick={handleClose}
            className="absolute -top-6 -right-5 bg-white text-[#FE7A3A] p-1 shadow hover:bg-gray-100 rounded-full"
            type="button"
          >
            <FaTimes size={16} />
          </button>

          <h2 className="text-xl font-semibold text-center text-white bg-[#FE7A3A] py-3 rounded-lg">
            Post an Activity
          </h2>
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">
            Activity title
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Activity title
              </label>
              <input
                type="text"
                value={activityTitle}
                onChange={(e) => setActivityTitle(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter activity title"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Activity Description
              </label>
              <textarea
                value={activityDescription}
                onChange={(e) => setActivityDescription(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter activity description"
                rows={3}
              />
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">
            Activity Type
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Choose Activity type
              </label>
              <select
                value={activityType}
                onChange={(e) => setActivityType(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select an activity type</option>
                {activityTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Location
              </label>
              <input
                type="text"
                ref={locationInputRef}
                value={location}
                onChange={(e) => {
                  setLocation(e.target.value);
                  setUseCurrentLocation(false); // Manual input disables "Use my current location"
                }}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter location or fetch automatically"
              />
              {locationError && (
                <p className="text-red-500 text-sm mt-1">{locationError}</p>
              )}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-4">
          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              id="useCurrentLocation"
              checked={useCurrentLocation}
              onChange={handleLocationToggle}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label
              htmlFor="useCurrentLocation"
              className="ml-2 text-sm text-gray-700 flex items-center"
            >
              <FaLocationArrow className="mr-1 text-blue-500" />
              Use my current location
            </label>
          </div>

          <button
            onClick={handleNext}
            className="w-full bg-[#FE7A3A] hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostActivity;
