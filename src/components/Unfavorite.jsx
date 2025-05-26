// // src/components/UnfavoriteButton.jsx
// import { RxCross2 } from "react-icons/rx";
// import { toast } from "react-toastify";

// const UnfavoriteButton = ({ vendorId, onUnfavorite }) => {
//         // const vendorId = vendor.vendor_id;
//     const userId = localStorage.getItem("vendor_id");
//   const handleUnfavorite = async () => {
//     try {
//       const response = await fetch(
//         `https://api.upswap.app/api/vendors/${vendorId}/favorite/`,
//         {
//           method: "POST",
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("access")}`,
//           },
//         }
//       );

//       if (!response.ok) {
//         toast.error("Failed to remove from favorites");
//         return;
//       }

//       toast.success("Removed from favorites");
//       onUnfavorite(vendorId); // Parent ko notify karo
//     } catch (error) {
//       toast.error("Error unfavoriting vendor");
//       console.error(error);
//     }
//   };

//   return (
//     <button
//       onClick={handleUnfavorite}
//       className="absolute top-2 right-2 text-red-500 hover:text-red-700"
//       title="Remove from favorites"
//     >
//       <RxCross2 size={20} />
//     </button>
//   );
// };

// export default UnfavoriteButton;
// src/components/UnfavoriteButton.jsx

// src/components/UnfavoriteButton.jsx

// import { RxCross2 } from "react-icons/rx";
// import { toast } from "react-toastify";

// // यह कंपोनेंट सीधे props से vendorId लेगा
// const UnfavoriteButton = ({ vendorId, onUnfavorite }) => {
//   const handleUnfavorite = async () => {
//     const userId = localStorage.getItem("vendor_id"); // User ID लोकल स्टोरेज से लें

//     if (!userId) {
//       toast.error("User ID not found! Please log in to unfavorite.");
//       return;
//     }

//     // API URL में specific vendorId का उपयोग करें जो prop के रूप में मिला है
//     const apiUrl = `https://api.upswap.app/api/vendors/${vendorId}/favorite/`;

