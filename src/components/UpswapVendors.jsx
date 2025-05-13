// import { FaSearch, FaMapMarkerAlt, FaHeart, FaBars } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";

// const UpswapVendors = () => {
//   const navigate = useNavigate();
//   return (
//     <div className="min-h-screen bg-white">
//       {/* Header */}
//       <div className="flex items-center justify-between bg-gradient-to-r border-2 bg-[#FE7A3A] text-white p-4 rounded-lg">
//         <button className="text-xl"
//          onClick={() => navigate("/DealsPage")}>&#8592;</button>
//         <h1 className="text-lg font-semibold">Vendors</h1>
//         <div className="flex gap-4">
//           <FaHeart className="text-xl" />
//           <FaBars className="text-xl" />
//         </div>
//       </div>

//       {/* Search Bar */}
//       <div className="p-4">
//         <div className="flex items-center bg-gray-100 p-2 rounded-md shadow-md">
//           <FaSearch className="text-gray-500 ml-2" />
//           <input
//             type="text"
//             placeholder="Search vendor, category..."
//             className="flex-grow bg-transparent outline-none p-2"
//           />
//           <FaMapMarkerAlt className="text-gray-500 mr-2" />
//         </div>
//       </div>

//       {/* Vendor Card */}
//       <div className="p-4">
//         <div className="flex bg-white rounded-lg shadow-md p-4 items-center">
//           <div className="w-20 h-20 bg-gray-200 flex items-center justify-center rounded-lg">
//             <img
//               src="/bhagwan.jpg"
//               alt="Vendor Logo"
//               className="w-16 h-16 object-cover"
//             />
//           </div>
//           <div className="flex-grow px-4">
//             <h2 className="font-bold text-lg">FOOD HUB</h2>
//             <p className="text-sm text-gray-600">
//               Special Thali, Afghani Momos, Luxury Sofa set, Football, Polyester
//               Shirt
//             </p>
//             <p className="text-xs text-gray-500">
//               Shop no.32 Omaxe Eternity Vrindavan, Mathura
//             </p>
//           </div>
//           <FaHeart className="text-gray-400 text-xl" />
//         </div>
//       </div>

//       {/* Bottom Navigation */}
//     </div>
//   );
// };

// export default UpswapVendors;

// import { useEffect, useState } from "react";
// import { FaSearch, FaMapMarkerAlt, FaHeart, FaBars } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";

// const UpswapVendors = () => {
//   const navigate = useNavigate();
//   const [vendors, setVendors] = useState([]);

//   useEffect(() => {
//     fetch("https://api.upswap.app/api/vendor/lists/")
//       .then((res) => res.json())
//       .then((data) => {
//         console.log("API Response:", data);
//         setVendors(data?.vendors || []);
//       })
//       .catch((err) => console.error("Error fetching vendors:", err));
//   }, []);

//   return (
//     <div className="min-h-screen bg-white">
//       {/* Header */}
//       <div className="flex items-center justify-between bg-gradient-to-r border-2 bg-[#FE7A3A] text-white p-4 rounded-lg">
//         <button className="text-xl" onClick={() => navigate("/DealsPage")}>
//           &#8592;
//         </button>
//         <h1 className="text-lg font-semibold">Vendors</h1>
//         <div className="flex gap-4">
//           <FaHeart className="text-xl" />
//           <FaBars className="text-xl" />
//         </div>
//       </div>

//       {/* Search Bar */}
//       <div className="p-4">
//         <div className="flex items-center bg-gray-100 p-2 rounded-md shadow-md">
//           <FaSearch className="text-gray-500 ml-2" />
//           <input
//             type="text"
//             placeholder="Search vendor, category..."
//             className="flex-grow bg-transparent outline-none p-2"
//           />
//           <FaMapMarkerAlt className="text-gray-500 mr-2" />
//         </div>
//       </div>

//       {/* Vendor Listing */}
//       <div className="p-4 space-y-4">
//         {vendors.length > 0 ? (
//           vendors.map((vendor) => {
//             const addressObj = vendor.addresses?.[0];
//             const fullAddress = addressObj
//               ? `${addressObj.road_name_area_colony}, ${addressObj.city}, ${addressObj.state}, ${addressObj.country}, ${addressObj.pincode}`
//               : "No address";