//     try {
//       const response = await fetch(apiUrl, {
//         method: "POST", // अनफेवरेट के लिए DELETE मेथड का उपयोग करें (आपके API डॉक्यूमेंटेशन के अनुसार)
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${localStorage.getItem("access")}`, // एक्सेस टोकन
//         },
//         // DELETE रिक्वेस्ट के साथ body आमतौर पर नहीं भेजी जाती है
//       });

//       const result = await response.json();

//       if (!response.ok) {
//         toast.error(result.message || "Failed to remove from favorites.");
//         return;
//       }

//       toast.success(result.message || "Removed from favorites successfully!");

//       // अनफेवरेट सफल होने पर पैरेंट कंपोनेंट को सूचित करें
//       if (onUnfavorite) {
//         onUnfavorite(vendorId); // पैरेंट को बताएं कि किस vendorId को अनफेवरेट किया गया
//       }
//     } catch (error) {
//       toast.error("Error unfavoriting vendor. Please try again.");
//       console.error("Unfavorite API error:", error);
//     }
//   };

//   return (
//     <button
//       onClick={handleUnfavorite} // क्रॉस बटन क्लिक होने पर handleUnfavorite कॉल होगा
//       className="absolute top-2 right-2 text-red-500 hover:text-red-700"
//       title="Remove from favorites"
//     >
//       <RxCross2 size={20} />
//     </button>
//   );
// };

// export default UnfavoriteButton;

// // src/components/UnfavoriteButton.jsx
// import { RxCross2 } from "react-icons/rx";
// import { toast } from "react-toastify";

// const UnfavoriteButton = ({ vendorId, onUnfavorite }) => {
//         // const vendorId = vendor.vendor_id;
//     const userId = localStorage.getItem("vendor_id");
//   const handleUnfavorite = async () => {
//     try {
//       const response = await fetch(
//         `https://api.upswap.app/api/vendors/${vendorId}/favorite/`,
//         {
//           method: "POST",
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("access")}`,
//           },
//         }
//       );

//       if (!response.ok) {
//         toast.error("Failed to remove from favorites");
//         return;
//       }

//       toast.success("Removed from favorites");
//       onUnfavorite(vendorId); // Parent ko notify karo
//     } catch (error) {
//       toast.error("Error unfavoriting vendor");
//       console.error(error);
//     }
//   };

//   return (
//     <button
//       onClick={handleUnfavorite}
//       className="absolute top-2 right-2 text-red-500 hover:text-red-700"
//       title="Remove from favorites"
//     >
//       <RxCross2 size={20} />
//     </button>
//   );
// };

// export default UnfavoriteButton;
// src/components/UnfavoriteButton.jsx

// src/components/UnfavoriteButton.jsx

// import { RxCross2 } from "react-icons/rx";
// import { toast } from "react-toastify";

// const UnfavoriteButton = ({ vendorId, onUnfavorite }) => {

//   const handleUnfavorite = async () => {
//     const storedVendorId = localStorage.getItem("vendor_id");

//     // Fallback: use prop if local doesn't exist
//     const VendorId = storedVendorId || vendorId;

//     try {
//       const response = await fetch(
//         `https://api.upswap.app/api/vendors/${VendorId}/favorite/`,
//         {
//           method: "POST",
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("access")}`,
//           },
//         }
//       );

//       if (!response.ok) {
//         toast.error("Failed to remove from favorites");
//         return;
//       }

//       toast.success("Removed from favorites");
//       onUnfavorite(VendorId); // update parent
//     } catch (error) {
//       toast.error("Error unfavoriting vendor");
//       console.error(error);
//     }
//   };

//   return (
//     <button
//       onClick={handleUnfavorite}
//       className="absolute top-2 right-2 text-red-500 hover:text-red-700"
//       title="Remove from favorites"
//     >
//       <RxCross2 size={20} />
//     </button>
//   );
// };

// export default UnfavoriteButton;
import { RxCross2 } from "react-icons/rx";
import { toast } from "react-toastify";

const UnfavoriteButton = ({ vendorId, onUnfavorite }) => {
  const handleUnfavorite = async () => {
    const accessToken = localStorage.getItem("access");

    if (!accessToken) {
      toast.error("Authorization token not found. Please log in.");
      return;
    }

    if (!vendorId) {
      toast.error("Vendor ID is missing. Cannot unfavorite.");
      console.error("UnfavoriteButton: vendorId is undefined.");
      return;
    }

    const apiUrl = `https://api.upswap.app/api/vendors/${vendorId}/favorite/`;

    console.log("Unfavoriting URL:", apiUrl);
    console.log("Access Token:", accessToken);

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const result = await response.json();

      if (!response.ok) {
        toast.error(result.message || "Failed to remove from favorites.");
        console.error("Unfavorite API error response:", result);
        return;
      }

      toast.success(result.message || "Removed from favorites successfully!");

      if (onUnfavorite) {
        onUnfavorite();
      }
    } catch (error) {
      toast.error("Error unfavoriting vendor. Please try again.");
      console.error("Unfavorite API network/fetch error:", error);
    }
  };

  return (
    <button
      onClick={handleUnfavorite}
      className="absolute top-2 right-2 text-red-500 hover:text-red-700"
      title="Remove from favorites"
    >
      <RxCross2 size={20} />
    </button>
  );
};

export default UnfavoriteButton;

// import { useEffect, useState, useCallback } from "react";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { MdLocationOn } from "react-icons/md";
// import UnfavoriteButton from "./UnfavoriteButton"; // सुनिश्चित करें कि नाम और पाथ सही है
// import { useNavigate } from "react-router-dom";
// import { FaHeart, FaBars } from "react-icons/fa";