//             return (
//               <div
//                 key={vendor.vendor_id}
//                 className="flex bg-white rounded-lg shadow-md p-4 items-center"
//               >
//                 <div className="w-20 h-20 flex items-center justify-center rounded-lg overflow-hidden">
//                   <img
//                     src={vendor.profile_pic || "/placeholder.jpg"}
//                     alt={vendor.full_name}
//                     className="w-16 h-16 object-cover rounded-md"
//                   />
//                 </div>
//                 <div className="flex-grow px-4">
//                   <h2 className="font-bold text-lg">{vendor.full_name}</h2>
//                   <p className="text-sm text-gray-600">
//                     {vendor.services?.[0]?.item_description || "No description"}
//                   </p>
//                   <p className="text-xs text-gray-500">{fullAddress}</p>
//                 </div>
//                 <FaHeart
//                   className={`text-xl ${
//                     vendor.is_favorite ? "text-red-500" : "text-gray-400"
//                   }`}
//                 />
//               </div>
//             );
//           })
//         ) : (
//           <p className="text-center text-gray-500">No vendors found.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default UpswapVendors;

// import { useEffect, useState } from "react";
// import { FaSearch, FaMapMarkerAlt, FaHeart, FaBars } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";

// const UpswapVendors = () => {
//   const navigate = useNavigate();
//   const [vendors, setVendors] = useState([]);
//   const [favorites, setFavorites] = useState({}); // store favorite status keyed by vendor_id
//  const [loading, setLoading] = useState(true);

//   useEffect(() => {
//   setLoading(true);
//   fetch("https://api.upswap.app/api/vendor/lists/")
//     .then((res) => res.json())
//     .then((data) => {
//       console.log("API Response:", data);
//       setVendors(data?.vendors || []);

//       // initialize favorites from API if available
//       const initialFavs = {};
//       data?.vendors?.forEach((vendor) => {
//         initialFavs[vendor.vendor_id] = vendor.is_favorite || false;
//       });
//       setFavorites(initialFavs);
//     })
//     .catch((err) => {
//       console.error("Error fetching vendors:", err);
//     })
//     .finally(() => {
//       setLoading(false); // ← Yeh yahan hona chahiye
//     });
// }, []);

//   const toggleFavorite = (vendorId) => {
//     setFavorites((prev) => ({
//       ...prev,
//       [vendorId]: !prev[vendorId],
//     }));
//     // Optional: Here you can also call an API to persist the favorite toggle
//   };

//   return (
//     <div className="min-h-screen bg-white">
//       {/* Header */}
//       <div className="flex items-center justify-between bg-gradient-to-r border-2 bg-[#FE7A3A] text-white p-4 rounded-lg">
//         <button className="text-xl" onClick={() => navigate("/DealsPage")}>
//           &#8592;
//         </button>
//         <h1 className="text-lg font-semibold">Vendors</h1>
//         <div className="flex gap-4">
//           <FaHeart className="text-xl" />
//           <FaBars className="text-xl" />
//         </div>
//       </div>

//       {/* Search Bar */}
//       <div className="p-4">
//         <div className="flex items-center bg-gray-100 p-2 rounded-md shadow-md">
//           <FaSearch className="text-gray-500 ml-2" />
//           <input
//             type="text"
//             placeholder="Search vendor, category..."
//             className="flex-grow bg-transparent outline-none p-2"
//           />
//           <FaMapMarkerAlt className="text-gray-500 mr-2" />
//         </div>
//       </div>

//       {/* Vendor Listing */}
//       <div className="p-4 space-y-4">
//         {vendors.map((vendor) => {
//           const addressObj = vendor.addresses?.[0];
//           const fullAddress = addressObj
//             ? `${addressObj.road_name_area_colony}, ${addressObj.city}, ${addressObj.state}, ${addressObj.country}, ${addressObj.pincode}`
//             : "No address";

//           return (
//             <div
//               key={vendor.vendor_id}
//               className="flex bg-white rounded-lg p-4 items-center shadow-md"
//             >
//               <div className="w-20 h-20 flex items-center justify-center rounded-lg overflow-hidden">
//                 <img
//                   src={vendor.profile_pic || "/placeholder.jpg"}
//                   alt={vendor.full_name}
//                   className="w-16 h-16 object-cover rounded-md"
//                 />
//               </div>
//               <div className="flex-grow px-4">
//                 <h2 className="font-bold text-lg">{vendor.full_name}</h2>
//                 <p className="text-sm text-gray-600">
//                   {vendor.services?.[0]?.item_description || "No description"}
//                 </p>
//                 <p className="text-xs text-gray-500">{fullAddress}</p>
//               </div>
//               <button onClick={() => toggleFavorite(vendor.vendor_id)}>
//                 <FaHeart
//                   className={`text-xl transition duration-300 ${
//                     favorites[vendor.vendor_id]
//                       ? "text-red-500"
//                       : "text-gray-400"
//                   }`}
//                 />
//               </button>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default UpswapVendors;

// import { useEffect, useState } from "react";
// import { FaSearch, FaMapMarkerAlt, FaHeart, FaBars } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";

// const UpswapVendors = () => {
//   const navigate = useNavigate();
//   const [vendors, setVendors] = useState([]);
//   const [favorites, setFavorites] = useState({});
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     setLoading(true);
//     fetch("https://api.upswap.app/api/vendor/lists/")
//       .then((res) => res.json())
//       .then((data) => {
//         console.log("API Response:", data);
//         setVendors(data?.vendors || []);

//         const initialFavs = {};
//         data?.vendors?.forEach((vendor) => {
//           initialFavs[vendor.vendor_id] = vendor.is_favorite || false;
//         });
//         setFavorites(initialFavs);
//       })
//       .catch((err) => {
//         console.error("Error fetching vendors:", err);
//       })
//       .finally(() => {
//         setLoading(false);
//       });
//   }, []);

//   const toggleFavorite = (vendorId) => {
//     setFavorites((prev) => ({
//       ...prev,
//       [vendorId]: !prev[vendorId],
//     }));
//     // Optional: Add API call to persist this
//   };

//   return (
//     <div className="min-h-screen bg-white">
//       {/* Header */}
//       <div className="flex items-center justify-between bg-gradient-to-r border-2 bg-[#FE7A3A] text-white p-4 rounded-lg">
//         <button className="text-xl" onClick={() => navigate("/DealsPage")}>
//           &#8592;
//         </button>
//         <h1 className="text-lg font-semibold">Vendors</h1>
//         <div className="flex gap-4">
//           <FaHeart className="text-xl" />
//           <FaBars className="text-xl" />
//         </div>
//       </div>

//       {/* Search Bar */}
//       <div className="p-4">
//         <div className="flex items-center bg-gray-100 p-2 rounded-md shadow-md">
//           <FaSearch className="text-gray-500 ml-2" />
//           <input
//             type="text"
//             placeholder="Search vendor, category..."
//             className="flex-grow bg-transparent outline-none p-2"
//           />
//           <FaMapMarkerAlt className="text-gray-500 mr-2" />
//         </div>
//       </div>

//       {/* Vendor Listing */}
//       <div className="p-4 space-y-4">
//         {loading ? (
//           <div className="text-center text-gray-500 py-10 text-lg">
//             Loading vendors...
//           </div>
//         ) : vendors.length === 0 ? (
//           <div className="text-center text-gray-500 py-10 text-lg">
//             No vendors found.
//           </div>
//         ) : (
//           vendors.map((vendor) => {
//             const addressObj = vendor.addresses?.[0];
//             const fullAddress = addressObj
//               ? `${addressObj.road_name_area_colony}, ${addressObj.city}, ${addressObj.state}, ${addressObj.country}, ${addressObj.pincode}`
//               : "No address";