// const FavoritesList = () => {
//   const [favorites, setFavorites] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   // यह फंक्शन पसंदीदा वेंडरों की सूची को API से फेच करता है
//   // useCallback का उपयोग किया गया है ताकि यह फंक्शन अनावश्यक रूप से री-क्रिएट न हो
//   const fetchFavorites = useCallback(async () => {
//     setLoading(true); // डेटा फेच करते समय लोडिंग स्टेट सेट करें
//     try {
//       const response = await fetch(
//         "https://api.upswap.app/api/favorite-vendors/lists/", // <<--- यह आपकी लिस्टिंग वाली API है
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("access")}`,
//           },
//         }
//       );

//       const data = await response.json();

//       if (!response.ok) {
//         // यदि API से कोई त्रुटि आती है
//         toast.error(data.message || "पसंदीदा वेंडरों को लाने में विफल।");
//       } else {
//         // यदि डेटा सफलतापूर्वक प्राप्त होता है
//         setFavorites(data?.vendors || []); // 'favorites' स्टेट को अपडेट करें
//       }
//     } catch (error) {
//       // नेटवर्क या फेचिंग में कोई समस्या
//       toast.error("पसंदीदा वेंडरों को लाने में त्रुटि।");
//       console.error("पसंदीदा वेंडर लाने में त्रुटि:", error);
//     } finally {
//       setLoading(false); // फेचिंग पूरी होने पर लोडिंग खत्म करें
//     }
//   }, []); // इस फंक्शन की कोई डिपेंडेंसी नहीं है, इसलिए यह केवल एक बार बनता है

//   // कंपोनेंट के माउंट होने पर (पहली बार लोड होने पर) पसंदीदा वेंडरों को फेच करें
//   useEffect(() => {
//     fetchFavorites();
//   }, [fetchFavorites]); // fetchFavorites को डिपेंडेंसी के रूप में रखा गया है

//   // यह फंक्शन UnfavoriteButton द्वारा कॉल किया जाएगा जब कोई वेंडर सफलतापूर्वक अनफेवरेट हो जाएगा।
//   const handleUnfavoriteSuccess = () => {
//     // अनफेवरेट होने के बाद, अपडेटेड लिस्ट प्राप्त करने के लिए लिस्टिंग API को फिर से कॉल करें
//     fetchFavorites(); // <<--- यह लिस्टिंग वाली API को दोबारा कॉल करेगा!
//   };

//   // लोडिंग स्टेट दिखाएं
//   if (loading) return <p className="p-6 text-center">पसंदीदा वेंडर लोड हो रहे हैं...</p>;

//   return (
//     <div className="p-6">
//       <ToastContainer /> {/* टोस्ट नोटिफिकेशन के लिए */}

//       {/* हेडर सेक्शन */}
//       <div className="flex items-center justify-between bg-gradient-to-r border-2 bg-[#FE7A3A] text-white p-4 rounded-lg">
//         <button className="text-xl" onClick={() => navigate("/UpswapVendors")}>
//           &#8592;
//         </button>
//         <h1 className="text-lg font-semibold">पसंदीदा वेंडर</h1>
//         <div className="flex gap-4">
//           <FaHeart
//             className="text-xl cursor-pointer text-red-500"
//             onClick={() => navigate("/Favorite")}
//           />
//           <FaBars className="text-xl" />
//         </div>
//       </div>

//       {/* पसंदीदा वेंडरों की लिस्ट */}
//       {favorites.length === 0 ? (
//         <p className="mt-4 text-center text-gray-600">कोई पसंदीदा वेंडर नहीं मिला।</p>
//       ) : (
//         <div className="mt-4 space-y-4">
//           {favorites.map((vendor) => (
//             <div
//               key={vendor.id} // वेंडर की अद्वितीय ID का उपयोग करें (जैसे vendor.id या vendor.vendor_id)
//               className="relative flex flex-col sm:flex-row bg-white rounded-lg shadow-md p-4 items-center"
//             >
//               {/* UnfavoriteButton component */}
//               {/* यह सुनिश्चित करता है कि क्रॉस बटन पर क्लिक करने पर unfavorite लॉजिक चले */}
//               <UnfavoriteButton
//                 vendorId={vendor.id} // <--- वेंडर की ID को प्रॉप के रूप में पास करें
//                 onUnfavorite={handleUnfavoriteSuccess} // <--- अनफेवरेट सफल होने पर पैरेंट को सूचित करने के लिए
//               />

//               {/* वेंडर की जानकारी */}
//               <div className="w-20 h-20 flex-shrink-0 flex items-center justify-center rounded-lg overflow-hidden">
//                 <img
//                   src={vendor.profile_pic || "https://via.placeholder.com/100"}
//                   alt={vendor.full_name}
//                   className="w-16 h-16 object-cover rounded-md"
//                 />
//               </div>
//               <div className="flex-grow px-4 mt-2 sm:mt-0 sm:px-6">
//                 <h2 className="font-bold text-lg">{vendor.full_name}</h2>
//                 <p className="text-sm text-gray-600">
//                   {vendor.services && vendor.services.length > 0
//                     ? vendor.services[0].item_description
//                     : "कोई विवरण नहीं"}
//                 </p>
//                 <p className="text-xs text-gray-500">
//                   {vendor.addresses && vendor.addresses.length > 0
//                     ? vendor.addresses[0].road_name_area_colony
//                     : "कोई पता नहीं"}
//                 </p>
//               </div>

//               {/* विजिट प्रोफाइल बटन */}
//               <div className="flex flex-col items-center gap-2 mt-2 sm:mt-0">
//                 <button
//                   onClick={() => navigate(`/vendor/${vendor.id}`)} // वेंडर प्रोफाइल पर नेविगेट करें
//                   className="bg-[#FE7A3A] text-white text-sm py-1 px-3 rounded-md"
//                 >
//                   प्रोफाइल देखें
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default FavoritesList;