//             return (
//               <div
//                 key={vendor.vendor_id}
//                 className="flex bg-white rounded-lg p-4 items-center shadow-md"
//               >
//                 <div className="w-20 h-20 flex items-center justify-center rounded-lg overflow-hidden">
//                   <img
//                     src={vendor.profile_pic || "/placeholder.jpg"}
//                     alt={vendor.full_name}
//                     className="w-16 h-16 object-cover rounded-md"
//                   />
//                 </div>
//                 <div className="flex-grow px-4">
//                   <h2 className="font-bold text-lg">{vendor.full_name}</h2>
//                   <p className="text-sm text-gray-600">
//                     {vendor.services?.[0]?.item_description || "No description"}
//                   </p>
//                   <p className="text-xs text-gray-500">{fullAddress}</p>
//                 </div>
//                 <button onClick={() => toggleFavorite(vendor.vendor_id)}>
//                   <FaHeart
//                     className={`text-xl transition duration-300 ${
//                       favorites[vendor.vendor_id]
//                         ? "text-red-500"
//                         : "text-gray-400"
//                     }`}
//                   />
//                 </button>
//               </div>
//             );
//           })
//         )}
//       </div>
//     </div>
//   );
// };

// export default UpswapVendors;

import { useEffect, useState } from "react";
import { FaSearch, FaMapMarkerAlt, FaHeart, FaBars } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpswapVendors = () => {
  const navigate = useNavigate();
  const [vendors, setVendors] = useState([]);
  const [favorites, setFavorites] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch("https://api.upswap.app/api/vendor/lists/")
      .then((res) => res.json())
      .then((data) => {
        console.log("API Response:", data);
        setVendors(data?.vendors || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching vendors:", err);
        setLoading(false);
      });
  }, []);

  const handleFavorite = async (vendor) => {
    const vendorId = vendor.vendor_id;
    const userId = localStorage.getItem("vendor_id");

    if (!userId) {
      toast.error("User ID not found!");
      return;
    }

    const apiUrl = `https://api.upswap.app/api/vendors/${vendorId}/favorite/`;

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
        body: JSON.stringify({
          user_id: userId,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        toast.error(result.message || "Something went wrong.");
        return;
      }

      setFavorites((prev) => ({
        ...prev,
        [vendorId]: !prev[vendorId],
      }));

      toast.success(result.message || "Updated successfully!");
    } catch (error) {
      console.error("Error:", error);
      toast.error("Network error, please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <ToastContainer position="top-center" autoClose={3000} />

      {/* Header */}
      <div className="flex items-center justify-between bg-gradient-to-r border-2 bg-[#FE7A3A] text-white p-4 rounded-lg">
        <button className="text-xl" onClick={() => navigate("/DealsPage")}>
          &#8592;
        </button>
        <h1 className="text-lg font-semibold">Vendors</h1>
        <div className="flex gap-4">
          {/* <FaHeart className="text-xl" /> */}
          <FaHeart
            className="text-xl cursor-pointer"
            onClick={() => navigate("/Favorite")}
          />

          <FaBars className="text-xl" />
        </div>
      </div>

      {/* Search Bar */}
      <div className="p-4">
        <div className="flex items-center bg-gray-100 p-2 rounded-md shadow-md">
          <FaSearch className="text-gray-500 ml-2" />
          <input
            type="text"
            placeholder="Search vendor, category..."
            className="flex-grow bg-transparent outline-none p-2"
          />
          <FaMapMarkerAlt className="text-gray-500 mr-2" />
        </div>
      </div>

      {/* Loader */}
      {loading ? (
        <div className="flex justify-center items-center p-10">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
        </div>
      ) : (
        <div className="p-4 space-y-4">
          {vendors.map((vendor) => (
            <div
              key={vendor.vendor_id}
              className="flex flex-col sm:flex-row bg-white rounded-lg shadow-md p-4 items-center"
            >
              <div className="w-20 h-20 flex items-center justify-center rounded-lg overflow-hidden">
                <img
                  src={vendor.profile_pic || "/placeholder.jpg"}
                  alt={vendor.full_name}
                  className="w-16 h-16 object-cover rounded-md"
                />
              </div>
              <div className="flex-grow px-4 mt-2 sm:mt-0 sm:px-6">
                <h2 className="font-bold text-lg">{vendor.full_name}</h2>
                <p className="text-sm text-gray-600">
                  {vendor.services[0]?.item_description || "No description"}
                </p>
                <p className="text-xs text-gray-500">
                  {vendor.addresses[0]?.road_name_area_colony || "No address"}
                </p>
              </div>
              <button
                onClick={() => handleFavorite(vendor)}
                className={`text-xl ${
                  favorites[vendor.vendor_id] ? "text-red-500" : "text-gray-400"
                }`}
              >
                <FaHeart />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UpswapVendors;
